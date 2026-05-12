import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Subscription } from '../../../core/models/subscription.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

type SubscriptionAction = 'cancel' | 'reactivate' | 'cancel_at_end' | 'resume_period';

@Component({
  selector: 'app-subscription-list',
  standalone: true,
  imports: [
    FormsModule,
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
                    class="hover:bg-gray-50/50"
                    [class]="sub.status === 'past_due' ? 'bg-orange-50/30' : ''"
                  >
                    <td class="px-6 py-4 text-sm font-medium text-text-primary">
                      {{ sub.productName || sub.productId }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ customerLabel(sub) }}
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
                        <div class="flex items-center justify-end gap-3">
                          @if (
                            sub.status === 'active' ||
                            sub.status === 'past_due' ||
                            sub.status === 'unpaid'
                          ) {
                            @if (sub.cancelAtPeriodEnd) {
                              <button
                                (click)="confirmAction(sub, 'resume_period')"
                                class="text-sm text-primary hover:text-primary-hover"
                              >
                                {{ 'SUBSCRIPTIONS.RESUME_PERIOD' | translate }}
                              </button>
                            } @else {
                              <button
                                (click)="confirmAction(sub, 'cancel_at_end')"
                                class="text-sm text-warning hover:text-orange-700"
                              >
                                {{ 'SUBSCRIPTIONS.CANCEL_AT_END' | translate }}
                              </button>
                            }
                            <!--
                              SUB-4: past_due / unpaid subscriptions can also be
                              cancelled by the admin (e.g. if Stripe collection
                              has been failing for a while and we want to stop
                              re-trying). The same /status endpoint accepts the
                              cancel action regardless of the source status.
                            -->
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
                        </div>
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
      [title]="modalTitle()"
      [message]="modalMessage()"
      [confirmLabel]="modalConfirmLabel()"
      [variant]="modalVariant()"
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
  loading = signal<boolean>(true);
  statusFilter = '';
  showModal = signal<boolean>(false);
  modalAction = signal<SubscriptionAction>('cancel');
  selectedSub = signal<Subscription | null>(null);

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.loading.set(true);
    const params: Record<string, string | number> = {};
    if (this.statusFilter) params['status'] = this.statusFilter;

    this.api.getList<Subscription>('admin/payments/subscriptions', params).subscribe({
      next: (data) => {
        this.subscriptions.set(data || []);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('SUBSCRIPTIONS.LOAD_FAILED'));
        this.loading.set(false);
      },
    });
  }

  confirmAction(sub: Subscription, action: SubscriptionAction): void {
    this.selectedSub.set(sub);
    this.modalAction.set(action);
    this.showModal.set(true);
  }

  modalTitle(): string {
    return this.translate.instant(`SUBSCRIPTIONS.${this.actionKey()}_TITLE`);
  }

  modalMessage(): string {
    return this.translate.instant(`SUBSCRIPTIONS.${this.actionKey()}_CONFIRM`);
  }

  modalConfirmLabel(): string {
    return this.translate.instant(`SUBSCRIPTIONS.${this.actionKey()}_BTN`);
  }

  modalVariant(): 'danger' | 'primary' {
    return this.modalAction() === 'cancel' ? 'danger' : 'primary';
  }

  private actionKey(): string {
    switch (this.modalAction()) {
      case 'cancel':
        return 'CANCEL';
      case 'reactivate':
        return 'REACTIVATE';
      case 'cancel_at_end':
        return 'CANCEL_AT_END';
      case 'resume_period':
        return 'RESUME_PERIOD';
    }
  }

  executeAction(): void {
    const sub = this.selectedSub();
    if (!sub) return;
    const action = this.modalAction();

    if (action === 'cancel_at_end' || action === 'resume_period') {
      this.api
        .patch<
          { cancelAtPeriodEnd: boolean },
          Subscription
        >(`admin/payments/subscriptions/${sub.id}/terms`, { cancelAtPeriodEnd: action === 'cancel_at_end' })
        .subscribe({
          next: () => {
            this.notifications.success(
              this.translate.instant(`SUBSCRIPTIONS.${this.actionKey()}_SUCCESS`),
            );
            this.loadSubscriptions();
            this.showModal.set(false);
          },
          error: () => {
            this.notifications.error(this.translate.instant('SUBSCRIPTIONS.UPDATE_FAILED'));
            this.showModal.set(false);
          },
        });
      return;
    }

    // SUB-7: today the backend /status endpoint only supports immediate
    // cancellation (cancelAtPeriodEnd: false hardcoded server-side).
    // The cancel-at-period-end variant lives on the /terms endpoint above.
    this.api
      .patch<
        { action: 'cancel' | 'reactivate' },
        Subscription
      >(`admin/payments/subscriptions/${sub.id}/status`, { action })
      .subscribe({
        next: () => {
          this.notifications.success(
            action === 'cancel'
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

  formatCurrency(v: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v);
  }

  customerLabel(sub: Subscription): string {
    return sub.customerEmail || (sub.userId ? sub.userId.slice(0, 8) : '');
  }

  formatDate(d: string): string {
    return d
      ? new Date(d).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : 'N/A';
  }
}
