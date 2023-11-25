import { Base } from "../base/base";

export interface Client extends Base{
    id:string,
    name:string,
    address:string,
    city:string,
    active:boolean
}

export interface FieldByClient{
    name:string,
    dataBaseName:string,
    client:string
}