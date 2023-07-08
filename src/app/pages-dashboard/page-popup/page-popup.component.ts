import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-page-popup',
  templateUrl: './page-popup.component.html',
  styleUrls: ['./page-popup.component.scss']
})
export class PagePopupComponent {

  search: string = "";

  constructor( public dialogRef: MatDialogRef<PagePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}


}
