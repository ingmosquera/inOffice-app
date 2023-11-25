import { Injectable } from "@angular/core";
import { DataItem, HistoryItem,DetailItem  } from "../core/modules/item/dataItem";
import { ListPaginationResponse } from "../core/Response/listPaginationResponse";
import { Observable, of } from "rxjs";
import { DetailRemittance } from "../core/modules/remesas/remittance";

@Injectable({providedIn: 'root'})

export class ItemService{
    private ELEMEN_DETAIL_DATA:DetailItem[] = [
        {
            createDate:new Date(),
            fieldValue :"Valor 1",
            id : 2,
            item: '2',
            modifiedDate:new Date(),
            nameField:"Nombre 2",
            userCreate : "UserCreate 2",
            userModified :"UserModified 2",
            urlImageItem : "con imagen"
        },
        {
            createDate:new Date(),
            fieldValue :"Valor 3",
            id : 3,
            item: "3",
            modifiedDate:new Date(),
            nameField:"Nombre 3",
            userCreate : "UserCreate 3",
            userModified :"UserModified 3",
            urlImageItem : 'Sin imagen'

        },
        {
            createDate:new Date(),
            fieldValue :"Valor 1",
            id : 1,
            item: '1',
            modifiedDate:new Date(),
            nameField:"Nombre 1",
            userCreate : "UserCreate 1",
            userModified :"UserModified 1",
            urlImageItem : 'Sin imagen'

        }
    ];

    private getItems(filter:string,startPage:number,endPage:number):DataItem[]{
        return [
            {
                client:"1",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"2",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"2", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"cliente 3",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"3", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"cliente 4",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"4", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"5",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"5", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"Cliente 6",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"6", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"Cliente 7",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"7", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"Cliente 8",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"8", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"Cliente 9",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"9", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"Cliente 10",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"10", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            },
            {
                client:"Cliente 11",
                status:0,
                itemType:"",
                ubication:"string",
                line:"string",
                branch:"string",
                item:"11", 
                userCreate:"", 
                createDate:new Date(), 
                userModified:"",
                modifiedDate: new Date()
            }
        ];
    }

    private getItemHistory():HistoryItem[]{
        return [
            {
                item:"1",
                changeType:1,
                changeTypeName:"Cambio 1",
                createDate:new Date(),
                modifiedDate:new Date(),
                newValue:"New value",
                oldValue:"Old value",
                userCreate:"User Create",
                userModified:"User Modified"
            },
            {
                item:"2",
                changeType:1,
                changeTypeName:"Cambio 2",
                createDate:new Date(),
                modifiedDate:new Date(),
                newValue:"New value",
                oldValue:"Old value",
                userCreate:"User Create",
                userModified:"User Modified"
            },
            {
                item:"3",
                changeType:3,
                changeTypeName:"Cambio 3",
                createDate:new Date(),
                modifiedDate:new Date(),
                newValue:"New value",
                oldValue:"Old value",
                userCreate:"User Create",
                userModified:"User Modified"
            },
        ];
    }

    private getRemittanceByItem():DetailRemittance[]{
        return [
            {
                item:"1",
                idRemittance:1,
                createDate:new Date(),
                modifiedDate:new Date(),
                destroyed:false,
                permanentOut:false,
                userCreate:"User",
                userModified:"USer"
            },
            {
                item:"2",
                idRemittance:2,
                createDate:new Date(),
                modifiedDate:new Date(),
                destroyed:false,
                permanentOut:false,
                userCreate:"User",
                userModified:"USer"
            },
            {
                item:"3",
                idRemittance:1,
                createDate:new Date(),
                modifiedDate:new Date(),
                destroyed:false,
                permanentOut:false,
                userCreate:"User",
                userModified:"USer"
            },
        ];
    }
    

    getItem(filter:string,startPage:number,endPage:number):Observable<ListPaginationResponse<DataItem[]>>{
        const lista = this.getItems(filter,startPage,endPage);
        const paginatedData = lista.slice(startPage,endPage);
        const result = {
            result :paginatedData,
            totalItems :lista.length
        }
        return of(result);
    }

    getItemDetail(item:string):Observable<DetailItem[]>{
       const result = this.ELEMEN_DETAIL_DATA.filter((data)=> data.item==item);
        return of(result)
    }

    getItemDetailRemittance(item:string,startPage:number,endPage:number):Observable<ListPaginationResponse<DetailRemittance[]>>{
        const lista = this.getRemittanceByItem().filter((data)=> data.item==item);
        const result = {
            result :lista,
            totalItems :lista.length
        }
        return of(result);
    }

    getHistoryItem(item:string,startPage:number,endPage:number):Observable<ListPaginationResponse<HistoryItem[]>>{
        const lista = this.getItemHistory().filter((data)=> data.item==item);
        const result = {
            result :lista,
            totalItems :lista.length
        }
        return of(result);
    }
}