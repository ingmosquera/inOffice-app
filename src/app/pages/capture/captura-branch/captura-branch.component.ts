import { AfterViewInit, Component, OnInit } from "@angular/core";
import { SharedModule } from "../../../core/shared/shared.module";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TableConfig } from "../../../core/modules/config-components/table/table-config";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Params } from "@angular/router";
import { CaptureService } from "../../../services/captureService";
import { CaptureBranch, CaptureConfig } from "../../../core/modules/capture/capture";
import { pagination } from "../../../core/constants/constants";
import { ConfigComponents } from "../../../core/helpers/configComponents";
import { TableCaptureColumns } from "../../../core/helpers/tableCaptureColumns";
import { DialogComponent } from "../../../core/shared/components/dialog/dialog.component";
import { ConfigureService } from "../../../services/configureService";
import { Branch } from "../../../core/modules/configuration/conciguration";

@Component({
    selector:"app-captura-branch",
    templateUrl:"./captura-branch.component.html",
    standalone:true,
    imports:[SharedModule]
})

export class CaptureBrachComponent implements OnInit,AfterViewInit{
    captureBranchForm!:FormGroup;
    labelButton!:string;
    activityType!:string;
    configItemTable!:TableConfig;
    dataSourceItem!:CaptureBranch[];
    loadingData:boolean = false;
    totalItems!:number;
    dataclient!:CaptureConfig;
    loadFileid!:number;
    showBranch!:boolean;
    branchList!:Branch[]

    constructor(private readonly fb:FormBuilder,
                private readonly dialog:MatDialog,
                private readonly route:ActivatedRoute,
                private readonly captureService:CaptureService,
                private readonly configureService:ConfigureService){}

    ngOnInit(): void {
        this.setConfigItemTable();
        this.route.queryParams.subscribe((params:Params)=> {
            this.dataclient = JSON.parse(params['dataclient']);
        });
        this.setCreateData();
        this.loadList();
    }

    private setCreateData():void{
        if (this.dataclient != undefined){
            if (this.dataclient.levelacces=="SU"){
                this.showBranch = true;
            }else{
                this.showBranch = false;
            }
        }
        this.activityType ="1";
        this.labelButton ="Crear sucursal";
        this.captureBranchForm = this.initForm();
    }

    ngAfterViewInit() {
        if (this.dataclient != undefined && this.dataclient.levelacces=="SU"){
            this.GetCaptureBranch(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
        }
    }

    private loadList(){
        this.configureService.getBranchAll().subscribe(
            data => {
                this.branchList = data.result;
            },
            error => {
                const message = error.error.errorMessage==null?"Error al listar las sucursales":error.error.errorMessage;
                this.showMessage(message,false);
            });
    }

    private GetCaptureBranch(id:number,page:number,pageSize:number):void{
        const startIndex = (page-1) * pageSize==0?1:(page-1) * pageSize;
        const endIndex = startIndex + pageSize;
        this.captureService.getCaptureByBranch(id,startIndex,endIndex).subscribe(data=>{
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
        this.configItemTable = ConfigComponents.ConfigTable("",this.totalItems,TableCaptureColumns.setCaptureBranchTableColumns(),false,true);
    }

    private showMessage(message :string,confirm:boolean){
        return this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:"Captura de información. Adicionar sucursal",
                message:message,
                confirm:confirm
            }
        });
    }

    private createCaptureBranchData():CaptureBranch{
        const data:CaptureBranch={
            capture:this.dataclient.id!,
            branch:this.captureBranchForm.value.branch,
            active:this.captureBranchForm.value.active=="Y"?true:false,
        };
        return data;
    }

    private createCaptureBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea adicionar una sucursal",true);
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            this.captureService.createCaptureBranch(this.createCaptureBranchData()).subscribe(
                data => {
                    this.GetCaptureBranch(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                    this.setCreateData();
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    private initForm():FormGroup{
        return this.fb.group({
            id:["",""],
            branch:["",[Validators.required]],
            active:["",[Validators.required]],
        });
    }

    private loadData(data:CaptureBranch) :FormGroup{
        return this.fb.group({
            id:[data.id,[Validators.required]],
            branch:[data.branch,[Validators.required]],
            active:["",[Validators.required]],
        });
    }


    private updateCaptureBranch():void{
        const dialogRef =  this.showMessage("Esta seguro que desea actualizar una sucursal",true);
        
        dialogRef.componentInstance.confirmClik.subscribe(()=>{
            let branch = this.createCaptureBranchData();
            branch.id = this.captureBranchForm.value.id;
            this.captureService.updateCaptureBranch(branch).subscribe(
                data => {
                    this.GetCaptureBranch(this.dataclient.id!,pagination.PAGE_NUMBER,pagination.PAGE_SIZE);
                    this.setCreateData();
                    this.showMessage(data.result,false);    
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage(message,false);
            });
        });
    }

    onSubmit(){
        switch(this.activityType){
            case "1":{
                this.createCaptureBranch();
                break;
            }                
            case "2":{
                this.updateCaptureBranch();
                break;
            }                
            default:{
                this.showMessage("Activdad no permitida",false);
            }
        }
    }

    onDataSelected(element:any){
        const result:CaptureBranch = JSON.parse(JSON.stringify(element));
        
        this.activityType ="2";
        this.labelButton ="Actulizar sucursal";

        this.captureBranchForm= this.loadData(result);
        this.captureBranchForm.get('active')?.setValue(result.active ? 'Y' : 'N');
        this.captureBranchForm.get('branch')?.setValue(result.branch.toString());
    }

    reset(){
        this.setCreateData();
    }
}