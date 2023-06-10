import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1';

  getOrdersByUserId = (userId: number): Observable<Order[]> => {
    return this.http.get<Order[]>(`${this.BASE_URL}/orders/${userId}`);
  };

  getOrderByOrderTracking = (orderTracking: number) => {
    return this.http.get(`${this.BASE_URL}/orders/tracking/${orderTracking}`);
  };

  addOrder = (order: any) => {
    return this.http.post(`${this.BASE_URL}/order`, order);
  };

  addOrders = (orders: Order[]) => {
    return this.http.post(`${this.BASE_URL}/orders`, orders);
  };

  deleteOrder = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/order/${id}`);
  };
}
