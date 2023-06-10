import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss'],
})
export class OrdersItemComponent implements OnInit, AfterViewInit {
  orders: Order[] = [];
  orderItems: any[] = [];
  orderTrackings: any[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrdersById();
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {});
  }

  getOrdersById = () => {
    let userId;
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      userId = JSON.parse(userLocalStorage).userId;
    }

    this.orderService.getOrdersByUserId(userId).subscribe((data) => {
      this.orders = data;
      for (let i = 0; i < data.length; i++) {
        if (!this.orderTrackings.includes(data[i].orderTracking)) {
          this.orderTrackings.push(data[i].orderTracking);
        }
      }
      for (let i = 0; i < this.orderTrackings.length; i++) {
        this.orderService
          .getOrderByOrderTracking(this.orderTrackings[i])
          .subscribe((data) => {
            const item = {
              item: data,
            };
            this.orderItems.push(item);
          });
      }
    });
  };

  getQuantity = (qty: number) => {
    this.totalQuantity = qty;
  };

  getPrice = (price: number) => {
    this.totalPrice = price;
  };
}
