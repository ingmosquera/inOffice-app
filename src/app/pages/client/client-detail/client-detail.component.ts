import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { ActivatedRoute, Params } from "@angular/router";
import { Client, ClientModel } from "../../../core/modules/client/client";
import { ClientService } from "../../../services/clientService";
import { ClientItemTypes } from "../client-item-type/client-item-type.component";
import { ClientAddress } from "../client-address-request/client-address-request.component";
import { ClientRequests } from "../client-request/client-request.component";

@Component({
    selector: 'app-detail-client',
    templateUrl: './client-detail.component.html',
    standalone: true,
    imports: [SharedModule, ClientItemTypes, ClientAddress, ClientRequests]
})

export class ClientDetailComponent implements OnInit{
    clienteAddForm! : FormGroup;
    labelButton!:string;
    activityType!:string;
    panelOpenState:boolean = false;
    panelOpenDetailState:boolean = false;
    dataclient!:Client;

    constructor(private readonly fb:FormBuilder,
                private readonly dialog: MatDialog,
                private readonly route: ActivatedRoute,
                private readonly clientService: ClientService){}
    
    ngOnInit(): void {
        this.route.queryParams.subscribe((params:Params)=> {
            this.activityType = params['activity'];
            this.dataclient = params['dataclient'];
        });
        if (this.dataclient==undefined){
            this.activityType ="1";
        }
        this.labelButton = this.activityType=="1"?"Crear Cliente": this.activityType=="2"?"Actualizar cliente":"";

        this.clienteAddForm = this.initForm();
    }

    onSubmit(){
        switch(this.activityType){
            case "1":{
                this.createClient();
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

    sendClientModel(){
        const data:ClientModel={
            id : this.clienteAddForm.value.id,
            name:this.clienteAddForm.value.name
        }
        this.clientService.setClietModel(data);
    }


    private createClient():void{
        if (this.clienteAddForm.value.level!="1" && (this.clienteAddForm.value.parent == null ||  this.clienteAddForm.value.parent == "")){
            this.showMessage("Si seleccionó un nivel diferente al principal debe adicionar el principal ya que es una subcuenta",false);
        }else if(this.clienteAddForm.value.parent == this.clienteAddForm.value.id){
            this.showMessage("El código del cliente y el código principal no pueden ser iguales",false);
        }else{
            const dialogRef =  this.showMessage("Esta seguro que desea crear el cliente "+ 
                                            this.clienteAddForm.value.id +" "+ this.clienteAddForm.value.name,true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
                this.clientService.CreateClient(this.ClientDataCreate()).subscribe(
                    data => {
                        this.sendClientModel();
                        this.showMessage(data.result,false);    
                    },
                    error => {
                        const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                        this.showMessage(message,false);
                });
            });
        }
    }

    private updateClient():void{
        if (this.clienteAddForm.value.level!="1" && (this.clienteAddForm.value.parent == null ||  this.clienteAddForm.value.parent == "")){
            this.showMessage("Si seleccionó un nivel diferente al principal debe adicionar el principal ya que es una subcuenta",false);
        }else if(this.clienteAddForm.value.parent == this.clienteAddForm.value.id){
            this.showMessage("El código del cliente y el código principal no pueden ser iguales",false);
        }else{
            const dialogRef =  this.showMessage("Esta seguro que desea crear el cliente "+ 
                                            this.clienteAddForm.value.id +" "+ this.clienteAddForm.value.name,true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
                this.clientService.UpdateClient(this.ClientDataCreate()).subscribe(
                    data => {
                        this.showMessage(data.result,false);    
                    },
                    error => {
                        const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                        this.showMessage(message,false);
                });
            });
        }
    }

    private ClientDataCreate():Client{
        const dataClient:Client = {
            id : this.clienteAddForm.value.id,
            name:this.clienteAddForm.value.name,
            address:this.clienteAddForm.value.address,
            phone:this.clienteAddForm.value.phone,
            contact:this.clienteAddForm.value.contact,
            email:this.clienteAddForm.value.email,
            branch:this.clienteAddForm.value.branch,
            active:this.clienteAddForm.value.active,
            level:this.clienteAddForm.value.level,
            parent:this.clienteAddForm.value.parent,
            userCreated:"User Id",
            userNameCreated:"User Name",
            dateCreated: new Date(),
            userModified:"User Id",
            userNameModified:"User Name",
            dateModified:new Date(),
        };

        return dataClient;
    }
    
    private initForm():FormGroup{
        return this.fb.group({
            id:[this.activityType!=="2"?"":this.dataclient.id,[Validators.required]],
            parent:[this.activityType!=="2"?"":this.dataclient.parent,],
            name:[this.activityType!=="2"?"":this.dataclient.name,[Validators.required]],
            address:[this.activityType!=="2"?"":this.dataclient.address,[Validators.required]],
            contact:[this.activityType!=="2"?"":this.dataclient.contact,[Validators.required]],
            email:[this.activityType!=="2"?"":this.dataclient.email,[Validators.required]],
            phone:[this.activityType!=="2"?"":this.dataclient.phone,[Validators.required]],
            level:[this.activityType!=="2"?"":this.dataclient.level,[Validators.required]],
            branch:[this.activityType!=="2"?"":this.dataclient.branch,[Validators.required]],
            active:[this.activityType!=="2"?"":this.dataclient.active,[Validators.required]],
        });
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Gestion de clientes",
                message:message,
                confirm:confirm
            }
        });
    }
}