import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { CapureDataService } from "../../../services/captureDataService";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { CaptureDataConfig, CaptureFieldData, CaptureItemType, CaptureQuestions } from "../../../core/modules/capture/capture-data";
import { CommonModule } from "@angular/common";
import { ItemCapture, ItemQuestionCapture } from "../../../core/modules/item/dataItem";

@Component({
    selector:"app-capture-data",
    templateUrl:"./capture-data.component.html",
    standalone:true,
    imports:[SharedModule,CommonModule]
})

export class CaptureDataComponent implements OnInit {
    searchCaptureForm!:FormGroup;
    captureDataConfig!:CaptureDataConfig;
    hasData:boolean = false;
    hasItemType:boolean = false;
    captureForm!:FormGroup;
    selectedItemTypeValue!:string;
    isParent:boolean = false;
    itemCode!:string;
    itemCodeParent!:string;
    itemTypeList!:CaptureItemType[];

    constructor(private readonly dialog:MatDialog,
                private readonly fb:FormBuilder,
                private readonly captureDataService:CapureDataService){}
    ngOnInit(): void {
        this.hasItemType = false;
        this.searchCaptureForm = this.initForm();
        this.createFormToCapture();
    }

    private createFormToCapture(){
        const formControls: { [key: string]: any } = {};
        this.captureDataConfig?.captureField.forEach((field: CaptureFieldData) => {
            if(field.idField > 0){
                const validators = field.fieldRequired ? [Validators.required] : [];
                const fieldId=field.idField+"-CAP";
                formControls[fieldId] = [null, validators];
            }
        });
        this.captureForm = this.fb.group(formControls);
        this.captureDataConfig?.captureQuestion.forEach((question: CaptureQuestions) => {
            if(question.idCapture > 0){
                const questionId=question.idCapture+"-PRE";
                formControls[questionId] = [null,Validators.required];
            }
        });
        this.captureForm = this.fb.group(formControls);
    }

    private initForm():FormGroup{
        return this.fb.group({
            radicado:["",[Validators.required]]
        });
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Captura de información",
                message:message,
                confirm:confirm
            }
        });
    }

    search():void{
        this.captureDataService.getItemTypeByCapture(this.searchCaptureForm.value.radicado).subscribe(
            data =>{
                this.itemTypeList = data.result;
                this.hasItemType=true;
                if(this.itemTypeList== null){
                    this.showMessage("No se encontró los tipos de item con el radicado ingresado.",false);    
                }
            },
            error=>{
                const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                this.showMessage(message,false);
            }
        );
    }

    onSubmit():void{
        const captureList: ItemCapture[] = [];
        const questionCaptureList: ItemQuestionCapture[] = [];
        Object.keys(this.captureForm?.value).forEach(key => {
            const [idField, fieldType] = key.split('-');
            if (fieldType=="CAP"){
                const itemCapture:ItemCapture = {
                    idField: parseInt(idField),
                    value: this.captureForm?.value[key],
                    item:"222222",
                    userCreated:"Create",
                    userNameCreated:"string",
                    dateCreated:new Date,
                    userModified:"string",
                    userNameModified:"string",
                    dateModified : new Date
                };
                captureList.push(itemCapture);
            }else if (fieldType=="PRE"){
                const itemQuestionCapture:ItemQuestionCapture = {
                    idQuestion: parseInt(idField),
                    value: this.captureForm?.value[key],
                    item:"222222",
                    userCreated:"Create",
                    userNameCreated:"string",
                    dateCreated:new Date,
                    userModified:"string",
                    userNameModified:"string",
                    dateModified : new Date
                };
                questionCaptureList.push(itemQuestionCapture);
            }
        });
    }

    onSelectionItemType():void{
        if (this.selectedItemTypeValue!=null){
            const infoItemType = this.itemTypeList.find(opc=> opc.itemType==this.selectedItemTypeValue)
            if(infoItemType?.itemTypeParent=="-"){
                this.isParent = false;
            }else{
                this.isParent=true;
            }
            this.captureDataService.getConfigForCapture(this.searchCaptureForm.value.radicado,this.selectedItemTypeValue).subscribe(
                data =>{
                    this.captureDataConfig = data.result;
                    if(this.captureDataConfig!= null){
                        this.hasData = true;
                        this.createFormToCapture();
                    }else{
                        this.showMessage("No se encontró un capturador con el radicado ingresado.",false);    
                    }
                },
                error=>{
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
                }
            );
        }
    }

}