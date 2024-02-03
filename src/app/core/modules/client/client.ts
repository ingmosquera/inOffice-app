import { Base } from "../base/base";

export interface Client extends Base{
    id:string,
    name:string,
    address:string,
    phone:string,
    contact:string,
    email:string,
    branch:string,
    active:boolean,
    level:number,
    parent:string,
}

export interface ClientField{
    id:number,
    name:string,
    clientId:string,
}

export interface ClientAddressRequest {
    id?:number,
    clientId:string,
    address:string,
    active:boolean
}

export interface ClientItemType {
    id?:number,
    itemType:string,
    itemTypeName?:string,
    itemTypeParent:string,
    itemTypeParentName?:string,
    clientId:string,
    quantity:number,
    line:string,
    lineName?:string,
    active:boolean
}

export interface ClientRequest {
    id?:number,
    clientId:string,
    name:string,
    active:boolean
}
