import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse, ListPaginationResponse } from "../core/Response/response";
import { LoadFileBranch, LoadFileConfig, LoadFileField } from "../core/modules/loadfile/loadfile";
import { environment } from "../../environments/environment";


@Injectable({providedIn: 'root'})

export class FileService{
    constructor(private readonly http:HttpClient){}
    private method:string="file";

    getLoadFileAll(startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<LoadFileConfig[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getAll`
        return this.http.get<ApiResponse<ListPaginationResponse<LoadFileConfig[]>>>(Url);
    }

    getLoadFileById(idfile:number):Observable<ApiResponse<LoadFileConfig[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${idfile}`
        return this.http.get<ApiResponse<LoadFileConfig[]>>(Url);
    }

    createConfigFile(data:LoadFileConfig):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateConfigFile(data:LoadFileConfig):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    getLoadFileByBranch(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<LoadFileBranch[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<LoadFileBranch[]>>>(Url);
    }

    createLoadFileBranch(data:LoadFileBranch):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateLoadFileBranch(data:LoadFileBranch):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    getLoadFileByField(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<LoadFileField[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<LoadFileField[]>>>(Url);
    }

    createLoadFileField(data:LoadFileField):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateLoadFileField(data:LoadFileField):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }
}