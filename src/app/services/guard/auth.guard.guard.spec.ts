import { TestBed } from '@angular/core/testing';

import { Auth } from './auth.guard.guard';

describe('Auth.GuardGuard', () => {
  let guard: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Auth);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
