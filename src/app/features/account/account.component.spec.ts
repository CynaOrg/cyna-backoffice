import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { AccountComponent } from './account.component';
import { AdminAuthService } from '../../core/auth/services/admin-auth.service';
import { AdminManagementService } from '../../core/services/admin-management.service';
import { NotificationService } from '../../core/services/notification.service';
import { LanguageService } from '../../core/services/language.service';
import { Admin } from '../../core/models/admin.model';

describe('AccountComponent', () => {
  let fixture: ComponentFixture<AccountComponent>;
  let component: AccountComponent;
  let auth: {
    admin: ReturnType<typeof signal<Admin | null>>;
    fetchMe: ReturnType<typeof vi.fn>;
  };
  let admins: { updateAdmin: ReturnType<typeof vi.fn> };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };

  function makeAdmin(over: Partial<Admin> = {}): Admin {
    return {
      id: 'a1',
      email: 'a@b.com',
      firstName: 'Alice',
      lastName: 'Bond',
      role: 'super_admin',
      isActive: true,
      createdAt: '2026-01-01T00:00:00Z',
      lastLoginAt: '2026-05-01T10:00:00Z',
      ...over,
    };
  }

  async function setup(admin: Admin | null = makeAdmin()) {
    auth = {
      admin: signal(admin),
      fetchMe: vi.fn().mockReturnValue(of(admin)),
    };
    admins = { updateAdmin: vi.fn() };
    notifications = { success: vi.fn(), error: vi.fn() };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AccountComponent, TranslateModule.forRoot()],
      providers: [
        { provide: AdminAuthService, useValue: auth },
        { provide: AdminManagementService, useValue: admins },
        { provide: NotificationService, useValue: notifications },
        { provide: LanguageService, useValue: { current: () => 'fr' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('computed signals', () => {
    it('admin reflects the auth signal', async () => {
      await setup();
      expect(component.admin()?.id).toBe('a1');
    });

    it('memberSince formats createdAt', async () => {
      await setup();
      expect(component.memberSince()).toMatch(/2026/);
    });

    it('memberSince returns em-dash when missing', async () => {
      await setup(makeAdmin({ createdAt: undefined }));
      expect(component.memberSince()).toBe('—');
    });

    it('lastLogin formats date when present', async () => {
      await setup();
      expect(component.lastLogin()).toMatch(/2026/);
    });

    it('lastLogin returns NEVER key when null', async () => {
      await setup(makeAdmin({ lastLoginAt: null }));
      expect(component.lastLogin()).toBe('ACCOUNT.NEVER');
    });

    it('lastLogin returns em-dash when undefined', async () => {
      await setup(makeAdmin({ lastLoginAt: undefined }));
      expect(component.lastLogin()).toBe('—');
    });

    it('lastLogin returns em-dash when admin is null', async () => {
      await setup(null);
      expect(component.lastLogin()).toBe('—');
    });
  });

  describe('helpers', () => {
    beforeEach(async () => {
      await setup();
    });

    it('initials uppercases first letters', () => {
      expect(component.initials(makeAdmin({ firstName: 'alice', lastName: 'bond' }))).toBe('AB');
    });

    it('roleLabel returns super_admin key', () => {
      expect(component.roleLabel('super_admin')).toBe('ACCOUNT.ROLE_SUPER_ADMIN');
    });

    it('roleLabel returns commercial key', () => {
      expect(component.roleLabel('commercial')).toBe('ACCOUNT.ROLE_COMMERCIAL');
    });
  });

  describe('startEditing / cancelEditing', () => {
    beforeEach(async () => {
      await setup();
    });

    it('startEditing populates the form and sets editing=true', () => {
      component.startEditing(makeAdmin());
      expect(component.editing()).toBe(true);
      expect(component.form.getRawValue()).toEqual({ firstName: 'Alice', lastName: 'Bond' });
    });

    it('cancelEditing resets state', () => {
      component.startEditing(makeAdmin());
      component.cancelEditing();
      expect(component.editing()).toBe(false);
      expect(component.formError()).toBe('');
    });
  });

  describe('save', () => {
    beforeEach(async () => {
      await setup();
      component.startEditing(makeAdmin());
    });

    it('no-ops when form is invalid', () => {
      component.form.patchValue({ firstName: '' });
      component.save(makeAdmin());
      expect(admins.updateAdmin).not.toHaveBeenCalled();
    });

    it('no-ops while saving', () => {
      component.saving.set(true);
      component.save(makeAdmin());
      expect(admins.updateAdmin).not.toHaveBeenCalled();
    });

    it('refreshes admin via /me and closes the form on success', () => {
      admins.updateAdmin.mockReturnValue(of(makeAdmin()));
      component.save(makeAdmin());
      expect(admins.updateAdmin).toHaveBeenCalled();
      expect(auth.fetchMe).toHaveBeenCalled();
      expect(component.editing()).toBe(false);
      expect(notifications.success).toHaveBeenCalled();
    });

    it('still shows success when /me refresh fails', () => {
      admins.updateAdmin.mockReturnValue(of(makeAdmin()));
      auth.fetchMe.mockReturnValue(throwError(() => new Error('500')));
      component.save(makeAdmin());
      expect(component.editing()).toBe(false);
      expect(notifications.success).toHaveBeenCalled();
    });

    it('surfaces a server error message', () => {
      admins.updateAdmin.mockReturnValue(throwError(() => ({ error: { message: 'bad' } })));
      component.save(makeAdmin());
      expect(component.formError()).toBe('bad');
      expect(component.saving()).toBe(false);
    });

    it('falls back to a translated error message', () => {
      admins.updateAdmin.mockReturnValue(throwError(() => ({ error: null })));
      component.save(makeAdmin());
      expect(component.formError()).toBe('ACCOUNT.UPDATE_FAILED');
    });
  });
});
