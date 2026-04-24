import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Order, OrderStatus } from '../../../core/models/order.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-order-list',
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
      <div class="bg-surface rounded-xl border border-border-light shadow-sm p-4 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            [placeholder]="'ORDERS.SEARCH_PLACEHOLDER' | translate"
            [(ngModel)]="search"
            (input)="loadOrders()"
            class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
          />
          <select
            [(ngModel)]="statusFilter"
            (change)="loadOrders()"
            class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">{{ 'ORDERS.ALL_STATUSES' | translate }}</option>
            <option value="pending">{{ 'ORDERS.PENDING' | translate }}</option>
            <option value="paid">{{ 'ORDERS.PAID' | translate }}</option>
            <option value="processing">{{ 'ORDERS.PROCESSING' | translate }}</option>
            <option value="shipped">{{ 'ORDERS.SHIPPED' | translate }}</option>
            <option value="delivered">{{ 'ORDERS.DELIVERED' | translate }}</option>
            <option value="completed">{{ 'ORDERS.COMPLETED' | translate }}</option>
            <option value="cancelled">{{ 'ORDERS.CANCELLED' | translate }}</option>
            <option value="refunded">{{ 'ORDERS.REFUNDED' | translate }}</option>
          </select>
          <label class="flex items-center gap-2 text-sm text-text-secondary">
            <span>{{ 'ORDERS.FILTER_DATE_FROM' | translate }}</span>
            <input
              type="date"
              [(ngModel)]="dateFrom"
              (change)="loadOrders()"
              class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </label>
          <label class="flex items-center gap-2 text-sm text-text-secondary">
            <span>{{ 'ORDERS.FILTER_DATE_TO' | translate }}</span>
            <input
              type="date"
              [(ngModel)]="dateTo"
              (change)="loadOrders()"
              class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </label>
          <select
            [(ngModel)]="typeFilter"
            (change)="loadOrders()"
            class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">{{ 'ORDERS.ALL_TYPES' | translate }}</option>
            <option value="saas">{{ 'ORDERS.TYPE_SAAS' | translate }}</option>
            <option value="physical">{{ 'ORDERS.TYPE_PHYSICAL' | translate }}</option>
            <option value="license">{{ 'ORDERS.TYPE_LICENSE' | translate }}</option>
            <option value="mixed">{{ 'ORDERS.TYPE_MIXED' | translate }}</option>
          </select>
        </div>
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
                    {{ 'ORDERS.ORDER' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.CUSTOMER' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.DATE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.TYPE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.TOTAL' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (order of orders(); track order.id) {
                  <tr class="hover:bg-gray-50/50">
                    <td class="px-6 py-4">
                      <a
                        [routerLink]="['/orders', order.id]"
                        class="text-sm font-medium text-primary hover:text-primary-hover"
                      >
                        {{ order.orderNumber }}
                      </a>
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ order.userId || order.guestEmail || ('ORDERS.GUEST' | translate) }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ formatDate(order.createdAt) }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ orderTypeLabel(order.orderType) | translate }}
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge [status]="order.status" />
                    </td>
                    <td class="px-6 py-4 text-sm text-text-primary font-medium text-right">
                      {{ formatCurrency(order.total) }}
                    </td>
                    <td class="px-6 py-4 text-right">
                      <a
                        [routerLink]="['/orders', order.id]"
                        class="text-sm text-primary hover:text-primary-hover"
                      >
                        {{ 'ORDERS.VIEW' | translate }}
                      </a>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'ORDERS.NO_ORDERS' | translate }}
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
export class OrderListComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  orders = signal<Order[]>([]);
  loading = signal(true);
  page = signal(1);
  total = signal(0);
  search = '';
  statusFilter = '';
  dateFrom = '';
  dateTo = '';
  typeFilter = '';

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    const params: Record<string, string | number> = { page: this.page(), limit: 20 };
    if (this.search) params['search'] = this.search;
    if (this.statusFilter) params['status'] = this.statusFilter;
    if (this.dateFrom) params['dateFrom'] = this.dateFrom;
    if (this.dateTo) params['dateTo'] = this.dateTo;
    if (this.typeFilter) params['orderType'] = this.typeFilter;

    this.api.get<{ data: Order[]; total: number }>('admin/orders', params).subscribe({
      next: (res) => {
        this.orders.set(res?.data ?? []);
        this.total.set(res?.total ?? 0);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error('Failed to load orders');
        this.loading.set(false);
      },
    });
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.loadOrders();
  }

  formatCurrency(v: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v);
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  orderTypeLabel(orderType: string | undefined): string {
    switch (orderType?.toLowerCase()) {
      case 'saas':
        return 'ORDERS.TYPE_SAAS';
      case 'physical':
        return 'ORDERS.TYPE_PHYSICAL';
      case 'license':
        return 'ORDERS.TYPE_LICENSE';
      case 'mixed':
        return 'ORDERS.TYPE_MIXED';
      default:
        return '';
    }
  }
}
