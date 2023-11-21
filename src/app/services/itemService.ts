import { Injectable } from "@angular/core";
import { DataItem } from "../core/modules/item/dataItem";
import { ListPaginationResponse } from "../core/Response/listPaginationResponse";
import { PeriodicElement } from "../core/modules/item/periodicElement";
import { Observable, of } from "rxjs";


@Injectable({providedIn: 'root'})

export class ItemService{
    ELEMENT_DATA: PeriodicElement[] = [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
        {position: 11, name: 'Prueba', weight: 5.6369, symbol: 'Od'},
    ];

    getItems(filter:string,startPage:number,endPage:number):DataItem[]{
        return [
            {
                Client:"123456",
                Status:0,
                ItemType:"",
                Ubication:"string",
                Line:"string",
                branch:"string",
                Item:"", 
                UserCreate:"", 
                CreateDate:new Date(), 
                UserModified:"",
                ModifiedDate: new Date()
            },
            {
                Client:"123456",
                Status:0,
                ItemType:"",
                Ubication:"string",
                Line:"string",
                branch:"string",
                Item:"", 
                UserCreate:"", 
                CreateDate:new Date(), 
                UserModified:"",
                ModifiedDate: new Date()
            },
            {
                Client:"123456",
                Status:0,
                ItemType:"",
                Ubication:"string",
                Line:"string",
                branch:"string",
                Item:"", 
                UserCreate:"", 
                CreateDate:new Date(), 
                UserModified:"",
                ModifiedDate: new Date()
            }
        ];
    }

    getItemsTest(filter:string,startPage:number,endPage:number):Observable<ListPaginationResponse<PeriodicElement[]>>{
        const paginatedData = this.ELEMENT_DATA.slice(startPage,endPage);
        const result = {
            result :paginatedData,
            totalItems :this.ELEMENT_DATA.length
        }
        return of(result);
    }
}