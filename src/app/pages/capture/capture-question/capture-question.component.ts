import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { CaptureDetailQuestions } from "../../../core/modules/capture/capture";
import { SharedModule } from "../../../core/shared/shared.module";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { CaptureService } from "../../../services/captureService";
import { pagination } from "../../../core/constants/constants";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableCaptureColumns } from "../../../core/helpers/tableCaptureColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";

@Component({
    selector:"app-capture-question",
    templateUrl:"./capture-question.component.html",
    standalone:true,
    imports:[SharedModule]
})

export class QuestionDetailComponent implements OnInit,AfterViewInit{
    captureQuestionForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    configItemTable!:TableConfig;
    dataSourceItem!:CaptureDetailQuestions[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:CaptureDetailQuestions;
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
        this.captureService.getCaptureDetailByQuestion(id,startIndex,endIndex).subscribe(data=>{
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
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableCaptureColumns.setCaptureDetailQuestionsTableColumns(),true);
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Captura de información. Adicionar preguntas",
                message:message,
                confirm:confirm
            }
        });
    }

    private createCaptureQuestionData():CaptureDetailQuestions{
        const data:CaptureDetailQuestions={
            captureDetail:this.captureQuestionForm.value.capturedetailiId,
            question:this.captureQuestionForm.value.question,
            active:this.captureQuestionForm.value.active,
        };
        return data;
    }

    private createQuestionDetail():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar una pregunta",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.createCaptureQuestionData();
            this.captureService.createDetailQuestion(client).subscribe(
                data => {
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private updateCaptureQuestionDetail():void{
        const dialogRef =  this.showMessage("Esta seguro que desea actualizar una pregunta",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.createCaptureQuestionData();
            client.id = this.captureQuestionForm.value.id;
            this.captureService.updateDetailQuestion(client).subscribe(
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
                    this.createQuestionDetail();
                    break;
                }                
                case "2":{
                    this.updateCaptureQuestionDetail();
                    break;
                }                
                default:{
                    this.showMessage("Activdad no permitida",false);
                }
            }
        }
    }

    onDataSelected(element:any){
        const result:CaptureDetailQuestions = JSON.parse(JSON.stringify(element));
    }

    initForm():FormGroup{
        return this.fb.group({
            id:[this.activityType!=="2"?"":this.captureQuestionForm.value.id,[Validators.required]],
            capturedetailiId:[this.activityType!=="2"?"":this.captureQuestionForm.value.capturedetailiId,[Validators.required]],
            question:[this.activityType!=="2"?"":this.captureQuestionForm.value.question,[Validators.required]],
            active:[this.activityType!=="2"?"":this.captureQuestionForm.value.active,[Validators.required]],
        });
    }
}