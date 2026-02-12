export interface CarouselSlide {
  id: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  imageUrl: string;
  buttonTextFr: string;
  buttonTextEn: string;
  buttonLink: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface HeroText {
  id: string;
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  updatedAt: string;
}

export interface TopProductConfig {
  id: string;
  type: 'top_services' | 'top_products';
  productIds: string[];
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  isTreated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSlideDto {
  titleFr: string;
  titleEn: string;
  subtitleFr: string;
  subtitleEn: string;
  imageUrl: string;
  buttonTextFr: string;
  buttonTextEn: string;
  buttonLink: string;
  isActive?: boolean;
}

export interface UpdateSlideDto extends Partial<CreateSlideDto> {}

export interface UpdateHeroTextDto {
  titleFr?: string;
  titleEn?: string;
  subtitleFr?: string;
  subtitleEn?: string;
}

export interface UpdateTopConfigDto {
  productIds: string[];
}
