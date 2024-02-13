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
            this.dataclient = JSON.parse(params['dataclient']);
        });
        this.setCreateData();
    }

    private setCreateData():void{
        this.activityType ="1";
        this.labelButton ="Crear detalle";
        this.fileFieldForm = this.initForm();
    }


    ngAfterViewInit(): void {
        if (this.dataclient != undefined){
            this.loadFileByField(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
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
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableLoadFileColumns.setDetailTableColumns(),false,true);
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Cargue de archivos. Campos del archivo",
                message:message,
                confirm:confirm
            }
        });
    }

    private initForm():FormGroup{
        return this.fb.group({
            id:["",""],
            field:["",[Validators.required]],
            type:["",[Validators.required]],
            required:["",[Validators.required]],
            active:["",[Validators.required]]
        });
    }

    private loadFieldFilesData():LoadFiledDetail{
        const data :LoadFiledDetail = {
            configfile:this.dataclient.id!,
            field:this.fileFieldForm.value.field,
            type:this.fileFieldForm.value.type,
            required:this.fileFieldForm.value.required=="Y"?true:false,
            active:this.fileFieldForm.value.active=="Y"?true:false,
        };
        return data;
    }


    private createFileBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar una sucural",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.loadFieldFilesData();
            this.configFileService.createConfigFileDetail(client).subscribe(
                data => {
                    this.loadFileByField(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
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
                    this.loadFileByField(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private loadData(data:LoadFiledDetail) :FormGroup{
        return this.fb.group({
            id:[data.id,[Validators.required]],
            configfile:[data.configfile,[Validators.required]],
            field:[data.field,[Validators.required]],
            type:[data.type,[Validators.required]],
            required:["",[Validators.required]],
            active:["",[Validators.required]]
        });
    }
    
    onSubmit(){
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

    onDataSelected(element:any){
        const result:LoadFiledDetail = JSON.parse(JSON.stringify(element));
        
        this.activityType ="2";
        this.labelButton ="Actulizar detalle";

        this.fileFieldForm= this.loadData(result);
        this.fileFieldForm.get('active')?.setValue(result.active ? 'Y' : 'N');
        this.fileFieldForm.get('required')?.setValue(result.active ? 'Y' : 'N');
        this.fileFieldForm.get('type')?.setValue(result.type.toString());
        this.loadData(result);
    }

    reset(){
        this.setCreateData();
    }
    
}