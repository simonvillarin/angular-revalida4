import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminExistsGuard } from './admin-exists.guard';

describe('adminExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminExistsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
