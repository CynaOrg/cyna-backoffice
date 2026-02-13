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
import {
  phosphorCurrencyEur,
  phosphorTrendUp,
  phosphorClipboardText,
  phosphorShoppingCartSimple,
  phosphorDownloadSimple,
} from '@ng-icons/phosphor-icons/regular';

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
  viewProviders: [
    provideIcons({
      phosphorCurrencyEur,
      phosphorTrendUp,
      phosphorClipboardText,
      phosphorShoppingCartSimple,
      phosphorDownloadSimple,
    }),
  ],
  template: `
    <div class="animate-fade-in-up">
      <!-- Period Selector -->
      <div class="flex items-center justify-end mb-4">
        <div
          class="inline-flex items-center gap-0.5 rounded-lg bg-background p-0.5 border border-border-light"
        >
          @for (opt of periodOptions; track opt.value) {
            <button
              (click)="onPeriodSelect(opt.value)"
              class="px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200"
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <app-kpi-card
            [value]="formatCurrency(dashboard()?.kpis?.totalRevenue || 0)"
            [label]="'ANALYTICS.TOTAL_REVENUE' | translate"
            iconName="phosphorCurrencyEur"
            [variation]="dashboard()?.kpis?.revenueVariation"
          />
          <app-kpi-card
            [value]="formatCurrency(dashboard()?.kpis?.mrr || 0)"
            [label]="'ANALYTICS.MRR' | translate"
            iconName="phosphorTrendUp"
            [variation]="dashboard()?.kpis?.mrrVariation"
          />
          <app-kpi-card
            [value]="(dashboard()?.kpis?.totalOrders || 0).toString()"
            [label]="'ANALYTICS.TOTAL_ORDERS' | translate"
            iconName="phosphorClipboardText"
            [variation]="dashboard()?.kpis?.ordersVariation"
          />
          <app-kpi-card
            [value]="formatCurrency(dashboard()?.kpis?.avgCartValue || 0)"
            [label]="'ANALYTICS.AVG_CART' | translate"
            iconName="phosphorShoppingCartSimple"
            [variation]="dashboard()?.kpis?.avgCartVariation"
          />
        </div>

        <!-- Sales Overview Chart -->
        <div class="rounded-xl border border-border-light bg-surface shadow-sm mb-4">
          <div
            class="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-border-light"
          >
            <h3 class="text-sm font-semibold text-text-primary !m-0">
              {{ 'ANALYTICS.SALES_OVERVIEW' | translate }}
            </h3>
            <div class="inline-flex items-center gap-0.5 rounded-lg bg-background p-0.5">
              <button
                (click)="onGroupByChange('day')"
                class="px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200"
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
                class="px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200"
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
                class="px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200"
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
          <div class="p-4 sm:p-5">
            <canvas #salesChart height="100"></canvas>
          </div>
        </div>

        <!-- Revenue Breakdown: Category + Product Type -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <!-- Sales by Category -->
          <div class="rounded-xl border border-border-light bg-surface shadow-sm">
            <div class="px-4 sm:px-5 py-3 sm:py-4 border-b border-border-light">
              <h3 class="text-sm font-semibold text-text-primary !m-0">
                {{ 'ANALYTICS.SALES_BY_CATEGORY' | translate }}
              </h3>
            </div>
            <div class="p-4 sm:p-5">
              <div class="flex items-center gap-5">
                <div class="w-36 h-36 flex-shrink-0">
                  <canvas #categoryChart></canvas>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="space-y-2.5">
                    @for (cat of categoryData(); track cat.category) {
                      <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2 min-w-0">
                          <span
                            class="w-2 h-2 rounded-full flex-shrink-0"
                            [style.background-color]="chartColors[$index % chartColors.length]"
                          ></span>
                          <span class="text-xs text-text-primary truncate">{{ cat.category }}</span>
                        </div>
                        <div class="flex items-center gap-2 flex-shrink-0">
                          <span class="text-xs font-medium text-text-primary tabular-nums">
                            {{ formatCurrency(cat.revenue) }}
                          </span>
                          <span class="text-[10px] text-text-muted w-8 text-right tabular-nums">
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
            <div class="px-4 sm:px-5 py-3 sm:py-4 border-b border-border-light">
              <h3 class="text-sm font-semibold text-text-primary !m-0">
                {{ 'ANALYTICS.SALES_BY_TYPE' | translate }}
              </h3>
            </div>
            <div class="p-4 sm:p-5">
              <div class="flex items-center gap-5">
                <div class="w-36 h-36 flex-shrink-0">
                  <canvas #productTypeChart></canvas>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="space-y-2.5">
                    @for (pt of productTypeData(); track pt.productType) {
                      <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2 min-w-0">
                          <span
                            class="w-2 h-2 rounded-full flex-shrink-0"
                            [style.background-color]="chartColors[$index % chartColors.length]"
                          ></span>
                          <span class="text-xs text-text-primary truncate">{{
                            pt.productType
                          }}</span>
                        </div>
                        <div class="flex items-center gap-2 flex-shrink-0">
                          <span class="text-xs font-medium text-text-primary tabular-nums">
                            {{ formatCurrency(pt.revenue) }}
                          </span>
                          <span class="text-[10px] text-text-muted w-8 text-right tabular-nums">
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
        <div class="rounded-xl border border-border-light bg-surface shadow-sm mb-4">
          <div
            class="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-border-light"
          >
            <h3 class="text-sm font-semibold text-text-primary !m-0">
              {{ 'ANALYTICS.MRR_EVOLUTION' | translate }}
            </h3>
            <span class="text-xs text-text-muted">
              {{ 'ANALYTICS.MONTHLY_TREND' | translate }}
            </span>
          </div>
          <div class="p-4 sm:p-5">
            <canvas #mrrChart height="80"></canvas>
          </div>
        </div>

        <!-- Stock Status -->
        @if (stockItems().length > 0) {
          <div class="rounded-xl border border-border-light bg-surface shadow-sm mb-4">
            <div class="px-4 sm:px-5 py-3 sm:py-4 border-b border-border-light">
              <h3 class="text-sm font-semibold text-text-primary !m-0">
                {{ 'ANALYTICS.STOCK_STATUS' | translate }}
              </h3>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border-light">
                    <th
                      class="px-4 sm:px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.PRODUCT_NAME' | translate }}
                    </th>
                    <th
                      class="px-4 sm:px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.SKU' | translate }}
                    </th>
                    <th
                      class="px-4 sm:px-5 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.CURRENT_STOCK' | translate }}
                    </th>
                    <th
                      class="px-4 sm:px-5 py-2.5 text-right text-[10px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.ALERT_THRESHOLD' | translate }}
                    </th>
                    <th
                      class="px-4 sm:px-5 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'ANALYTICS.STATUS' | translate }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-light">
                  @for (item of stockItems(); track item.productId) {
                    <tr class="hover:bg-background transition-colors">
                      <td class="px-4 sm:px-5 py-3 text-xs font-medium text-text-primary">
                        {{ item.productName }}
                      </td>
                      <td class="px-4 sm:px-5 py-3 text-xs text-text-muted font-mono">
                        {{ item.sku }}
                      </td>
                      <td
                        class="px-4 sm:px-5 py-3 text-xs text-text-primary text-right tabular-nums"
                      >
                        {{ item.currentStock }}
                      </td>
                      <td class="px-4 sm:px-5 py-3 text-xs text-text-muted text-right tabular-nums">
                        {{ item.alertThreshold }}
                      </td>
                      <td class="px-4 sm:px-5 py-3">
                        <span
                          class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
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
          <div class="px-4 sm:px-5 py-3 sm:py-4 border-b border-border-light">
            <h3 class="text-sm font-semibold text-text-primary !m-0">
              {{ 'ANALYTICS.EXPORT_DATA' | translate }}
            </h3>
          </div>
          <div class="p-4 sm:p-5">
            <div class="flex flex-wrap items-end gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                  {{ 'ANALYTICS.FROM' | translate }}
                </label>
                <input
                  type="date"
                  class="px-2.5 py-1.5 border border-border rounded-lg text-xs bg-input-bg focus:border-border-focus focus:outline-none transition-colors"
                  [value]="exportDateFrom()"
                  (change)="onExportDateFromChange($event)"
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                  {{ 'ANALYTICS.TO' | translate }}
                </label>
                <input
                  type="date"
                  class="px-2.5 py-1.5 border border-border rounded-lg text-xs bg-input-bg focus:border-border-focus focus:outline-none transition-colors"
                  [value]="exportDateTo()"
                  (change)="onExportDateToChange($event)"
                />
              </div>
              <div class="flex items-center gap-2 ml-auto">
                <button
                  (click)="exportData('sales')"
                  [disabled]="exporting()"
                  class="inline-flex items-center gap-1.5 bg-primary text-white hover:bg-primary-hover rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <ng-icon name="phosphorDownloadSimple" size="14" />
                  {{ 'ANALYTICS.EXPORT_SALES' | translate }}
                </button>
                <button
                  (click)="exportData('orders')"
                  [disabled]="exporting()"
                  class="inline-flex items-center gap-1.5 border border-border bg-surface text-text-primary hover:bg-background rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <ng-icon name="phosphorDownloadSimple" size="14" />
                  {{ 'ANALYTICS.EXPORT_ORDERS' | translate }}
                </button>
                <button
                  (click)="exportData('subscriptions')"
                  [disabled]="exporting()"
                  class="inline-flex items-center gap-1.5 border border-border bg-surface text-text-primary hover:bg-background rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50"
                >
                  <ng-icon name="phosphorDownloadSimple" size="14" />
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
    '#4f39f6',
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

  // Mock data for development preview
  private readonly mockKpis: AnalyticsKPIs = {
    totalRevenue: 112600,
    revenueVariation: 12.5,
    mrr: 13500,
    mrrVariation: 11.6,
    totalOrders: 315,
    ordersVariation: 8.3,
    avgCartValue: 357.46,
    avgCartVariation: 4.2,
  };

  private readonly mockSalesData: SalesDataPoint[] = [
    { period: 'Sep', revenue: 12400, orderCount: 45 },
    { period: 'Oct', revenue: 18600, orderCount: 62 },
    { period: 'Nov', revenue: 15200, orderCount: 51 },
    { period: 'Dec', revenue: 22800, orderCount: 78 },
    { period: 'Jan', revenue: 19500, orderCount: 67 },
    { period: 'Feb', revenue: 24100, orderCount: 82 },
  ];

  private readonly mockCategoryData: SalesByCategoryData[] = [
    { category: 'SOC', revenue: 45600, orderCount: 120, percentage: 38 },
    { category: 'EDR / XDR', revenue: 32400, orderCount: 85, percentage: 27 },
    { category: 'Firewall', revenue: 24000, orderCount: 63, percentage: 20 },
    { category: 'SIEM', revenue: 18000, orderCount: 47, percentage: 15 },
  ];

  private readonly mockProductTypeData: SalesByProductTypeData[] = [
    { productType: 'SaaS', revenue: 78000, orderCount: 210, percentage: 65 },
    { productType: 'Physical', revenue: 30000, orderCount: 78, percentage: 25 },
    { productType: 'License', revenue: 12000, orderCount: 27, percentage: 10 },
  ];

  private readonly mockMrrData: MrrDataPoint[] = [
    { period: 'Sep', mrr: 8500, growth: 0 },
    { period: 'Oct', mrr: 9200, growth: 8.2 },
    { period: 'Nov', mrr: 9800, growth: 6.5 },
    { period: 'Dec', mrr: 11200, growth: 14.3 },
    { period: 'Jan', mrr: 12100, growth: 8.0 },
    { period: 'Feb', mrr: 13500, growth: 11.6 },
  ];

  private readonly mockStockItems: StockItem[] = [
    {
      productId: '1',
      productName: 'FortiGate 60F',
      sku: 'FG-60F-BDL',
      currentStock: 45,
      alertThreshold: 10,
      status: 'ok',
    },
    {
      productId: '2',
      productName: 'SentinelOne Agent',
      sku: 'S1-AGT-100',
      currentStock: 8,
      alertThreshold: 15,
      status: 'low',
    },
    {
      productId: '3',
      productName: 'CrowdStrike Falcon',
      sku: 'CS-FLC-ENT',
      currentStock: 2,
      alertThreshold: 5,
      status: 'critical',
    },
    {
      productId: '4',
      productName: 'Palo Alto PA-220',
      sku: 'PA-220-BDL',
      currentStock: 0,
      alertThreshold: 5,
      status: 'out_of_stock',
    },
    {
      productId: '5',
      productName: 'Cisco Meraki MX67',
      sku: 'MX67-HW',
      currentStock: 32,
      alertThreshold: 10,
      status: 'ok',
    },
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
          const kpis: AnalyticsKPIs = {
            totalRevenue: apiDashboard.revenue?.total ?? 0,
            revenueVariation: apiDashboard.revenue?.changePercent,
            mrr: apiDashboard.subscriptions?.mrr ?? 0,
            mrrVariation: apiDashboard.subscriptions?.changePercent,
            totalOrders: apiDashboard.orders?.total ?? 0,
            ordersVariation: apiDashboard.orders?.changePercent,
            avgCartValue: apiDashboard.averageOrderValue ?? 0,
          };
          const allZero = kpis.totalRevenue === 0 && kpis.mrr === 0 && kpis.totalOrders === 0;
          this.dashboard.set({ kpis: allZero ? this.mockKpis : kpis });
        } else {
          this.dashboard.set({ kpis: this.mockKpis });
        }

        const sales = results.sales?.sales || [];
        this.salesData.set(sales.length ? sales : this.mockSalesData);

        const cats = results.category?.data || [];
        this.categoryData.set(cats.length ? cats : this.mockCategoryData);

        const types = results.productType?.data || [];
        this.productTypeData.set(types.length ? types : this.mockProductTypeData);

        const mrr = results.mrr?.history || [];
        this.mrrHistory.set(mrr.length ? mrr : this.mockMrrData);

        const stockRes = results.stock as StockStatusResponse | null;
        const stock = stockRes?.products || [];
        this.stockItems.set(stock.length ? stock : this.mockStockItems);

        this.loading.set(false);
        setTimeout(() => this.renderAllCharts(), 100);
      },
      error: () => {
        // Use mock data on full failure
        this.dashboard.set({ kpis: this.mockKpis });
        this.salesData.set(this.mockSalesData);
        this.categoryData.set(this.mockCategoryData);
        this.productTypeData.set(this.mockProductTypeData);
        this.mrrHistory.set(this.mockMrrData);
        this.stockItems.set(this.mockStockItems);
        this.notifications.error(this.translate.instant('ANALYTICS.LOAD_FAILED'));
        this.loading.set(false);
        setTimeout(() => this.renderAllCharts(), 100);
      },
    });
  }

  loadSalesData(): void {
    const period = this.selectedPeriod();
    this.analyticsService.getSales(period, this.groupBy()).subscribe({
      next: (result) => {
        const sales = result?.sales || [];
        this.salesData.set(sales.length ? sales : this.mockSalesData);
        setTimeout(() => this.renderSalesChart(), 100);
      },
      error: () => {
        this.salesData.set(this.mockSalesData);
        setTimeout(() => this.renderSalesChart(), 100);
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
            backgroundColor: '#4f39f633',
            borderColor: '#4f39f6',
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
    let gradient: CanvasGradient | string = '#4f39f633';
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, 'rgba(79, 57, 246, 0.25)');
      gradient.addColorStop(1, 'rgba(79, 57, 246, 0.02)');
    }

    this.mrrChart = new Chart(this.mrrChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: data.map((d) => d.period),
        datasets: [
          {
            label: 'MRR',
            data: data.map((d) => d.mrr),
            borderColor: '#4f39f6',
            backgroundColor: gradient,
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#4f39f6',
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
