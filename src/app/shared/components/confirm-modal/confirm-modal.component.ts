import { Component, input, output, signal, effect, inject, computed } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  template: `
    @if (visible()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200"
          [class.opacity-100]="animateIn()"
          [class.opacity-0]="!animateIn()"
          (click)="onCancel()"
        ></div>

        <!-- Dialog -->
        <div
          class="relative bg-surface rounded-xl shadow-lg border border-border-light max-w-sm w-full mx-4 overflow-hidden transition-all duration-200 ease-out"
          [class.opacity-100]="animateIn()"
          [class.scale-100]="animateIn()"
          [class.opacity-0]="!animateIn()"
          [class.scale-95]="!animateIn()"
        >
          <div class="p-5">
            <h3 class="text-sm font-semibold text-text-primary leading-snug">
              {{ resolvedTitle() }}
            </h3>
            <p class="mt-1 text-[13px] text-text-secondary leading-relaxed">
              {{ resolvedMessage() }}
            </p>
          </div>

          <!-- Actions -->
          <div
            class="flex justify-end gap-2.5 px-5 py-3.5 bg-background border-t border-border-light"
          >
            <button
              (click)="onCancel()"
              class="px-3.5 py-1.5 text-[13px] font-medium text-text-secondary bg-surface border border-border rounded-lg hover:bg-background transition-colors cursor-pointer"
            >
              {{ resolvedCancelLabel() }}
            </button>
            <button
              (click)="confirm.emit()"
              class="px-3.5 py-1.5 text-[13px] font-medium text-white rounded-lg transition-colors cursor-pointer"
              [class.bg-error]="variant() === 'danger'"
              [class.hover:bg-red-600]="variant() === 'danger'"
              [class.bg-primary]="variant() !== 'danger'"
              [class.hover:bg-primary-hover]="variant() !== 'danger'"
            >
              {{ resolvedConfirmLabel() }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmModalComponent {
  private readonly translate = inject(TranslateService);

  open = input.required<boolean>();
  // Inputs accept undefined so consumers can either pass a translated string,
  // an i18n key, or rely on the COMMON.* defaults below.
  title = input<string | undefined>(undefined);
  message = input<string | undefined>(undefined);
  confirmLabel = input<string | undefined>(undefined);
  cancelLabel = input<string | undefined>(undefined);
  variant = input<'primary' | 'danger'>('primary');
  confirm = output<void>();
  cancel = output<void>();

  visible = signal(false);
  animateIn = signal(false);

  resolvedTitle = computed(() => this.title() ?? this.translate.instant('COMMON.CONFIRM_TITLE'));
  resolvedMessage = computed(
    () => this.message() ?? this.translate.instant('COMMON.CONFIRM_MESSAGE'),
  );
  resolvedConfirmLabel = computed(
    () => this.confirmLabel() ?? this.translate.instant('COMMON.CONFIRM'),
  );
  resolvedCancelLabel = computed(
    () => this.cancelLabel() ?? this.translate.instant('COMMON.CANCEL'),
  );

  constructor() {
    effect(() => {
      const isOpen = this.open();
      if (isOpen) {
        this.visible.set(true);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.animateIn.set(true);
          });
        });
      } else {
        this.animateIn.set(false);
        setTimeout(() => this.visible.set(false), 200);
      }
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
