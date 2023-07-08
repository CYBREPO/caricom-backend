import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { elements } from 'src/app/constants/constant';

@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss']
})
export class PageDetailComponent {

  search: string = "";
  componentForm: FormGroup;
  formFeilds: Array<{ name: string, type: string }> = [];
  elementsArray: Array<{ title: string, svgPath: string }> = elements.elementsArray;



  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.componentForm = this.fb.group({

    });
    this.componentForm.addControl("", this.fb.control(""))
  }

  selectedElment(title: string) {
    switch (title) {
      case "Paragraph": this.formFeilds.push({ name: "Paragraph", type: "textarea" })
        break;
      case "Heading": this.formFeilds.push({ name: "Heading", type: "input" })
        break;
      case "Image": this.formFeilds.push({ name: "Image", type: "file" })
        break;
      case "Gallary": this.formFeilds.push({ name: "Gallary", type: "multifiles" })
        break;
      case "Columns": this.formFeilds.push({ name: "Columns", type: "columns" })
        break;
      case "Classic": this.formFeilds.push({ name: "Classic", type: "classic" })
        break;
    }
  }


}
