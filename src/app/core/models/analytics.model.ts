export interface DashboardKPIs {
  totalRevenue: number;
  revenueVariation?: number;
  mrr: number;
  mrrVariation?: number;
  totalOrders: number;
  ordersVariation?: number;
  activeSubscriptions: number;
  subscriptionsVariation?: number;
  avgCartValue: number;
  avgCartVariation?: number;
  conversionRate?: number;
}

export interface DashboardData {
  orders: {
    total: number;
    pending: number;
    cancelled: number;
    completed: number;
    changePercent: number;
  };
  revenue: {
    total: number;
    oneTime: number;
    currency: string;
    recurring: number;
    changePercent: number;
  };
  subscriptions: {
    mrr: number;
    new: number;
    active: number;
    churned: number;
    changePercent: number;
  };
  conversionRate: number;
  averageOrderValue: number;
}

export interface StockStatusResponse {
  summary: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
    totalProducts: number;
  };
  products: StockItem[];
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface SalesResponse {
  period: string;
  groupBy: string;
  series: SalesDataPoint[];
  totals: { revenue: number; orders: number };
}

export interface CategorySalesEntry {
  categoryId: string;
  name: string;
  revenue: number;
  percentage: number;
}

export interface SalesByCategoryResponse {
  period: string;
  categories: CategorySalesEntry[];
}

export type AverageCartProductType = 'saas' | 'physical' | 'license';

export interface AverageCartByTypeEntry {
  productType: AverageCartProductType;
  averageCartValue: number;
  orderCount: number;
}

export interface AverageCartByTypeResponse {
  period: string;
  data: AverageCartByTypeEntry[];
}

export interface SalesByProductTypeData {
  type: string;
  revenue: number;
  count: number;
  percentage: number;
}

export interface MrrDataPoint {
  month: string;
  mrr: number;
}

export interface MrrResponse {
  currentMrr: number;
  history: MrrDataPoint[];
  growth: { monthOverMonth: number; yearOverYear: number };
}

export interface AverageCartResponse {
  period: string;
  averageCartValue: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface StockItem {
  productId: string;
  name: string;
  currentStock: number;
  threshold: number;
  status: string;
}

export interface TopProductData {
  productName: string;
  revenue: number;
  orderCount: number;
  percentage: number;
}

export interface ExportParams {
  dateFrom: string;
  dateTo: string;
  format: 'csv' | 'xlsx';
}
