import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss'],
})
export class OrdersItemComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrdersById();
  }

  getOrdersById = () => {
    let userId;
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      userId = JSON.parse(userLocalStorage).userId;
    }

    this.orderService
      .getOrdersByUserId(userId)
      .subscribe((data) => (this.orders = data));
  };
}
