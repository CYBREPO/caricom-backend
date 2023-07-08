import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/constants/apiRoutes';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

  homeForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,private httpService: HttpService){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.homeForm = this.fb.group({
      siderBanner: this.fb.array([this.fb.group({
          bannerImage: ['',[]],
          bannerImagePath: [''],
          bannerContent: ['']
        })
      ]),
      mainImage: ['',[Validators.required]],
      mainImagePath: [''],
      mainContent: ['',[Validators.required]],
    })
  }

  get sidebarArray() { return (this.homeForm.controls['siderBanner'] as FormArray).controls}

  handleFileInput(event: any, type: string,index: number = -1): void {
    if(type == "mainImage"){
      this.homeForm.controls["mainImage"].setValue(event?.target?.files[0]);
      this.homeForm.controls["mainImagePath"].setValue(window.URL.createObjectURL(event?.target?.files[0]));
      return;
    }
    else{
      let fbGrp = (this.sidebarArray[index] as FormGroup).controls
      fbGrp['bannerImage'].setValue(event?.target?.files[0]);
      fbGrp['bannerImagePath'].setValue(window.URL.createObjectURL(event?.target?.files[0]));
    }
  }

  deleteRow(index: number) {
    let arr = (this.homeForm.controls["siderBanner"] as FormArray);
    arr.removeAt(index);
  }

  validateAndPushDataToFormArray(index: number) {
    let array = this.homeForm.get("siderBanner") as FormArray;
    array.push(this.fb.group({
      bannerImage: ['',[]],
      bannerImagePath: [''],
      bannerContent: ['']
    }));
  }

  submit(){
    this.submitted = true;
    if(this.homeForm.invalid){ return;}

    let formData = new FormData();

    formData.append(`mainImage`,this.homeForm.controls['mainImage'].value);
    formData.append(`mainImageContent`,this.homeForm.controls['mainContent'].value);

    if(this.sidebarArray){
      for (let i = 0; i < this.sidebarArray.length; i++) {
        const fb = (this.sidebarArray[i] as FormGroup).controls;
        formData.append(`banner[${i}][content]`, fb['title'].value);
        formData.append(`banner[${i}][image]`, fb['description'].value);
      }
    }

    this.httpService.httpPost(ApiUrls.banner.savebanner,formData).subscribe(res => {});
  }
}
