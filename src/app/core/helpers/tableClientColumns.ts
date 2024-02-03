import { TableColumn } from "../modules/config-components/table/table-config";

export class TableClientColumns{

static setClientTableColumns():TableColumn[] {
    return [
            {
                name:"Id",
                dataKey :"id",
                ishidden:false,
            },
            {
                name:"Nombre",
                dataKey :"name",
                ishidden:false,
            },
            {
                name:"Dirección",
                dataKey :"address",
                ishidden:false,
            },
            {
                name:"Telefóno",
                dataKey :"phone",
                ishidden:true,
            },
            {
                name:"Contacto",
                dataKey :"contact",
                ishidden:false,
            },
            {
                name:"Correo",
                dataKey :"email",
                ishidden:false,
            },
            {
                name:"Idnivel",
                dataKey :"level",
                ishidden:true,
            },
            {
                name:"Nivel",
                dataKey :"levelName",
                ishidden:false,
            },
            {
                name:"Principal",
                dataKey :"parent",
                ishidden:false,
            },
            {
                name:"Activo?",
                dataKey :"active",
                ishidden:false,
            }
        ];
    }


    static setClientItemTypeTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"Client",
                dataKey :"clientId",
                ishidden:true,
            },
            {
                name:"Tipo Item",
                dataKey :"itemTypeName",
                ishidden:false,
            },
            {
                name:"Tipo item padre",
                dataKey :"itemTypeParentName",
                ishidden:false,
            },
            {
                name:"Tipo Item",
                dataKey :"itemType",
                ishidden:true,
            },
            {
                name:"Tipo item padre",
                dataKey :"itemTypeParent",
                ishidden:true,
            },
            {
                name:"line",
                dataKey :"line",
                ishidden:true,
            },
            {
                name:"Linea",
                dataKey :"lineName",
                ishidden:false,
            },
            {
                name:"Cantidad",
                dataKey :"quantity",
                ishidden:false,
            },
            {
                name:"Activo?",
                dataKey :"active",
                ishidden:false,
            }
        ];
    }

    static setClientAddressRequestTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"clientId",
                dataKey :"clientId",
                ishidden:true,
            },
            {
                name:"Dirección",
                dataKey :"address",
                ishidden:false,
            },
            {
                name:"Activo?",
                dataKey :"active",
                ishidden:false,
            }
        ];
    }

    static setClientRequestTableColumns():TableColumn[] {
        return [
            {
                name:"id",
                dataKey :"id",
                ishidden:true,
            },
            {
                name:"clientId",
                dataKey :"clientId",
                ishidden:true,
            },
            {
                name:"Solicitante",
                dataKey :"name",
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