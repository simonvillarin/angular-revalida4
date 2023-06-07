import { CanDeactivateFn } from '@angular/router';

export const deactivateGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const user = localStorage.getItem('user');
  if (user) {
    return true;
  }
  return false;
};
