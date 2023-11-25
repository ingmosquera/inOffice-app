import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
    selector:'app-dialog',
    templateUrl:'./dialog.component.html',
    standalone:true,
    imports:[MatButtonModule,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,CommonModule]
})
export class DialogComponent{
    constructor(private dialogRef:MatDialogRef<DialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data:any
        ){}
    
    @Output() cancelClik = new EventEmitter<void>();
    @Output() confirmClik = new EventEmitter<void>();

    cancel(){
        this.cancelClik.emit();
        this.dialogRef.close();
    }

    confirm(){
        this.confirmClik.emit();
        this.dialogRef.close();
    }

    acept(){
        this.dialogRef.close();
    }

}

