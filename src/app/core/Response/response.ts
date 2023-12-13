export interface ApiResponse<T>{
    error:string,
    result:T,
    errorMessage:string,
    statusCode: number,
}

export interface ListPaginationResponse<T>{
    data:T,
    totalRegisters:number,
    actualPage:number
}