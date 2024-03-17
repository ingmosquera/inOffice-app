import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../../core/shared/shared.module";
import { MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector:"app-inventory-archiving",
    templateUrl:"./inventory-archiving.component.html",
    standalone:true,
    imports:[SharedModule,CommonModule]
})

export class InventoryArchivingComponent implements OnInit{
    archivingForm!:FormGroup;   
    
    constructor(private readonly dialog:MatDialog,
                private readonly fb:FormBuilder,){}
    
    ngOnInit(): void {
        this.archivingForm = this.initForm();
    }

    private initForm():FormGroup{
        return this.fb.group({
            ubication:["",[Validators.required]],
            item:["",[Validators.required]],
            itemParent:["",""],
        });
    }

    addRow(){}
}