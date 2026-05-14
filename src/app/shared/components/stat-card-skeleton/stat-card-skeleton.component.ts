import { Component } from '@angular/core';

@Component({
  selector: 'app-stat-card-skeleton',
  standalone: true,
  template: `
    <div class="rounded-xl border border-border-light bg-surface p-4 sm:p-5 shadow-sm">
      <div class="flex items-start justify-between mb-2.5">
        <div class="h-[18px] w-[18px] rounded bg-gray-200 animate-pulse"></div>
        <div class="h-4 w-10 rounded-full bg-gray-100 animate-pulse"></div>
      </div>
      <div class="h-7 w-20 rounded bg-gray-200 animate-pulse mb-1.5"></div>
      <div class="h-3 w-24 rounded bg-gray-100 animate-pulse"></div>
    </div>
  `,
})
export class StatCardSkeletonComponent {}
