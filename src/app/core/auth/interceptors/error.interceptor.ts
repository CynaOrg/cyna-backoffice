import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

/**
 * Global HTTP error interceptor.
 *
 * Translates 4xx/5xx responses into user-facing toast notifications via
 * NotificationService. Stays silent on 401 (handled by authInterceptor's
 * refresh-token flow) and on the boot-time `/refresh-token` probe so the
 * unauthenticated app shell never shows a spurious error toast.
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);
  const translate = inject(TranslateService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = resolveMessage(req, error, translate);
      if (message !== null) {
        notifications.error(message);
      }
      return throwError(() => error);
    }),
  );
};

function resolveMessage(
  req: HttpRequest<unknown>,
  error: HttpErrorResponse,
  translate: TranslateService,
): string | null {
  const isRefreshToken = req.url.includes('/auth/admin/refresh-token');
  // Auth endpoints often return raw English messages (e.g. "Invalid credentials",
  // "Too many requests"). Prefer the localized i18n key over the server text.
  const isAuthEndpoint = /\/auth\/admin\/(login|verify-2fa|resend-2fa)/.test(req.url);
  // Server-supplied message (preferred when present and a string)
  const serverMessage = isAuthEndpoint ? null : extractServerMessage(error);

  switch (error.status) {
    case 0:
      // No connection / CORS preflight failure. Skip during the silent
      // refresh-token boot probe to avoid flashing a network toast on load.
      return isRefreshToken ? null : translate.instant('ERRORS.NETWORK');

    case 400:
      if (isAuthEndpoint) return translate.instant('ERRORS.AUTH_INVALID');
      return serverMessage ?? translate.instant('ERRORS.BAD_REQUEST');

    case 401:
      // Login returns 401 on bad creds; surface a localized message.
      if (isAuthEndpoint) return translate.instant('ERRORS.AUTH_INVALID');
      // Other 401s are handled by authInterceptor (refresh + redirect).
      return null;

    case 403:
      return translate.instant('ERRORS.FORBIDDEN');

    case 404: {
      if (isRefreshToken) return null;
      // Don't notify on collection lookups — empty results are expected.
      // Show on detail GET / PATCH / PUT / DELETE.
      const isCollectionGet = req.method === 'GET' && !hasResourceId(req.url);
      return isCollectionGet ? null : translate.instant('ERRORS.NOT_FOUND');
    }

    case 409:
      return serverMessage ?? translate.instant('ERRORS.CONFLICT');

    case 422:
      return serverMessage ?? translate.instant('ERRORS.VALIDATION');

    case 429:
      return translate.instant('ERRORS.TOO_MANY_REQUESTS');

    case 500:
    case 502:
      return translate.instant('ERRORS.SERVER');

    case 503:
    case 504:
      return translate.instant('ERRORS.SERVICE_UNAVAILABLE');

    default:
      // Unknown status — still surface something rather than swallow.
      if (error.status >= 500) return translate.instant('ERRORS.SERVER');
      if (error.status >= 400) return serverMessage ?? translate.instant('ERRORS.GENERIC');
      return null;
  }
}

function extractServerMessage(error: HttpErrorResponse): string | null {
  const body = error.error as unknown;
  if (body && typeof body === 'object' && 'message' in body) {
    const message = (body as { message: unknown }).message;
    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
    if (Array.isArray(message) && message.length > 0 && typeof message[0] === 'string') {
      return message.join(', ');
    }
  }
  return null;
}

/**
 * Heuristic: a request URL targets a single resource (rather than a collection)
 * when its last path segment looks like a UUID, numeric id, or is preceded by a
 * known sub-resource path that always operates on one entity.
 */
function hasResourceId(url: string): boolean {
  const path = url.split('?')[0];
  const segments = path.split('/').filter(Boolean);
  const last = segments[segments.length - 1] ?? '';
  // UUID v1-v5
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(last)) {
    return true;
  }
  // Numeric id
  if (/^\d+$/.test(last)) return true;
  return false;
}
