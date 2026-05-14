import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { superAdminGuard } from './super-admin.guard';
import { AdminAuthService } from '../services/admin-auth.service';

describe('superAdminGuard', () => {
  let router: { navigate: ReturnType<typeof vi.fn> };
  let injector: EnvironmentInjector;

  function configure(isAuth: boolean, isSuper: boolean) {
    router = { navigate: vi.fn() };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        {
          provide: AdminAuthService,
          useValue: { isAuthenticated: () => isAuth, isSuperAdmin: () => isSuper },
        },
      ],
    });
    injector = TestBed.inject(EnvironmentInjector);
  }

  function run() {
    return runInInjectionContext(injector, () =>
      superAdminGuard(undefined as never, undefined as never),
    );
  }

  it('allows access when authenticated as super_admin', () => {
    configure(true, true);
    expect(run()).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('redirects to /dashboard when authenticated but not super_admin', () => {
    configure(true, false);
    expect(run()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('redirects to /login when not authenticated', () => {
    configure(false, false);
    expect(run()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
