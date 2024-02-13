import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { CaptureConfig, CaptureDetail } from "../../../core/modules/capture/capture";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CaptureService } from "../../../services/captureService";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableCaptureColumns } from "../../../core/helpers/tableCaptureColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { pagination } from "../../../core/constants/constants";
import { ItemType } from "../../../core/modules/configuration/conciguration";
import { ConfigureService } from "../../../services/configureService";

@Component({
    selector:"app-capture-detail",
    templateUrl:"./capture-detail.component.html",
    standalone:true,
    imports:[SharedModule]
})

export class CaptureDetailComponent implements OnInit,AfterViewInit{
    
    captureDetailForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    configItemTable!:TableConfig;
    dataSourceItem!:CaptureDetail[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:CaptureConfig;
    loadFileid!:number;
    showButton:boolean = false;
    itemTypeList!:ItemType[];

    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly captureService:CaptureService,
                private readonly configureService:ConfigureService){}

    ngOnInit(): void {
        this.setConfigItemTable();
        this.route.queryParams.subscribe((params:Params)=> {
            if ('dataclient' in params)
                this.dataclient =JSON.parse(params['dataclient'])
        });
        
        this.setCreateData();
        this.loadList();
    }

    ngAfterViewInit() {
        if (this.dataclient != undefined){
            this.getCaptureDetail(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        }
    }

    private loadList(){
        this.configureService.getItemTypeAll().subscribe(
            data => {
                this.itemTypeList = data.result;
            },
            error => {
                const message = error.error.errorMessage==null?"Error al listar los tipos de item":error.error.errorMessage;
                this.showMessage(message,false);
            });
    }

    private setCreateData():void{
        this.activityType ="1";
        this.labelButton ="Crear Captura";
        this.captureDetailForm = this.initForm();
    }

    private getCaptureDetail(idCapture:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.captureService.getCaptureDetailByCapture(idCapture,startIndex,endIndex).subscribe((data)=>{
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

    private loadData(data:CaptureDetail):FormGroup{
        return this.fb.group({
            id:[data.id,[Validators.required]],
            field:[data.field,[Validators.required]],
            itemType:[data.itemtype,[Validators.required]],
            fieldType:[data.fieldtype,[Validators.required]],
            required:["",[Validators.required]],
            active:["",[Validators.required]],
            search:["",[Validators.required]],
        });
    }

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableCaptureColumns.setCaptureDetailTableColumns(),false,true);
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
            capture:this.dataclient.id! ,
            field:this.captureDetailForm.value.field,
            itemtype:this.captureDetailForm.value.itemType,
            fieldtype:this.captureDetailForm.value.fieldType,
            required:this.captureDetailForm.value.required=="Y"?true:false,
            active:this.captureDetailForm.value.active=="Y"?true:false,
            search:this.captureDetailForm.value.search=="Y"?true:false,
        };
        return data;
    }

    createCaptureDetail():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar un detalle",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.createCapureDetalilData();
            this.captureService.createCaptureDetail(client).subscribe(
                data => {
                    this.getCaptureDetail(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
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
                    this.getCaptureDetail(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    onSubmit(){
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

    onDataSelected(element:any){
        const result:CaptureDetail = JSON.parse(JSON.stringify(element));
        this.activityType ="2";
        this.labelButton ="Actulizar Capturador";

        this.captureDetailForm= this.loadData(result);
        this.captureDetailForm.get('active')?.setValue(result.active ? 'Y' : 'N');
        this.captureDetailForm.get('search')?.setValue(result.search ? 'Y' : 'N');
        this.captureDetailForm.get('required')?.setValue(result.required ? 'Y' : 'N');
        this.captureDetailForm.get('itemType')?.setValue(result.itemtype.toString());
        this.captureDetailForm.get('fieldType')?.setValue(result.fieldtype.toString());
    }

    private initForm():FormGroup{
        return this.fb.group({
            id:["",""],
            field:["",[Validators.required]],
            itemType:["",[Validators.required]],
            fieldType:["",[Validators.required]],
            required:["",[Validators.required]],
            active:["",[Validators.required]],
            search:["",[Validators.required]],
        });
    }

    reset(){
        this.setCreateData();
    }
}