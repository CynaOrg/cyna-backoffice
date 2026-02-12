export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  vatNumber?: string;
  isActive: boolean;
  isVerified: boolean;
  preferredLanguage: string;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt?: string;
}
