import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '../../core/auth/services/admin-auth.service';
import { ApiService } from '../../core/services/api.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ContentService } from '../../core/services/content.service';
import { NotificationService } from '../../core/services/notification.service';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { DashboardData, DashboardKPIs } from '../../core/models/analytics.model';
import { ContactMessage } from '../../core/models/content.model';
import { Order } from '../../core/models/order.model';

interface DashboardViewModel {
  kpis: DashboardKPIs;
  recentOrders: {
    id: string;
    orderNumber: string;
    status: string;
    total: number;
    createdAt: string;
  }[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    KpiCardComponent,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    TranslateModule,
  ],
  template: `
    <div class="animate-fade-in-up">
      <!-- Welcome header -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-text-primary !m-0">
          {{ 'DASHBOARD.WELCOME_BACK' | translate: { name: adminFirstName() } }}
        </h2>
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <app-kpi-card
            [value]="formatCurrency(data()?.kpis?.totalRevenue || 0)"
            [label]="'DASHBOARD.TOTAL_REVENUE' | translate"
            [variation]="data()?.kpis?.revenueVariation"
            iconPath="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            iconBgClass="bg-success-light"
            iconClass="text-success"
          />
          <app-kpi-card
            [value]="formatCurrency(data()?.kpis?.mrr || 0)"
            [label]="'DASHBOARD.MRR' | translate"
            [variation]="data()?.kpis?.mrrVariation"
            iconPath="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            iconBgClass="bg-info-light"
            iconClass="text-info"
          />
          <app-kpi-card
            [value]="(data()?.kpis?.totalOrders || 0).toString()"
            [label]="'DASHBOARD.TOTAL_ORDERS' | translate"
            [variation]="data()?.kpis?.ordersVariation"
            iconPath="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
            iconBgClass="bg-primary-light"
            iconClass="text-primary"
          />
          <app-kpi-card
            [value]="(data()?.kpis?.activeSubscriptions || 0).toString()"
            [label]="'DASHBOARD.ACTIVE_SUBSCRIPTIONS' | translate"
            [variation]="data()?.kpis?.subscriptionsVariation"
            iconPath="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
            iconBgClass="bg-warning-light"
            iconClass="text-warning"
          />
        </div>

        <!-- Super Admin: Quick Access Cards -->
        @if (authService.isSuperAdmin()) {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <!-- Low Stock Alerts -->
            <a
              routerLink="/analytics"
              fragment="stock-status"
              class="group flex items-center gap-4 rounded-xl border border-border-light bg-surface p-6 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200 no-underline"
            >
              <div
                class="w-12 h-12 rounded-lg bg-warning-light flex items-center justify-center shrink-0"
              >
                <svg
                  class="w-6 h-6 text-warning"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-text-primary">{{ lowStockCount() }}</div>
                <div class="text-sm text-text-secondary">
                  {{ 'DASHBOARD.LOW_STOCK' | translate }}
                </div>
              </div>
              <svg
                class="w-5 h-5 text-text-muted ml-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>

            <!-- Unread Messages -->
            <a
              routerLink="/messages"
              class="group flex items-center gap-4 rounded-xl border border-border-light bg-surface p-6 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200 no-underline"
            >
              <div
                class="w-12 h-12 rounded-lg bg-info-light flex items-center justify-center shrink-0"
              >
                <svg
                  class="w-6 h-6 text-info"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-text-primary">{{ unreadMessages() }}</div>
                <div class="text-sm text-text-secondary">
                  {{ 'DASHBOARD.UNREAD_MESSAGES' | translate }}
                </div>
              </div>
              <svg
                class="w-5 h-5 text-text-muted ml-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          </div>
        }

        <!-- Super Admin: Recent Orders Table -->
        @if (authService.isSuperAdmin()) {
          <div class="rounded-xl border border-border-light bg-surface shadow-sm">
            <div class="px-6 py-4 border-b border-border-light flex items-center justify-between">
              <h3 class="text-lg font-semibold text-text-primary !m-0">
                {{ 'DASHBOARD.RECENT_ORDERS' | translate }}
              </h3>
              <a
                routerLink="/orders"
                class="text-sm text-primary hover:text-primary-hover font-medium no-underline"
              >
                {{ 'DASHBOARD.VIEW_ALL' | translate }}
              </a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border-light">
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'DASHBOARD.ORDER' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'DASHBOARD.DATE' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'DASHBOARD.STATUS' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'DASHBOARD.TOTAL' | translate }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-light">
                  @for (order of data()?.recentOrders || []; track order.id) {
                    <tr class="hover:bg-background transition-colors">
                      <td class="px-6 py-4 text-sm font-medium text-text-primary">
                        {{ order.orderNumber }}
                      </td>
                      <td class="px-6 py-4 text-sm text-text-secondary">
                        {{ formatDate(order.createdAt) }}
                      </td>
                      <td class="px-6 py-4">
                        <app-status-badge [status]="order.status" />
                      </td>
                      <td class="px-6 py-4 text-sm text-text-primary text-right font-medium">
                        {{ formatCurrency(order.total) }}
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="4" class="px-6 py-12 text-center text-text-muted text-sm">
                        {{ 'DASHBOARD.NO_ORDERS' | translate }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- Commercial: Sales Overview -->
        @if (authService.isCommercial()) {
          <div class="rounded-xl border border-border-light bg-surface shadow-sm p-6">
            <h3 class="text-lg font-semibold text-text-primary !m-0 mb-4">
              {{ 'DASHBOARD.SALES_OVERVIEW' | translate }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="rounded-lg bg-background p-5">
                <div class="text-sm text-text-secondary mb-1">
                  {{ 'DASHBOARD.AVG_CART' | translate }}
                </div>
                <div class="text-xl font-bold text-text-primary">
                  {{ formatCurrency(data()?.kpis?.avgCartValue || 0) }}
                </div>
                @if (data()?.kpis?.avgCartVariation !== undefined) {
                  <span
                    class="text-xs font-semibold mt-1 inline-block"
                    [class]="data()!.kpis.avgCartVariation! >= 0 ? 'text-success' : 'text-error'"
                  >
                    {{ data()!.kpis.avgCartVariation! >= 0 ? '+' : ''
                    }}{{ data()!.kpis.avgCartVariation }}%
                    {{ 'DASHBOARD.VS_LAST_PERIOD' | translate }}
                  </span>
                }
              </div>

              <div class="rounded-lg bg-background p-5">
                <div class="text-sm text-text-secondary mb-1">
                  {{ 'DASHBOARD.CONVERSION_RATE' | translate }}
                </div>
                <div class="text-xl font-bold text-text-primary">
                  {{
                    data()?.kpis?.conversionRate !== undefined
                      ? data()!.kpis.conversionRate + '%'
                      : 'N/A'
                  }}
                </div>
                <span class="text-xs text-text-secondary mt-1 inline-block">
                  {{ 'DASHBOARD.BASED_ON_PERIOD' | translate }}
                </span>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-border-light">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-text-secondary">{{
                  'DASHBOARD.REVENUE_TARGET' | translate
                }}</span>
                <span class="text-sm font-medium text-text-primary">
                  {{ formatCurrency(data()?.kpis?.totalRevenue || 0) }}
                </span>
              </div>
              <div class="w-full bg-border-light rounded-full h-3">
                <div
                  class="bg-primary rounded-full h-3 transition-all duration-500"
                  [style.width.%]="revenueProgress()"
                ></div>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  readonly authService = inject(AdminAuthService);
  private readonly analyticsService = inject(AnalyticsService);
  private readonly contentService = inject(ContentService);
  private readonly api = inject(ApiService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  loading = signal(true);
  data = signal<DashboardViewModel | null>(null);
  lowStockCount = signal(0);
  unreadMessages = signal(0);

  // DASH-2: extracted from a magic number in revenueProgress(). Eventually
  // this should come from a backend `/admin/config/revenue-target` endpoint
  // (or env config) so non-engineers can tune it.
  // TODO(DASH-2): replace with a value coming from the backend config service.
  private readonly REVENUE_TARGET_EUR = 100000;

  adminFirstName = computed(() => this.authService.admin()?.firstName || 'Admin');

  revenueProgress = computed(() => {
    const revenue = this.data()?.kpis?.totalRevenue || 0;
    return Math.min((revenue / this.REVENUE_TARGET_EUR) * 100, 100);
  });

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading.set(true);

    // DASH-3: avgCart/conversionRate are only rendered in the commercial
    // view; gate populating them so we don't surface unused data on
    // dashboards that won't display it.
    const showCartConversion = this.authService.isCommercial();

    forkJoin({
      dashboard: this.analyticsService.getDashboard(),
      recentOrders: this.api.get<{ data: Order[]; total: number }>('admin/orders', {
        page: 1,
        limit: 5,
      }),
    }).subscribe({
      next: ({ dashboard: apiData, recentOrders }) => {
        const viewModel: DashboardViewModel = {
          kpis: {
            totalRevenue: apiData?.revenue?.total ?? 0,
            revenueVariation: apiData?.revenue?.changePercent,
            mrr: apiData?.subscriptions?.mrr ?? 0,
            mrrVariation: apiData?.subscriptions?.changePercent,
            totalOrders: apiData?.orders?.total ?? 0,
            ordersVariation: apiData?.orders?.changePercent,
            activeSubscriptions: apiData?.subscriptions?.active ?? 0,
            subscriptionsVariation: apiData?.subscriptions?.changePercent,
            avgCartValue: showCartConversion ? (apiData?.averageOrderValue ?? 0) : 0,
            conversionRate: showCartConversion ? apiData?.conversionRate : undefined,
          },
          recentOrders: (recentOrders?.data ?? []).map((o) => ({
            id: o.id,
            orderNumber: o.orderNumber,
            status: o.status,
            total: Number(o.total) || 0,
            createdAt: o.createdAt,
          })),
        };
        this.data.set(viewModel);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('DASHBOARD.LOAD_ERROR'));
        this.loading.set(false);
      },
    });

    if (this.authService.isSuperAdmin()) {
      this.loadSuperAdminData();
    }
  }

  private loadSuperAdminData() {
    forkJoin({
      stock: this.analyticsService.getStockStatus(),
      messages: this.contentService.getContactMessages(),
    }).subscribe({
      next: ({ stock, messages }) => {
        // Stock response is { summary: { lowStock, outOfStock, ... }, products: [] }
        const lowStockAlerts = (stock?.summary?.lowStock ?? 0) + (stock?.summary?.outOfStock ?? 0);
        this.lowStockCount.set(lowStockAlerts);

        const unread = (messages || []).filter((msg: ContactMessage) => !msg.isRead);
        this.unreadMessages.set(unread.length);
      },
      error: () => {},
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
