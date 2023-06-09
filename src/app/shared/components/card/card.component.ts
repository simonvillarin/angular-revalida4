import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() img: string = '';
  @Input() productName: string = '';
  @Input() price: string = '';
 
  constructor(
    private router: Router
  ) {}

  addToCartProduct() {
    this.router.navigate([`cart`])
  }
}
