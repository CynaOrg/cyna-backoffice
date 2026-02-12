import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
    return this.api.getList<CarouselSlide>(`${this.basePath}/carousel`);
  }

  createSlide(dto: CreateSlideDto): Observable<CarouselSlide> {
    return this.api.post<CreateSlideDto, CarouselSlide>(`${this.basePath}/carousel`, dto);
  }

  updateSlide(slideId: string, dto: UpdateSlideDto): Observable<CarouselSlide> {
    return this.api.patch<UpdateSlideDto, CarouselSlide>(
      `${this.basePath}/carousel/${slideId}`,
      dto,
    );
  }

  deleteSlide(slideId: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/carousel/${slideId}`);
  }

  reorderCarousel(slideIds: string[]): Observable<void> {
    return this.api.patch<{ slideIds: string[] }, void>(`${this.basePath}/carousel/reorder`, {
      slideIds,
    });
  }

  // Hero Text
  getHeroText(): Observable<HeroText | null> {
    return this.api.get<HeroText>(`${this.basePath}/hero-text`).pipe(
      catchError(() => {
        // Hero text endpoint may return 404 if not configured
        return of(null);
      }),
    );
  }

  updateHeroText(dto: UpdateHeroTextDto): Observable<HeroText> {
    return this.api.patch<UpdateHeroTextDto, HeroText>(`${this.basePath}/hero-text`, dto);
  }

  // Top Products
  getTopConfig(type: 'top_services' | 'top_products'): Observable<TopProductConfig> {
    return this.api.get<TopProductConfig>(
      `${this.basePath}/${type === 'top_services' ? 'top-services' : 'top-products'}`,
    );
  }

  updateTopConfig(
    type: 'top_services' | 'top_products',
    dto: UpdateTopConfigDto,
  ): Observable<TopProductConfig> {
    const endpoint = type === 'top_services' ? 'top-services' : 'top-products';
    return this.api.patch<UpdateTopConfigDto, TopProductConfig>(
      `${this.basePath}/${endpoint}`,
      dto,
    );
  }

  // Contact Messages
  getContactMessages(
    params?: Record<string, string | number | boolean>,
  ): Observable<ContactMessage[]> {
    return this.api.getList<ContactMessage>(`${this.basePath}/contact-messages`, params);
  }

  updateContactMessage(
    messageId: string,
    body: { isRead?: boolean; isTreated?: boolean },
  ): Observable<ContactMessage> {
    return this.api.patch<typeof body, ContactMessage>(
      `${this.basePath}/contact-messages/${messageId}`,
      body,
    );
  }

  deleteContactMessage(messageId: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/contact-messages/${messageId}`);
  }
}
