import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { CaptureDetail } from "../../../core/modules/capture/capture";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { pagination } from "../../../core/constants/constants";
import { CaptureService } from "../../../services/captureService";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableCaptureColumns } from "../../../core/helpers/tableCaptureColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";

@Component({
    selector:"app-capture-detail",
    templateUrl:"./capture-detail.component.html",
    standalone:true,
    imports:[SharedModule]
})

export class CaptureDetailComponent implements OnInit, AfterViewInit{
    
    captureDetailForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    configItemTable!:TableConfig;
    dataSourceItem!:CaptureDetail[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:CaptureDetail;
    loadFileid!:number;

    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly captureService:CaptureService){}

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
        this.labelButton = this.activityType=="1"?"Adicionar eetalle captura": this.activityType=="2"?"Actualizar detalle captura":"";
        this.captureDetailForm = this.initForm();
    }

    ngAfterViewInit() {
        if (this.activityType=="2"){
            this.loadData(this.loadFileid,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        }
    }

    private loadData(id:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.captureService.getCaptureDetailByCapture(id,startIndex,endIndex).subscribe(data=>{
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
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableCaptureColumns.setCaptureDetailTableColumns(),true);
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Captura de información. Adicionar campos",
                message:message,
                confirm:confirm
            }
        });
    }

    private createCapureDetalilData():CaptureDetail{
        const data:CaptureDetail={
            captureId:this.captureDetailForm.value.captureId,
            field:this.captureDetailForm.value.field,
            itemtype:this.captureDetailForm.value.itemtype,
            fieldtype:this.captureDetailForm.value.fieldtype,
            required:this.captureDetailForm.value.required,
            active:this.captureDetailForm.value.active,
            search:this.captureDetailForm.value.search,
        };

        return data;
    }

    private createCaptureDetail():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar un detalle",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.createCapureDetalilData();
            this.captureService.createCaptureDetail(client).subscribe(
                data => {
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private updateCaptureDetail():void{
        const dialogRef =  this.showMessage("Esta seguro que desea actualizar un detalle",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.createCapureDetalilData();
            client.id = this.captureDetailForm.value.id;
            this.captureService.updateCaptureDetail(client).subscribe(
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
                    this.createCaptureDetail();
                    break;
                }                
                case "2":{
                    this.updateCaptureDetail();
                    break;
                }                
                default:{
                    this.showMessage("Activdad no permitida",false);
                }
            }
        }
    }

    onDataSelected(element:any){
        const result:CaptureDetail = JSON.parse(JSON.stringify(element));
    }

    initForm():FormGroup{
        return this.fb.group({
            id:[this.activityType!=="2"?"":this.captureDetailForm.value.id,[Validators.required]],
            captureId:[this.activityType!=="2"?"":this.captureDetailForm.value.captureId,[Validators.required]],
            field:[this.activityType!=="2"?"":this.captureDetailForm.value.field,[Validators.required]],
            itemtype:[this.activityType!=="2"?"":this.captureDetailForm.value.itemtype,[Validators.required]],
            fieldtype:[this.activityType!=="2"?"":this.captureDetailForm.value.fieldtype,[Validators.required]],
            required:[this.activityType!=="2"?"":this.captureDetailForm.value.required,[Validators.required]],
            active:[this.activityType!=="2"?"":this.captureDetailForm.value.active,[Validators.required]],
            search:[this.activityType!=="2"?"":this.captureDetailForm.value.search,[Validators.required]],
        });
    }
}