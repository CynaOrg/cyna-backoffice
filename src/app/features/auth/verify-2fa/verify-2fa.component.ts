import {
  Component,
  inject,
  signal,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';

@Component({
  selector: 'app-verify-2fa',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Logo top-left -->
      <div class="px-6 py-5">
        <img src="assets/cyna-backoffice.svg" alt="CYNA" class="h-10 w-auto object-contain" />
      </div>

      <!-- Content centered -->
      <div class="flex flex-col items-center gap-[52px] p-8 pt-12 mx-auto max-w-md">
        <!-- Header -->
        <div class="flex flex-col items-center gap-1 text-black">
          <h1 class="!text-[32px] !font-bold !leading-normal !m-0">
            {{ 'AUTH.VERIFICATION' | translate }}
          </h1>
          <p class="text-base font-normal text-text-secondary">
            {{ 'AUTH.ENTER_CODE' | translate }}
          </p>
        </div>

        <!-- OTP Input -->
        <div class="flex w-full flex-col items-center gap-6">
          <div class="flex justify-center gap-3">
            @for (i of digits; track i) {
              <input
                #digitInput
                type="text"
                maxlength="1"
                class="w-12 h-14 text-center text-xl font-bold border border-input-border rounded-xl bg-input-bg focus:outline-none focus:border-primary transition-colors"
                [value]="code()[i]"
                (input)="onDigitInput($event, i)"
                (keydown)="onKeyDown($event, i)"
                (paste)="onPaste($event)"
              />
            }
          </div>

          <!-- Inline error message (red) -->
          @if (errorMessage()) {
            <p class="w-full text-center text-sm text-error">{{ errorMessage() }}</p>
          }

          <!-- Inline success message (green) -->
          @if (successMessage()) {
            <p class="w-full text-center text-sm text-success">{{ successMessage() }}</p>
          }

          <!-- Verify Button -->
          <button
            (click)="verify()"
            [disabled]="loading() || code().join('').length < 6"
            class="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] leading-normal font-semibold bg-primary text-text-inverse hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            {{ 'AUTH.VERIFY' | translate }}
          </button>

          <!-- Resend -->
          <button
            (click)="resend()"
            [disabled]="resendCooldown() > 0"
            class="text-xs font-normal text-primary disabled:text-text-muted disabled:cursor-not-allowed"
          >
            @if (resendCooldown() > 0) {
              {{ 'AUTH.RESEND_CODE' | translate }} ({{ resendCooldown() }}s)
            } @else {
              {{ 'AUTH.RESEND_CODE' | translate }}
            }
          </button>

          <!-- Back to login -->
          <p class="text-xs text-black">
            <button
              (click)="backToLogin()"
              class="font-bold text-primary bg-transparent border-none cursor-pointer"
            >
              {{ 'AUTH.BACK_TO_LOGIN' | translate }}
            </button>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class Verify2FAComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private readonly authService = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  digits = [0, 1, 2, 3, 4, 5];
  code = signal<string[]>(['', '', '', '', '', '']);
  loading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');
  resendCooldown = signal(0);

  private cooldownInterval: ReturnType<typeof setInterval> | null = null;

  ngAfterViewInit(): void {
    if (!this.authService.tempToken()) {
      this.router.navigate(['/login']);
      return;
    }
    setTimeout(() => this.digitInputs.first?.nativeElement.focus());
  }

  ngOnDestroy(): void {
    if (this.cooldownInterval !== null) {
      clearInterval(this.cooldownInterval);
      this.cooldownInterval = null;
    }
  }

  onDigitInput(event: Event, index: number): void {
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

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.code()[index] && index > 0) {
      const inputs = this.digitInputs.toArray();
      inputs[index - 1]?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent): void {
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

  verify(): void {
    const codeStr = this.code().join('');
    if (codeStr.length !== 6) return;

    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.verify2FA(codeStr).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || this.translate.instant('AUTH.INVALID_CODE'));
        this.code.set(['', '', '', '', '', '']);
        setTimeout(() => this.digitInputs.first?.nativeElement.focus());
      },
    });
  }

  resend(): void {
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.resend2FA().subscribe({
      next: () => {
        this.successMessage.set(this.translate.instant('AUTH.CODE_SENT'));
        this.startCooldown();
      },
      error: () => {
        this.errorMessage.set(this.translate.instant('AUTH.RESEND_FAILED'));
      },
    });
  }

  backToLogin(): void {
    this.authService.clearSession();
    this.router.navigate(['/login']);
  }

  private startCooldown(): void {
    this.resendCooldown.set(60);
    if (this.cooldownInterval !== null) {
      clearInterval(this.cooldownInterval);
    }
    this.cooldownInterval = setInterval(() => {
      this.resendCooldown.update((v) => {
        if (v <= 1) {
          if (this.cooldownInterval !== null) {
            clearInterval(this.cooldownInterval);
            this.cooldownInterval = null;
          }
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  }
}
