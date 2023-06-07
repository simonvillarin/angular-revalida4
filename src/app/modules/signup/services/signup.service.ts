import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1/auth/register';

  saveUser = (user: User) => {
    return this.http.post(`${this.BASE_URL}`, user);
  };
}
