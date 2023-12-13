import { Injectable } from "@angular/core";
import { Client, FieldByClient } from "../core/modules/client/client";
import { Observable } from "rxjs";
import { ApiResponse } from "../core/Response/response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})

export class ClientService{
    constructor(private readonly http:HttpClient){}
    
    
    getClientActive():Observable<ApiResponse<Client[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/Client/getAll`
        return this.http.get<ApiResponse<Client[]>>(Url);
    }

    getFieldByClient(idClient:string):Observable<ApiResponse<FieldByClient[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/Client/fields/${idClient}`
        return this.http.get<ApiResponse<FieldByClient[]>>(Url);
    }
}
