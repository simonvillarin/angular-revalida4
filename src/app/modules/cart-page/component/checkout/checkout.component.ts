import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart';
import { CheckoutService } from 'src/app/shared/services/checkout/checkout.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: Cart[] = [];
  userData: any[] = [
    {
      name: 'Sandra Gesite',
      mobileNo: '09875756432',
      address: 'Any St.,Palanan, Makati City, Metro Manila',
    },
  ];

  products: any[] = [
    {
      prodId: 1,
      prodName:
        'FSP Dagger PRO Gold SFX Gen5 850W 80+ Full Modular SDA2-850 Gen5 Power Supply',
      prodPrice: 7250.0,
      prodImg:
        '//cdn.shopify.com/s/files/1/2227/7667/files/FSPDaggerPROGoldSFXGen5850W80_FullModularSDA2-850Gen5PowerSupply_1024x1024.jpg?v=1683275183',
      prodQuantity: 1,
    },
    {
      prodId: 2,
      prodName: 'PCIE 4-port USB Card 3.0',
      prodPrice: 590.0,
      prodImg:
        '//cdn.shopify.com/s/files/1/2227/7667/products/PCIE_4-port_Usb_Card_3.0_1024x1024.jpg?v=1571552737',
      prodQuantity: 2,
    },
  ];

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    console.log(this.checkoutService.getCartItems());
  }

  // Calculate Total
  calculateTotalPrice() {}
}
