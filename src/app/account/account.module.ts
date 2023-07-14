import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MaterialModule } from '../shared/material.module';

const routes = [
  // {path: '',component: CustomerLayoutComponent, children: [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'reset-password/:id/:date', component: ResetPasswordComponent},
  // ]}
]

@NgModule({
  declarations: [RegisterComponent,LoginComponent,ForgotPasswordComponent, ResetPasswordComponent],
  imports: [
    CommonModule,RouterModule.forChild(routes),MaterialModule
  ]
})
export class AccountModule { }
