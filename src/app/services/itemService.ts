import { Injectable } from "@angular/core";
import { DataItem, MovementItem,DetailItem  } from "../core/modules/item/dataItem";
import { ApiResponse, ListPaginationResponse } from "../core/Response/response";
import { Observable  } from "rxjs";
import { DetailRemittance } from "../core/modules/remesas/remittance";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})

export class ItemService{

    constructor(private http:HttpClient){}
    
    getItem(filter:string,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<DataItem[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/Item/info?Parameter=${filter}&Pagination.PageNumber=${startPage}&Pagination.PageSize=${endPage}`;
        return this.http.get<ApiResponse<ListPaginationResponse<DataItem[]>>>(Url);
    }

    getItemDetail(item:string):Observable<ApiResponse<DetailItem[]>>{
        const Url = `${environment.URLAPIMANAGEMENT}/Item/detail/${item}`
        return this.http.get<ApiResponse<DetailItem[]>>(Url);
    }

    getItemDetailRemittance(item:string,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<DetailRemittance[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/Item/remittance?Parameter=${item}&Pagination.PageNumber=${startPage}&Pagination.PageSize=${endPage}`;
        return this.http.get<ApiResponse<ListPaginationResponse<DetailRemittance[]>>>(Url);
    }

    getMovementItem(item:string,startPage:number,endPage:number):Observable<ApiResponse<ListPaginationResponse<MovementItem[]>>>{
        const Url = `${environment.URLAPIMANAGEMENT}/Item/movement?Parameter=${item}&Pagination.PageNumber=${startPage}&Pagination.PageSize=${endPage}`;
        return this.http.get<ApiResponse<ListPaginationResponse<MovementItem[]>>>(Url);
    }
}