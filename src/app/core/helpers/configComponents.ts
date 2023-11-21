import { TableColumn, TableConfig } from "../modules/config-components/table/table-config";

export class ConfigComponents{
    static ConfigTable(tittle:string,
                       pageSize:number,
                       totalItems:number,
                       showPageSizeOptions:number[],
                       tableColumns: TableColumn[]):TableConfig{
            return {
                tittle:tittle,
                pageSize:pageSize,
                totalItems:totalItems,
                showPageSizeOptions:showPageSizeOptions,
                tableColumns:tableColumns
            }
   }
}