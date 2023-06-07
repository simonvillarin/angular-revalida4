import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss']
})
export class PendingOrdersComponent {
  constructor(private router: Router) {}

  goToOrderDetails() {
    return this.router.navigate(['user/order/details']);
  }
}
