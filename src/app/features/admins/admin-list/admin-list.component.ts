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
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Admin, CreateAdminDto, UpdateAdminDto } from '../../../core/models/admin.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { TableSkeletonComponent } from '../../../shared/components/table-skeleton/table-skeleton.component';
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
    TableSkeletonComponent,
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
  templateUrl: './admin-list.component.html',
})
export class AdminListComponent implements OnInit {
  private readonly adminService = inject(AdminManagementService);
  private readonly authService = inject(AdminAuthService);
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
  // Inline error surfaces ADM-2: 409 (email taken) and 400 (delete self)
  // were previously swallowed because the modal closed unconditionally.
  createError = signal('');
  editError = signal('');
  deleteError = signal('');

  // ADM-1: hide self-delete button by reading the currently authenticated admin id.
  currentAdminId = computed(() => this.authService.admin()?.id ?? null);

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
    // ADM-4: include isActive so super-admins can reactivate via the edit form,
    // not just the row toggle.
    isActive: [true, Validators.required],
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
    this.createError.set('');
    this.showCreateModal.set(true);
  }

  openEditModal(admin: Admin) {
    this.editingAdmin.set(admin);
    this.editForm.reset({
      firstName: admin.firstName,
      lastName: admin.lastName,
      role: admin.role,
      isActive: admin.isActive,
    });
    this.editError.set('');
    this.showEditModal.set(true);
  }

  createAdmin() {
    if (this.createForm.invalid) return;
    this.saving.set(true);
    this.createError.set('');

    const dto: CreateAdminDto = this.createForm.getRawValue();

    this.adminService.createAdmin(dto).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('ADMINS.CREATED_SUCCESS'));
        this.showCreateModal.set(false);
        this.saving.set(false);
        this.loadAdmins();
      },
      error: (err) => {
        // ADM-2: keep the modal open and show the actual server reason (e.g.
        // 409 "email already taken") inline rather than only as a toast.
        const message = err?.error?.message || this.translate.instant('ADMINS.CREATE_FAILED');
        this.createError.set(message);
        this.saving.set(false);
      },
    });
  }

  updateAdmin() {
    const admin = this.editingAdmin();
    if (!admin || this.editForm.invalid) return;
    this.saving.set(true);
    this.editError.set('');

    const dto: UpdateAdminDto = this.editForm.getRawValue();

    this.adminService.updateAdmin(admin.id, dto).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('ADMINS.UPDATED_SUCCESS'));
        this.showEditModal.set(false);
        this.saving.set(false);
        this.loadAdmins();
      },
      error: (err) => {
        const message = err?.error?.message || this.translate.instant('ADMINS.UPDATE_FAILED');
        this.editError.set(message);
        this.saving.set(false);
      },
    });
  }

  toggleActive(admin: Admin) {
    if (admin.id === this.currentAdminId()) return;
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
    this.deleteError.set('');
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
        // ADM-2: keep the modal open on 400 (e.g. "cannot delete self") /
        // 409 so the user actually sees what went wrong.
        const message = err?.error?.message || this.translate.instant('ADMINS.DELETE_FAILED');
        this.deleteError.set(message);
        this.notifications.error(message);
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
