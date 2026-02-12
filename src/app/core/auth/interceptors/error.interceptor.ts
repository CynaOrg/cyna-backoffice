import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifications = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        notifications.error('Unable to connect to server');
      } else if (error.status === 403) {
        notifications.error('Access denied');
      } else if (error.status === 500) {
        notifications.error('Server error. Please try again later.');
      } else if (error.status === 503) {
        notifications.error('Service temporarily unavailable');
      }
      return throwError(() => error);
    }),
  );
};
