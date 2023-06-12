import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.excludeToken(request.url)) {
      return next.handle(request);
    }

    const token = this.authService.getToken();

    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error) => {
        if (error.status === 403) {
          this.router.navigate(['/error-403']);
        }
        return throwError(error);
      })
    );
  }

  excludeToken(url: string): boolean {
    const excludedUrls: string[] = [
      'http://localhost:8080/api/v1/auth/register',
      'http://localhost:8080/api/v1/auth/login',
    ];

    return excludedUrls.some((excludedUrl) => url.includes(excludedUrl));
  }
}
