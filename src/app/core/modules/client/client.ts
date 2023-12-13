import { Base } from "../base/base";

export interface Client extends Base{
    id:string,
    name:string
}

export interface FieldByClient{
    id:number,
    name:string,
    clientId:string,
}