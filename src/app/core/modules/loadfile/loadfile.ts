import { Base } from "../base/base";

export interface LoadFileConfig extends Base{
    id?:number,
    client:string,
    clientName?:string,
    name:string,
    active:boolean,
    line:string,
    lineName?:string,
    levelAcces:string,
    levelAccesName?:string,
}

export interface LoadFileBranch{
    id?:number,
    configFile:number,
    configFileName?:number,
    branch:string,
    branchName?:string,
    active:boolean,
}

export interface LoadFiledDetail{
    id?:number,
    configfile:number,
    configfileName?:string,
    field:string,
    type:string,
    typeName?:string,
    required:boolean,
    active:boolean,
}
