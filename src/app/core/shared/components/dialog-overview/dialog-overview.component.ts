import { Component, EventEmitter, Inject, Input, Output } from "@angular/core";
import { DetailItem } from "../../../modules/item/dataItem";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector:"app-dialog-overview",
    templateUrl:"./dialog-overview.html",
    standalone:true,
    imports:[MatButtonModule,MatDialogTitle, MatDialogContent,CommonModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule,MatDialogActions]
})

export class DialogOverViewComponent{
    @Output() saveInfo = new EventEmitter<DetailItem[]>();
    dynamicForm!:FormGroup;
    constructor(private fb:FormBuilder,
                public dialogRef: MatDialogRef<DialogOverViewComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any
        ){}
    
        ngOnInit(){
        this.createFormGroup();
    }
    
    private createFormGroup():void {
        const group:any={};
        this.data.fields.forEach((field:DetailItem)=> {
            group[field.id] = [field.fieldValue, Validators.required];
        });
        this.dynamicForm = this.fb.group(group);
    }

    onCancelClick():void{
        this.dialogRef.close();
    }

    onSaveData():void{
        var updateFields:DetailItem[]=[];
        for(const field of this.data.fields){
            const updateField:DetailItem = {
                id:field.id,
                fieldValue:this.dynamicForm.get(field.id.toString())?.value,
                createDate : field.createDate,
                item: field.item,
                nameField:field.mameField,
                modifiedDate: new Date(),
                userCreate : field.userCreate,
                userModified:"BlaBlaBla",
                urlImageItem:field.urlImageItem
            };
            updateFields= [updateField,...updateFields];
        }
        this.saveInfo.emit(updateFields);
        this.dialogRef.close();
    }
}