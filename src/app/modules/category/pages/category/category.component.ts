import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Product } from 'src/app/shared/models/product';
import { CartService } from 'src/app/shared/services/cart/cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  selectedBrands: string[] = [];
  selectProdByCategory: Product[] = [];
  categories: string[] = [];
  brands: string[] = [];
  productList: Product[] = [];
  tabName: string = '';
  selectedCategories: string[] = [];
  startvalue: number = 0;
  endvalue: number = 0;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  tabs: any[] = [
    {
      name: 'COMPUTERS',
      categories: [
        "Desktop PC", "Notebooks", "Mini PC", 
        "Diskless Package", "Software"
      ],
    },
    {
      name: 'COMPONENTS',
      categories: [
        "Chassis", "Processor", "Motherboard", 
        "Grapics Card", "Memory", "Power Supply", 
        "Hard Drive", "Sound Card","LAN Card", 
        "Optical Drive"
      ],
    },
    {
      name: 'PERIPHERALS',
      categories: [
        "Display", "Audio", "Gaming", "Keyboard",
        "Mouse", "Furniture", "Printer", "Scanner",
        "Office Supplies", "Surveilance|CCTV",
        "UPS|AVR", "Webcam"
      ]
    }
  ]

  

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      //Get passed tab name from header
      this.tabName = params['tabName'];
      this.categories = [];
      this.brands = [];
      this.getAllProducts();
      console.log(this.tabName);
      console.log(this.productList);
    })
  }

  // Get Products Filtered by Tabname and its Category.
  getAllProducts() {
    this.productService.getAllProducts().subscribe((data) => {
      this.productList = data.filter((product) => {
        return this.tabs.some((tab) => {
          if (tab.name === this.tabName && tab.categories.includes(product.category)) {
            // Populate Categories
            this.categories = tab.categories;
            // Populate Brands
            if (!this.brands.includes(product.brand)) {
              this.brands.push(product.brand);
            }
            return true;
          }
          return false;
        });
      });
      // Remove duplicate brands
      this.brands = Array.from(new Set(this.brands));

      // Calculate the minimum and maximum prices
      const prices = this.productList.map((product) => product.price);
      this.startvalue = Math.min(...prices);
      this.endvalue = Math.max(...prices);

      this.filterProducts();

      this.cartService.cartItems = 1;
    });
  }

  // Category select
  onCategoryCheckboxChange(category: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedCategories = [category];
    } else {
      this.selectedCategories = []
    }
    this.filterProducts();
  }
  
  // Brands select
  onBrandCheckboxChange(brand: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedBrands.push(brand);
    } else {
      const index = this.selectedBrands.indexOf(brand);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
    this.filterProducts();
  }

  filterProducts() {
    this.filteredProducts = this.productList.filter((product) => {
      const isCategorySelected =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category);
  
      const isBrandSelected =
        this.selectedBrands.length === 0 ||
        this.selectedBrands.includes(product.brand);
  
        const isPriceInRange = product.price >= this.startvalue && product.price <= this.endvalue;
  
        return isCategorySelected && isBrandSelected && isPriceInRange;
    });
  }
  
  

}
