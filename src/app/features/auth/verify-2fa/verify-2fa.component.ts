import {
  Component,
  inject,
  signal,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-verify-2fa',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-page-bg flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary font-[family-name:var(--font-heading)]">
            CYNA
          </h1>
          <p class="text-text-secondary mt-2">Backoffice Administration</p>
        </div>
        <div class="bg-card-bg rounded-2xl shadow-sm border border-border-light p-8">
          <h2
            class="text-xl font-semibold text-text-primary mb-2 font-[family-name:var(--font-heading)]"
          >
            Two-factor authentication
          </h2>
          <p class="text-sm text-text-secondary mb-6">Enter the 6-digit code sent to your email</p>
          <div class="flex justify-center gap-3 mb-6">
            @for (i of digits; track i) {
              <input
                #digitInput
                type="text"
                maxlength="1"
                class="w-12 h-14 text-center text-xl font-bold border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                [value]="code()[i]"
                (input)="onDigitInput($event, i)"
                (keydown)="onKeyDown($event, i)"
                (paste)="onPaste($event)"
              />
            }
          </div>
          @if (errorMessage()) {
            <div class="mb-4 p-3 rounded-lg bg-danger-light text-danger text-sm text-center">
              {{ errorMessage() }}
            </div>
          }
          <button
            (click)="verify()"
            [disabled]="loading() || code().join('').length < 6"
            class="w-full py-2.5 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            @if (loading()) {
              <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            }
            Verify
          </button>
          <div class="mt-4 text-center">
            <button
              (click)="resend()"
              [disabled]="resendCooldown() > 0"
              class="text-sm text-primary hover:text-primary-dark disabled:text-text-muted disabled:cursor-not-allowed"
            >
              @if (resendCooldown() > 0) {
                Resend code ({{ resendCooldown() }}s)
              } @else {
                Resend code
              }
            </button>
          </div>
          <div class="mt-3 text-center">
            <button
              (click)="backToLogin()"
              class="text-sm text-text-secondary hover:text-text-primary"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Verify2FAComponent implements AfterViewInit {
  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private readonly authService = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);

  digits = [0, 1, 2, 3, 4, 5];
  code = signal<string[]>(['', '', '', '', '', '']);
  loading = signal(false);
  errorMessage = signal('');
  resendCooldown = signal(0);

  private cooldownInterval: any;

  ngAfterViewInit() {
    if (!this.authService.tempToken()) {
      this.router.navigate(['/login']);
      return;
    }
    setTimeout(() => this.digitInputs.first?.nativeElement.focus());
  }

  onDigitInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    input.value = value;

    this.code.update((c) => {
      const newCode = [...c];
      newCode[index] = value;
      return newCode;
    });

    if (value && index < 5) {
      const inputs = this.digitInputs.toArray();
      inputs[index + 1]?.nativeElement.focus();
    }

    if (this.code().join('').length === 6) {
      this.verify();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.code()[index] && index > 0) {
      const inputs = this.digitInputs.toArray();
      inputs[index - 1]?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text')?.replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newCode = [...this.code()];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    this.code.set(newCode);

    const inputs = this.digitInputs.toArray();
    const focusIndex = Math.min(pasted.length, 5);
    inputs[focusIndex]?.nativeElement.focus();

    if (pasted.length === 6) {
      this.verify();
    }
  }

  verify() {
    const codeStr = this.code().join('');
    if (codeStr.length !== 6) return;

    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.verify2FA(codeStr).subscribe({
      next: () => {
        this.notifications.success('Welcome to CYNA Backoffice');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || 'Invalid verification code');
        this.code.set(['', '', '', '', '', '']);
        setTimeout(() => this.digitInputs.first?.nativeElement.focus());
      },
    });
  }

  resend() {
    this.authService.resend2FA().subscribe({
      next: () => {
        this.notifications.success('New code sent');
        this.startCooldown();
      },
      error: () => {
        this.notifications.error('Failed to resend code');
      },
    });
  }

  backToLogin() {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  private startCooldown() {
    this.resendCooldown.set(60);
    clearInterval(this.cooldownInterval);
    this.cooldownInterval = setInterval(() => {
      this.resendCooldown.update((v) => {
        if (v <= 1) {
          clearInterval(this.cooldownInterval);
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  }
}
