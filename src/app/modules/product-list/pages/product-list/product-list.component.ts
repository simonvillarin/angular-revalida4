import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductListService } from '../../services/product-list.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  isShowMenu: boolean = false;
  productForm: FormGroup;
  selectedFileName: string | undefined;
  isActionEdit = false;
  buttonAction: string = 'ADD';
  id: number = 0;
  file: any;
  search: string = '';
  categories: string[] = [];
  brands: string[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts = () => {
    this.productListService.getAllProducts().subscribe((data) => {
      const sortData = data.sort((a, b) => a.productId - b.productId);
      this.dataSource.data = sortData;
      console.log(data);
    });
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private productListService: ProductListService
  ) {
    this.productForm = this.fb.group({
      itemName: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      description: this.fb.array([]),
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      productImg: [''],
    });
  }

  get description(): FormArray {
    return this.productForm.get('description') as FormArray;
  }
  addDescription(): void {
    this.description.push(this.fb.control(''));
  }

  removeDescription(index: number): void {
    this.description.removeAt(index);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log('File name:', this.file);
  }

  toggleMenu() {
    this.isShowMenu = !this.isShowMenu;
  }

  logout = () => {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  };

  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = [
    'itemName',
    'itemBrand',
    'category',
    'itemDesc',
    'quantity',
    'price',
    'image',
    'status',
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

  rowMatchesSearch = (row: any): boolean => {
    if (this.search === '') {
      return true;
    }

    const values = Object.values(row);
    for (const value of values) {
      if (
        value &&
        value.toString().toLowerCase().includes(this.search.toLowerCase())
      ) {
        return true;
      }
    }

    return false;
  };

  editProduct = (id: number, product: any) => {
    this.buttonAction = 'EDIT';
    this.isActionEdit = true;

    console.log(product);

    this.productForm.patchValue({
      itemName: product.productName,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      productImg: product.img,
    });

    this.newOption = product.category;
    this.newBrand = product.brand;
  };

  deleteProduct = (id: number) => {
    const payload = {
      isAvailable: false,
    };

    const index = this.dataSource.data.findIndex(
      (product) => product.productId === id
    );
    this.dataSource.data[index].isAvailable = false;

    this.productListService
      .updateProduct(id, payload)
      .subscribe((res) => console.log(res));
  };

  reset = () => {
    this.productForm.reset();
  };

  onSubmit(): void {
    const product: any = {
      productName: this.productForm.get('itemName')?.value,
      brand: this.productForm.get('brand')?.value,
      category: this.productForm.get('category')?.value,
      description: this.productForm.get('description')?.value,
      quantity: this.productForm.get('quantity')?.value,
      price: this.productForm.get('price')?.value,
      img: '',
      isAvailable: true,
    };

    console.log(this.file);

    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    formData.append('file', this.file);

    if (this.isActionEdit == false) {
      if (this.productForm.valid) {
        this.productListService.addProduct(formData).subscribe((res: any) => {
          product.img = res.imageLink;
          console.log(res);
        });
        console.log(product);
      }
      this.dataSource.data = [...this.dataSource.data, product];

      if (this.productForm.invalid) {
        this.productForm.markAllAsTouched();
        console.log('Invalid Form');
        return;
      }
    } else {
    }
    this.productForm.reset();
  }
}
