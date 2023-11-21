import { CommonModule } from "@angular/common";
import {  Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { TableColumn, TableConfig } from "../../../modules/config-components/table/table-config";

@Component({
    selector:'app-table',
    templateUrl:'./table.component.html',
    styleUrl:'./table.component.scss',
    standalone:true,
    imports: [MatTableModule,CommonModule,MatPaginatorModule,MatInputModule,MatDividerModule],
})

export class TableComponent implements OnInit    {
  @Input() configTable!: TableConfig;
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableDataSource = new MatTableDataSource<any>;
  displayedColumns!: string[];
  ngOnInit(): void {
    console.log(this.configTable);
    this.displayedColumns  = this.configTable.tableColumns.map((tableColumns:TableColumn)=> tableColumns.dataKey);
    this.tableDataSource.sort = this.sort;
  }


  setTableDataSource(data:any):void{
    this.tableDataSource = new MatTableDataSource(data);
  }
  
  onPageChange(event:PageEvent):void{
    this.pageChanged.emit(event);
  }

  applyFilter(event: Event) {
    var filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.tableDataSource.filter = filterValue;
  }
}