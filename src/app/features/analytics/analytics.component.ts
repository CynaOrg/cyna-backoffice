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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  DashboardData,
  DashboardKPIs,
  StockStatusResponse,
  SalesDataPoint,
  SalesByCategoryData,
  SalesByProductTypeData,
  MrrDataPoint,
  StockItem,
} from '../../core/models/analytics.model';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorDownloadSimple } from '@ng-icons/phosphor-icons/regular';

interface AnalyticsKPIs {
  totalRevenue: number;
  revenueVariation?: number;
  mrr: number;
  mrrVariation?: number;
  totalOrders: number;
  ordersVariation?: number;
  avgCartValue: number;
  avgCartVariation?: number;
}

interface AnalyticsViewModel {
  kpis: AnalyticsKPIs;
}

import { Chart, registerables } from 'chart.js';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    KpiCardComponent,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    TranslateModule,
    NgIconComponent,
  ],
  viewProviders: [provideIcons({ phosphorDownloadSimple })],
  template: `
    <div class="animate-fade-in-up">
      <!-- Period Selector -->
      <div class="flex items-center justify-end mb-6">
        <div
          class="inline-flex items-center gap-0.5 rounded-lg bg-background p-1 border border-border-light"
        >
          @for (opt of periodOptions; track opt.value) {
            <button
              (click)="onPeriodSelect(opt.value)"
              class="px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200"
              [class]="
                selectedPeriod() === opt.value
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface'
              "
            >
              {{ opt.labelKey | translate }}
            </button>
          }
        </div>
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <app-kpi-card
            [value]="formatCurrency(dashboard()?.kpis?.totalRevenue || 0)"
            [label]="'ANALYTICS.TOTAL_REVENUE' | translate"
            iconBgClass="bg-success-light"
            iconClass="text-success"
            iconPath="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            [variation]="dashboard()?.kpis?.revenueVariation"
          />
          <app-kpi-card
            [value]="formatCurrency(dashboard()?.kpis?.mrr || 0)"
            [label]="'ANALYTICS.MRR' | translate"
            iconBgClass="bg-info-light"
            iconClass="text-info"
            iconPath="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            [variation]="dashboard()?.kpis?.mrrVariation"
          />
          <app-kpi-card
            [value]="(dashboard()?.kpis?.totalOrders || 0).toString()"
            [label]="'ANALYTICS.TOTAL_ORDERS' | translate"
            iconBgClass="bg-primary-light"
            iconClass="text-primary"
            iconPath="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
            [variation]="dashboard()?.kpis?.ordersVariation"
          />
          <app-kpi-card
            [value]="formatCurrency(dashboard()?.kpis?.avgCartValue || 0)"
            [label]="'ANALYTICS.AVG_CART' | translate"
            iconBgClass="bg-warning-light"
            iconClass="text-warning"
            iconPath="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            [variation]="dashboard()?.kpis?.avgCartVariation"
          />
        </div>

        <!-- Sales Overview Chart -->
        <div class="rounded-xl border border-border-light bg-surface shadow-sm mb-6">
          <div class="flex items-center justify-between px-6 py-4 border-b border-border-light">
            <h3 class="text-lg font-semibold text-text-primary !m-0">
              {{ 'ANALYTICS.SALES_OVERVIEW' | translate }}
            </h3>
            <div class="inline-flex items-center gap-0.5 rounded-lg bg-background p-1">
              <button
                (click)="onGroupByChange('day')"
                class="px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200"
                [class]="
                  groupBy() === 'day'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                "
              >
                {{ 'ANALYTICS.DAY' | translate }}
              </button>
              <button
                (click)="onGroupByChange('week')"
                class="px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200"
                [class]="
                  groupBy() === 'week'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                "
              >
                {{ 'ANALYTICS.WEEK' | translate }}
              </button>
              <button
                (click)="onGroupByChange('month')"
                class="px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200"
                [class]="
                  groupBy() === 'month'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                "
              >
                {{ 'ANALYTICS.MONTH' | translate }}
              </button>
            </div>
          </div>
          <div class="p-6">
            <canvas #salesChart height="100"></canvas>
          </div>
        </div>

        <!-- Revenue Breakdown: Category + Product Type -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Sales by Category -->
          <div class="rounded-xl border border-border-light bg-surface shadow-sm">
            <div class="px-6 py-4 border-b border-border-light">
              <h3 class="text-lg font-semibold text-text-primary !m-0">
                {{ 'ANALYTICS.SALES_BY_CATEGORY' | translate }}
              </h3>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-6">
                <div class="w-44 h-44 flex-shrink-0">
                  <canvas #categoryChart></canvas>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="space-y-3">
                    @for (cat of categoryData(); track cat.category) {
                      <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-2 min-w-0">
                          <span
                            class="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            [style.background-color]="chartColors[$index % chartColors.length]"
                          ></span>
                          <span class="text-sm text-text-primary truncate">{{ cat.category }}</span>
                        </div>
                        <div class="flex items-center gap-3 flex-shrink-0">
                          <span class="text-sm font-medium text-text-primary tabular-nums">
                            {{ formatCurrency(cat.revenue) }}
                          </span>
                          <span class="text-xs text-text-muted w-10 text-right tabular-nums">
                            {{ cat.percentage }}%
                          </span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sales by Product Type -->
          <div class="rounded-xl border border-border-light bg-surface shadow-sm">
            <div class="px-6 py-4 border-b border-border-light">
              <h3 class="text-lg font-semibold text-text-primary !m-0">
                {{ 'ANALYTICS.SALES_BY_TYPE' | translate }}
              </h3>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-6">
                <div class="w-44 h-44 flex-shrink-0">
                  <canvas #productTypeChart></canvas>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="space-y-3">
                    @for (pt of productTypeData(); track pt.productType) {
                      <div class="flex items-center justify-between gap-3">
                        <div class="flex items-center gap-2 min-w-0">
                          <span
                            class="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            [style.background-color]="chartColors[$index % chartColors.length]"
                          ></span>
                          <span class="text-sm text-text-primary truncate">{{
                            pt.productType
                          }}</span>
                        </div>
                        <div class="flex items-center gap-3 flex-shrink-0">
                          <span class="text-sm font-medium text-text-primary tabular-nums">
                            {{ formatCurrency(pt.revenue) }}
                          </span>
                          <span class="text-xs text-text-muted w-10 text-right tabular-nums">
                            {{ pt.percentage }}%
                          </span>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- MRR Evolution -->
        <div class="rounded-xl border border-border-light bg-surface shadow-sm mb-6">
          <div class="flex items-center justify-between px-6 py-4 border-b border-border-light">
            <h3 class="text-lg font-semibold text-text-primary !m-0">
              {{ 'ANALYTICS.MRR_EVOLUTION' | translate }}
            </h3>
            <span class="text-sm text-primary font-medium">
              {{ 'ANALYTICS.MONTHLY_TREND' | translate }}
            </span>
          </div>
          <div class="p-6">
            <canvas #mrrChart height="80"></canvas>
          </div>
        </div>

        <!-- Stock Status -->
        @if (stockItems().length > 0) {
          <div class="rounded-xl border border-border-light bg-surface shadow-sm mb-6">
            <div class="px-6 py-4 border-b border-border-light">
              <h3 class="text-lg font-semibold text-text-primary !m-0">
                {{ 'ANALYTICS.STOCK_STATUS' | translate }}
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border-light">
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.PRODUCT_NAME' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.SKU' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.CURRENT_STOCK' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.ALERT_THRESHOLD' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.STATUS' | translate }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-light">
                  @for (item of stockItems(); track item.productId) {
                    <tr class="hover:bg-background transition-colors">
                      <td class="px-6 py-4 text-sm font-medium text-text-primary">
                        {{ item.productName }}
                      </td>
                      <td class="px-6 py-4 text-sm text-text-secondary font-mono">
                        {{ item.sku }}
                      </td>
                      <td class="px-6 py-4 text-sm text-text-primary text-right tabular-nums">
                        {{ item.currentStock }}
                      </td>
                      <td class="px-6 py-4 text-sm text-text-secondary text-right tabular-nums">
                        {{ item.alertThreshold }}
                      </td>
                      <td class="px-6 py-4">
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
        <div class="rounded-xl border border-border-light bg-surface shadow-sm">
          <div class="px-6 py-4 border-b border-border-light">
            <h3 class="text-lg font-semibold text-text-primary !m-0">
              {{ 'ANALYTICS.EXPORT_DATA' | translate }}
            </h3>
          </div>
          <div class="p-6">
            <div class="flex flex-wrap items-end gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-medium text-text-secondary">
                  {{ 'ANALYTICS.FROM' | translate }}
                </label>
                <input
                  type="date"
                  class="px-3 py-2 border border-border rounded-lg text-sm bg-input-bg focus:border-border-focus focus:outline-none transition-colors"
                  [value]="exportDateFrom()"
                  (change)="onExportDateFromChange($event)"
                />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-medium text-text-secondary">
                  {{ 'ANALYTICS.TO' | translate }}
                </label>
                <input
                  type="date"
                  class="px-3 py-2 border border-border rounded-lg text-sm bg-input-bg focus:border-border-focus focus:outline-none transition-colors"
                  [value]="exportDateTo()"
                  (change)="onExportDateToChange($event)"
                />
              </div>
              <div class="flex items-center gap-2 ml-auto">
                <button
                  (click)="exportData('sales')"
                  [disabled]="exporting()"
                  class="inline-flex items-center gap-2 bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <ng-icon name="phosphorDownloadSimple" size="16" />
                  {{ 'ANALYTICS.EXPORT_SALES' | translate }}
                </button>
                <button
                  (click)="exportData('orders')"
                  [disabled]="exporting()"
                  class="inline-flex items-center gap-2 border border-border bg-surface text-text-primary hover:bg-background rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <ng-icon name="phosphorDownloadSimple" size="16" />
                  {{ 'ANALYTICS.EXPORT_ORDERS' | translate }}
                </button>
                <button
                  (click)="exportData('subscriptions')"
                  [disabled]="exporting()"
                  class="inline-flex items-center gap-2 border border-border bg-surface text-text-primary hover:bg-background rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <ng-icon name="phosphorDownloadSimple" size="16" />
                  {{ 'ANALYTICS.EXPORT_SUBSCRIPTIONS' | translate }}
                </button>
              </div>
            </div>
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
  private readonly translate = inject(TranslateService);

  loading = signal(true);
  selectedPeriod = signal<string>('month');
  groupBy = signal<string>('month');

  dashboard = signal<AnalyticsViewModel | null>(null);
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

  readonly periodOptions = [
    { value: 'today', labelKey: 'ANALYTICS.TODAY' },
    { value: 'week', labelKey: 'ANALYTICS.THIS_WEEK' },
    { value: 'month', labelKey: 'ANALYTICS.THIS_MONTH' },
    { value: 'quarter', labelKey: 'ANALYTICS.THIS_QUARTER' },
    { value: 'year', labelKey: 'ANALYTICS.THIS_YEAR' },
  ];

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {}

  onPeriodSelect(value: string): void {
    this.selectedPeriod.set(value);
    this.loadData();
  }

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
      dashboard: this.analyticsService.getDashboard(period).pipe(catchError(() => of(null))),
      sales: this.analyticsService
        .getSales(period, this.groupBy())
        .pipe(catchError(() => of(null))),
      category: this.analyticsService.getSalesByCategory(period).pipe(catchError(() => of(null))),
      productType: this.analyticsService
        .getSalesByProductType(period)
        .pipe(catchError(() => of(null))),
      mrr: this.analyticsService.getMrr().pipe(catchError(() => of(null))),
      stock: this.analyticsService.getStockStatus().pipe(catchError(() => of(null))),
    }).subscribe({
      next: (results) => {
        const apiDashboard = results.dashboard as DashboardData | null;
        if (apiDashboard) {
          this.dashboard.set({
            kpis: {
              totalRevenue: apiDashboard.revenue?.total ?? 0,
              revenueVariation: apiDashboard.revenue?.changePercent,
              mrr: apiDashboard.subscriptions?.mrr ?? 0,
              mrrVariation: apiDashboard.subscriptions?.changePercent,
              totalOrders: apiDashboard.orders?.total ?? 0,
              ordersVariation: apiDashboard.orders?.changePercent,
              avgCartValue: apiDashboard.averageOrderValue ?? 0,
            },
          });
        }
        this.salesData.set(results.sales?.sales || []);
        this.categoryData.set(results.category?.data || []);
        this.productTypeData.set(results.productType?.data || []);
        this.mrrHistory.set(results.mrr?.history || []);
        const stockRes = results.stock as StockStatusResponse | null;
        this.stockItems.set(stockRes?.products || []);
        this.loading.set(false);
        setTimeout(() => this.renderAllCharts(), 100);
      },
      error: () => {
        this.notifications.error(this.translate.instant('ANALYTICS.LOAD_FAILED'));
        this.loading.set(false);
      },
    });
  }

  loadSalesData(): void {
    const period = this.selectedPeriod();
    this.analyticsService.getSales(period, this.groupBy()).subscribe({
      next: (result) => {
        this.salesData.set(result?.sales || []);
        setTimeout(() => this.renderSalesChart(), 100);
      },
      error: () => {
        this.notifications.error(this.translate.instant('ANALYTICS.LOAD_FAILED'));
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
      ok: this.translate.instant('ANALYTICS.OK'),
      low: this.translate.instant('ANALYTICS.LOW'),
      critical: this.translate.instant('ANALYTICS.CRITICAL'),
      out_of_stock: this.translate.instant('ANALYTICS.OUT_OF_STOCK'),
    };
    return map[status] || status;
  }

  exportData(type: 'sales' | 'orders' | 'subscriptions'): void {
    const dateFrom = this.exportDateFrom();
    const dateTo = this.exportDateTo();

    if (!dateFrom || !dateTo) {
      this.notifications.error(this.translate.instant('ANALYTICS.SELECT_DATE_RANGE'));
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
        this.notifications.success(this.translate.instant('ANALYTICS.EXPORT_SUCCESS'));
      },
      error: () => {
        this.notifications.error(this.translate.instant('ANALYTICS.EXPORT_FAILED'));
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
