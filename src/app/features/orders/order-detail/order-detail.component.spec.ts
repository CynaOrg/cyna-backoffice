import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { OrderDetailComponent } from './order-detail.component';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Order } from '../../../core/models/order.model';

describe('OrderDetailComponent', () => {
  let fixture: ComponentFixture<OrderDetailComponent>;
  let component: OrderDetailComponent;
  let api: { get: ReturnType<typeof vi.fn>; patch: ReturnType<typeof vi.fn> };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };
  let routerSpy: ReturnType<typeof vi.spyOn>;

  function makeOrder(over: Partial<Order> = {}): Order {
    return {
      id: 'o1',
      orderNumber: 'CYNA-1',
      status: 'paid',
      orderType: 'saas',
      subtotal: 0,
      taxAmount: 0,
      shippingAmount: 0,
      discountAmount: 0,
      total: 100,
      currency: 'EUR',
      billingAddressSnapshot: {},
      items: [],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
      ...over,
    };
  }

  async function setup(routeId: string | null = 'o1') {
    api = { get: vi.fn(), patch: vi.fn() };
    notifications = { success: vi.fn(), error: vi.fn() };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [OrderDetailComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => routeId } } } },
        { provide: ApiService, useValue: api },
        { provide: NotificationService, useValue: notifications },
        { provide: AdminAuthService, useValue: { isSuperAdmin: () => true } },
      ],
    }).compileComponents();

    routerSpy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
  }

  it('does nothing when route id is missing', async () => {
    await setup(null);
    fixture.detectChanges();
    expect(api.get).not.toHaveBeenCalled();
  });

  describe('loadOrder', () => {
    it('stores order data and pre-fills the form on success', async () => {
      await setup();
      api.get.mockReturnValue(
        of(
          makeOrder({
            status: 'shipped',
            trackingNumber: 'T1',
            trackingUrl: 'http://t',
            notes: 'n',
          }),
        ),
      );
      fixture.detectChanges();
      expect(component.order()?.id).toBe('o1');
      expect(component.newStatus()).toBe('shipped');
      expect(component.trackingNumber()).toBe('T1');
      expect(component.trackingUrl()).toBe('http://t');
      expect(component.notes()).toBe('n');
      expect(component.loading()).toBe(false);
    });

    it('defaults tracking fields to empty strings when absent', async () => {
      await setup();
      api.get.mockReturnValue(of(makeOrder()));
      fixture.detectChanges();
      expect(component.trackingNumber()).toBe('');
      expect(component.trackingUrl()).toBe('');
      expect(component.notes()).toBe('');
    });

    it('redirects to /orders on error', async () => {
      await setup();
      api.get.mockReturnValue(throwError(() => new Error('404')));
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledWith(['/orders']);
    });
  });

  describe('updateStatus', () => {
    beforeEach(async () => {
      await setup();
      api.get.mockReturnValue(of(makeOrder()));
      fixture.detectChanges();
    });

    it('no-ops when there is no order', () => {
      component.order.set(null);
      component.updateStatus();
      expect(api.patch).not.toHaveBeenCalled();
    });

    it('trims tracking/notes and PATCHes status', () => {
      api.patch.mockReturnValue(of(makeOrder({ status: 'shipped' })));
      component.newStatus.set('shipped');
      component.trackingNumber.set('  T1  ');
      component.trackingUrl.set('  http://t  ');
      component.notes.set('  hello  ');
      component.updateStatus();
      expect(api.patch).toHaveBeenCalledWith('admin/orders/o1/status', {
        status: 'shipped',
        trackingNumber: 'T1',
        trackingUrl: 'http://t',
        notes: 'hello',
      });
      expect(notifications.success).toHaveBeenCalled();
      expect(component.updating()).toBe(false);
    });

    it('shows error toast on failure', () => {
      api.patch.mockReturnValue(throwError(() => new Error('500')));
      component.updateStatus();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.updating()).toBe(false);
    });
  });

  describe('formatters', () => {
    beforeEach(async () => {
      await setup();
      api.get.mockReturnValue(of(makeOrder()));
      fixture.detectChanges();
    });

    it('formatCurrency renders EUR', () => {
      expect(component.formatCurrency(20)).toContain('€');
    });

    it('formatDate produces a French date string', () => {
      expect(component.formatDate('2026-02-01')).toMatch(/2026/);
    });
  });
});
