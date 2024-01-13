import { Injectable, enableProdMode } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiResponse, ListPaginationResponse } from "../core/Response/response";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CaptureBranch, CaptureConfig, CaptureDetail, CaptureDetailQuestions } from "../core/modules/capture/capture";

@Injectable({providedIn: 'root'})

export class CaptureService{
    constructor(private readonly http:HttpClient){}
    private method:string="file";

    getCaptureAll(startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<CaptureConfig[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getAll`
        return this.http.get<ApiResponse<ListPaginationResponse<CaptureConfig[]>>>(Url);
    }

    getCaptureById(idfile:number):Observable<ApiResponse<CaptureConfig[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${idfile}`
        return this.http.get<ApiResponse<CaptureConfig[]>>(Url);
    }

    createCapture(data:CaptureConfig):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateCapture(data:CaptureConfig):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    
    getCaptureByBranch(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<CaptureBranch[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<CaptureBranch[]>>>(Url);
    }

    createCaptureBranch(data:CaptureBranch):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateCaptureBranch(data:CaptureBranch):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    getCaptureDetailByCapture(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<CaptureDetail[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<CaptureDetail[]>>>(Url);
    }

    createCaptureDetail(data:CaptureDetail):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateCaptureDetail(data:CaptureDetail):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    getCaptureDetailByQuestion(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<CaptureDetailQuestions[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<CaptureDetailQuestions[]>>>(Url);
    }

    createDetailQuestion(data:CaptureDetailQuestions):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateDetailQuestion(data:CaptureDetailQuestions):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,data);
    }
}