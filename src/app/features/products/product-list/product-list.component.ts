import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../../core/models/product.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    TranslateModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
  ],
  template: `
    <div>
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-text-primary">{{ titleKey | translate }}</h1>
          <p class="text-sm text-text-secondary mt-1">{{ subtitleKey | translate }}</p>
        </div>
        @if (auth.isSuperAdmin()) {
          <a
            [routerLink]="newProductLink"
            class="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            {{ newProductLabelKey | translate }}
          </a>
        }
      </div>

      <!-- Filters -->
      <div class="bg-surface rounded-xl border border-border-light shadow-sm p-4 mb-6">
        <div class="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            [placeholder]="'PRODUCTS.SEARCH_PLACEHOLDER' | translate"
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
            class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
          />
          @if (!fixedType) {
            <select
              [(ngModel)]="typeFilter"
              (change)="loadProducts()"
              class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">{{ 'PRODUCTS.ALL_TYPES' | translate }}</option>
              <option value="saas">{{ 'PRODUCTS.SAAS' | translate }}</option>
              <option value="physical">{{ 'PRODUCTS.PHYSICAL' | translate }}</option>
              <option value="license">{{ 'PRODUCTS.LICENSE' | translate }}</option>
            </select>
          }
        </div>
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <div class="bg-surface rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'PRODUCTS.PRODUCT' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'PRODUCTS.SKU' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'PRODUCTS.TYPE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'PRODUCTS.PRICE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'PRODUCTS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'PRODUCTS.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (product of filteredProducts(); track product.id) {
                  <tr class="hover:bg-gray-50/50">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        @if (product.images?.[0]?.imageUrl) {
                          <img
                            [src]="product.images[0].imageUrl"
                            [alt]="product.nameFr"
                            class="w-10 h-10 rounded-lg object-cover border border-border-light"
                          />
                        } @else {
                          <div
                            class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center"
                          >
                            <svg
                              class="w-5 h-5 text-text-muted"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        }
                        <div>
                          <a
                            [routerLink]="[basePath, product.id]"
                            class="text-sm font-medium text-text-primary hover:text-primary"
                            >{{ product.nameFr }}</a
                          >
                          <p class="text-xs text-text-muted">{{ product.nameEn }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary font-mono">
                      {{ product.sku }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                        [class]="
                          product.productType?.toLowerCase() === 'saas'
                            ? 'bg-blue-100 text-blue-700'
                            : product.productType?.toLowerCase() === 'physical'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-purple-100 text-purple-700'
                        "
                      >
                        {{ product.productType }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-text-primary font-medium">
                      {{ getPrice(product) }}
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge
                        [status]="product.isAvailable ? 'active' : 'inactive'"
                        [label]="
                          product.isAvailable
                            ? ('PRODUCTS.AVAILABLE' | translate)
                            : ('PRODUCTS.UNAVAILABLE' | translate)
                        "
                      />
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <a
                          [routerLink]="[basePath, product.id]"
                          class="p-1.5 text-text-muted hover:text-primary rounded-lg hover:bg-gray-100"
                          title="View"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </a>
                        @if (auth.isSuperAdmin()) {
                          <a
                            [routerLink]="[basePath, product.id, 'edit']"
                            class="p-1.5 text-text-muted hover:text-primary rounded-lg hover:bg-gray-100"
                            title="Edit"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </a>
                          <button
                            (click)="confirmDelete(product)"
                            class="p-1.5 text-text-muted hover:text-error rounded-lg hover:bg-red-50"
                            title="Delete"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        }
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'PRODUCTS.NO_PRODUCTS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>

    <app-confirm-modal
      [open]="showDeleteModal()"
      [title]="'PRODUCTS.DELETE_TITLE' | translate"
      [message]="
        ('PRODUCTS.DELETE_WARNING' | translate) + ' ' + (productToDelete()?.nameFr || '') + '?'
      "
      [confirmLabel]="'PRODUCTS.DELETE_CONFIRM' | translate"
      variant="danger"
      (confirm)="deleteProduct()"
      (cancel)="showDeleteModal.set(false)"
    />
  `,
})
export class ProductListComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly auth = inject(AdminAuthService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);
  private readonly route = inject(ActivatedRoute);

  products = signal<Product[]>([]);
  loading = signal(true);
  searchQuery = '';
  typeFilter = '';
  fixedType = '';
  showDeleteModal = signal(false);
  productToDelete = signal<Product | null>(null);

  titleKey = 'PRODUCTS.TITLE';
  subtitleKey = 'PRODUCTS.SUBTITLE';
  newProductLabelKey = 'PRODUCTS.NEW_PRODUCT';
  newProductLink = '/products/new';
  basePath = '/products';

  private searchTimeout: any;

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data['productType']) {
      this.fixedType = data['productType'];
      this.typeFilter = this.fixedType;
    }
    if (data['titleKey']) this.titleKey = data['titleKey'];
    if (data['subtitleKey']) this.subtitleKey = data['subtitleKey'];
    if (data['newLabelKey']) this.newProductLabelKey = data['newLabelKey'];
    if (data['basePath']) {
      this.basePath = data['basePath'];
      this.newProductLink = data['basePath'] + '/new';
    }
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    const params: Record<string, string | number | boolean> = {};
    if (this.typeFilter) params['productType'] = this.typeFilter;

    this.api.get<any>('admin/catalog/products', params).subscribe({
      next: (res) => {
        // Handle both array and paginated response formats
        const products = Array.isArray(res) ? res : res?.data || [];
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('PRODUCTS.LOAD_ERROR'));
        this.loading.set(false);
      },
    });
  }

  filteredProducts() {
    const query = this.searchQuery.toLowerCase();
    if (!query) return this.products();
    return this.products().filter(
      (p) =>
        p.nameFr.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query),
    );
  }

  onSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.loadProducts();
    }, 300);
  }

  getPrice(product: Product): string {
    const fmt = (v: number) =>
      new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v);
    if (product.priceMonthly) return `${fmt(product.priceMonthly)}/mo`;
    if (product.priceYearly) return `${fmt(product.priceYearly)}/yr`;
    if (product.priceUnit) return fmt(product.priceUnit);
    return this.translate.instant('PRODUCTS.NA');
  }

  confirmDelete(product: Product) {
    this.productToDelete.set(product);
    this.showDeleteModal.set(true);
  }

  deleteProduct() {
    const product = this.productToDelete();
    if (!product) return;
    this.api.delete(`admin/catalog/products/${product.id}`).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('PRODUCTS.DELETED'));
        this.products.update((list) => list.filter((p) => p.id !== product.id));
        this.showDeleteModal.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('PRODUCTS.DELETE_ERROR'));
        this.showDeleteModal.set(false);
      },
    });
  }
}
