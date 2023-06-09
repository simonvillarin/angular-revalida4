import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) { }

  BASE_URL = 'http://localhost:8080/api/v1/auth/register';

  saveUser = (user: User) => {
    return this.http.post(`${this.BASE_URL}`, user);
  };


  // Validator_URL = 'http://localhost:8080/api/v1/user/email';
  // checkEmailExists(email: string): Observable<boolean> {
  //   return this.http.post(this.BASE_URL, { email }).pipe(
  //     map(() => true), // Email exists
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 404) {
  //         return of(false); // Email does not exist
  //       }
  //       throw error;
  //     })
  //   );
  // }
}
