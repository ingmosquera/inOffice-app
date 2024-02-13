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
                name:"Nombre",
                dataKey :"name",
                ishidden:false,
            },
            {
                name:"Client",
                dataKey :"client",
                ishidden:true,
            },
            {
                name:"Cliente",
                dataKey :"clientName",
                ishidden:false,
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
                dataKey :"configFile",
                ishidden:true,
            },
            {
                name:"Archivo Plano",
                dataKey :"configFileName",
                ishidden:false,
            },
            {
                name:"levelacces",
                dataKey :"levelacces",
                ishidden:true,
            },
            {
                name:"Acceso",
                dataKey :"levelaccesName",
                ishidden:false,
            },
            {
                name:"Linea",
                dataKey :"lineName",
                ishidden:false,
            },
            {
                name:"Linea",
                dataKey :"line",
                ishidden:true,
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
                dataKey :"capture",
                ishidden:true,
            },
            {
                name:"Sucursal",
                dataKey :"branch",
                ishidden:true,
            },
            {
                name:"Sucursal",
                dataKey :"branchName",
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
                dataKey :"capture",
                ishidden:true,
            },
            {
                name:"Capturador",
                dataKey :"captureName",
                ishidden:false,
            },
            {
                name:"campo",
                dataKey :"field",
                ishidden:false,
            },
            {
                name:"Tipo item",
                dataKey :"itemtype",
                ishidden:true,
            },
            {
                name:"Tipo item",
                dataKey :"itemtypeName",
                ishidden:false,
            },
            {
                name:"Tipo campo",
                dataKey :"fieldtype",
                ishidden:true,
            },
            {
                name:"Tipo campo",
                dataKey :"fieldtypeName",
                ishidden:false,
            },
            {
                name:"Obligatorio?",
                dataKey :"required",
                ishidden:false,
            },
            {
                name:"Es Busqueda?",
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
                dataKey :"captureDetail",
                ishidden:true,
            },
            {
                name:"Campo",
                dataKey :"detailFieldName",
                ishidden:false,
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