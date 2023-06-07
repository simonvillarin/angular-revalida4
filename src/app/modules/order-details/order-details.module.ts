import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { OrderDetailsRoutingModule } from './order-details-routing.module';



@NgModule({
  declarations: [
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderDetailsRoutingModule
  ]
})
export class OrderDetailsModule { }
