import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private nextId = 0;
  readonly toasts = signal<Toast[]>([]);

  success(message: string, duration = 3000) {
    this.addToast(message, 'success', duration);
  }

  error(message: string, duration = 5000) {
    this.addToast(message, 'error', duration);
  }

  warning(message: string, duration = 4000) {
    this.addToast(message, 'warning', duration);
  }

  info(message: string, duration = 3000) {
    this.addToast(message, 'info', duration);
  }

  dismiss(id: number) {
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  private addToast(message: string, type: Toast['type'], duration: number) {
    const id = this.nextId++;
    this.toasts.update((toasts) => [...toasts, { id, message, type, duration }]);
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }
}
