import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    constructor(private injector: Injector) { }

    handleError(error: any): void {
        const router = this.injector.get(Router);

        if (error.status === 404) {
            router.navigate(['/error-404']);
        } else if (error.status === 403) {
            router.navigate(['/error-403']);
        } else if (error.status === 500) {
            router.navigate(['/error-500']);
        } else if (error && error.message === 'net::ERR_CONNECTION_REFUSED') {
            router.navigate(['/error-500']);
        } else {
            router.navigate(['/error']);
        }
    }
}
