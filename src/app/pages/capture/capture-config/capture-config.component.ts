import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CaptureConfig } from "../../../core/modules/capture/capture";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CaptureService } from "../../../services/captureService";
import { SharedModule } from "../../../core/shared/shared.module";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { CaptureDetailComponent } from "../capture-detail/capture-detail.component";
import { QuestionDetailComponent } from "../capture-question/capture-question.component";
import { CaptureBrachComponent } from "../captura-branch/captura-branch.component";
import { ConfigureService } from "../../../services/configureService";
import { ClientService } from "../../../services/clientService";
import { Client } from "../../../core/modules/client/client";
import { Line } from "../../../core/modules/configuration/conciguration";
import { ConfigFileService } from "../../../services/configFileService";
import { LoadFileConfig } from "../../../core/modules/loadfile/loadfile";

@Component({
    selector: "app-capture-config",
    templateUrl: "./capture-config.component.html",
    standalone: true,
    imports: [SharedModule, CaptureDetailComponent, QuestionDetailComponent, CaptureBrachComponent]
})
export class CaptureConfigComponent implements OnInit{
    panelOpenState:boolean=false;
    panelOpenDetailState:boolean=false;
    CaptureConfigForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    dataLoad!:CaptureConfig;
    showButton:boolean = false;
    puedeEditar:boolean = false;
    clientList!:Client[];
    lineList!:Line[]
    loadFileConfigList!:LoadFileConfig[];

    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly CaptureFileService:CaptureService,
                private readonly router:Router,
                private readonly configureService:ConfigureService,
                private readonly clientService:ClientService,
                private readonly configFileService:ConfigFileService){

    }
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
    }

    private setCreateData():void{
        this.activityType =this.activityType;
        this.labelButton =this.activityType=="2"?"Actulizar Cliente" :"Crear Cliente";
        this.CaptureConfigForm = this.initForm();
        if(this.dataLoad!= undefined){
            this.CaptureConfigForm= this.loadData();
            this.CaptureConfigForm.get('active')?.setValue(this.dataLoad.active ? 'Y' : 'N');
            this.CaptureConfigForm.get('client')?.setValue(this.dataLoad.client?.toString());
            this.CaptureConfigForm.get('type')?.setValue(this.dataLoad.type.toString());
            this.CaptureConfigForm.get('configFile')?.setValue(this.dataLoad?.configFile?.toString());
            this.CaptureConfigForm.get('line')?.setValue(this.dataLoad.line.toString());
            this.CaptureConfigForm.get('levelacces')?.setValue(this.dataLoad.levelacces?.toString());
        }
        this.loadList();
    }
    private loadList():void{
        this.clientService.getClientActive().subscribe(
            data => {
                this.clientList = data.result;
            },
            error => {
                const message = error.error.errorMessage==null?"Error al listar los clientes":error.error.errorMessage;
                this.showMessage(message,false);
            });
        

        this.configureService.getLineAll().subscribe(
            data => {
                this.lineList = data.result;
            },
            error => {
                const message = error.error.errorMessage==null?"Error al listar la lineas":error.error.errorMessage;
                this.showMessage(message,false);
            });
        
        this.configFileService.getConfigFileActiveList().subscribe(
            data => {
                this.loadFileConfigList = data.result;
            },
            error => {
                const message = error.error.errorMessage==null?"Error al listar los archivos":error.error.errorMessage;
                this.showMessage(message,false);
            });
    }

    private loadData():FormGroup{
        return this.fb.group({
            id:[this.dataLoad.id,""],
            client:[this.dataLoad.client,[Validators.required]],    
            name:[this.dataLoad.name,[Validators.required]],
            type:[this.dataLoad.type,[Validators.required]],
            configFile:[this.dataLoad.configFile,[Validators.required]],
            line:[this.dataLoad.line,[Validators.required]],
            levelacces:[this.dataLoad.levelacces,[Validators.required]],
            active:["",[Validators.required]],
        });
    }


    private initForm():FormGroup{
        return this.fb.group({
            id:["",""],
            client:["",[Validators.required]],
            name:["",[Validators.required]],
            type:["",[Validators.required]],
            configFile:["",""],
            line:["",[Validators.required]],
            levelacces:["",[Validators.required]],
            active:["",[Validators.required]],
        });
    }

    private createCaptureDataConfig():CaptureConfig{
        const configFile = this.CaptureConfigForm.value.configFile=="" || this.CaptureConfigForm.value.configFile=="0"?
                            -1:this.CaptureConfigForm.value.configFile;
        const data:CaptureConfig = {
            name:this.CaptureConfigForm.value.name,
            client:this.CaptureConfigForm.value.client,
            type:this.CaptureConfigForm.value.type,
            configFile:configFile,
            line:this.CaptureConfigForm.value.line,
            levelacces:this.CaptureConfigForm.value.levelacces,
            active:this.CaptureConfigForm.value.active=="Y"?true:false,
            userCreated:"User Id",
            userNameCreated:"User Name",
            dateCreated: new Date(),
            userModified:"User Id",
            userNameModified:"User Name",
            dateModified:new Date(),
        }

        return data;
    }

    private createCapture():void{
        const dialogRef =  this.showMessage("Esta seguro que desea crear la configuración del capturador ",true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
                this.CaptureFileService.createCapture(this.createCaptureDataConfig()).subscribe(
                    data => {
                        this.showMessage(data.result,false);    
                    },
                    error => {
                        const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                        this.showMessage(message,false);
                });
            });
    }

    private updateCapture():void{
        if (this.CaptureConfigForm.value.id==null || this.CaptureConfigForm.value.id==""){
            this.showMessage("No se encontró una configuración asociada",false)
        }else{
            const dialogRef =  this.showMessage("Esta seguro que desea actualizar la configuración del capturador ",true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var dataFile = this.createCaptureDataConfig();
            dataFile.id = this.CaptureConfigForm.value.id;
            this.CaptureFileService.updateCapture(dataFile).subscribe(
                data => {
                    this.refreshPage(dataFile);
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
                });
            });
        }
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Captura de información",
                message:message,
                confirm:confirm
            }
        });
    }

    onSubmit(){
        switch(this.activityType){
            case "1":{
                this.createCapture();
                break;
            }                
            case "2":{
                this.updateCapture();
                break;
            }                
            default:{
                this.showMessage("Activdad no permitida",false);
            }
        }
    };
    newCapture(){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['capture-detail']);
        });
    }

    private refreshPage(dataFile:CaptureConfig){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['capture-detail'],{queryParams:{dataclient:JSON.stringify(dataFile)}});
        });
    }
}