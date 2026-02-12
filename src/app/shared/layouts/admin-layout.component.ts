import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AdminAuthService } from '../../core/auth/services/admin-auth.service';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  superAdminOnly?: boolean;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <!-- Sidebar -->
    <aside
      class="fixed left-0 top-0 bottom-0 w-64 bg-sidebar-bg border-r border-sidebar-border flex flex-col z-40"
    >
      <!-- Logo -->
      <div class="px-6 py-5 border-b border-sidebar-border">
        <h1 class="text-xl font-bold text-primary font-[family-name:var(--font-heading)]">CYNA</h1>
        <p class="text-xs text-text-muted mt-0.5">Backoffice Administration</p>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 overflow-y-auto">
        <ul class="space-y-1">
          @for (item of visibleNavItems(); track item.path) {
            <li>
              <a
                [routerLink]="item.path"
                routerLinkActive="bg-primary-light text-primary"
                [routerLinkActiveOptions]="{ exact: item.path === '/dashboard' }"
                class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-50 hover:text-text-primary transition-colors"
              >
                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    [attr.d]="item.icon"
                  />
                </svg>
                {{ item.label }}
              </a>
            </li>
          }
        </ul>
      </nav>

      <!-- User Info + Logout -->
      <div class="px-3 py-4 border-t border-sidebar-border">
        <div class="px-3 py-2 mb-2">
          <p class="text-sm font-medium text-text-primary truncate">
            {{ auth.admin()?.firstName }} {{ auth.admin()?.lastName }}
          </p>
          <p class="text-xs text-text-muted capitalize">
            {{ auth.admin()?.role?.replace('_', ' ') }}
          </p>
        </div>
        <button
          (click)="auth.logout()"
          class="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:bg-danger-light hover:text-danger transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 min-h-screen">
      <div class="p-8">
        <router-outlet />
      </div>
    </main>
  `,
})
export class AdminLayoutComponent {
  readonly auth = inject(AdminAuthService);

  private readonly navItems: NavItem[] = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4',
    },
    {
      label: 'Products',
      path: '/products',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    },
    {
      label: 'Categories',
      path: '/categories',
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    },
    {
      label: 'Orders',
      path: '/orders',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      superAdminOnly: true,
    },
    {
      label: 'Subscriptions',
      path: '/subscriptions',
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    },
    {
      label: 'Customers',
      path: '/customers',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      superAdminOnly: true,
    },
    {
      label: 'Analytics',
      path: '/analytics',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      label: 'Content',
      path: '/content',
      icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2',
      superAdminOnly: true,
    },
    {
      label: 'Admins',
      path: '/admins',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      superAdminOnly: true,
    },
  ];

  visibleNavItems = computed(() => {
    const isSuperAdmin = this.auth.isSuperAdmin();
    return this.navItems.filter((item) => !item.superAdminOnly || isSuperAdmin);
  });
}
