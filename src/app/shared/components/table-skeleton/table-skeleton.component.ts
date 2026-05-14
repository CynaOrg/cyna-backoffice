import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-table-skeleton',
  standalone: true,
  template: `
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <table class="min-w-full">
        @if (showHeader()) {
          <thead class="bg-gray-50">
            <tr>
              @for (i of columnArray(); track i) {
                <th class="px-4 py-3 text-left">
                  <div class="h-3.5 w-24 rounded bg-gray-200 animate-pulse"></div>
                </th>
              }
            </tr>
          </thead>
        }
        <tbody class="divide-y divide-gray-100">
          @for (row of rowArray(); track row) {
            <tr>
              @for (col of columnArray(); track col) {
                <td class="px-4 py-3">
                  <div
                    class="h-4 rounded bg-gray-100 animate-pulse"
                    [style.width]="col === 0 ? '70%' : '50%'"
                  ></div>
                </td>
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class TableSkeletonComponent {
  rows = input<number>(6);
  columns = input<number>(5);
  showHeader = input<boolean>(true);

  readonly rowArray = computed(() => Array.from({ length: this.rows() }));
  readonly columnArray = computed(() => Array.from({ length: this.columns() }, (_, i) => i));
}
