import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { SharedModule } from "../../../core/shared/shared.module";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableRemittanceColumns } from "../../../core/helpers/tableRemittanceComponents";
import { NoitemRemittance, Remittance } from "../../../core/modules/remesas/remittance";
import { RemittanceService } from "../../../services/remittanceService";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { ActivatedRoute, Params } from "@angular/router";
import { pagination } from "../../../core/constants/constants";

@Component({
    selector:"app-remittance-noItem",
    templateUrl: './remittance-noItem.component.html',
    standalone: true,
    imports: [SharedModule]
})

export class RemittanceNoItemComponent implements OnInit{
    newNoItemRowForm!:FormGroup;
    labelButton!:string;
    configItemTable!:TableConfig;
    totalItems!:number;
    dataSourceNoitem!:NoitemRemittance[];
    loadingData:boolean=false;
    activityType!:string;
    dataclient!:Remittance;

    noItemTypeList = [
        { value: '1', name: 'Cajas' },
        { value: '2', name: 'Codigos' },
        { value: '3', name: 'Otros' }
      ];

    constructor(private readonly dialog:MatDialog,
                private readonly remittanceService:RemittanceService,
                private readonly route: ActivatedRoute,
                private readonly fb:FormBuilder){}
    
    ngOnInit(): void {
        this.newNoItemRowForm = this.initForm();
        this.route.queryParams.subscribe((params:Params)=> {
            if ('dataclient' in params)
                this.dataclient =JSON.parse(params['dataclient']);
        });
        this.setConfigItemTable();
        this.activityType ="1";
        this.labelButton ="Adicionar item";
    }

    ngAfterViewInit() {
        if (this.dataclient != undefined)
            this.getRemittanceNoItem(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
    }

    private initForm():FormGroup{
        return this.fb.group({
            id:["",""],
            idRemittance:["",""],
            noItemType:["",[Validators.required]],
            quantity:["",[Validators.required]],
        });
    }

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableRemittanceColumns.setConfigRemittanceNoItemsColumns(),false,true,true);
    }

    private loadData(data:NoitemRemittance) :FormGroup{
        return this.fb.group({
            id:[data.id,""],
            idRemittance:[data.remittance,[Validators.required]],
            noItemType:[data.noItemType,[Validators.required]],
            quantity:[data.quantity,[Validators.required]],
        });

        
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Gestion de órdenes. No items",
                message:message,
                confirm:confirm
            }
        });
    }

    private RemittanceNoItemData():NoitemRemittance{
        const dataClient:NoitemRemittance = {
            remittance:this.dataclient.id!,
            noItemType:this.newNoItemRowForm.value.noItemType,
            quantity:this.newNoItemRowForm.value.quantity
        };
        return dataClient;
    }


    private getRemittanceNoItem(idRemittance:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.remittanceService.getItemNoItem(idRemittance,startIndex,endIndex).subscribe({
            next:data => {
                this.dataSourceNoitem = data.data;
                this.totalItems = data.totalRegisters;        
                this.loadingData=false;
            },
            error:error => {
                const message = error.error.errorMessage==null?"Error al consultar los no items de la orden":error.error.errorMessage;
                this.showMessage(message,false);
            }
        });
    }

    private createRemittanceNoItem():void{
        this.remittanceService.createRemittanceNoItem(this.dataSourceNoitem).subscribe(
            data => {
                this.showMessage(data.result,false);    
            },
            error => {
                const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                this.showMessage(message,false);
        });
    }

    private updateRemittanceNoItem():void{
        this.remittanceService.updateRemittanceNoItem(this.dataSourceNoitem,this.dataclient.id!).subscribe(
            data => {
                this.showMessage(data.result,false);    
            },
            error => {
                const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                this.showMessage(message,false);
        });
    }


    onSubmit():void{
        console.log('this.activityType',this.activityType);
        switch(this.activityType){
            case "1":{
                this.createRemittanceNoItem();
                break;
            }                
            case "2":{
                this.updateRemittanceNoItem();
                break;
            }                
            default:{
                this.showMessage("Activdad no permitida",false);
            }
        }
    }

    onPageItemChanged(event:any):void{
        this.getRemittanceNoItem(this.dataclient.id!,event.pageIndex+1,event.pageSize);
    }

    onAddToList(){
        const data = this.RemittanceNoItemData();
        this.dataSourceNoitem.push(data);
    }


    onDataSelected(element:any){
        let result:NoitemRemittance = JSON.parse(JSON.stringify(element));
        this.activityType ="2";
        this.labelButton ="Modificar item";
        this.newNoItemRowForm= this.loadData(result);
        this.newNoItemRowForm.get('noItemType')?.setValue(result.noItemType.toString());
    }

    addRow(){
        if(this.dataclient== undefined || this.dataclient.id ==null || this.dataclient.id <= 0){
            this.showMessage("No se encontró una orden de trabajo asociada",false);
        }else{
            debugger;
            const data = this.RemittanceNoItemData();
            data.remittance = this.dataclient.id;
            const option =this.noItemTypeList.find(opc => opc.value === this.newNoItemRowForm.get('noItemType')?.value);
            const existe = this.dataSourceNoitem.find(item => item.noItemType.toString() === data.noItemType.toString());
            if(existe){
                
                this.dataSourceNoitem = this.dataSourceNoitem.filter((u) => u.noItemType.toString() !== data.noItemType.toString());
            }
            data.noItemTypeName = option?.name;
            this.dataSourceNoitem = [...this.dataSourceNoitem,data];
            this.clearForm();
        }
    }

    private clearForm(){
        this.newNoItemRowForm.get('idRemittance')?.setValue("");
        this.newNoItemRowForm.get('quantity')?.setValue("");
        this.newNoItemRowForm = this.initForm();
    }

    onDeleteRow(element:any){
        const result:NoitemRemittance = JSON.parse(JSON.stringify(element));
        this.dataSourceNoitem = this.dataSourceNoitem.filter((u) => u.id !== result.id);
        this.clearForm();
        this.activityType ="1";
        this.labelButton ="Adicionar item";

    }
}