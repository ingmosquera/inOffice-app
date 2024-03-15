export interface CaptureDataConfig{
    captureConfig:CaptureData,
    captureField:CaptureFieldData[],
    captureQuestion:CaptureQuestions[]
}

export interface CaptureData{
    idCapture:number,
    captureName:string,
    configFile?:number
}

export interface CaptureFieldData{
    idField:number,
    fieldName:string,
    fieldType:string,
    fieldSearch:boolean,
    fieldRequired:boolean,
    fieldItemType:number,
}

export interface CaptureQuestions{
    idQuestion:number,
    idCapture:number,
    captureQuestion:string
}

export interface CaptureItemType{
    itemType:string,
    itemTypeName:string,
    itemTypeParent:string;
}