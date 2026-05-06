import { Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorPencilSimple,
  phosphorCheck,
  phosphorX,
  phosphorLockKey,
  phosphorShieldCheck,
  phosphorClock,
  phosphorCalendarBlank,
} from '@ng-icons/phosphor-icons/regular';
import { AdminAuthService } from '../../core/auth/services/admin-auth.service';
import { AdminManagementService } from '../../core/services/admin-management.service';
import { NotificationService } from '../../core/services/notification.service';
import { Admin, UpdateAdminDto } from '../../core/models/admin.model';
import { LanguageService } from '../../core/services/language.service';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

const EM_DASH = '—';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [TranslateModule, ReactiveFormsModule, NgIconComponent, StatusBadgeComponent],
  viewProviders: [
    provideIcons({
      phosphorPencilSimple,
      phosphorCheck,
      phosphorX,
      phosphorLockKey,
      phosphorShieldCheck,
      phosphorClock,
      phosphorCalendarBlank,
    }),
  ],
  template: `
    @if (admin(); as a) {
      <div class="mx-auto w-full max-w-6xl">
        <!-- ========== HERO IDENTITY CARD ========== -->
        <section class="mb-6 rounded-xl border border-border-light bg-surface shadow-sm">
          <div class="flex flex-col items-start gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
            <!-- Avatar -->
            <div
              class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-hover text-2xl font-semibold text-white shadow-md ring-4 ring-surface sm:h-24 sm:w-24 sm:text-3xl"
            >
              {{ initials(a) }}
            </div>

            <!-- Identity -->
            <div class="min-w-0 flex-1">
              <h2 class="m-0 text-xl font-bold text-text-primary sm:text-2xl">
                {{ a.firstName }} {{ a.lastName }}
              </h2>
              <p class="mt-1 truncate text-sm text-text-secondary sm:text-base">
                {{ a.email }}
              </p>

              <div class="mt-3 flex flex-wrap items-center gap-2">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                  [class]="
                    a.role === 'super_admin'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  "
                >
                  {{ roleLabel(a.role) }}
                </span>
                @if (a.isActive !== undefined) {
                  <app-status-badge [status]="a.isActive ? 'active' : 'inactive'" />
                }
              </div>
            </div>
          </div>
        </section>

        <!-- ========== RESPONSIVE GRID ========== -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <!-- ===== PROFILE CARD (left, 2/3 on lg+) ===== -->
          <section
            class="rounded-xl border border-border-light bg-surface shadow-sm lg:col-span-2"
          >
            <div class="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
              <h3 class="m-0 text-base font-semibold text-text-primary">
                {{ 'ACCOUNT.PROFILE' | translate }}
              </h3>
              @if (!editing()) {
                <button
                  type="button"
                  (click)="startEditing(a)"
                  class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-transparent px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-background hover:text-text-primary cursor-pointer"
                >
                  <ng-icon name="phosphorPencilSimple" size="16" />
                  <span>{{ 'ACCOUNT.EDIT' | translate }}</span>
                </button>
              }
            </div>

            <div class="border-t border-border-light px-5 py-5 sm:px-6">
              @if (editing()) {
                <!-- Edit mode -->
                <form [formGroup]="form" (ngSubmit)="save(a)" class="space-y-4">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        for="firstName"
                        class="mb-1.5 block text-xs font-medium text-text-secondary"
                      >
                        {{ 'ACCOUNT.FIRST_NAME' | translate }}
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        formControlName="firstName"
                        class="w-full rounded-lg border border-border bg-input-bg px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      @if (form.controls.firstName.touched && form.controls.firstName.invalid) {
                        <p class="mt-1 text-xs text-error">
                          {{ 'ACCOUNT.FIRST_NAME_REQUIRED' | translate }}
                        </p>
                      }
                    </div>
                    <div>
                      <label
                        for="lastName"
                        class="mb-1.5 block text-xs font-medium text-text-secondary"
                      >
                        {{ 'ACCOUNT.LAST_NAME' | translate }}
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        formControlName="lastName"
                        class="w-full rounded-lg border border-border bg-input-bg px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      @if (form.controls.lastName.touched && form.controls.lastName.invalid) {
                        <p class="mt-1 text-xs text-error">
                          {{ 'ACCOUNT.LAST_NAME_REQUIRED' | translate }}
                        </p>
                      }
                    </div>
                  </div>

                  <div>
                    <label class="mb-1.5 block text-xs font-medium text-text-secondary">
                      {{ 'ACCOUNT.EMAIL' | translate }}
                    </label>
                    <input
                      type="email"
                      [value]="a.email"
                      disabled
                      class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-muted cursor-not-allowed"
                    />
                    <p class="mt-1 text-xs text-text-muted">
                      {{ 'ACCOUNT.EMAIL_READONLY' | translate }}
                    </p>
                  </div>

                  @if (formError()) {
                    <p
                      class="rounded-lg border border-error/20 bg-error-light px-3 py-2 text-sm text-error"
                    >
                      {{ formError() }}
                    </p>
                  }

                  <div class="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      (click)="cancelEditing()"
                      [disabled]="saving()"
                      class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-transparent px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-background disabled:opacity-60 cursor-pointer"
                    >
                      <ng-icon name="phosphorX" size="16" />
                      <span>{{ 'ACCOUNT.CANCEL' | translate }}</span>
                    </button>
                    <button
                      type="submit"
                      [disabled]="form.invalid || saving() || !form.dirty"
                      class="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60 cursor-pointer"
                    >
                      <ng-icon name="phosphorCheck" size="16" />
                      <span>{{
                        saving() ? ('ACCOUNT.SAVING' | translate) : ('ACCOUNT.SAVE' | translate)
                      }}</span>
                    </button>
                  </div>
                </form>
              } @else {
                <!-- View mode -->
                <dl class="divide-y divide-border-light">
                  <div class="flex flex-col gap-1 py-3 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <dt class="text-xs font-medium uppercase tracking-wide text-text-muted sm:text-sm sm:normal-case sm:tracking-normal sm:text-text-secondary">
                      {{ 'ACCOUNT.FIRST_NAME' | translate }}
                    </dt>
                    <dd class="text-sm text-text-primary sm:text-right">{{ a.firstName }}</dd>
                  </div>
                  <div class="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <dt class="text-xs font-medium uppercase tracking-wide text-text-muted sm:text-sm sm:normal-case sm:tracking-normal sm:text-text-secondary">
                      {{ 'ACCOUNT.LAST_NAME' | translate }}
                    </dt>
                    <dd class="text-sm text-text-primary sm:text-right">{{ a.lastName }}</dd>
                  </div>
                  <div class="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <dt class="text-xs font-medium uppercase tracking-wide text-text-muted sm:text-sm sm:normal-case sm:tracking-normal sm:text-text-secondary">
                      {{ 'ACCOUNT.EMAIL' | translate }}
                    </dt>
                    <dd class="text-sm text-text-primary break-all sm:text-right">{{ a.email }}</dd>
                  </div>
                  <div class="flex flex-col gap-1 py-3 last:pb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <dt class="text-xs font-medium uppercase tracking-wide text-text-muted sm:text-sm sm:normal-case sm:tracking-normal sm:text-text-secondary">
                      {{ 'ACCOUNT.ROLE' | translate }}
                    </dt>
                    <dd class="text-sm text-text-primary sm:text-right">{{ roleLabel(a.role) }}</dd>
                  </div>
                </dl>
              }
            </div>
          </section>

          <!-- ===== RIGHT COLUMN: ACTIVITY + SECURITY ===== -->
          <div class="space-y-6">
            <!-- Activity card -->
            <section class="rounded-xl border border-border-light bg-surface shadow-sm">
              <div class="px-5 py-4 sm:px-6">
                <h3 class="m-0 text-base font-semibold text-text-primary">
                  {{ 'ACCOUNT.ACTIVITY' | translate }}
                </h3>
              </div>
              <div class="border-t border-border-light px-5 py-4 sm:px-6">
                <ul class="space-y-4">
                  <li class="flex items-start gap-3">
                    <span
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary"
                    >
                      <ng-icon name="phosphorCalendarBlank" size="18" />
                    </span>
                    <div class="min-w-0">
                      <p class="text-xs font-medium text-text-muted">
                        {{ 'ACCOUNT.MEMBER_SINCE' | translate }}
                      </p>
                      <p class="mt-0.5 text-sm font-medium text-text-primary">
                        {{ memberSince() }}
                      </p>
                    </div>
                  </li>
                  <li class="flex items-start gap-3">
                    <span
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-success-light text-success"
                    >
                      <ng-icon name="phosphorClock" size="18" />
                    </span>
                    <div class="min-w-0">
                      <p class="text-xs font-medium text-text-muted">
                        {{ 'ACCOUNT.LAST_LOGIN' | translate }}
                      </p>
                      <p class="mt-0.5 text-sm font-medium text-text-primary">
                        {{ lastLogin() }}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <!-- Security card (preview structure, controls disabled) -->
            <section class="rounded-xl border border-border-light bg-surface shadow-sm">
              <div class="px-5 py-4 sm:px-6">
                <h3 class="m-0 text-base font-semibold text-text-primary">
                  {{ 'ACCOUNT.SECURITY' | translate }}
                </h3>
              </div>
              <div class="border-t border-border-light divide-y divide-border-light">
                <!-- Password row -->
                <div class="flex items-center gap-3 px-5 py-4 sm:px-6">
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background text-text-secondary"
                  >
                    <ng-icon name="phosphorLockKey" size="18" />
                  </span>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <p class="m-0 text-sm font-medium text-text-primary">
                        {{ 'ACCOUNT.SECURITY_PASSWORD' | translate }}
                      </p>
                      <span
                        class="inline-flex items-center rounded-full bg-warning-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning"
                      >
                        {{ 'ACCOUNT.COMING_SOON_BADGE' | translate }}
                      </span>
                    </div>
                    <p class="m-0 mt-0.5 text-xs text-text-muted">••••••••••</p>
                  </div>
                  <button
                    type="button"
                    disabled
                    class="rounded-lg border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-text-muted opacity-60 cursor-not-allowed"
                  >
                    {{ 'ACCOUNT.EDIT' | translate }}
                  </button>
                </div>

                <!-- 2FA row -->
                <div class="flex items-center gap-3 px-5 py-4 sm:px-6">
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background text-text-secondary"
                  >
                    <ng-icon name="phosphorShieldCheck" size="18" />
                  </span>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <p class="m-0 text-sm font-medium text-text-primary">
                        {{ 'ACCOUNT.SECURITY_2FA' | translate }}
                      </p>
                      <span
                        class="inline-flex items-center rounded-full bg-warning-light px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning"
                      >
                        {{ 'ACCOUNT.COMING_SOON_BADGE' | translate }}
                      </span>
                    </div>
                    <p class="m-0 mt-0.5 text-xs text-text-muted">
                      {{ 'ACCOUNT.SECURITY_2FA_DISABLED' | translate }}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled
                    class="rounded-lg border border-border bg-transparent px-3 py-1.5 text-xs font-medium text-text-muted opacity-60 cursor-not-allowed"
                  >
                    {{ 'ACCOUNT.ACTIVATE' | translate }}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    }
  `,
})
export class AccountComponent {
  private readonly auth = inject(AdminAuthService);
  private readonly admins = inject(AdminManagementService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(LanguageService);
  private readonly fb = inject(FormBuilder);

  readonly admin = computed<Admin | null>(() => this.auth.admin());

  readonly editing = signal(false);
  readonly saving = signal(false);
  readonly formError = signal('');

  readonly form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });

  readonly memberSince = computed<string>(() => {
    const created = this.admin()?.createdAt;
    if (!created) return EM_DASH;
    return this.formatLongDate(created);
  });

  readonly lastLogin = computed<string>(() => {
    const a = this.admin();
    if (!a) return EM_DASH;
    if (a.lastLoginAt === undefined) return EM_DASH;
    if (a.lastLoginAt === null) return this.translate.instant('ACCOUNT.NEVER');
    return this.formatLongDateTime(a.lastLoginAt);
  });

  initials(a: Admin): string {
    return ((a.firstName?.charAt(0) ?? '') + (a.lastName?.charAt(0) ?? '')).toUpperCase();
  }

  roleLabel(role: Admin['role']): string {
    return role === 'super_admin'
      ? this.translate.instant('ACCOUNT.ROLE_SUPER_ADMIN')
      : this.translate.instant('ACCOUNT.ROLE_COMMERCIAL');
  }

  startEditing(a: Admin): void {
    // reset() also clears the dirty flag — Save stays disabled until the
    // user actually modifies firstName or lastName.
    this.form.reset({ firstName: a.firstName ?? '', lastName: a.lastName ?? '' });
    this.formError.set('');
    this.editing.set(true);
  }

  cancelEditing(): void {
    this.editing.set(false);
    this.formError.set('');
  }

  save(a: Admin): void {
    if (this.form.invalid || this.saving()) return;
    const dto: UpdateAdminDto = this.form.getRawValue();
    this.saving.set(true);
    this.formError.set('');

    this.admins.updateAdmin(a.id, dto).subscribe({
      next: () => {
        // Refresh the auth-level admin signal from /me so the hero card and
        // the topbar greeting reflect the new name without a manual reload.
        this.auth.fetchMe().subscribe({
          next: () => {
            this.notifications.success(this.translate.instant('ACCOUNT.UPDATED_SUCCESS'));
            this.editing.set(false);
            this.saving.set(false);
          },
          error: () => {
            // Save succeeded server-side; only the local refresh failed.
            this.notifications.success(this.translate.instant('ACCOUNT.UPDATED_SUCCESS'));
            this.editing.set(false);
            this.saving.set(false);
          },
        });
      },
      error: (err) => {
        const message =
          err?.error?.message || this.translate.instant('ACCOUNT.UPDATE_FAILED');
        this.formError.set(message);
        this.saving.set(false);
      },
    });
  }

  private formatLongDate(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return EM_DASH;
    return new Intl.DateTimeFormat(this.language.current(), { dateStyle: 'long' }).format(date);
  }

  private formatLongDateTime(iso: string): string {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return EM_DASH;
    return new Intl.DateTimeFormat(this.language.current(), {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(date);
  }
}
