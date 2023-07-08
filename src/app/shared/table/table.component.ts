import { Component, EventEmitter, Input, Output } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GridActionType, GridColumnDataType, GridColumnType, Pagination } from 'src/app/constants/constant';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

    @Input() dataSource: Array<any> = [];
    @Input() columns: Array<{
      title: string, dataField: string, type: string, dataType?: string, rowChild?: { component: any, show: boolean },sort?: boolean,
      actions?: Array<{ event: string, type: string, title: string, class: string, conditionalDisplay?: { dataField: string, value: any } }>
    }> = [];
    
    @Input() totalPageCount: number = 0;
    @Input() pageIndex: number = 1;
    pageSize = Pagination.PageSize;
    pageOption = Pagination.PageSizeOptions.map(m => m.value);
    pageDataOriginal: any;
    GridActionType = GridActionType;
    GridColumnDataType = GridColumnDataType;
    GridColumnType = GridColumnType;
    
    @Output() gridEventHandler = new EventEmitter<any>();
    @Output() paginationEventHandler = new EventEmitter<any>();
    public Editor = ClassicEditor;
  
    constructor(){}
  
    gridEvent(row: any, evt: string, index: number) {
      this.gridEventHandler.emit({ 'data': row, 'event': evt });
    }
  
    paginationEvent(evt: any): void {
      this.pageIndex = evt.pageIndex + 1;
      this.pageSize = evt.pageSize;
      this.paginationEventHandler.emit({ 'pageIndex': this.pageIndex, 'pageSize': this.pageSize });
    }
  
    sort(order: string, fieldType: string) {
      if (order != "desc") {
        this.dataSource.sort((a, b) => {
          if (!isNaN(a[fieldType]) && !isNaN(b[fieldType])) {
            return a[fieldType] - b[fieldType];
          }
          return a[fieldType] > b[fieldType] ? 1 : (b[fieldType] > a[fieldType] ? -1 : 0)
        });
      }
      else {
        this.dataSource.sort((a, b) => {
          if (!isNaN(a[fieldType]) && !isNaN(b[fieldType])) {
            return b[fieldType] - a[fieldType];
          }
          return b[fieldType] > a[fieldType] ? 1 : (a[fieldType] > b[fieldType] ? -1 : 0)
        });
      }
    }
  
  }
