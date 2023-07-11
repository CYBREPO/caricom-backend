import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiUrls } from 'src/app/constants/apiRoutes';
import { GridActionType, GridColumnDataType, GridColumnType, Pagination } from 'src/app/constants/constant';
import { HttpService } from 'src/app/service/http.service';
import { ModalDialogService } from 'src/app/service/modal-dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  countryForm: FormGroup;

  columns: Array<{
    title: string, dataField: string, type: string, dataType?: string, rowChild?: { component: any, show: boolean }, sort?: boolean,
    actions?: Array<{ event: string, type: string, title: string, class: string, conditionalDisplay?: { dataField: string, value: any } }>
  }> = [];
  totalCount: number;
  pageIndex: number = 1;
  pageSize = Pagination.PageSize;
  submitted: boolean = false;
  @ViewChild('modalBtn') modalBtn: ElementRef;
  @ViewChild('inputFile') inputFile: ElementRef;
  data: Array<any> = [];

  constructor(private fb: FormBuilder, private httpService: HttpService,
    private modalDialogService: ModalDialogService) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllCountries();
    this.setColums();
  }

  initForm() {
    this.countryForm = this.fb.group({
      countryFlag: ['', []],
      countryName: ['', []],
      countryFile: ['', []],
      date: ['', []],
      isAssociateMembers: [false, []],
      id: ['']
    });
  }

  setColums() {
    this.columns = [
      { title: 'Country Flag', dataField: 'countryFlag', type: GridColumnType.DATA, dataType: GridColumnDataType.IMAGE },
      { title: 'Country', dataField: 'countryName', type: GridColumnType.DATA, dataType: GridColumnDataType.TEXT },
      { title: 'Date', dataField: 'date', type: GridColumnType.DATA, dataType: GridColumnDataType.DATE },
      {
        title: 'Action', dataField: '', type: GridColumnType.ACTION, actions: [
          { title: "edit", event: "edit", type: GridActionType.ICON, class: "fa fa-pencil" },
          { title: "delete", event: "delete", type: GridActionType.ICON, class: "fa fa-trash" },
        ]
      }
    ]
  }

  getAllCountries() {
    this.httpService.httpGet(ApiUrls.grid.getAllCountries, null).subscribe((res: any) => {
      if (res['success']) {
        this.data = res['data'];
        if (this.data) {
          this.data.map((m: any) => {
            m.countryFlag = environment.url + m.countryFlag;
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

    this.getAllCountries();
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
          this.httpService.httpGet(ApiUrls.grid.deleteCountries, { id: evt.data._id }).subscribe((res: any) => {
            if (res['success']) {
              this.getAllCountries();
            }
          });
        }
      });
    }
    if (evt.event == 'edit') {
      this.modalBtn.nativeElement.click();
      this.countryForm.patchValue({
        countryFlag: evt.data.countryFlag,
        countryName: evt.data.countryName,
        date: evt.data.date,
        isAssociateMembers: evt.data.isAssociateMembers,
        id: evt.data._id
      });
    }
  }

  handleFileInput(event: any): void {
    this.countryForm.controls["countryFile"].setValue(event?.target?.files[0]);
    this.countryForm.controls["countryFlag"].setValue(window.URL.createObjectURL(event?.target?.files[0]));
    return;
  }

  submit() {
    this.submitted = true;
    if (this.countryForm.invalid) return;

    let formData = new FormData();

    formData.append(`countryFlag`, this.countryForm.controls['countryFile'].value);
    formData.append(`countryName`, this.countryForm.controls['countryName'].value);
    formData.append(`date`, this.countryForm.controls['date'].value);
    formData.append(`isAssociateMembers`, this.countryForm.controls['isAssociateMembers'].value);
    formData.append(`id`, this.countryForm.controls['id'].value ?? "");

    this.httpService.httpPostFormData(ApiUrls.grid.createUpdateCountries, formData).subscribe((res: any) => {
      if (res['success']) {
        this.modalBtn.nativeElement.click();
        this.getAllCountries();
      }
    })
  }

  resetFile() {
    this.inputFile.nativeElement.value = "";
  }

}
