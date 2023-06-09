import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit{
  filteredProducts: Product[] = [];
  selectedCategory: string = '';
  selectedBrands: string[] = [];
  selectProdByCategory: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  categories: string[] = [
    "Chassis",
    "Processor",
    "Storage",
    "Motherboard",
    "Graphics Card",
    "Supply",
    "Memory"
  ];

  brands: string[] = [
    "ASRock",
    "Asus",
    "Gigabyte",
    "MSI",
    "NZXT",
    "Lenovo"
  ]

  productList: Product[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  // Filter
  getAllProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.productList = products;
      // Filter the products based on the selected category and brand
      this.filterProducts(); 
      console.log(products);
    });
  }

  filterProducts() {
    this.filteredProducts = this.productList.filter((product) => {
      const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
      const matchesBrands = this.selectedBrands.length === 0 || this.selectedBrands.includes(product.brand);
      return matchesCategory && matchesBrands;
    });
  }

  updateSelectedCategory(category: string, checked: boolean) {
    if (checked) {
      this.selectedCategory = category;
    } else {
      this.selectedCategory = '';
    }
    this.filterProducts();
  }

  updateSelectedBrand(brand: string, checked: boolean) {
    if (checked) {
      this.selectedBrands.push(brand);
    } else {
      const index = this.selectedBrands.indexOf(brand);
      if (index !== -1) {
        this.selectedBrands.splice(index, 1);
      }
    }
    this.filterProducts();
  }
}
