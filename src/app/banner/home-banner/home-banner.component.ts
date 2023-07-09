import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiUrls } from 'src/app/constants/apiRoutes';
import { HttpService } from 'src/app/service/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss']
})
export class HomeBannerComponent implements OnInit {

  homeForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit(): void {
    this.initForm();
    this.getHomeDetails();
  }

  initForm() {
    this.homeForm = this.fb.group({
      siderBanner: this.fb.array([this.fb.group({
        bannerImage: ['', []],
        bannerImagePath: [''],
        bannerContent: ['']
      })
      ]),
      mainImage: ['', [Validators.required]],
      mainImagePath: [''],
      mainContent: ['', [Validators.required]],
      id: ['']
    })
  }

  get sidebarArray() { return (this.homeForm.controls['siderBanner'] as FormArray).controls }

  getHomeDetails() {
    this.httpService.httpGet(ApiUrls.banner.getBanner, null).subscribe((res: any) => {
      if (res['success']) {
        let arry = (this.homeForm.controls['siderBanner'] as FormArray);
        arry.clear();
        // let {bannerSlider} = res['data']['bannerSlider'];
        if (res['data']['bannerSlider']) {
          res['data']['bannerSlider'].forEach((banner: any) => {
            arry.push(this.fb.group({
              bannerContent: banner.content,
              bannerImagePath: environment.url + banner.image,
            }));
          });
        }


        arry.push(this.fb.group({
          bannerContent: "",
          bannerImagePath: "",
          bannerImage: ''
        }));

        this.homeForm.patchValue({
          mainImagePath: environment.url + res['data']['bannerTwoSectionImage'],
          mainContent: res['data']['bannerTwoSectionContent'],
          id: res['data']['_id']
        })
      }
    })
  }

  handleFileInput(event: any, type: string, index: number = -1): void {
    if (type == "mainImage") {
      this.homeForm.controls["mainImage"].setValue(event?.target?.files[0]);
      this.homeForm.controls["mainImagePath"].setValue(window.URL.createObjectURL(event?.target?.files[0]));
      return;
    }
    else {
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
      bannerImage: ['', []],
      bannerImagePath: [''],
      bannerContent: ['']
    }));
  }

  submit() {
    this.submitted = true;
    if (this.homeForm.invalid) { return; }

    let formData = new FormData();


    formData.append(`id`, this.homeForm.controls['id'].value);
    formData.append(`bannerTwoSectionImage`, this.homeForm.controls['mainImage'].value);
    formData.append(`bannerTwoSectionContent`, this.homeForm.controls['mainContent'].value);

    if (this.sidebarArray) {
      for (let i = 0; i < this.sidebarArray.length; i++) {
        const fb = (this.sidebarArray[i] as FormGroup).controls;
        formData.append(`bannerSlider[${i}][image]`, fb['bannerImage'].value);
        formData.append(`bannerSlider[${i}][content]`, fb['bannerContent'].value);
      }
    }

    this.httpService.httpPostFormData(ApiUrls.banner.savebanner, formData).subscribe(res => { });
  }
}
