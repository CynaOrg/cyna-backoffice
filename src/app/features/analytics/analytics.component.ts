import {
  Component,
  inject,
  signal,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { AnalyticsService } from '../../core/services/analytics.service';
import { NotificationService } from '../../core/services/notification.service';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import {
  DashboardData,
  SalesDataPoint,
  SalesByCategoryData,
  SalesByProductTypeData,
  MrrDataPoint,
  StockItem,
} from '../../core/models/analytics.model';
import { Chart, registerables } from 'chart.js';
import { forkJoin } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [KpiCardComponent, LoadingSpinnerComponent, StatusBadgeComponent],
  template: `
    <div>
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
            Analytics
          </h1>
          <p class="text-sm text-text-secondary mt-1">Sales, revenue and performance insights</p>
        </div>
        <select
          class="px-3 py-2 border border-border rounded-lg text-sm bg-white"
          [value]="selectedPeriod()"
          (change)="onPeriodChange($event)"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="12m">Last 12 months</option>
        </select>
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <app-kpi-card
            [value]="formatCurrency(dashboard()?.kpis?.totalRevenue || 0)"
            label="Total Revenue"
            iconBgClass="bg-emerald-50"
            iconClass="text-emerald-600"
            iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            [variation]="dashboard()?.kpis?.revenueVariation"
          />
          <app-kpi-card
            [value]="formatCurrency(dashboard()?.kpis?.mrr || 0)"
            label="MRR"
            iconBgClass="bg-blue-50"
            iconClass="text-blue-600"
            iconPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            [variation]="dashboard()?.kpis?.mrrVariation"
          />
          <app-kpi-card
            [value]="(dashboard()?.kpis?.totalOrders || 0).toString()"
            label="Total Orders"
            iconBgClass="bg-purple-50"
            iconClass="text-purple-600"
            iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            [variation]="dashboard()?.kpis?.ordersVariation"
          />
          <app-kpi-card
            [value]="formatCurrency(dashboard()?.kpis?.avgCartValue || 0)"
            label="Avg. Cart Value"
            iconBgClass="bg-amber-50"
            iconClass="text-amber-600"
            iconPath="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            [variation]="dashboard()?.kpis?.avgCartVariation"
          />
        </div>

        <!-- Sales Chart -->
        <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold font-[family-name:var(--font-heading)]">
              Sales Overview
            </h3>
            <div class="flex items-center gap-1">
              <button
                (click)="onGroupByChange('day')"
                class="px-3 py-1.5 text-sm rounded-lg transition-colors"
                [class]="
                  groupBy() === 'day'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                "
              >
                Day
              </button>
              <button
                (click)="onGroupByChange('week')"
                class="px-3 py-1.5 text-sm rounded-lg transition-colors"
                [class]="
                  groupBy() === 'week'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                "
              >
                Week
              </button>
              <button
                (click)="onGroupByChange('month')"
                class="px-3 py-1.5 text-sm rounded-lg transition-colors"
                [class]="
                  groupBy() === 'month'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
                "
              >
                Month
              </button>
            </div>
          </div>
          <canvas #salesChart height="100"></canvas>
        </div>

        <!-- Charts Row: Category + Product Type -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Sales by Category -->
          <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
              Sales by Category
            </h3>
            <div class="flex items-center gap-6">
              <div class="w-48 h-48 flex-shrink-0">
                <canvas #categoryChart></canvas>
              </div>
              <div class="flex-1 min-w-0">
                <table class="w-full">
                  <thead>
                    <tr>
                      <th
                        class="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider pb-2"
                      >
                        Category
                      </th>
                      <th
                        class="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider pb-2"
                      >
                        Revenue
                      </th>
                      <th
                        class="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider pb-2"
                      >
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (cat of categoryData(); track cat.category) {
                      <tr class="border-t border-border-light">
                        <td class="py-2 text-sm text-text-primary">
                          <div class="flex items-center gap-2">
                            <span
                              class="w-2.5 h-2.5 rounded-full flex-shrink-0"
                              [style.background-color]="chartColors[$index % chartColors.length]"
                            ></span>
                            {{ cat.category }}
                          </div>
                        </td>
                        <td class="py-2 text-sm text-text-primary text-right">
                          {{ formatCurrency(cat.revenue) }}
                        </td>
                        <td class="py-2 text-sm text-text-secondary text-right">
                          {{ cat.percentage }}%
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Sales by Product Type -->
          <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
              Sales by Product Type
            </h3>
            <div class="flex items-center gap-6">
              <div class="w-48 h-48 flex-shrink-0">
                <canvas #productTypeChart></canvas>
              </div>
              <div class="flex-1 min-w-0">
                <table class="w-full">
                  <thead>
                    <tr>
                      <th
                        class="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider pb-2"
                      >
                        Type
                      </th>
                      <th
                        class="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider pb-2"
                      >
                        Revenue
                      </th>
                      <th
                        class="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider pb-2"
                      >
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (pt of productTypeData(); track pt.productType) {
                      <tr class="border-t border-border-light">
                        <td class="py-2 text-sm text-text-primary">
                          <div class="flex items-center gap-2">
                            <span
                              class="w-2.5 h-2.5 rounded-full flex-shrink-0"
                              [style.background-color]="chartColors[$index % chartColors.length]"
                            ></span>
                            {{ pt.productType }}
                          </div>
                        </td>
                        <td class="py-2 text-sm text-text-primary text-right">
                          {{ formatCurrency(pt.revenue) }}
                        </td>
                        <td class="py-2 text-sm text-text-secondary text-right">
                          {{ pt.percentage }}%
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- MRR Evolution -->
        <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6 mb-6">
          <h3 class="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
            MRR Evolution
          </h3>
          <canvas #mrrChart height="80"></canvas>
        </div>

        <!-- Stock Status -->
        @if (stockItems().length > 0) {
          <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6 mb-6">
            <h3 class="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
              Stock Status
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border-light">
                    <th
                      class="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider pb-3 pr-4"
                    >
                      Product Name
                    </th>
                    <th
                      class="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider pb-3 pr-4"
                    >
                      SKU
                    </th>
                    <th
                      class="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider pb-3 pr-4"
                    >
                      Current Stock
                    </th>
                    <th
                      class="text-right text-xs font-semibold text-text-secondary uppercase tracking-wider pb-3 pr-4"
                    >
                      Alert Threshold
                    </th>
                    <th
                      class="text-left text-xs font-semibold text-text-secondary uppercase tracking-wider pb-3"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  @for (item of stockItems(); track item.productId) {
                    <tr class="border-b border-border-light last:border-b-0">
                      <td class="py-3 pr-4 text-sm text-text-primary font-medium">
                        {{ item.productName }}
                      </td>
                      <td class="py-3 pr-4 text-sm text-text-secondary font-mono">
                        {{ item.sku }}
                      </td>
                      <td class="py-3 pr-4 text-sm text-text-primary text-right">
                        {{ item.currentStock }}
                      </td>
                      <td class="py-3 pr-4 text-sm text-text-secondary text-right">
                        {{ item.alertThreshold }}
                      </td>
                      <td class="py-3">
                        <span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          [class]="getStockStatusClass(item.status)"
                        >
                          {{ getStockStatusLabel(item.status) }}
                        </span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- Export Section -->
        <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
          <h3 class="text-lg font-semibold font-[family-name:var(--font-heading)] mb-4">
            Export Data
          </h3>
          <div class="flex flex-wrap items-end gap-4">
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-text-secondary">From</label>
              <input
                type="date"
                class="px-3 py-2 border border-border rounded-lg text-sm bg-white"
                [value]="exportDateFrom()"
                (change)="onExportDateFromChange($event)"
              />
            </div>
            <div class="flex flex-col gap-1">
              <label class="text-xs font-medium text-text-secondary">To</label>
              <input
                type="date"
                class="px-3 py-2 border border-border rounded-lg text-sm bg-white"
                [value]="exportDateTo()"
                (change)="onExportDateToChange($event)"
              />
            </div>
            <button
              (click)="exportData('sales')"
              [disabled]="exporting()"
              class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              Export Sales
            </button>
            <button
              (click)="exportData('orders')"
              [disabled]="exporting()"
              class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              Export Orders
            </button>
            <button
              (click)="exportData('subscriptions')"
              [disabled]="exporting()"
              class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
            >
              Export Subscriptions
            </button>
          </div>
        </div>
      }
    </div>
  `,
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('salesChart') salesChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('categoryChart') categoryChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('productTypeChart') productTypeChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mrrChart') mrrChartRef!: ElementRef<HTMLCanvasElement>;

  private readonly analyticsService = inject(AnalyticsService);
  private readonly notifications = inject(NotificationService);

  loading = signal(true);
  selectedPeriod = signal<string>('30d');
  groupBy = signal<string>('month');

  dashboard = signal<DashboardData | null>(null);
  salesData = signal<SalesDataPoint[]>([]);
  categoryData = signal<SalesByCategoryData[]>([]);
  productTypeData = signal<SalesByProductTypeData[]>([]);
  mrrHistory = signal<MrrDataPoint[]>([]);
  stockItems = signal<StockItem[]>([]);

  exportDateFrom = signal<string>(this.getDefaultDateFrom());
  exportDateTo = signal<string>(this.getDefaultDateTo());
  exporting = signal(false);

  private salesChart: Chart | null = null;
  private categoryChart: Chart | null = null;
  private productTypeChart: Chart | null = null;
  private mrrChart: Chart | null = null;

  readonly chartColors = [
    '#3B5BFE',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
    '#84CC16',
  ];

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {}

  onPeriodChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedPeriod.set(value);
    this.loadData();
  }

  onGroupByChange(value: string): void {
    this.groupBy.set(value);
    this.loadSalesData();
  }

  loadData(): void {
    this.loading.set(true);
    const period = this.selectedPeriod();

    forkJoin({
      dashboard: this.analyticsService.getDashboard(period),
      sales: this.analyticsService.getSales(period, this.groupBy()),
      category: this.analyticsService.getSalesByCategory(period),
      productType: this.analyticsService.getSalesByProductType(period),
      mrr: this.analyticsService.getMrr(),
      stock: this.analyticsService.getStockStatus(),
    }).subscribe({
      next: (results) => {
        this.dashboard.set(results.dashboard);
        this.salesData.set(results.sales.sales || []);
        this.categoryData.set(results.category.data || []);
        this.productTypeData.set(results.productType.data || []);
        this.mrrHistory.set(results.mrr.history || []);
        this.stockItems.set(results.stock.items || []);
        this.loading.set(false);
        setTimeout(() => this.renderAllCharts(), 100);
      },
      error: () => {
        this.notifications.error('Failed to load analytics data');
        this.loading.set(false);
      },
    });
  }

  loadSalesData(): void {
    const period = this.selectedPeriod();
    this.analyticsService.getSales(period, this.groupBy()).subscribe({
      next: (result) => {
        this.salesData.set(result.sales || []);
        setTimeout(() => this.renderSalesChart(), 100);
      },
      error: () => {
        this.notifications.error('Failed to load sales data');
      },
    });
  }

  renderAllCharts(): void {
    this.renderSalesChart();
    this.renderCategoryChart();
    this.renderProductTypeChart();
    this.renderMrrChart();
  }

  renderSalesChart(): void {
    const sales = this.salesData();
    if (!sales.length || !this.salesChartRef) return;

    if (this.salesChart) this.salesChart.destroy();

    this.salesChart = new Chart(this.salesChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: sales.map((s) => s.period),
        datasets: [
          {
            label: 'Revenue',
            data: sales.map((s) => s.revenue),
            backgroundColor: '#3B5BFE33',
            borderColor: '#3B5BFE',
            borderWidth: 2,
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => this.formatCurrency(ctx.parsed.y ?? 0),
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (v) => this.formatCurrency(Number(v)),
            },
            grid: { color: '#f3f4f6' },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  }

  renderCategoryChart(): void {
    const data = this.categoryData();
    if (!data.length || !this.categoryChartRef) return;

    if (this.categoryChart) this.categoryChart.destroy();

    this.categoryChart = new Chart(this.categoryChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: data.map((d) => d.category),
        datasets: [
          {
            data: data.map((d) => d.revenue),
            backgroundColor: data.map((_, i) => this.chartColors[i % this.chartColors.length]),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '65%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const value = this.formatCurrency(ctx.parsed);
                const pct = data[ctx.dataIndex]?.percentage ?? 0;
                return `${ctx.label}: ${value} (${pct}%)`;
              },
            },
          },
        },
      },
    });
  }

  renderProductTypeChart(): void {
    const data = this.productTypeData();
    if (!data.length || !this.productTypeChartRef) return;

    if (this.productTypeChart) this.productTypeChart.destroy();

    this.productTypeChart = new Chart(this.productTypeChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: data.map((d) => d.productType),
        datasets: [
          {
            data: data.map((d) => d.revenue),
            backgroundColor: data.map((_, i) => this.chartColors[i % this.chartColors.length]),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const value = this.formatCurrency(ctx.parsed);
                const pct = data[ctx.dataIndex]?.percentage ?? 0;
                return `${ctx.label}: ${value} (${pct}%)`;
              },
            },
          },
        },
      },
    });
  }

  renderMrrChart(): void {
    const data = this.mrrHistory();
    if (!data.length || !this.mrrChartRef) return;

    if (this.mrrChart) this.mrrChart.destroy();

    const ctx = this.mrrChartRef.nativeElement.getContext('2d');
    let gradient: CanvasGradient | string = '#3B5BFE33';
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, 'rgba(59, 91, 254, 0.25)');
      gradient.addColorStop(1, 'rgba(59, 91, 254, 0.02)');
    }

    this.mrrChart = new Chart(this.mrrChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: data.map((d) => d.period),
        datasets: [
          {
            label: 'MRR',
            data: data.map((d) => d.mrr),
            borderColor: '#3B5BFE',
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3B5BFE',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const value = this.formatCurrency(ctx.parsed.y ?? 0);
                const growth = data[ctx.dataIndex]?.growth;
                const growthStr =
                  growth !== undefined ? ` (${growth >= 0 ? '+' : ''}${growth}%)` : '';
                return `MRR: ${value}${growthStr}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: (v) => this.formatCurrency(Number(v)),
            },
            grid: { color: '#f3f4f6' },
          },
          x: {
            grid: { display: false },
          },
        },
      },
    });
  }

  getStockStatusClass(status: StockItem['status']): string {
    const map: Record<string, string> = {
      ok: 'bg-emerald-100 text-emerald-700',
      low: 'bg-amber-100 text-amber-700',
      critical: 'bg-orange-100 text-orange-700',
      out_of_stock: 'bg-red-100 text-red-700',
    };
    return map[status] || 'bg-gray-100 text-gray-600';
  }

  getStockStatusLabel(status: StockItem['status']): string {
    const map: Record<string, string> = {
      ok: 'OK',
      low: 'Low',
      critical: 'Critical',
      out_of_stock: 'Out of Stock',
    };
    return map[status] || status;
  }

  exportData(type: 'sales' | 'orders' | 'subscriptions'): void {
    const dateFrom = this.exportDateFrom();
    const dateTo = this.exportDateTo();

    if (!dateFrom || !dateTo) {
      this.notifications.error('Please select a date range for export');
      return;
    }

    this.exporting.set(true);
    this.analyticsService.exportData(type, dateFrom, dateTo, 'csv').subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cyna-${type}-${dateFrom}-${dateTo}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        this.exporting.set(false);
        this.notifications.success(`${type} data exported successfully`);
      },
      error: () => {
        this.notifications.error(`Failed to export ${type} data`);
        this.exporting.set(false);
      },
    });
  }

  onExportDateFromChange(event: Event): void {
    this.exportDateFrom.set((event.target as HTMLInputElement).value);
  }

  onExportDateToChange(event: Event): void {
    this.exportDateTo.set((event.target as HTMLInputElement).value);
  }

  formatCurrency(v: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(v);
  }

  private getDefaultDateFrom(): string {
    const d = new Date();
    d.setMonth(d.getMonth() - 1);
    return d.toISOString().split('T')[0];
  }

  private getDefaultDateTo(): string {
    return new Date().toISOString().split('T')[0];
  }
}
