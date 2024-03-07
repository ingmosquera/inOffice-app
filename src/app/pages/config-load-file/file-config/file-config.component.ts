import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "../../../core/shared/shared.module";
import { LoadFileFieldComponent } from "../file-field/file-field.component";
import { LoadFileBranchComponent } from "../file-branch/file-branch.component";
import { LoadFileConfig } from "../../../core/modules/loadfile/loadfile";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ConfigFileService } from "../../../services/configFileService";
import { ConfigureService } from "../../../services/configureService";
import { ClientService } from "../../../services/clientService";
import { Client } from "../../../core/modules/client/client";
import { Line } from "../../../core/modules/configuration/conciguration";

@Component({
    selector: "app-file-config",
    templateUrl: "./file-config.component.html",
    standalone: true,
    imports: [SharedModule, LoadFileFieldComponent, LoadFileBranchComponent]
})

export class LoadFileConfigComponent implements OnInit{
    panelOpenState:boolean=false;
    panelOpenDetailState:boolean=false;
    fileConfigForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    dataLoad!:LoadFileConfig;
    showButton:boolean = false;
    puedeEditar:boolean = false;
    clientList!:Client[];
    lineList!:Line[];

    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly configFileService:ConfigFileService,
                private readonly router:Router,
                private readonly clientService:ClientService,
                private readonly configureService:ConfigureService){

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
                const message = error.error.errorMessage==null?"Error al listar las lineas":error.error.errorMessage;
                this.showMessage(message,false);
            });

    }
    private setCreateData():void{
        this.activityType =this.activityType;
        this.labelButton =this.activityType=="2"?"Actulizar archivo" :"Crear archivo";
        this.fileConfigForm = this.initForm();
        if(this.dataLoad!= undefined){
            this.fileConfigForm= this.loadData();
            this.fileConfigForm.get('active')?.setValue(this.dataLoad.active ? 'Y' : 'N');
            this.fileConfigForm.get('client')?.setValue(this.dataLoad.client?.toString());
            this.fileConfigForm.get('line')?.setValue(this.dataLoad.line.toString());
            this.fileConfigForm.get('levelacces')?.setValue(this.dataLoad.levelAcces?.toString());
        }
    }

    private loadData():FormGroup{
        return this.fb.group({
            id:[this.dataLoad.id,""],
            client:[this.dataLoad.client,[Validators.required]],
            name:[this.dataLoad.name,[Validators.required]],
            line:[this.dataLoad.line,[Validators.required]],
            levelacces:[this.dataLoad.levelAcces,[Validators.required]],
            active:["",[Validators.required]],
        });
    }


    private initForm():FormGroup{
        return this.fb.group({
            id:["",],
            client:["",[Validators.required]],
            name:["",[Validators.required]],
            line:["",[Validators.required]],
            levelacces:["",[Validators.required]],
            active:["",[Validators.required]],
        });
    }

    private createFileConfig():LoadFileConfig{
        const data:LoadFileConfig = {
            client:this.fileConfigForm.value.client,
            name:this.fileConfigForm.value.name,
            active:this.fileConfigForm.value.active=="Y"?true:false,
            line:this.fileConfigForm.value.line,
            levelAcces:this.fileConfigForm.value.levelacces,
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
                this.configFileService.createConfigFile(this.createFileConfig()).subscribe(
                    data => {
                        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                            this.router.navigate(['load-file']);
                        });
                        this.showMessage(data.result,false);    
                    },
                    error => {
                        const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                        this.showMessage(message,false);
                });
            });
    }

    private updateLoadFile():void{
        if (this.fileConfigForm.value.id==null || this.fileConfigForm.value.id==""){
            this.showMessage("No se encontró una configuración asociada",false)
        }else{
            const dialogRef =  this.showMessage("Esta seguro que desea actualizar el cargue de archivo ",true);
            dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var dataFile = this.createFileConfig();
            dataFile.id = this.fileConfigForm.value.id;
            this.configFileService.updateConfigFile(dataFile).subscribe(
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

    newCapture(){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['load-file-detail']);
        });
    }

    private refreshPage(dataFile:LoadFileConfig){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['load-file-detail'],{queryParams:{dataclient:JSON.stringify(dataFile)}});
        });
    }
}
    
