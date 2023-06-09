import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/shared/models/cart';
import { CartService } from 'src/app/shared/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  quantity: number = 0;
  cartItems: Cart[] = [];

  constructor(private router: Router, private cartService: CartService) {}

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
      console.log(data);
    });
  };

  // Quantity Function
  increase(prod: any) {
    prod.prodQuantity++;
  }

  decrease(prod: any) {
    if (prod.prodQuantity > 0) {
      prod.prodQuantity--;
    }
  }

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

  isSelected(prod: any): boolean {
    return this.selectedProds.includes(prod);
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
      totalPrice += product.prodPrice * product.prodQuantity;
    }

    return totalPrice;
  }

  countSelectedProd(): number {
    let productCount = 0;

    for (const product of this.selectedProds) {
      productCount += product.prodQuantity;
    }

    return productCount;
  }

  // Checkout Navigation
  checkout() {
    this.router.navigate(['checkout']);
  }
}
