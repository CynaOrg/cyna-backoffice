import { Component, inject } from '@angular/core';
import { NotificationService, Toast } from '../../../core/services/notification.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      @for (toast of notifications.toasts(); track toast.id) {
        <div
          class="px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center justify-between gap-3 animate-slide-in"
          [class]="getToastClass(toast.type)"
        >
          <span>{{ toast.message }}</span>
          <button
            (click)="notifications.dismiss(toast.id)"
            class="text-current opacity-60 hover:opacity-100 shrink-0"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      @keyframes slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-slide-in {
        animation: slide-in 0.3s ease-out;
      }
    `,
  ],
})
export class ToastContainerComponent {
  readonly notifications = inject(NotificationService);

  getToastClass(type: Toast['type']): string {
    const classes: Record<string, string> = {
      success: 'bg-emerald-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-amber-500 text-white',
      info: 'bg-blue-500 text-white',
    };
    return classes[type] || classes['info'];
  }
}
