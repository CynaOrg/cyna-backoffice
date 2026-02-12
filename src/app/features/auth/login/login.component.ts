import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Logo top-left -->
      <div class="px-6 py-5">
        <img
          src="assets/cyna-logo-baseline-dark.png"
          alt="CYNA"
          class="h-10 w-auto object-contain"
        />
      </div>

      <!-- Form centered -->
      <div class="flex flex-col items-center gap-[52px] p-8 pt-12 mx-auto max-w-md">
        <!-- Header -->
        <div class="flex flex-col items-center gap-1 text-black">
          <h1 class="!text-[32px] !font-bold !leading-normal !m-0">
            {{ 'AUTH.SIGN_IN' | translate }}
          </h1>
          <p class="text-base font-normal text-text-secondary">
            {{ 'AUTH.BACKOFFICE_ADMIN' | translate }}
          </p>
        </div>

        <!-- Form -->
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="flex w-full flex-col items-center gap-4"
        >
          <!-- Email -->
          <div class="flex flex-col gap-2.5 w-full">
            <label class="text-sm font-normal text-black">{{ 'AUTH.EMAIL' | translate }}</label>
            <input
              type="email"
              formControlName="email"
              [placeholder]="'AUTH.EMAIL_PLACEHOLDER' | translate"
              [class]="
                form.get('email')?.touched && form.get('email')?.invalid
                  ? 'h-14 w-full rounded-full border border-error bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors'
                  : 'h-14 w-full rounded-full border border-input-border bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors focus:border-primary'
              "
            />
            @if (form.get('email')?.touched && form.get('email')?.errors?.['required']) {
              <p class="text-xs text-error -mt-1">{{ 'AUTH.EMAIL_REQUIRED' | translate }}</p>
            }
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-2.5 w-full">
            <label class="text-sm font-normal text-black">{{ 'AUTH.PASSWORD' | translate }}</label>
            <input
              type="password"
              formControlName="password"
              [placeholder]="'AUTH.PASSWORD_PLACEHOLDER' | translate"
              [class]="
                form.get('password')?.touched && form.get('password')?.invalid
                  ? 'h-14 w-full rounded-full border border-error bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors'
                  : 'h-14 w-full rounded-full border border-input-border bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors focus:border-primary'
              "
            />
            @if (form.get('password')?.touched && form.get('password')?.errors?.['required']) {
              <p class="text-xs text-error -mt-1">{{ 'AUTH.PASSWORD_REQUIRED' | translate }}</p>
            }
          </div>

          <!-- Error message (inline, not toast) -->
          @if (errorMessage()) {
            <p class="w-full text-center text-sm text-error">{{ errorMessage() }}</p>
          }

          <!-- Submit -->
          <button
            type="submit"
            [disabled]="loading() || form.invalid"
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
            {{ 'AUTH.SUBMIT' | translate }}
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AdminAuthService);
  private readonly router = inject(Router);

  loading = signal(false);
  errorMessage = signal('');

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const { email, password } = this.form.value;
    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/verify-2fa']);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || 'Invalid credentials');
      },
    });
  }
}
