import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { User } from '../../../core/models/user.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    TranslateModule,
    StatusBadgeComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
  ],
  template: `
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary">{{ 'CUSTOMERS.TITLE' | translate }}</h1>
        <p class="text-sm text-text-secondary mt-1">{{ 'CUSTOMERS.SUBTITLE' | translate }}</p>
      </div>

      <div class="bg-surface rounded-xl border border-border-light shadow-sm p-4 mb-6">
        <input
          type="text"
          [placeholder]="'CUSTOMERS.SEARCH_PLACEHOLDER' | translate"
          [(ngModel)]="search"
          (input)="onSearch()"
          class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-72"
        />
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <div class="bg-surface rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.NAME' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.EMAIL' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.COMPANY' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.JOINED' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (user of users(); track user.id) {
                  <tr class="hover:bg-gray-50/50">
                    <td class="px-6 py-4">
                      <a
                        [routerLink]="['/customers', user.id]"
                        class="text-sm font-medium text-text-primary hover:text-primary"
                        >{{ user.firstName }} {{ user.lastName }}</a
                      >
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">{{ user.email }}</td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ user.companyName || '-' }}
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge
                        [status]="user.isActive ? 'active' : 'inactive'"
                        [label]="
                          user.isActive
                            ? ('CUSTOMERS.ACTIVE' | translate)
                            : ('CUSTOMERS.INACTIVE' | translate)
                        "
                      />
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ formatDate(user.createdAt) }}
                    </td>
                    <td class="px-6 py-4 text-right">
                      <a
                        [routerLink]="['/customers', user.id]"
                        class="text-sm text-primary hover:text-primary-hover"
                        >{{ 'CUSTOMERS.VIEW' | translate }}</a
                      >
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'CUSTOMERS.NO_CUSTOMERS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <app-pagination
            [currentPage]="page()"
            [total]="total()"
            [limit]="20"
            (pageChange)="onPageChange($event)"
          />
        </div>
      }
    </div>
  `,
})
export class CustomerListComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  users = signal<User[]>([]);
  loading = signal(true);
  page = signal(1);
  total = signal(0);
  search = '';
  private searchTimeout: any;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    const params: Record<string, string | number> = { page: this.page(), limit: 20 };
    if (this.search) params['search'] = this.search;

    this.api.get<any>('admin/users', params).subscribe({
      next: (res) => {
        this.users.set(res?.data || []);
        this.total.set(res?.total || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('CUSTOMERS.LOAD_FAILED'));
        this.loading.set(false);
      },
    });
  }

  onSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.page.set(1);
      this.loadUsers();
    }, 400);
  }
  onPageChange(p: number) {
    this.page.set(p);
    this.loadUsers();
  }
  formatDate(d: string) {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
