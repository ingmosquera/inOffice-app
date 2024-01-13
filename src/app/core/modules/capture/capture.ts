import { Base } from "../base/base";

export interface CaptureConfig extends Base{
    id?:number,
    name:string,
    client:string,
    type:number,
    configfileId:number,
    line:string,
    levelacces:string
    active:boolean
}

export interface CaptureBranch{
    captureId:number,
    branch:string,
    active:boolean,
}

export interface CaptureDetail{
    id?:number,
    captureId:number,
    field:string,
    itemtype:string,
    fieldtype:string,
    required:boolean,
    active:boolean,
    search:boolean,
}

export interface CaptureDetailQuestions{
    id?:number,
    capturedetailiId:number,
    question:string,
    active:boolean,
}
