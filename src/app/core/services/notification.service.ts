import { Injectable, isDevMode, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration: number;
}

const UNRESOLVED_PLACEHOLDER = /\{\{\s*[\w.]+\s*\}\}/;

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly toasts = signal<Toast[]>([]);
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  success(message: string, duration = 3000): string {
    return this.push('success', message, duration);
  }

  error(message: string, duration = 5000): string {
    return this.push('error', message, duration);
  }

  warning(message: string, duration = 4000): string {
    return this.push('warning', message, duration);
  }

  info(message: string, duration = 3000): string {
    return this.push('info', message, duration);
  }

  dismiss(id: string): void {
    const timer = this.timers.get(id);
    if (timer !== undefined) {
      clearTimeout(timer);
      this.timers.delete(id);
    }
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  private push(type: Toast['type'], message: string, duration: number): string {
    if (isDevMode() && UNRESOLVED_PLACEHOLDER.test(message)) {
      // Surface i18n interpolation regressions early: a {{var}} that survives
      // to the toast means a translate.instant(...) call is missing its params.
      console.warn('[NotificationService] Toast contains unresolved placeholder:', message);
    }
    const id = crypto.randomUUID();
    const toast: Toast = { id, type, message, duration };
    this.toasts.update((toasts) => [...toasts, toast]);
    if (duration > 0) {
      const timer = setTimeout(() => this.dismiss(id), duration);
      this.timers.set(id, timer);
    }
    return id;
  }
}
