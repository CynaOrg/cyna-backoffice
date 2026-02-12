import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { User } from '../../../core/models/user.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [RouterLink, TranslateModule, StatusBadgeComponent, LoadingSpinnerComponent],
  template: `
    <div>
      @if (loading()) {
        <app-loading-spinner />
      } @else if (user()) {
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <a routerLink="/customers" class="p-2 rounded-lg hover:bg-gray-100 text-text-muted">
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
                {{ user()!.firstName }} {{ user()!.lastName }}
              </h1>
              <p class="text-sm text-text-secondary">{{ user()!.email }}</p>
            </div>
          </div>
          <button
            (click)="toggleActive()"
            [disabled]="toggling()"
            class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
            [class]="
              user()!.isActive
                ? 'border-error text-error hover:bg-error-light'
                : 'border-success text-success hover:bg-success-light'
            "
          >
            {{
              toggling()
                ? ('CUSTOMERS.UPDATING' | translate)
                : user()!.isActive
                  ? ('CUSTOMERS.DEACTIVATE' | translate)
                  : ('CUSTOMERS.ACTIVATE' | translate)
            }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">{{ 'CUSTOMERS.PROFILE' | translate }}</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.STATUS' | translate }}</span
                ><app-status-badge [status]="user()!.isActive ? 'active' : 'inactive'" />
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.VERIFIED' | translate }}</span
                ><app-status-badge
                  [status]="user()!.isVerified ? 'verified' : 'pending'"
                  [label]="
                    user()!.isVerified
                      ? ('CUSTOMERS.YES' | translate)
                      : ('CUSTOMERS.NO' | translate)
                  "
                />
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.LANGUAGE' | translate }}</span
                ><span>{{ user()!.preferredLanguage }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.JOINED' | translate }}</span
                ><span>{{ formatDate(user()!.createdAt) }}</span>
              </div>
            </div>
          </div>
          <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">{{ 'CUSTOMERS.BUSINESS' | translate }}</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.COMPANY' | translate }}</span
                ><span>{{ user()!.companyName || ('CUSTOMERS.NA' | translate) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.VAT_NUMBER' | translate }}</span
                ><span>{{ user()!.vatNumber || ('CUSTOMERS.NA' | translate) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.STRIPE_CUSTOMER' | translate }}</span
                ><span class="font-mono text-xs">{{
                  user()!.stripeCustomerId || ('CUSTOMERS.NA' | translate)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class CustomerDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  user = signal<User | null>(null);
  loading = signal(true);
  toggling = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadUser(id);
  }

  loadUser(id: string) {
    this.api.get<User>(`admin/users/${id}`).subscribe({
      next: (u) => {
        this.user.set(u);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('CUSTOMERS.NOT_FOUND'));
        this.router.navigate(['/customers']);
      },
    });
  }

  toggleActive() {
    const u = this.user();
    if (!u) return;
    this.toggling.set(true);
    this.api.patch<any, any>(`admin/users/${u.id}/status`, { isActive: !u.isActive }).subscribe({
      next: () => {
        this.user.update((usr) => (usr ? { ...usr, isActive: !usr.isActive } : null));
        this.notifications.success(
          !u.isActive
            ? this.translate.instant('CUSTOMERS.ACTIVATED')
            : this.translate.instant('CUSTOMERS.DEACTIVATED'),
        );
        this.toggling.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('CUSTOMERS.UPDATE_FAILED'));
        this.toggling.set(false);
      },
    });
  }

  formatDate(d: string) {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
