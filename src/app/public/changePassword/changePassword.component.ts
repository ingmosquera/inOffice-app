import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../services/autService";
import { LoginUser } from "../../core/modules/login/login";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../core/shared/components/dialog/dialog.component";

@Component({
    selector:'app-changePassword',
    templateUrl:'./changePassword.component.html',
    styleUrl:'./changePassword.component.scss'
})
export class ChangePasswordComponent  implements OnInit {
    changePasswordForm!: FormGroup;
    constructor(private readonly fb:FormBuilder){}

    ngOnInit(): void {
        this.changePasswordForm = this.initForm();
    }

    initForm():FormGroup{
        return this.fb.group({
            currentPassword:['',[Validators.required]],
            newPassword:['',[Validators.required]],
            ConfirmPassword:['',[Validators.required]]
        });
    }

    onSubmit(){
        
    }
}