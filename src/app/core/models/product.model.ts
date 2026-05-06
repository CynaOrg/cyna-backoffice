export interface Product {
  id: string;
  categoryId: string;
  slug: string;
  sku: string;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
  shortDescriptionFr?: string;
  shortDescriptionEn?: string;
  productType: 'saas' | 'physical' | 'license';
  priceMonthly?: number;
  priceYearly?: number;
  priceUnit?: number;
  stockQuantity?: number;
  stockAlertThreshold: number;
  isAvailable: boolean;
  isFeatured: boolean;
  displayOrder: number;
  stripeProductId?: string;
  stripePriceIdMonthly?: string;
  stripePriceIdYearly?: string;
  stripePriceIdUnit?: string;
  images: ProductImage[];
  characteristics: ProductCharacteristic[];
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  altTextFr?: string;
  altTextEn?: string;
  isPrimary: boolean;
  displayOrder: number;
  storageKey?: string;
  fileSize?: number;
  mimeType?: string;
}

export interface ProductCharacteristic {
  id: string;
  keyFr: string;
  keyEn: string;
  valueFr: string;
  valueEn: string;
  displayOrder?: number;
}

export interface Category {
  id: string;
  slug: string;
  nameFr: string;
  nameEn: string;
  descriptionFr?: string;
  descriptionEn?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  productsCount?: number;
  createdAt: string;
}

export interface CreateProductDto {
  categoryId: string;
  slug: string;
  sku: string;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
  shortDescriptionFr?: string;
  shortDescriptionEn?: string;
  productType: 'saas' | 'physical' | 'license';
  priceMonthly?: number;
  priceYearly?: number;
  priceUnit?: number;
  stockQuantity?: number;
  stockAlertThreshold?: number;
  isAvailable?: boolean;
  isFeatured?: boolean;
  displayOrder?: number;
  characteristics?: {
    keyFr: string;
    keyEn: string;
    valueFr: string;
    valueEn: string;
    displayOrder?: number;
  }[];
}
