import { Base } from "../base/base";
import { BaseGeneral } from "../base/baseGeneral";

export interface Remittance extends Base {
    id?:number,
    client:string,
    line:string,
    branch:string,
    type:number,
    comments:string,
    address:string,
    request:string,
    deliveryDay:Date,
    closeDate:Date | null,
    status:number,
    radicationNumber:string
}

export interface DetailRemittance{
    id?:number,
    remittance:number,
    item:string,
    permanentOut:boolean,
    destroyed:boolean
}

export interface NoitemRemittance{
    id?:number,
    remittance:number,
    noItemType:number,
    noItemTypeName?:string,
    quantity:number
}
