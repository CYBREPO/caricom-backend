import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'dashbaord', loadChildren: () => import('./pages-dashboard/pages-dashboard.module').then(m => m.PagesDashboardModule)},
  {path: 'home', loadChildren: () => import('./page-layout/page-layout.module').then(m => m.PageLayoutModule)},
  {path: 'banner', loadChildren: () => import('./banner/banner.module').then(m => m.BannerModule)},
  {path: "**", redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
