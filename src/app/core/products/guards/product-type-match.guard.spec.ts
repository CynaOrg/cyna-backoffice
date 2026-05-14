import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, throwError } from 'rxjs';
import { productTypeMatchGuard } from './product-type-match.guard';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';

describe('productTypeMatchGuard', () => {
  let api: { get: ReturnType<typeof vi.fn> };
  let notifications: { warning: ReturnType<typeof vi.fn> };
  let translate: { instant: ReturnType<typeof vi.fn> };
  let router: Router;
  let injector: EnvironmentInjector;

  function setup() {
    api = { get: vi.fn() };
    notifications = { warning: vi.fn() };
    translate = { instant: vi.fn().mockReturnValue('Wrong type') };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: ApiService, useValue: api },
        { provide: NotificationService, useValue: notifications },
        { provide: TranslateService, useValue: translate },
        {
          provide: Router,
          useValue: {
            createUrlTree: vi.fn((segments: unknown[]) => ({ segments }) as unknown as UrlTree),
          },
        },
      ],
    });
    injector = TestBed.inject(EnvironmentInjector);
    router = TestBed.inject(Router);
  }

  function makeRoute(opts: {
    productType?: string;
    id?: string | null;
    isEdit?: boolean;
  }): ActivatedRouteSnapshot {
    return {
      data: opts.productType ? { productType: opts.productType } : {},
      paramMap: { get: (k: string) => (k === 'id' ? (opts.id ?? null) : null) },
      url: opts.isEdit ? [{ path: 'edit' }] : [{ path: 'view' }],
    } as unknown as ActivatedRouteSnapshot;
  }

  function run(route: ActivatedRouteSnapshot): unknown {
    return runInInjectionContext(injector, () =>
      productTypeMatchGuard(route, {} as RouterStateSnapshot),
    );
  }

  /** Pulls the first value out of a sync Observable returned by a guard. */
  function firstValue<T>(input: unknown): T {
    if (input && typeof (input as Observable<T>).subscribe === 'function') {
      let captured: T | undefined;
      (input as Observable<T>).subscribe((v) => (captured = v));
      return captured as T;
    }
    return input as T;
  }

  beforeEach(() => setup());

  it('allows when expectedType is missing on the route', () => {
    expect(run(makeRoute({ id: 'p1' }))).toBe(true);
  });

  it('allows when id param is missing', () => {
    expect(run(makeRoute({ productType: 'physical' }))).toBe(true);
  });

  it('returns true when product type matches expected', () => {
    api.get.mockReturnValue(of({ id: 'p1', productType: 'physical' }));
    const value = firstValue<boolean>(run(makeRoute({ productType: 'physical', id: 'p1' })));
    expect(value).toBe(true);
    expect(api.get).toHaveBeenCalledWith('admin/catalog/products/p1');
  });

  it('returns true (passes through) when payload is malformed', () => {
    api.get.mockReturnValue(of({ id: '', productType: '' }));
    const value = firstValue<boolean>(run(makeRoute({ productType: 'physical', id: 'p1' })));
    expect(value).toBe(true);
  });

  it('redirects to the correct section when product type mismatches', () => {
    api.get.mockReturnValue(of({ id: 'p1', productType: 'saas' }));
    const tree = firstValue<UrlTree>(run(makeRoute({ productType: 'physical', id: 'p1' })));
    expect(notifications.warning).toHaveBeenCalled();
    expect(router.createUrlTree).toHaveBeenCalledWith(['/services', 'p1']);
    expect(tree).toBeTruthy();
  });

  it('preserves the /edit suffix when redirecting from an edit URL', () => {
    api.get.mockReturnValue(of({ id: 'p1', productType: 'license' }));
    firstValue(run(makeRoute({ productType: 'physical', id: 'p1', isEdit: true })));
    expect(router.createUrlTree).toHaveBeenCalledWith(['/licences', 'p1', 'edit']);
  });

  it('falls back to the section index when the fetch fails', () => {
    api.get.mockReturnValue(throwError(() => new Error('boom')));
    firstValue(run(makeRoute({ productType: 'physical', id: 'p1' })));
    expect(router.createUrlTree).toHaveBeenCalledWith(['/products']);
  });
});
