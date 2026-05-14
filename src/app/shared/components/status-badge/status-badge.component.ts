import { Component, input, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      [class]="badgeClasses()"
    >
      <span class="w-1.5 h-1.5 rounded-full" [class]="dotClass()"></span>
      {{ displayLabel() }}
    </span>
  `,
})
export class StatusBadgeComponent {
  private readonly translate = inject(TranslateService);

  status = input.required<string>();
  label = input<string>();

  // Track language changes so the computed below re-runs when the user
  // toggles FR/EN. translate.instant() is non-reactive on its own.
  private readonly currentLang = toSignal(
    this.translate.onLangChange.pipe(
      startWith({ lang: this.translate.currentLang } as LangChangeEvent),
    ),
    { initialValue: { lang: this.translate.currentLang } as LangChangeEvent },
  );

  displayLabel = computed(() => {
    const explicit = this.label();
    if (explicit) return explicit;
    const raw = this.status();
    if (!raw) return '';
    this.currentLang();
    const key = `STATUS.${raw.toUpperCase()}`;
    const translated = this.translate.instant(key);
    return translated && translated !== key ? translated : raw.replace(/_/g, ' ');
  });

  private readonly statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
    active: { bg: 'bg-success-light', text: 'text-success', dot: 'bg-success' },
    paid: { bg: 'bg-success-light', text: 'text-success', dot: 'bg-success' },
    completed: { bg: 'bg-success-light', text: 'text-success', dot: 'bg-success' },
    delivered: { bg: 'bg-success-light', text: 'text-success', dot: 'bg-success' },
    verified: { bg: 'bg-success-light', text: 'text-success', dot: 'bg-success' },
    pending: { bg: 'bg-warning-light', text: 'text-warning', dot: 'bg-warning' },
    processing: { bg: 'bg-info-light', text: 'text-info', dot: 'bg-info' },
    shipped: { bg: 'bg-info-light', text: 'text-info', dot: 'bg-info' },
    past_due: { bg: 'bg-warning-light', text: 'text-warning', dot: 'bg-warning' },
    cancelled: { bg: 'bg-[#f3f4f6]', text: 'text-text-muted', dot: 'bg-text-muted' },
    paused: { bg: 'bg-[#f3f4f6]', text: 'text-text-muted', dot: 'bg-text-muted' },
    refunded: { bg: 'bg-primary-light', text: 'text-primary', dot: 'bg-primary' },
    unpaid: { bg: 'bg-error-light', text: 'text-error', dot: 'bg-error' },
    inactive: { bg: 'bg-error-light', text: 'text-error', dot: 'bg-error' },
  };

  badgeClasses = computed(() => {
    const config = this.statusConfig[this.status()] || {
      bg: 'bg-[#f3f4f6]',
      text: 'text-text-secondary',
    };
    return `${config.bg} ${config.text}`;
  });

  dotClass = computed(() => {
    const config = this.statusConfig[this.status()];
    return config?.dot || 'bg-text-muted';
  });
}
