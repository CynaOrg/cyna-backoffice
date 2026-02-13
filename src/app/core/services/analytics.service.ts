import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
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

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly api = inject(ApiService);
  private readonly http = inject(HttpClient);
  private readonly basePath = 'admin/analytics';

  getDashboard(period?: string): Observable<DashboardData> {
    const params = period ? { period } : undefined;
    return this.api.get<DashboardData>(`${this.basePath}/dashboard`, params);
  }

  getSales(period?: string, groupBy?: string): Observable<{ sales: SalesDataPoint[] }> {
    const params: Record<string, string> = {};
    if (period) params['period'] = period;
    if (groupBy) params['groupBy'] = groupBy;
    return this.api.get<{ sales: SalesDataPoint[] }>(`${this.basePath}/sales`, params);
  }

  getSalesByCategory(period?: string): Observable<{ data: SalesByCategoryData[] }> {
    const params = period ? { period } : undefined;
    return this.api.get<{ data: SalesByCategoryData[] }>(
      `${this.basePath}/sales-by-category`,
      params,
    );
  }

  getSalesByProductType(period?: string): Observable<{ data: SalesByProductTypeData[] }> {
    const params = period ? { period } : undefined;
    return this.api.get<{ data: SalesByProductTypeData[] }>(
      `${this.basePath}/sales-by-product-type`,
      params,
    );
  }

  getTopProducts(period?: string): Observable<{ data: TopProductData[] }> {
    const params = period ? { period } : undefined;
    return this.api.get<{ data: TopProductData[] }>(`${this.basePath}/top-products`, params);
  }

  getAverageCart(period?: string): Observable<{ avgCart: number; history: SalesDataPoint[] }> {
    const params = period ? { period } : undefined;
    return this.api.get<{ avgCart: number; history: SalesDataPoint[] }>(
      `${this.basePath}/average-cart`,
      params,
    );
  }

  getMrr(): Observable<{ current: number; history: MrrDataPoint[] }> {
    return this.api.get<{ current: number; history: MrrDataPoint[] }>(`${this.basePath}/mrr`);
  }

  getStockStatus(): Observable<StockStatusResponse> {
    return this.api.get<StockStatusResponse>(`${this.basePath}/stock`);
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
