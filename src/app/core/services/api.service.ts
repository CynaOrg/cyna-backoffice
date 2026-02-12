import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

interface ApiResponse<T> {
  data: T;
  meta?: { timestamp: string; requestId: string };
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  get<T>(path: string, params?: Record<string, string | number | boolean>): Observable<T> {
    return this.http
      .get<ApiResponse<T>>(`${this.baseUrl}/${path}`, { params: this.buildParams(params) })
      .pipe(map((r) => r.data));
  }

  getRaw<T>(path: string, params?: Record<string, string | number | boolean>): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${path}`, { params: this.buildParams(params) });
  }

  getList<T>(path: string, params?: Record<string, string | number | boolean>): Observable<T[]> {
    return this.http
      .get<ApiResponse<T[]>>(`${this.baseUrl}/${path}`, { params: this.buildParams(params) })
      .pipe(map((r) => r.data));
  }

  getPaginated<T>(
    path: string,
    params?: Record<string, string | number | boolean>,
  ): Observable<PaginatedResponse<T>> {
    return this.http.get<PaginatedResponse<T>>(`${this.baseUrl}/${path}`, {
      params: this.buildParams(params),
    });
  }

  post<TBody, TResponse>(path: string, body: TBody): Observable<TResponse> {
    return this.http
      .post<ApiResponse<TResponse>>(`${this.baseUrl}/${path}`, body)
      .pipe(map((r) => r.data));
  }

  postRaw<TBody, TResponse>(path: string, body: TBody): Observable<TResponse> {
    return this.http.post<TResponse>(`${this.baseUrl}/${path}`, body);
  }

  patch<TBody, TResponse>(path: string, body: TBody): Observable<TResponse> {
    return this.http
      .patch<ApiResponse<TResponse>>(`${this.baseUrl}/${path}`, body)
      .pipe(map((r) => r.data));
  }

  patchRaw<TBody, TResponse>(path: string, body: TBody): Observable<TResponse> {
    return this.http.patch<TResponse>(`${this.baseUrl}/${path}`, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(`${this.baseUrl}/${path}`).pipe(map((r) => r.data));
  }

  private buildParams(params?: Record<string, string | number | boolean>): HttpParams {
    let httpParams = new HttpParams();
    if (!params) return httpParams;
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    }
    return httpParams;
  }
}
