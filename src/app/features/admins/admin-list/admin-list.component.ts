import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
  ],
  template: `
    <div>
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
            Admins
          </h1>
          <p class="text-sm text-text-secondary mt-1">Manage administrator accounts</p>
        </div>
        <button
          (click)="openCreateModal()"
          class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium"
        >
          + New Admin
        </button>
      </div>

      <!-- Loading -->
      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <!-- Table -->
        <div class="bg-card-bg rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Last Login
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    Actions
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
                        {{ admin.role === 'super_admin' ? 'Super Admin' : 'Commercial' }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge
                        [status]="admin.isActive ? 'active' : 'inactive'"
                        [label]="admin.isActive ? 'Active' : 'Inactive'"
                      />
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ admin.lastLoginAt ? formatDate(admin.lastLoginAt) : 'Never' }}
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
                          {{ admin.isActive ? 'Deactivate' : 'Activate' }}
                        </button>
                        <button
                          (click)="openEditModal(admin)"
                          class="text-sm text-primary hover:text-primary-dark"
                        >
                          Edit
                        </button>
                        <button
                          (click)="confirmDelete(admin)"
                          class="text-sm text-danger hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-text-muted text-sm">
                      No administrators found
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
            <h3
              class="text-lg font-semibold text-text-primary font-[family-name:var(--font-heading)] mb-4"
            >
              New Admin
            </h3>
            <form [formGroup]="createForm" (ngSubmit)="createAdmin()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">First Name</label>
                  <input
                    formControlName="firstName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="John"
                  />
                  @if (
                    createForm.get('firstName')?.touched && createForm.get('firstName')?.invalid
                  ) {
                    <p class="text-xs text-danger mt-1">First name is required</p>
                  }
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">Last Name</label>
                  <input
                    formControlName="lastName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Doe"
                  />
                  @if (createForm.get('lastName')?.touched && createForm.get('lastName')?.invalid) {
                    <p class="text-xs text-danger mt-1">Last name is required</p>
                  }
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input
                  formControlName="email"
                  type="email"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="admin@cyna.com"
                />
                @if (createForm.get('email')?.touched && createForm.get('email')?.invalid) {
                  <p class="text-xs text-danger mt-1">Valid email is required</p>
                }
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Password</label>
                <input
                  formControlName="password"
                  type="password"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Min. 8 characters"
                />
                @if (createForm.get('password')?.touched && createForm.get('password')?.invalid) {
                  <p class="text-xs text-danger mt-1">Password must be at least 8 characters</p>
                }
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Role</label>
                <select
                  formControlName="role"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="showCreateModal.set(false)"
                  class="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  [disabled]="createForm.invalid || saving()"
                  class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {{ saving() ? 'Creating...' : 'Create Admin' }}
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
            <h3
              class="text-lg font-semibold text-text-primary font-[family-name:var(--font-heading)] mb-4"
            >
              Edit Admin
            </h3>
            <form [formGroup]="editForm" (ngSubmit)="updateAdmin()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">First Name</label>
                  <input
                    formControlName="firstName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  @if (editForm.get('firstName')?.touched && editForm.get('firstName')?.invalid) {
                    <p class="text-xs text-danger mt-1">First name is required</p>
                  }
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">Last Name</label>
                  <input
                    formControlName="lastName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  @if (editForm.get('lastName')?.touched && editForm.get('lastName')?.invalid) {
                    <p class="text-xs text-danger mt-1">Last name is required</p>
                  }
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Email</label>
                <input
                  type="email"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm bg-gray-50 text-text-muted cursor-not-allowed"
                  [value]="editingAdmin()?.email"
                  disabled
                />
                <p class="text-xs text-text-muted mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Role</label>
                <select
                  formControlName="role"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="super_admin">Super Admin</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="showEditModal.set(false)"
                  class="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  [disabled]="editForm.invalid || saving()"
                  class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {{ saving() ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal -->
      <app-confirm-modal
        [open]="showDeleteModal()"
        title="Delete Admin"
        [message]="
          'Are you sure you want to delete ' +
          (adminToDelete()?.firstName || '') +
          ' ' +
          (adminToDelete()?.lastName || '') +
          '? This action cannot be undone.'
        "
        confirmLabel="Delete"
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
        this.notifications.error('Failed to load administrators');
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
        this.notifications.success('Administrator created successfully');
        this.showCreateModal.set(false);
        this.saving.set(false);
        this.loadAdmins();
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Failed to create administrator');
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
        this.notifications.success('Administrator updated successfully');
        this.showEditModal.set(false);
        this.saving.set(false);
        this.loadAdmins();
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Failed to update administrator');
        this.saving.set(false);
      },
    });
  }

  toggleActive(admin: Admin) {
    const dto: UpdateAdminDto = { isActive: !admin.isActive };
    this.adminService.updateAdmin(admin.id, dto).subscribe({
      next: () => {
        this.notifications.success(
          admin.isActive ? 'Administrator deactivated' : 'Administrator activated',
        );
        this.admins.update((list) =>
          list.map((a) => (a.id === admin.id ? { ...a, isActive: !a.isActive } : a)),
        );
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Failed to update status');
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
        this.notifications.success('Administrator deleted');
        this.admins.update((list) => list.filter((a) => a.id !== admin.id));
        this.showDeleteModal.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Failed to delete administrator');
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
