import { Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { CaptureConfig } from "../../../core/modules/capture/capture";
import { CaptureService } from "../../../services/captureService";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { pagination } from "../../../core/constants/constants";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableCaptureColumns } from "../../../core/helpers/tableCaptureColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";

@Component({
    selector:"app-capture-list",
    templateUrl:"./capture-list.component.html",
    standalone:true,
    imports:[SharedModule]
})

export class CaptureListComponent implements OnInit{
    configItemTable!:TableConfig;
    dataSourceItem! : CaptureConfig[];
    loadingData:boolean = false;
    totalItems!:number;
    
    constructor(private readonly router:Router,
        private readonly dialog: MatDialog,
        private readonly captureService:CaptureService){}
    
    ngOnInit(): void {
        this.setConfigItemTable();
        this.configFileAll(pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
    }

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableCaptureColumns.setCaptureConfigTableColumns(),false,true);
    }

    private configFileAll(page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.captureService.getCaptureAll(startIndex,endIndex).subscribe(data=>{
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
                title:"Captura de información",
                message:message,
                confirm:confirm
            }
        });
    }

    onDataSelected(element:any):void{
        const result = JSON.stringify(element);
        this.router.navigate(['capture-detail'],{queryParams:{dataclient:result,created:"1"}});
    }

    onPageItemChanged(event:any):void{
        this.configFileAll(event.pageIndex+1,event.pageSize);
    }
}