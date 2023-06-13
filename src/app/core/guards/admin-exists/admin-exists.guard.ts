import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminExistsGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
    if (user && JSON.parse(user).role === 'ADMIN') {
      return true;
    } else {
      const router = inject(Router);
      router.navigateByUrl('/home');
      return false;
    }
};
