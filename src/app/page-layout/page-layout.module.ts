import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: HomeComponent},
]

@NgModule({
  declarations: [
    HomeComponent,TopNavbarComponent,SideNavbarComponent
  ],
  imports: [
    CommonModule,MaterialModule,RouterModule.forChild(routes)
  ]
})
export class PageLayoutModule { }
