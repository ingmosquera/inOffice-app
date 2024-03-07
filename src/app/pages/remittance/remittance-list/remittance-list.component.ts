import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { RemittanceService } from "../../../services/remittanceService";
import { Router } from "@angular/router";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { Remittance } from "../../../core/modules/remesas/remittance";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableRemittanceColumns } from "../../../core/helpers/tableRemittanceComponents";
import { pagination } from "../../../core/constants/constants";
import { SharedModule } from "../../../core/shared/shared.module";



@Component({
    selector: "app-remittance-list",
    templateUrl: './remittance-list.component.html',
    standalone: true,
    imports: [SharedModule]
})

export class RemittanceListComponent implements OnInit{
    configItemTable!:TableConfig;
    dataSourceItem! : Remittance[];
    loadingData:boolean = false;
    totalItems!:number;

    constructor(private readonly remittanceService:RemittanceService,
        private readonly dialog:MatDialog,
        private readonly router:Router){}

    ngOnInit(): void {
        this.setConfigItemTable();
        this.getRemittanceAll(pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
    }

    onSubmit():void{}

    private getRemittanceAll(page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;

        this.remittanceService.getRemittance(startIndex,endIndex).subscribe(result=>{
            if(result.totalRegisters ==0)
                this.showMessage("No se encontró información de la remesa ",false);    
            
            this.dataSourceItem = result.data;
            this.totalItems = result.totalRegisters;        
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
                title:"Gestión de órdenes",
                message:message,
                confirm:confirm
            }
        });
    }

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableRemittanceColumns.setConfigRemittanceColumns(),false,true,false);
    }

    onPageClientChanged(event:any):void{
        this.getRemittanceAll(event.pageIndex+1,event.pageSize);
    }

    onDataSelected(element:any):void{
        const result = JSON.stringify(element);
        this.router.navigate(['remittance-detail'],{queryParams:{dataclient:result,created:"1"}});
    }
}