import { Base } from "../base/base";

export interface ConfigFile extends Base{
    id:number,
    client:string,
    name:string,
    active:boolean,
    branch:string,
    line:string,
    levelacces:string
}

export interface ConfigFileBranch{
    configFileId:number,
    branch:string,
}

export interface Configfiledetail{
    id:number,
    configfileId:number,
    field:string,
    type:string,
    required:boolean,
    active:boolean,
}
