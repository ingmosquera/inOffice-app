import { TableColumn } from "../modules/config-components/table/table-config";

export class TableLoadFileColumns{

    static setConfigFileTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"Descripción",
                dataKey :"name",
                ishidden:false,
            },
            {
                name:"Cliente",
                dataKey :"client",
                ishidden:true,
            },
            {
                name:"Cliente",
                dataKey :"clientName",
                ishidden:false,
            },
            {
                name:"Linea",
                dataKey :"line",
                ishidden:true,
            },
            {
                name:"Linea",
                dataKey :"lineName",
                ishidden:false,
            },

            {
                name:"levelaccesId",
                dataKey :"levelacces",
                ishidden:true,
            },
            {
                name:"Nivel",
                dataKey :"levelAccesName",
                ishidden:false,
            },
            {
                name:"Activo?",
                dataKey :"active",
                ishidden:false,
            },
        ];
    }
    
    static setBranchTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"configFileId",
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
    
    static setDetailTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"configfileId",
                dataKey :"configfileId",
                ishidden:true,
            },
    
            {
                name:"Campo",
                dataKey :"field",
                ishidden:false,
            },
            {
                name:"type",
                dataKey :"type",
                ishidden:true,
            },
            {
                name:"Tipo Campo",
                dataKey :"typeName",
                ishidden:false,
            },
            {
                name:"Obligatorio",
                dataKey :"required",
                ishidden:true,
            },
            {
                name:"Activo?",
                dataKey :"active",
                ishidden:false,
            }
        ];
    }

}


