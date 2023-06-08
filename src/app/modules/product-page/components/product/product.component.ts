import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{
  quantity: number = 1;
  activeTab: string = 'description';
  userCount: number = 0;
  totalRating: number = 0;
  aveUserRating: any;
  totalStar: number = 5;
  ratings: number[] = [];
  ratingArray: number[] = [];
  prodName: string = "Lenovo DB60 Slim USB Portable DVD Burner DB60-WW";

  products: any = [
    {
        prodName: "Lenovo DB60 Slim USB Portable DVD Burner DB60-WW",
        prodPrice: 650.00,
        prodImg: "//cdn.shopify.com/s/files/1/2227/7667/products/LenovoDB60SlimUSBPortableDVDBurnerDB60-WW_1024x1024.jpg?v=1671768668",
        description: "Portable, DVD Burner",
        specifications: [
          "Portable, DVD Burner", 
          "Hardware Interface USB", 
          "Hardware Platform Laptop", 
          "Item Dimensions LxWxH 10 x 4 x 1 inches",
          "Item Dimensions LxWxH 10 x 4 x 1 inches"
        ]
    }
  ]

  userRatingsReview: any[] = [
    {
      id: 1,
      prodName: "Lenovo DB60 Slim USB Portable DVD Burner DB60-WW",
      username: "a****2",
      rating: 5,
      comment: "Good product and quality! thank you seller! more good  products and transactions to come! will order another color! Thanks",
      images: [
        "//cdn.shopify.com/s/files/1/2227/7667/products/AsusSDRW-08D2S-U_1024x1024.jpg?v=1571552362",
        "//cdn.shopify.com/s/files/1/2227/7667/products/AsusSDRW-08D2S-U_1024x1024.jpg?v=1571552362",
        "//cdn.shopify.com/s/files/1/2227/7667/products/AsusSDRW-08D2S-U_1024x1024.jpg?v=1571552362"
      ],
      date: "2021-11-13"
    },
    {
      id: 2,
      prodName: "Lenovo DB60 Slim USB Portable DVD Burner DB60-WW",
      username: "bangG013334",
      rating: 1,
      comment: "Damaged",
      images: [
        "//cdn.shopify.com/s/files/1/2227/7667/products/DSC00399_zpsvktz3vdt_1024x1024.jpg?v=1571552431",
        "//cdn.shopify.com/s/files/1/2227/7667/products/DSC00399_zpsvktz3vdt_1024x1024.jpg?v=1571552431"
      ],
      date: "2021-11-24"
    },
    {
      id: 3,
      prodName: "Kingston XS2000 2TB USB 3.2 External SSD SXS2000/2000G",
      username: "12dffggh",
      rating: 3,
      comment: "Item is good",
      image: [],
      date: "2022-08-20"
    }
  ]
  
  constructor(private router: Router) {}

  // Product Quantity
  increase() {
    this.quantity++;
  }

  decrease() {
    if(this.quantity > 0){
      this.quantity--;
    }
  }

  ngOnInit(): void {
    // Start--- Product Ratings and Review 
    this.userRatingsReview.forEach(rateReview => {
      if ( this.prodName === rateReview.prodName) {
        this.totalRating += rateReview.rating;
        this.userCount++;
        this.ratings.push(rateReview.rating)
      }
      console.log(this.userCount)
    });
    
    if (this.userCount > 0) {
      this.aveUserRating = (this.totalRating / this.userCount).toFixed(1);
    }

    for (let index = 0; index < this.totalStar; index++) {
      this.ratingArray.push(index);
    }
  }

  aveIconStatus(index: number) {
    if (index < this.aveUserRating) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  // End--- Product Ratings and Review 

  changeTab(tab: string) {
    this.activeTab = tab;
  }

  addToCart() {
    this.router.navigate(['cart'])
  }

  buyNow() {
    this.router.navigate(['checkout'])
  }
}
