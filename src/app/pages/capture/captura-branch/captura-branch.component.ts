import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { CaptureService } from "../../../services/captureService";
import { CaptureBranch } from "../../../core/modules/capture/capture";
import { pagination } from "../../../core/constants/constants";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableCaptureColumns } from "../../../core/helpers/tableCaptureColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";

@Component({
    selector:"app-captura-branch",
    templateUrl:"./captura-branch.component.html",
    standalone:true,
    imports:[SharedModule]
})

export class CaptureBrachComponent implements OnInit,AfterViewInit{
    captureQuestionForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    configItemTable!:TableConfig;
    dataSourceItem!:CaptureBranch[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:CaptureBranch;
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
            this.loadFileid = this.dataclient.captureId;
        }
        this.labelButton = this.activityType=="1"?"Adicionar eetalle captura": this.activityType=="2"?"Actualizar detalle captura":"";
        this.captureQuestionForm = this.initForm();
    }

    ngAfterViewInit() {
        if (this.activityType=="2"){
            this.loadData(this.loadFileid,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        }
    }

    private loadData(id:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.captureService.getCaptureByBranch(id,startIndex,endIndex).subscribe(data=>{
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
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableCaptureColumns.setCaptureBranchTableColumns(),true);
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Captura de información. Adicionar sucursal",
                message:message,
                confirm:confirm
            }
        });
    }

    private createCaptureBranchData():CaptureBranch{
        const data:CaptureBranch={
            captureId:this.captureQuestionForm.value.captureId,
            branch:this.captureQuestionForm.value.branch,
            active:this.captureQuestionForm.value.active,
        };
        return data;
    }

    private createCaptureBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar una sucursal",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            this.captureService.createCaptureBranch(this.createCaptureBranchData()).subscribe(
                data => {
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private updateCaptureBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea actualizar una sucursal",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            this.captureService.updateCaptureBranch(this.createCaptureBranchData()).subscribe(
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
                    this.createCaptureBranch();
                    break;
                }                
                case "2":{
                    this.updateCaptureBranch();
                    break;
                }                
                default:{
                    this.showMessage("Activdad no permitida",false);
                }
            }
        }
    }

    onDataSelected(element:any){
        const result:CaptureBranch = JSON.parse(JSON.stringify(element));
    }

    initForm():FormGroup{
        return this.fb.group({
            captureId:[this.activityType!=="2"?"":this.captureQuestionForm.value.captureId,[Validators.required]],
            branch:[this.activityType!=="2"?"":this.captureQuestionForm.value.branch,[Validators.required]],
            active:[this.activityType!=="2"?"":this.captureQuestionForm.value.active,[Validators.required]],
        });
    }
}