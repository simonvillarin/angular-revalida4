import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isShowMenu: boolean = false;
  isShowDropdown: boolean = false;
  isShowSearch: boolean = false;
  searchInput: string = '';
  cartItems: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  ngAfterViewInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

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
  };

  clearInput = () => {
    this.searchInput = '';
  };

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  };
}
