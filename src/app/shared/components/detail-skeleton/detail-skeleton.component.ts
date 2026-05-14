import { Component, input, computed } from '@angular/core';

/**
 * Generic skeleton for detail pages (order/customer/product detail).
 * Renders a title row, optional cover/image block, and N stacked content cards.
 */
@Component({
  selector: 'app-detail-skeleton',
  standalone: true,
  template: `
    <div class="flex flex-col gap-4">
      <!-- Title bar -->
      <div class="flex items-center justify-between">
        <div class="h-7 w-56 rounded bg-gray-200 animate-pulse"></div>
        <div class="h-9 w-28 rounded-lg bg-gray-100 animate-pulse"></div>
      </div>

      <!-- Cover / hero block (optional) -->
      @if (showCover()) {
        <div class="h-40 w-full rounded-xl bg-gray-100 animate-pulse"></div>
      }

      <!-- Content cards -->
      <div class="grid gap-4" [class]="gridClass()">
        @for (card of cardArray(); track card) {
          <div class="rounded-xl border border-gray-200 bg-white p-5 flex flex-col gap-3">
            <div class="h-5 w-1/3 rounded bg-gray-200 animate-pulse"></div>
            <div class="h-4 w-full rounded bg-gray-100 animate-pulse"></div>
            <div class="h-4 w-5/6 rounded bg-gray-100 animate-pulse"></div>
            <div class="h-4 w-2/3 rounded bg-gray-100 animate-pulse"></div>
          </div>
        }
      </div>
    </div>
  `,
})
export class DetailSkeletonComponent {
  cards = input<number>(2);
  showCover = input<boolean>(false);
  columns = input<1 | 2>(2);

  readonly cardArray = computed(() => Array.from({ length: this.cards() }));
  readonly gridClass = computed(() => (this.columns() === 2 ? 'lg:grid-cols-2' : 'grid-cols-1'));
}
