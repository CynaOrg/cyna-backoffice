import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { ProductDetailComponent } from './product-detail.component';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../../core/models/product.model';

describe('ProductDetailComponent', () => {
  let fixture: ComponentFixture<ProductDetailComponent>;
  let component: ProductDetailComponent;
  let api: {
    get: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
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

  beforeEach(async () => {
    paramId = 'p1';
    api = {
      get: vi.fn().mockReturnValue(of(makeProduct())),
      patch: vi.fn().mockReturnValue(of(makeProduct())),
      delete: vi.fn().mockReturnValue(of(void 0)),
    };
    notifications = { success: vi.fn(), error: vi.fn() };

    routeSnapshot = {
      data: {},
      paramMap: { get: (k: string) => (k === 'id' ? paramId : null) },
    };

    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: ApiService, useValue: api },
        { provide: NotificationService, useValue: notifications },
        { provide: ActivatedRoute, useValue: { snapshot: routeSnapshot } },
        { provide: AdminAuthService, useValue: { isSuperAdmin: () => true, admin: () => null } },
      ],
    }).compileComponents();

    const realRouter = TestBed.inject(Router);
    navigateSpy = vi.fn().mockResolvedValue(true);
    realRouter.navigate = navigateSpy as unknown as Router['navigate'];

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit / loadProduct', () => {
    it('loads the product and sets selected image to primary', () => {
      const p = makeProduct({
        images: [
          { id: 'i1', imageUrl: 'a.jpg', isPrimary: false, displayOrder: 0 },
          { id: 'i2', imageUrl: 'b.jpg', isPrimary: true, displayOrder: 1 },
        ],
      });
      api.get.mockReturnValue(of(p));
      fixture.detectChanges();
      expect(component.product()).toBe(p);
      expect(component.selectedImage()).toBe('b.jpg');
      expect(component.loading()).toBe(false);
    });

    it('falls back to the first image if no primary is set', () => {
      const p = makeProduct({
        images: [{ id: 'i1', imageUrl: 'a.jpg', isPrimary: false, displayOrder: 0 }],
      });
      api.get.mockReturnValue(of(p));
      fixture.detectChanges();
      expect(component.selectedImage()).toBe('a.jpg');
    });

    it('notifies and redirects to base path on load error', () => {
      api.get.mockReturnValue(throwError(() => new Error('404')));
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/products']);
    });

    it('does nothing if no id param is provided', () => {
      paramId = null;
      fixture.detectChanges();
      expect(api.get).not.toHaveBeenCalled();
    });

    it('uses basePath from route data', () => {
      routeSnapshot.data['basePath'] = '/services';
      api.get.mockReturnValue(throwError(() => new Error('x')));
      fixture.detectChanges();
      expect(navigateSpy).toHaveBeenCalledWith(['/services']);
    });
  });

  describe('computed signals', () => {
    it('stockPercent is 0 for saas products', () => {
      api.get.mockReturnValue(of(makeProduct({ productType: 'saas' })));
      fixture.detectChanges();
      expect(component.stockPercent()).toBe(0);
    });

    it('isOutOfStock true when physical and quantity is 0', () => {
      api.get.mockReturnValue(of(makeProduct({ productType: 'physical', stockQuantity: 0 })));
      fixture.detectChanges();
      expect(component.isOutOfStock()).toBe(true);
      expect(component.stockBarColor()).toBe('bg-error');
    });

    it('isLowStock true when quantity is within the threshold', () => {
      api.get.mockReturnValue(
        of(makeProduct({ productType: 'physical', stockQuantity: 3, stockAlertThreshold: 10 })),
      );
      fixture.detectChanges();
      expect(component.isLowStock()).toBe(true);
      expect(component.stockBarColor()).toBe('bg-warning');
    });

    it('stockBarColor is success when stock is healthy', () => {
      api.get.mockReturnValue(
        of(makeProduct({ productType: 'physical', stockQuantity: 100, stockAlertThreshold: 10 })),
      );
      fixture.detectChanges();
      expect(component.stockBarColor()).toBe('bg-success');
    });

    it('priceCount counts non-null price fields', () => {
      api.get.mockReturnValue(of(makeProduct({ priceMonthly: 1, priceYearly: 2, priceUnit: 3 })));
      fixture.detectChanges();
      expect(component.priceCount()).toBe(3);
    });

    it('priceCount is 0 when no product is loaded', () => {
      paramId = null;
      fixture.detectChanges();
      expect(component.priceCount()).toBe(0);
    });

    it('deleteMessage falls back to generic warning without product', () => {
      paramId = null;
      fixture.detectChanges();
      expect(component.deleteMessage()).toBe('PRODUCTS.DELETE_WARNING');
    });
  });

  describe('stock modal', () => {
    beforeEach(() => {
      api.get.mockReturnValue(of(makeProduct({ productType: 'physical', stockQuantity: 5 })));
      fixture.detectChanges();
    });

    it('opens with current values', () => {
      component.openStockModal();
      expect(component.showStockModal()).toBe(true);
      expect(component.stockFormQuantity()).toBe(5);
      expect(component.stockFormThreshold()).toBe(10);
    });

    it('does nothing for saas products', () => {
      component.product.set(makeProduct({ productType: 'saas' }));
      component.openStockModal();
      expect(component.showStockModal()).toBe(false);
    });

    it('closeStockModal closes when not saving', () => {
      component.showStockModal.set(true);
      component.closeStockModal();
      expect(component.showStockModal()).toBe(false);
    });

    it('closeStockModal is a no-op while saving', () => {
      component.showStockModal.set(true);
      component.savingStock.set(true);
      component.closeStockModal();
      expect(component.showStockModal()).toBe(true);
    });

    it('saveStock posts the payload and reloads on success', () => {
      component.openStockModal();
      component.stockFormQuantity.set(15);
      component.stockFormThreshold.set(2);
      api.patch.mockReturnValue(of({}));
      component.saveStock();
      expect(api.patch).toHaveBeenCalledWith('admin/catalog/products/p1/stock', {
        stockQuantity: 15,
        stockAlertThreshold: 2,
      });
      expect(notifications.success).toHaveBeenCalled();
      expect(component.showStockModal()).toBe(false);
    });

    it('clamps negative numbers to zero', () => {
      component.openStockModal();
      component.stockFormQuantity.set(-5);
      component.stockFormThreshold.set(-1);
      api.patch.mockReturnValue(of({}));
      component.saveStock();
      expect(api.patch).toHaveBeenCalledWith('admin/catalog/products/p1/stock', {
        stockQuantity: 0,
        stockAlertThreshold: 0,
      });
    });

    it('shows error toast on failure', () => {
      component.openStockModal();
      api.patch.mockReturnValue(throwError(() => ({ error: { message: 'bad' } })));
      component.saveStock();
      expect(notifications.error).toHaveBeenCalledWith('bad');
      expect(component.savingStock()).toBe(false);
    });

    it('saveStock is a no-op without product', () => {
      component.product.set(null);
      component.saveStock();
      expect(api.patch).not.toHaveBeenCalled();
    });
  });

  describe('deleteProduct', () => {
    beforeEach(() => fixture.detectChanges());

    it('deletes and navigates back to base path', () => {
      api.delete.mockReturnValue(of(void 0));
      component.deleteProduct();
      expect(api.delete).toHaveBeenCalledWith('admin/catalog/products/p1');
      expect(notifications.success).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['/products']);
    });

    it('shows error toast on failure and closes modal', () => {
      api.delete.mockReturnValue(throwError(() => new Error('500')));
      component.showDeleteModal.set(true);
      component.deleteProduct();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.showDeleteModal()).toBe(false);
    });

    it('is a no-op without a loaded product', () => {
      component.product.set(null);
      component.deleteProduct();
      expect(api.delete).not.toHaveBeenCalled();
    });
  });

  describe('formatters and helpers', () => {
    beforeEach(() => fixture.detectChanges());

    it('formatCurrency renders euros', () => {
      const out = component.formatCurrency(100);
      expect(out).toContain('100');
      expect(out).toContain('€');
    });

    it('formatDate produces a French date string', () => {
      expect(component.formatDate('2026-01-15T00:00:00Z')).toMatch(/2026/);
    });

    it('getYearlySavings is empty without both prices', () => {
      component.product.set(makeProduct({ priceMonthly: 10, priceYearly: undefined }));
      expect(component.getYearlySavings()).toBe('');
    });

    it('getYearlySavings returns translated label when yearly is cheaper', () => {
      component.product.set(makeProduct({ priceMonthly: 10, priceYearly: 100 }));
      const out = component.getYearlySavings();
      expect(out).toContain('PRODUCTS.YEARLY_SAVINGS');
    });

    it('getYearlySavings is empty when there are no savings', () => {
      component.product.set(makeProduct({ priceMonthly: 10, priceYearly: 200 }));
      expect(component.getYearlySavings()).toBe('');
    });
  });
});
