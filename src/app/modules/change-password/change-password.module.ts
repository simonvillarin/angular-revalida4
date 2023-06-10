import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CpConfirmEmailComponent } from './pages/cp-confirm-email/cp-confirm-email.component';



@NgModule({
  declarations: [
    ChangePasswordComponent,
    CpConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChangePasswordModule { }
