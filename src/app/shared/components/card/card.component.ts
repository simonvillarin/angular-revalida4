import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart/cart.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product: Product | undefined;

  showCheck: boolean = false;

  constructor(private router: Router, private cartService: CartService) {}

  viewProduct = (id: number) => {
    this.router.navigate(['/product', id]);
  };

  addToCartItem = (product: Product) => {
    const userLocalStorage = localStorage.getItem('user');
    let userId;
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      userId = user.userId;
    }

    const payload = {
      userId: userId,
      productId: product.productId,
      productName: product.productName,
      category: product.category,
      description: product.description,
      quantity: 1,
      price: product.price,
      img: product.img,
    };

    // const local = localStorage.getItem('cart');
    // if (local) {
    //   const quantity = JSON.parse(local);
    //   let qty = quantity + 1;
    //   localStorage.setItem('cart', JSON.stringify(qty));
    // } else {
    //   localStorage.setItem('cart', '1');
    // }

    this.cartService.addCartItem(payload).subscribe((res) => console.log(res));
    this.showCheck = true;
    setTimeout(() => (this.showCheck = false), 2000);
  };
}
