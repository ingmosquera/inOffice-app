import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse, ListPaginationResponse } from "../core/Response/response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LoadFileBranch, LoadFileConfig, LoadFiledDetail } from "../core/modules/loadfile/loadfile";

@Injectable({providedIn: 'root'})

export class ConfigFileService{
    constructor(private readonly http:HttpClient){}
    private method:string="configfile";

    createConfigFile(data:LoadFileConfig):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/create`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateConfigFile(data:LoadFileConfig):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/update?idConfigFile=${data.id}`
        return this.http.post<ApiResponse<string>>(Url,data);
    }
    
    getConigFileAll(startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<LoadFileConfig[]>>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getAll?PageNumber=${startPage}&PageSize=${endPage}`
        return this.http.get<ApiResponse<ListPaginationResponse<LoadFileConfig[]>>>(Url);
    }

    createConfigFileDetail(data:LoadFiledDetail):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/createDetail`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateConfigFileDetail(data:LoadFiledDetail):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/updateDetail?idConfigFileDetail=${data.id}`
        return this.http.post<ApiResponse<string>>(Url,data);
    }
    
    getConigFileAllDetail(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<LoadFiledDetail[]>>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getAllDetail?PageNumber=${startPage}&PageSize=${endPage}&idConfigFileDetail=${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<LoadFiledDetail[]>>>(Url);
    }

    createConfigFileBranch(data:LoadFileBranch):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/createBranch`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateConfigFileBranch(data:LoadFileBranch):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/updateBranch?idConfigFileBranch=${data.id}`
        return this.http.post<ApiResponse<string>>(Url,data);
    }
    
    getConfigFileAllBranch(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<LoadFileBranch[]>>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getAllBranch?PageNumber=${startPage}&PageSize=${endPage}&idConfigFileBranch=${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<LoadFileBranch[]>>>(Url);
    }

    getConfigFileActiveList():Observable<ApiResponse<LoadFileConfig[]>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getActiveList`
        return this.http.get<ApiResponse<LoadFileConfig[]>>(Url);
    }
}
