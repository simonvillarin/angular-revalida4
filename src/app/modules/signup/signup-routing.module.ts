import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupFormComponent } from './pages/signup-form/signup-form.component';

const routes: Routes = [
  {
    path: 'register',
    component: SignupFormComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
