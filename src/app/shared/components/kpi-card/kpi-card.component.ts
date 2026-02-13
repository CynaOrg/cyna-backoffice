import { Component, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [NgIconComponent],
  template: `
    <div
      class="rounded-xl border border-border-light bg-surface p-5 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200"
    >
      <div class="flex items-start justify-between mb-3">
        @if (iconName()) {
          <ng-icon [name]="iconName()" class="text-text-secondary" size="22" />
        } @else {
          <svg
            class="w-6 h-6 text-text-secondary"
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
            class="text-xs font-semibold px-2 py-0.5 rounded-full"
            [class]="
              variation()! >= 0 ? 'bg-success-light text-success' : 'bg-error-light text-error'
            "
          >
            {{ variation()! >= 0 ? '+' : '' }}{{ variation() }}%
          </span>
        }
      </div>
      <div class="text-2xl font-bold text-text-primary">{{ value() }}</div>
      <div class="text-sm text-text-secondary mt-1">{{ label() }}</div>
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
}
