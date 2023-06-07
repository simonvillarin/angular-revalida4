import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  quantity: number = 0;
  products: any[] = [
    {
      "prodId": 1,
      "prodName": "FSP Dagger PRO Gold SFX Gen5 850W 80+ Full Modular SDA2-850 Gen5 Power Supply",
      "prodPrice": 7250.00,
      "prodImg": "//cdn.shopify.com/s/files/1/2227/7667/files/FSPDaggerPROGoldSFXGen5850W80_FullModularSDA2-850Gen5PowerSupply_1024x1024.jpg?v=1683275183",
      "prodQuantity": 1
    },
    {
      "prodId": 2,
      "prodName": "PCIE 4-port USB Card 3.0",
      "prodPrice": 590.00,
      "prodImg": "//cdn.shopify.com/s/files/1/2227/7667/products/PCIE_4-port_Usb_Card_3.0_1024x1024.jpg?v=1571552737",
      "prodQuantity": 2
    }
  ]

  constructor(private router: Router){}

  // Quantity Function
  increase(prod: any) {
    prod.prodQuantity++;
  }

  decrease(prod: any) {
    if(prod.prodQuantity > 0) {
      prod.prodQuantity--;
    }
  }

  // Select All function
  isSelectAll: boolean = false;
  selectedProds: any[] = [];

  selectAllCartProd() {
    if (this.isSelectAll) {
      this.selectedProds = [...this.products];
    } else {
      this.selectedProds = []
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
    this.router.navigate(['user/checkout']);
  }
}
