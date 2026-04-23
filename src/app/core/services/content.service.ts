import { Injectable, inject } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { CacheService } from './cache.service';
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

const CACHE_TTL = 5 * 60_000; // 5 minutes

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly api = inject(ApiService);
  private readonly cache = inject(CacheService);
  private readonly basePath = 'admin/content';

  // Carousel
  getCarouselSlides(): Observable<CarouselSlide[]> {
    return this.cache.get(
      'content:carousel',
      () => this.api.getList<CarouselSlide>(`${this.basePath}/carousel`),
      CACHE_TTL,
    );
  }

  createSlide(dto: CreateSlideDto): Observable<CarouselSlide> {
    return this.api
      .post<CreateSlideDto, CarouselSlide>(`${this.basePath}/carousel`, dto)
      .pipe(tap(() => this.cache.invalidate('content:carousel')));
  }

  updateSlide(slideId: string, dto: UpdateSlideDto): Observable<CarouselSlide> {
    return this.api
      .patch<UpdateSlideDto, CarouselSlide>(`${this.basePath}/carousel/${slideId}`, dto)
      .pipe(tap(() => this.cache.invalidate('content:carousel')));
  }

  deleteSlide(slideId: string): Observable<void> {
    return this.api
      .delete<void>(`${this.basePath}/carousel/${slideId}`)
      .pipe(tap(() => this.cache.invalidate('content:carousel')));
  }

  reorderCarousel(slideIds: string[]): Observable<void> {
    return this.api
      .patch<{ slideIds: string[] }, void>(`${this.basePath}/carousel/reorder`, {
        slideIds,
      })
      .pipe(tap(() => this.cache.invalidate('content:carousel')));
  }

  // Hero Text
  getHeroText(): Observable<HeroText | null> {
    return this.cache.get(
      'content:hero-text',
      () => this.api.get<HeroText>(`${this.basePath}/hero-text`).pipe(catchError(() => of(null))),
      CACHE_TTL,
    );
  }

  updateHeroText(dto: UpdateHeroTextDto): Observable<HeroText> {
    return this.api
      .patch<UpdateHeroTextDto, HeroText>(`${this.basePath}/hero-text`, dto)
      .pipe(tap(() => this.cache.invalidate('content:hero-text')));
  }

  // Top Products
  getTopConfig(type: 'top_services' | 'top_products'): Observable<TopProductConfig> {
    const key = `content:top-config:${type}`;
    return this.cache.get(
      key,
      () =>
        this.api.get<TopProductConfig>(
          `${this.basePath}/${type === 'top_services' ? 'top-services' : 'top-products'}`,
        ),
      CACHE_TTL,
    );
  }

  updateTopConfig(
    type: 'top_services' | 'top_products',
    dto: UpdateTopConfigDto,
  ): Observable<TopProductConfig> {
    const endpoint = type === 'top_services' ? 'top-services' : 'top-products';
    return this.api
      .patch<UpdateTopConfigDto, TopProductConfig>(`${this.basePath}/${endpoint}`, dto)
      .pipe(tap(() => this.cache.invalidate(`content:top-config:${type}`)));
  }

  // Contact Messages
  getContactMessages(
    params?: Record<string, string | number | boolean>,
  ): Observable<ContactMessage[]> {
    return this.cache.get(
      'content:messages',
      () => this.api.getList<ContactMessage>(`${this.basePath}/contact-messages`, params),
      60_000,
    );
  }

  updateContactMessage(
    messageId: string,
    body: { isRead?: boolean; isTreated?: boolean },
  ): Observable<ContactMessage> {
    return this.api
      .patch<typeof body, ContactMessage>(`${this.basePath}/contact-messages/${messageId}`, body)
      .pipe(tap(() => this.cache.invalidate('content:messages')));
  }

  deleteContactMessage(messageId: string): Observable<void> {
    return this.api
      .delete<void>(`${this.basePath}/contact-messages/${messageId}`)
      .pipe(tap(() => this.cache.invalidate('content:messages')));
  }
}
