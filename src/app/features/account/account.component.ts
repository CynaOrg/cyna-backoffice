import { Component, computed, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '../../core/auth/services/admin-auth.service';
import { Admin } from '../../core/models/admin.model';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [TranslateModule, StatusBadgeComponent],
  template: `
    <div class="max-w-2xl">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary">
          {{ 'ACCOUNT.TITLE' | translate }}
        </h1>
        <p class="text-sm text-text-secondary mt-1">
          {{ 'ACCOUNT.SUBTITLE' | translate }}
        </p>
      </div>

      @if (admin(); as a) {
        <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6 mb-6">
          <div class="flex items-center gap-4 mb-6 pb-6 border-b border-border-light">
            <div
              class="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-lg font-semibold"
            >
              {{ initials(a) }}
            </div>
            <div>
              <p class="text-base font-semibold text-text-primary">
                {{ a.firstName }} {{ a.lastName }}
              </p>
              <p class="text-sm text-text-muted">{{ a.email }}</p>
            </div>
          </div>

          <h3 class="text-sm font-semibold text-text-primary mb-3">
            {{ 'ACCOUNT.PROFILE' | translate }}
          </h3>
          <dl class="space-y-3 text-sm">
            <div class="flex justify-between gap-4">
              <dt class="text-text-muted">{{ 'ACCOUNT.FULL_NAME' | translate }}</dt>
              <dd class="text-text-primary text-right">{{ a.firstName }} {{ a.lastName }}</dd>
            </div>
            <div class="flex justify-between gap-4">
              <dt class="text-text-muted">{{ 'ACCOUNT.EMAIL' | translate }}</dt>
              <dd class="text-text-primary text-right">{{ a.email }}</dd>
            </div>
            <div class="flex justify-between gap-4 items-center">
              <dt class="text-text-muted">{{ 'ACCOUNT.ROLE' | translate }}</dt>
              <dd class="text-text-primary text-right">{{ roleLabel(a.role) }}</dd>
            </div>
            <div class="flex justify-between gap-4 items-center">
              <dt class="text-text-muted">{{ 'ACCOUNT.STATUS' | translate }}</dt>
              <dd>
                <app-status-badge [status]="a.isActive ? 'active' : 'inactive'" />
              </dd>
            </div>
            <div class="flex justify-between gap-4">
              <dt class="text-text-muted">{{ 'ACCOUNT.MEMBER_SINCE' | translate }}</dt>
              <dd class="text-text-primary text-right">{{ formatDate(a.createdAt) }}</dd>
            </div>
            <div class="flex justify-between gap-4">
              <dt class="text-text-muted">{{ 'ACCOUNT.LAST_LOGIN' | translate }}</dt>
              <dd class="text-text-primary text-right">
                {{ a.lastLoginAt ? formatDate(a.lastLoginAt) : ('ACCOUNT.NEVER' | translate) }}
              </dd>
            </div>
          </dl>
        </div>

        <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6 mb-6">
          <h3 class="text-sm font-semibold text-text-primary mb-2">
            {{ 'ACCOUNT.SECURITY' | translate }}
          </h3>
          <!-- TODO(AUTH-1): wire password change + 2FA management UI when backend
               endpoints are exposed for the authenticated admin. -->
          <p class="text-sm text-text-muted">{{ 'ACCOUNT.SECURITY_TODO' | translate }}</p>
        </div>

        <button
          type="button"
          (click)="signOut()"
          class="px-4 py-2 text-sm font-medium border border-error text-error rounded-lg hover:bg-error-light transition-colors"
        >
          {{ 'ACCOUNT.SIGN_OUT' | translate }}
        </button>
      }
    </div>
  `,
})
export class AccountComponent {
  private readonly auth = inject(AdminAuthService);
  private readonly translate = inject(TranslateService);

  readonly admin = computed<Admin | null>(() => this.auth.admin());

  signOut(): void {
    this.auth.logout();
  }

  initials(a: Admin): string {
    return ((a.firstName?.charAt(0) ?? '') + (a.lastName?.charAt(0) ?? '')).toUpperCase();
  }

  roleLabel(role: Admin['role']): string {
    return role === 'super_admin'
      ? this.translate.instant('ACCOUNT.ROLE_SUPER_ADMIN')
      : this.translate.instant('ACCOUNT.ROLE_COMMERCIAL');
  }

  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
