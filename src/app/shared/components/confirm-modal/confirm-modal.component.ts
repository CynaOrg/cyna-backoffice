import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/40" (click)="cancel.emit()"></div>
        <div class="relative bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
          <h3 class="text-lg font-semibold text-text-primary">
            {{ title() }}
          </h3>
          <p class="mt-2 text-sm text-text-secondary">{{ message() }}</p>
          <div class="mt-6 flex justify-end gap-3">
            <button
              (click)="cancel.emit()"
              class="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              (click)="confirm.emit()"
              class="px-4 py-2 text-sm font-medium text-white rounded-lg"
              [class]="
                variant() === 'danger'
                  ? 'bg-error hover:bg-red-600'
                  : 'bg-primary hover:bg-primary-hover'
              "
            >
              {{ confirmLabel() }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmModalComponent {
  open = input.required<boolean>();
  title = input<string>('Confirm action');
  message = input<string>('Are you sure?');
  confirmLabel = input<string>('Confirm');
  variant = input<'primary' | 'danger'>('primary');
  confirm = output<void>();
  cancel = output<void>();
}
