import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSidebarComponent } from './manage-sidebar/manage-sidebar.component';
import { ManageSubSidebarComponent } from './manage-sub-sidebar/manage-sub-sidebar.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../page-layout/home/home.component';

const routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'home-banner', component: HomeBannerComponent},
    {path: 'sidebar', component: ManageSidebarComponent},
    {path: 'sub-sidebar', component: ManageSubSidebarComponent},
  ]}
 
]

@NgModule({
  declarations: [
    ManageSidebarComponent,
    ManageSubSidebarComponent,
    HomeBannerComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes),MaterialModule,SharedModule
  ]
})
export class BannerModule { }
