import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, map, catchError, throwError, switchMap, of, timeout } from 'rxjs';
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

  /**
   * Fetch the freshly authenticated admin's profile from `GET /auth/admin/me`.
   * Updates the same admin signal that `verify2FA`/`refreshToken` populate so
   * the Account page can display server-authoritative `isActive`, `createdAt`
   * and `lastLoginAt` even when the cached JWT payload was missing them.
   */
  fetchMe(): Observable<Admin> {
    return this.http.get<ApiResponse<Admin>>(`${this.baseUrl}/me`).pipe(
      timeout(5000),
      map((r) => normalizeAdminTimestamps(r.data)),
      tap((admin) => this._admin.set(admin)),
    );
  }

  /**
   * Coerce empty-string timestamps (a defensive fallback if any legacy server
   * payload slips through with `""`) into `null` for `lastLoginAt` and
   * `undefined` for `createdAt`, so the Account page can branch cleanly
   * between "Never" and the em-dash placeholder.
   */
  // (helper kept module-private at the bottom of the file)
  tryRestoreSession(): Observable<AdminAuthResponse> {
    return this.refreshToken().pipe(
      switchMap((response) =>
        this.fetchMe().pipe(
          // Hydrate the session with the enriched profile, but don't fail the
          // restore if /me hiccups — the refresh-token payload is enough to
          // keep the admin logged in.
          catchError(() => of(null)),
          map(() => response),
        ),
      ),
    );
  }
}

function normalizeAdminTimestamps(admin: Admin): Admin {
  return {
    ...admin,
    createdAt: admin.createdAt === '' ? undefined : admin.createdAt,
    lastLoginAt: admin.lastLoginAt === '' ? null : admin.lastLoginAt,
  };
}
