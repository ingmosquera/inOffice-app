import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Client } from "../../../core/modules/client/client";
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
    clientName:string ="";
    isLoading:boolean = false;
    showButton:boolean = false;
    puedeEditar:boolean = false;

    constructor(private readonly fb:FormBuilder,
                private readonly dialog: MatDialog,
                private readonly route: ActivatedRoute,
                private readonly clientService: ClientService,
                private readonly router:Router){
                }
    
    ngOnInit(): void {
        this.route.queryParams.subscribe((params:Params)=> {
            if ('dataclient' in params)
                this.dataclient =JSON.parse(params['dataclient'])

            if ('created' in params){
                this.showButton=true;
                this.puedeEditar=false;    
            }
                
        });

        if (this.dataclient ==undefined){
            this.activityType ="1";
            this.puedeEditar=true;
        }else{
            this.activityType ="2";
            this.puedeEditar=false;
        }
        this.setCreateData();
    }

    private setCreateData():void{
        this.activityType =this.activityType;
        this.labelButton =this.activityType=="2"?"Actulizar Cliente" :"Crear Cliente";
        this.clienteAddForm = this.initForm();
        if(this.dataclient!= undefined){
            this.clientName = ' . '+this.dataclient.name;
            this.clienteAddForm= this.loadData();
            this.clienteAddForm.get('level')?.setValue(this.dataclient.level?.toString());
            this.clienteAddForm.get('active')?.setValue(this.dataclient.active ? 'Y' : 'N');
            this.clienteAddForm.get('branch')?.setValue(this.dataclient.branch?.toString());
        }
        
    }

    private loadData():FormGroup{
        return this.fb.group({
            id:[this.dataclient.id ,[Validators.required]],
            name:[this.dataclient.name,[Validators.required]],
            address:[this.dataclient.address,[Validators.required]],
            phone:[this.dataclient.phone,[Validators.required]],
            contact:[this.dataclient.contact,[Validators.required]],
            email:[this.dataclient.email,[Validators.required]],
            branch:[this.dataclient.branch,[Validators.required]],
            active:["",[Validators.required]],
            level:[this.dataclient.level,[Validators.required]],
            parent:[this.dataclient.parent,],
        });
    }

    onSubmit(){
        console.log("Tip destino ", this.activityType);
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
                this.showMessage("Activdad no permitida "+ this.activityType,false);
            }
        }
    }

    private createClient():void{
        if (this.clienteAddForm.value.level!="1" && (this.clienteAddForm.value.parent == null ||  this.clienteAddForm.value.parent == "")){
            this.showMessage("Si seleccionó un nivel diferente al principal debe adicionar el principal ya que es una subcuenta",false);
        }else if(this.clienteAddForm.value.parent == this.clienteAddForm.value.id){
            this.showMessage("El código del cliente y el código principal no pueden ser iguales",false);
        }else{
            const dialogRef =  this.showMessage("Esta seguro que desea crear el cliente "+ 
                                            this.clienteAddForm.value.id +" "+ this.clienteAddForm.value.name,true);
            const dataCliente = this.ClientDataCreate();
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
                this.clientService.CreateClient(dataCliente).subscribe(
                    data => {
                        this.showMessage(data.result,false);
                        this.router.navigate(['client-detail'],{queryParams:{dataclient:dataCliente}});
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
            active:this.clienteAddForm.value.active=="Y"?true:false,
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
            id:[,[Validators.required]],
            parent:["",],
            name:["",[Validators.required]],
            address:["",[Validators.required]],
            contact:["",[Validators.required]],
            email:["",[Validators.required]],
            phone:["",[Validators.required]],
            level:["",[Validators.required]],
            branch:["",[Validators.required]],
            active:["",[Validators.required]],
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

    newClient(){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['client-detail']);
        });
    }
}