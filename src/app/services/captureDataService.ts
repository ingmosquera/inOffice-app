import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiResponse } from "../core/Response/response";
import { Observable, of } from "rxjs";
import { CaptureData, CaptureDataConfig, CaptureFieldData, CaptureItemType, CaptureQuestions } from "../core/modules/capture/capture-data";
@Injectable({providedIn: 'root'})

export class CapureDataService{
    constructor(private readonly http:HttpClient){}
    private method:string="capture";    

    private getResult(itemType:string):CaptureDataConfig{
        const captureData: CaptureData={
            idCapture:1,
            captureName:"Preuba de cargue",
            configFile:0
        }

        const captureFieldData:CaptureFieldData[]=[];
        const element : CaptureFieldData ={
            idField:1,
            fieldName:"nombre campo 1",
            fieldType:"T",
            fieldSearch:false,
            fieldRequired:true,
            fieldItemType:1,
        }

        const element1 : CaptureFieldData ={
            idField:2,
            fieldName:"nombre campo 2",
            fieldType:"F",
            fieldSearch:false,
            fieldRequired:true,
            fieldItemType:2,
        }

        const element2 : CaptureFieldData ={
            idField:3,
            fieldName:"nombre campo 3",
            fieldType:"F",
            fieldSearch:false,
            fieldRequired:true,
            fieldItemType:1,
        }
        if (itemType=="1"){
            captureFieldData.push(element);
        }else if (itemType=="2"){
            captureFieldData.push(element1);
        }else{
            captureFieldData.push(element2);
        }
        

        const captureQuestion: CaptureQuestions[]=[];
        const capQues :CaptureQuestions ={
            idQuestion:1,
            idCapture:1,   
            captureQuestion:"Pregunta 1"
        }

        const capQues1 :CaptureQuestions ={
            idQuestion:2,
            idCapture:1,   
            captureQuestion:"Pregunta 2"
        }

        const capQues3 :CaptureQuestions ={
            idQuestion:3,
            idCapture:2,   
            captureQuestion:"Pregunta 3"
        }
        if (itemType=="1"){
            captureQuestion.push(capQues);
        }else if (itemType=="2"){
            captureQuestion.push(capQues1);
        }else{
            captureQuestion.push(capQues3);
        }
        
        const captureConfig: CaptureDataConfig = {
            captureConfig: captureData,
            captureField: captureFieldData,
            captureQuestion: captureQuestion,
        };

        return captureConfig;
    }

    private getItemtype():CaptureItemType[]{
        const captureItemTypeList:CaptureItemType[]=[];
        const data1:CaptureItemType={
            itemType:"1",
            itemTypeName:"Caja",
            itemTypeParent:"-"
        };
        captureItemTypeList.push(data1);
        const data2:CaptureItemType={
            itemType:"2",
            itemTypeName:"Carpeta",
            itemTypeParent:"C1"
        };
        captureItemTypeList.push(data2);
        const data3:CaptureItemType={
            itemType:"3",
            itemTypeName:"Subdocumento",
            itemTypeParent:"FF"
        };
        captureItemTypeList.push(data3);
        return captureItemTypeList;
    }

    getConfigForCapture(radicado:string,itemType:string):Observable<ApiResponse<CaptureDataConfig>>{
        return of ({error:"",
            result:this.getResult(itemType),
            errorMessage:"",
            statusCode: 200})
        }
    
    getItemTypeByCapture(radicado:string):Observable<ApiResponse<CaptureItemType[]>>{
        return of ({error:"",
            result:this.getItemtype(),
            errorMessage:"",
            statusCode: 200})
        }
    
}