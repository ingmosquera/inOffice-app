import { BaseItem } from "../base/baseItem";

export interface DataItem extends BaseItem{
    Client:string,
    Status:number,
    ItemType:string,
    Ubication?:string,
    Line:string;
    branch:string
}