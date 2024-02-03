import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { ClientService } from "../../../services/clientService";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { Client, ClientItemType } from "../../../core/modules/client/client";
import { ClientDetailComponent } from "../client-detail/client-detail.component";
import { pagination } from "../../../core/constants/constants";
import { TableClientColumns } from "../../../core/helpers/tableClientColumns";

@Component({
    selector: "app-client-item-type",
    templateUrl: "./client-item-type.component.html",
    standalone: true,
    imports: [SharedModule, ClientDetailComponent]
})
export class ClientItemTypes implements OnInit,AfterViewInit{
    itemtype!:TableConfig;
    itemtypeClientForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    configItemTable!:TableConfig;
    dataSourceItem! : ClientItemType[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:Client;
    
    constructor(private readonly fb:FormBuilder,
                private readonly dialog: MatDialog,
                private readonly route: ActivatedRoute,
                private readonly clientService: ClientService
                ){}
    ngOnInit(): void {
        this.loadInitData();
    }

    ngAfterViewInit() {
        if (this.dataclient != undefined){}
            this.itemTypeByClient(this.dataclient.id,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
    }

    private loadInitData(){
        this.setConfigItemTable();
        this.route.queryParams.subscribe((params:Params)=> {
            if ('dataclient' in params)
                this.dataclient =JSON.parse(params['dataclient']);
        });
       
        this.setCreateData();
    }

    private setCreateData(){
        this.activityType ="1";
        this.labelButton = "Crear tipoitem";
        this.itemtypeClientForm = this.initForm();
    }

    private initForm():FormGroup{
        return this.fb.group({
            id:['',''],
            itemtype:['',[Validators.required]],
            itemtypeparent:['',],
            line:['',[Validators.required]],
            quantity:['',[Validators.required]],
            active:['',[Validators.required]],
        });
    }

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableClientColumns.setClientItemTypeTableColumns(),true);
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Gestión de clientes. Tipo de item",
                message:message,
                confirm:confirm
            }
        });
    }

    private createClientAddress():void{
        const dialogRef =  this.showMessage("Esta seguro que desea crear el tipo de item para "+ 
                                            this.dataclient.id +" "+ this.dataclient.name,true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.getClientItemType();
            this.clientService.CreateItemTypeClient(client).subscribe(
                data => {
                    this.itemTypeByClient(client.clientId,1,10);
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private getClientItemType():ClientItemType{
        const data :ClientItemType = {
            itemType:this.itemtypeClientForm.value.itemtype,
            itemTypeParent:this.itemtypeClientForm.value.itemtypeparent,
            clientId:this.dataclient.id,
            quantity:this.itemtypeClientForm.value.quantity,
            line:this.itemtypeClientForm.value.line,
            active:this.itemtypeClientForm.value.active=="Y"?true:false
        };
        return data;
    }

    private updateClient():void{
        const dialogRef =  this.showMessage("Esta seguro que desea actualizar el tipo de item para "+ 
                                            this.dataclient.id +" "+ this.dataclient.name,true);
        const dataClient = this.getClientItemType();
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            this.clientService.UpdateItemTypeClient(dataClient,this.itemtypeClientForm.value.id).subscribe(
                data => {
                    this.itemTypeByClient(dataClient.clientId,1,10);
                    this.showMessage(data.result,false);
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
        
    }

    private itemTypeByClient(idClient:string,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.clientService.getItemTypeByClient(idClient,startIndex,endIndex).subscribe(data=>{
            if(data.result.totalRegisters ==0)
                this.showMessage("No se encontró información con los parámetros ingresados.",false);
            
            this.dataSourceItem = data.result.data;
            this.totalItems = data.result.totalRegisters;        
            this.loadingData=false;
        },
        error => {
            const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
            this.showMessage(message,false);
        });
        
        this.setConfigItemTable();
    }

    onSubmit(){
        if(this.dataclient.id==null || this.dataclient.id ==""){
            this.showMessage("No se encontró el cliente para asociar.",false);
        }else{
            if (this.itemtypeClientForm.value.id != null || this.itemtypeClientForm.value.id != "")
            switch(this.activityType){
                case "1":{
                    this.createClientAddress();
                    break;
                }                
                case "2":{
                    this.updateClient();
                    break;
                }                
                default:{
                    this.showMessage("Activdad no permitida",false);
                }
            }
        }
    }

    onDataSelected(element:any){
        const result:ClientItemType = JSON.parse(JSON.stringify(element));
        this.labelButton = "Actualizar tipoitem";
        this.activityType ="2";
        this.itemtypeClientForm= this.loadData(result);
        this.itemtypeClientForm.get('active')?.setValue(result.active ? 'Y' : 'N');
        this.itemtypeClientForm.get('line')?.setValue(result.line?.toString());
        this.itemtypeClientForm.get('itemtypeparent')?.setValue(result.itemTypeParent?.toString());
        this.itemtypeClientForm.get('itemtype')?.setValue(result.itemType?.toString());
    }

    private loadData(result:ClientItemType):FormGroup{
        return this.fb.group({
            id:[result.id,''],
            itemtype:[result.itemType,[Validators.required]],
            itemtypeparent:[result.itemTypeParent,],
            line:[result.line,[Validators.required]],
            quantity:[result.quantity,[Validators.required]],
            active:['',[Validators.required]],
        });
    }

    reset(){
        this.setCreateData();
    }
}