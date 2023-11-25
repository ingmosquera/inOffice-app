import { BaseItem } from "../base/baseItem";
import { Base } from "../base/base";
export interface DataItem extends BaseItem{
    client:string,
    status:number,
    itemType:string,
    ubication?:string,
    line:string;
    branch:string
}
export interface DetailItem extends Base{
    id:number,
    item:string,
    nameField:string,
    fieldValue:string,
    urlImageItem?:string
}

export interface HistoryItem extends BaseItem{
    oldValue:string,
    newValue:string,
    changeType:number,
    changeTypeName:string
}