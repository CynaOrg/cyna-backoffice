import { Component, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [NgIconComponent],
  template: `
    <div
      class="rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200"
      [class]="
        variant() === 'primary'
          ? 'bg-primary text-text-inverse border border-primary-hover'
          : 'bg-surface border border-border-light'
      "
    >
      <div class="flex items-start justify-between mb-2.5">
        @if (iconName()) {
          <ng-icon
            [name]="iconName()"
            [class]="variant() === 'primary' ? 'text-text-inverse opacity-90' : 'text-text-muted'"
            size="18"
          />
        } @else {
          <svg
            class="w-[18px] h-[18px]"
            [class]="variant() === 'primary' ? 'text-text-inverse opacity-90' : 'text-text-muted'"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              [attr.d]="iconPath()"
            />
          </svg>
        }
        @if (variation() !== undefined) {
          <span
            class="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
            [class]="
              variation()! >= 0 ? 'bg-success-light text-success' : 'bg-error-light text-error'
            "
          >
            {{ variation()! >= 0 ? '+' : '' }}{{ variation() }}%
          </span>
        }
      </div>
      <div
        class="text-2xl font-semibold tracking-tight"
        [class]="variant() === 'primary' ? 'text-text-inverse' : 'text-text-primary'"
      >
        {{ value() }}
      </div>
      <div
        class="text-[11px] leading-tight mt-0.5"
        [class]="variant() === 'primary' ? 'text-text-inverse opacity-80' : 'text-text-muted'"
      >
        {{ label() }}
      </div>
    </div>
  `,
})
export class KpiCardComponent {
  value = input.required<string | number>();
  label = input.required<string>();
  iconName = input<string>('');
  iconPath = input<string>('M13 7h8m0 0v8m0-8l-8 8-4-4-6 6');
  iconBgClass = input<string>('');
  iconClass = input<string>('');
  variation = input<number | undefined>(undefined);
  /**
   * `'primary'` renders the card with the Cyna brand purple background — used
   * to flag a KPI that is a snapshot (e.g. MRR) and therefore does not vary
   * with the date-range selector. Defaults to the surface variant.
   */
  variant = input<'default' | 'primary'>('default');
}
