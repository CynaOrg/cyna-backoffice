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
  kpis: DashboardKPIs;
  recentOrders: {
    id: string;
    orderNumber: string;
    status: string;
    total: number;
    createdAt: string;
  }[];
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
