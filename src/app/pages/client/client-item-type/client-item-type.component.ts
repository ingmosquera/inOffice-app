import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { ClientService } from "../../../services/clientService";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { Client, ClientItemType, ClientModel } from "../../../core/modules/client/client";
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
    clientModel!:ClientModel;
    dataclient!:Client;
    
    constructor(private readonly fb:FormBuilder,
                private readonly dialog: MatDialog,
                private readonly route: ActivatedRoute,
                private readonly clientService: ClientService
                ){}
    ngOnInit(): void {
        this.setConfigItemTable();
        this.route.queryParams.subscribe((params:Params)=> {
            this.activityType = params['activity'];
            this.dataclient = params['dataclient'];
        });
        if (this.dataclient==undefined){
            this.activityType ="1";
        }
        this.clientModel = this.clientService.getClientModel();
        this.labelButton = this.activityType=="1"?"Crear tipoitem": this.activityType=="2"?"Actualizar tipoitem":"";
        this.itemtypeClientForm = this.initForm();
    }

    ngAfterViewInit() {
        if (this.activityType=="2"){
            this.itemTypeByClient(this.clientModel.id,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        }
    }

    private initForm():FormGroup{
        return this.fb.group({
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
        const dialogRef =  this.showMessage("Esta seguro que desea crear la dirección para "+ 
                                            this.clientModel.id +" "+ this.clientModel.name,true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.getClientItemType();
            client.clientId = this.clientModel.id;
            this.clientService.CreateItemTypeClient(client).subscribe(
                data => {
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
            itemType:this.itemtypeClientForm.value.itemType,
            itemTypeParent:this.itemtypeClientForm.value.itemTypeParent,
            clientId:this.itemtypeClientForm.value.clientId,
            quality:this.itemtypeClientForm.value.quality,
            line:this.itemtypeClientForm.value.line,
            active:this.itemtypeClientForm.value.active
        };
        return data;
    }

    private updateClient():void{
        const dialogRef =  this.showMessage("Esta seguro que desea crear la dirección para "+ 
                                            this.clientModel.id +" "+ this.clientModel.name,true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            this.clientService.UpdateItemTypeClient(this.getClientItemType()).subscribe(
                data => {
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
        if(this.clientModel.id==null || this.clientModel.id ==""){
            this.showMessage("No se encontró el cliente para asociar.",false);
        }else{
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
    }
}