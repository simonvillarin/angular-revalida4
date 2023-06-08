import { CanActivateFn } from '@angular/router';

export const userNotFoundGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  if (user) {
    return false;
  }
  return true;
};
