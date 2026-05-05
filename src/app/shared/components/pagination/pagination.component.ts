import { Component, input, output, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [TranslateModule],
  template: `
    @if (totalPages() > 1) {
      <div class="flex items-center justify-between px-4 py-3">
        <div class="text-sm text-text-secondary">
          {{ 'PAGINATION.SHOWING' | translate }} {{ startItem() }}-{{ endItem() }}
          {{ 'PAGINATION.OF' | translate }} {{ total() }}
        </div>
        <div class="flex items-center gap-1">
          <button
            (click)="goTo(currentPage() - 1)"
            [disabled]="currentPage() <= 1"
            class="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {{ 'PAGINATION.PREVIOUS' | translate }}
          </button>
          @for (p of pages(); track p) {
            @if (p === -1) {
              <span class="px-2 text-text-muted">...</span>
            } @else {
              <button
                (click)="goTo(p)"
                class="w-8 h-8 text-sm rounded-lg"
                [class]="
                  p === currentPage()
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-50 text-text-secondary'
                "
              >
                {{ p }}
              </button>
            }
          }
          <button
            (click)="goTo(currentPage() + 1)"
            [disabled]="currentPage() >= totalPages()"
            class="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {{ 'PAGINATION.NEXT' | translate }}
          </button>
        </div>
      </div>
    }
  `,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  total = input.required<number>();
  limit = input<number>(20);
  pageChange = output<number>();

  totalPages = computed(() => Math.ceil(this.total() / this.limit()));
  startItem = computed(() => (this.currentPage() - 1) * this.limit() + 1);
  endItem = computed(() => Math.min(this.currentPage() * this.limit(), this.total()));

  pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: number[] = [1];
    if (current > 3) pages.push(-1);
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push(-1);
    pages.push(total);
    return pages;
  });

  goTo(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
