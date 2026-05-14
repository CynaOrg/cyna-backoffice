import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { ProductPickerComponent } from './product-picker.component';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/product.model';

describe('ProductPickerComponent', () => {
  let fixture: ComponentFixture<ProductPickerComponent>;
  let component: ProductPickerComponent;
  let api: { get: ReturnType<typeof vi.fn> };

  function makeProduct(over: Partial<Product> = {}): Product {
    return {
      id: 'p1',
      categoryId: 'c1',
      slug: 'slug',
      sku: 'SKU',
      nameFr: 'NomFr',
      nameEn: 'NameEn',
      descriptionFr: '',
      descriptionEn: '',
      productType: 'physical',
      stockAlertThreshold: 0,
      isAvailable: true,
      isFeatured: false,
      displayOrder: 0,
      images: [],
      characteristics: [],
      createdAt: '',
      updatedAt: '',
      ...over,
    };
  }

  beforeEach(async () => {
    api = { get: vi.fn().mockReturnValue(of([])) };

    await TestBed.configureTestingModule({
      imports: [ProductPickerComponent, TranslateModule.forRoot()],
      providers: [{ provide: ApiService, useValue: api }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPickerComponent);
    component = fixture.componentInstance;
  });

  describe('open effect', () => {
    it('does not load products until opened', () => {
      fixture.componentRef.setInput('open', false);
      fixture.detectChanges();
      expect(api.get).not.toHaveBeenCalled();
    });

    it('loads products when opened', () => {
      const products = [makeProduct(), makeProduct({ id: 'p2', sku: 'B' })];
      api.get.mockReturnValue(of(products));
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('productType', 'physical');
      fixture.detectChanges();
      expect(api.get).toHaveBeenCalledWith('admin/catalog/products', { productType: 'physical' });
      expect(component.products().length).toBe(2);
      expect(component.loading()).toBe(false);
    });

    it('unwraps data-keyed responses', () => {
      api.get.mockReturnValue(of({ data: [makeProduct()] }));
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();
      expect(component.products().length).toBe(1);
    });

    it('handles errors gracefully', () => {
      api.get.mockReturnValue(throwError(() => new Error('500')));
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();
      expect(component.products()).toEqual([]);
      expect(component.loading()).toBe(false);
    });

    it('syncs selectedOrder from selectedIds when opening', () => {
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('selectedIds', ['a', 'b']);
      fixture.detectChanges();
      expect(component.selectedOrder()).toEqual(['a', 'b']);
    });
  });

  describe('selection', () => {
    beforeEach(() => {
      api.get.mockReturnValue(
        of([
          makeProduct({ id: 'p1', nameFr: 'Alpha', nameEn: 'Alpha En', sku: 'A1' }),
          makeProduct({ id: 'p2', nameFr: 'Beta', nameEn: 'Beta En', sku: 'B2' }),
        ]),
      );
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();
    });

    it('isSelected reflects selectedOrder', () => {
      component.selectedOrder.set(['p1']);
      expect(component.isSelected('p1')).toBe(true);
      expect(component.isSelected('p2')).toBe(false);
    });

    it('toggleProduct adds and removes ids', () => {
      const p = component.products()[0];
      component.toggleProduct(p);
      expect(component.selectedOrder()).toEqual(['p1']);
      component.toggleProduct(p);
      expect(component.selectedOrder()).toEqual([]);
    });

    it('moveSelected moves down', () => {
      component.selectedOrder.set(['a', 'b', 'c']);
      component.moveSelected(0, 'down');
      expect(component.selectedOrder()).toEqual(['b', 'a', 'c']);
    });

    it('moveSelected moves up', () => {
      component.selectedOrder.set(['a', 'b', 'c']);
      component.moveSelected(2, 'up');
      expect(component.selectedOrder()).toEqual(['a', 'c', 'b']);
    });

    it('moveSelected is a no-op out of bounds', () => {
      component.selectedOrder.set(['a']);
      component.moveSelected(0, 'up');
      expect(component.selectedOrder()).toEqual(['a']);
    });

    it('productById finds by id', () => {
      expect(component.productById('p2')?.id).toBe('p2');
      expect(component.productById('missing')).toBeUndefined();
    });
  });

  describe('search', () => {
    beforeEach(() => {
      api.get.mockReturnValue(
        of([
          makeProduct({ id: 'p1', nameFr: 'Alpha', nameEn: 'Alpha En', sku: 'A1' }),
          makeProduct({ id: 'p2', nameFr: 'Beta', nameEn: 'Beta En', sku: 'B2' }),
        ]),
      );
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();
    });

    it('returns all products when query is empty', () => {
      expect(component.filteredProducts().length).toBe(2);
    });

    it('filters by nameFr', () => {
      component.onSearchChange('alpha');
      expect(component.filteredProducts().map((p) => p.id)).toEqual(['p1']);
    });

    it('filters by sku', () => {
      component.onSearchChange('b2');
      expect(component.filteredProducts().map((p) => p.id)).toEqual(['p2']);
    });
  });

  describe('primaryImageUrl', () => {
    beforeEach(() => fixture.detectChanges());

    it('returns the primary image url', () => {
      const p = makeProduct({
        images: [
          { id: 'i1', imageUrl: 'a', isPrimary: false, displayOrder: 0 },
          { id: 'i2', imageUrl: 'b', isPrimary: true, displayOrder: 1 },
        ],
      });
      expect(component.primaryImageUrl(p)).toBe('b');
    });

    it('falls back to first image', () => {
      const p = makeProduct({
        images: [{ id: 'i1', imageUrl: 'a', isPrimary: false, displayOrder: 0 }],
      });
      expect(component.primaryImageUrl(p)).toBe('a');
    });

    it('returns null when there are no images', () => {
      expect(component.primaryImageUrl(makeProduct())).toBeNull();
    });
  });

  describe('emits', () => {
    beforeEach(() => fixture.detectChanges());

    it('emits close when handleClose is called', () => {
      const spy = vi.fn();
      component.close.subscribe(spy);
      component.handleClose();
      expect(spy).toHaveBeenCalled();
    });

    it('emits saved with current selectedOrder', () => {
      const spy = vi.fn();
      component.saved.subscribe(spy);
      component.selectedOrder.set(['a', 'b']);
      component.handleConfirm();
      expect(spy).toHaveBeenCalledWith(['a', 'b']);
    });
  });
});
