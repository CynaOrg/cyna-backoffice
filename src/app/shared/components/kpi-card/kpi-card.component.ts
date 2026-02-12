import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  template: `
    <div
      class="rounded-xl border border-border-light bg-surface p-6 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" [class]="iconBgClass()">
          <svg
            class="w-5 h-5"
            [class]="iconClass()"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              [attr.d]="iconPath()"
            />
          </svg>
        </div>
        @if (variation() !== undefined) {
          <span
            class="text-xs font-semibold px-2 py-1 rounded-full"
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
  iconPath = input<string>('M13 7h8m0 0v8m0-8l-8 8-4-4-6 6');
  iconBgClass = input<string>('bg-primary-light');
  iconClass = input<string>('text-primary');
  variation = input<number | undefined>(undefined);
}
