import { Injectable } from "@angular/core";
import { Client, FieldByClient } from "../core/modules/client/client";
import { Observable, of } from "rxjs";
import { ListPaginationResponse } from "../core/Response/listPaginationResponse";

@Injectable({providedIn: 'root'})

export class ClientService{
    private CLIENT_DATA:Client[] = [
        {
            id:"1",
            createDate : new Date(),
            modifiedDate : new Date(),
            active:true,
            address:"Direccion 1",
            city:"Bogotá",
            name:"Name 1",
            userCreate:"User Create",
            userModified: "User Modified"
        },
        {
            id:"2",
            createDate : new Date(),
            modifiedDate : new Date(),
            active:true,
            address:"Direccion 2",
            city:"Bogotá",
            name:"Name 2",
            userCreate:"User Create",
            userModified: "User Modified"
        },
        {
            id:"3",
            createDate : new Date(),
            modifiedDate : new Date(),
            active:true,
            address:"Direccion 3",
            city:"Bogotá",
            name:"Name 3",
            userCreate:"User Create",
            userModified: "User Modified"
        },
    ];

    private FIELD_BY_CLIENT:FieldByClient[]=[
        {
            name:"Campo 1",
            dataBaseName:"Base campo 1",
            client:"1"
        },
        {
            name:"Campo 11",
            dataBaseName:"Base campo 11",
            client:"1"
        },
        {
            name:"Campo 2",
            dataBaseName:"Base campo 2",
            client:"2"
        },
        {
            name:"Campo 22",
            dataBaseName:"Base campo 22",
            client:"2"
        },
        {
            name:"Campo 222",
            dataBaseName:"Base campo 222",
            client:"2"
        },
        {
            name:"Campo 3",
            dataBaseName:"Base campo 3",
            client:"3"
        }
    ]
    getClientActive():Observable<Client[]>{
        return of(this.CLIENT_DATA);
    }

    getClienAll(filter:string,startPage:number,endPage:number):Observable<ListPaginationResponse<Client[]>>{
        const paginatedData = this.CLIENT_DATA.slice(startPage,endPage);
        const result = {
            result :paginatedData,
            totalItems :this.CLIENT_DATA.length
        }
        return of(result);
    }

    getFieldByCustomer(idClient:string):Observable<FieldByClient[]>{
        return of(this.FIELD_BY_CLIENT.filter((data:FieldByClient) => data.client==idClient));
    }
}
