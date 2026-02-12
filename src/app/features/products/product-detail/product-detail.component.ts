import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../../core/models/product.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
  ],
  template: `
    <div>
      @if (loading()) {
        <app-loading-spinner />
      } @else if (product()) {
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
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
            <div>
              <h1 class="text-2xl font-bold text-text-primary">
                {{ product()!.nameFr }}
              </h1>
              <p class="text-sm text-text-secondary">{{ product()!.sku }}</p>
            </div>
          </div>
          @if (auth.isSuperAdmin()) {
            <div class="flex items-center gap-2">
              <a
                [routerLink]="[basePath, product()!.id, 'edit']"
                class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover"
                >{{ 'PRODUCTS.EDIT' | translate }}</a
              >
              <button
                (click)="showDeleteModal.set(true)"
                class="px-4 py-2 border border-error text-error text-sm font-medium rounded-lg hover:bg-error-light"
              >
                {{ 'PRODUCTS.DELETE' | translate }}
              </button>
            </div>
          }
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Info -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'PRODUCTS.DETAILS' | translate }}</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">
                    {{ 'PRODUCTS.TYPE' | translate }}
                  </p>
                  <span
                    class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium"
                    [class]="
                      product()!.productType === 'SAAS'
                        ? 'bg-blue-100 text-blue-700'
                        : product()!.productType === 'PHYSICAL'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-purple-100 text-purple-700'
                    "
                  >
                    {{ product()!.productType }}
                  </span>
                </div>
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">
                    {{ 'PRODUCTS.STATUS' | translate }}
                  </p>
                  <app-status-badge
                    [status]="product()!.isAvailable ? 'active' : 'inactive'"
                    [label]="
                      product()!.isAvailable
                        ? ('PRODUCTS.AVAILABLE' | translate)
                        : ('PRODUCTS.UNAVAILABLE' | translate)
                    "
                  />
                </div>
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">
                    {{ 'PRODUCTS.CATEGORY' | translate }}
                  </p>
                  <p class="text-sm text-text-primary">
                    {{ product()!.category?.nameFr || ('PRODUCTS.NA' | translate) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">
                    {{ 'PRODUCTS.FEATURED' | translate }}
                  </p>
                  <p class="text-sm text-text-primary">
                    {{
                      product()!.isFeatured
                        ? ('PRODUCTS.YES' | translate)
                        : ('PRODUCTS.NO' | translate)
                    }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Pricing -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'PRODUCTS.PRICING' | translate }}</h3>
              <div class="grid grid-cols-3 gap-4">
                @if (product()!.priceMonthly) {
                  <div class="p-4 bg-blue-50 rounded-lg">
                    <p class="text-xs text-blue-600 uppercase mb-1">
                      {{ 'PRODUCTS.MONTHLY' | translate }}
                    </p>
                    <p class="text-lg font-bold text-blue-700">
                      {{ formatCurrency(product()!.priceMonthly!) }}
                    </p>
                  </div>
                }
                @if (product()!.priceYearly) {
                  <div class="p-4 bg-green-50 rounded-lg">
                    <p class="text-xs text-green-600 uppercase mb-1">
                      {{ 'PRODUCTS.YEARLY' | translate }}
                    </p>
                    <p class="text-lg font-bold text-green-700">
                      {{ formatCurrency(product()!.priceYearly!) }}
                    </p>
                  </div>
                }
                @if (product()!.priceUnit) {
                  <div class="p-4 bg-purple-50 rounded-lg">
                    <p class="text-xs text-purple-600 uppercase mb-1">
                      {{ 'PRODUCTS.UNIT_PRICE' | translate }}
                    </p>
                    <p class="text-lg font-bold text-purple-700">
                      {{ formatCurrency(product()!.priceUnit!) }}
                    </p>
                  </div>
                }
              </div>
            </div>

            <!-- Description -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'PRODUCTS.DESCRIPTION' | translate }}</h3>
              <div class="space-y-4">
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">
                    {{ 'PRODUCTS.FRENCH' | translate }}
                  </p>
                  <p class="text-sm text-text-primary whitespace-pre-wrap">
                    {{ product()!.descriptionFr }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">
                    {{ 'PRODUCTS.ENGLISH' | translate }}
                  </p>
                  <p class="text-sm text-text-primary whitespace-pre-wrap">
                    {{ product()!.descriptionEn }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Images -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'PRODUCTS.IMAGES' | translate }}</h3>
              @if (product()!.images?.length) {
                <div class="grid grid-cols-2 gap-2">
                  @for (img of product()!.images; track img.id) {
                    <img
                      [src]="img.imageUrl"
                      [alt]="img.altTextFr || ''"
                      class="w-full aspect-square rounded-lg object-cover border border-border-light"
                    />
                  }
                </div>
              } @else {
                <p class="text-sm text-text-muted text-center py-4">
                  {{ 'PRODUCTS.NO_IMAGES' | translate }}
                </p>
              }
            </div>

            <!-- Stock (physical only) -->
            @if (product()!.productType === 'PHYSICAL') {
              <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
                <h3 class="text-lg font-semibold mb-4">{{ 'PRODUCTS.STOCK' | translate }}</h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-text-secondary">{{
                      'PRODUCTS.QUANTITY' | translate
                    }}</span>
                    <span class="text-sm font-medium">{{ product()!.stockQuantity ?? 0 }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-text-secondary">{{
                      'PRODUCTS.ALERT_THRESHOLD' | translate
                    }}</span>
                    <span class="text-sm font-medium">{{ product()!.stockAlertThreshold }}</span>
                  </div>
                </div>
              </div>
            }

            <!-- Characteristics -->
            @if (product()!.characteristics?.length) {
              <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
                <h3 class="text-lg font-semibold mb-4">
                  {{ 'PRODUCTS.CHARACTERISTICS' | translate }}
                </h3>
                <div class="space-y-2">
                  @for (char of product()!.characteristics; track char.id) {
                    <div class="flex justify-between text-sm">
                      <span class="text-text-secondary">{{ char.key }}</span>
                      <span class="text-text-primary font-medium">{{ char.valueFr }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>

    <app-confirm-modal
      [open]="showDeleteModal()"
      [title]="'PRODUCTS.DELETE_TITLE' | translate"
      [message]="'PRODUCTS.DELETE_WARNING' | translate"
      [confirmLabel]="'PRODUCTS.DELETE_CONFIRM' | translate"
      variant="danger"
      (confirm)="deleteProduct()"
      (cancel)="showDeleteModal.set(false)"
    />
  `,
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  readonly auth = inject(AdminAuthService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  product = signal<Product | null>(null);
  loading = signal(true);
  showDeleteModal = signal(false);
  basePath = '/products';

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data['basePath']) this.basePath = data['basePath'];
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadProduct(id);
  }

  loadProduct(id: string) {
    this.api.get<Product>(`admin/catalog/products/${id}`).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('PRODUCTS.NOT_FOUND'));
        this.router.navigate([this.basePath]);
      },
    });
  }

  deleteProduct() {
    const p = this.product();
    if (!p) return;
    this.api.delete(`admin/catalog/products/${p.id}`).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('PRODUCTS.DELETED'));
        this.router.navigate([this.basePath]);
      },
      error: () => {
        this.notifications.error(this.translate.instant('PRODUCTS.DELETE_ERROR'));
        this.showDeleteModal.set(false);
      },
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  }
}
