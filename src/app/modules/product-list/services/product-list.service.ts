import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductListService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1';

  getAllProducts = (): Observable<Product[]> => {
    return this.http.get<Product[]>(`${this.BASE_URL}/products`);
  };

  getProductById = (id: number): Observable<Product> => {
    return this.http.get<Product>(`${this.BASE_URL}/product/${id}`);
  };

  addProduct = (product: any) => {
    return this.http.post(`${this.BASE_URL}/product`, product);
  };

  updateProductWithImage = (id: number, product: any) => {
    return this.http.put(`${this.BASE_URL}/product/image/${id}`, product);
  };

  updateProduct = (id: number, product: any) => {
    return this.http.put(`${this.BASE_URL}/product/${id}`, product);
  };
}
