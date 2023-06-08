import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userNotFoundGuard } from './user-not-found.guard';

describe('userNotFoundGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userNotFoundGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
