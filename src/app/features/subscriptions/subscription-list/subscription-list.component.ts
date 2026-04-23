import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Subscription } from '../../../core/models/subscription.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    TranslateModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
  ],
  template: `
    <div>
      <div class="bg-surface rounded-xl border border-border-light shadow-sm p-4 mb-6">
        <select
          [(ngModel)]="statusFilter"
          (change)="loadSubscriptions()"
          class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">{{ 'SUBSCRIPTIONS.ALL_STATUSES' | translate }}</option>
          <option value="active">{{ 'SUBSCRIPTIONS.ACTIVE' | translate }}</option>
          <option value="past_due">{{ 'SUBSCRIPTIONS.PAST_DUE' | translate }}</option>
          <option value="cancelled">{{ 'SUBSCRIPTIONS.CANCELLED' | translate }}</option>
          <option value="unpaid">{{ 'SUBSCRIPTIONS.UNPAID' | translate }}</option>
          <option value="paused">{{ 'SUBSCRIPTIONS.PAUSED' | translate }}</option>
        </select>
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
                    {{ 'SUBSCRIPTIONS.PRODUCT' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.CUSTOMER' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.PERIOD' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.PRICE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.PERIOD_END' | translate }}
                  </th>
                  @if (auth.isSuperAdmin()) {
                    <th
                      class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      {{ 'SUBSCRIPTIONS.ACTIONS' | translate }}
                    </th>
                  }
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (sub of subscriptions(); track sub.id) {
                  <tr
                    class="hover:bg-gray-50/50 cursor-pointer"
                    [class]="sub.status === 'past_due' ? 'bg-orange-50/30' : ''"
                    [routerLink]="['/subscriptions', sub.id]"
                  >
                    <td class="px-6 py-4 text-sm font-medium text-primary hover:text-primary-hover">
                      {{ sub.productName || sub.productId }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ sub.userId }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary capitalize">
                      {{ sub.billingPeriod?.toLowerCase() }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-primary font-medium">
                      {{ formatCurrency(sub.price) }}
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge [status]="sub.status" />
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ formatDate(sub.currentPeriodEnd) }}
                    </td>
                    @if (auth.isSuperAdmin()) {
                      <td class="px-6 py-4 text-right">
                        @if (sub.status === 'active') {
                          <button
                            (click)="confirmAction(sub, 'cancel')"
                            class="text-sm text-error hover:text-red-700"
                          >
                            {{ 'SUBSCRIPTIONS.CANCEL' | translate }}
                          </button>
                        } @else if (sub.status === 'cancelled' || sub.status === 'paused') {
                          <button
                            (click)="confirmAction(sub, 'reactivate')"
                            class="text-sm text-primary hover:text-primary-hover"
                          >
                            {{ 'SUBSCRIPTIONS.REACTIVATE' | translate }}
                          </button>
                        }
                      </td>
                    }
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'SUBSCRIPTIONS.NO_SUBSCRIPTIONS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>

    <app-confirm-modal
      [open]="showModal()"
      [title]="
        modalAction() === 'cancel'
          ? ('SUBSCRIPTIONS.CANCEL_TITLE' | translate)
          : ('SUBSCRIPTIONS.REACTIVATE_TITLE' | translate)
      "
      [message]="
        modalAction() === 'cancel'
          ? ('SUBSCRIPTIONS.CANCEL_CONFIRM' | translate)
          : ('SUBSCRIPTIONS.REACTIVATE_CONFIRM' | translate)
      "
      [confirmLabel]="
        modalAction() === 'cancel'
          ? ('SUBSCRIPTIONS.CANCEL_BTN' | translate)
          : ('SUBSCRIPTIONS.REACTIVATE_BTN' | translate)
      "
      [variant]="modalAction() === 'cancel' ? 'danger' : 'primary'"
      (confirm)="executeAction()"
      (cancel)="showModal.set(false)"
    />
  `,
})
export class SubscriptionListComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly auth = inject(AdminAuthService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  subscriptions = signal<Subscription[]>([]);
  loading = signal(true);
  statusFilter = '';
  showModal = signal(false);
  modalAction = signal<'cancel' | 'reactivate'>('cancel');
  selectedSub = signal<Subscription | null>(null);

  ngOnInit() {
    this.loadSubscriptions();
  }

  loadSubscriptions() {
    this.loading.set(true);
    const params: Record<string, string | number> = {};
    if (this.statusFilter) params['status'] = this.statusFilter;

    this.api.getList<Subscription>('admin/payments/subscriptions', params).subscribe({
      next: (data) => {
        this.subscriptions.set(data || []);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error('Failed to load subscriptions');
        this.loading.set(false);
      },
    });
  }

  confirmAction(sub: Subscription, action: 'cancel' | 'reactivate') {
    this.selectedSub.set(sub);
    this.modalAction.set(action);
    this.showModal.set(true);
  }

  executeAction() {
    const sub = this.selectedSub();
    if (!sub) return;
    this.api
      .patch<any, any>(`admin/payments/subscriptions/${sub.id}/status`, {
        action: this.modalAction(),
      })
      .subscribe({
        next: () => {
          this.notifications.success(
            this.modalAction() === 'cancel'
              ? this.translate.instant('SUBSCRIPTIONS.CANCELLED_SUCCESS')
              : this.translate.instant('SUBSCRIPTIONS.REACTIVATED_SUCCESS'),
          );
          this.loadSubscriptions();
          this.showModal.set(false);
        },
        error: () => {
          this.notifications.error(this.translate.instant('SUBSCRIPTIONS.UPDATE_FAILED'));
          this.showModal.set(false);
        },
      });
  }

  formatCurrency(v: number) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v);
  }

  formatDate(d: string) {
    return d
      ? new Date(d).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : 'N/A';
  }
}
