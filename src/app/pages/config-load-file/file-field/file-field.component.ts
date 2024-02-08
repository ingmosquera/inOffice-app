import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { LoadFiledDetail } from "../../../core/modules/loadfile/loadfile";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableLoadFileColumns } from "../../../core/helpers/tableloadfileColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { pagination } from "../../../core/constants/constants";
import { ConfigFileService } from "../../../services/configFileService";

@Component({
    selector: "app-load-file-field",
    templateUrl:"./file-field.component.html",
    standalone: true,
    imports: [SharedModule]
})

export class LoadFileFieldComponent implements OnInit, AfterViewInit {
    fileFieldForm!:FormGroup;
    labelButton!:string;
    configItemTable!:TableConfig;
    dataSourceItem!:LoadFiledDetail[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:LoadFiledDetail;
    loadFileid!:number;
    activityType!:string;

    constructor(private readonly fb:FormBuilder,
        private readonly dialog:MatDialog,
        private readonly route:ActivatedRoute,
        private readonly configFileService:ConfigFileService){}
    
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
        this.fileFieldForm = this.initForm();
    }


    ngAfterViewInit(): void {
        if (this.activityType=="2"){
            this.loadFileByField(this.loadFileid,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        }
    }

    private loadFileByField(id:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.configFileService.getConigFileAllDetail(id,startIndex,endIndex).subscribe(data=>{
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
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableLoadFileColumns.setDetailTableColumns(),true);
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

    private initForm():FormGroup{
        return this.fb.group({
            configfileId:[this.activityType!=="2"?"":this.fileFieldForm.value.configfileId,[Validators.required]],
            field:[this.activityType!=="2"?"":this.fileFieldForm.value.field,[Validators.required]],
            type:[this.activityType!=="2"?"":this.fileFieldForm.value.type,[Validators.required]],
            required:[this.activityType!=="2"?"":this.fileFieldForm.value.required,[Validators.required]],
            active:[this.activityType!=="2"?"":this.fileFieldForm.value.active,[Validators.required]]
        });
    }

    private loadFieldFilesData():LoadFiledDetail{
        const data :LoadFiledDetail = {
            configfile:this.fileFieldForm.value.configfileId,
            field:this.fileFieldForm.value.field,
            type:this.fileFieldForm.value.type,
            required:this.fileFieldForm.value.required,
            active:this.fileFieldForm.value.active,
        };
        return data;
    }


    private createFileBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar una sucural",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.loadFieldFilesData();
            this.configFileService.createConfigFileDetail(client).subscribe(
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
            var client = this.loadFieldFilesData();
            client.id = this.fileFieldForm.value.id;
            this.configFileService.updateConfigFileDetail(client).subscribe(
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
        const result:LoadFiledDetail = JSON.parse(JSON.stringify(element));
    }

    
}