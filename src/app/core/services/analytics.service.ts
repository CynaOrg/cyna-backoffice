import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import {
  DashboardData,
  StockStatusResponse,
  SalesResponse,
  SalesByCategoryResponse,
  SalesByProductTypeData,
  MrrResponse,
  AverageCartResponse,
  AverageCartByTypeResponse,
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

  getSales(period?: string, groupBy?: string): Observable<SalesResponse> {
    const params: Record<string, string> = {};
    if (period) params['period'] = period;
    if (groupBy) params['groupBy'] = groupBy;
    return this.api.get<SalesResponse>(`${this.basePath}/sales`, params);
  }

  getSalesByCategory(period?: string): Observable<SalesByCategoryResponse> {
    const params = period ? { period } : undefined;
    return this.api.get<SalesByCategoryResponse>(`${this.basePath}/sales-by-category`, params);
  }

  getAverageCartByProductType(period?: string): Observable<AverageCartByTypeResponse> {
    const params = period ? { period } : undefined;
    return this.api.get<AverageCartByTypeResponse>(
      `${this.basePath}/average-cart-by-product-type`,
      params,
    );
  }

  getSalesByProductType(
    period?: string,
  ): Observable<{ period: string; productTypes: SalesByProductTypeData[] }> {
    const params = period ? { period } : undefined;
    return this.api.get<{ period: string; productTypes: SalesByProductTypeData[] }>(
      `${this.basePath}/sales-by-product-type`,
      params,
    );
  }

  getAverageCart(period?: string): Observable<AverageCartResponse> {
    const params = period ? { period } : undefined;
    return this.api.get<AverageCartResponse>(`${this.basePath}/average-cart`, params);
  }

  getMrr(): Observable<MrrResponse> {
    return this.api.get<MrrResponse>(`${this.basePath}/mrr`);
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
