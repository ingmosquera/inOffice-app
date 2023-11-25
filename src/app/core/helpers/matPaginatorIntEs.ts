import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntEs extends MatPaginatorIntl {
    override itemsPerPageLabel = 'Registros por página:';
    nextpageLable = 'Siguiente página';
    previosPageLevel = 'Página Anterior';
    override firstPageLabel = 'Primera página';
    override lastPageLabel = 'Última página';

    override getRangeLabel = (page: number, pageSize: number, length: number): string => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
    
        length = Math.max(length, 0);
    
        const startIndex: number = page * pageSize;
        const endIndex: number = startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
    
        return `${startIndex + 1} - ${endIndex} / ${length}`;
      };
}