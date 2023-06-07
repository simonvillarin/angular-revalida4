import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1/auth/login';

  login = (user: any): Observable<User> => {
    return this.http.post<User>(`${this.BASE_URL}`, user);
  };
}
