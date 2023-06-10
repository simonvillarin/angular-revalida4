import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss'],
})
export class PendingOrdersComponent {
  @Input() order: Order | undefined;

  constructor(private router: Router) {}
}
