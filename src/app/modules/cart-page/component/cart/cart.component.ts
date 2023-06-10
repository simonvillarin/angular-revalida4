import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/cart';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { CheckoutService } from 'src/app/shared/services/checkout/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.getAllCartItems();
  }

  getAllCartItems = () => {
    const userLocalStorage = localStorage.getItem('user');
    let userId;
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      userId = user.userId;
    }

    this.cartService.getCartItemByUserId(userId).subscribe((data) => {
      this.cartItems = data;
    });
  };

  increase(item: any) {
    item.quantity++;

    const payload = {
      quantity: item.quantity,
    };

    this.cartService
      .updateCartItem(item.cartId, payload)
      .subscribe((res) => console.log(res));
  }

  decrease(item: any) {
    if (item.quantity > 1) {
      item.quantity--;

      const payload = {
        quantity: item.quantity,
      };

      this.cartService
        .updateCartItem(item.cartId, payload)
        .subscribe((data) => console.log(data));
    }
  }

  deleteCartItem = (id: number) => {
    const filter = this.cartItems.filter((cart) => cart.cartId !== id);
    this.cartItems = filter;
    this.cartService.deleteCartItem(id).subscribe((res) => console.log(res));
  };

  // Select All function
  isSelectAll: boolean = false;
  selectedProds: any[] = [];

  selectAllCartProd() {
    if (this.isSelectAll) {
      this.selectedProds = [...this.cartItems];
    } else {
      this.selectedProds = [];
    }
  }

  isSelected(item: any): boolean {
    return this.selectedProds.includes(item);
  }

  toggleSelectProd(prod: any) {
    if (this.isSelected(prod)) {
      this.selectedProds = this.selectedProds.filter((p) => p !== prod);
    } else {
      this.selectedProds.push(prod);
    }
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;

    for (const product of this.selectedProds) {
      totalPrice += product.price * product.quantity;
    }

    return totalPrice;
  }

  countSelectedProd(): number {
    let productCount = 0;

    for (const product of this.selectedProds) {
      productCount += product.quantity;
    }

    return productCount;
  }

  // Checkout Navigation
  checkout() {
    if (this.selectedProds.length > 0) {
      for (let i = 0; i < this.selectedProds.length; i++) {
        const payload = {
          userId: this.selectedProds[i].userId,
          productId: this.selectedProds[i].productId,
          cartId: this.selectedProds[i].cartId,
          productName: this.selectedProds[i].productName,
          category: this.selectedProds[i].category,
          description: this.selectedProds[i].description,
          img: this.selectedProds[i].img,
          quantity: this.selectedProds[i].quantity,
          price: this.selectedProds[i].price,
        };

        this.checkoutService
          .addCheckout(payload)
          .subscribe((res) => console.log(res));
      }
      this.router.navigate(['checkout']);
    }
  }
}
