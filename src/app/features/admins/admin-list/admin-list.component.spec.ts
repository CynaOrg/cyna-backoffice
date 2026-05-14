import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { AdminListComponent } from './admin-list.component';
import { AdminManagementService } from '../../../core/services/admin-management.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Admin } from '../../../core/models/admin.model';

describe('AdminListComponent', () => {
  let fixture: ComponentFixture<AdminListComponent>;
  let component: AdminListComponent;
  let adminService: {
    getAdmins: ReturnType<typeof vi.fn>;
    createAdmin: ReturnType<typeof vi.fn>;
    updateAdmin: ReturnType<typeof vi.fn>;
    deleteAdmin: ReturnType<typeof vi.fn>;
  };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };
  const authSignal = { admin: () => ({ id: 'me' }) };

  function makeAdmin(over: Partial<Admin> = {}): Admin {
    return {
      id: 'a1',
      email: 'a@b.com',
      firstName: 'A',
      lastName: 'B',
      role: 'commercial',
      isActive: true,
      ...over,
    };
  }

  beforeEach(async () => {
    adminService = {
      getAdmins: vi.fn().mockReturnValue(of([])),
      createAdmin: vi.fn(),
      updateAdmin: vi.fn(),
      deleteAdmin: vi.fn(),
    };
    notifications = { success: vi.fn(), error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [AdminListComponent, TranslateModule.forRoot()],
      providers: [
        { provide: AdminManagementService, useValue: adminService },
        { provide: AdminAuthService, useValue: authSignal },
        { provide: NotificationService, useValue: notifications },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminListComponent);
    component = fixture.componentInstance;
  });

  describe('loadAdmins', () => {
    it('stores admins on success', () => {
      adminService.getAdmins.mockReturnValue(
        of([makeAdmin(), makeAdmin({ id: 'a2', role: 'super_admin', isActive: false })]),
      );
      fixture.detectChanges();
      expect(component.admins().length).toBe(2);
      expect(component.totalAdmins()).toBe(2);
      expect(component.superAdminCount()).toBe(1);
      expect(component.commercialCount()).toBe(1);
      expect(component.activeAdminCount()).toBe(1);
      expect(component.loading()).toBe(false);
    });

    it('shows error toast on failure', () => {
      adminService.getAdmins.mockReturnValue(throwError(() => new Error('500')));
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.loading()).toBe(false);
    });
  });

  describe('filteredAdmins', () => {
    beforeEach(() => {
      adminService.getAdmins.mockReturnValue(
        of([
          makeAdmin({ id: 'a1', firstName: 'Alice', lastName: 'A', email: 'alice@x.com' }),
          makeAdmin({
            id: 'a2',
            firstName: 'Bob',
            lastName: 'B',
            email: 'bob@x.com',
            role: 'super_admin',
          }),
        ]),
      );
      fixture.detectChanges();
    });

    it('matches search by firstName, lastName, or email (case-insensitive)', () => {
      component.searchTerm.set('alice');
      expect(component.filteredAdmins().map((a) => a.id)).toEqual(['a1']);

      component.searchTerm.set('BOB');
      expect(component.filteredAdmins().map((a) => a.id)).toEqual(['a2']);
    });

    it('filters by role', () => {
      component.roleFilter.set('super_admin');
      expect(component.filteredAdmins().map((a) => a.id)).toEqual(['a2']);
    });

    it('combines search and role filters', () => {
      component.searchTerm.set('a');
      component.roleFilter.set('super_admin');
      expect(component.filteredAdmins().map((a) => a.id)).toEqual([]);
    });
  });

  describe('helpers', () => {
    beforeEach(() => fixture.detectChanges());

    it('getInitials concatenates first letters', () => {
      expect(component.getInitials('Alice', 'Bond')).toBe('AB');
    });

    it('getShortId returns first 8 chars', () => {
      expect(component.getShortId('1234567890ab')).toBe('12345678');
    });

    it('getAvatarColor is deterministic', () => {
      expect(component.getAvatarColor('Alice')).toBe(component.getAvatarColor('Alice'));
    });

    it('formatDate produces a French date', () => {
      expect(component.formatDate('2026-01-01')).toMatch(/2026/);
    });

    it('toggleFilter flips showFilter', () => {
      expect(component.showFilter()).toBe(false);
      component.toggleFilter();
      expect(component.showFilter()).toBe(true);
    });

    it('filterByRole updates roleFilter', () => {
      component.filterByRole('super_admin');
      expect(component.roleFilter()).toBe('super_admin');
    });

    it('refresh reloads admins', () => {
      adminService.getAdmins.mockClear();
      component.refresh();
      expect(adminService.getAdmins).toHaveBeenCalled();
    });
  });

  describe('open modals', () => {
    beforeEach(() => fixture.detectChanges());

    it('openCreateModal resets form and opens', () => {
      component.openCreateModal();
      expect(component.showCreateModal()).toBe(true);
      expect(component.createForm.getRawValue().role).toBe('super_admin');
    });

    it('openEditModal pre-fills the form', () => {
      const admin = makeAdmin({ firstName: 'X', lastName: 'Y', role: 'super_admin' });
      component.openEditModal(admin);
      expect(component.showEditModal()).toBe(true);
      expect(component.editingAdmin()).toEqual(admin);
      expect(component.editForm.getRawValue()).toMatchObject({
        firstName: 'X',
        lastName: 'Y',
        role: 'super_admin',
      });
    });

    it('confirmDelete sets the admin and opens delete modal', () => {
      const admin = makeAdmin();
      component.confirmDelete(admin);
      expect(component.adminToDelete()).toEqual(admin);
      expect(component.showDeleteModal()).toBe(true);
    });
  });

  describe('createAdmin', () => {
    beforeEach(() => fixture.detectChanges());

    it('no-ops when form is invalid', () => {
      component.createAdmin();
      expect(adminService.createAdmin).not.toHaveBeenCalled();
    });

    it('creates and reloads on success', () => {
      adminService.createAdmin.mockReturnValue(of(makeAdmin()));
      adminService.getAdmins.mockReturnValue(of([makeAdmin()]));
      component.createForm.setValue({
        email: 'new@b.com',
        password: 'pwpwpwpw',
        firstName: 'A',
        lastName: 'B',
        role: 'commercial',
      });
      component.createAdmin();
      expect(adminService.createAdmin).toHaveBeenCalled();
      expect(notifications.success).toHaveBeenCalled();
      expect(component.showCreateModal()).toBe(false);
    });

    it('shows inline error on failure and keeps the modal open', () => {
      adminService.createAdmin.mockReturnValue(
        throwError(() => ({ error: { message: 'email taken' } })),
      );
      component.openCreateModal();
      component.createForm.setValue({
        email: 'new@b.com',
        password: 'pwpwpwpw',
        firstName: 'A',
        lastName: 'B',
        role: 'commercial',
      });
      component.createAdmin();
      expect(component.createError()).toBe('email taken');
      expect(component.showCreateModal()).toBe(true);
    });

    it('falls back to translated error', () => {
      adminService.createAdmin.mockReturnValue(throwError(() => ({ error: null })));
      component.createForm.setValue({
        email: 'new@b.com',
        password: 'pwpwpwpw',
        firstName: 'A',
        lastName: 'B',
        role: 'commercial',
      });
      component.createAdmin();
      expect(component.createError()).toBe('ADMINS.CREATE_FAILED');
    });
  });

  describe('updateAdmin', () => {
    beforeEach(() => fixture.detectChanges());

    it('no-ops when no admin or invalid form', () => {
      component.updateAdmin();
      expect(adminService.updateAdmin).not.toHaveBeenCalled();
    });

    it('updates and reloads on success', () => {
      adminService.updateAdmin.mockReturnValue(of(makeAdmin()));
      adminService.getAdmins.mockReturnValue(of([]));
      component.editingAdmin.set(makeAdmin());
      component.editForm.setValue({
        firstName: 'X',
        lastName: 'Y',
        role: 'commercial',
        isActive: true,
      });
      component.updateAdmin();
      expect(adminService.updateAdmin).toHaveBeenCalledWith('a1', {
        firstName: 'X',
        lastName: 'Y',
        role: 'commercial',
        isActive: true,
      });
      expect(component.showEditModal()).toBe(false);
    });

    it('shows inline error on failure', () => {
      adminService.updateAdmin.mockReturnValue(throwError(() => ({ error: { message: 'nope' } })));
      component.editingAdmin.set(makeAdmin());
      component.editForm.setValue({
        firstName: 'X',
        lastName: 'Y',
        role: 'commercial',
        isActive: true,
      });
      component.updateAdmin();
      expect(component.editError()).toBe('nope');
    });
  });

  describe('toggleActive', () => {
    beforeEach(() => fixture.detectChanges());

    it('refuses to toggle the current admin', () => {
      component.toggleActive(makeAdmin({ id: 'me' }));
      expect(adminService.updateAdmin).not.toHaveBeenCalled();
    });

    it('flips isActive and shows deactivated toast', () => {
      adminService.updateAdmin.mockReturnValue(of(makeAdmin()));
      component.admins.set([makeAdmin({ id: 'a1', isActive: true })]);
      component.toggleActive(makeAdmin({ id: 'a1', isActive: true }));
      expect(adminService.updateAdmin).toHaveBeenCalledWith('a1', { isActive: false });
      expect(notifications.success).toHaveBeenCalledWith('ADMINS.DEACTIVATED_SUCCESS');
      expect(component.admins()[0].isActive).toBe(false);
    });

    it('shows activated toast when reactivating', () => {
      adminService.updateAdmin.mockReturnValue(of(makeAdmin()));
      component.admins.set([makeAdmin({ id: 'a1', isActive: false })]);
      component.toggleActive(makeAdmin({ id: 'a1', isActive: false }));
      expect(notifications.success).toHaveBeenCalledWith('ADMINS.ACTIVATED_SUCCESS');
    });

    it('shows error toast on failure', () => {
      adminService.updateAdmin.mockReturnValue(throwError(() => ({ error: { message: 'bad' } })));
      component.toggleActive(makeAdmin({ id: 'other' }));
      expect(notifications.error).toHaveBeenCalledWith('bad');
    });
  });

  describe('deleteAdmin', () => {
    beforeEach(() => fixture.detectChanges());

    it('no-ops when no admin is selected', () => {
      component.adminToDelete.set(null);
      component.deleteAdmin();
      expect(adminService.deleteAdmin).not.toHaveBeenCalled();
    });

    it('removes admin from list on success', () => {
      adminService.deleteAdmin.mockReturnValue(of(undefined));
      component.admins.set([makeAdmin({ id: 'a1' }), makeAdmin({ id: 'a2' })]);
      component.adminToDelete.set(makeAdmin({ id: 'a1' }));
      component.deleteAdmin();
      expect(component.admins().map((a) => a.id)).toEqual(['a2']);
      expect(component.showDeleteModal()).toBe(false);
    });

    it('shows server error and keeps the modal open', () => {
      adminService.deleteAdmin.mockReturnValue(throwError(() => ({ error: { message: 'self' } })));
      component.adminToDelete.set(makeAdmin({ id: 'me' }));
      component.deleteAdmin();
      expect(component.deleteError()).toBe('self');
      expect(notifications.error).toHaveBeenCalledWith('self');
    });
  });
});
