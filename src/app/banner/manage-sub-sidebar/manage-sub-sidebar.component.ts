import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/constants/apiRoutes';
import { GridActionType, GridColumnDataType, GridColumnType, Pagination } from 'src/app/constants/constant';
import { HttpService } from 'src/app/service/http.service';
import { ModalDialogService } from 'src/app/service/modal-dialog.service';

@Component({
  selector: 'app-manage-sub-sidebar',
  templateUrl: './manage-sub-sidebar.component.html',
  styleUrls: ['./manage-sub-sidebar.component.scss']
})
export class ManageSubSidebarComponent implements OnInit {

  sidebarForm: FormGroup;

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

  constructor(private fb: FormBuilder,private httpService: HttpService,
    private modalDialogService: ModalDialogService){}

  ngOnInit(): void {
    this.initForm();
    this.getAllSubSideBar();
    this.setColums();
  }

  initForm(){
    this.sidebarForm = this.fb.group({
      name: ['',[Validators.required]],
      id: ['']
    });
  }

  setColums() {
    this.columns = [
      { title: 'Name', dataField: 'title', type: GridColumnType.DATA, dataType: GridColumnDataType.TEXT },
      {
        title: 'Action', dataField: '', type: GridColumnType.ACTION, actions: [
          { title: "edit", event: "edit", type: GridActionType.ICON, class: "fa fa-pencil" },
          { title: "delete", event: "delete", type: GridActionType.ICON, class: "fa fa-trash" },
        ]
      }
    ]
  }

  getAllSubSideBar(){
    this.httpService.httpGet(ApiUrls.banner.getAllSubSidebar,null).subscribe((res: any) => {
      if(res['success']){
        this.data = res['data'];
        this.totalCount = res['count'];
      }
    })
  }

  paginationEventHandler(event: { pageIndex: number, pageSize: number }) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.getAllSubSideBar();
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
          this.httpService.httpGet(ApiUrls.banner.deleteSubSidebar, { id: evt.data._id }).subscribe((res: any) => {
            if (res['success']) {
              this.getAllSubSideBar();
            }
          });
        }
      });
    }
    if (evt.event == 'edit') {
      this.modalBtn.nativeElement.click();
      this.sidebarForm.patchValue({
        name: evt.data.title,
        id: evt.data._id
      });
    }
  }

  submit(){
    this.submitted = true;
    if(this.sidebarForm.invalid) return;

    let param = {
      title: this.sidebarForm.controls['name'].value,
      id: this.sidebarForm.controls['id'].value,
    }
    this.httpService.httpPost(ApiUrls.banner.saveUpdateSubSideBar,param).subscribe((res: any) => {
      if(res['success']){
        this.modalBtn.nativeElement.click();
        this.getAllSubSideBar();
      }
    })
  }
}
