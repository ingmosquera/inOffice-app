import { Injectable } from "@angular/core";
import { Client, ClientAddressRequest, ClientField, ClientItemType, ClientRequest } from "../core/modules/client/client";
import { Observable } from "rxjs";
import { ApiResponse, ListPaginationResponse } from "../core/Response/response";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({providedIn: 'root'})

export class ClientService{
    constructor(private readonly http:HttpClient){}
    private method:string="client";
    
    getClientActive():Observable<ApiResponse<Client[]>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getActive`
        return this.http.get<ApiResponse<Client[]>>(Url);
    }

    getClientAll(startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<Client[]>>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getAll?PageNumber=${startPage}&PageSize=${endPage}`
        return this.http.get<ApiResponse<ListPaginationResponse<Client[]>>>(Url);
    }

    CreateClient(dataClient:Client):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/create`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    UpdateClient(dataClient:Client):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/update?idClient=${dataClient.id}`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    getFieldByClient(idClient:string):Observable<ApiResponse<ClientField[]>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getFiled?PageNumber=1&PageSize=10&idClient=${idClient}`
        return this.http.get<ApiResponse<ClientField[]>>(Url);
    }

    getListFieldByClient(idClient:string):Observable<ApiResponse<ClientField[]>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getListFiled?idClient=${idClient}`
        return this.http.get<ApiResponse<ClientField[]>>(Url);
    }

    getAddressByClient(idClient:string,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<ClientAddressRequest[]>>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getAddressRequest?PageNumber=${startPage}&PageSize=${endPage}&idClient=${idClient}`
        return this.http.get<ApiResponse<ListPaginationResponse<ClientAddressRequest[]>>>(Url);
    }

    CreateAddressClient(dataClient:ClientAddressRequest):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/createAddressRequest`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    UpdateAddressClient(dataClient:ClientAddressRequest):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/updateAddressRequest`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    getItemTypeByClient(idClient:string,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<ClientItemType[]>>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getItemType?PageNumber=${startPage}&PageSize=${endPage}&idClient=${idClient}`
        return this.http.get<ApiResponse<ListPaginationResponse<ClientItemType[]>>>(Url);
    }

    CreateItemTypeClient(dataClient:ClientItemType):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/createItemType`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    UpdateItemTypeClient(dataClient:ClientItemType, id:number):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/updateItemType?id=${id}`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    getRequestByClient(idClient:string,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<ClientRequest[]>>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/getRequest?PageNumber=${startPage}&PageSize=${endPage}&idClient=${idClient}`
        return this.http.get<ApiResponse<ListPaginationResponse<ClientRequest[]>>>(Url);
    }

    CreateRequestClient(dataClient:ClientRequest):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/createRequest`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }

    UpdateRequestClient(dataClient:ClientRequest):Observable<ApiResponse<string>>{
        const Url = `${environment.URLAPICLIENT}/${this.method}/updateRequest`
        return this.http.post<ApiResponse<string>>(Url,dataClient);
    }
}

