import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product, Category } from '../../../core/models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule, LoadingSpinnerComponent],
  template: `
    <div>
      <div class="flex items-center gap-3 mb-6">
        <a [routerLink]="basePath" class="p-2 rounded-lg hover:bg-gray-100 text-text-muted">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-text-primary">
          {{ isEdit() ? ('PRODUCTS.EDIT' | translate) : (newTitleKey | translate) }}
        </h1>
      </div>

      @if (loadingProduct()) {
        <app-loading-spinner />
      } @else {
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Basic Info -->
          <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">{{ 'PRODUCTS.BASIC_INFO' | translate }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                  'PRODUCTS.NAME_FR' | translate
                }}</label>
                <input
                  formControlName="nameFr"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                  'PRODUCTS.NAME_EN' | translate
                }}</label>
                <input
                  formControlName="nameEn"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                  'PRODUCTS.SLUG' | translate
                }}</label>
                <input
                  formControlName="slug"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                  'PRODUCTS.SKU' | translate
                }}</label>
                <input
                  formControlName="sku"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                  'PRODUCTS.CATEGORY' | translate
                }}</label>
                <select
                  formControlName="categoryId"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">{{ 'PRODUCTS.SELECT_CATEGORY' | translate }}</option>
                  @for (cat of categories(); track cat.id) {
                    <option [value]="cat.id">{{ cat.nameFr }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                  'PRODUCTS.PRODUCT_TYPE' | translate
                }}</label>
                <select
                  formControlName="productType"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="SAAS">{{ 'PRODUCTS.SAAS' | translate }}</option>
                  <option value="PHYSICAL">{{ 'PRODUCTS.PHYSICAL' | translate }}</option>
                  <option value="LICENSE">{{ 'PRODUCTS.LICENSE' | translate }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">{{ 'PRODUCTS.DESCRIPTION' | translate }}</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                  'PRODUCTS.DESCRIPTION_FR' | translate
                }}</label>
                <textarea
                  formControlName="descriptionFr"
                  rows="4"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                  'PRODUCTS.DESCRIPTION_EN' | translate
                }}</label>
                <textarea
                  formControlName="descriptionEn"
                  rows="4"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Pricing -->
          <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">{{ 'PRODUCTS.PRICING' | translate }}</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              @if (form.get('productType')?.value === 'SAAS') {
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                    'PRODUCTS.MONTHLY_PRICE' | translate
                  }}</label>
                  <input
                    type="number"
                    step="0.01"
                    formControlName="priceMonthly"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                    'PRODUCTS.YEARLY_PRICE' | translate
                  }}</label>
                  <input
                    type="number"
                    step="0.01"
                    formControlName="priceYearly"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              } @else {
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                    'PRODUCTS.UNIT_PRICE_EUR' | translate
                  }}</label>
                  <input
                    type="number"
                    step="0.01"
                    formControlName="priceUnit"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              }
            </div>
          </div>

          <!-- Options -->
          <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">{{ 'PRODUCTS.OPTIONS' | translate }}</h3>
            <div class="flex flex-wrap gap-6">
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  formControlName="isAvailable"
                  class="rounded border-border text-primary focus:ring-primary"
                />
                {{ 'PRODUCTS.AVAILABLE' | translate }}
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  formControlName="isFeatured"
                  class="rounded border-border text-primary focus:ring-primary"
                />
                {{ 'PRODUCTS.FEATURED' | translate }}
              </label>
            </div>
            @if (form.get('productType')?.value === 'PHYSICAL') {
              <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                    'PRODUCTS.STOCK_QUANTITY' | translate
                  }}</label>
                  <input
                    type="number"
                    formControlName="stockQuantity"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5">{{
                    'PRODUCTS.STOCK_ALERT' | translate
                  }}</label>
                  <input
                    type="number"
                    formControlName="stockAlertThreshold"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            }
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3">
            <a
              [routerLink]="basePath"
              class="px-4 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-lg hover:bg-gray-50"
              >{{ 'PRODUCTS.CANCEL' | translate }}</a
            >
            <button
              type="submit"
              [disabled]="saving()"
              class="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover disabled:opacity-60"
            >
              {{
                saving()
                  ? ('PRODUCTS.SAVING' | translate)
                  : isEdit()
                    ? ('PRODUCTS.UPDATE' | translate)
                    : ('PRODUCTS.CREATE' | translate)
              }}
            </button>
          </div>
        </form>
      }
    </div>
  `,
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  isEdit = signal(false);
  loadingProduct = signal(false);
  saving = signal(false);
  categories = signal<Category[]>([]);
  private productId = '';
  basePath = '/products';
  newTitleKey = 'PRODUCTS.NEW_PRODUCT';

  form = this.fb.group({
    nameFr: ['', Validators.required],
    nameEn: ['', Validators.required],
    slug: ['', Validators.required],
    sku: ['', Validators.required],
    categoryId: ['', Validators.required],
    productType: ['SAAS', Validators.required],
    descriptionFr: ['', Validators.required],
    descriptionEn: ['', Validators.required],
    priceMonthly: [null as number | null],
    priceYearly: [null as number | null],
    priceUnit: [null as number | null],
    isAvailable: [true],
    isFeatured: [false],
    stockQuantity: [null as number | null],
    stockAlertThreshold: [10],
  });

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data['basePath']) this.basePath = data['basePath'];
    if (data['newTitleKey']) this.newTitleKey = data['newTitleKey'];
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.productId = id;
      this.loadProduct(id);
    }
  }

  loadCategories() {
    this.api.get<any>('admin/catalog/categories').subscribe({
      next: (res) => {
        // Handle both array and wrapped formats
        const cats = Array.isArray(res) ? res : res?.data || res || [];
        this.categories.set(cats);
      },
    });
  }

  loadProduct(id: string) {
    this.loadingProduct.set(true);
    this.api.get<Product>(`admin/catalog/products/${id}`).subscribe({
      next: (p) => {
        this.form.patchValue({
          nameFr: p.nameFr,
          nameEn: p.nameEn,
          slug: p.slug,
          sku: p.sku,
          categoryId: p.categoryId,
          productType: p.productType,
          descriptionFr: p.descriptionFr,
          descriptionEn: p.descriptionEn,
          priceMonthly: p.priceMonthly ?? null,
          priceYearly: p.priceYearly ?? null,
          priceUnit: p.priceUnit ?? null,
          isAvailable: p.isAvailable,
          isFeatured: p.isFeatured,
          stockQuantity: p.stockQuantity ?? null,
          stockAlertThreshold: p.stockAlertThreshold,
        });
        this.loadingProduct.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('PRODUCTS.NOT_FOUND'));
        this.router.navigate([this.basePath]);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const data = this.form.value;

    const request = this.isEdit()
      ? this.api.patch<any, Product>(`admin/catalog/products/${this.productId}`, data)
      : this.api.post<any, Product>('admin/catalog/products', data);

    request.subscribe({
      next: (product) => {
        this.notifications.success(
          this.isEdit()
            ? this.translate.instant('PRODUCTS.UPDATED')
            : this.translate.instant('PRODUCTS.CREATED'),
        );
        this.router.navigate([this.basePath, product.id || this.productId]);
      },
      error: (err) => {
        this.saving.set(false);
        this.notifications.error(
          err.error?.message || this.translate.instant('PRODUCTS.SAVE_ERROR'),
        );
      },
    });
  }
}
