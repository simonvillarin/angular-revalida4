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
  product: any;
  file: any;
  search: string = '';
  categories: string[] = [];
  brands: string[] = [];
  alert: string = '';
  showAlert: boolean = false;

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
    this.product = product;

    this.productForm.patchValue({
      itemName: product.productName,
      brand: product.brand,
      category: product.category,
      quantity: product.quantity,
      price: product.price,
      status: product.isAvailable ? 'true' : 'false',
    });
    this.description.clear();
    product.description.map((d: any) =>
      this.description.push(this.fb.control(d))
    );
    this.file = undefined;
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
    this.description.clear();
  };

  onSubmit(): void {
    if (this.isActionEdit == false) {
      const product: any = {
        productName: this.productForm.get('itemName')?.value,
        brand: this.productForm.get('brand')?.value,
        category: this.productForm.get('category')?.value,
        description: this.productForm.get('description')?.value,
        quantity: this.productForm.get('quantity')?.value,
        price: this.productForm.get('price')?.value,
        img: '',
        soldItems: 0,
        soldPrice: 0,
        isAvailable: true,
      };

      this.productForm.patchValue({
        status: true,
      });

      const formData = new FormData();
      formData.append(
        'product',
        new Blob([JSON.stringify(product)], { type: 'application/json' })
      );
      formData.append('file', this.file);

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
                if (res.message == 'Product name already exists') {
                  this.showAlert = true;
                  this.alert = 'Product name already exists';
                  setTimeout(() => (this.showAlert = false), 3000);
                } else {
                  this.dataSource.data = [...this.dataSource.data, product];
                  Swal.fire(
                    'Done!',
                    'Product, Successfully Added!.',
                    'success'
                  );
                  this.productForm.reset();
                  this.description.clear();
                }
              });
          }
        });
      }
      if (this.productForm.invalid) {
        this.productForm.markAllAsTouched();
        console.log('Invalid Form');
        return;
      }
    } else {
      const productName = this.productForm.get('itemName')?.value;
      const brand = this.productForm.get('brand')?.value;
      const category = this.productForm.get('category')?.value;
      const description = this.productForm.get('description')?.value;
      const quantity = this.productForm.get('quantity')?.value;
      const price = this.productForm.get('price')?.value;
      const status = this.productForm.get('status')?.value;

      const prod: any = {
        brand: brand,
        category: category,
        description: description,
        quantity: quantity,
        price: price,
        img: '',
        isAvailable: status == 'true' ? true : false,
      };

      const formData = new FormData();
      formData.append(
        'product',
        new Blob([JSON.stringify(prod)], { type: 'application/json' })
      );
      formData.append('file', this.file);

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
          if (this.file == undefined) {
            if (productName != this.product.productName) {
              prod.productName = productName;
            }
            this.productListService
              .updateProduct(this.product.productId, prod)
              .subscribe((res: any) => {
                console.log(res);
                if (res.message == 'Product name already exists') {
                  this.showAlert = true;
                  this.alert = 'Product name already exists';
                  setTimeout(() => (this.showAlert = false), 3000);
                } else {
                  const index = this.dataSource.data.findIndex(
                    (product) => product.productId === this.product.productId
                  );

                  this.dataSource.data[index].productName = productName;
                  this.dataSource.data[index].brand = brand;
                  this.dataSource.data[index].category = category;
                  this.dataSource.data[index].description = description;
                  this.dataSource.data[index].quantity = quantity;
                  this.dataSource.data[index].price = price;
                  this.dataSource.data[index].img = this.product.img;
                  this.dataSource.data[index].isAvailable =
                    status == 'true' ? true : false;
                  this.description.clear();
                  this.isActionEdit = false;
                  this.buttonAction = 'Add';
                  Swal.fire(
                    'Done!',
                    'Product, Successfully Updated!.',
                    'success'
                  );
                }
              });
          } else {
            if (productName != this.product.productName) {
              prod.productName = productName;
            }
            this.productListService
              .updateProductWithImage(this.product.productId, formData)
              .subscribe((res: any) => {
                this.product.img = res.imageLink;
                console.log(res);
                if (res.message == 'Product name already exists') {
                  this.showAlert = true;
                  this.alert = 'Product name already exists';
                  setTimeout(() => (this.showAlert = false), 3000);
                } else {
                  const index = this.dataSource.data.findIndex(
                    (product) => product.productId === this.product.productId
                  );

                  this.dataSource.data[index].productName = productName;
                  this.dataSource.data[index].brand = brand;
                  this.dataSource.data[index].category = category;
                  this.dataSource.data[index].description = description;
                  this.dataSource.data[index].quantity = quantity;
                  this.dataSource.data[index].price = price;
                  this.dataSource.data[index].img = this.product.img;
                  this.dataSource.data[index].isAvailable =
                    status == 'true' ? true : false;
                  this.description.clear();
                  this.isActionEdit = false;
                  this.buttonAction = 'Add';
                  Swal.fire(
                    'Done!',
                    'Product, Successfully Updated!.',
                    'success'
                  );
                }
              });
          }
        }
      });
      this.productForm.reset();
    }
  }
}
