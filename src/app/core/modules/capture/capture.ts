import { Base } from "../base/base";

export interface CaptureConfig extends Base{
    id?:number,
    name:string,
    client:string,
    clientName?:string,
    type:number,
    typeName?:string,
    configFile:number,
    configFileName?:string,
    line:string,
    lineName?:string,
    levelacces:string,
    levelaccesName?:string,
    active:boolean
}

export interface CaptureBranch{
    id?:number,
    capture:number,
    captureName?:string,
    branch:string,
    branchName?:string,
    active:boolean,
}

export interface CaptureDetail{
    id?:number,
    capture:number,
    captureName?:string,
    field:string,
    itemtype:string,
    itemTypeName?:string,
    fieldtype:string,
    fieldTypeName?:string,
    required:boolean,
    active:boolean,
    search:boolean,
}

export interface CaptureDetailQuestions{
    id?:number,
    captureDetail:number,
    DetailFieldName?:string,
    question:string,
    active:boolean,
}
