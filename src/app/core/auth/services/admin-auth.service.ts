import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Admin, AdminLoginResponse, AdminAuthResponse } from '../../models/admin.model';

interface ApiResponse<T> {
  data: T;
  meta?: { timestamp: string; requestId: string };
}

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly baseUrl = `${environment.apiUrl}/auth/admin`;

  private readonly _admin = signal<Admin | null>(null);
  private readonly _accessToken = signal<string | null>(null);
  private readonly _tempToken = signal<string | null>(null);

  readonly admin = this._admin.asReadonly();
  readonly accessToken = this._accessToken.asReadonly();
  readonly tempToken = this._tempToken.asReadonly();
  readonly isAuthenticated = computed(() => !!this._accessToken());
  readonly isSuperAdmin = computed(() => this._admin()?.role === 'super_admin');
  readonly isCommercial = computed(() => this._admin()?.role === 'commercial');

  login(email: string, password: string): Observable<AdminLoginResponse> {
    return this.http
      .post<ApiResponse<AdminLoginResponse>>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map((r) => r.data),
        tap((response) => {
          if (response.requires2FA) {
            this._tempToken.set(response.tempToken);
          }
        }),
      );
  }

  verify2FA(code: string): Observable<AdminAuthResponse> {
    const tempToken = this._tempToken();
    return this.http
      .post<ApiResponse<AdminAuthResponse>>(`${this.baseUrl}/verify-2fa`, { tempToken, code })
      .pipe(
        map((r) => r.data),
        tap((response) => {
          this._accessToken.set(response.accessToken);
          this._admin.set(response.admin);
          this._tempToken.set(null);
        }),
      );
  }

  resend2FA(): Observable<AdminLoginResponse> {
    const tempToken = this._tempToken();
    return this.http
      .post<ApiResponse<AdminLoginResponse>>(`${this.baseUrl}/resend-2fa`, { tempToken })
      .pipe(
        map((r) => r.data),
        tap((response) => {
          this._tempToken.set(response.tempToken);
        }),
      );
  }

  refreshToken(): Observable<AdminAuthResponse> {
    return this.http
      .post<
        ApiResponse<AdminAuthResponse>
      >(`${this.baseUrl}/refresh-token`, {}, { withCredentials: true })
      .pipe(
        map((r) => r.data),
        tap((response) => {
          this._accessToken.set(response.accessToken);
          this._admin.set(response.admin);
        }),
        catchError((err) => {
          this.clearSession();
          return throwError(() => err);
        }),
      );
  }

  logout(): void {
    const token = this._accessToken();
    if (token) {
      this.http
        .post(`${this.baseUrl}/logout`, {}, { withCredentials: true })
        .subscribe({ error: () => {} });
    }
    this.clearSession();
    this.router.navigate(['/login']);
  }

  clearSession(): void {
    this._accessToken.set(null);
    this._admin.set(null);
    this._tempToken.set(null);
  }

  tryRestoreSession(): Observable<AdminAuthResponse> {
    return this.refreshToken();
  }
}
