import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccessForbiddenPageComponent } from './components/access-forbidden-page/access-forbidden-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '403/page',
    component: AccessForbiddenPageComponent
  },
  {
    path: '404/page',
    component: PageNotFoundComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ErrorPageRoutingModule { }
