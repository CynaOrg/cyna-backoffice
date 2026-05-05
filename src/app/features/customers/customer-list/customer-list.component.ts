import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorMagnifyingGlass,
  phosphorFunnelSimple,
  phosphorArrowsClockwise,
  phosphorEye,
} from '@ng-icons/phosphor-icons/regular';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { User } from '../../../core/models/user.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { KpiCardComponent } from '../../../shared/components/kpi-card/kpi-card.component';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    TranslateModule,
    NgIconComponent,
    StatusBadgeComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    KpiCardComponent,
  ],
  viewProviders: [
    provideIcons({
      phosphorMagnifyingGlass,
      phosphorFunnelSimple,
      phosphorArrowsClockwise,
      phosphorEye,
    }),
  ],
  template: `
    <div>
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <app-kpi-card
          [value]="total()"
          [label]="'CUSTOMERS.KPI_TOTAL' | translate"
          [iconPath]="'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75'"
          iconBgClass="bg-primary-light"
          iconClass="text-primary"
        />
        <app-kpi-card
          [value]="activeCount()"
          [label]="'CUSTOMERS.KPI_ACTIVE' | translate"
          [iconPath]="'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'"
          iconBgClass="bg-success-light"
          iconClass="text-success"
        />
        <app-kpi-card
          [value]="inactiveCount()"
          [label]="'CUSTOMERS.KPI_INACTIVE' | translate"
          [iconPath]="'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'"
          iconBgClass="bg-error-light"
          iconClass="text-error"
        />
        <app-kpi-card
          [value]="verifiedCount()"
          [label]="'CUSTOMERS.KPI_VERIFIED' | translate"
          [iconPath]="'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'"
          iconBgClass="bg-info-light"
          iconClass="text-info"
        />
      </div>

      <!-- Search + Filter Bar -->
      <div class="bg-surface rounded-xl border border-border-light shadow-sm p-4 mb-6">
        <div class="flex items-center justify-between gap-4">
          <div class="relative">
            <ng-icon
              name="phosphorMagnifyingGlass"
              size="18"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              [placeholder]="'CUSTOMERS.SEARCH_PLACEHOLDER' | translate"
              [(ngModel)]="search"
              (input)="onSearch()"
              class="pl-10 pr-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-72"
            />
          </div>
          <div class="flex items-center gap-2">
            <button
              (click)="toggleFilter()"
              class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors"
              [class]="
                showFilter()
                  ? 'bg-primary-light text-primary border-primary'
                  : 'text-text-secondary border-border hover:bg-gray-50'
              "
            >
              <ng-icon name="phosphorFunnelSimple" size="18" />
              {{ 'CUSTOMERS.FILTER' | translate }}
            </button>
            <button
              (click)="refresh()"
              class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ng-icon name="phosphorArrowsClockwise" size="18" />
              {{ 'CUSTOMERS.REFRESH' | translate }}
            </button>
          </div>
        </div>

        @if (showFilter()) {
          <div class="mt-4 pt-4 border-t border-border-light flex items-center gap-3">
            <span class="text-sm text-text-secondary font-medium"
              >{{ 'CUSTOMERS.STATUS' | translate }}:</span
            >
            @for (opt of statusOptions; track opt.value) {
              <button
                (click)="filterByStatus(opt.value)"
                class="px-3 py-1 text-xs font-medium rounded-full border transition-colors"
                [class]="
                  statusFilter() === opt.value
                    ? opt.activeClass
                    : 'border-border text-text-secondary hover:bg-gray-50'
                "
              >
                {{ opt.label | translate }}
              </button>
            }
          </div>
        }
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
                  <tr class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                          [style.background-color]="getAvatarColor(user.firstName + user.lastName)"
                        >
                          {{ getInitials(user.firstName, user.lastName) }}
                        </div>
                        <div>
                          <a
                            [routerLink]="['/customers', user.id]"
                            class="text-sm font-medium text-text-primary hover:text-primary"
                          >
                            {{ user.firstName }} {{ user.lastName }}
                          </a>
                          <div class="text-xs text-text-muted">ID: {{ getShortId(user.id) }}</div>
                        </div>
                      </div>
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
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-end gap-1">
                        <a
                          [routerLink]="['/customers', user.id]"
                          class="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary-light transition-colors"
                          [title]="'CUSTOMERS.VIEW' | translate"
                        >
                          <ng-icon name="phosphorEye" size="18" />
                        </a>
                        <!--
                          CUS-4: the "Edit" button used to deep-link to the same
                          detail page as "View" because no dedicated edit screen
                          exists yet. Hidden on purpose to avoid a UX trap.
                          TODO: bring it back once a customer-edit modal/page lands.
                        -->
                      </div>
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
  showFilter = signal(false);
  statusFilter = signal('');
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

  activeCount = computed(() => this.users().filter((u) => u.isActive).length);
  inactiveCount = computed(() => this.users().filter((u) => !u.isActive).length);
  verifiedCount = computed(() => this.users().filter((u) => u.isVerified).length);

  readonly statusOptions = [
    { value: '', label: 'CUSTOMERS.ALL', activeClass: 'bg-primary text-white border-primary' },
    {
      value: 'active',
      label: 'CUSTOMERS.ACTIVE',
      activeClass: 'bg-success text-white border-success',
    },
    {
      value: 'inactive',
      label: 'CUSTOMERS.INACTIVE',
      activeClass: 'bg-error text-white border-error',
    },
  ];

  private readonly avatarColors = [
    '#6366f1',
    '#8b5cf6',
    '#ec4899',
    '#f43f5e',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#14b8a6',
    '#06b6d4',
    '#3b82f6',
  ];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    const params: Record<string, string | number> = { page: this.page(), limit: 20 };
    if (this.search) params['search'] = this.search;
    // CUS-2: backend (Sprint 3) accepts ?status=active|inactive natively.
    if (this.statusFilter()) params['status'] = this.statusFilter();

    this.api
      .get<{ items?: User[]; data?: User[]; total?: number }>('admin/users', params)
      .subscribe({
        next: (res) => {
          this.users.set(res?.items ?? res?.data ?? []);
          this.total.set(res?.total ?? 0);
          this.loading.set(false);
        },
        error: () => {
          this.notifications.error(this.translate.instant('CUSTOMERS.LOAD_FAILED'));
          this.loading.set(false);
        },
      });
  }

  onSearch(): void {
    if (this.searchTimeout !== null) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.page.set(1);
      this.loadUsers();
    }, 400);
  }

  onPageChange(p: number): void {
    this.page.set(p);
    this.loadUsers();
  }

  toggleFilter(): void {
    this.showFilter.update((v) => !v);
  }

  filterByStatus(status: string): void {
    this.statusFilter.set(status);
    this.page.set(1);
    this.loadUsers();
  }

  refresh(): void {
    this.loadUsers();
  }

  getInitials(firstName: string, lastName: string): string {
    return (firstName?.charAt(0) || '') + (lastName?.charAt(0) || '');
  }

  getShortId(id: string): string {
    return id?.substring(0, 8) || '';
  }

  getAvatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.avatarColors[Math.abs(hash) % this.avatarColors.length];
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
