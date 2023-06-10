import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1';

  getCheckoutByUserId = (id: number): Observable<Cart[]> => {
    return this.http.get<Cart[]>(`${this.BASE_URL}/checkout/${id}`);
  };

  addCheckout = (checkout: Cart) => {
    return this.http.post(`${this.BASE_URL}/checkout`, checkout);
  };

  deleteCheckout = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/checkout/${id}`);
  };
}
