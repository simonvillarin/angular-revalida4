import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { ProductListService } from 'src/app/modules/product-list/services/product-list.service';
import { Product } from 'src/app/modules/product-list/models/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() cartItems = 0;
  isShowMenu: boolean = false;
  isShowDropdown: boolean = false;
  isShowSearch: boolean = false;
  searchInput: string = '';
  products: Product[] = [];
  showPredictions: boolean = false;
  filteredData: any[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductListService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts = () => {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  };

  filterData = () => {
    if (this.searchInput !== '') {
      this.getAllProducts();
      this.showPredictions = true;
      this.filteredData = this.products.filter((item) =>
        item.productName.toLowerCase().includes(this.searchInput.toLowerCase()) && item.quantity > 0
      );
    } else if(this.searchInput === '') {
      this.showPredictions = false;
      this.filteredData = [];
    }
  };

  toggleMenu = () => {
    this.isShowMenu = !this.isShowMenu;
    this.isShowDropdown = false;
    this.isShowSearch = false;
  };

  toggleDropdown = () => {
    this.isShowDropdown = !this.isShowDropdown;
    this.isShowMenu = false;
    this.isShowSearch = false;
  };

  toggleSearch = () => {
    this.isShowSearch = !this.isShowSearch;
    this.isShowDropdown = false;
    this.isShowMenu = false;
    this.searchInput = '';
    this.products = [];
  };

  closeSearch = () => {
    this.isShowSearch = false;
    this.isShowDropdown = false;
    this.isShowMenu = false;
    this.searchInput = '';
    this.products = [];
  };

  clearInput = () => {
    this.searchInput = '';
  };

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  };

}
