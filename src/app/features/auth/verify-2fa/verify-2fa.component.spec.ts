import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { Verify2FAComponent } from './verify-2fa.component';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';

describe('Verify2FAComponent', () => {
  let fixture: ComponentFixture<Verify2FAComponent>;
  let component: Verify2FAComponent;
  let authService: {
    tempToken: ReturnType<typeof vi.fn>;
    verify2FA: ReturnType<typeof vi.fn>;
    resend2FA: ReturnType<typeof vi.fn>;
    clearSession: ReturnType<typeof vi.fn>;
  };
  let router: { navigate: ReturnType<typeof vi.fn> };

  async function setup(tempToken: string | null = 'tmp-x') {
    authService = {
      tempToken: vi.fn().mockReturnValue(tempToken),
      verify2FA: vi.fn(),
      resend2FA: vi.fn(),
      clearSession: vi.fn(),
    };
    router = { navigate: vi.fn() };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [Verify2FAComponent, TranslateModule.forRoot()],
      providers: [
        { provide: AdminAuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Verify2FAComponent);
    component = fixture.componentInstance;
  }

  describe('ngAfterViewInit', () => {
    it('redirects to /login?reason=session_expired when no tempToken', async () => {
      await setup(null);
      fixture.detectChanges();
      expect(router.navigate).toHaveBeenCalledWith(['/login'], {
        queryParams: { reason: 'session_expired' },
      });
    });

    it('stays on the page when a tempToken is present', async () => {
      await setup('tmp-x');
      fixture.detectChanges();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('onDigitInput', () => {
    beforeEach(async () => {
      await setup();
      fixture.detectChanges();
    });

    it('strips non-digit characters', () => {
      const input = document.createElement('input');
      input.value = '1a2';
      component.onDigitInput({ target: input } as unknown as Event, 0);
      expect(input.value).toBe('12');
      expect(component.code()[0]).toBe('12');
    });

    it('auto-verifies when all 6 digits are filled', () => {
      authService.verify2FA.mockReturnValue(of({}));
      component.code.set(['1', '2', '3', '4', '5', '']);
      const input = document.createElement('input');
      input.value = '6';
      component.onDigitInput({ target: input } as unknown as Event, 5);
      expect(authService.verify2FA).toHaveBeenCalledWith('123456');
    });
  });

  describe('onKeyDown', () => {
    beforeEach(async () => {
      await setup();
      fixture.detectChanges();
    });

    it('moves focus back on Backspace when current digit is empty', () => {
      const inputs = component.digitInputs.toArray();
      const focusSpy = vi.spyOn(inputs[0].nativeElement, 'focus');
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }), 1);
      expect(focusSpy).toHaveBeenCalled();
    });

    it('does nothing on Backspace at index 0', () => {
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'Backspace' }), 0);
      // No throw — assertion is implicit; coverage of guard branch
      expect(component.code()).toEqual(['', '', '', '', '', '']);
    });
  });

  describe('onPaste', () => {
    beforeEach(async () => {
      await setup();
      fixture.detectChanges();
    });

    it('fills all digits from a 6-char paste and auto-verifies', () => {
      authService.verify2FA.mockReturnValue(of({}));
      const event = {
        preventDefault: vi.fn(),
        clipboardData: { getData: () => '123456' },
      } as unknown as ClipboardEvent;

      component.onPaste(event);

      expect(component.code()).toEqual(['1', '2', '3', '4', '5', '6']);
      expect(authService.verify2FA).toHaveBeenCalledWith('123456');
    });

    it('ignores empty pastes', () => {
      const event = {
        preventDefault: vi.fn(),
        clipboardData: { getData: () => '' },
      } as unknown as ClipboardEvent;
      component.onPaste(event);
      expect(component.code()).toEqual(['', '', '', '', '', '']);
    });
  });

  describe('verify', () => {
    beforeEach(async () => {
      await setup();
      fixture.detectChanges();
    });

    it('navigates to /dashboard on success', () => {
      authService.verify2FA.mockReturnValue(of({}));
      component.code.set(['1', '2', '3', '4', '5', '6']);
      component.verify();
      expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    });

    it('does nothing when the code is incomplete', () => {
      component.code.set(['1', '2', '3', '', '', '']);
      component.verify();
      expect(authService.verify2FA).not.toHaveBeenCalled();
    });

    it('shows the server error and resets the code on failure', () => {
      authService.verify2FA.mockReturnValue(throwError(() => ({ error: { message: 'bad' } })));
      component.code.set(['1', '2', '3', '4', '5', '6']);
      component.verify();
      expect(component.errorMessage()).toBe('bad');
      expect(component.code()).toEqual(['', '', '', '', '', '']);
      expect(component.loading()).toBe(false);
    });

    it('falls back to AUTH.INVALID_CODE when no server message', () => {
      authService.verify2FA.mockReturnValue(throwError(() => ({ error: null })));
      component.code.set(['1', '2', '3', '4', '5', '6']);
      component.verify();
      expect(component.errorMessage()).toBe('AUTH.INVALID_CODE');
    });
  });

  describe('resend', () => {
    beforeEach(async () => {
      vi.useFakeTimers();
      await setup();
      fixture.detectChanges();
    });

    afterEach(() => vi.useRealTimers());

    it('shows the code-sent message and starts the cooldown on success', () => {
      authService.resend2FA.mockReturnValue(of({}));
      component.resend();
      expect(component.successMessage()).toBe('AUTH.CODE_SENT');
      expect(component.resendCooldown()).toBe(60);
    });

    it('decrements the cooldown each second', () => {
      authService.resend2FA.mockReturnValue(of({}));
      component.resend();
      vi.advanceTimersByTime(3000);
      expect(component.resendCooldown()).toBe(57);
    });

    it('shows the resend-failed error on failure', () => {
      authService.resend2FA.mockReturnValue(throwError(() => new Error('boom')));
      component.resend();
      expect(component.errorMessage()).toBe('AUTH.RESEND_FAILED');
    });
  });

  describe('backToLogin', () => {
    it('clears the session and navigates to /login', async () => {
      await setup();
      fixture.detectChanges();
      component.backToLogin();
      expect(authService.clearSession).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});
