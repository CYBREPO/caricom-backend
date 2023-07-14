import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from "crypto-js";
import { ApiUrls } from 'src/app/constants/apiRoutes';
import { HttpService } from 'src/app/service/http.service';
import { CustomValidators } from 'src/app/validators/customvalidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fb.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirmPassword: ['',[]],
    });

    this.setConfirmPwdValidator();
  }

  get regForm() { return this.registerForm.controls };

  matchPassword(): boolean {
    if (this.regForm['confirmPassword'].value != '') {
      return this.regForm['password'].value == this.regForm['confirmPassword'].value;
    }
    else {
      return true;
    }
  }

  setConfirmPwdValidator() {
    this.registerForm.controls['confirmPassword'].setValidators([Validators.required, CustomValidators.ConfirmPassword(m => this.matchPassword())]);
    this.registerForm.controls['confirmPassword'].updateValueAndValidity();
  }

  submit() {
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
    }

    let param = {
      name: this.regForm['name'].value,
      email: this.regForm['email'].value,
      password: this.regForm['password'].value //crypto.SHA1(this.regForm['password'].value).toString(),
    }

    this.httpService.httpPost(ApiUrls.account.register,param).subscribe((res: any) => {
      if(res['success']){
        this.router.navigate(['/account/login']);
      }
    });
  }
}
