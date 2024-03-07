import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { RemittanceItemComponent } from "../remittence-item/remittance-item.component";
import { RemittanceNoItemComponent } from "../remittance-noItem/remittance-noItem.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from "../../../services/clientService";
import { ConfigureService } from "../../../services/configureService";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { Client, ClientAddressRequest, ClientRequest } from "../../../core/modules/client/client";
import { Branch, Line } from "../../../core/modules/configuration/conciguration";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Remittance } from "../../../core/modules/remesas/remittance";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { RemittanceService } from "../../../services/remittanceService";


@Component({
    selector: "app-remittance",
    templateUrl: './remittance-detail.component.html',
    standalone: true,
    imports: [SharedModule, RemittanceItemComponent, RemittanceNoItemComponent,MatDatepickerModule]
})

export class RemittanceDetailComponent implements OnInit{
    panelOpenState:boolean = false;
    panelOpenDetailState:boolean = false;
    remittanceConfigForm!:FormGroup;
    labelButton!:string;
    showButton:boolean = false;
    puedeEditar:boolean = false;
    clientList!:Client[];
    lineList!:Line[];
    branchList!:Branch[];
    requestsClientList!:ClientRequest[];
    addressClientList!:ClientAddressRequest[];
    dataLoad!:Remittance;
    activityType!:string;

    constructor(private readonly clientService:ClientService,
                private readonly configureService:ConfigureService,
                private readonly remittanceServicce:RemittanceService,
                private readonly router:Router,
                private readonly route:ActivatedRoute,
                private readonly dialog:MatDialog,
                private readonly fb:FormBuilder){}
    ngOnInit(): void {

        this.route.queryParams.subscribe((params:Params)=> {
            if ('dataclient' in params)
                this.dataLoad =JSON.parse(params['dataclient'])

                if ('created' in params){
                this.showButton=true;
                this.puedeEditar=false;    
            }
        });

        if (this.dataLoad ==undefined){
            this.activityType ="1";
            this.puedeEditar=true;
        }else{
            this.activityType ="2";
            this.puedeEditar=false;
        }
        this.setCreateData();
        this.loadList();
    }


    private setCreateData():void{
        this.activityType =this.activityType;
        this.labelButton =this.activityType=="2"?"Actualizar Orden" :"Crear Orden";
        this.remittanceConfigForm=this.initForm();
        if(this.dataLoad!= undefined){
            this.remittanceConfigForm= this.loadData();
            this.onValidateDataClient(this.dataLoad.client);
            this.remittanceConfigForm.get('client')?.setValue(this.dataLoad.client.toString());
            this.remittanceConfigForm.get('branch')?.setValue(this.dataLoad.branch.toString());
            this.remittanceConfigForm.get('line')?.setValue(this.dataLoad.line.toString());
            this.remittanceConfigForm.get('request')?.setValue(1);
            this.remittanceConfigForm.get('address')?.setValue(1);
            //this.remittanceConfigForm.get('request')?.setValue(this.dataLoad.request.toString());
            //this.remittanceConfigForm.get('address')?.setValue(this.dataLoad.address.toString());
            this.remittanceConfigForm.get('type')?.setValue(this.dataLoad.type?.toString());
            this.remittanceConfigForm.get('status')?.setValue(this.dataLoad.status?.toString());
        }
    }

    private initForm():FormGroup{
        return this.fb.group({
            id:["",""],
            client:["",[Validators.required]],
            line:["",[Validators.required]],
            branch:["",[Validators.required]],
            request:["",[Validators.required]],
            address:["",[Validators.required]],
            deliveryDay:["",""],
            closeDate:["",""],
            comments:["",""],
            type:["",[Validators.required]],
            status:["",[Validators.required]],
            radicationNumber:["",[Validators.required]],
        });
    }

    private loadData() :FormGroup{
        let closeDate:string = this.dataLoad.closeDate?.toString() =='0001-01-01T00:00:00'?"":this.dataLoad.closeDate?.toString()!;
        let deliveryDay:string = this.dataLoad.deliveryDay?.toString()=='0001-01-01T00:00:00'?"":this.dataLoad.deliveryDay?.toString()!
        return this.fb.group({
            id:[this.dataLoad.id,[Validators.required]],
            client:[this.dataLoad.client,[Validators.required]],
            branch:[this.dataLoad.branch,[Validators.required]],
            line:[this.dataLoad.line,[Validators.required]],
            request:[this.dataLoad.request.toString(),[Validators.required]],
            address:[this.dataLoad.address.toString(),[Validators.required]],
            closeDate:[closeDate,""],
            deliveryDay:[deliveryDay,""],
            comments:[this.dataLoad.comments,[Validators.required]],
            type:[this.dataLoad.type,[Validators.required]],
            status:["",[Validators.required]],
            radicationNumber:[this.dataLoad.radicationNumber,[Validators.required]]
        });
    }

    private RemittanceDataCreate():Remittance{
        const dataClient:Remittance = {
            client:this.remittanceConfigForm.value.client,
            line:this.remittanceConfigForm.value.line,
            branch:this.remittanceConfigForm.value.branch,
            type:this.remittanceConfigForm.value.type,
            comments:this.remittanceConfigForm.value.comments,
            address:this.remittanceConfigForm.value.address,
            request:this.remittanceConfigForm.value.request,
            deliveryDay:this.remittanceConfigForm.value.deliveryDay==null || this.remittanceConfigForm.value.deliveryDay==""?'1900-01-01' :this.remittanceConfigForm.value.deliveryDay,
            closeDate:this.remittanceConfigForm.value.closeDate==null||this.remittanceConfigForm.value.closeDate==""?'1900-01-01':this.remittanceConfigForm.value.closeDate,
            status:this.remittanceConfigForm.value.status,
            radicationNumber : this.remittanceConfigForm.value.radicationNumber,
            userCreated:"User Id",
            userNameCreated:"User Name",
            dateCreated: new Date(),
            userModified:"User Id",
            userNameModified:"User Name",
            dateModified:new Date(),
        };

        return dataClient;
    }

    private loadList():void{
        this.clientService.getClientActive().subscribe(
            {
                next: data => {
                    this.clientList = data.result;
                },
                error: error => {
                    const message = error.error.errorMessage==null?"Error al listar los clientes":error.error.errorMessage;
                    this.showMessage(message,false);
                }
            });

        this.configureService.getBranchAll().subscribe({
            next: data => {
                this.branchList = data.result;
            },
            error:error => {
                const message = error.error.errorMessage==null?"Error al listar las sucursales":error.error.errorMessage;
                this.showMessage(message,false);
            }
        });

        this.configureService.getLineAll().subscribe({
            next:data => {
                this.lineList = data.result;
            },
            error:error => {
                const message = error.error.errorMessage==null?"Error al listar las lineas":error.error.errorMessage;
                this.showMessage(message,false);
            }
        });
    }

    
    onSelectionChangeClient(){
        this.onValidateDataClient(this.remittanceConfigForm.value.client);
    }

    private onValidateDataClient(client:string){
        if(client!=null || client!=""){
            this.getAddressRequestClientList(client);
            this.getRequestClientList(client);
        }
    }
    
    private getRequestClientList(idClient:string):void{
        this.clientService.getRequestActiveByClient(idClient).subscribe({
            next:data => {
                this.requestsClientList = data.result;
            },
            error:error => {
                const message = error.error.errorMessage==null?"Error al listar las direcciones":error.error.errorMessage;
                this.showMessage(message,false);
            }
        });
    }


    private getAddressRequestClientList(idClient:string):void{
        this.clientService.getAddressActiveByClient(idClient).subscribe({
            next:data => {
                this.addressClientList = data.result;
            },
            error:error => {
                const message = error.error.errorMessage==null?"Error al listar los solicitante":error.error.errorMessage;
                this.showMessage(message,false);
            }
        });
    }



    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Ordenes de trabajo",
                message:message,
                confirm:confirm
            }
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
                this.showMessage("Activdad no permitida "+ this.activityType,false);
            }
        }
    }
    newCapture():void{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['remittance-detail']);
        });
    }

    private createRemittanceDetail():void{
        const dialogRef =  this.showMessage("Esta seguro que desea crear la orden de trabajo ",true);
        let dataCliente = this.RemittanceDataCreate();
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            this.remittanceServicce.createRemittance(dataCliente).subscribe(
                data => {
                    dataCliente.id = Number(data.result);
                    this.refreshPage(dataCliente);
                    this.showMessage("Se creó la órden de trabajo No. "+data.result,false);
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private updateRemittanceDetail():void{
        const dialogRef =  this.showMessage("Esta seguro que desea actualizar la orden de trabajo ",true);
        const dataCliente = this.RemittanceDataCreate();
            
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            this.remittanceServicce.updateRemittance(dataCliente).subscribe(
                data => {
                    this.showMessage(data.result,false);
                    this.refreshPage(dataCliente);
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }


    private refreshPage(dataFile:Remittance){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['remittance-detail'],{queryParams:{dataclient:JSON.stringify(dataFile)}});
        });
    }

}