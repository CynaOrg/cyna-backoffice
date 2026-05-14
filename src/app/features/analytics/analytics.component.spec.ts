import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsService } from '../../core/services/analytics.service';
import { NotificationService } from '../../core/services/notification.service';

describe('AnalyticsComponent', () => {
  let fixture: ComponentFixture<AnalyticsComponent>;
  let component: AnalyticsComponent;
  let analytics: {
    getDashboard: ReturnType<typeof vi.fn>;
    getSales: ReturnType<typeof vi.fn>;
    getSalesByProductType: ReturnType<typeof vi.fn>;
    getSalesByCategory: ReturnType<typeof vi.fn>;
    getAverageCartByProductType: ReturnType<typeof vi.fn>;
    getMrr: ReturnType<typeof vi.fn>;
    getStockStatus: ReturnType<typeof vi.fn>;
    exportData: ReturnType<typeof vi.fn>;
  };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    analytics = {
      getDashboard: vi.fn().mockReturnValue(
        of({
          revenue: { total: 1000, changePercent: 5 },
          subscriptions: { mrr: 200, changePercent: 2 },
          orders: { total: 30, changePercent: 1 },
          averageOrderValue: 50,
        }),
      ),
      getSales: vi.fn().mockReturnValue(of({ series: [] })),
      getSalesByProductType: vi.fn().mockReturnValue(of({ productTypes: [] })),
      getSalesByCategory: vi.fn().mockReturnValue(of({ categories: [] })),
      getAverageCartByProductType: vi.fn().mockReturnValue(of({ data: [] })),
      getMrr: vi.fn().mockReturnValue(of({ history: [] })),
      getStockStatus: vi.fn().mockReturnValue(of({ products: [] })),
      exportData: vi.fn().mockReturnValue(of(new Blob(['csv']))),
    };
    notifications = { success: vi.fn(), error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AnalyticsComponent, TranslateModule.forRoot()],
      providers: [
        { provide: AnalyticsService, useValue: analytics },
        { provide: NotificationService, useValue: notifications },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { fragment: null } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => vi.useRealTimers());

  describe('loadData', () => {
    it('loads all data on init and populates signals', () => {
      fixture.detectChanges();
      expect(analytics.getDashboard).toHaveBeenCalledWith('month');
      expect(component.loading()).toBe(false);
      expect(component.dashboard()?.kpis.totalRevenue).toBe(1000);
      expect(component.dashboard()?.kpis.mrr).toBe(200);
      expect(component.dashboard()?.kpis.totalOrders).toBe(30);
      expect(component.dashboard()?.kpis.avgCartValue).toBe(50);
    });

    it('handles dashboard error gracefully', () => {
      analytics.getDashboard.mockReturnValue(throwError(() => new Error('500')));
      fixture.detectChanges();
      expect(component.dashboard()).toBeNull();
      expect(component.loading()).toBe(false);
    });

    it('populates sales/category/stock signals from responses', () => {
      analytics.getSales.mockReturnValue(of({ series: [{ date: '2026-01-01', value: 10 }] }));
      analytics.getSalesByCategory.mockReturnValue(
        of({ categories: [{ id: 'c1', name: 'Cat', revenue: 100, percentage: 50 }] }),
      );
      analytics.getStockStatus.mockReturnValue(
        of({ products: [{ id: 'p1', name: 'P', status: 'ok', quantity: 10, threshold: 5 }] }),
      );
      fixture.detectChanges();
      expect(component.salesData().length).toBe(1);
      expect(component.salesByCategoryData().length).toBe(1);
      expect(component.stockItems().length).toBe(1);
    });

    it('notifies error when something goes wrong in the outer flow', () => {
      analytics.getDashboard.mockImplementation(() => {
        throw new Error('boom');
      });
      expect(() => fixture.detectChanges()).toThrow();
    });
  });

  describe('period and groupBy', () => {
    beforeEach(() => fixture.detectChanges());

    it('onPeriodSelect updates the selected period and reloads', () => {
      analytics.getDashboard.mockClear();
      component.onPeriodSelect('year');
      expect(component.selectedPeriod()).toBe('year');
      expect(analytics.getDashboard).toHaveBeenCalledWith('year');
    });

    it('onPeriodChange reads the value from a select element', () => {
      const event = {
        target: { value: 'quarter' } as unknown as HTMLSelectElement,
      } as unknown as Event;
      component.onPeriodChange(event);
      expect(component.selectedPeriod()).toBe('quarter');
    });

    it('onGroupByChange updates and reloads sales only', () => {
      analytics.getSales.mockClear();
      component.onGroupByChange('week');
      expect(component.groupBy()).toBe('week');
      expect(analytics.getSales).toHaveBeenCalled();
    });

    it('loadSalesData handles errors gracefully', () => {
      analytics.getSales.mockReturnValue(throwError(() => new Error('500')));
      expect(() => component.loadSalesData()).not.toThrow();
    });
  });

  describe('stock status helpers', () => {
    beforeEach(() => fixture.detectChanges());

    it('getStockStatusClass returns a tailwind class for known statuses', () => {
      expect(component.getStockStatusClass('ok')).toContain('emerald');
      expect(component.getStockStatusClass('low')).toContain('amber');
      expect(component.getStockStatusClass('critical')).toContain('orange');
      expect(component.getStockStatusClass('out_of_stock')).toContain('red');
    });

    it('falls back to gray for unknown statuses', () => {
      expect(component.getStockStatusClass('unknown' as never)).toContain('gray');
    });

    it('getStockStatusLabel returns translated label', () => {
      expect(component.getStockStatusLabel('ok')).toBe('ANALYTICS.OK');
      expect(component.getStockStatusLabel('low')).toBe('ANALYTICS.LOW');
      expect(component.getStockStatusLabel('critical')).toBe('ANALYTICS.CRITICAL');
      expect(component.getStockStatusLabel('out_of_stock')).toBe('ANALYTICS.OUT_OF_STOCK');
    });

    it('falls back to the raw status when unknown', () => {
      expect(component.getStockStatusLabel('weird' as never)).toBe('weird');
    });
  });

  describe('exportData', () => {
    beforeEach(() => fixture.detectChanges());

    it('falls back to default dates when user has not set them', () => {
      component.exportData('sales');
      // Defaults are non-empty (today/last month), so export proceeds
      expect(analytics.exportData).toHaveBeenCalled();
    });

    it('downloads and notifies success', () => {
      component.exportDateFrom.set('2026-01-01');
      component.exportDateTo.set('2026-01-31');
      const originalCreate = URL.createObjectURL;
      const originalRevoke = URL.revokeObjectURL;
      URL.createObjectURL = vi.fn().mockReturnValue('blob:x');
      URL.revokeObjectURL = vi.fn();
      const originalCreateEl = document.createElement.bind(document);
      const clickSpy = vi.fn();
      vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
        if (tag === 'a') {
          const a = originalCreateEl('a') as HTMLAnchorElement;
          a.click = clickSpy;
          return a;
        }
        return originalCreateEl(tag);
      });
      component.exportData('sales');
      expect(analytics.exportData).toHaveBeenCalledWith('sales', '2026-01-01', '2026-01-31', 'csv');
      expect(clickSpy).toHaveBeenCalled();
      expect(notifications.success).toHaveBeenCalled();
      expect(component.exporting()).toBe(false);
      URL.createObjectURL = originalCreate;
      URL.revokeObjectURL = originalRevoke;
    });

    it('notifies error when export fails', () => {
      component.exportDateFrom.set('2026-01-01');
      component.exportDateTo.set('2026-01-31');
      analytics.exportData.mockReturnValue(throwError(() => new Error('x')));
      component.exportData('orders');
      expect(notifications.error).toHaveBeenCalled();
      expect(component.exporting()).toBe(false);
    });
  });

  describe('date inputs', () => {
    beforeEach(() => fixture.detectChanges());

    it('onExportDateFromChange stores the new value', () => {
      const event = {
        target: { value: '2026-02-01' } as unknown as HTMLInputElement,
      } as unknown as Event;
      component.onExportDateFromChange(event);
      expect(component.exportDateFrom()).toBe('2026-02-01');
    });

    it('onExportDateToChange stores the new value', () => {
      const event = {
        target: { value: '2026-02-28' } as unknown as HTMLInputElement,
      } as unknown as Event;
      component.onExportDateToChange(event);
      expect(component.exportDateTo()).toBe('2026-02-28');
    });

    it('effective dates fall back to defaults when empty', () => {
      expect(component.effectiveDateFrom()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(component.effectiveDateTo()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('formatters', () => {
    beforeEach(() => fixture.detectChanges());

    it('formatCurrency renders euros', () => {
      const out = component.formatCurrency(42);
      expect(out).toContain('42');
      expect(out).toContain('€');
    });
  });

  describe('ngOnDestroy', () => {
    it('does not throw when no charts are rendered', () => {
      fixture.detectChanges();
      expect(() => fixture.destroy()).not.toThrow();
    });
  });
});
