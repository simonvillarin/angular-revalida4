import { CanActivateFn } from '@angular/router';

export const userExistsGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('user');
  if (user) {
    return true;
  }
  return false;
};