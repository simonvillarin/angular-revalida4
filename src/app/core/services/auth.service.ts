import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isUserLoggedIn = () => {
    return localStorage.getItem('user') || false;
  };

  getToken = () => {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      return user.token;
    }
    return false;
  };

  getUserId = () => {
    const userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
      const user = JSON.parse(userLocalStorage);
      return user.userId;
    }
    return false;
  };
}
