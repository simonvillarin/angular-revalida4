import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  img: string =
    'https://ld-wp73.template-help.com/woocommerce/prod_21514/v2/wp-content/uploads/2019/05/11413138-300x300.jpg';
  productName: string = 'Intel Core i3-8100';
  price: string = '12,000';
}
