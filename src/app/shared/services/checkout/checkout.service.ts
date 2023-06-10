import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  cartItems: Cart[] = [];

  constructor() {}

  getCartItems = (): Cart[] => {
    return this.cartItems;
  };
}
