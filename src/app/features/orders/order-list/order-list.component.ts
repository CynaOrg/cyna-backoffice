import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
    StatusBadgeComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
  ],
  template: `
    <div>
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
          Orders
        </h1>
        <p class="text-sm text-text-secondary mt-1">Manage customer orders</p>
      </div>

      <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-4 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search orders..."
            [(ngModel)]="search"
            (input)="loadOrders()"
            class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
          />
          <select
            [(ngModel)]="statusFilter"
            (change)="loadOrders()"
            class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <div class="bg-card-bg rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Order
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (order of orders(); track order.id) {
                  <tr class="hover:bg-gray-50/50">
                    <td class="px-6 py-4">
                      <a
                        [routerLink]="['/orders', order.id]"
                        class="text-sm font-medium text-primary hover:text-primary-dark"
                      >
                        {{ order.orderNumber }}
                      </a>
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ order.userId || order.guestEmail || 'Guest' }}
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
                        class="text-sm text-primary hover:text-primary-dark"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-text-muted text-sm">
                      No orders found
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

    this.api.getRaw<any>('admin/orders', params).subscribe({
      next: (res) => {
        this.orders.set(res.data || []);
        this.total.set(res.total || 0);
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
