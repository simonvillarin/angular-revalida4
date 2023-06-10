import { OrderService } from './../../../../shared/services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/cart';
import { Checkout } from 'src/app/shared/models/checkout';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: Checkout[] = [];

  constructor(
    private checkoutService: CheckoutService,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCheckoutByUserId();
  }

  getCheckoutByUserId = () => {
    let userId;
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      userId = user.userId;
    }

    this.checkoutService
      .getCheckoutByUserId(userId)
      .subscribe((data) => (this.cartItems = data));
  };

  // Calculate Total
  calculateTotalPrice() {
    let totalPrice = 0;
    this.cartItems.map((item) => (totalPrice += item.price * item.quantity));
    return totalPrice + 50;
  }

  calculateTotalQuantity = () => {
    let totalQuantity = 0;
    this.cartItems.map((item) => (totalQuantity += item.quantity));
    return totalQuantity;
  };

  generateRandomNumber = () => {
    const min = Math.pow(10, 8);
    const max = Math.pow(10, 9) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  checkout = () => {
    const orderTracking = this.generateRandomNumber();
    let totalQuantity = 0;
    let totalPrice = 0;

    for (let i = 0; i < this.cartItems.length; i++) {
      totalQuantity += this.cartItems[i].quantity;
      totalPrice += this.cartItems[i].price * this.cartItems[i].quantity;
    }

    console.log(totalPrice);

    for (let i = 0; i < this.cartItems.length; i++) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      const payload = {
        orderTracking: orderTracking,
        userId: this.cartItems[i].userId,
        productId: this.cartItems[i].productId,
        productName: this.cartItems[i].productName,
        category: this.cartItems[i].category,
        description: this.cartItems[i].description,
        img: this.cartItems[i].img,
        quantity: this.cartItems[i].quantity,
        price: this.cartItems[i].price,
        orderDate: formattedDate,
        totalQuantity: totalQuantity,
        totalPrice: totalPrice,
      };

      this.orderService.addOrder(payload).subscribe((res) => console.log(res));
    }
    for (let i = 0; i < this.cartItems.length; i++) {
      this.checkoutService
        .deleteCheckout(this.cartItems[i].cartId)
        .subscribe((res) => console.log(res));
    }
    for (let i = 0; i < this.cartItems.length; i++) {
      this.cartService
        .deleteCartItem(this.cartItems[i].cartId)
        .subscribe((res) => console.log(res));
    }

    this.router.navigate(['orders']);
    this.cartItems = [];
  };
}
