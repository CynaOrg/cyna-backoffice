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
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary">{{ 'ORDERS.TITLE' | translate }}</h1>
        <p class="text-sm text-text-secondary mt-1">{{ 'ORDERS.SUBTITLE' | translate }}</p>
      </div>

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
                    <td class="px-6 py-4 text-sm text-text-secondary capitalize">
                      {{ order.orderType?.toLowerCase() }}
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

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading.set(true);
    const params: Record<string, string | number> = { page: this.page(), limit: 20 };
    if (this.search) params['search'] = this.search;
    if (this.statusFilter) params['status'] = this.statusFilter;

    this.api.get<any>('admin/orders', params).subscribe({
      next: (res) => {
        this.orders.set(res?.data || []);
        this.total.set(res?.total || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error('Failed to load orders');
        this.loading.set(false);
      },
    });
  }

  onPageChange(page: number) {
    this.page.set(page);
    this.loadOrders();
  }

  formatCurrency(v: number) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v);
  }

  formatDate(d: string) {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
