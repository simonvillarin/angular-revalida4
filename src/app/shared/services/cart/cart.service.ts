import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: number = 0;

  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1';

  getCartItems = () => {
    return this.cartItems;
  };

  getCartItemByUserId = (userId: number): Observable<Cart[]> => {
    return this.http.get<Cart[]>(`${this.BASE_URL}/cartItems/${userId}`);
  };

  getCartItemById = (id: number): Observable<Cart> => {
    return this.http.get<Cart>(`${this.BASE_URL}/cartItem/${id}`);
  };

  addCartItem = (cart: any) => {
    return this.http.post(`${this.BASE_URL}/cartItem`, cart);
  };

  updateCartItem = (id: number, cart: any) => {
    return this.http.put(`${this.BASE_URL}/cartItem/${id}`, cart);
  };

  deleteCartItem = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/cartItem/${id}`);
  };
}
