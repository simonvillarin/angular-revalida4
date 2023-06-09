import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product: Product | undefined;

  constructor(private router: Router) {}

  addToCartProduct() {
    this.router.navigate([`cart`]);
  }
}
