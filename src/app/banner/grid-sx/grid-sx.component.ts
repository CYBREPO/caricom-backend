
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/constants/apiRoutes';
import { GridActionType, GridColumnDataType, GridColumnType, Pagination } from 'src/app/constants/constant';
import { HttpService } from 'src/app/service/http.service';
import { ModalDialogService } from 'src/app/service/modal-dialog.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-grid-sx',
  templateUrl: './grid-sx.component.html',
  styleUrls: ['./grid-sx.component.scss']
})
export class GridSxComponent {

  gridForm: FormGroup;

  columns: Array<{
    title: string, dataField: string, type: string, dataType?: string, rowChild?: { component: any, show: boolean }, sort?: boolean,
    actions?: Array<{ event: string, type: string, title: string, class: string, conditionalDisplay?: { dataField: string, value: any } }>
  }> = [];
  totalCount: number;
  pageIndex: number = 1;
  pageSize = Pagination.PageSize;
  submitted: boolean = false;
  @ViewChild('modalBtn') modalBtn: ElementRef;
  data: Array<any> = [];

  constructor(private fb: FormBuilder, private httpService: HttpService,
    private modalDialogService: ModalDialogService) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllGrids();
    this.setColums();
  }

  initForm() {
    this.gridForm = this.fb.group({
      gridImage: ['', []],
      gridContent: ['', []],
      gridFile: ['', []],
      id: ['']
    });
  }

  setColums() {
    this.columns = [
      { title: 'Image', dataField: 'gridSixImage', type: GridColumnType.DATA, dataType: GridColumnDataType.TEXT },
      { title: 'Content', dataField: 'gridSixContent', type: GridColumnType.DATA, dataType: GridColumnDataType.TEXT },
      {
        title: 'Action', dataField: '', type: GridColumnType.ACTION, actions: [
          { title: "edit", event: "edit", type: GridActionType.ICON, class: "fa fa-pencil" },
          { title: "delete", event: "delete", type: GridActionType.ICON, class: "fa fa-trash" },
        ]
      }
    ]
  }

  getAllGrids() {
    this.httpService.httpGet(ApiUrls.grid.getGridSix, null).subscribe((res: any) => {
      if (res['success']) {
        this.data = res['data'];
        if (this.data) {
          this.data.map((m: any) => {
            m.gridSixImage = environment.url + m.gridSixImage;
            return m
          })
        }
        this.totalCount = res['count'];
      }
    })
  }

  paginationEventHandler(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.getAllGrids();
  }

  gridEvent(evt: any) {
    if (evt.event == "delete") {
      const dialogRef = this.modalDialogService.openDialog({
        title: "Delete Model",
        message: "Are you sure you want to delete this sidebar!",
        buttons: [
          { title: "YES", result: "YES", class: "btn-success" },
          { title: "NO", result: "NO", class: "btn-danger" },
        ]
      })
      dialogRef.subscribe(res => {
        if (res == "YES") {
          this.httpService.httpGet(ApiUrls.grid.deleteGridSix, { id: evt.data._id }).subscribe((res: any) => {
            if (res['success']) {
              this.getAllGrids();
            }
          });
        }
      });
    }
    if (evt.event == 'edit') {
      this.modalBtn.nativeElement.click();
      this.gridForm.patchValue({
        gridImage: evt.data.gridSixImage,
        gridContent: evt.data.gridSixContent,
        id: evt.data._id
      });
    }
  }

  submit() {
    this.submitted = true;
    if (this.gridForm.invalid) return;

    let param = {
      gridSixImage: this.gridForm.controls['gridImage'].value,
      gridSixContent: this.gridForm.controls['gridContent'].value,
      id: this.gridForm.controls['id'].value,
    }
    this.httpService.httpPost(ApiUrls.grid.saveUpdateGridSix, param).subscribe((res: any) => {
      if (res['success']) {
        this.modalBtn.nativeElement.click();
        this.getAllGrids();
      }
    })
  }
  handleFileInput(event: any): void {
    this.gridForm.controls["gridFile"].setValue(event?.target?.files[0]);
    this.gridForm.controls["gridImage"].setValue(window.URL.createObjectURL(event?.target?.files[0]));
    return;
  }
}
