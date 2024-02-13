import { Component, OnInit } from "@angular/core";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { Client  } from "../../../core/modules/client/client";
import { ClientService } from "../../../services/clientService";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableClientColumns } from "../../../core/helpers/tableClientColumns";
import { pagination } from "../../../core/constants/constants";
import { SharedModule } from "../../../core/shared/shared.module";
import { Router } from "@angular/router";


@Component({
    selector: "app-client-list",
    templateUrl: "./client-list.component.html",
    standalone: true,
    imports: [SharedModule]
})

export class ClientListComponent implements OnInit{
    configItemTable!:TableConfig;
    dataSourceItem! : Client[];
    loadingData:boolean = false;
    totalItems!:number;
    
    constructor(private readonly clientService:ClientService,
                private readonly dialog:MatDialog,
                private readonly router:Router){}
    
    ngOnInit(): void {
        this.setConfigItemTable();
        this.ClientAll(pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
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
    
    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableClientColumns.setClientTableColumns(),false,true);
    }

    private ClientAll(page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.clientService.getClientAll(startIndex,endIndex).subscribe(data=>{
            if(data.result.totalRegisters ==0)
                this.showMessage("No se encontró información de clientes ",false);    
            
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

    onPageClientChanged(event:any):void{
        this.ClientAll(event.pageIndex+1,event.pageSize);
    }

    onDataSelected(element:any):void{
        const result = JSON.stringify(element);
        this.router.navigate(['client-detail'],{queryParams:{dataclient:result,created:"1"}});
    }

}