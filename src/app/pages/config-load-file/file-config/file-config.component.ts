import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "../../../core/shared/shared.module";
import { LoadFileFieldComponent } from "../file-field/file-field.component";
import { LoadFileBranchComponent } from "../file-branch/file-branch.component";
import { LoadFileConfig } from "../../../core/modules/loadfile/loadfile";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { FileService } from "../../../services/fileService";
import { ActivatedRoute, Params } from "@angular/router";
import { ClientService } from "../../../services/clientService";

@Component({
    selector: "app-file-config",
    templateUrl: "./file-config.component.html",
    standalone: true,
    imports: [SharedModule, LoadFileFieldComponent, LoadFileBranchComponent]
})

export class LoadFileConfigComponent implements OnInit{
    panelOpenState:boolean=false;
    panelOpenDetailState:boolean=false;
    FileConfigForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    dataLoad!:LoadFileConfig;

    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly loadFileService:FileService,
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
        this.labelButton = this.activityType=="1"?"Crear configuración": this.activityType=="2"?"Actualizar configuración":"";
        this.FileConfigForm = this.initForm();
    }

    private initForm():FormGroup{
        return this.fb.group({
            id:[this.activityType!=="2"?"":this.dataLoad.id,],
            client:[this.activityType!=="2"?"":this.dataLoad.client,[Validators.required]],
            name:[this.activityType!=="2"?"":this.dataLoad.name,[Validators.required]],
            line:[this.activityType!=="2"?"":this.dataLoad.line,[Validators.required]],
            levelacces:[this.activityType!=="2"?"":this.dataLoad.levelacces,[Validators.required]],
            active:[this.activityType!=="2"?"":this.dataLoad.active,[Validators.required]],
        });
    }

    private createFileConfig():LoadFileConfig{
        const data:LoadFileConfig = {
            client:this.FileConfigForm.value.client,
            name:this.FileConfigForm.value.name,
            active:this.FileConfigForm.value.active,
            line:this.FileConfigForm.value.line,
            levelacces:this.FileConfigForm.value.levelacces,
            userCreated:"User Id",
            userNameCreated:"User Name",
            dateCreated: new Date(),
            userModified:"User Id",
            userNameModified:"User Name",
            dateModified:new Date(),
        }

        return data;
    }

    private createLoadFile():void{
        const dialogRef =  this.showMessage("Esta seguro que desea crear el cargue de archivo ",true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
                this.loadFileService.createConfigFile(this.createFileConfig()).subscribe(
                    data => {
                        this.showMessage(data.result,false);    
                    },
                    error => {
                        const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                        this.showMessage(message,false);
                });
            });
    }

    private updateLoadFile():void{
        if (this.FileConfigForm.value.id==null || this.FileConfigForm.value.id==""){
            this.showMessage("No se encontró una configuración asociada",false)
        }else{
            const dialogRef =  this.showMessage("Esta seguro que desea actualizar el cargue de archivo ",true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var dataFile = this.createFileConfig();
            dataFile.id = this.FileConfigForm.value.id;
            this.loadFileService.updateConfigFile(this.createFileConfig()).subscribe(
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
                title:"Cargue de archivos",
                message:message,
                confirm:confirm
            }
        });
    }

    onSubmit(){
        switch(this.activityType){
            case "1":{
                this.createLoadFile();
                break;
            }                
            case "2":{
                this.updateLoadFile();
                break;
            }                
            default:{
                this.showMessage("Activdad no permitida",false);
            }
        }
    };

    
}