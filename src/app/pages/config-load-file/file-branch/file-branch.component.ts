import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { LoadFileBranch, LoadFileConfig } from "../../../core/modules/loadfile/loadfile";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableLoadFileColumns } from "../../../core/helpers/tableloadfileColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { pagination } from "../../../core/constants/constants";
import { ConfigFileService } from "../../../services/configFileService";
import { ConfigureService } from "../../../services/configureService";
import { Branch } from "../../../core/modules/configuration/conciguration";

@Component({
    selector:"app-load-file-branch",
    templateUrl: "./file-branch.component.html",
    standalone: true,
    imports:[SharedModule]
})

export class LoadFileBranchComponent implements OnInit,AfterViewInit{
    fileBranchForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    configItemTable!:TableConfig;
    dataSourceItem!:LoadFileBranch[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:LoadFileConfig;
    loadFileid!:number;
    showBranch!:boolean;
    branchList!:Branch[];

    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly configFileService:ConfigFileService,
                private readonly configureService:ConfigureService){}

    ngOnInit(): void {
        this.setConfigItemTable();
        this.route.queryParams.subscribe((params:Params)=> {
            this.dataclient = JSON.parse(params['dataclient']);
        });
        this.setCreateData();
    }

    private setCreateData():void{
        if (this.dataclient != undefined){
            if (this.dataclient.levelAcces=="SU"){
                this.showBranch = true;
            }else{
                this.showBranch = false;
            }
        }
        this.activityType ="1";
        this.labelButton ="Crear sucursal";
        this.fileBranchForm = this.initForm();

        this.configureService.getBranchAll().subscribe(
        data=>{
            this.branchList = data.result;
        },
        error => {
            const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
            this.showMessage(message,false);
        });
    }

    ngAfterViewInit() {
        if (this.dataclient != undefined && this.dataclient.levelAcces=="SU"){
            this.getFileBranch(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        }
    }



    private getFileBranch(id:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.configFileService.getConfigFileAllBranch(id,startIndex,endIndex).subscribe(data=>{
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

    private setConfigItemTable():void{
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableLoadFileColumns.setBranchTableColumns(),false,true);
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Cargue de archivos. Adicionar sucursal",
                message:message,
                confirm:confirm
            }
        });
    }

    private createFileBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar una sucural",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            this.configFileService.createConfigFileBranch(this.getData()).subscribe(
                data => {
                    this.getFileBranch(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                    this.setCreateData();
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private updateFileBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea actualizar una sucural",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            let client = this.getData();
            client.id = this.fileBranchForm.value.id;
            console.log("Mi configuracion para enviar es ",client);
            this.configFileService.updateConfigFileBranch(client).subscribe(
                data => {
                    this.getFileBranch(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                    this.setCreateData();
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private getData(){
        var client:LoadFileBranch = {
            active :this.fileBranchForm.value.active=="Y"?true:false,
            branch : this.fileBranchForm.value.branch,
            configFile :  this.dataclient.id!
        };
        return client;
    }

    private loadData(data:LoadFileBranch) :FormGroup{
        return this.fb.group({
            id:[data.id,[Validators.required]],
            branch:[data.branch,[Validators.required]],
            active:["",[Validators.required]],
        });
    }

    onSubmit(){
        switch(this.activityType){
            case "1":{
                this.createFileBranch();
                break;
            }                
            case "2":{
                this.updateFileBranch();
                break;
            }                
            default:{
                this.showMessage("Activdad no permitida",false);
            }
        }
    }

    onDataSelected(element:any){
        const result:LoadFileBranch = JSON.parse(JSON.stringify(element));
        this.activityType ="2";
        this.labelButton ="Actulizar sucursal";

        this.fileBranchForm= this.loadData(result);
        this.fileBranchForm.get('active')?.setValue(result.active ? 'Y' : 'N');
        this.fileBranchForm.get('branch')?.setValue(result.branch.toString());
    }

    initForm():FormGroup{
        return this.fb.group({
            id:["",""],
            branch:["",[Validators.required]],
            active:["",[Validators.required]],
        });
    }

    reset(){
        this.setCreateData();
    }
}