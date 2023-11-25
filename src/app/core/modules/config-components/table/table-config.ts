
export interface TableConfig {
    tittle:string;
    pageSize:number;
    totalItems:number;
    showDetails:boolean;
    showPageSizeOptions:number[]
    tableColumns:TableColumn[]
}

export interface TableColumn{
    name:string,
    dataKey: string;
    position?: 'right' | 'left';
    isSortable?: boolean;
    ishidden:boolean;
}

