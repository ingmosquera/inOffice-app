import { TableColumn } from "../modules/config-components/table/table-config";

export class TableCaptureColumns{
    static setCaptureConfigTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"Client",
                dataKey :"client",
                ishidden:true,
            },
            {
                name:"type",
                dataKey :"type",
                ishidden:true,
            },
            {
                name:"Tipo capturador",
                dataKey :"typeName",
                ishidden:false,
            },
            {
                name:"configfile",
                dataKey :"configfileId",
                ishidden:true,
            },
            {
                name:"Archivo",
                dataKey :"configfilename",
                ishidden:false,
            },
            {
                name:"levelacces",
                dataKey :"levelacces",
                ishidden:true,
            },
            {
                name:"Acceso",
                dataKey :"levelaccesname",
                ishidden:false,
            },
            {
                name:"Activo?",
                dataKey :"active",
                ishidden:false,
            }
        ];
    }

    static setCaptureBranchTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"captureId",
                ishidden:true,
            },
            {
                name:"Sucursal",
                dataKey :"branch",
                ishidden:false,
            },
            {
                name:"Activo?",
                dataKey :"active",
                ishidden:false,
            }
        ];
    }

    static setCaptureDetailTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"capture",
                dataKey :"captureid",
                ishidden:true,
            },
            {
                name:"campo",
                dataKey :"field",
                ishidden:false,
            },
            {
                name:"Tipo item",
                dataKey :"itemtype",
                ishidden:false,
            },
            {
                name:"Tipo campo",
                dataKey :"fieldtype",
                ishidden:false,
            },
            {
                name:"Obligatorio",
                dataKey :"required",
                ishidden:false,
            },
            {
                name:"Es busqueda?",
                dataKey :"search",
                ishidden:false,
            },
            {
                name:"Activo?",
                dataKey :"active",
                ishidden:false,
            }
        ];
    }

    static setCaptureDetailQuestionsTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"capture",
                dataKey :"detailid",
                ishidden:true,
            },
            {
                name:"Pregunta",
                dataKey :"question",
                ishidden:false,
            },
            {
                name:"Activo?",
                dataKey :"active",
                ishidden:false,
            }
        ];
    }
}