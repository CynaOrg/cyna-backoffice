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
  period: string;
  revenue: number;
  orderCount: number;
}

export interface SalesData {
  salesByMonth: SalesDataPoint[];
}

export interface SalesByCategoryData {
  category: string;
  revenue: number;
  orderCount: number;
  percentage: number;
}

export interface SalesByProductTypeData {
  productType: string;
  revenue: number;
  orderCount: number;
  percentage: number;
}

export interface MrrDataPoint {
  period: string;
  mrr: number;
  growth: number;
}

export interface StockItem {
  productId: string;
  productName: string;
  sku: string;
  currentStock: number;
  alertThreshold: number;
  status: 'ok' | 'low' | 'critical' | 'out_of_stock';
}

export interface ExportParams {
  dateFrom: string;
  dateTo: string;
  format: 'csv' | 'xlsx';
}
