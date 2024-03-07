import { TableColumn } from "../modules/config-components/table/table-config";


export class TableRemittanceColumns{
    static setConfigRemittanceColumns():TableColumn[] {
        return [
            {
                name:"Codigo",
                dataKey :"id",
                ishidden:false,
            },
            {
                name:"Cliente",
                dataKey :"clientName",
                ishidden:false,
            },
            {
                name:"Cliente",
                dataKey :"client",
                ishidden:true,
            },
            {
                name:"Linea",
                dataKey :"lineName",
                ishidden:false,
            },
            {
                name:"Línea",
                dataKey :"line",
                ishidden:true,
            },
            {
                name:"Sucursal",
                dataKey :"branchName",
                ishidden:false,
            },
            {
                name:"Sucursal",
                dataKey :"branch",
                ishidden:true,
            },
            {
                name:"Tipo",
                dataKey :"typeName",
                ishidden:false,
            },
            {
                name:"Tipo",
                dataKey :"type",
                ishidden:true,
            },
            {
                name:"Solicitante",
                dataKey :"requestName",
                ishidden:false,
            },
            {
                name:"Solicitante",
                dataKey :"request",
                ishidden:true,
            },
            {
                name:"Direccion",
                dataKey :"addressName",
                ishidden:false,
            },
            {
                name:"Direccion",
                dataKey :"address",
                ishidden:true,
            },
            {
                name:"Radicado",
                dataKey :"radicationNumber",
                ishidden:false,
            },
            {
                name:"Estado",
                dataKey :"status",
                ishidden:true,
            },
            {
                name:"Estado",
                dataKey :"statusName",
                ishidden:false,
            },
            {
                name:"Entrega",
                dataKey :"deliveryDate",
                ishidden:true,
            },  
            {
                name:"Cierre",
                dataKey :"DateClose",
                ishidden:true,
            }, 
        ]
    }

    static setConfigRemittanceNoItemsColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"Remesa",
                dataKey :"remittance",
                ishidden:true,
            },
            {
                name:"Cod. Tipo",
                dataKey :"noItemType",
                ishidden:true,
            },
            {
                name:"Tipo de item",
                dataKey :"noItemTypeName",
                ishidden:false,
            },
            {
                name:"Cantidad",
                dataKey :"quantity",
                ishidden:false,
            },
        ]
    }
    
    
    static setConfigRemittanceDetailColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"Item",
                dataKey :"item",
                ishidden:false,
            },
            {
                name:"remittance",
                dataKey :"remittance",
                ishidden:true,
            },
            {
                name:"Sal. Permanente",
                dataKey :"permanentOut",
                ishidden:false,
            },
            {
                name:"Destruido",
                dataKey :"destroyed",
                ishidden:false,
            }
        ];
    }
}