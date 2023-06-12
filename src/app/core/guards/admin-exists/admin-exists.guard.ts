import { CanActivateFn } from '@angular/router';

export const adminExistsGuard: CanActivateFn = (route, state) => {
  return true;
};
