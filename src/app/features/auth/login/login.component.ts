import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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
            class="text-xl font-semibold text-text-primary mb-6 font-[family-name:var(--font-heading)]"
          >
            Sign in
          </h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-text-secondary mb-1.5"
                >Email</label
              >
              <input
                id="email"
                type="email"
                formControlName="email"
                class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="admin@cyna.fr"
              />
              @if (form.get('email')?.touched && form.get('email')?.errors?.['required']) {
                <p class="text-danger text-xs mt-1">Email is required</p>
              }
            </div>
            <div class="mb-6">
              <label for="password" class="block text-sm font-medium text-text-secondary mb-1.5"
                >Password</label
              >
              <input
                id="password"
                type="password"
                formControlName="password"
                class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Enter your password"
              />
              @if (form.get('password')?.touched && form.get('password')?.errors?.['required']) {
                <p class="text-danger text-xs mt-1">Password is required</p>
              }
            </div>
            @if (errorMessage()) {
              <div class="mb-4 p-3 rounded-lg bg-danger-light text-danger text-sm">
                {{ errorMessage() }}
              </div>
            }
            <button
              type="submit"
              [disabled]="loading()"
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
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);

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
