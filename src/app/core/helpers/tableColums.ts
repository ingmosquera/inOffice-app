import { TableColumn } from "../modules/config-components/table/table-config";

export class TableColumns{
    static setItemTableColumns():TableColumn[] {
        return [
            {
                name:"Codigo",
                dataKey :"item",
                ishidden:false,
            },
            {
                name:"Cliente",
                dataKey :"client",
                ishidden:false,
            },
            {
                name:"Estado",
                dataKey :"status",
                ishidden:false,
            },
            {
                name:"TipoItem",
                dataKey :"itemType",
                ishidden:false,
            },
            {
                name:"Ubicacion",
                dataKey :"ubication",
                ishidden:false,
            },
            {
                name:"Linea",
                dataKey :"line",
                ishidden:false,
            },
            {
                name:"Sucursal",
                dataKey :"branch",
                ishidden:false,
            },
        ]
    }

    static setRemittanceTableColumns():TableColumn[] {
        return [
            {
                name:"Codigo",
                dataKey :"id",
                ishidden:false,
            },
            {
                name:"Tipo",
                dataKey :"idType",
                ishidden:false,
            },
            {
                name:"Estado",
                dataKey :"status",
                ishidden:false,
            },
            {
                name:"Cliente",
                dataKey :"idClient",
                ishidden:false,
            },
            {
                name:"Dirección",
                dataKey :"address",
                ishidden:false,
            },
            {
                name:"Solicitante",
                dataKey :"applicant",
                ishidden:false,
            },
            {
                name:"Comentario",
                dataKey :"comments",
                ishidden:false,
            },
            {
                name:"Fecha creacion",
                dataKey :"createDate",
                ishidden:false,
            },
            {
                name:"Fecha entrega",
                dataKey :"deliveryDay",
                ishidden:false,
            },
            {
                name:"Fecha cierre",
                dataKey :"closeDay",
                ishidden:false,
            },
            {
                name:"Fecha modificacion",
                dataKey :"modifiedDate",
                ishidden:false,
            },
            {
                name:"Usuario crea",
                dataKey :"userCreate",
                ishidden:false,
            },
            {
                name:"Usuario modifica",
                dataKey :"userModified",
                ishidden:false,
            },
        ]
    }

    static setRemittanceDetailTableColumns():TableColumn[] {
        return [
            {
                name:"item",
                dataKey :"item",
                ishidden:false,
            },
            {
                name:"Remesa",
                dataKey :"idRemittance",
                ishidden:false,
            },
            {
                name:"Usuario crea",
                dataKey :"userCreate",
                ishidden:false,
            },
            {
                name:"Usuario modifica",
                dataKey :"userModified",
                ishidden:false,
            },
            {
                name:"Fecha creacion",
                dataKey :"createDate",
                ishidden:false,
            },
            {
                name:"Fecha modificacion",
                dataKey :"modifiedDate",
                ishidden:false,
            },
        ]
    }

    static setHistoryItemTableColumns():TableColumn[] {
        return [
            {
                
                name:"Item",
                dataKey :"item",
                ishidden:false,
            },
            {
                
                name:"Tipo cambio",
                dataKey :"changeType",
                ishidden:false,
            },
            {
                
                name:"Nombre cambio",
                dataKey :"changeTypeName",
                ishidden:false,
            },
            {
                
                name:"Nuevo valor",
                dataKey :"newValue",
                ishidden:false,
            },
            {
                
                name:"Antiguo valor",
                dataKey :"oldValue",
                ishidden:false,
            },
            {
                
                name:"Fecha crea",
                dataKey :"createDate",
                ishidden:false,
            },
            {
                
                name:"Usuario crea",
                dataKey :"userCreate",
                ishidden:false,
            },
            {
                
                name:"Fecha modifica",
                dataKey :"modifiedDate",
                ishidden:false,
            },
            {
                
                name:"Usuario modifica",
                dataKey :"userModified",
                ishidden:false,
            },
        ];
    }

}