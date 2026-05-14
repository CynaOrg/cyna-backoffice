import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ContentService } from './content.service';
import { ApiService } from './api.service';

describe('ContentService', () => {
  let service: ContentService;
  let api: {
    get: ReturnType<typeof vi.fn>;
    getList: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let httpMock: HttpTestingController;

  beforeEach(() => {
    api = {
      get: vi.fn(),
      getList: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        ContentService,
        { provide: ApiService, useValue: api },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ContentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('carousel uploads', () => {
    it('requestCarouselUploadUrl posts file metadata', () => {
      api.post.mockReturnValue(
        of({ uploadUrl: 'u', storageKey: 'k', publicUrl: 'p', expiresAt: 'e' }),
      );
      service.requestCarouselUploadUrl('hero.jpg', 'image/jpeg').subscribe();
      expect(api.post).toHaveBeenCalledWith('admin/content/carousel/upload-url', {
        fileName: 'hero.jpg',
        contentType: 'image/jpeg',
      });
    });

    it('uploadBlobToPresignedUrl PUTs the file to the signed URL', () => {
      const file = new File(['data'], 'a.jpg', { type: 'image/jpeg' });
      service.uploadBlobToPresignedUrl('https://r2.example.com/upload', file).subscribe();

      const req = httpMock.expectOne('https://r2.example.com/upload');
      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('Content-Type')).toBe('image/jpeg');
      req.flush(null);
    });
  });

  describe('carousel CRUD', () => {
    it('getCarouselSlides queries the carousel endpoint', () => {
      api.getList.mockReturnValue(of([]));
      service.getCarouselSlides().subscribe();
      expect(api.getList).toHaveBeenCalledWith('admin/content/carousel');
    });

    it('createSlide POSTs the dto', () => {
      const dto = { imageUrl: 'x', titleFr: 't', titleEn: 't', displayOrder: 0, isActive: true };
      api.post.mockReturnValue(of({ id: 's1' }));
      service.createSlide(dto as never).subscribe();
      expect(api.post).toHaveBeenCalledWith('admin/content/carousel', dto);
    });

    it('updateSlide PATCHes by id', () => {
      api.patch.mockReturnValue(of({ id: 's1' }));
      service.updateSlide('s1', { titleFr: 'new' } as never).subscribe();
      expect(api.patch).toHaveBeenCalledWith('admin/content/carousel/s1', { titleFr: 'new' });
    });

    it('deleteSlide DELETEs by id', () => {
      api.delete.mockReturnValue(of(undefined));
      service.deleteSlide('s1').subscribe();
      expect(api.delete).toHaveBeenCalledWith('admin/content/carousel/s1');
    });

    it('reorderCarousel PATCHes the ordered ids', () => {
      api.patch.mockReturnValue(of(undefined));
      service.reorderCarousel(['a', 'b']).subscribe();
      expect(api.patch).toHaveBeenCalledWith('admin/content/carousel/reorder', {
        slideIds: ['a', 'b'],
      });
    });
  });

  describe('hero text', () => {
    it('getHeroText returns null when the endpoint errors', () => {
      api.get.mockReturnValue(throwError(() => new Error('404')));
      let result: unknown = 'unset';
      service.getHeroText().subscribe((r) => (result = r));
      expect(result).toBeNull();
    });

    it('getHeroText returns data when present', () => {
      api.get.mockReturnValue(of({ titleFr: 'Bienvenue' }));
      let result: unknown;
      service.getHeroText().subscribe((r) => (result = r));
      expect(result).toEqual({ titleFr: 'Bienvenue' });
    });

    it('updateHeroText PATCHes', () => {
      api.patch.mockReturnValue(of({ titleFr: 'x' }));
      service.updateHeroText({ titleFr: 'x' } as never).subscribe();
      expect(api.patch).toHaveBeenCalledWith('admin/content/hero-text', { titleFr: 'x' });
    });
  });

  describe('top config', () => {
    it.each([
      ['top_services' as const, 'top-services'],
      ['top_products' as const, 'top-products'],
      ['top_licenses' as const, 'top-licenses'],
    ])('getTopConfig(%s) hits %s endpoint', (type, slug) => {
      api.get.mockReturnValue(of({}));
      service.getTopConfig(type).subscribe();
      expect(api.get).toHaveBeenCalledWith(`admin/content/${slug}`);
    });

    it('updateTopConfig PATCHes the right endpoint', () => {
      api.patch.mockReturnValue(of({}));
      service.updateTopConfig('top_products', { productIds: ['p1'] } as never).subscribe();
      expect(api.patch).toHaveBeenCalledWith('admin/content/top-products', {
        productIds: ['p1'],
      });
    });
  });

  describe('contact messages', () => {
    it('getContactMessages forwards optional params', () => {
      api.getList.mockReturnValue(of([]));
      service.getContactMessages({ isRead: false }).subscribe();
      expect(api.getList).toHaveBeenCalledWith('admin/content/contact-messages', { isRead: false });
    });

    it('updateContactMessage PATCHes by id', () => {
      api.patch.mockReturnValue(of({}));
      service.updateContactMessage('m1', { isRead: true }).subscribe();
      expect(api.patch).toHaveBeenCalledWith('admin/content/contact-messages/m1', {
        isRead: true,
      });
    });

    it('deleteContactMessage DELETEs by id', () => {
      api.delete.mockReturnValue(of(undefined));
      service.deleteContactMessage('m1').subscribe();
      expect(api.delete).toHaveBeenCalledWith('admin/content/contact-messages/m1');
    });
  });
});
