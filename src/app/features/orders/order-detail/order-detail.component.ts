import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Order } from '../../../core/models/order.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    TranslateModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
  ],
  template: `
    <div>
      @if (loading()) {
        <app-loading-spinner />
      } @else if (order()) {
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <a routerLink="/orders" class="p-2 rounded-lg hover:bg-gray-100 text-text-muted">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </a>
            <div>
              <h1 class="text-2xl font-bold text-text-primary">
                {{ order()!.orderNumber }}
              </h1>
              <p class="text-sm text-text-secondary">{{ formatDate(order()!.createdAt) }}</p>
            </div>
          </div>
          <app-status-badge [status]="order()!.status" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <!-- Items -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.ITEMS' | translate }}</h3>
              <div class="space-y-3">
                @for (item of order()!.items; track item.id) {
                  <div
                    class="flex items-center justify-between py-3 border-b border-border-light last:border-0"
                  >
                    <div>
                      <p class="text-sm font-medium text-text-primary">
                        {{ item.productSnapshot?.name || item.productName || item.productId }}
                      </p>
                      <p class="text-xs text-text-muted">
                        {{ 'ORDERS.QTY' | translate }}: {{ item.quantity }}
                        {{ item.billingPeriod ? '(' + item.billingPeriod + ')' : '' }}
                      </p>
                    </div>
                    <p class="text-sm font-medium text-text-primary">
                      {{ formatCurrency(item.unitPrice * item.quantity) }}
                    </p>
                  </div>
                }
              </div>
            </div>

            <!-- Summary -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.SUMMARY' | translate }}</h3>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-text-secondary">{{ 'ORDERS.SUBTOTAL' | translate }}</span>
                  <span>{{ formatCurrency(order()!.subtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-text-secondary">{{ 'ORDERS.TAX' | translate }}</span>
                  <span>{{ formatCurrency(order()!.taxAmount) }}</span>
                </div>
                @if (order()!.shippingAmount > 0) {
                  <div class="flex justify-between text-sm">
                    <span class="text-text-secondary">{{ 'ORDERS.SHIPPING' | translate }}</span>
                    <span>{{ formatCurrency(order()!.shippingAmount) }}</span>
                  </div>
                }
                <div
                  class="flex justify-between text-sm font-bold pt-2 border-t border-border-light"
                >
                  <span>{{ 'ORDERS.TOTAL' | translate }}</span>
                  <span>{{ formatCurrency(order()!.total) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Status Update -->
            @if (auth.isSuperAdmin()) {
              <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
                <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.UPDATE_STATUS' | translate }}</h3>
                <select
                  [(ngModel)]="newStatus"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-3"
                >
                  <option value="pending">{{ 'ORDERS.PENDING' | translate }}</option>
                  <option value="paid">{{ 'ORDERS.PAID' | translate }}</option>
                  <option value="processing">{{ 'ORDERS.PROCESSING' | translate }}</option>
                  <option value="shipped">{{ 'ORDERS.SHIPPED' | translate }}</option>
                  <option value="delivered">{{ 'ORDERS.DELIVERED' | translate }}</option>
                  <option value="completed">{{ 'ORDERS.COMPLETED' | translate }}</option>
                  <option value="cancelled">{{ 'ORDERS.CANCELLED' | translate }}</option>
                  <option value="refunded">{{ 'ORDERS.REFUNDED' | translate }}</option>
                </select>
                <button
                  (click)="updateStatus()"
                  [disabled]="updating()"
                  class="w-full py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover disabled:opacity-60"
                >
                  {{
                    updating()
                      ? ('ORDERS.UPDATING' | translate)
                      : ('ORDERS.UPDATE_STATUS' | translate)
                  }}
                </button>
              </div>
            }

            <!-- Customer Info -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.CUSTOMER' | translate }}</h3>
              <div class="space-y-2 text-sm">
                <div>
                  <span class="text-text-muted">{{ 'ORDERS.ID' | translate }}:</span>
                  <span class="text-text-primary">{{
                    order()!.userId || ('ORDERS.GUEST' | translate)
                  }}</span>
                </div>
                @if (order()!.guestEmail) {
                  <div>
                    <span class="text-text-muted">{{ 'ORDERS.EMAIL' | translate }}:</span>
                    <span class="text-text-primary">{{ order()!.guestEmail }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Dates -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.TIMELINE' | translate }}</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-text-muted">{{ 'ORDERS.CREATED' | translate }}</span>
                  <span>{{ formatDate(order()!.createdAt) }}</span>
                </div>
                @if (order()!.paidAt) {
                  <div class="flex justify-between">
                    <span class="text-text-muted">{{ 'ORDERS.PAID' | translate }}</span>
                    <span>{{ formatDate(order()!.paidAt!) }}</span>
                  </div>
                }
                @if (order()!.shippedAt) {
                  <div class="flex justify-between">
                    <span class="text-text-muted">{{ 'ORDERS.SHIPPED' | translate }}</span>
                    <span>{{ formatDate(order()!.shippedAt!) }}</span>
                  </div>
                }
                @if (order()!.deliveredAt) {
                  <div class="flex justify-between">
                    <span class="text-text-muted">{{ 'ORDERS.DELIVERED' | translate }}</span>
                    <span>{{ formatDate(order()!.deliveredAt!) }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class OrderDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  readonly auth = inject(AdminAuthService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  order = signal<Order | null>(null);
  loading = signal(true);
  updating = signal(false);
  newStatus = 'pending';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadOrder(id);
  }

  loadOrder(id: string) {
    this.api.get<Order>(`admin/orders/${id}`).subscribe({
      next: (order) => {
        this.order.set(order);
        this.newStatus = order.status;
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('ORDERS.NOT_FOUND'));
        this.router.navigate(['/orders']);
      },
    });
  }

  updateStatus() {
    const o = this.order();
    if (!o) return;
    this.updating.set(true);
    this.api.patch<any, any>(`admin/orders/${o.id}/status`, { status: this.newStatus }).subscribe({
      next: () => {
        this.order.update((ord) => (ord ? { ...ord, status: this.newStatus as any } : null));
        this.notifications.success(this.translate.instant('ORDERS.STATUS_UPDATED'));
        this.updating.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('ORDERS.UPDATE_FAILED'));
        this.updating.set(false);
      },
    });
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
