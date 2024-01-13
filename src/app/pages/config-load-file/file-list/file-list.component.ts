import { Component, OnInit } from "@angular/core";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { LoadFileConfig } from "../../../core/modules/loadfile/loadfile";
import { ClientModel } from "../../../core/modules/client/client";
import { SharedModule } from "../../../core/shared/shared.module";
import { Router } from "@angular/router";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableLoadFileColumns } from "../../../core/helpers/tableloadfileColumns";
import { FileService } from "../../../services/fileService";
import { pagination } from "../../../core/constants/constants";

@Component({
    selector:"app-load-file-list",
    templateUrl:"./file-list.component.html",
    standalone:true,
    imports:[SharedModule]
})

export class LoadFileListComponent implements OnInit {
    configItemTable!:TableConfig;
    dataSourceItem! : LoadFileConfig[];
    loadingData:boolean = false;
    totalItems!:number;
    clientModel!:ClientModel;
    

    constructor(private readonly router:Router,
                private readonly dialog: MatDialog,
                private readonly fileService:FileService){}
    ngOnInit(): void {
        this.setConfigItemTable();
        this.configFileAll(pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
    }

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableLoadFileColumns.setConfigFileTableColumns(),true);
    }

    private configFileAll(page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.fileService.getLoadFileAll(startIndex,endIndex).subscribe(data=>{
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

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Gestión de clientes. Tipo de item",
                message:message,
                confirm:confirm
            }
        });
    }


    onDataSelected(element:any):void{
        const result:LoadFileConfig = JSON.parse(JSON.stringify(element));
        this.router.navigate(['load-file-detail'],{queryParams:{activity:"2",data:result}});
    }

    onPageItemChanged(event:any):void{
        this.configFileAll(event.pageIndex+1,event.pageSize);
    }
}