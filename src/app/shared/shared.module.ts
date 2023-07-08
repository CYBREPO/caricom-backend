import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CkEditorComponent } from './ck-editor/ck-editor.component';
import { MaterialModule } from './material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    TableComponent,AlertComponent,ConfirmComponent,CkEditorComponent
  ],
  imports: [
    CommonModule,MaterialModule,CKEditorModule
  ],
  exports: [TableComponent,AlertComponent,ConfirmComponent,CkEditorComponent]
})
export class SharedModule { }
