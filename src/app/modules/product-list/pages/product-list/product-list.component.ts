import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

export interface Product {
  itemName: string;
  itemBrand: string;
  category: string;
  itemImg: string;
  itemDesc: string[];
  price: number;
  qty: number;
}

const ELEMENT_DATA: Product[] = [
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
  {
    itemName: 'Note150',
    itemBrand: 'Acer',
    category: 'Notebooks',
    itemImg: 'Note150.svg',
    itemDesc: ['4gb Ram', '4core', '17" display'],
    price: 17500.0,
    qty: 50,
  },
];
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements AfterViewInit {
  isShowMenu: boolean = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  };

  dataSource = new MatTableDataSource<Product>(ELEMENT_DATA);
  displayedColumns: string[] = [
    'itemName',
    'itemBrand',
    'category',
    'itemDesc',
    'price',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  categoryOptions: string[] = [
    'Desktop',
    'Notebook',
    'Components',
    'Peripherals',
  ];
  showAddOption: boolean = false;
  newOption: string | undefined;
  showCategoryModal: boolean = false;

  onOptionSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'add') {
      this.showAddOption = true;
      this.showCategoryModal = true;
    } else {
      this.showAddOption = false;
      this.showCategoryModal = false;
    }
  }

  addNewOption() {
    console.log(this.newOption);
    if (this.newOption && !this.categoryOptions.includes(this.newOption)) {
      this.categoryOptions.push(this.newOption);
      this.newOption = '';
      this.showAddOption = false;
      this.showCategoryModal = false;
    }
    console.log(this.categoryOptions);
  }

  brandOptions: string[] = ['Asus', 'Real Me', 'Dell', 'Lenovo'];
  showAddBrand: boolean = false;
  newBrand: string | undefined;
  showBrandModal: boolean = false;

  onBrandSelected(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'add') {
      this.showAddBrand = true;
      this.showBrandModal = true;
    } else {
      this.showAddBrand = false;
      this.showBrandModal = false;
    }
  }

  addBrand() {
    console.log(this.newBrand);
    if (this.newBrand && !this.brandOptions.includes(this.newBrand)) {
      this.brandOptions.push(this.newBrand);
      this.newBrand = '';
      this.showAddBrand = false;
    }
    console.log(this.brandOptions);
  }
}
