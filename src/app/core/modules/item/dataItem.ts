import { BaseItem } from "../base/baseItem";
export interface DataItem extends BaseItem{
    parent?:string,
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
}

export interface MovementItem extends BaseItem{
    idClassificationType:number,
    classificationType_Name:string,
    oldValue:string,
    newValue:string
}

export interface ItemCapture extends BaseItem{
    idField:number,
    value:string
}

export interface ItemQuestionCapture extends BaseItem{
    idQuestion:number,
    value:string
}