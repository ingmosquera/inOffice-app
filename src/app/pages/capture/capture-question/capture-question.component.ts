import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { CaptureDetail, CaptureDetailQuestions } from "../../../core/modules/capture/capture";
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
    dataclient!:CaptureDetail;
    loadFileid!:number;
    filedCaptureList!:CaptureDetail[];

    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly captureService:CaptureService){}

    ngOnInit(): void {
        this.setConfigItemTable();
        this.route.queryParams.subscribe((params:Params)=> {
            this.dataclient = JSON.parse(params['dataclient'])
        });
        if (this.dataclient != undefined){
            this.loadList(this.dataclient.id!);
        }
        this.setCreateData();
    }

    ngAfterViewInit() {
        if (this.dataclient != undefined){
            this.getCaptureQuestionData(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        }
    }

    private loadList(idCapture:number):void{
        this.captureService.getCaptureFiledList(idCapture).subscribe(
            data => {
                this.filedCaptureList = data.result;
            });
    }

    private setCreateData():void{
        this.activityType ="1";
        this.labelButton ="Crear pregunta";
        this.captureQuestionForm = this.initForm();
    }

    private initForm():FormGroup{
        return this.fb.group({
            id:["",""],
            detailFieldName:["",[Validators.required]],
            question:["",[Validators.required]],
            active:["",[Validators.required]],
        });
    }

    private loadData(data:CaptureDetailQuestions) :FormGroup{
        return this.fb.group({
            id:[data.id,[Validators.required]],
            detailFieldName:[data.captureDetail,[Validators.required]],
            question:[data.question,[Validators.required]],
            active:["",[Validators.required]],
        });

    }

    private getCaptureQuestionData(id:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.captureService.getCaptureDetailByQuestion(id,startIndex,endIndex).subscribe(data=>{
            if(data.result.totalRegisters ==0)
                this.showMessage("No se encontró información con los parámetros ingresados123.",false);
            
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
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableCaptureColumns.setCaptureDetailQuestionsTableColumns(),false,true);
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
            captureDetail:this.captureQuestionForm.value.detailFieldName,
            question:this.captureQuestionForm.value.question,
            active:this.captureQuestionForm.value.active=="Y"?true:false,
        };
        return data;
    }

    private createQuestionDetail():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar una pregunta",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.createCaptureQuestionData();
            this.captureService.createDetailQuestion(client).subscribe(
                data => {
                    this.getCaptureQuestionData(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                    this.setCreateData();
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private updateQuestionDetail():void{
        const dialogRef =  this.showMessage("Esta seguro que desea actualizar una pregunta",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            var client = this.createCaptureQuestionData();
            client.id = this.captureQuestionForm.value.id;
            this.captureService.updateDetailQuestion(client).subscribe(
                data => {
                    this.getCaptureQuestionData(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                    this.setCreateData();
                    this.showMessage(data.result,false);    
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
                this.createQuestionDetail();
                break;
            }                
            case "2":{
                this.updateQuestionDetail();
                break;
            }                
            default:{
                this.showMessage("Activdad no permitida",false);
            }
        }
    }

    onDataSelected(element:any){
        const result:CaptureDetailQuestions = JSON.parse(JSON.stringify(element));
        this.activityType ="2";
        this.labelButton ="Actulizar preguta";

        this.captureQuestionForm= this.loadData(result);
        this.captureQuestionForm.get('active')?.setValue(result.active ? 'Y' : 'N');
        this.captureQuestionForm.get('detailFieldName')?.setValue(result.captureDetail.toString());
    }


    reset(){
        this.setCreateData();
    }
}