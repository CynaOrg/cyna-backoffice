import { Component, inject, computed, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorSignOut, phosphorUser } from '@ng-icons/phosphor-icons/regular';
import { AdminAuthService } from '../../core/auth/services/admin-auth.service';

interface NavItem {
  route: string;
  labelKey: string;
  icon: string;
  superAdminOnly?: boolean;
  exact?: boolean;
}

interface NavSection {
  labelKey: string;
  items: NavItem[];
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, NgIconComponent],
  viewProviders: [provideIcons({ phosphorSignOut, phosphorUser })],
  template: `
    <!-- ========== SIDEBAR (fixed left, 256px) ========== -->
    <aside
      class="fixed left-0 top-0 z-40 h-screen w-64 flex flex-col border-r border-border-light bg-surface"
    >
      <!-- Logo -->
      <div class="flex h-20 items-center px-6">
        <a routerLink="/dashboard" class="no-underline">
          <img src="assets/cyna-backoffice.svg" alt="CYNA" class="h-8 w-auto object-contain" />
        </a>
      </div>

      <!-- Main nav -->
      <nav class="flex flex-1 flex-col overflow-y-auto px-3">
        <!-- Dashboard link (standalone, with primary bg when active) -->
        <a
          routerLink="/dashboard"
          routerLinkActive="active-dashboard"
          #rlaDash="routerLinkActive"
          [routerLinkActiveOptions]="{ exact: true }"
          class="mb-6 flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors no-underline"
          [class.bg-primary]="rlaDash.isActive"
          [class.text-text-inverse]="rlaDash.isActive"
          [class.text-text-primary]="!rlaDash.isActive"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z"
            />
          </svg>
          {{ 'SIDEBAR.DASHBOARD' | translate }}
        </a>

        <!-- Sections -->
        @for (section of visibleSections(); track section.labelKey) {
          <div class="mb-6">
            <span
              class="mb-2 block px-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted"
            >
              {{ section.labelKey | translate }}
            </span>
            @for (item of section.items; track item.route) {
              <a
                [routerLink]="item.route"
                routerLinkActive="active-section"
                #rla="routerLinkActive"
                [routerLinkActiveOptions]="{ exact: item.exact || false }"
                class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors no-underline"
                [class.bg-primary-light]="rla.isActive"
                [class.text-primary]="rla.isActive"
                [class.text-text-secondary]="!rla.isActive"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    [attr.d]="item.icon"
                  />
                </svg>
                {{ item.labelKey | translate }}
              </a>
            }
          </div>
        }
      </nav>

      <!-- Account + Logout -->
      <div class="border-t border-border-light px-3 py-3">
        <a
          routerLink="/account"
          routerLinkActive="active-account"
          #rlaAccount="routerLinkActive"
          class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors no-underline"
          [class.bg-primary-light]="rlaAccount.isActive"
          [class.text-primary]="rlaAccount.isActive"
          [class.text-text-secondary]="!rlaAccount.isActive"
        >
          <ng-icon name="phosphorUser" size="20" />
          {{ 'SIDEBAR.ACCOUNT' | translate }}
        </a>
        <button
          (click)="auth.logout()"
          class="flex items-center gap-3 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-error hover:bg-error-light border-none bg-transparent cursor-pointer"
        >
          <ng-icon name="phosphorSignOut" size="20" />
          {{ 'SIDEBAR.SIGN_OUT' | translate }}
        </button>
      </div>
    </aside>

    <!-- ========== MAIN CONTENT ========== -->
    <main class="ml-64 min-h-screen bg-background">
      <!-- Topbar -->
      <div class="fixed top-0 right-0 left-64 z-20 border-b border-border-light bg-surface">
        <div class="flex items-center justify-between px-8 py-4">
          <div class="min-w-0">
            <h1 class="m-0 truncate text-xl font-bold text-text-primary">
              {{ pageTitleKey() | translate }}
            </h1>
            @if (pageSubtitleKey(); as sub) {
              <p class="m-0 text-sm text-text-secondary truncate">{{ sub | translate }}</p>
            }
          </div>
          <span class="text-sm text-text-secondary whitespace-nowrap ml-4">
            {{ auth.admin()?.firstName }} {{ auth.admin()?.lastName }}
          </span>
        </div>
      </div>

      <!-- Page content -->
      <div class="p-8 pt-[96px]">
        <router-outlet />
      </div>
    </main>
  `,
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private routerSub?: Subscription;

  private readonly currentUrl = signal(this.router.url);

  pageTitleKey = computed(() => {
    const path = this.currentUrl();
    const titleKeys: Record<string, string> = {
      '/dashboard': 'PAGES.DASHBOARD',
      '/products': 'PAGES.PRODUCTS',
      '/services': 'PAGES.SERVICES',
      '/licences': 'PAGES.LICENCES',
      '/categories': 'PAGES.CATEGORIES',
      '/orders': 'PAGES.ORDERS',
      '/subscriptions': 'PAGES.SUBSCRIPTIONS',
      '/customers': 'PAGES.CUSTOMERS',
      '/analytics': 'PAGES.ANALYTICS',
      '/content': 'PAGES.CONTENT',
      '/messages': 'PAGES.MESSAGES',
      '/admins': 'PAGES.ADMIN_MANAGEMENT',
      '/account': 'PAGES.ACCOUNT',
    };
    for (const [key, value] of Object.entries(titleKeys)) {
      if (path.startsWith(key)) return value;
    }
    return 'PAGES.DASHBOARD';
  });

  pageSubtitleKey = computed(() => {
    const path = this.currentUrl();
    const subtitleKeys: Record<string, string> = {
      '/dashboard': 'DASHBOARD.SUBTITLE',
      '/products': 'PRODUCTS.SUBTITLE',
      '/services': 'SERVICES.SUBTITLE',
      '/licences': 'LICENCES.SUBTITLE',
      '/categories': 'CATEGORIES.SUBTITLE',
      '/orders': 'ORDERS.SUBTITLE',
      '/subscriptions': 'SUBSCRIPTIONS.SUBTITLE',
      '/customers': 'CUSTOMERS.SUBTITLE',
      '/analytics': 'ANALYTICS.SUBTITLE',
      '/content': 'CONTENT.SUBTITLE',
      '/messages': 'MESSAGES.SUBTITLE',
      '/admins': 'ADMINS.SUBTITLE',
    };
    for (const [key, value] of Object.entries(subtitleKeys)) {
      if (path.startsWith(key)) return value;
    }
    return '';
  });

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.currentUrl.set(e.urlAfterRedirects));
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  private readonly catalogueSection: NavSection = {
    labelKey: 'SIDEBAR.CATALOGUE',
    items: [
      {
        route: '/products',
        labelKey: 'SIDEBAR.PRODUCTS',
        icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
        superAdminOnly: true,
      },
      {
        route: '/services',
        labelKey: 'SIDEBAR.SERVICES',
        icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
        superAdminOnly: true,
      },
      {
        route: '/licences',
        labelKey: 'SIDEBAR.LICENCES',
        icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z',
        superAdminOnly: true,
      },
      {
        route: '/categories',
        labelKey: 'SIDEBAR.CATEGORIES',
        icon: 'M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z',
        superAdminOnly: true,
      },
    ],
  };

  private readonly managementSection: NavSection = {
    labelKey: 'SIDEBAR.MANAGEMENT',
    items: [
      {
        route: '/orders',
        labelKey: 'SIDEBAR.ORDERS',
        icon: 'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z',
        superAdminOnly: true,
      },
      {
        route: '/subscriptions',
        labelKey: 'SIDEBAR.SUBSCRIPTIONS',
        icon: 'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182',
        superAdminOnly: true,
      },
      {
        route: '/messages',
        labelKey: 'SIDEBAR.MESSAGES',
        icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
        superAdminOnly: true,
      },
    ],
  };

  private readonly userManagementSection: NavSection = {
    labelKey: 'SIDEBAR.USER_MANAGEMENT',
    items: [
      {
        route: '/customers',
        labelKey: 'SIDEBAR.CUSTOMERS',
        icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z',
        superAdminOnly: true,
      },
      {
        route: '/admins',
        labelKey: 'SIDEBAR.ADMINS',
        icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
        superAdminOnly: true,
      },
    ],
  };

  private readonly insightsSection: NavSection = {
    labelKey: 'SIDEBAR.INSIGHTS',
    items: [
      {
        route: '/analytics',
        labelKey: 'SIDEBAR.ANALYTICS',
        icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
      },
    ],
  };

  private readonly settingsSection: NavSection = {
    labelKey: 'SIDEBAR.SETTINGS',
    items: [
      {
        route: '/content',
        labelKey: 'SIDEBAR.CONTENT',
        icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
        superAdminOnly: true,
      },
    ],
  };

  private readonly allSections: NavSection[] = [
    this.catalogueSection,
    this.managementSection,
    this.userManagementSection,
    this.insightsSection,
    this.settingsSection,
  ];

  visibleSections = computed(() => {
    const isSuperAdmin = this.auth.isSuperAdmin();
    return this.allSections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => !item.superAdminOnly || isSuperAdmin),
      }))
      .filter((section) => section.items.length > 0);
  });
}
