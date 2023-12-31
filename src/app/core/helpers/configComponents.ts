import { pagination } from "../constants/constants";
import { TableColumn, TableConfig } from "../modules/config-components/table/table-config";

export class ConfigComponents{
    static ConfigTable(tittle:string,
                       totalItems:number,
                       tableColumns: TableColumn[],
                       showDetails:boolean = false,
                       pageSize:number = pagination.PAGE_SIZE,
                       showPageSizeOptions:number[] = pagination.PAGE_SHOW_PAGE_SIZE):TableConfig{
            return {
                tittle:tittle,
                pageSize:pageSize,
                totalItems:totalItems,
                showDetails:showDetails,
                showPageSizeOptions:showPageSizeOptions,
                tableColumns:tableColumns
            }
   }
}