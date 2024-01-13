import { BaseItem } from "../base/baseItem";
export interface DataItem extends BaseItem{
    status:number,
    statusName:string,
    type:number,
    typeName:string,
    location?:string,
    line:string,
    lineName:string,
    branch:string,
    branchName:string,
    client:string,
    clientName:string
}
export interface DetailItem extends BaseItem{
    fieldId:string,
    filedName:string,
    value:string,
    urlImage?:string,
}

export interface MovementItem extends BaseItem{
    idClassificationType:number,
    classificationType_Name:string,
    oldValue:string,
    newValue:string
}