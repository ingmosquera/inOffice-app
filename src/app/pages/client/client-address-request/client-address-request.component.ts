import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { ClientService } from "../../../services/clientService";
import { Client, ClientAddressRequest, ClientRequest } from "../../../core/modules/client/client";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableClientColumns } from "../../../core/helpers/tableClientColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { ClientDetailComponent } from "../client-detail/client-detail.component";
import { pagination } from "../../../core/constants/constants";


@Component({
    selector: "app-client-address-request",
    templateUrl: "./client-address-request.component.html",
    standalone: true,
    imports: [SharedModule, ClientDetailComponent]
})

export class ClientAddress implements OnInit,AfterViewInit{
    clientAddressRequestForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    configItemTable!:TableConfig;
    dataSourceItem! : ClientAddressRequest[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:Client;
    
    constructor(private readonly fb:FormBuilder,
        private readonly dialog: MatDialog,
        private readonly route: ActivatedRoute,
        private readonly clientService: ClientService){}

    ngOnInit(): void {
        this.setConfigItemTable();
        this.route.queryParams.subscribe((params:Params)=> {
            if ('dataclient' in params)
                this.dataclient =JSON.parse(params['dataclient']);
        });
        this.setCreateData();
    }

    ngAfterViewInit() {
        if (this.dataclient != undefined)
            this.addressByClient(this.dataclient.id,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
    }
    
    private setCreateData():void{
        this.activityType ="1";
        this.labelButton = "Crear dirección";
        this.clientAddressRequestForm = this.initForm();
    }

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableClientColumns.setClientAddressRequestTableColumns(),true);
    }
    
    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Gestión de clientes. Dirección de entrega",
                message:message,
                confirm:confirm
            }
        });
    }

    private createClientAddress():void{
        const dialogRef =  this.showMessage("Esta seguro que desea crear la dirección para "+ 
                                            this.dataclient.id +" "+ this.dataclient.name,true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            const clientAddres : ClientAddressRequest = {
                clientId:this.dataclient.id,
                address:this.clientAddressRequestForm.value.address,
                active:true
            }
            this.clientService.CreateAddressClient(clientAddres).subscribe(
                data => {
                    this.addressByClient(this.dataclient.id,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private updateClient():void{
        if(this.dataclient.id==null || this.dataclient.id ==""){
            this.showMessage("No se encontró el cliente para asociar.",false);
        }else{
            const dialogRef =  this.showMessage("Esta seguro que desea actualizar la dirección para "+ 
                                                this.dataclient.id +" "+ this.dataclient.name,true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
                const clientAddres : ClientAddressRequest = {
                    id:this.clientAddressRequestForm.value.id,
                    clientId:this.dataclient.id,
                    address:this.clientAddressRequestForm.value.address,
                    active:this.clientAddressRequestForm.value.active=="Y"?true:false
                };
                this.clientService.UpdateAddressClient(clientAddres).subscribe(data => {
                    this.addressByClient(this.dataclient.id,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
                });
            });
        }
    }
    
    private initForm():FormGroup{
        return this.fb.group({
            id:['',''],
            address:['',[Validators.required]],
            active:['',[Validators.required]],
        });
    }

    private addressByClient(idClient:string,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.clientService.getAddressByClient(idClient,startIndex,endIndex).subscribe((data)=>{
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

    onDataSelected(element:any){
        const result:ClientAddressRequest = JSON.parse(JSON.stringify(element));
        this.activityType ="2";
        this.labelButton = "Actualizar dirección";
        this.clientAddressRequestForm= this.loadData(result);
        this.clientAddressRequestForm.get('active')?.setValue(result.active ? 'Y' : 'N');

    }

    private loadData(result:ClientAddressRequest):FormGroup{
        return this.fb.group({
            id:[result.id,''],
            address:[result.address,[Validators.required]],
            active:['',[Validators.required]],
        });
    }

    reset(){
        this.setCreateData();
    }

}