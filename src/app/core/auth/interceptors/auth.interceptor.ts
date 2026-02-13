import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AdminAuthService } from '../services/admin-auth.service';
import { environment } from '../../../../environments/environment';

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
        return authService.refreshToken().pipe(
          switchMap((response) => {
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${response.accessToken}` },
            });
            return next(retryReq);
          }),
          catchError((refreshError) => {
            authService.clearSession();
            return throwError(() => refreshError);
          }),
        );
      }
      return throwError(() => error);
    }),
  );
};
