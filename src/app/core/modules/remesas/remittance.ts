import { Base } from "../base/base";
import { BaseGeneral } from "../base/baseGeneral";

export interface Remittance extends BaseGeneral{
    idClient:string,
    idType:number,
    comments:string,
    applicant:string,
    address:string,
    deliveryDay:Date,
    closeDay:Date | null,
    status:number
}

export interface DetailRemittance extends Base{
    idRemittance:number,
    item:string,
    permanentOut:boolean,
    destroyed:boolean
}