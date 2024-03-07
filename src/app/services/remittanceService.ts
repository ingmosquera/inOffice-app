import { Injectable } from "@angular/core";
import { DetailRemittance, NoitemRemittance, Remittance } from "../core/modules/remesas/remittance";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ApiResponse, ListPaginationResponse } from "../core/Response/response";


@Injectable({providedIn: 'root'})

export class RemittanceService{

    constructor(private readonly http:HttpClient){}
    private method:string="remittance";

    getRemittance(startPage:number,endPage:number):Observable<ListPaginationResponse<Remittance[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getRemittances?PageNumber=${startPage}&PageSize=${endPage}`
        return this.http.get<ListPaginationResponse<Remittance[]>>(Url);
    }

    createRemittance(dataClient:Remittance):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/createRemattance`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    updateRemittance(dataClient:Remittance):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/updateRemattance`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    getRemittanceItemDetail(idRemittance:number,startPage:number,endPage:number):Observable<ListPaginationResponse<DetailRemittance[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getRemittanceDetails?remittance=${idRemittance}&PageNumber=${startPage}&PageSize=${endPage}`
        return this.http.get<ListPaginationResponse<DetailRemittance[]>>(Url);
    }

    createRemittanceDetail(dataClient:DetailRemittance[]):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/createRemattanceDetail`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    updateRemittanceDetail(dataClient:DetailRemittance[],idRemittance:number):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/updateRemattanceDetail?idRemittance=${idRemittance}`;
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }


    getItemNoItem(idRemittance:number,startPage:number,endPage:number):Observable<ListPaginationResponse<NoitemRemittance[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getRemittanceNoItems?remittance=${idRemittance}&PageNumber=${startPage}&PageSize=${endPage}`
        return this.http.get<ListPaginationResponse<NoitemRemittance[]>>(Url);
    }

    createRemittanceNoItem(dataClient:NoitemRemittance[]):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/createRemattanceNoItem`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    updateRemittanceNoItem(dataClient:NoitemRemittance[],idRemittance:number):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/updateRemattanceNoItem?idRemittance=${idRemittance}`;
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }
}