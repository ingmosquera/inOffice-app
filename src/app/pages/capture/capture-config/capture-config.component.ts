import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CaptureConfig } from "../../../core/modules/capture/capture";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { CaptureService } from "../../../services/captureService";
import { SharedModule } from "../../../core/shared/shared.module";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { ClientService } from "../../../services/clientService";
import { ClientModel } from "../../../core/modules/client/client";
import { CaptureDetailComponent } from "../capture-detail/capture-detail.component";
import { QuestionDetailComponent } from "../capture-question/capture-question.component";
import { CaptureBrachComponent } from "../captura-branch/captura-branch.component";

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

    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly CaptureFileService:CaptureService,
                private readonly clientService:ClientService){

    }
    ngOnInit(): void {
        this.route.queryParams.subscribe((params:Params)=> {
            this.activityType = params['activity'];
            this.dataLoad = params['dataclient'];
        });
        if (this.dataLoad==undefined){
            this.activityType ="1";
        }
        this.labelButton = this.activityType=="1"?"Crear captura": this.activityType=="2"?"Actualizar captura":"";
        this.CaptureConfigForm = this.initForm();
    }

    private initForm():FormGroup{
        return this.fb.group({
            client:[this.activityType!=="2"?"":this.dataLoad.client,[Validators.required]],
            name:[this.activityType!=="2"?"":this.dataLoad.name,[Validators.required]],
            type:[this.activityType!=="2"?"":this.CaptureConfigForm.value.type,[Validators.required]],
            configfileId:[this.activityType!=="2"?"":this.CaptureConfigForm.value.configfileId,[Validators.required]],
            line:[this.activityType!=="2"?"":this.CaptureConfigForm.value.line,[Validators.required]],
            levelacces:[this.activityType!=="2"?"":this.CaptureConfigForm.value.levelacces,[Validators.required]],
            active:[this.activityType!=="2"?"":this.CaptureConfigForm.value.active,[Validators.required]],
        });
    }

    private createCaptureDataConfig():CaptureConfig{
        const data:CaptureConfig = {
            name:this.CaptureConfigForm.value.name,
            client:this.CaptureConfigForm.value.client,
            type:this.CaptureConfigForm.value.type,
            configfileId:this.CaptureConfigForm.value.configfileId,
            line:this.CaptureConfigForm.value.line,
            levelacces:this.CaptureConfigForm.value.levelacces,
            active:this.CaptureConfigForm.value.active,
            userCreated:"User Id",
            userNameCreated:"User Name",
            dateCreated: new Date(),
            userModified:"User Id",
            userNameModified:"User Name",
            dateModified:new Date(),
        }

        return data;
    }

    private sendClientModel(){
        const data:ClientModel={
            id:this.CaptureConfigForm.value.client
        }
        this.clientService.setClietModel(data);
    }


    private createCapture():void{
        const dialogRef =  this.showMessage("Esta seguro que desea crear la configuración del capturador ",true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
                this.CaptureFileService.createCapture(this.createCaptureDataConfig()).subscribe(
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

    private updateCapture():void{
        if (this.CaptureConfigForm.value.id==null || this.CaptureConfigForm.value.id==""){
            this.showMessage("No se encontró una configuración asociada",false)
        }else{
            const dialogRef =  this.showMessage("Esta seguro que desea actualizar la configuración del capturador ",true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var dataFile = this.createCaptureDataConfig();
            dataFile.id = this.CaptureConfigForm.value.id;
            this.CaptureFileService.updateCapture(this.createCaptureDataConfig()).subscribe(
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

}