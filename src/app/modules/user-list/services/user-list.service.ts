import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(private http: HttpClient) {}

  BASE_URL = 'http://localhost:8080/api/v1';

  getAllUsers = (): Observable<User[]> => {
    return this.http.get<User[]>(`${this.BASE_URL}/users`);
  };

  getUserById = (id: number): Observable<User> => {
    return this.http.get<User>(`${this.BASE_URL}/user/${id}`);
  };

  addUser = (user: User) => {
    return this.http.post(`${this.BASE_URL}/user`, user);
  };

  updateUser = (id: number, user: User) => {
    return this.http.put(`${this.BASE_URL}/user/${id}`, user);
  };
}
