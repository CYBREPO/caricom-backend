import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageSidebarComponent } from './manage-sidebar/manage-sidebar.component';
import { ManageSubSidebarComponent } from './manage-sub-sidebar/manage-sub-sidebar.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../page-layout/home/home.component';
import { GridSxComponent } from './grid-sx/grid-sx.component';
import { CountriesComponent } from './countries/countries.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PillarComponent } from './pillar/pillar.component';

const routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'home-banner', component: HomeBannerComponent},
    {path: 'sidebar', component: ManageSidebarComponent},
    {path: 'sub-sidebar', component: ManageSubSidebarComponent},
    {path: 'grid-six', component: GridSxComponent},
    {path: 'countries', component: CountriesComponent},
    {path: 'pillars', component: PillarComponent},

  ]}
 
]

@NgModule({
  declarations: [
    ManageSidebarComponent,
    ManageSubSidebarComponent,
    HomeBannerComponent,
    GridSxComponent,
    CountriesComponent,
    PillarComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes),MaterialModule,SharedModule,CKEditorModule
  ]
})
export class BannerModule { }
