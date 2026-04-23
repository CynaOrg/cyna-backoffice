import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';
import { environment } from '../../../environments/environment';
import {
  DashboardData,
  StockStatusResponse,
  SalesDataPoint,
  SalesByCategoryData,
  SalesByProductTypeData,
  MrrDataPoint,
  TopProductData,
} from '../models/analytics.model';

const CACHE_TTL = 2 * 60_000; // 2 minutes

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly api = inject(ApiService);
  private readonly http = inject(HttpClient);
  private readonly cache = inject(CacheService);
  private readonly basePath = 'admin/analytics';

  getDashboard(period?: string): Observable<DashboardData> {
    const key = `analytics:dashboard:${period || 'default'}`;
    const params = period ? { period } : undefined;
    return this.cache.get(
      key,
      () => this.api.get<DashboardData>(`${this.basePath}/dashboard`, params),
      CACHE_TTL,
    );
  }

  getSales(period?: string, groupBy?: string): Observable<{ sales: SalesDataPoint[] }> {
    const key = `analytics:sales:${period || 'default'}:${groupBy || 'default'}`;
    const params: Record<string, string> = {};
    if (period) params['period'] = period;
    if (groupBy) params['groupBy'] = groupBy;
    return this.cache.get(
      key,
      () => this.api.get<{ sales: SalesDataPoint[] }>(`${this.basePath}/sales`, params),
      CACHE_TTL,
    );
  }

  getSalesByCategory(period?: string): Observable<{ data: SalesByCategoryData[] }> {
    const key = `analytics:sales-by-category:${period || 'default'}`;
    const params = period ? { period } : undefined;
    return this.cache.get(
      key,
      () =>
        this.api.get<{ data: SalesByCategoryData[] }>(`${this.basePath}/sales-by-category`, params),
      CACHE_TTL,
    );
  }

  getSalesByProductType(period?: string): Observable<{ data: SalesByProductTypeData[] }> {
    const key = `analytics:sales-by-product-type:${period || 'default'}`;
    const params = period ? { period } : undefined;
    return this.cache.get(
      key,
      () =>
        this.api.get<{ data: SalesByProductTypeData[] }>(
          `${this.basePath}/sales-by-product-type`,
          params,
        ),
      CACHE_TTL,
    );
  }

  getTopProducts(period?: string): Observable<{ data: TopProductData[] }> {
    const key = `analytics:top-products:${period || 'default'}`;
    const params = period ? { period } : undefined;
    return this.cache.get(
      key,
      () => this.api.get<{ data: TopProductData[] }>(`${this.basePath}/top-products`, params),
      CACHE_TTL,
    );
  }

  getAverageCart(period?: string): Observable<{ avgCart: number; history: SalesDataPoint[] }> {
    const key = `analytics:average-cart:${period || 'default'}`;
    const params = period ? { period } : undefined;
    return this.cache.get(
      key,
      () =>
        this.api.get<{ avgCart: number; history: SalesDataPoint[] }>(
          `${this.basePath}/average-cart`,
          params,
        ),
      CACHE_TTL,
    );
  }

  getMrr(): Observable<{ current: number; history: MrrDataPoint[] }> {
    return this.cache.get(
      'analytics:mrr',
      () => this.api.get<{ current: number; history: MrrDataPoint[] }>(`${this.basePath}/mrr`),
      CACHE_TTL,
    );
  }

  getStockStatus(): Observable<StockStatusResponse> {
    return this.cache.get(
      'analytics:stock',
      () => this.api.get<StockStatusResponse>(`${this.basePath}/stock`),
      CACHE_TTL,
    );
  }

  exportData(
    type: 'sales' | 'orders' | 'subscriptions',
    dateFrom: string,
    dateTo: string,
    format: 'csv' | 'xlsx' = 'csv',
  ): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/${this.basePath}/export/${type}`, {
      params: { dateFrom, dateTo, format },
      responseType: 'blob',
    });
  }
}
