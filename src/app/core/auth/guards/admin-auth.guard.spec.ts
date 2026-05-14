import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Router } from '@angular/router';
import { adminAuthGuard } from './admin-auth.guard';
import { AdminAuthService } from '../services/admin-auth.service';

describe('adminAuthGuard', () => {
  let router: { navigate: ReturnType<typeof vi.fn> };
  let injector: EnvironmentInjector;

  function configure(isAuthenticated: boolean) {
    router = { navigate: vi.fn() };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: AdminAuthService, useValue: { isAuthenticated: () => isAuthenticated } },
      ],
    });
    injector = TestBed.inject(EnvironmentInjector);
  }

  function run(): boolean | unknown {
    return runInInjectionContext(injector, () =>
      adminAuthGuard(undefined as never, undefined as never),
    );
  }

  it('returns true when authenticated', () => {
    configure(true);
    expect(run()).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('redirects to /login and returns false when not authenticated', () => {
    configure(false);
    const result = run();
    expect(result).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
