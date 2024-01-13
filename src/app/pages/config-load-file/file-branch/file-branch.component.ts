import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { LoadFileBranch, LoadFileConfig } from "../../../core/modules/loadfile/loadfile";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableLoadFileColumns } from "../../../core/helpers/tableloadfileColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { pagination } from "../../../core/constants/constants";
import { FileService } from "../../../services/fileService";

@Component({
    selector:"app-load-file-branch",
    templateUrl: "./file-branch.component.html",
    standalone: true,
    imports:[SharedModule]
})

export class LoadFileBranchComponent implements OnInit,AfterViewInit{
    fileBranchForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    configItemTable!:TableConfig;
    dataSourceItem!:LoadFileBranch[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:LoadFileConfig;
    loadFileid!:number;


    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly fileService:FileService){}

    ngOnInit(): void {
        this.setConfigItemTable();
        this.route.queryParams.subscribe((params:Params)=> {
            this.activityType = params['activity'];
            this.dataclient = params['dataclient'];
        });
        if (this.dataclient==undefined){
            this.activityType ="1";
        }else{
            this.loadFileid = this.dataclient.id !== undefined ? this.dataclient.id : 0;
        }
        this.labelButton = this.activityType=="1"?"Adicionar sucursal": this.activityType=="2"?"Actualizar sucursal":"";
        this.fileBranchForm = this.initForm();
    }

    ngAfterViewInit() {
        if (this.activityType=="2"){
            this.loadFileByBranch(this.loadFileid,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        }
    }

    private loadFileByBranch(id:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.fileService.getLoadFileByBranch(id,startIndex,endIndex).subscribe(data=>{
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

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableLoadFileColumns.setBranchTableColumns(),true);
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Cargue de archivos. Adicionar sucursal",
                message:message,
                confirm:confirm
            }
        });
    }

    private createFileBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar una sucural",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client:LoadFileBranch = {
                active :true,
                branch : this.fileBranchForm.value.branch,
                configFileId :  this.fileBranchForm.value.configFileId
            };
            this.fileService.createLoadFileBranch(client).subscribe(
                data => {
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private updateFileBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea actualizar una sucural",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client:LoadFileBranch = {
                active :true,
                branch : this.fileBranchForm.value.branch,
                configFileId :  this.fileBranchForm.value.configFileId
            };
            this.fileService.updateLoadFileBranch(client).subscribe(
                data => {
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    onSubmit(){
        if(this.loadFileid==null || this.loadFileid<= 0){
            this.showMessage("No se encontró el archivo de cargue para asociar.",false);
        }else{
            switch(this.activityType){
                case "1":{
                    this.createFileBranch();
                    break;
                }                
                case "2":{
                    this.updateFileBranch();
                    break;
                }                
                default:{
                    this.showMessage("Activdad no permitida",false);
                }
            }
        }
    }

    onDataSelected(element:any){
        const result:LoadFileBranch = JSON.parse(JSON.stringify(element));
    }

    initForm():FormGroup{
        return this.fb.group({
            configFileId:[this.activityType!=="2"?"":this.fileBranchForm.value.configFileId,[Validators.required]],
            branch:[this.activityType!=="2"?"":this.fileBranchForm.value.branch,[Validators.required]],
            active:[this.activityType!=="2"?"":this.fileBranchForm.value.active,[Validators.required]],
        });
    }
}