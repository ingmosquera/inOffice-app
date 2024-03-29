import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../core/shared/shared.module";
import { pagination } from "../../core/constants/constants";
import { ItemService } from "../../services/itemService";

import { ListPaginationResponse } from "../../core/Response/response";
import { TableConfig } from "../../core/modules/config-components/table/table-config";
import { ConfigComponents } from "../../core/helpers/configComponents";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../core/shared/components/dialog/dialog.component";
import { DialogOverViewComponent } from "../../core/shared/components/dialog-overview/dialog-overview.component";
import { DetailItem, MovementItem } from "../../core/modules/item/dataItem";
import { MatExpansionModule } from "@angular/material/expansion";
import { Client, ClientField } from "../../core/modules/client/client";
import { ClientService } from "../../services/clientService";
import { DataItem } from "../../core/modules/item/dataItem";

import { MatTabsModule } from "@angular/material/tabs";
import { DetailRemittance } from "../../core/modules/remesas/remittance";
import { TableItemColumns } from "../../core/helpers/tableItemColumns";

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrl: "./item.component.scss",
    standalone: true,
    imports: [SharedModule, MatExpansionModule, MatTabsModule]
})

export class ItemComponent implements OnInit {
    configItemTable!:TableConfig;
    configHistoryTable!:TableConfig;
    configRemittanceTable!:TableConfig;
    dataSourceItem! : DataItem[];
    dataSourceHistory! : MovementItem[];
    dataSourceRemittance! : DetailRemittance[];
    dataResponse !:ListPaginationResponse<DataItem[]>;
    totalItems!:number;
    totalRemittance!:number;
    totalHistory!:number;
    loadingData:boolean = false;
    panelOpenState = false;
    selectedClientValue!: string;
    selectedFieldClientValue: string="";
    clienteList!:Client[];
    fieldByClient!:ClientField[];
    valuesfilter!:string;
    hiddenfilter!:string;
    valueParameter!:string;
    selectedOption!:string;
    itemSelect!:string;
    itemDetailUpdate!:DetailItem[]
    constructor(private itemService:ItemService, 
                private dialog: MatDialog,
                private clientService:ClientService){}
    ngOnInit(): void {
        this.setFiltervalue();
        this.setConfigItemTable();
        this.setConfigHistoryTable();
        this.setConfigRemittanceTable();
        this.getClientList();
    }

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableItemColumns.setItemTableColumns(),false,true);
    }
    
    private setConfigHistoryTable():void{
        this.configHistoryTable = ConfigComponents.ConfigTable("",this.totalHistory,TableItemColumns.setHistoryItemTableColumns(),false,false);
    }

    private setConfigRemittanceTable():void{
        this.configRemittanceTable = ConfigComponents.ConfigTable("",this.totalRemittance,TableItemColumns.setRemittanceDetailTableColumns(),false,false);
    }
    private setFiltervalue():void{
        this.valuesfilter="";
        this.hiddenfilter="";
        this.valueParameter="";
        this.selectedOption="";
    }
    
    showItemData(page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.itemService.getItem(this.hiddenfilter,startIndex,endIndex).subscribe(data=>{
            if(data.result.totalRegisters ==0)
                return this.showMessage("No se encontró información con los parámetros ingresados.");

            this.dataSourceItem = data.result.data;
            this.totalItems = data.result.totalRegisters;        
            this.loadingData=false;
        },
        error => {
            const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
            this.showMessage(message);
        });
        
        this.setConfigItemTable();
    }

    showHistoryData(page:number,pageSize:number,item:string):void{
        const startIndex = page;//(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.itemService.getMovementItem(item,startIndex,endIndex).subscribe((data)=>{
            this.totalItems = data.result.totalRegisters;        
            this.loadingData=false;
            this.dataSourceHistory = data.result.data;
        },
        error => {
            const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
            this.showMessage(message);
        });
        this.setConfigHistoryTable();
    }

    showRemittanceData(page:number,pageSize:number,item:string):void{
        const startIndex = page;//(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.itemService.getItemDetailRemittance(item,startIndex,endIndex).subscribe(data=>{
            this.dataSourceRemittance = data.result.data;
            this.totalItems = data.result.totalRegisters;        
            this.loadingData=false;
        },
        error => {
            const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
            return this.showMessage(message);
        });
        this.setConfigRemittanceTable();
    }


    onPageItemChanged(event:any):void{
        this.showItemData(event.pageIndex+1,event.pageSize);
    }

    onPageHistoryChanged(event:any):void{
        this.showItemData(event.pageIndex+1,event.pageSize);
    }

    onPageRemittanceChanged(event:any):void{
        this.showItemData(event.pageIndex+1,event.pageSize);
    }
    onDataSelected(element:any):void{
        const result:DataItem = JSON.parse(JSON.stringify(element));
        this.itemService.getItemDetail(result.item).subscribe((data)=>{
            if (data.result.length==0)
                return this.showMessage("No se encontró detalle del item "+ result.item);
            
            this.showHistoryData(pagination.PAGE_NUMBER,pagination.PAGE_SIZE,result.item);
            this.showRemittanceData(pagination.PAGE_NUMBER,pagination.PAGE_SIZE,result.item);
            this.openDialog(data.result,result.item);
        },
        error => {
            const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
            return this.showMessage(message);
        });
    }

    openDialog(data:DetailItem[],item:string):void{
        const dialogRef = this.dialog.open(DialogOverViewComponent, {
            disableClose:true,
            data:{
                fields: data,
                title:"Informacion del item "+item
            }
        });

        dialogRef.componentInstance.saveInfo.subscribe((data)=>{
            this.itemService.updateItemDetail(data).subscribe(
                data => {
                    this.showMessage(`El item ${item}, fue actualizado sin novedad`);
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message);
            });
        });
    }

    getClientList():void{
        this.clientService.getClientActive().subscribe(
            data => {
                this.clienteList = data.result;
            },
            error => {
                const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                this.showMessage(message);
            });
    }

    onSelectionChangeFileds(){
        if (this.selectedClientValue!=null){
            this.clientService.getListFieldByClient(this.selectedClientValue).subscribe(data=>{
                this.selectedFieldClientValue = "";    
                this.fieldByClient = data.result;
            },
            error => {
                const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                this.showMessage(message);
            });
        }
    }
    private showMessage(message:string,title:string = "Consulta de items",confirm:boolean=false):void{
        this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:title,
                message: message,
                confirm:false
            }
        });
    }
    addDataOnFilter(){

        if (this.selectedClientValue.length==0)
            return this.showMessage("Debe seleccionar un cliente de la lista");
        
        if (this.selectedFieldClientValue.length==0 && this.valueParameter.length > 0 || this.selectedFieldClientValue.length >0 && this.valueParameter.length==0)
            return this.showMessage("Debe seleccionar un campo y adicionar un valor");
        
        if (this.selectedFieldClientValue.length > 0 && this.valueParameter.length > 0 && this.selectedOption.length ==0 )
            return this.showMessage("Debe seleccionar un parametro de union el cual es Y/O");

        const clienteName= this.clienteList.filter((client:Client)=> client.id==this.selectedClientValue)
                                           .map((client)=> client.name);

        const filedName = this.fieldByClient.filter((field:ClientField)=> field.name==this.selectedFieldClientValue)
                                           .map((field)=> field.name);

        const idField = this.fieldByClient.filter((field:ClientField)=> field.name==this.selectedFieldClientValue)
                                            .map((field)=> field.id);                                            
        
        const filedRealValue = idField[0] ==0?filedName:'value';
        const valueParameter = filedRealValue=='value'?`${filedName} contiene ${this.valueParameter}`:`${filedName} = ${this.valueParameter}`;
        if (this.valuesfilter.length==0){
            if(this.selectedFieldClientValue.length >0 && this.valueParameter.length>0){
                this.valuesfilter= `${clienteName} = ${this.selectedClientValue} ${this.selectedOption} ${valueParameter}`;
            }else{
                this.valuesfilter= `${clienteName} = ${this.selectedClientValue}`;
            }
        }
        else{
            if(this.selectedFieldClientValue.length >0 && this.valueParameter.length > 0){
                this.valuesfilter=`${this.valuesfilter} and ${clienteName} = ${this.selectedClientValue} ${this.selectedOption} ${valueParameter}`;
            }else{
                this.valuesfilter= `${this.valuesfilter} and ${clienteName} = ${this.selectedClientValue}`;
            }
        }
        
        if (this.hiddenfilter.length==0){
            if(this.selectedFieldClientValue.length >0 && this.valueParameter.length>0){
                if (filedRealValue=='value'){
                    this.hiddenfilter= `idClient = '${this.selectedClientValue}' ${this.selectedOption} ${filedRealValue} like '--${this.valueParameter}--'  ${this.selectedOption} field=${idField[0]}`;
                }else
                {
                    this.hiddenfilter= `idClient = '${this.selectedClientValue}' ${this.selectedOption} ${filedRealValue} = '${this.valueParameter}'`;
                }
            }else{
                this.hiddenfilter= `idClient = '${this.selectedClientValue}'`;
            }
        }
        else{
            if(this.selectedFieldClientValue.length >0 && this.valueParameter.length > 0){
                if (filedRealValue=='value'){
                    this.hiddenfilter=`${this.hiddenfilter} or idClient= '${this.selectedClientValue}' ${this.selectedOption} ${filedRealValue} like '--${this.valueParameter}--'  ${this.selectedOption} field=${idField[0]}`;
                }
                
            }else{
                this.hiddenfilter= `${this.hiddenfilter} or idClient = '${this.selectedClientValue}'`;
            }
        }
        this.valueParameter="";
    }

    borrarFilter(){
        this.setFiltervalue();
    }

    getDataIntem():void{
        this.showItemData(pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
    }

    
}
