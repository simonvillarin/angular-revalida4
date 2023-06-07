import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersItemComponent } from './pages/orders-item/orders-item.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersItemComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OurdersRoutingModule {}
