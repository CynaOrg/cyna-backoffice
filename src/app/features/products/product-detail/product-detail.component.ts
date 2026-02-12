import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
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
  imports: [RouterLink, StatusBadgeComponent, LoadingSpinnerComponent, ConfirmModalComponent],
  template: `
    <div>
      @if (loading()) {
        <app-loading-spinner />
      } @else if (product()) {
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
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
            <div>
              <h1
                class="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]"
              >
                {{ product()!.nameFr }}
              </h1>
              <p class="text-sm text-text-secondary">{{ product()!.sku }}</p>
            </div>
          </div>
          @if (auth.isSuperAdmin()) {
            <div class="flex items-center gap-2">
              <a
                [routerLink]="['/products', product()!.id, 'edit']"
                class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark"
                >Edit</a
              >
              <button
                (click)="showDeleteModal.set(true)"
                class="px-4 py-2 border border-danger text-danger text-sm font-medium rounded-lg hover:bg-danger-light"
              >
                Delete
              </button>
            </div>
          }
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Main Info -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
                Details
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">Type</p>
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
                  <p class="text-xs text-text-muted uppercase mb-1">Status</p>
                  <app-status-badge
                    [status]="product()!.isAvailable ? 'active' : 'inactive'"
                    [label]="product()!.isAvailable ? 'Available' : 'Unavailable'"
                  />
                </div>
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">Category</p>
                  <p class="text-sm text-text-primary">
                    {{ product()!.category?.nameFr || 'N/A' }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">Featured</p>
                  <p class="text-sm text-text-primary">
                    {{ product()!.isFeatured ? 'Yes' : 'No' }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Pricing -->
            <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
                Pricing
              </h3>
              <div class="grid grid-cols-3 gap-4">
                @if (product()!.priceMonthly) {
                  <div class="p-4 bg-blue-50 rounded-lg">
                    <p class="text-xs text-blue-600 uppercase mb-1">Monthly</p>
                    <p class="text-lg font-bold text-blue-700">
                      {{ formatCurrency(product()!.priceMonthly!) }}
                    </p>
                  </div>
                }
                @if (product()!.priceYearly) {
                  <div class="p-4 bg-green-50 rounded-lg">
                    <p class="text-xs text-green-600 uppercase mb-1">Yearly</p>
                    <p class="text-lg font-bold text-green-700">
                      {{ formatCurrency(product()!.priceYearly!) }}
                    </p>
                  </div>
                }
                @if (product()!.priceUnit) {
                  <div class="p-4 bg-purple-50 rounded-lg">
                    <p class="text-xs text-purple-600 uppercase mb-1">Unit Price</p>
                    <p class="text-lg font-bold text-purple-700">
                      {{ formatCurrency(product()!.priceUnit!) }}
                    </p>
                  </div>
                }
              </div>
            </div>

            <!-- Description -->
            <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
                Description
              </h3>
              <div class="space-y-4">
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">French</p>
                  <p class="text-sm text-text-primary whitespace-pre-wrap">
                    {{ product()!.descriptionFr }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-text-muted uppercase mb-1">English</p>
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
            <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
                Images
              </h3>
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
                <p class="text-sm text-text-muted text-center py-4">No images</p>
              }
            </div>

            <!-- Stock (physical only) -->
            @if (product()!.productType === 'PHYSICAL') {
              <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
                <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
                  Stock
                </h3>
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-sm text-text-secondary">Quantity</span>
                    <span class="text-sm font-medium">{{ product()!.stockQuantity ?? 0 }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-text-secondary">Alert threshold</span>
                    <span class="text-sm font-medium">{{ product()!.stockAlertThreshold }}</span>
                  </div>
                </div>
              </div>
            }

            <!-- Characteristics -->
            @if (product()!.characteristics?.length) {
              <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
                <h3 class="text-lg font-semibold mb-4 font-[family-name:var(--font-heading)]">
                  Characteristics
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
      title="Delete Product"
      [message]="'Are you sure you want to delete this product? This action cannot be undone.'"
      confirmLabel="Delete"
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

  product = signal<Product | null>(null);
  loading = signal(true);
  showDeleteModal = signal(false);

  ngOnInit() {
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
        this.notifications.error('Product not found');
        this.router.navigate(['/products']);
      },
    });
  }

  deleteProduct() {
    const p = this.product();
    if (!p) return;
    this.api.delete(`admin/catalog/products/${p.id}`).subscribe({
      next: () => {
        this.notifications.success('Product deleted');
        this.router.navigate(['/products']);
      },
      error: () => {
        this.notifications.error('Failed to delete product');
        this.showDeleteModal.set(false);
      },
    });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  }
}
