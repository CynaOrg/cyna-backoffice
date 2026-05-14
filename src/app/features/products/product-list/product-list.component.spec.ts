import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../../core/models/product.model';

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;
  let api: {
    get: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    warning: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };

  function makeProduct(over: Partial<Product> = {}): Product {
    return {
      id: 'p1',
      categoryId: 'c1',
      slug: 'p',
      sku: 'SKU1',
      nameFr: 'Produit',
      nameEn: 'Product',
      descriptionFr: '',
      descriptionEn: '',
      productType: 'physical',
      stockAlertThreshold: 5,
      isAvailable: true,
      isFeatured: false,
      displayOrder: 0,
      images: [],
      characteristics: [],
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
      ...over,
    };
  }

  async function setup(routeData: Record<string, unknown> = {}) {
    api = {
      get: vi
        .fn()
        .mockImplementation((path: string) =>
          path === 'admin/catalog/categories' ? of([]) : of({ data: [], total: 0 }),
        ),
      delete: vi.fn(),
      post: vi.fn(),
    };
    notifications = { success: vi.fn(), warning: vi.fn(), error: vi.fn() };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: routeData },
            data: of(routeData),
          },
        },
        { provide: ApiService, useValue: api },
        { provide: AdminAuthService, useValue: { isSuperAdmin: () => true } },
        { provide: NotificationService, useValue: notifications },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  }

  describe('applyRouteData / loadProducts', () => {
    it('uses fixedType from route data', async () => {
      await setup({ productType: 'saas', titleKey: 'PRODUCTS.SAAS_TITLE', basePath: '/services' });
      fixture.detectChanges();
      expect(component.fixedType).toBe('saas');
      expect(component.typeFilter).toBe('saas');
      expect(component.newProductLink).toBe('/services/new');
    });

    it('loads products envelope into signals', async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/catalog/categories'
          ? of([])
          : of({ data: [makeProduct(), makeProduct({ id: 'p2', isAvailable: false })], total: 2 }),
      );
      fixture.detectChanges();
      expect(component.products().length).toBe(2);
      expect(component.total()).toBe(2);
      expect(component.availableCount()).toBe(1);
      expect(component.unavailableCount()).toBe(1);
    });

    it('handles a bare array response', async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/catalog/categories' ? of([]) : of([makeProduct()]),
      );
      fixture.detectChanges();
      expect(component.products().length).toBe(1);
      expect(component.total()).toBe(1);
    });

    it('falls back to empty list for unexpected payloads', async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/catalog/categories' ? of([]) : of(null),
      );
      fixture.detectChanges();
      expect(component.products()).toEqual([]);
      expect(component.total()).toBe(0);
    });

    it('shows error toast on load failure', async () => {
      await setup();
      api.get.mockImplementation((path: string) =>
        path === 'admin/catalog/categories' ? of([]) : throwError(() => new Error('500')),
      );
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.loading()).toBe(false);
    });

    it('passes filters as params', async () => {
      await setup();
      fixture.detectChanges();
      api.get.mockClear();
      component.searchQuery = 'foo';
      component.typeFilter = 'saas';
      component.categoryFilter = 'cat';
      component.statusFilter = 'active';
      component.priceMin = 5;
      component.priceMax = 99;
      component.loadProducts();
      const params = api.get.mock.calls.find((c) => c[0] === 'admin/catalog/products')?.[1];
      expect(params).toMatchObject({
        productType: 'saas',
        categorySlug: 'cat',
        isAvailable: true,
        minPrice: 5,
        maxPrice: 99,
        search: 'foo',
      });
    });

    it('passes isAvailable=false for inactive filter', async () => {
      await setup();
      fixture.detectChanges();
      api.get.mockClear();
      component.statusFilter = 'inactive';
      component.loadProducts();
      const params = api.get.mock.calls.find((c) => c[0] === 'admin/catalog/products')?.[1];
      expect(params).toMatchObject({ isAvailable: false });
    });
  });

  describe('search/filters/paging', () => {
    beforeEach(async () => {
      vi.useFakeTimers();
      await setup();
      fixture.detectChanges();
    });

    afterEach(() => vi.useRealTimers());

    it('onSearch debounces and resets to page 1', () => {
      api.get.mockClear();
      component.page.set(3);
      component.onSearch();
      vi.advanceTimersByTime(310);
      expect(component.page()).toBe(1);
    });

    it('onSearch cancels a pending timer when called twice', () => {
      api.get.mockClear();
      component.onSearch();
      component.onSearch();
      vi.advanceTimersByTime(310);
      // Only one reload call to admin/catalog/products
      const callsToProducts = api.get.mock.calls.filter((c) => c[0] === 'admin/catalog/products');
      expect(callsToProducts.length).toBe(1);
    });

    it('onFilterChange resets page and reloads', () => {
      api.get.mockClear();
      component.page.set(2);
      component.onFilterChange();
      expect(component.page()).toBe(1);
    });

    it('onPageChange sets the page', () => {
      component.onPageChange(4);
      expect(component.page()).toBe(4);
    });

    it('resetFilters clears state', () => {
      component.searchQuery = 'x';
      component.categoryFilter = 'c';
      component.statusFilter = 'active';
      component.priceMin = 10;
      component.priceMax = 50;
      component.resetFilters();
      expect(component.searchQuery).toBe('');
      expect(component.categoryFilter).toBe('');
      expect(component.statusFilter).toBe('');
      expect(component.priceMin).toBeNull();
      expect(component.priceMax).toBeNull();
    });
  });

  describe('helpers', () => {
    beforeEach(async () => {
      await setup();
      fixture.detectChanges();
    });

    describe('getPrice', () => {
      it('renders monthly subscription price', () => {
        expect(component.getPrice(makeProduct({ priceMonthly: 10 }))).toContain('/mo');
      });

      it('renders yearly subscription price', () => {
        expect(component.getPrice(makeProduct({ priceYearly: 100 }))).toContain('/yr');
      });

      it('renders unit price', () => {
        expect(component.getPrice(makeProduct({ priceUnit: 50 }))).toContain('€');
      });

      it('falls back to NA when no price is set', () => {
        expect(component.getPrice(makeProduct())).toBe('PRODUCTS.NA');
      });
    });

    it.each([
      ['saas', 'bg-info-light', 'bg-info'],
      ['physical', 'bg-warning-light', 'bg-warning'],
      ['license', 'bg-primary-light', 'bg-primary'],
      ['unknown', 'bg-gray-100', 'bg-text-muted'],
    ])('badge/dot classes for %s', (type, badgePrefix, dotPrefix) => {
      expect(component.getTypeBadgeClasses(type)).toContain(badgePrefix);
      expect(component.getTypeDotClass(type)).toContain(dotPrefix);
    });

    it('emptyTitleKey adapts to fixedType', async () => {
      for (const [type, key] of [
        ['saas', 'PRODUCTS.EMPTY_SAAS'],
        ['license', 'PRODUCTS.EMPTY_LICENSE'],
        ['physical', 'PRODUCTS.EMPTY_PHYSICAL'],
      ] as const) {
        await setup({ productType: type });
        fixture.detectChanges();
        expect(component.emptyTitleKey()).toBe(key);
      }
    });

    it('deleteMessage uses product name', () => {
      component.productToDelete.set(makeProduct({ nameFr: 'Mon Produit' }));
      expect(component.deleteMessage()).toContain('PRODUCTS.DELETE_CONFIRM');
    });

    it('deleteMessage fallback when no product is selected', () => {
      component.productToDelete.set(null);
      expect(component.deleteMessage()).toBe('PRODUCTS.DELETE_WARNING');
    });
  });

  describe('delete', () => {
    beforeEach(async () => {
      await setup();
      fixture.detectChanges();
      component.products.set([makeProduct()]);
      component.total.set(1);
    });

    it('confirmDelete sets state and opens modal', () => {
      component.confirmDelete(makeProduct({ id: 'p2' }));
      expect(component.productToDelete()?.id).toBe('p2');
      expect(component.showDeleteModal()).toBe(true);
    });

    it('deleteProduct no-ops when no product is selected', () => {
      component.productToDelete.set(null);
      component.deleteProduct();
      expect(api.delete).not.toHaveBeenCalled();
    });

    it('removes the product from the list on success', () => {
      api.delete.mockReturnValue(of(undefined));
      component.productToDelete.set(makeProduct({ id: 'p1' }));
      component.deleteProduct();
      expect(api.delete).toHaveBeenCalledWith('admin/catalog/products/p1');
      expect(component.products().length).toBe(0);
      expect(component.total()).toBe(0);
      expect(component.showDeleteModal()).toBe(false);
      expect(notifications.success).toHaveBeenCalled();
    });

    it('shows error toast on delete failure', () => {
      api.delete.mockReturnValue(throwError(() => new Error('500')));
      component.productToDelete.set(makeProduct({ id: 'p1' }));
      component.deleteProduct();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.showDeleteModal()).toBe(false);
    });
  });

  describe('bulk selection', () => {
    beforeEach(async () => {
      await setup();
      fixture.detectChanges();
      component.products.set([makeProduct({ id: 'p1' }), makeProduct({ id: 'p2' })]);
    });

    it('toggleSelect adds and removes ids', () => {
      component.toggleSelect('p1');
      expect(component.selectedIds().has('p1')).toBe(true);
      component.toggleSelect('p1');
      expect(component.selectedIds().has('p1')).toBe(false);
    });

    it('toggleSelectAll selects all when none selected', () => {
      component.toggleSelectAll();
      expect(component.allSelected()).toBe(true);
    });

    it('toggleSelectAll deselects all when all selected', () => {
      component.toggleSelectAll();
      component.toggleSelectAll();
      expect(component.allSelected()).toBe(false);
    });

    it('someSelected reflects partial selection', () => {
      component.toggleSelect('p1');
      expect(component.someSelected()).toBe(true);
    });

    it('clearSelection empties the set', () => {
      component.toggleSelect('p1');
      component.clearSelection();
      expect(component.selectedIds().size).toBe(0);
    });

    it('openBulkDeleteModal does nothing when no selection', () => {
      component.openBulkDeleteModal();
      expect(component.showBulkDeleteModal()).toBe(false);
    });

    it('openBulkDeleteModal opens when there is a selection', () => {
      component.toggleSelect('p1');
      component.openBulkDeleteModal();
      expect(component.showBulkDeleteModal()).toBe(true);
    });

    it('deleteSelected with no selection just closes the modal', () => {
      component.deleteSelected();
      expect(api.post).not.toHaveBeenCalled();
      expect(component.showBulkDeleteModal()).toBe(false);
    });

    it('deleteSelected POSTs and clears selection on success', () => {
      api.post.mockReturnValue(of({ deletedCount: 2, failedIds: [] }));
      component.toggleSelect('p1');
      component.toggleSelect('p2');
      component.deleteSelected();
      expect(api.post).toHaveBeenCalledWith('admin/catalog/products/bulk-delete', {
        productIds: ['p1', 'p2'],
      });
      expect(component.selectedIds().size).toBe(0);
      expect(notifications.success).toHaveBeenCalled();
    });

    it('deleteSelected warns about partial failures', () => {
      api.post.mockReturnValue(of({ deletedCount: 1, failedIds: ['p2'] }));
      component.toggleSelect('p1');
      component.toggleSelect('p2');
      component.deleteSelected();
      expect(notifications.warning).toHaveBeenCalled();
    });

    it('deleteSelected shows error toast on failure', () => {
      api.post.mockReturnValue(throwError(() => new Error('500')));
      component.toggleSelect('p1');
      component.deleteSelected();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.bulkDeleting()).toBe(false);
    });
  });
});
