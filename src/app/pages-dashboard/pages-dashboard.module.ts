import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages/pages.component';
import { PagePopupComponent } from './page-popup/page-popup.component';
import { MaterialModule } from '../shared/material.module';
import { PageDetailComponent } from './page-detail/page-detail.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: 'pages', component: PagesComponent},
  {path: 'page-detail', component: PageDetailComponent},
]

@NgModule({
  declarations: [
    PagesComponent,
    PagePopupComponent,
    PageDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesDashboardModule { }
