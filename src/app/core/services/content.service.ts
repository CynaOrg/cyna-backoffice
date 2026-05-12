import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

export interface ContentPresignedUploadResponse {
  uploadUrl: string;
  storageKey: string;
  publicUrl: string;
  expiresAt: string;
}

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly api = inject(ApiService);
  private readonly http = inject(HttpClient);
  private readonly basePath = 'admin/content';

  // Carousel image upload (presigned)
  requestCarouselUploadUrl(
    fileName: string,
    contentType: string,
  ): Observable<ContentPresignedUploadResponse> {
    return this.api.post<{ fileName: string; contentType: string }, ContentPresignedUploadResponse>(
      `${this.basePath}/carousel/upload-url`,
      { fileName, contentType },
    );
  }

  uploadBlobToPresignedUrl(uploadUrl: string, file: File): Observable<unknown> {
    return this.http.put(uploadUrl, file, {
      headers: { 'Content-Type': file.type },
    });
  }

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
  getTopConfig(
    type: 'top_services' | 'top_products' | 'top_licenses',
  ): Observable<TopProductConfig> {
    return this.api.get<TopProductConfig>(`${this.basePath}/${this.topEndpoint(type)}`);
  }

  updateTopConfig(
    type: 'top_services' | 'top_products' | 'top_licenses',
    dto: UpdateTopConfigDto,
  ): Observable<TopProductConfig> {
    return this.api.patch<UpdateTopConfigDto, TopProductConfig>(
      `${this.basePath}/${this.topEndpoint(type)}`,
      dto,
    );
  }

  private topEndpoint(type: 'top_services' | 'top_products' | 'top_licenses'): string {
    switch (type) {
      case 'top_services':
        return 'top-services';
      case 'top_products':
        return 'top-products';
      case 'top_licenses':
        return 'top-licenses';
    }
  }

  // Contact Messages
  getContactMessages(
    params?: Record<string, string | number | boolean>,
  ): Observable<ContactMessage[]> {
    return this.api.getList<ContactMessage>(`${this.basePath}/contact-messages`, params);
  }

  updateContactMessage(
    messageId: string,
    body: { isRead?: boolean; isProcessed?: boolean },
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
