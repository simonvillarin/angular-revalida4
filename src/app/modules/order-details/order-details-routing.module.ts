import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';

const routes: Routes = [
  {
    path: 'user/order/details',
    component: OrderDetailsComponent
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
export class OrderDetailsRoutingModule { }
