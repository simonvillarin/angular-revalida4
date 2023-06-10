import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { CpConfirmEmailComponent } from './pages/cp-confirm-email/cp-confirm-email.component';

const routes: Routes = [
  {
    path: 'change/password',
    component: CpConfirmEmailComponent
  },
  {
    path: 'confirm/change/password',
    component: ChangePasswordComponent
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
export class ChangePasswordRoutingModule { }
