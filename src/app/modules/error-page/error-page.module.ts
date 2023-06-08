import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessForbiddenPageComponent } from './components/access-forbidden-page/access-forbidden-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorPageRoutingModule } from './error-page-routing.module';



@NgModule({
  declarations: [
    AccessForbiddenPageComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ErrorPageRoutingModule
  ]
})
export class ErrorPageModule { }
