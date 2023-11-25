import { CommonModule } from "@angular/common";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatSort, MatSortModule, Sort } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatDividerModule } from "@angular/material/divider";
import { TableColumn, TableConfig } from "../../../modules/config-components/table/table-config";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    selector:'app-table',
    templateUrl:'./table.component.html',
    styleUrl:'./table.component.scss',
    standalone:true,
    imports: [MatTableModule,CommonModule,MatPaginatorModule,MatInputModule,MatDividerModule,MatIconModule,MatSortModule,MatProgressSpinnerModule],
})

export class TableComponent implements OnInit,AfterViewInit    {
  
  constructor(private _liveAnnouncer: LiveAnnouncer){}
  @Input() configTable!: TableConfig;
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }
  @Input() loadingData:boolean=false;
  @Output() pageChanged = new EventEmitter<PageEvent>();
  @Output() dataSelected = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableDataSource = new MatTableDataSource<any>;
  displayedColumns!: string[];
  ngOnInit(): void {
    this.displayedColumns  = this.configTable.tableColumns.map((tableColumns:TableColumn)=> tableColumns.dataKey);
    if(this.configTable.showDetails)
      this.displayedColumns.push("action");
  }

  ngAfterViewInit() {
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

  showDetails(element:any){
    this.dataSelected.emit(element);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}