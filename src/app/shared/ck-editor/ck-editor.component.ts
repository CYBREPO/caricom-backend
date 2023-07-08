import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-ck-editor',
  templateUrl: './ck-editor.component.html',
  styleUrls: ['./ck-editor.component.scss']
})
export class CkEditorComponent {

  htmlContent: string = "";
  name: string = "";
  public Editor = ClassicEditor;
  fileData: FileList;

  constructor(public dialogRef: MatDialogRef<CkEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.htmlContent = data.description;
    this.name = data.name;
  }

  closePopup(): void {
    this.dialogRef.close(null);
  }

  handleFileInput(event: any): void {
    this.fileData = event?.target?.files;
  }

  submit() {
    if(this.name == '' || this.htmlContent == "")
      return;
    const formData: FormData = new FormData();
    formData.append(`description`, this.htmlContent);
    formData.append(`name`, this.name);
    formData.append(`id`, this.data._id);
    for (let i = 0; i < this.fileData?.length; i++) {
      formData.append(`images`, this.fileData[i]);
    }
    this.dialogRef.close(formData);
  }
}
