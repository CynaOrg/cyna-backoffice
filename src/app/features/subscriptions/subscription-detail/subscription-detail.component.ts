import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Subscription } from '../../../core/models/subscription.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-subscription-detail',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    StatusBadgeComponent,
    ConfirmModalComponent,
    LoadingSpinnerComponent,
  ],
  template: `
    @if (loading()) {
      <app-loading-spinner />
    } @else if (subscription(); as sub) {
      <div class="animate-fade-in-up">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <a
              routerLink="/subscriptions"
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background transition-colors hover:bg-primary-light"
              style="text-decoration: none; color: #0a0a0a; border: none"
            >
              <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </a>
            <div class="min-w-0">
              <div class="flex items-center gap-3">
                <h1 class="text-xl font-bold text-text-primary truncate !m-0">
                  {{ sub.productName || sub.productId }}
                </h1>
                <app-status-badge [status]="sub.status" />
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="text-xs text-text-muted font-mono">{{
                  sub.stripeSubscriptionId
                }}</span>
              </div>
            </div>
          </div>
          @if (auth.isSuperAdmin()) {
            <div class="flex items-center gap-2">
              @if (sub.status === 'active') {
                <button
                  (click)="confirmAction('cancel')"
                  class="inline-flex items-center gap-1.5 px-4 py-2 border border-error text-error text-sm font-medium rounded-lg hover:bg-error-light transition-colors bg-transparent cursor-pointer"
                >
                  {{ 'SUBSCRIPTIONS.CANCEL' | translate }}
                </button>
              } @else if (sub.status === 'cancelled' || sub.status === 'paused') {
                <button
                  (click)="confirmAction('reactivate')"
                  class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors border-none cursor-pointer"
                >
                  {{ 'SUBSCRIPTIONS.REACTIVATE' | translate }}
                </button>
              }
            </div>
          }
        </div>

        <!-- Content grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <!-- Main column -->
          <div class="lg:col-span-2 flex flex-col gap-5">
            <!-- Billing info -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'SUBSCRIPTIONS.BILLING_INFO' | translate }}
                </h3>
              </div>
              <div class="divide-y divide-border-light">
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'SUBSCRIPTIONS.PRICE' | translate
                  }}</span>
                  <span class="text-sm font-semibold text-text-primary">{{
                    formatCurrency(sub.price)
                  }}</span>
                </div>
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'SUBSCRIPTIONS.PERIOD' | translate
                  }}</span>
                  <span class="text-sm text-text-secondary capitalize">{{
                    sub.billingPeriod?.toLowerCase()
                  }}</span>
                </div>
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'SUBSCRIPTIONS.CURRENCY' | translate
                  }}</span>
                  <span class="text-sm text-text-secondary uppercase">{{ sub.currency }}</span>
                </div>
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'SUBSCRIPTIONS.CANCEL_AT_PERIOD_END' | translate
                  }}</span>
                  <span class="text-sm text-text-secondary">{{
                    sub.cancelAtPeriodEnd ? ('COMMON.YES' | translate) : ('COMMON.NO' | translate)
                  }}</span>
                </div>
              </div>
            </div>

            <!-- Period info -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'SUBSCRIPTIONS.PERIOD_INFO' | translate }}
                </h3>
              </div>
              <div class="divide-y divide-border-light">
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'SUBSCRIPTIONS.PERIOD_START' | translate
                  }}</span>
                  <span class="text-sm text-text-secondary">{{
                    formatDate(sub.currentPeriodStart)
                  }}</span>
                </div>
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'SUBSCRIPTIONS.PERIOD_END' | translate
                  }}</span>
                  <span class="text-sm text-text-secondary">{{
                    formatDate(sub.currentPeriodEnd)
                  }}</span>
                </div>
                @if (sub.cancelledAt) {
                  <div class="flex items-center justify-between px-6 py-3.5">
                    <span class="text-xs text-text-muted">{{
                      'SUBSCRIPTIONS.CANCELLED_AT' | translate
                    }}</span>
                    <span class="text-sm text-error">{{ formatDate(sub.cancelledAt) }}</span>
                  </div>
                }
                @if (sub.endedAt) {
                  <div class="flex items-center justify-between px-6 py-3.5">
                    <span class="text-xs text-text-muted">{{
                      'SUBSCRIPTIONS.ENDED_AT' | translate
                    }}</span>
                    <span class="text-sm text-text-secondary">{{ formatDate(sub.endedAt) }}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="flex flex-col gap-5">
            <!-- Customer info -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'SUBSCRIPTIONS.CUSTOMER' | translate }}
                </h3>
              </div>
              <div class="divide-y divide-border-light">
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'SUBSCRIPTIONS.USER_ID' | translate
                  }}</span>
                  <span
                    class="text-xs font-mono text-text-secondary bg-background px-2 py-0.5 rounded truncate max-w-[160px]"
                    >{{ sub.userId }}</span
                  >
                </div>
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">Stripe Customer</span>
                  <span
                    class="text-xs font-mono text-text-secondary bg-background px-2 py-0.5 rounded truncate max-w-[160px]"
                    >{{ sub.stripeCustomerId }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Dates -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'SUBSCRIPTIONS.DETAILS' | translate }}
                </h3>
              </div>
              <div class="divide-y divide-border-light">
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'SUBSCRIPTIONS.CREATED_AT' | translate
                  }}</span>
                  <span class="text-xs text-text-secondary">{{ formatDate(sub.createdAt) }}</span>
                </div>
                @if (sub.updatedAt) {
                  <div class="flex items-center justify-between px-6 py-3.5">
                    <span class="text-xs text-text-muted">{{
                      'SUBSCRIPTIONS.UPDATED_AT' | translate
                    }}</span>
                    <span class="text-xs text-text-secondary">{{ formatDate(sub.updatedAt) }}</span>
                  </div>
                }
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'SUBSCRIPTIONS.PRODUCT_ID' | translate
                  }}</span>
                  <span
                    class="text-xs font-mono text-text-secondary bg-background px-2 py-0.5 rounded truncate max-w-[160px]"
                    >{{ sub.productId }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }

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
export class SubscriptionDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  readonly auth = inject(AdminAuthService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  subscription = signal<Subscription | null>(null);
  loading = signal(true);
  showModal = signal(false);
  modalAction = signal<'cancel' | 'reactivate'>('cancel');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadSubscription(id);
  }

  loadSubscription(id: string) {
    this.api.get<Subscription>(`admin/payments/subscriptions/${id}`).subscribe({
      next: (sub) => {
        this.subscription.set(sub);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('SUBSCRIPTIONS.LOAD_FAILED'));
        this.router.navigate(['/subscriptions']);
      },
    });
  }

  confirmAction(action: 'cancel' | 'reactivate') {
    this.modalAction.set(action);
    this.showModal.set(true);
  }

  executeAction() {
    const sub = this.subscription();
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
          this.loadSubscription(sub.id);
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
