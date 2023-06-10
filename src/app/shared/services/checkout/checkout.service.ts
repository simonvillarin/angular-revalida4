import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checkout } from '../../models/checkout';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1';

  getCheckoutByUserId = (id: number): Observable<Checkout[]> => {
    return this.http.get<Checkout[]>(`${this.BASE_URL}/checkout/${id}`);
  };

  addCheckout = (checkout: any) => {
    return this.http.post(`${this.BASE_URL}/checkout`, checkout);
  };

  deleteCheckout = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/checkout/${id}`);
  };
}
