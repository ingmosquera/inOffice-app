import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DetailRemittance, Remittance } from "../../../core/modules/remesas/remittance";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableRemittanceColumns } from "../../../core/helpers/tableRemittanceComponents";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { ActivatedRoute, Params } from "@angular/router";
import { pagination } from "../../../core/constants/constants";
import { RemittanceService } from "../../../services/remittanceService";

@Component({
    selector:"app-remittance-item",
    templateUrl: './remittance-item.component.html',
    standalone: true,
    imports: [SharedModule]
})

export class RemittanceItemComponent implements OnInit,AfterViewInit{
    newItemRowForm!:FormGroup;
    labelButton!:string;
    dataSourceRemittance:DetailRemittance[]=[];
    configItemTable!:TableConfig;
    totalItems!:number;
    loadingData:boolean = false;
    activityType!:string;
    dataclient!:Remittance;
    
    constructor(private readonly dialog:MatDialog,
                private readonly route: ActivatedRoute,
                private readonly remittanceService:RemittanceService,
                private readonly fb:FormBuilder){}
    
    ngOnInit(): void {
        this.newItemRowForm = this.initForm();
        this.route.queryParams.subscribe((params:Params)=> {
            if ('dataclient' in params)
                this.dataclient =JSON.parse(params['dataclient']);
        });
        this.setConfigItemTable();
        this.activityType ="1";
        this.labelButton ="Adicionar item";
    }

    private initForm():FormGroup{
        return this.fb.group({
            id:["",""],
            idRemittance:["",""],
            item:["",[Validators.required]],
            permanentOut:["",""],
            destroyed:["",""],
        });
    }

    ngAfterViewInit() {
        if (this.dataclient != undefined)
            this.getRemittanceItemDetail(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
    }

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableRemittanceColumns.setConfigRemittanceDetailColumns(),false,true,true);
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Gestion de órdenes. Items",
                message:message,
                confirm:confirm
            }
        });
    }

    private loadData(data:DetailRemittance) :FormGroup{
        return this.fb.group({
            id:[data.id,""],
            idRemittance:[data.remittance,[Validators.required]],
            item:[data.item,[Validators.required]],
            permanentOut:["",[Validators.required]],
            destroyed:["",[Validators.required]],
        });
    }

    private RemittanceItemDetailData():DetailRemittance{
        const dataClient:DetailRemittance = {
            remittance:this.dataclient.id!,
            item:this.newItemRowForm.value.item,
            permanentOut:this.newItemRowForm.value.permanentOut=="Y"?true:false,
            destroyed:this.newItemRowForm.value.destroyed=="Y"?true:false,
        };
        return dataClient;
    }

    private getRemittanceItemDetail(idRemittance:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.remittanceService.getRemittanceItemDetail(idRemittance,startIndex,endIndex).subscribe({
            next:data => {
                this.dataSourceRemittance = data.data;
                console.log('this.dataSourceRemittance',this.dataSourceRemittance);
                console.log('this.data.data',data.data);
                this.totalItems = data.totalRegisters;        
                this.loadingData=false;
            },
            error:error => {
                const message = error.error.errorMessage==null?"Error al consultar los items de la orden":error.error.errorMessage;
                this.showMessage(message,false);
            }
        });
    }

    private createRemittanceDetail():void{
        this.remittanceService.createRemittanceDetail(this.dataSourceRemittance).subscribe(
            data => {
                this.loadingData=false;
                this.getRemittanceItemDetail(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                this.showMessage(data.result,false);    
            },
            error => {
                const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                this.showMessage(message,false);
        });
    }

    private updateRemittanceDetail():void{
        this.remittanceService.updateRemittanceDetail(this.dataSourceRemittance,this.dataclient.id!).subscribe(
            data => {
                this.loadingData=false;
                this.getRemittanceItemDetail(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                this.showMessage(data.result,false);    
            },
            error => {
                const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                this.showMessage(message,false);
        });
    }

    onSubmit():void{
        switch(this.activityType){
            case "1":{
                this.createRemittanceDetail();
                break;
            }                
            case "2":{
                this.updateRemittanceDetail();
                break;
            }                
            default:{
                this.showMessage("Activdad no permitida",false);
            }
        }
    }

    onPageItemChanged(event:any):void{
        this.getRemittanceItemDetail(this.dataclient.id!,event.pageIndex+1,event.pageSize);
    }

    addRow(){
        debugger;
        if(this.dataclient== undefined || this.dataclient.id ==null || this.dataclient.id <= 0){
            this.showMessage("No se encontró una orden de trabajo asociada",false);
        }else{
            const data = this.RemittanceItemDetailData();
            data.remittance = this.dataclient.id;
            const existe = this.dataSourceRemittance.find(item => item.item === data.item);
            if(existe){
                this.dataSourceRemittance = this.dataSourceRemittance.filter((u) => u.item !== data.item);
            }
            this.dataSourceRemittance = [...this.dataSourceRemittance,data];
            this.clearForm();
            this.activityType ="2";
        }
        
    }
    private clearForm(){
        this.newItemRowForm.get('permanentOut')?.setValue(false);
        this.newItemRowForm.get('destroyed')?.setValue(false);
        this.newItemRowForm.get('item')?.setValue("");
        
        this.newItemRowForm = this.initForm();
    }

    onDeleteRow(element:any){
        const result:DetailRemittance = JSON.parse(JSON.stringify(element));
        this.dataSourceRemittance = this.dataSourceRemittance.filter((u) => u.item !== result.item);
        this.clearForm();
        this.activityType ="1";
        this.labelButton ="Adicionar item";
    }

    onDataSelected(element:any){
        const result:DetailRemittance = JSON.parse(JSON.stringify(element));
        this.activityType ="2";
        this.labelButton ="Modificar item";
        this.newItemRowForm= this.loadData(result);
        this.newItemRowForm.get('permanentOut')?.setValue(result.permanentOut ? 'Y' : 'N');
        this.newItemRowForm.get('destroyed')?.setValue(result.destroyed ? 'Y' : 'N');
    }
}