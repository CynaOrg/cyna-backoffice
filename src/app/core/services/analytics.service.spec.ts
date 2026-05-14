import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AnalyticsService } from './analytics.service';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

describe('AnalyticsService', () => {
  let service: AnalyticsService;
  let api: { get: ReturnType<typeof vi.fn> };
  let httpMock: HttpTestingController;

  beforeEach(() => {
    api = { get: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: ApiService, useValue: api },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AnalyticsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('getDashboard()', () => {
    it('omits the period param when not provided', () => {
      api.get.mockReturnValue(of({}));
      service.getDashboard().subscribe();
      expect(api.get).toHaveBeenCalledWith('admin/analytics/dashboard', undefined);
    });

    it('forwards the period param when provided', () => {
      api.get.mockReturnValue(of({}));
      service.getDashboard('7d').subscribe();
      expect(api.get).toHaveBeenCalledWith('admin/analytics/dashboard', { period: '7d' });
    });
  });

  describe('getSales()', () => {
    it('passes only the params that are set', () => {
      api.get.mockReturnValue(of({}));
      service.getSales('30d', 'day').subscribe();
      expect(api.get).toHaveBeenCalledWith('admin/analytics/sales', {
        period: '30d',
        groupBy: 'day',
      });
    });

    it('sends an empty params object when neither is provided', () => {
      api.get.mockReturnValue(of({}));
      service.getSales().subscribe();
      expect(api.get).toHaveBeenCalledWith('admin/analytics/sales', {});
    });
  });

  describe('getSalesByCategory()', () => {
    it('forwards period when provided', () => {
      api.get.mockReturnValue(of({}));
      service.getSalesByCategory('30d').subscribe();
      expect(api.get).toHaveBeenCalledWith('admin/analytics/sales-by-category', { period: '30d' });
    });
  });

  describe('getAverageCartByProductType()', () => {
    it('hits the right endpoint', () => {
      api.get.mockReturnValue(of({}));
      service.getAverageCartByProductType().subscribe();
      expect(api.get).toHaveBeenCalledWith(
        'admin/analytics/average-cart-by-product-type',
        undefined,
      );
    });
  });

  describe('getSalesByProductType()', () => {
    it('hits the right endpoint', () => {
      api.get.mockReturnValue(of({}));
      service.getSalesByProductType('7d').subscribe();
      expect(api.get).toHaveBeenCalledWith('admin/analytics/sales-by-product-type', {
        period: '7d',
      });
    });
  });

  describe('getAverageCart()', () => {
    it('hits the right endpoint', () => {
      api.get.mockReturnValue(of({}));
      service.getAverageCart().subscribe();
      expect(api.get).toHaveBeenCalledWith('admin/analytics/average-cart', undefined);
    });
  });

  describe('getMrr()', () => {
    it('hits the MRR endpoint', () => {
      api.get.mockReturnValue(of({}));
      service.getMrr().subscribe();
      expect(api.get).toHaveBeenCalledWith('admin/analytics/mrr');
    });
  });

  describe('getStockStatus()', () => {
    it('hits the stock endpoint', () => {
      api.get.mockReturnValue(of({}));
      service.getStockStatus().subscribe();
      expect(api.get).toHaveBeenCalledWith('admin/analytics/stock');
    });
  });

  describe('exportData()', () => {
    it('GETs the export endpoint with date range and blob response type', () => {
      let blob: Blob | undefined;
      service.exportData('sales', '2026-01-01', '2026-01-31', 'xlsx').subscribe((b) => (blob = b));

      const req = httpMock.expectOne(
        (r) =>
          r.url === `${environment.apiUrl}/admin/analytics/export/sales` &&
          r.params.get('dateFrom') === '2026-01-01',
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('dateTo')).toBe('2026-01-31');
      expect(req.request.params.get('format')).toBe('xlsx');
      expect(req.request.responseType).toBe('blob');

      const payload = new Blob(['csv,data'], { type: 'text/csv' });
      req.flush(payload);

      expect(blob).toBeTruthy();
    });

    it('defaults format to csv', () => {
      service.exportData('orders', '2026-01-01', '2026-01-31').subscribe();
      const req = httpMock.expectOne(
        (r) => r.url === `${environment.apiUrl}/admin/analytics/export/orders`,
      );
      expect(req.request.params.get('format')).toBe('csv');
      req.flush(new Blob());
    });
  });
});
