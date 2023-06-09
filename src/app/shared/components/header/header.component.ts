import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() cartItems: number = 0;
  isShowMenu: boolean = false;
  isShowDropdown: boolean = false;
  isShowSearch: boolean = false;
  searchInput: string = '';

  constructor(private router: Router) {}

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
