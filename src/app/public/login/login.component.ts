import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginUser } from "../../core/modules/login/login";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../core/shared/components/dialog/dialog.component";
import { Router } from "@angular/router";
import { AuthService } from "../../services/autService";

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrl:'./login.component.scss'
})

export class LoginComponent implements OnInit{
    loginForm!: FormGroup;

    constructor(private readonly fb:FormBuilder,
                private readonly authService:AuthService,
                private readonly dialog: MatDialog,
                private readonly router: Router){}

    ngOnInit(): void {
        this.loginForm = this.initForm();
    }

    onSubmit(){
        if (!this.loginForm.valid){
            this.showMessage("Pagina de Login","Debe diligenciar el usuario y el password",false);
        }else{
            const dataUser:LoginUser = {
                user:this.loginForm.value.user,
                password: this.loginForm.value.password,
            };
            this.authService.loginUser(dataUser).subscribe(
                data => {
                    if (data.statusCode==202){
                        this.showMessage("Login Usuario",data.result,false);    
                    }else{
                        this.showMessage("Login Usuario","Bienvenido al sistema de gestión de InOffice",false);
                        this.router.navigate(["/item"]);    
                    }
                },
                error => {
                    const message = error.error.errorMessage==null?"Error al procesar la solicitd":error.error.errorMessage;
                    this.showMessage("Login Usuario" ,message,false);
                    if(error.error.statusCode==401){
                        this.router.navigate(["/changePassword"]);
                    }
                });
        }
    }

    initForm():FormGroup{
        return this.fb.group({
            user:['',[Validators.required]],
            password:['',[Validators.required]]
        });
    }

    showMessage(title:string,message :string,confirm:boolean):void{
        this.dialog.open(DialogComponent,{
            disableClose:false,
            data:{
                title:title,
                message:message,
                confirm:confirm
            }
        });
    }

}