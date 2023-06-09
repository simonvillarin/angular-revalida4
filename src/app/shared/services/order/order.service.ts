import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1';

  getOrdersByUserId = (userId: number): Observable<Order> => {
    return this.http.get<Order>(`${this.BASE_URL}/orders/${userId}`);
  };

  getOrderById = (id: number): Observable<Order> => {
    return this.http.get<Order>(`${this.BASE_URL}/order/${id}`);
  };

  addOrder = (order: Order) => {
    return this.http.post(`${this.BASE_URL}/order`, order);
  }

  deleteOrder = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/order/${id}`)
  }
}
