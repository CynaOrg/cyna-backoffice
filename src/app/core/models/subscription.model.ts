export interface Subscription {
  id: string;
  userId: string;
  productId: string;
  productName?: string;
  status: SubscriptionStatus;
  billingPeriod: 'MONTHLY' | 'YEARLY';
  price: number;
  currency: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  cancelledAt?: string;
  endedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionStatus = 'active' | 'past_due' | 'cancelled' | 'unpaid' | 'paused';
