import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { environment } from '../../../../environments/environment';

/**
 * Module-scoped state for single-flight refresh (TRA-5).
 *
 * When N concurrent requests fail with 401 we must NOT trigger N independent
 * `/refresh-token` calls — that races on the rotating refresh cookie and
 * causes spurious logouts. Instead, the first 401 starts a refresh; concurrent
 * 401s wait on the BehaviorSubject and replay with the new access token once
 * the refresh resolves. The BehaviorSubject also acts as the "current token"
 * cache so late subscribers don't deadlock.
 */
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AdminAuthService);
  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const isAuthEndpoint =
    req.url.includes('/auth/admin/login') ||
    req.url.includes('/auth/admin/verify-2fa') ||
    req.url.includes('/auth/admin/resend-2fa') ||
    req.url.includes('/auth/admin/refresh-token');

  if (!isApiRequest) {
    return next(req);
  }

  const token = authService.accessToken();
  let authReq = req.clone({ withCredentials: true });
  if (token && !isAuthEndpoint) {
    authReq = req.clone({
      withCredentials: true,
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isAuthEndpoint && token) {
        return handle401(req, authService, next);
      }
      return throwError(() => error);
    }),
  );
};

function handle401(
  req: HttpRequest<unknown>,
  authService: AdminAuthService,
  next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>,
): Observable<HttpEvent<unknown>> {
  if (isRefreshing) {
    // Another request already kicked off a refresh — queue up and replay
    // ourselves with the new token once it lands.
    return refreshTokenSubject.pipe(
      filter((t): t is string => t !== null),
      take(1),
      switchMap((newToken) =>
        next(req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } })),
      ),
    );
  }

  isRefreshing = true;
  refreshTokenSubject.next(null);

  return authService.refreshToken().pipe(
    switchMap((response) => {
      isRefreshing = false;
      refreshTokenSubject.next(response.accessToken);
      const retryReq = req.clone({
        setHeaders: { Authorization: `Bearer ${response.accessToken}` },
      });
      return next(retryReq);
    }),
    catchError((refreshError) => {
      isRefreshing = false;
      // Push null so any waiters short-circuit on the subsequent 401 instead
      // of hanging forever; clearSession() drops the access token entirely.
      refreshTokenSubject.next(null);
      authService.clearSession();
      return throwError(() => refreshError);
    }),
  );
}
