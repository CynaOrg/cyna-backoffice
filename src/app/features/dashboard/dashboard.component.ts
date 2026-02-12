import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminAuthService } from '../../core/auth/services/admin-auth.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { ContentService } from '../../core/services/content.service';
import { NotificationService } from '../../core/services/notification.service';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { DashboardData, StockItem } from '../../core/models/analytics.model';
import { ContactMessage } from '../../core/models/content.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, KpiCardComponent, StatusBadgeComponent, LoadingSpinnerComponent],
  template: `
    <div>
      <!-- Role-aware header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
          Welcome back, {{ adminFirstName() }}
        </h1>
        <p class="text-sm text-text-secondary mt-1">
          @if (authService.isSuperAdmin()) {
            Full overview of your business metrics and operations
          } @else {
            Overview of your sales performance
          }
        </p>
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <app-kpi-card
            [value]="formatCurrency(data()?.kpis?.totalRevenue || 0)"
            label="Total Revenue"
            [variation]="data()?.kpis?.revenueVariation"
            iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            iconBgClass="bg-emerald-50"
            iconClass="text-emerald-600"
          />
          <app-kpi-card
            [value]="formatCurrency(data()?.kpis?.mrr || 0)"
            label="Monthly Recurring Revenue"
            [variation]="data()?.kpis?.mrrVariation"
            iconPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            iconBgClass="bg-blue-50"
            iconClass="text-blue-600"
          />
          <app-kpi-card
            [value]="(data()?.kpis?.totalOrders || 0).toString()"
            label="Total Orders"
            [variation]="data()?.kpis?.ordersVariation"
            iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            iconBgClass="bg-purple-50"
            iconClass="text-purple-600"
          />
          <app-kpi-card
            [value]="(data()?.kpis?.activeSubscriptions || 0).toString()"
            label="Active Subscriptions"
            [variation]="data()?.kpis?.subscriptionsVariation"
            iconPath="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            iconBgClass="bg-amber-50"
            iconClass="text-amber-600"
          />
        </div>

        <!-- Super Admin: Quick Access Cards -->
        @if (authService.isSuperAdmin()) {
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <!-- Low Stock Alerts -->
            <a
              routerLink="/analytics"
              class="block bg-amber-50 rounded-xl border border-amber-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    class="text-2xl font-bold text-amber-800 font-[family-name:var(--font-heading)]"
                  >
                    {{ lowStockCount() }}
                  </div>
                  <div class="text-sm text-amber-700">Low Stock Alerts</div>
                </div>
              </div>
            </a>

            <!-- Unread Messages -->
            <a
              routerLink="/content"
              class="block bg-blue-50 rounded-xl border border-blue-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0"
                >
                  <svg
                    class="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    class="text-2xl font-bold text-blue-800 font-[family-name:var(--font-heading)]"
                  >
                    {{ unreadMessages() }}
                  </div>
                  <div class="text-sm text-blue-700">Unread Messages</div>
                </div>
              </div>
            </a>
          </div>
        }

        <!-- Super Admin: Recent Orders Table -->
        @if (authService.isSuperAdmin()) {
          <div class="bg-card-bg rounded-xl border border-border-light shadow-sm">
            <div class="px-6 py-4 border-b border-border-light flex items-center justify-between">
              <h3
                class="text-lg font-semibold text-text-primary font-[family-name:var(--font-heading)]"
              >
                Recent Orders
              </h3>
              <a
                routerLink="/orders"
                class="text-sm text-primary hover:text-primary-dark font-medium"
                >View all</a
              >
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border-light">
                    <th
                      class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      Order
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-light">
                  @for (order of data()?.recentOrders || []; track order.id) {
                    <tr class="hover:bg-gray-50/50">
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
                        No orders yet
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
          <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
            <h3
              class="text-lg font-semibold text-text-primary font-[family-name:var(--font-heading)] mb-4"
            >
              Sales Overview
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Average Cart Value -->
              <div class="bg-gray-50 rounded-lg p-5">
                <div class="text-sm text-text-secondary mb-1">Average Cart Value</div>
                <div
                  class="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)]"
                >
                  {{ formatCurrency(data()?.kpis?.avgCartValue || 0) }}
                </div>
                @if (data()?.kpis?.avgCartVariation !== undefined) {
                  <span
                    class="text-xs font-semibold mt-1 inline-block"
                    [class]="data()!.kpis.avgCartVariation! >= 0 ? 'text-success' : 'text-danger'"
                  >
                    {{ data()!.kpis.avgCartVariation! >= 0 ? '+' : ''
                    }}{{ data()!.kpis.avgCartVariation }}% vs last period
                  </span>
                }
              </div>

              <!-- Conversion summary -->
              <div class="bg-gray-50 rounded-lg p-5">
                <div class="text-sm text-text-secondary mb-1">Conversion Rate</div>
                <div
                  class="text-xl font-bold text-text-primary font-[family-name:var(--font-heading)]"
                >
                  {{
                    data()?.kpis?.conversionRate !== undefined
                      ? data()!.kpis.conversionRate + '%'
                      : 'N/A'
                  }}
                </div>
                <span class="text-xs text-text-secondary mt-1 inline-block">
                  Based on current period
                </span>
              </div>
            </div>

            <!-- Quick revenue breakdown bar -->
            <div class="mt-6 pt-6 border-t border-border-light">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-text-secondary">Revenue Target Progress</span>
                <span class="text-sm font-medium text-text-primary">
                  {{ formatCurrency(data()?.kpis?.totalRevenue || 0) }}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
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
  private readonly notifications = inject(NotificationService);

  loading = signal(true);
  data = signal<DashboardData | null>(null);
  lowStockCount = signal(0);
  unreadMessages = signal(0);

  adminFirstName = computed(() => this.authService.admin()?.firstName || 'Admin');

  revenueProgress = computed(() => {
    const revenue = this.data()?.kpis?.totalRevenue || 0;
    // Estimate progress as percentage capped at 100
    const target = 100000;
    return Math.min((revenue / target) * 100, 100);
  });

  ngOnInit() {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading.set(true);

    this.analyticsService.getDashboard().subscribe({
      next: (data) => {
        this.data.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error('Failed to load dashboard data');
        this.loading.set(false);
      },
    });

    // Super admin: load additional data
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
        const lowStockItems = stock.items.filter(
          (item: StockItem) =>
            item.status === 'low' || item.status === 'critical' || item.status === 'out_of_stock',
        );
        this.lowStockCount.set(lowStockItems.length);

        const unread = messages.filter((msg: ContactMessage) => !msg.isRead);
        this.unreadMessages.set(unread.length);
      },
      error: () => {
        // Non-critical: silently fail, counts stay at 0
      },
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
