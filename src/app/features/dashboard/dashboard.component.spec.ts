import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { AdminAuthService } from '../../core/auth/services/admin-auth.service';
import { ApiService } from '../../core/services/api.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ContentService } from '../../core/services/content.service';
import { NotificationService } from '../../core/services/notification.service';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let analytics: {
    getDashboard: ReturnType<typeof vi.fn>;
    getStockStatus: ReturnType<typeof vi.fn>;
  };
  let content: { getContactMessages: ReturnType<typeof vi.fn> };
  let api: { getRaw: ReturnType<typeof vi.fn> };
  let notifications: { error: ReturnType<typeof vi.fn> };

  async function setup(opts: { isSuperAdmin?: boolean; isCommercial?: boolean } = {}) {
    analytics = {
      getDashboard: vi.fn(),
      getStockStatus: vi.fn().mockReturnValue(of({ summary: { lowStock: 0, outOfStock: 0 } })),
    };
    content = { getContactMessages: vi.fn().mockReturnValue(of([])) };
    api = { getRaw: vi.fn().mockReturnValue(of({ data: [] })) };
    notifications = { error: vi.fn() };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        {
          provide: AdminAuthService,
          useValue: {
            admin: () => ({ firstName: 'Alice' }),
            isCommercial: () => opts.isCommercial ?? false,
            isSuperAdmin: () => opts.isSuperAdmin ?? true,
          },
        },
        { provide: AnalyticsService, useValue: analytics },
        { provide: ContentService, useValue: content },
        { provide: ApiService, useValue: api },
        { provide: NotificationService, useValue: notifications },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  }

  describe('loadDashboard', () => {
    it('builds a view model with KPIs and recent orders', async () => {
      await setup();
      analytics.getDashboard.mockReturnValue(
        of({
          revenue: { total: 50000, changePercent: 12 },
          subscriptions: { mrr: 2000, changePercent: 5, active: 30 },
          orders: { total: 100, changePercent: 8 },
          averageOrderValue: 250,
        }),
      );
      api.getRaw.mockReturnValue(
        of({
          data: [
            {
              id: 'o1',
              orderNumber: 'CYNA-1',
              status: 'paid',
              total: '99.5',
              createdAt: '2026-01-01',
            },
          ],
        }),
      );

      fixture.detectChanges();

      expect(component.loading()).toBe(false);
      const vm = component.data();
      expect(vm?.kpis.totalRevenue).toBe(50000);
      expect(vm?.kpis.activeSubscriptions).toBe(30);
      expect(vm?.recentOrders.length).toBe(1);
      expect(vm?.recentOrders[0].total).toBe(99.5);
    });

    it('zeros out avgCart for non-commercial admins', async () => {
      await setup({ isCommercial: false });
      analytics.getDashboard.mockReturnValue(
        of({
          revenue: { total: 0 },
          subscriptions: {},
          orders: {},
          averageOrderValue: 250,
        }),
      );
      fixture.detectChanges();
      expect(component.data()?.kpis.avgCartValue).toBe(0);
    });

    it('populates avgCart for commercial admins', async () => {
      await setup({ isCommercial: true });
      analytics.getDashboard.mockReturnValue(
        of({
          revenue: { total: 0 },
          subscriptions: {},
          orders: {},
          averageOrderValue: 250,
        }),
      );
      fixture.detectChanges();
      expect(component.data()?.kpis.avgCartValue).toBe(250);
    });

    it('handles a bare array of recent orders', async () => {
      await setup();
      analytics.getDashboard.mockReturnValue(of({ revenue: {}, subscriptions: {}, orders: {} }));
      api.getRaw.mockReturnValue(
        of([{ id: 'o1', orderNumber: 'CYNA-1', status: 'paid', total: 10, createdAt: 'x' }]),
      );
      fixture.detectChanges();
      expect(component.data()?.recentOrders.length).toBe(1);
    });

    it('shows error toast on analytics/orders failure', async () => {
      await setup();
      analytics.getDashboard.mockReturnValue(throwError(() => new Error('500')));
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.loading()).toBe(false);
    });

    it('loads stock count from analytics', async () => {
      await setup();
      analytics.getDashboard.mockReturnValue(of({ revenue: {}, subscriptions: {}, orders: {} }));
      analytics.getStockStatus.mockReturnValue(of({ summary: { lowStock: 3, outOfStock: 2 } }));
      fixture.detectChanges();
      expect(component.lowStockCount()).toBe(5);
    });

    it('swallows stock errors silently', async () => {
      await setup();
      analytics.getDashboard.mockReturnValue(of({ revenue: {}, subscriptions: {}, orders: {} }));
      analytics.getStockStatus.mockReturnValue(throwError(() => new Error('500')));
      fixture.detectChanges();
      expect(component.lowStockCount()).toBe(0);
    });

    it('loads unread messages for super admins', async () => {
      await setup({ isSuperAdmin: true });
      analytics.getDashboard.mockReturnValue(of({ revenue: {}, subscriptions: {}, orders: {} }));
      content.getContactMessages.mockReturnValue(
        of([{ isRead: false }, { isRead: true }, { isRead: false }]),
      );
      fixture.detectChanges();
      expect(component.unreadMessages()).toBe(2);
    });

    it('skips loading unread messages for non super admins', async () => {
      await setup({ isSuperAdmin: false });
      analytics.getDashboard.mockReturnValue(of({ revenue: {}, subscriptions: {}, orders: {} }));
      fixture.detectChanges();
      expect(content.getContactMessages).not.toHaveBeenCalled();
    });

    it('swallows unread message errors silently', async () => {
      await setup({ isSuperAdmin: true });
      analytics.getDashboard.mockReturnValue(of({ revenue: {}, subscriptions: {}, orders: {} }));
      content.getContactMessages.mockReturnValue(throwError(() => new Error('boom')));
      fixture.detectChanges();
      expect(component.unreadMessages()).toBe(0);
    });
  });

  describe('computed signals', () => {
    beforeEach(async () => {
      await setup();
      analytics.getDashboard.mockReturnValue(
        of({ revenue: { total: 25000 }, subscriptions: {}, orders: {} }),
      );
      fixture.detectChanges();
    });

    it('adminFirstName uses the admin firstName', () => {
      expect(component.adminFirstName()).toBe('Alice');
    });
  });

  describe('formatters', () => {
    beforeEach(async () => {
      await setup();
      analytics.getDashboard.mockReturnValue(of({ revenue: {}, subscriptions: {}, orders: {} }));
      fixture.detectChanges();
    });

    it('formatCurrency renders EUR', () => {
      expect(component.formatCurrency(50)).toContain('€');
    });

    it('formatDate produces a French date', () => {
      expect(component.formatDate('2026-01-15')).toMatch(/2026/);
    });
  });
});
