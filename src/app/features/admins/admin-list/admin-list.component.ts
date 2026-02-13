import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorMagnifyingGlass,
  phosphorFunnelSimple,
  phosphorArrowsClockwise,
  phosphorPencilSimple,
  phosphorTrash,
  phosphorShieldCheck,
  phosphorToggleLeft,
  phosphorToggleRight,
} from '@ng-icons/phosphor-icons/regular';
import { AdminManagementService } from '../../../core/services/admin-management.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Admin, CreateAdminDto, UpdateAdminDto } from '../../../core/models/admin.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { KpiCardComponent } from '../../../shared/components/kpi-card/kpi-card.component';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    NgIconComponent,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
    KpiCardComponent,
  ],
  viewProviders: [
    provideIcons({
      phosphorMagnifyingGlass,
      phosphorFunnelSimple,
      phosphorArrowsClockwise,
      phosphorPencilSimple,
      phosphorTrash,
      phosphorShieldCheck,
      phosphorToggleLeft,
      phosphorToggleRight,
    }),
  ],
  template: `
    <div>
      <!-- KPI Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <app-kpi-card
          [value]="totalAdmins()"
          [label]="'ADMINS.KPI_TOTAL' | translate"
          [iconPath]="'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75'"
          iconBgClass="bg-primary-light"
          iconClass="text-primary"
        />
        <app-kpi-card
          [value]="superAdminCount()"
          [label]="'ADMINS.KPI_SUPER_ADMIN' | translate"
          [iconPath]="'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'"
          iconBgClass="bg-warning-light"
          iconClass="text-warning"
        />
        <app-kpi-card
          [value]="commercialCount()"
          [label]="'ADMINS.KPI_COMMERCIAL' | translate"
          [iconPath]="'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M3 8a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z'"
          iconBgClass="bg-info-light"
          iconClass="text-info"
        />
        <app-kpi-card
          [value]="activeAdminCount()"
          [label]="'ADMINS.KPI_ACTIVE' | translate"
          [iconPath]="'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'"
          iconBgClass="bg-success-light"
          iconClass="text-success"
        />
      </div>

      <!-- Search + Filter + Actions Bar -->
      <div class="bg-surface rounded-xl border border-border-light shadow-sm p-4 mb-6">
        <div class="flex items-center justify-between gap-4">
          <div class="relative">
            <ng-icon
              name="phosphorMagnifyingGlass"
              size="18"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              [placeholder]="'ADMINS.SEARCH_PLACEHOLDER' | translate"
              [ngModel]="searchTerm()"
              (ngModelChange)="searchTerm.set($event)"
              class="pl-10 pr-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-72"
            />
          </div>
          <div class="flex items-center gap-2">
            <button
              (click)="toggleFilter()"
              class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors"
              [class]="
                showFilter()
                  ? 'bg-primary-light text-primary border-primary'
                  : 'text-text-secondary border-border hover:bg-gray-50'
              "
            >
              <ng-icon name="phosphorFunnelSimple" size="18" />
              {{ 'ADMINS.FILTER' | translate }}
            </button>
            <button
              (click)="refresh()"
              class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ng-icon name="phosphorArrowsClockwise" size="18" />
              {{ 'ADMINS.REFRESH' | translate }}
            </button>
            <button
              (click)="openCreateModal()"
              class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              {{ 'ADMINS.NEW_ADMIN' | translate }}
            </button>
          </div>
        </div>

        @if (showFilter()) {
          <div class="mt-4 pt-4 border-t border-border-light flex items-center gap-3">
            <span class="text-sm text-text-secondary font-medium"
              >{{ 'ADMINS.ROLE' | translate }}:</span
            >
            @for (opt of roleOptions; track opt.value) {
              <button
                (click)="filterByRole(opt.value)"
                class="px-3 py-1 text-xs font-medium rounded-full border transition-colors"
                [class]="
                  roleFilter() === opt.value
                    ? opt.activeClass
                    : 'border-border text-text-secondary hover:bg-gray-50'
                "
              >
                {{ opt.label | translate }}
              </button>
            }
          </div>
        }
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
                @for (admin of filteredAdmins(); track admin.id) {
                  <tr class="hover:bg-gray-50/50 transition-colors">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0"
                          [style.background-color]="
                            getAvatarColor(admin.firstName + admin.lastName)
                          "
                        >
                          {{ getInitials(admin.firstName, admin.lastName) }}
                        </div>
                        <div>
                          <span class="text-sm font-medium text-text-primary">
                            {{ admin.firstName }} {{ admin.lastName }}
                          </span>
                          <div class="text-xs text-text-muted">ID: {{ getShortId(admin.id) }}</div>
                        </div>
                      </div>
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
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-end gap-1">
                        <button
                          (click)="toggleActive(admin)"
                          class="p-2 rounded-lg transition-colors"
                          [class]="
                            admin.isActive
                              ? 'text-success hover:text-red-500 hover:bg-red-50'
                              : 'text-text-muted hover:text-success hover:bg-success-light'
                          "
                          [title]="
                            admin.isActive
                              ? ('ADMINS.DEACTIVATE' | translate)
                              : ('ADMINS.ACTIVATE' | translate)
                          "
                        >
                          <ng-icon
                            [name]="admin.isActive ? 'phosphorToggleRight' : 'phosphorToggleLeft'"
                            size="20"
                          />
                        </button>
                        <button
                          (click)="openEditModal(admin)"
                          class="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary-light transition-colors"
                          [title]="'ADMINS.EDIT' | translate"
                        >
                          <ng-icon name="phosphorPencilSimple" size="18" />
                        </button>
                        <button
                          (click)="confirmDelete(admin)"
                          class="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error-light transition-colors"
                          [title]="'ADMINS.DELETE' | translate"
                        >
                          <ng-icon name="phosphorTrash" size="18" />
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
  showFilter = signal(false);
  searchTerm = signal('');
  roleFilter = signal('');

  totalAdmins = computed(() => this.admins().length);
  superAdminCount = computed(() => this.admins().filter((a) => a.role === 'super_admin').length);
  commercialCount = computed(() => this.admins().filter((a) => a.role === 'commercial').length);
  activeAdminCount = computed(() => this.admins().filter((a) => a.isActive).length);

  filteredAdmins = computed(() => {
    let list = this.admins();
    const term = this.searchTerm().toLowerCase();
    if (term) {
      list = list.filter(
        (a) =>
          a.firstName.toLowerCase().includes(term) ||
          a.lastName.toLowerCase().includes(term) ||
          a.email.toLowerCase().includes(term),
      );
    }
    const role = this.roleFilter();
    if (role) {
      list = list.filter((a) => a.role === role);
    }
    return list;
  });

  readonly roleOptions = [
    { value: '', label: 'ADMINS.ALL', activeClass: 'bg-primary text-white border-primary' },
    {
      value: 'super_admin',
      label: 'ADMINS.SUPER_ADMIN',
      activeClass: 'bg-warning text-white border-warning',
    },
    {
      value: 'commercial',
      label: 'ADMINS.COMMERCIAL',
      activeClass: 'bg-info text-white border-info',
    },
  ];

  private readonly avatarColors = [
    '#6366f1',
    '#8b5cf6',
    '#ec4899',
    '#f43f5e',
    '#f97316',
    '#eab308',
    '#22c55e',
    '#14b8a6',
    '#06b6d4',
    '#3b82f6',
  ];

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

  toggleFilter() {
    this.showFilter.update((v) => !v);
  }

  filterByRole(role: string) {
    this.roleFilter.set(role);
  }

  refresh() {
    this.loadAdmins();
  }

  getInitials(firstName: string, lastName: string): string {
    return (firstName?.charAt(0) || '') + (lastName?.charAt(0) || '');
  }

  getShortId(id: string): string {
    return id?.substring(0, 8) || '';
  }

  getAvatarColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return this.avatarColors[Math.abs(hash) % this.avatarColors.length];
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
