import { Base } from "../base/base";

export interface CaptureConfig extends Base{
    id?:number,
    name:string,
    client:string,
    clientName?:string,
    type:number,
    typeName?:string,
    configfile:number,
    configfielName?:string,
    line:string,
    lineName?:string,
    levelAcces:string
    levelAccesName?:string,
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
    field:string,
    itemType:string,
    itemTypeName?:string,
    fieldType:string,
    fieldTypeName?:string,
    required:boolean,
    active:boolean,
    search:boolean,
}

export interface CaptureDetailQuestions{
    id?:number,
    captureDetail:number,
    captureDetailName?:string,
    question:string,
    active:boolean,
}
