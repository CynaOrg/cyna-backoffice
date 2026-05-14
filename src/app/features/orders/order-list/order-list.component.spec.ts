import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { OrderListComponent } from './order-list.component';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Order } from '../../../core/models/order.model';

describe('OrderListComponent', () => {
  let fixture: ComponentFixture<OrderListComponent>;
  let component: OrderListComponent;
  let api: { getRaw: ReturnType<typeof vi.fn> };
  let notifications: { error: ReturnType<typeof vi.fn> };

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
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
      ...over,
    };
  }

  beforeEach(async () => {
    vi.useFakeTimers();
    api = { getRaw: vi.fn().mockReturnValue(of({ data: [], pagination: { total: 0 } })) };
    notifications = { error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [OrderListComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: ApiService, useValue: api },
        { provide: NotificationService, useValue: notifications },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => vi.useRealTimers());

  describe('loadOrders', () => {
    it('loads orders on init and stores data + total', () => {
      const orders = [makeOrder()];
      api.getRaw.mockReturnValue(of({ data: orders, pagination: { total: 42 } }));
      fixture.detectChanges();
      expect(component.orders()).toEqual(orders);
      expect(component.total()).toBe(42);
      expect(component.loading()).toBe(false);
    });

    it('falls back to total field then items length when pagination is missing', () => {
      api.getRaw.mockReturnValue(of({ data: [makeOrder(), makeOrder({ id: 'o2' })], total: 7 }));
      fixture.detectChanges();
      expect(component.total()).toBe(7);
    });

    it('handles a bare array response', () => {
      api.getRaw.mockReturnValue(of([makeOrder()]));
      fixture.detectChanges();
      expect(component.total()).toBe(1);
    });

    it('shows an error toast and clears loading on failure', () => {
      api.getRaw.mockReturnValue(throwError(() => new Error('500')));
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.loading()).toBe(false);
    });

    it('forwards search/status/date/type filters in the params', () => {
      fixture.detectChanges();
      api.getRaw.mockClear();
      component.search = 'q';
      component.statusFilter = 'paid';
      component.dateFrom = '2026-01-01';
      component.dateTo = '2026-01-31';
      component.typeFilter = 'saas';
      component.loadOrders();
      const params = api.getRaw.mock.calls[0][1] as Record<string, unknown>;
      expect(params).toMatchObject({
        search: 'q',
        status: 'paid',
        dateFrom: '2026-01-01',
        dateTo: '2026-01-31',
        orderType: 'saas',
      });
    });
  });

  describe('onSearchChange', () => {
    it('debounces and resets to page 1 before reloading', () => {
      fixture.detectChanges();
      api.getRaw.mockClear();
      component.page.set(3);
      component.onSearchChange('hello');
      vi.advanceTimersByTime(310);
      expect(component.page()).toBe(1);
      expect(api.getRaw).toHaveBeenCalled();
    });
  });

  describe('onPageChange', () => {
    it('sets the page and reloads', () => {
      fixture.detectChanges();
      api.getRaw.mockClear();
      component.onPageChange(5);
      expect(component.page()).toBe(5);
      expect(api.getRaw).toHaveBeenCalled();
    });
  });

  describe('helpers', () => {
    beforeEach(() => fixture.detectChanges());

    it('formatCurrency renders euros', () => {
      const formatted = component.formatCurrency(100);
      expect(formatted).toContain('100');
      expect(formatted).toContain('€');
    });

    it('formatDate produces a French date string', () => {
      expect(component.formatDate('2026-01-15T00:00:00Z')).toMatch(/2026/);
    });

    describe('customerLabel', () => {
      it('prefers customerEmail', () => {
        expect(
          component.customerLabel(makeOrder({ customerEmail: 'a@b.com', guestEmail: 'g@b.com' })),
        ).toBe('a@b.com');
      });

      it('falls back to guestEmail', () => {
        expect(component.customerLabel(makeOrder({ guestEmail: 'g@b.com' }))).toBe('g@b.com');
      });

      it('falls back to a truncated userId', () => {
        expect(component.customerLabel(makeOrder({ userId: '12345678-aaaa-bbbb-cccc' }))).toBe(
          '12345678',
        );
      });

      it('falls back to ORDERS.GUEST otherwise', () => {
        expect(component.customerLabel(makeOrder())).toBe('ORDERS.GUEST');
      });
    });

    describe('orderTypeLabel', () => {
      it.each([
        ['saas', 'ORDERS.TYPE_SAAS'],
        ['physical', 'ORDERS.TYPE_PHYSICAL'],
        ['license', 'ORDERS.TYPE_LICENSE'],
        ['mixed', 'ORDERS.TYPE_MIXED'],
        ['', ''],
        [undefined, ''],
      ])('%s -> %s', (input, expected) => {
        expect(component.orderTypeLabel(input as string | undefined)).toBe(expected);
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('completes its internal subjects without throwing', () => {
      fixture.detectChanges();
      expect(() => fixture.destroy()).not.toThrow();
    });
  });
});
