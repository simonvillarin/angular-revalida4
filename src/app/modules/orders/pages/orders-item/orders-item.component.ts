import { map, Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-orders-item',
  templateUrl: './orders-item.component.html',
  styleUrls: ['./orders-item.component.scss'],
})
export class OrdersItemComponent implements OnInit {
  orders: Observable<any[]> | undefined;
  orderItems: any[] = [];
  orderTrackings: any[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getOrdersById();
  }

  getOrdersById = () => {
    let userId;
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      userId = JSON.parse(userLocalStorage).userId;
    }

    this.orders = this.orderService.getOrdersByUserId(userId);

    console.log(this.orders);

    this.orderService.getOrdersByUserId(userId).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (!this.orderTrackings.includes(data[i].orderTracking)) {
          this.orderTrackings.push(data[i].orderTracking);
        }
      }
      for (let i = 0; i < this.orderTrackings.length; i++) {
        this.orderService
          .getOrderByOrderTracking(this.orderTrackings[i])
          .subscribe((data1: any) => {
            let totalQuantity = 0;
            let totalPrice = 0;
            let date;

            data1.map((d: any) => {
              totalQuantity = d.totalQuantity;
              totalPrice = d.totalPrice;
              date = d.orderDate;
            });

            const item = {
              item: of(data1),
              totalQuantity: totalQuantity,
              totalPrice: totalPrice,
              date: date,
            };

            this.orderItems.push(item);
          });
      }
      this.orderItems.reverse();
      this.orders = of(this.orderItems);
    });
  };

  localString = (num: number) => {
    return num.toLocaleString();
  };

  routeToProduct = (id: number) => {
    this.router.navigate([`/product/${id}`]);
  };
}
