import { Injectable } from "@angular/core";
import { Client, ClientAddressRequest, ClientField, ClientItemType, ClientModel, ClientRequest } from "../core/modules/client/client";
import { Observable } from "rxjs";
import { ApiResponse, ListPaginationResponse } from "../core/Response/response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})

export class ClientService{
    constructor(private readonly http:HttpClient){}
    private method:string="client";
    
    private clientModel!:ClientModel;

    getClientModel():ClientModel{
        return this.clientModel;
    }

    setClietModel(data:ClientModel):void{
        this.clientModel = data;
    }

    getClientActive():Observable<ApiResponse<Client[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getAll`
        return this.http.get<ApiResponse<Client[]>>(Url);
    }

    getClientAll(startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<Client[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/getAll`
        return this.http.get<ApiResponse<ListPaginationResponse<Client[]>>>(Url);
    }

    getFieldByClient(idClient:string):Observable<ApiResponse<ClientField[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${idClient}`
        return this.http.get<ApiResponse<ClientField[]>>(Url);
    }

    CreateClient(dataClient:Client):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    UpdateClient(dataClient:Client):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    getAddressByClient(idClient:string,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<ClientAddressRequest[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${idClient}`
        return this.http.get<ApiResponse<ListPaginationResponse<ClientAddressRequest[]>>>(Url);
    }

    CreateAddressClient(dataClient:ClientAddressRequest):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    UpdateAddressClient(dataClient:ClientAddressRequest):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    getItemTypeByClient(idClient:string,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<ClientItemType[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${idClient}`
        return this.http.get<ApiResponse<ListPaginationResponse<ClientItemType[]>>>(Url);
    }

    CreateItemTypeClient(dataClient:ClientItemType):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    UpdateItemTypeClient(dataClient:ClientItemType):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    getRequestByClient(idClient:string,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<ClientRequest[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/fields/${idClient}`
        return this.http.get<ApiResponse<ListPaginationResponse<ClientRequest[]>>>(Url);
    }

    CreateRequestClient(dataClient:ClientRequest):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    UpdateRequestClient(dataClient:ClientRequest):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPIMANAGEMENT}/${this.method}/login`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }
}

