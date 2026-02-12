import {
  Component,
  input,
  output,
  contentChildren,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div class="bg-surface rounded-xl border border-border-light shadow-sm overflow-hidden">
      @if (title() || headerTpl) {
        <div class="px-6 py-4 border-b border-border-light flex items-center justify-between">
          @if (title()) {
            <h3 class="text-lg font-semibold text-text-primary">
              {{ title() }}
            </h3>
          }
          @if (headerTpl) {
            <ng-container [ngTemplateOutlet]="headerTpl" />
          }
        </div>
      }
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-border-light">
              @for (col of columns(); track col) {
                <th
                  class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                >
                  {{ col }}
                </th>
              }
            </tr>
          </thead>
          <tbody class="divide-y divide-border-light">
            @if (loading()) {
              <tr>
                <td
                  [attr.colspan]="columns().length"
                  class="px-6 py-12 text-center text-text-muted"
                >
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      />
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Loading...
                  </div>
                </td>
              </tr>
            } @else if (empty()) {
              <tr>
                <td
                  [attr.colspan]="columns().length"
                  class="px-6 py-12 text-center text-text-muted"
                >
                  {{ emptyMessage() }}
                </td>
              </tr>
            } @else {
              <ng-content />
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class DataTableComponent {
  columns = input.required<string[]>();
  loading = input<boolean>(false);
  empty = input<boolean>(false);
  emptyMessage = input<string>('No data found');
  title = input<string>('');

  @ContentChild('header') headerTpl?: TemplateRef<any>;
}
