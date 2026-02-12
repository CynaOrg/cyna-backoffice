import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {
  CarouselSlide,
  HeroText,
  TopProductConfig,
  ContactMessage,
  CreateSlideDto,
  UpdateSlideDto,
  UpdateHeroTextDto,
  UpdateTopConfigDto,
} from '../models/content.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly api = inject(ApiService);
  private readonly basePath = 'admin/content';

  // Carousel
  getCarouselSlides(): Observable<CarouselSlide[]> {
    return this.api.getRaw<CarouselSlide[]>(`${this.basePath}/carousel`);
  }

  createSlide(dto: CreateSlideDto): Observable<CarouselSlide> {
    return this.api.postRaw<CreateSlideDto, CarouselSlide>(`${this.basePath}/carousel`, dto);
  }

  updateSlide(slideId: string, dto: UpdateSlideDto): Observable<CarouselSlide> {
    return this.api.patchRaw<UpdateSlideDto, CarouselSlide>(
      `${this.basePath}/carousel/${slideId}`,
      dto,
    );
  }

  deleteSlide(slideId: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/carousel/${slideId}`);
  }

  reorderCarousel(slideIds: string[]): Observable<void> {
    return this.api.patchRaw<{ slideIds: string[] }, void>(`${this.basePath}/carousel/reorder`, {
      slideIds,
    });
  }

  // Hero Text
  getHeroText(): Observable<HeroText> {
    return this.api.getRaw<HeroText>(`${this.basePath}/hero-text`);
  }

  updateHeroText(dto: UpdateHeroTextDto): Observable<HeroText> {
    return this.api.patchRaw<UpdateHeroTextDto, HeroText>(`${this.basePath}/hero-text`, dto);
  }

  // Top Products
  getTopConfig(type: 'top_services' | 'top_products'): Observable<TopProductConfig> {
    return this.api.getRaw<TopProductConfig>(
      `${this.basePath}/${type === 'top_services' ? 'top-services' : 'top-products'}`,
    );
  }

  updateTopConfig(
    type: 'top_services' | 'top_products',
    dto: UpdateTopConfigDto,
  ): Observable<TopProductConfig> {
    const endpoint = type === 'top_services' ? 'top-services' : 'top-products';
    return this.api.patchRaw<UpdateTopConfigDto, TopProductConfig>(
      `${this.basePath}/${endpoint}`,
      dto,
    );
  }

  // Contact Messages
  getContactMessages(
    params?: Record<string, string | number | boolean>,
  ): Observable<ContactMessage[]> {
    return this.api.getRaw<ContactMessage[]>(`${this.basePath}/contact-messages`, params);
  }

  updateContactMessage(
    messageId: string,
    body: { isRead?: boolean; isTreated?: boolean },
  ): Observable<ContactMessage> {
    return this.api.patchRaw<typeof body, ContactMessage>(
      `${this.basePath}/contact-messages/${messageId}`,
      body,
    );
  }

  deleteContactMessage(messageId: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/contact-messages/${messageId}`);
  }
}
