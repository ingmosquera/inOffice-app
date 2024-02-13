import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../core/Response/response";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Branch, ItemStatus, ItemType, Line } from "../core/modules/configuration/conciguration";
@Injectable({providedIn: 'root'})


export class ConfigureService{
    constructor(private readonly http:HttpClient){}
    private method:string="configure";

    getLineAll():Observable<ApiResponse<Line[]>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getLine`
        return this.http.get<ApiResponse<Line[]>>(Url);
    }

    getBranchAll():Observable<ApiResponse<Branch[]>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getBranch`
        return this.http.get<ApiResponse<Branch[]>>(Url);
    }

    getItemTypeAll():Observable<ApiResponse<ItemType[]>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getItemType`
        return this.http.get<ApiResponse<ItemType[]>>(Url);
    }

    getItemStatusAll():Observable<ApiResponse<ItemStatus[]>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getItemStatus`
        return this.http.get<ApiResponse<ItemStatus[]>>(Url);
    }

    getItemTypeParentStatusAll():Observable<ApiResponse<ItemType[]>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getItemTypeParent`
        return this.http.get<ApiResponse<ItemType[]>>(Url);
    }
}