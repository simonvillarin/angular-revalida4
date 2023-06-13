import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userExistsGuard: CanActivateFn = (route, state) => {

    const user = localStorage.getItem('user');
    if (user && JSON.parse(user).role === 'USER') {
      return true;
    } else {
      const router = inject(Router);
      router.navigate(['/dashboard']);
      return false;
    }
};