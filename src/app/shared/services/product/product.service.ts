import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1';

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/products`);
  }

  getProductById(prodId: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/product/${prodId}`);
  }

  addProduct = (product: Product) => {
    return this.http.post(`${this.BASE_URL}/product`, product);
  };

  updateProduct = (id: number, product: Product) => {
    return this.http.put(`${this.BASE_URL}/product/${id}`, product);
  };

  deleteProduct = (id: number) => {
    return this.http.delete(`${this.BASE_URL}/product/${id}`);
  };
}
