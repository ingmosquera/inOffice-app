import { Base } from "../base/base";

export interface LoadFileConfig extends Base{
    id?:number,
    client:string,
    name:string,
    active:boolean,
    line:string,
    levelacces:string
}

export interface LoadFileBranch{
    configFileId:number,
    branch:string,
    active:boolean,
}

export interface LoadFileField{
    id?:number,
    configfileId:number,
    field:string,
    type:string,
    required:boolean,
    active:boolean,
}
