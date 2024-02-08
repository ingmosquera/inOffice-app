import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ApiResponse, ListPaginationResponse } from "../core/Response/response";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CaptureBranch, CaptureConfig, CaptureDetail, CaptureDetailQuestions } from "../core/modules/capture/capture";

@Injectable({providedIn: 'root'})

export class CaptureService{
    constructor(private readonly http:HttpClient){}
    private method:string="capture";

    createCapture(data:CaptureConfig):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/create`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateCapture(data:CaptureConfig):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/update?idCapture=${data.id}`
        return this.http.post<ApiResponse<string>>(Url,data);
    }
    
    getCaptureAll(startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<CaptureConfig[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getAll?PageNumber=${startPage}&PageSize=${endPage}`
        return this.http.get<ApiResponse<ListPaginationResponse<CaptureConfig[]>>>(Url);
    }

    createCaptureDetail(data:CaptureDetail):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/createDetail`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateCaptureDetail(data:CaptureDetail):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/updateDetail?idCapture=${data.id}`
        return this.http.post<ApiResponse<string>>(Url,data);
    }
    
    getCaptureDetailByCapture(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<CaptureDetail[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getDetail?PageNumber=${startPage}&PageSize=${endPage}&idCapture=${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<CaptureDetail[]>>>(Url);
    }
    createCaptureBranch(data:CaptureBranch):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/createBranch`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateCaptureBranch(data:CaptureBranch):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/updateBranch?idCapture=${data.id}`
        return this.http.post<ApiResponse<string>>(Url,data);
    }
    
    getCaptureByBranch(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<CaptureBranch[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getBranch?PageNumber=${startPage}&PageSize=${endPage}&idCapture=${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<CaptureBranch[]>>>(Url);
    }

    createDetailQuestion(data:CaptureDetailQuestions):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/createDetailQuestion`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    updateDetailQuestion(data:CaptureDetailQuestions):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/updateDetailQuestion?idCapture=${data.id}`
        return this.http.post<ApiResponse<string>>(Url,data);
    }

    getCaptureDetailByQuestion(id:number,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<CaptureDetailQuestions[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getDetailQuestion?PageNumber=${startPage}&PageSize=${endPage}&idCapture=${id}`
        return this.http.get<ApiResponse<ListPaginationResponse<CaptureDetailQuestions[]>>>(Url);
    }
    
}