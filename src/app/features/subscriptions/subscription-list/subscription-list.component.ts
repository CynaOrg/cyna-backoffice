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

interface TermsFormData {
  cancelAtPeriodEnd: boolean;
  trialEndDate: string;
}

interface UpdateTermsPayload {
  cancelAtPeriodEnd?: boolean;
  trialEnd?: 'now' | number;
}

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
                        <div class="flex items-center justify-end gap-3">
                          <button
                            (click)="openTermsModal(sub)"
                            class="text-sm text-primary hover:text-primary-hover"
                          >
                            {{ 'SUBSCRIPTIONS.EDIT_TERMS' | translate }}
                          </button>
                          @if (
                            sub.status === 'active' ||
                            sub.status === 'past_due' ||
                            sub.status === 'unpaid'
                          ) {
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

    @if (showTermsModal()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/40" (click)="closeTermsModal()"></div>
        <div
          class="relative bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        >
          <h3 class="text-lg font-semibold mb-4">
            {{ 'SUBSCRIPTIONS.EDIT_TERMS' | translate }}
          </h3>
          <div class="space-y-4">
            <label class="flex items-center gap-2 text-sm">
              <input type="checkbox" [(ngModel)]="termsForm.cancelAtPeriodEnd" class="rounded" />
              {{ 'SUBSCRIPTIONS.CANCEL_AT_PERIOD_END' | translate }}
            </label>

            <div>
              <label class="block text-sm font-medium text-text-secondary mb-1">{{
                'SUBSCRIPTIONS.TRIAL_END' | translate
              }}</label>
              <input
                type="date"
                [(ngModel)]="termsForm.trialEndDate"
                class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <button
                type="button"
                (click)="endTrialNow()"
                class="text-sm text-primary hover:text-primary-hover underline"
              >
                {{ 'SUBSCRIPTIONS.END_TRIAL_NOW' | translate }}
              </button>
              @if (endTrialNowFlag()) {
                <p class="mt-1 text-xs text-text-muted">
                  {{ 'SUBSCRIPTIONS.END_TRIAL_NOW' | translate }}
                </p>
              }
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
              (click)="closeTermsModal()"
              class="px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-50"
            >
              {{ 'SUBSCRIPTIONS.CANCEL' | translate }}
            </button>
            <button
              (click)="saveTerms()"
              [disabled]="savingTerms()"
              class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover disabled:opacity-60"
            >
              {{ 'SUBSCRIPTIONS.SAVE' | translate }}
            </button>
          </div>
        </div>
      </div>
    }
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
  modalAction = signal<'cancel' | 'reactivate'>('cancel');
  selectedSub = signal<Subscription | null>(null);

  showTermsModal = signal<boolean>(false);
  savingTerms = signal<boolean>(false);
  endTrialNowFlag = signal<boolean>(false);
  termsForm: TermsFormData = { cancelAtPeriodEnd: false, trialEndDate: '' };
  private initialCancelAtPeriodEnd = false;

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

  confirmAction(sub: Subscription, action: 'cancel' | 'reactivate'): void {
    this.selectedSub.set(sub);
    this.modalAction.set(action);
    this.showModal.set(true);
  }

  executeAction(): void {
    const sub = this.selectedSub();
    if (!sub) return;
    // SUB-7: today the backend /status endpoint only supports immediate
    // cancellation (cancelAtPeriodEnd: false hardcoded server-side).
    // The cancel-at-period-end variant lives on the /terms endpoint
    // exposed via openTermsModal() above. When the backend gains a
    // proper "cancel at period end" flag on /status, surface a radio
    // choice in this modal and forward it here.
    // TODO(SUB-7): once backend accepts cancelAtPeriodEnd on /status,
    // pass it from a cancel-mode picker rendered in the confirm modal.
    this.api
      .patch<
        { action: 'cancel' | 'reactivate' },
        Subscription
      >(`admin/payments/subscriptions/${sub.id}/status`, { action: this.modalAction() })
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

  openTermsModal(sub: Subscription): void {
    this.selectedSub.set(sub);
    this.initialCancelAtPeriodEnd = Boolean(sub.cancelAtPeriodEnd);
    this.termsForm = {
      cancelAtPeriodEnd: this.initialCancelAtPeriodEnd,
      trialEndDate: '',
    };
    this.endTrialNowFlag.set(false);
    this.showTermsModal.set(true);
  }

  closeTermsModal(): void {
    this.showTermsModal.set(false);
    this.endTrialNowFlag.set(false);
  }

  endTrialNow(): void {
    this.endTrialNowFlag.set(true);
    this.termsForm.trialEndDate = '';
  }

  saveTerms(): void {
    const sub = this.selectedSub();
    if (!sub) return;

    const payload: UpdateTermsPayload = {};

    if (this.termsForm.cancelAtPeriodEnd !== this.initialCancelAtPeriodEnd) {
      payload.cancelAtPeriodEnd = this.termsForm.cancelAtPeriodEnd;
    }

    if (this.endTrialNowFlag()) {
      payload.trialEnd = 'now';
    } else if (this.termsForm.trialEndDate) {
      const ts = Math.floor(new Date(this.termsForm.trialEndDate).getTime() / 1000);
      if (!Number.isNaN(ts)) {
        payload.trialEnd = ts;
      }
    }

    if (Object.keys(payload).length === 0) {
      this.notifications.error(this.translate.instant('SUBSCRIPTIONS.TERMS_UPDATE_FAILED'));
      return;
    }

    this.savingTerms.set(true);
    this.api
      .patch<
        UpdateTermsPayload,
        Subscription
      >(`admin/payments/subscriptions/${sub.id}/terms`, payload)
      .subscribe({
        next: () => {
          this.notifications.success(this.translate.instant('SUBSCRIPTIONS.TERMS_UPDATED'));
          this.savingTerms.set(false);
          this.closeTermsModal();
          this.loadSubscriptions();
        },
        error: () => {
          this.notifications.error(this.translate.instant('SUBSCRIPTIONS.TERMS_UPDATE_FAILED'));
          this.savingTerms.set(false);
        },
      });
  }

  formatCurrency(v: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v);
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
