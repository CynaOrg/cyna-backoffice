import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { CustomerDetailComponent } from './customer-detail.component';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';

describe('CustomerDetailComponent', () => {
  let fixture: ComponentFixture<CustomerDetailComponent>;
  let component: CustomerDetailComponent;
  let api: {
    get: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
  };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };
  let router: { navigate: ReturnType<typeof vi.fn> };

  async function setup(routeId: string | null = 'u1') {
    api = { get: vi.fn(), patch: vi.fn() };
    notifications = { success: vi.fn(), error: vi.fn() };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [CustomerDetailComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => routeId } } } },
        { provide: ApiService, useValue: api },
        { provide: NotificationService, useValue: notifications },
      ],
    }).compileComponents();

    const realRouter = TestBed.inject(Router);
    router = { navigate: vi.spyOn(realRouter, 'navigate').mockResolvedValue(true) as never };

    fixture = TestBed.createComponent(CustomerDetailComponent);
    component = fixture.componentInstance;
  }

  it('does nothing when route id is missing', async () => {
    await setup(null);
    fixture.detectChanges();
    expect(api.get).not.toHaveBeenCalled();
  });

  describe('loadUser', () => {
    it('stores the user on success', async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/users/u1'
          ? of({ id: 'u1', email: 'a@b.com', isActive: true })
          : of({ data: [] }),
      );
      fixture.detectChanges();
      expect(component.user()?.id).toBe('u1');
      expect(component.loading()).toBe(false);
    });

    it('redirects to /customers on error', async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/users/u1' ? throwError(() => new Error('404')) : of({ data: [] }),
      );
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/customers']);
    });
  });

  describe('loadOrders', () => {
    it('extracts data from envelope', async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/users/u1' ? of({ id: 'u1' }) : of({ data: [{ id: 'o1' }] }),
      );
      fixture.detectChanges();
      expect(component.orders()).toEqual([{ id: 'o1' }]);
    });

    it('handles bare array', async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/users/u1' ? of({ id: 'u1' }) : of([{ id: 'o1' }]),
      );
      fixture.detectChanges();
      expect(component.orders().length).toBe(1);
    });

    it('clears orders on error', async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/users/u1' ? of({ id: 'u1' }) : throwError(() => new Error('500')),
      );
      fixture.detectChanges();
      expect(component.orders()).toEqual([]);
    });
  });

  describe('toggleActive', () => {
    beforeEach(async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/users/u1' ? of({ id: 'u1', isActive: true }) : of({ data: [] }),
      );
      fixture.detectChanges();
    });

    it('no-ops when user is null', () => {
      component.user.set(null);
      component.toggleActive();
      expect(api.patch).not.toHaveBeenCalled();
    });

    it('flips isActive on success and shows the deactivated toast', () => {
      api.patch.mockReturnValue(of({ isActive: false }));
      component.toggleActive();
      expect(api.patch).toHaveBeenCalledWith('admin/users/u1/status', { isActive: false });
      expect(component.user()?.isActive).toBe(false);
      expect(notifications.success).toHaveBeenCalledWith('CUSTOMERS.DEACTIVATED');
    });

    it('shows the activated toast when reactivating', () => {
      component.user.update((u) => (u ? { ...u, isActive: false } : null));
      api.patch.mockReturnValue(of({ isActive: true }));
      component.toggleActive();
      expect(notifications.success).toHaveBeenCalledWith('CUSTOMERS.ACTIVATED');
    });

    it('shows error on patch failure', () => {
      api.patch.mockReturnValue(throwError(() => new Error('500')));
      component.toggleActive();
      expect(notifications.error).toHaveBeenCalledWith('CUSTOMERS.UPDATE_FAILED');
    });
  });

  describe('formatters', () => {
    beforeEach(async () => {
      await setup();
      api.get.mockReturnValue(of({}));
      fixture.detectChanges();
    });

    it('formatCurrency', () => {
      expect(component.formatCurrency(50)).toContain('€');
    });

    it('formatDate', () => {
      expect(component.formatDate('2026-02-01')).toMatch(/2026/);
    });
  });
});
