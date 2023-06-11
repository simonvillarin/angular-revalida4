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
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

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
    private productListService: ProductListService,
    private http: HttpClient
  ) {
    this.productForm = this.fb.group({
      itemName: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      description: this.fb.array([]),
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      productImg: [''],
      status: ['', Validators.required],
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

  // Category
  categoryOptions: string[] = [
    'Desktop Computer',
    'Notebook Computer',
    'Accessories',
    'Components',
    'Peropherals',
  ];

  // brand

  brandOptions: string[] = [
    'Lenovo',
    'Asus',
    'GIGABYTE',
    'MSI',
    'Samsung',
    'Dell',
    'Real Me',
  ];

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

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to edit this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, edit it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(product);

        this.productForm.patchValue({
          itemName: product.productName,
          description: product.description,
          quantity: product.quantity,
          price: product.price,
          productImg: product.img,
        });

        Swal.fire('Done!', 'Product successfully loaded.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'You have cancelled the transaction.', 'error');
      }
    });
  };

  deleteProduct = (id: number) => {
    const payload = {
      isAvailable: false,
    };
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.dataSource.data.findIndex(
          (product) => product.productId === id
        );
        this.dataSource.data[index].isAvailable = false;

        Swal.fire('Done!', 'Product successfully deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'You have cancelled the transaction.', 'error');
      }
    });

    this.productListService
      .updateProduct(id, payload)
      .subscribe((res) => console.log(res));
  };

  resetAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You're about to reset the form.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reset it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.reset();
      }
    });
  }

  reset = () => {
    this.productForm.reset();
    this.isActionEdit = false;
    this.buttonAction = 'ADD';
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
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to add new product?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, save it!',
          cancelButtonText: 'No, cancel',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.productListService
              .addProduct(formData)
              .subscribe((res: any) => {
                product.img = res.imageLink;
                console.log(res);
              });
            console.log(product);
            Swal.fire('Done!', 'Product, Successfully Added!.', 'success');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'You have cancelled the transaction.',
              'error'
            );
          }
        });
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
