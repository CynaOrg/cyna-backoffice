import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly toasts = signal<Toast[]>([]);

  success(_message: string, _duration = 3000) {}
  error(_message: string, _duration = 5000) {}
  warning(_message: string, _duration = 4000) {}
  info(_message: string, _duration = 3000) {}
  dismiss(_id: number) {}
}
