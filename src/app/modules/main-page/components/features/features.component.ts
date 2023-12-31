import { Component, OnInit } from '@angular/core';
import { UserListService } from 'src/app/modules/user-list/services/user-list.service';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit{
  productList: Product[] = [];
  userProductInterest: Product[] = [];
  featuredProductList: Product[] = [];
  userId: any;
  userInterest: any;

  constructor(
    private productService: ProductService,
    private userService: UserListService,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }
  
  getAllProducts() {
    const local = localStorage.getItem('user');
    if (local) {
      this.userId = JSON.parse(local).userId;
    }

    this.userService.getUserById(this.userId).subscribe((user) => {
      this.userInterest = {
        listOfInterest: user.listOfInterest
      }
    })

    this.productService.getAllProducts().subscribe((product) => {
      this.productList = product.filter((data) => {
        return this.userInterest.listOfInterest.includes(data.category);
      });

      // Shuffle the productList array randomly
      this.productList.sort(() => Math.random() - 0.5);

      // Take a maximum of 12 products
      this.featuredProductList = this.productList.slice(0, 12);
      console.log(this.productList);
    });
  }
}
