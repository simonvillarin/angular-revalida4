import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurdersRoutingModule } from './orders-routing.module';
import { AllTabsComponent } from './component/all-tabs/all-tabs.component';
import { OrdersItemComponent } from './pages/orders-item/orders-item.component';
import { PendingOrdersComponent } from './component/pending-orders/pending-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    OrdersItemComponent,
    AllTabsComponent,
    PendingOrdersComponent
  ],
  imports: [
    CommonModule,
    OurdersRoutingModule,
    SharedModule
  ]
})
export class OrdersModule { }
