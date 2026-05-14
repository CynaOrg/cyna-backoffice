import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authService: { login: ReturnType<typeof vi.fn> };
  let router: { navigate: ReturnType<typeof vi.fn> };
  let route: { snapshot: { queryParamMap: { get: ReturnType<typeof vi.fn> } } };

  async function setup(reason: string | null = null) {
    authService = { login: vi.fn() };
    router = { navigate: vi.fn() };
    route = { snapshot: { queryParamMap: { get: vi.fn().mockReturnValue(reason) } } };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [LoginComponent, TranslateModule.forRoot()],
      providers: [
        { provide: AdminAuthService, useValue: authService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('ngOnInit', () => {
    it('shows the session expired message when reason=session_expired', async () => {
      await setup('session_expired');
      expect(component.errorMessage()).toBe('AUTH.SESSION_EXPIRED');
    });

    it('starts with empty error when no reason in the URL', async () => {
      await setup();
      expect(component.errorMessage()).toBe('');
    });
  });

  describe('onSubmit', () => {
    beforeEach(async () => {
      await setup();
    });

    it('does nothing and marks fields as touched when the form is invalid', () => {
      component.onSubmit();
      expect(component.loading()).toBe(false);
      expect(authService.login).not.toHaveBeenCalled();
      expect(component.form.get('email')?.touched).toBe(true);
    });

    it('calls login and navigates to /verify-2fa on success', () => {
      component.form.setValue({ email: 'a@b.com', password: 'pw' });
      authService.login.mockReturnValue(of({ requires2FA: true }));

      component.onSubmit();

      expect(authService.login).toHaveBeenCalledWith('a@b.com', 'pw');
      expect(router.navigate).toHaveBeenCalledWith(['/verify-2fa']);
    });

    it('surfaces the server error message when login fails', () => {
      component.form.setValue({ email: 'a@b.com', password: 'pw' });
      authService.login.mockReturnValue(
        throwError(() => ({ error: { message: 'Account locked' } })),
      );

      component.onSubmit();

      expect(component.loading()).toBe(false);
      expect(component.errorMessage()).toBe('Account locked');
    });

    it('falls back to a translated message when no server error message is present', () => {
      component.form.setValue({ email: 'a@b.com', password: 'pw' });
      authService.login.mockReturnValue(throwError(() => ({ error: null })));

      component.onSubmit();

      expect(component.errorMessage()).toBe('AUTH.INVALID_CREDENTIALS');
    });
  });
});
