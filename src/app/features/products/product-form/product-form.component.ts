import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product, Category } from '../../../core/models/product.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LoadingSpinnerComponent],
  template: `
    <div>
      <div class="flex items-center gap-3 mb-6">
        <a routerLink="/products" class="p-2 rounded-lg hover:bg-gray-100 text-text-muted">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </a>
        <h1 class="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
          {{ isEdit() ? 'Edit Product' : 'New Product' }}
        </h1>
      </div>

      @if (loadingProduct()) {
        <app-loading-spinner />
      } @else {
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
          <!-- Basic Info -->
          <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
              Basic Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5"
                  >Name (FR)</label
                >
                <input
                  formControlName="nameFr"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5"
                  >Name (EN)</label
                >
                <input
                  formControlName="nameEn"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">Slug</label>
                <input
                  formControlName="slug"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">SKU</label>
                <input
                  formControlName="sku"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5">Category</label>
                <select
                  formControlName="categoryId"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="">Select category</option>
                  @for (cat of categories(); track cat.id) {
                    <option [value]="cat.id">{{ cat.nameFr }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5"
                  >Product Type</label
                >
                <select
                  formControlName="productType"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="SAAS">SaaS</option>
                  <option value="PHYSICAL">Physical</option>
                  <option value="LICENSE">License</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
              Description
            </h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5"
                  >Description (FR)</label
                >
                <textarea
                  formControlName="descriptionFr"
                  rows="4"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1.5"
                  >Description (EN)</label
                >
                <textarea
                  formControlName="descriptionEn"
                  rows="4"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <!-- Pricing -->
          <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
              Pricing
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              @if (form.get('productType')?.value === 'SAAS') {
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5"
                    >Monthly Price (EUR)</label
                  >
                  <input
                    type="number"
                    step="0.01"
                    formControlName="priceMonthly"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5"
                    >Yearly Price (EUR)</label
                  >
                  <input
                    type="number"
                    step="0.01"
                    formControlName="priceYearly"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              } @else {
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5"
                    >Unit Price (EUR)</label
                  >
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
          <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
              Options
            </h3>
            <div class="flex flex-wrap gap-6">
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  formControlName="isAvailable"
                  class="rounded border-border text-primary focus:ring-primary"
                />
                Available
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  formControlName="isFeatured"
                  class="rounded border-border text-primary focus:ring-primary"
                />
                Featured
              </label>
            </div>
            @if (form.get('productType')?.value === 'PHYSICAL') {
              <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5"
                    >Stock Quantity</label
                  >
                  <input
                    type="number"
                    formControlName="stockQuantity"
                    class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1.5"
                    >Stock Alert Threshold</label
                  >
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
              routerLink="/products"
              class="px-4 py-2.5 border border-border text-text-secondary text-sm font-medium rounded-lg hover:bg-gray-50"
              >Cancel</a
            >
            <button
              type="submit"
              [disabled]="saving()"
              class="px-6 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark disabled:opacity-60"
            >
              {{ saving() ? 'Saving...' : isEdit() ? 'Update Product' : 'Create Product' }}
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

  isEdit = signal(false);
  loadingProduct = signal(false);
  saving = signal(false);
  categories = signal<Category[]>([]);
  private productId = '';

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
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.productId = id;
      this.loadProduct(id);
    }
  }

  loadCategories() {
    this.api.getList<Category>('admin/catalog/categories').subscribe({
      next: (cats) => this.categories.set(cats),
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
        this.notifications.error('Product not found');
        this.router.navigate(['/products']);
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
        this.notifications.success(this.isEdit() ? 'Product updated' : 'Product created');
        this.router.navigate(['/products', product.id || this.productId]);
      },
      error: (err) => {
        this.saving.set(false);
        this.notifications.error(err.error?.message || 'Failed to save product');
      },
    });
  }
}
