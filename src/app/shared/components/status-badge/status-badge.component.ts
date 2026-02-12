import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  template: `
    <span
      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      [class]="badgeClass()"
    >
      {{ displayLabel() }}
    </span>
  `,
})
export class StatusBadgeComponent {
  status = input.required<string>();
  label = input<string>();

  displayLabel = computed(() => this.label() || this.status().replace(/_/g, ' '));

  badgeClass = computed(() => {
    const s = this.status();
    const map: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700',
      paid: 'bg-emerald-100 text-emerald-700',
      completed: 'bg-emerald-100 text-emerald-700',
      delivered: 'bg-emerald-100 text-emerald-700',
      verified: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-blue-100 text-blue-700',
      past_due: 'bg-orange-100 text-orange-700',
      cancelled: 'bg-gray-100 text-gray-600',
      refunded: 'bg-purple-100 text-purple-700',
      unpaid: 'bg-red-100 text-red-700',
      paused: 'bg-gray-100 text-gray-600',
      inactive: 'bg-red-100 text-red-700',
    };
    return map[s] || 'bg-gray-100 text-gray-600';
  });
}
