import { Injectable } from "@angular/core";
import { LoginUser } from "../core/modules/login/login";
import { Observable } from "rxjs";
import { ApiResponse } from "../core/Response/response";
import { environment } from "../../environments/environment"
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn:'root'})

export class AuthService{
    
    constructor(private http:HttpClient){}
    
    loginUser(userlogin: LoginUser):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPISECURITY}/Auth/login`
        return this.http.post<ApiResponse<string>>(Url,userlogin);
    }

}