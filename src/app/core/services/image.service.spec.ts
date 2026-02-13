import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ImageService } from './image.service';
import { ApiService } from './api.service';

describe('ImageService', () => {
  let service: ImageService;
  let apiService: {
    post: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    apiService = {
      post: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [ImageService, { provide: ApiService, useValue: apiService }],
    });

    service = TestBed.inject(ImageService);
  });

  describe('validateFile', () => {
    it('should return valid for JPEG files', () => {
      // Arrange
      const file = new File(['data'], 'photo.jpg', { type: 'image/jpeg' });

      // Act
      const result = service.validateFile(file);

      // Assert
      expect(result).toEqual({ valid: true });
    });

    it('should return valid for PNG files', () => {
      // Arrange
      const file = new File(['data'], 'photo.png', { type: 'image/png' });

      // Act
      const result = service.validateFile(file);

      // Assert
      expect(result).toEqual({ valid: true });
    });

    it('should return valid for WebP files', () => {
      // Arrange
      const file = new File(['data'], 'photo.webp', { type: 'image/webp' });

      // Act
      const result = service.validateFile(file);

      // Assert
      expect(result).toEqual({ valid: true });
    });

    it('should return invalid for PDF files', () => {
      // Arrange
      const file = new File(['data'], 'doc.pdf', { type: 'application/pdf' });

      // Act
      const result = service.validateFile(file);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('application/pdf');
    });

    it('should return invalid for files exceeding 5MB', () => {
      // Arrange - create a file larger than 5MB
      const largeBuffer = new ArrayBuffer(6 * 1024 * 1024);
      const file = new File([largeBuffer], 'large.jpg', { type: 'image/jpeg' });

      // Act
      const result = service.validateFile(file);

      // Assert
      expect(result.valid).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('5');
    });
  });

  describe('requestUploadUrl', () => {
    it('should call correct API endpoint with file metadata', () => {
      // Arrange
      const productId = 'prod-uuid-001';
      const file = new File(['data'], 'hero.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 2048000 });
      const mockResponse = {
        uploadUrl: 'https://r2.example.com/presigned',
        storageKey: 'products/prod-uuid-001/abc.jpg',
        publicUrl: 'https://pub.r2.dev/products/prod-uuid-001/abc.jpg',
        expiresAt: '2026-02-13T12:30:00Z',
      };
      apiService.post.mockReturnValue(of(mockResponse));

      // Act
      let result: any;
      service.requestUploadUrl(productId, file).subscribe((r) => (result = r));

      // Assert
      expect(apiService.post).toHaveBeenCalledWith(
        `admin/catalog/products/${productId}/images/upload-url`,
        {
          fileName: 'hero.jpg',
          contentType: 'image/jpeg',
          fileSizeBytes: 2048000,
        },
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('confirmUpload', () => {
    it('should call correct API endpoint with upload confirmation data', () => {
      // Arrange
      const productId = 'prod-uuid-001';
      const data = {
        storageKey: 'products/prod-uuid-001/abc.jpg',
        altTextFr: 'Image principale',
        isPrimary: true,
      };
      const mockImage = {
        id: 'img-001',
        imageUrl: 'https://pub.r2.dev/products/prod-uuid-001/abc.jpg',
        isPrimary: true,
        displayOrder: 0,
      };
      apiService.post.mockReturnValue(of(mockImage));

      // Act
      let result: any;
      service.confirmUpload(productId, data).subscribe((r) => (result = r));

      // Assert
      expect(apiService.post).toHaveBeenCalledWith(
        `admin/catalog/products/${productId}/images/confirm`,
        data,
      );
      expect(result).toEqual(mockImage);
    });
  });

  describe('deleteImage', () => {
    it('should call correct API endpoint', () => {
      // Arrange
      const productId = 'prod-uuid-001';
      const imageId = 'img-uuid-001';
      apiService.delete.mockReturnValue(of(undefined));

      // Act
      let called = false;
      service.deleteImage(productId, imageId).subscribe(() => (called = true));

      // Assert
      expect(apiService.delete).toHaveBeenCalledWith(
        `admin/catalog/products/${productId}/images/${imageId}`,
      );
      expect(called).toBe(true);
    });
  });
});
