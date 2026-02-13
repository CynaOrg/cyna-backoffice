import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ProductImage } from '../models/product.model';

interface PresignedUploadResponse {
  uploadUrl: string;
  storageKey: string;
  publicUrl: string;
  expiresAt: string;
}

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

@Injectable({ providedIn: 'root' })
export class ImageService {
  private readonly api = inject(ApiService);

  requestUploadUrl(productId: string, file: File): Observable<PresignedUploadResponse> {
    return this.api.post<any, PresignedUploadResponse>(
      `admin/catalog/products/${productId}/images/upload-url`,
      {
        fileName: file.name,
        contentType: file.type,
        fileSizeBytes: file.size,
      },
    );
  }

  uploadToR2(
    file: File,
    presignedUrl: string,
  ): Observable<{ progress: number; complete: boolean }> {
    return new Observable((observer) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          observer.next({ progress, complete: false });
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          observer.next({ progress: 100, complete: true });
          observer.complete();
        } else {
          observer.error(new Error(`Upload failed with status ${xhr.status}`));
        }
      });

      xhr.addEventListener('error', () => {
        observer.error(new Error('Upload failed'));
      });

      xhr.addEventListener('abort', () => {
        observer.error(new Error('Upload aborted'));
      });

      xhr.open('PUT', presignedUrl);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);

      return () => xhr.abort();
    });
  }

  confirmUpload(
    productId: string,
    data: {
      storageKey: string;
      altTextFr?: string;
      altTextEn?: string;
      isPrimary?: boolean;
    },
  ): Observable<ProductImage> {
    return this.api.post<any, ProductImage>(
      `admin/catalog/products/${productId}/images/confirm`,
      data,
    );
  }

  deleteImage(productId: string, imageId: string): Observable<void> {
    return this.api.delete<void>(`admin/catalog/products/${productId}/images/${imageId}`);
  }

  reorderImages(productId: string, imageIds: string[]): Observable<ProductImage[]> {
    return this.api.patch<any, ProductImage[]>(
      `admin/catalog/products/${productId}/images/reorder`,
      { imageIds },
    );
  }

  validateFile(file: File): { valid: boolean; error?: string } {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Type non autorise: ${file.type}. Utilisez JPEG, PNG ou WebP.`,
      };
    }
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `Fichier trop volumineux (${(file.size / 1024 / 1024).toFixed(1)} Mo). Maximum: 5 Mo.`,
      };
    }
    return { valid: true };
  }
}
