import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdminManagementService } from '../../../core/services/admin-management.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Admin, CreateAdminDto, UpdateAdminDto } from '../../../core/models/admin.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
  ],
  template: `
    <div>
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-text-primary">{{ 'ADMINS.TITLE' | translate }}</h1>
          <p class="text-sm text-text-secondary mt-1">{{ 'ADMINS.SUBTITLE' | translate }}</p>
        </div>
        <button
          (click)="openCreateModal()"
          class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium"
        >
          {{ 'ADMINS.NEW_ADMIN' | translate }}
        </button>
      </div>

      <!-- Loading -->
      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <!-- Table -->
        <div class="bg-surface rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.NAME' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.EMAIL' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.ROLE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.LAST_LOGIN' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (admin of admins(); track admin.id) {
                  <tr class="hover:bg-gray-50/50 border-b border-border-light">
                    <td class="px-6 py-4">
                      <span class="text-sm font-medium text-text-primary">
                        {{ admin.firstName }} {{ admin.lastName }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ admin.email }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [class]="
                          admin.role === 'super_admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        "
                      >
                        {{
                          admin.role === 'super_admin'
                            ? ('ADMINS.SUPER_ADMIN' | translate)
                            : ('ADMINS.COMMERCIAL' | translate)
                        }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge
                        [status]="admin.isActive ? 'active' : 'inactive'"
                        [label]="
                          admin.isActive
                            ? ('ADMINS.ACTIVE' | translate)
                            : ('ADMINS.INACTIVE' | translate)
                        "
                      />
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{
                        admin.lastLoginAt
                          ? formatDate(admin.lastLoginAt)
                          : ('ADMINS.NEVER' | translate)
                      }}
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button
                          (click)="toggleActive(admin)"
                          class="text-xs font-medium px-2.5 py-1 rounded-lg"
                          [class]="
                            admin.isActive
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          "
                        >
                          {{
                            admin.isActive
                              ? ('ADMINS.DEACTIVATE' | translate)
                              : ('ADMINS.ACTIVATE' | translate)
                          }}
                        </button>
                        <button
                          (click)="openEditModal(admin)"
                          class="text-sm text-primary hover:text-primary-hover"
                        >
                          {{ 'ADMINS.EDIT' | translate }}
                        </button>
                        <button
                          (click)="confirmDelete(admin)"
                          class="text-sm text-error hover:text-red-700"
                        >
                          {{ 'ADMINS.DELETE' | translate }}
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'ADMINS.NO_ADMINS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- Create Admin Modal -->
      @if (showCreateModal()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4">
            <h3 class="text-lg font-semibold text-text-primary mb-4">
              {{ 'ADMINS.NEW_ADMIN_TITLE' | translate }}
            </h3>
            <form [formGroup]="createForm" (ngSubmit)="createAdmin()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">{{
                    'ADMINS.FIRST_NAME' | translate
                  }}</label>
                  <input
                    formControlName="firstName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    [placeholder]="'ADMINS.FIRST_NAME_PLACEHOLDER' | translate"
                  />
                  @if (
                    createForm.get('firstName')?.touched && createForm.get('firstName')?.invalid
                  ) {
                    <p class="text-xs text-error mt-1">
                      {{ 'ADMINS.FIRST_NAME_REQUIRED' | translate }}
                    </p>
                  }
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">{{
                    'ADMINS.LAST_NAME' | translate
                  }}</label>
                  <input
                    formControlName="lastName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    [placeholder]="'ADMINS.LAST_NAME_PLACEHOLDER' | translate"
                  />
                  @if (createForm.get('lastName')?.touched && createForm.get('lastName')?.invalid) {
                    <p class="text-xs text-error mt-1">
                      {{ 'ADMINS.LAST_NAME_REQUIRED' | translate }}
                    </p>
                  }
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.EMAIL' | translate
                }}</label>
                <input
                  formControlName="email"
                  type="email"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  [placeholder]="'ADMINS.EMAIL_PLACEHOLDER' | translate"
                />
                @if (createForm.get('email')?.touched && createForm.get('email')?.invalid) {
                  <p class="text-xs text-error mt-1">{{ 'ADMINS.EMAIL_REQUIRED' | translate }}</p>
                }
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.PASSWORD' | translate
                }}</label>
                <input
                  formControlName="password"
                  type="password"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  [placeholder]="'ADMINS.PASSWORD_PLACEHOLDER' | translate"
                />
                @if (createForm.get('password')?.touched && createForm.get('password')?.invalid) {
                  <p class="text-xs text-error mt-1">{{ 'ADMINS.PASSWORD_MIN' | translate }}</p>
                }
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.ROLE' | translate
                }}</label>
                <select
                  formControlName="role"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="super_admin">{{ 'ADMINS.SUPER_ADMIN' | translate }}</option>
                  <option value="commercial">{{ 'ADMINS.COMMERCIAL' | translate }}</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="showCreateModal.set(false)"
                  class="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50"
                >
                  {{ 'ADMINS.CANCEL' | translate }}
                </button>
                <button
                  type="submit"
                  [disabled]="createForm.invalid || saving()"
                  class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {{
                    saving() ? ('ADMINS.CREATING' | translate) : ('ADMINS.CREATE_ADMIN' | translate)
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Edit Admin Modal -->
      @if (showEditModal()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4">
            <h3 class="text-lg font-semibold text-text-primary mb-4">
              {{ 'ADMINS.EDIT_ADMIN_TITLE' | translate }}
            </h3>
            <form [formGroup]="editForm" (ngSubmit)="updateAdmin()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">{{
                    'ADMINS.FIRST_NAME' | translate
                  }}</label>
                  <input
                    formControlName="firstName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  @if (editForm.get('firstName')?.touched && editForm.get('firstName')?.invalid) {
                    <p class="text-xs text-error mt-1">
                      {{ 'ADMINS.FIRST_NAME_REQUIRED' | translate }}
                    </p>
                  }
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">{{
                    'ADMINS.LAST_NAME' | translate
                  }}</label>
                  <input
                    formControlName="lastName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  @if (editForm.get('lastName')?.touched && editForm.get('lastName')?.invalid) {
                    <p class="text-xs text-error mt-1">
                      {{ 'ADMINS.LAST_NAME_REQUIRED' | translate }}
                    </p>
                  }
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.EMAIL' | translate
                }}</label>
                <input
                  type="email"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm bg-gray-50 text-text-muted cursor-not-allowed"
                  [value]="editingAdmin()?.email"
                  disabled
                />
                <p class="text-xs text-text-muted mt-1">
                  {{ 'ADMINS.EMAIL_READONLY' | translate }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.ROLE' | translate
                }}</label>
                <select
                  formControlName="role"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="super_admin">{{ 'ADMINS.SUPER_ADMIN' | translate }}</option>
                  <option value="commercial">{{ 'ADMINS.COMMERCIAL' | translate }}</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="showEditModal.set(false)"
                  class="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50"
                >
                  {{ 'ADMINS.CANCEL' | translate }}
                </button>
                <button
                  type="submit"
                  [disabled]="editForm.invalid || saving()"
                  class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {{
                    saving() ? ('ADMINS.CREATING' | translate) : ('ADMINS.SAVE_CHANGES' | translate)
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal -->
      <app-confirm-modal
        [open]="showDeleteModal()"
        [title]="'ADMINS.DELETE_ADMIN_TITLE' | translate"
        [message]="
          translate.instant('ADMINS.DELETE_CONFIRM', {
            name: (adminToDelete()?.firstName || '') + ' ' + (adminToDelete()?.lastName || ''),
          })
        "
        [confirmLabel]="'ADMINS.DELETE_BTN' | translate"
        variant="danger"
        (confirm)="deleteAdmin()"
        (cancel)="showDeleteModal.set(false)"
      />
    </div>
  `,
})
export class AdminListComponent implements OnInit {
  private readonly adminService = inject(AdminManagementService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  readonly translate = inject(TranslateService);

  admins = signal<Admin[]>([]);
  loading = signal(true);
  saving = signal(false);
  showCreateModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  editingAdmin = signal<Admin | null>(null);
  adminToDelete = signal<Admin | null>(null);

  createForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['super_admin' as 'super_admin' | 'commercial', Validators.required],
  });

  editForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: ['super_admin' as 'super_admin' | 'commercial', Validators.required],
  });

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.loading.set(true);
    this.adminService.getAdmins().subscribe({
      next: (admins) => {
        this.admins.set(admins);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('ADMINS.LOAD_FAILED'));
        this.loading.set(false);
      },
    });
  }

  openCreateModal() {
    this.createForm.reset({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      role: 'super_admin',
    });
    this.showCreateModal.set(true);
  }

  openEditModal(admin: Admin) {
    this.editingAdmin.set(admin);
    this.editForm.reset({
      firstName: admin.firstName,
      lastName: admin.lastName,
      role: admin.role,
    });
    this.showEditModal.set(true);
  }

  createAdmin() {
    if (this.createForm.invalid) return;
    this.saving.set(true);

    const dto: CreateAdminDto = this.createForm.getRawValue();

    this.adminService.createAdmin(dto).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('ADMINS.CREATED_SUCCESS'));
        this.showCreateModal.set(false);
        this.saving.set(false);
        this.loadAdmins();
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('ADMINS.CREATE_FAILED'),
        );
        this.saving.set(false);
      },
    });
  }

  updateAdmin() {
    const admin = this.editingAdmin();
    if (!admin || this.editForm.invalid) return;
    this.saving.set(true);

    const dto: UpdateAdminDto = this.editForm.getRawValue();

    this.adminService.updateAdmin(admin.id, dto).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('ADMINS.UPDATED_SUCCESS'));
        this.showEditModal.set(false);
        this.saving.set(false);
        this.loadAdmins();
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('ADMINS.UPDATE_FAILED'),
        );
        this.saving.set(false);
      },
    });
  }

  toggleActive(admin: Admin) {
    const dto: UpdateAdminDto = { isActive: !admin.isActive };
    this.adminService.updateAdmin(admin.id, dto).subscribe({
      next: () => {
        this.notifications.success(
          admin.isActive
            ? this.translate.instant('ADMINS.DEACTIVATED_SUCCESS')
            : this.translate.instant('ADMINS.ACTIVATED_SUCCESS'),
        );
        this.admins.update((list) =>
          list.map((a) => (a.id === admin.id ? { ...a, isActive: !a.isActive } : a)),
        );
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('ADMINS.STATUS_FAILED'),
        );
      },
    });
  }

  confirmDelete(admin: Admin) {
    this.adminToDelete.set(admin);
    this.showDeleteModal.set(true);
  }

  deleteAdmin() {
    const admin = this.adminToDelete();
    if (!admin) return;

    this.adminService.deleteAdmin(admin.id).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('ADMINS.DELETED_SUCCESS'));
        this.admins.update((list) => list.filter((a) => a.id !== admin.id));
        this.showDeleteModal.set(false);
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('ADMINS.DELETE_FAILED'),
        );
        this.showDeleteModal.set(false);
      },
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
