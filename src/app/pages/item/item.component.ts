import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../core/shared/shared.module";
import { pagination } from "../../core/constants/constants";
import { ItemService } from "../../services/itemService";

import { PeriodicElement } from "../../core/modules/item/periodicElement";
import { ListPaginationResponse } from "../../core/Response/listPaginationResponse";
import { TableColumn, TableConfig } from "../../core/modules/config-components/table/table-config";
import { ConfigComponents } from "../../core/helpers/configComponents";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../core/shared/components/dialog/dialog.component";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    standalone: true,
    imports: [SharedModule]
})

export class ItemComponent implements OnInit {
    configTable!:TableConfig;
    dataSource! : PeriodicElement[];
    dataResponse !:ListPaginationResponse<PeriodicElement[]>;
    totalItems!:number;
    tittleTable:string="CONSULTA DE ITEMS";
    ////
    dialogTitle:string = "Tidulo de preuba";
    dialogMessage:string = "Vamos a validar si funciona la creación de componentes";
    constructor(private itemService:ItemService, private dialog: MatDialog){}
    ngOnInit(): void {
        this.showData(pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        this.setConfigTable();
    }

    setConfigTable():void{
        this.configTable = ConfigComponents.ConfigTable(this.tittleTable,pagination.PAGE_SIZE,this.totalItems,pagination.PAGE_SHOW_PAGE_SIZE,this.setTableColumns());
    }
    setTableColumns():TableColumn[] {
        return [
            {
                name:"demo",
                dataKey :"position",
                ishidden:true,
            },
            {
                name:"name-demo",
                dataKey :"name",
                ishidden:false,
            },
            {
                name:"weight-demo",
                dataKey :"weight",
                ishidden:false,
            },
            {
                name:"symbol-demo",
                dataKey :"symbol",
                ishidden:false,
            },
        ]
    }
    
    showData(page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.itemService.getItemsTest("",startIndex,endIndex).subscribe((data)=>{
            this.dataSource = data.result;
            this.totalItems = data.totalItems;        
        });
    }

    onPageChanged(event:any):void{
        this.showData(event.pageIndex+1,event.pageSize);
    }

    onclickValidate():void{
        const dialogRef = this.dialog.open(DialogComponent,{
            disableClose:true,
            data:{
                title:"Titulo de prueba",
                message:"Este es un mensaje para mirar que si funciona todo"
            }
        });

        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            console.log("La operacion sigue");
        });

        dialogRef.componentInstance.cancelClik.subscribe(()=>{
            console.log("Se cancelo la operacion");
        });

    }

}