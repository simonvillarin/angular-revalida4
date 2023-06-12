import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPage403Component } from './pages/error-page403/error-page403.component';
import { ErrorPage404Component } from './pages/error-page404/error-page404.component';



@NgModule({
  declarations: [ErrorPage403Component, ErrorPage404Component],
  imports: [
    CommonModule
  ]
})
export class ErrorPagesModule { }
