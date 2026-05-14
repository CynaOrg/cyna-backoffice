import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { ProductFormComponent } from './product-form.component';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ImageService } from '../../../core/services/image.service';
import { Product } from '../../../core/models/product.model';

describe('ProductFormComponent', () => {
  let fixture: ComponentFixture<ProductFormComponent>;
  let component: ProductFormComponent;
  let api: {
    get: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
    info: ReturnType<typeof vi.fn>;
  };
  let imageService: {
    validateFile: ReturnType<typeof vi.fn>;
    requestUploadUrl: ReturnType<typeof vi.fn>;
    uploadToR2: ReturnType<typeof vi.fn>;
    confirmUpload: ReturnType<typeof vi.fn>;
    reorderImages: ReturnType<typeof vi.fn>;
    deleteImage: ReturnType<typeof vi.fn>;
  };
  let navigateSpy: ReturnType<typeof vi.fn>;
  let routeSnapshot: {
    data: Record<string, unknown>;
    paramMap: { get: (k: string) => string | null };
  };
  let paramId: string | null;

  function makeProduct(over: Partial<Product> = {}): Product {
    return {
      id: 'p1',
      categoryId: 'c1',
      slug: 'slug',
      sku: 'SKU-1',
      nameFr: 'Produit',
      nameEn: 'Product',
      descriptionFr: 'desc fr',
      descriptionEn: 'desc en',
      productType: 'saas',
      priceMonthly: 10,
      priceYearly: 100,
      priceUnit: undefined,
      stockQuantity: undefined,
      stockAlertThreshold: 10,
      isAvailable: true,
      isFeatured: false,
      displayOrder: 0,
      images: [],
      characteristics: [],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
      ...over,
    };
  }

  function fillValidForm(): void {
    component.form.patchValue({
      nameFr: 'Nom',
      nameEn: 'Name',
      slug: 'nom',
      sku: 'SKU-1',
      categoryId: 'c1',
      productType: 'saas',
      descriptionFr: 'desc fr',
      descriptionEn: 'desc en',
    });
  }

  beforeEach(async () => {
    paramId = null;
    api = {
      get: vi.fn().mockReturnValue(of([])),
      patch: vi.fn().mockReturnValue(of(makeProduct())),
      post: vi.fn().mockReturnValue(of(makeProduct())),
      delete: vi.fn().mockReturnValue(of(void 0)),
    };
    notifications = { success: vi.fn(), error: vi.fn(), info: vi.fn() };
    imageService = {
      validateFile: vi.fn().mockReturnValue({ valid: true }),
      requestUploadUrl: vi.fn(),
      uploadToR2: vi.fn(),
      confirmUpload: vi.fn(),
      reorderImages: vi.fn().mockReturnValue(of(void 0)),
      deleteImage: vi.fn().mockReturnValue(of(void 0)),
    };

    routeSnapshot = {
      data: {},
      paramMap: { get: (k: string) => (k === 'id' ? paramId : null) },
    };

    await TestBed.configureTestingModule({
      imports: [ProductFormComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: ApiService, useValue: api },
        { provide: NotificationService, useValue: notifications },
        { provide: ImageService, useValue: imageService },
        { provide: ActivatedRoute, useValue: { snapshot: routeSnapshot } },
      ],
    }).compileComponents();

    const router = TestBed.inject(Router);
    navigateSpy = vi.fn().mockResolvedValue(true);
    router.navigate = navigateSpy as unknown as Router['navigate'];

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('initializes an empty form in create mode', () => {
      fixture.detectChanges();
      expect(component.isEdit()).toBe(false);
      expect(component.form.invalid).toBe(true);
    });

    it('loads categories on init', () => {
      api.get.mockReturnValue(of([{ id: 'c1', nameFr: 'Cat' }]));
      fixture.detectChanges();
      expect(component.categories().length).toBe(1);
    });

    it('handles category list returned under data key', () => {
      api.get.mockReturnValue(of({ data: [{ id: 'c1' }] }));
      fixture.detectChanges();
      expect(component.categories().length).toBe(1);
    });

    it('reads basePath/newTitleKey/productType from route data', () => {
      routeSnapshot.data['basePath'] = '/services';
      routeSnapshot.data['newTitleKey'] = 'TITLE.X';
      routeSnapshot.data['productType'] = 'physical';
      fixture.detectChanges();
      expect(component.basePath).toBe('/services');
      expect(component.newTitleKey).toBe('TITLE.X');
      expect(component.fixedProductType).toBe('physical');
      expect(component.form.get('productType')?.disabled).toBe(true);
    });

    it('switches to edit mode when an id is present', () => {
      paramId = 'p1';
      const p = makeProduct({ priceMonthly: 5 });
      api.get.mockImplementation((path: string) => {
        if (path.includes('products/p1')) return of(p);
        return of([]);
      });
      fixture.detectChanges();
      expect(component.isEdit()).toBe(true);
      expect(component.productId).toBe('p1');
      expect(component.product()).toBe(p);
      expect(component.form.get('priceMonthly')?.value).toBe(5);
    });

    it('redirects to base path when the product cannot be loaded', () => {
      paramId = 'p1';
      api.get.mockImplementation((path: string) => {
        if (path.includes('products/p1')) return throwError(() => new Error('404'));
        return of([]);
      });
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/products']);
    });

    it('hydrates characteristics from the loaded product', () => {
      paramId = 'p1';
      const p = makeProduct({
        characteristics: [
          {
            id: 'ch1',
            keyFr: 'kfr',
            keyEn: 'ken',
            valueFr: 'vfr',
            valueEn: 'ven',
            displayOrder: 0,
          },
        ],
      });
      api.get.mockImplementation((path: string) => {
        if (path.includes('products/p1')) return of(p);
        return of([]);
      });
      fixture.detectChanges();
      expect(component.characteristics.length).toBe(1);
    });
  });

  describe('characteristics array', () => {
    beforeEach(() => fixture.detectChanges());

    it('addCharacteristic pushes a new group', () => {
      component.addCharacteristic();
      expect(component.characteristics.length).toBe(1);
    });

    it('removeCharacteristic removes by index', () => {
      component.addCharacteristic();
      component.addCharacteristic();
      component.removeCharacteristic(0);
      expect(component.characteristics.length).toBe(1);
    });

    it('asFormGroup casts an abstract control', () => {
      component.addCharacteristic();
      const ctrl = component.characteristics.at(0);
      expect(component.asFormGroup(ctrl)).toBe(ctrl);
    });
  });

  describe('onSubmit (create)', () => {
    beforeEach(() => fixture.detectChanges());

    it('marks the form touched and aborts on invalid', async () => {
      await component.onSubmit();
      expect(component.form.touched).toBe(true);
      expect(api.post).not.toHaveBeenCalled();
    });

    it('creates a product and navigates to its detail', async () => {
      fillValidForm();
      api.post.mockReturnValue(of(makeProduct({ id: 'new-1' })));
      await component.onSubmit();
      expect(api.post).toHaveBeenCalled();
      expect(notifications.success).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/products', 'new-1']);
      expect(component.isEdit()).toBe(true);
    });

    it('shows error notification on submit failure', async () => {
      fillValidForm();
      api.post.mockReturnValue(throwError(() => ({ error: { message: 'nope' } })));
      await component.onSubmit();
      expect(notifications.error).toHaveBeenCalledWith('nope');
      expect(component.saving()).toBe(false);
    });

    it('falls back to generic error message', async () => {
      fillValidForm();
      api.post.mockReturnValue(throwError(() => new Error('boom')));
      await component.onSubmit();
      expect(notifications.error).toHaveBeenCalledWith('PRODUCTS.SAVE_ERROR');
    });
  });

  describe('onSubmit (edit)', () => {
    beforeEach(() => {
      paramId = 'p1';
      const p = makeProduct();
      api.get.mockImplementation((path: string) => {
        if (path.includes('products/p1')) return of(p);
        return of([]);
      });
      fixture.detectChanges();
    });

    it('skips API call when nothing changed and no pending items', async () => {
      await component.onSubmit();
      expect(api.patch).not.toHaveBeenCalled();
      expect(notifications.info).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/products', 'p1']);
    });

    it('sends a PATCH with only dirty fields', async () => {
      component.form.get('nameFr')?.setValue('New Name');
      component.form.get('nameFr')?.markAsDirty();
      api.patch.mockReturnValue(of(makeProduct({ nameFr: 'New Name' })));
      await component.onSubmit();
      expect(api.patch).toHaveBeenCalledWith('admin/catalog/products/p1', { nameFr: 'New Name' });
      expect(notifications.success).toHaveBeenCalled();
    });

    it('sends characteristics when the array is dirty', async () => {
      component.addCharacteristic();
      component.characteristics.markAsDirty();
      api.patch.mockReturnValue(of(makeProduct()));
      await component.onSubmit();
      expect(api.patch).toHaveBeenCalled();
      const body = api.patch.mock.calls[0][1] as Record<string, unknown>;
      expect(body['characteristics']).toBeDefined();
    });
  });

  describe('image item handlers', () => {
    beforeEach(() => fixture.detectChanges());

    it('rejects files when validation fails', () => {
      imageService.validateFile.mockReturnValue({ valid: false, error: 'bad' });
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      component.onFilesSelected([file]);
      expect(notifications.error).toHaveBeenCalledWith('bad');
      expect(component.items().length).toBe(0);
    });

    it('rejects when max items already reached', () => {
      const existing = Array.from({ length: 10 }, (_, i) => ({
        id: `id-${i}`,
        status: 'uploaded' as const,
        previewUrl: 'x',
        isPrimary: i === 0,
        order: i,
      }));
      component.items.set(existing);
      component.onFilesSelected([new File(['x'], 'a.png', { type: 'image/png' })]);
      expect(notifications.error).toHaveBeenCalledWith('IMAGE_UPLOAD.MAX_REACHED');
      expect(component.items().length).toBe(10);
    });

    it('adds a new item with primary set when none exist', () => {
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      component.onFilesSelected([file]);
      expect(component.items().length).toBe(1);
      expect(component.items()[0].isPrimary).toBe(true);
    });

    it('reorders items in memory', () => {
      component.items.set([
        { id: 'a', status: 'pending', previewUrl: '', isPrimary: true, order: 0 },
        { id: 'b', status: 'pending', previewUrl: '', isPrimary: false, order: 1 },
      ]);
      component.onItemReordered({ fromIndex: 0, toIndex: 1 });
      expect(component.items()[0].id).toBe('b');
      expect(component.items()[1].id).toBe('a');
    });

    it('updates primary flag across items', () => {
      component.items.set([
        { id: 'a', status: 'pending', previewUrl: '', isPrimary: true, order: 0 },
        { id: 'b', status: 'pending', previewUrl: '', isPrimary: false, order: 1 },
      ]);
      component.onItemPrimaryChanged('b');
      expect(component.items().find((i) => i.id === 'a')!.isPrimary).toBe(false);
      expect(component.items().find((i) => i.id === 'b')!.isPrimary).toBe(true);
    });

    it('removes pending items locally', () => {
      component.items.set([
        { id: 'a', status: 'pending', previewUrl: '', isPrimary: true, order: 0 },
      ]);
      component.onItemDeleted('a');
      expect(component.items().length).toBe(0);
    });

    it('opens the confirm modal when deleting an uploaded image', () => {
      component.items.set([
        {
          id: 'a',
          status: 'uploaded',
          previewUrl: 'u',
          isPrimary: true,
          order: 0,
          productImage: {
            id: 'img-1',
            imageUrl: 'u',
            isPrimary: true,
            displayOrder: 0,
          },
        },
      ]);
      component.onItemDeleted('a');
      expect(component.showDeleteImageModal()).toBe(true);
      expect(component.deletingImageId()).toBe('img-1');
    });

    it('does nothing when retrying a non-error item', () => {
      component.items.set([
        { id: 'a', status: 'uploaded', previewUrl: '', isPrimary: true, order: 0 },
      ]);
      component.onItemRetried('a');
      expect(imageService.requestUploadUrl).not.toHaveBeenCalled();
    });

    it('confirmDeleteImage is a no-op without productId', () => {
      component.deletingImageId.set('img-1');
      component.confirmDeleteImage();
      expect(imageService.deleteImage).not.toHaveBeenCalled();
    });

    it('confirmDeleteImage deletes via the service when productId is set', () => {
      component.productId = 'p1';
      component.product.set(
        makeProduct({
          images: [{ id: 'img-1', imageUrl: 'u', isPrimary: true, displayOrder: 0 }],
        }),
      );
      component.items.set([
        {
          id: 'a',
          status: 'uploaded',
          previewUrl: 'u',
          isPrimary: true,
          order: 0,
          productImage: { id: 'img-1', imageUrl: 'u', isPrimary: true, displayOrder: 0 },
        },
      ]);
      component.deletingImageId.set('img-1');
      component.confirmDeleteImage();
      expect(imageService.deleteImage).toHaveBeenCalledWith('p1', 'img-1');
      expect(notifications.success).toHaveBeenCalled();
    });

    it('shows error when deleteImage fails', () => {
      component.productId = 'p1';
      imageService.deleteImage.mockReturnValue(throwError(() => ({ error: { message: 'no' } })));
      component.deletingImageId.set('img-1');
      component.confirmDeleteImage();
      expect(notifications.error).toHaveBeenCalledWith('no');
    });
  });

  describe('ngOnDestroy', () => {
    it('does not throw when destroyed', () => {
      fixture.detectChanges();
      expect(() => fixture.destroy()).not.toThrow();
    });
  });
});
