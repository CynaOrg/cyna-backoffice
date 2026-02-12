export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  guestEmail?: string;
  status: OrderStatus;
  orderType: string;
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  billingAddressSnapshot: any;
  shippingAddressSnapshot?: any;
  stripePaymentIntentId?: string;
  paidAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productSnapshot?: any;
  productName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice?: number;
  billingPeriod?: string;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'refunded';
