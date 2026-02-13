import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../../core/models/product.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, TranslateModule, StatusBadgeComponent, ConfirmModalComponent],
  template: `
    @if (loading()) {
      <!-- Skeleton loading -->
      <div style="animation: fadeInUp 0.45s ease-out both">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full animate-pulse bg-gray-100"></div>
            <div class="flex flex-col gap-2">
              <div class="h-6 w-48 animate-pulse rounded bg-gray-100"></div>
              <div class="h-4 w-64 animate-pulse rounded bg-gray-100"></div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="h-9 w-20 animate-pulse rounded-lg bg-gray-100"></div>
            <div class="h-9 w-24 animate-pulse rounded-lg bg-gray-100"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div class="lg:col-span-2 space-y-5">
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-32 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-0">
                <div class="flex gap-8 py-3.5">
                  <div class="h-8 w-28 animate-pulse rounded bg-gray-100"></div>
                  <div class="h-8 w-28 animate-pulse rounded bg-gray-100"></div>
                </div>
              </div>
            </div>
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-28 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-3">
                <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-3/4 animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-5/6 animate-pulse rounded bg-gray-100"></div>
              </div>
            </div>
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-36 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-0">
                @for (i of [0, 1, 2]; track i) {
                  <div class="flex items-center gap-4 py-3">
                    <div class="h-4 w-32 animate-pulse rounded bg-gray-100"></div>
                    <div class="flex-1"></div>
                    <div class="h-4 w-40 animate-pulse rounded bg-gray-100"></div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div class="space-y-5">
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-40 animate-pulse rounded-lg bg-gray-100"></div>
            </div>
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-28 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-3">
                <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    } @else if (product(); as p) {
      <div style="animation: fadeInUp 0.45s ease-out both">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <a
              [routerLink]="basePath"
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background transition-colors hover:bg-primary-light"
              style="text-decoration: none; color: #0a0a0a; border: none"
            >
              <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </a>
            <div class="min-w-0">
              <div class="flex items-center gap-3">
                <h1 class="text-xl font-bold text-text-primary truncate !m-0">{{ p.nameFr }}</h1>
                <app-status-badge
                  [status]="p.isAvailable ? 'active' : 'inactive'"
                  [label]="
                    p.isAvailable
                      ? ('PRODUCTS.AVAILABLE' | translate)
                      : ('PRODUCTS.UNAVAILABLE' | translate)
                  "
                />
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="text-xs text-text-muted font-mono">{{ p.sku }}</span>
                <span class="text-text-muted/30 text-xs">|</span>
                <span class="text-xs text-text-muted">{{ p.productType }}</span>
                @if (p.category?.nameFr) {
                  <span class="text-text-muted/30 text-xs">|</span>
                  <span class="text-xs text-text-muted">{{ p.category?.nameFr }}</span>
                }
                @if (p.isFeatured) {
                  <span class="text-text-muted/30 text-xs">|</span>
                  <span class="text-xs text-warning font-medium">{{
                    'PRODUCTS.FEATURED' | translate
                  }}</span>
                }
                <span class="text-text-muted/30 text-xs">|</span>
                <span class="text-xs text-text-muted">{{ formatDate(p.createdAt) }}</span>
              </div>
            </div>
          </div>
          @if (auth.isSuperAdmin()) {
            <div class="flex items-center gap-2">
              <a
                [routerLink]="[basePath, p.id, 'edit']"
                class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
                style="text-decoration: none"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                  />
                </svg>
                {{ 'PRODUCTS.EDIT' | translate }}
              </a>
              <button
                (click)="showDeleteModal.set(true)"
                class="inline-flex items-center gap-1.5 px-4 py-2 border border-border-light text-text-muted text-sm font-medium rounded-lg hover:text-error hover:border-error hover:bg-error-light transition-colors bg-transparent cursor-pointer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                {{ 'PRODUCTS.DELETE' | translate }}
              </button>
            </div>
          }
        </div>

        <!-- Content grid -->
        <div
          class="grid grid-cols-1 lg:grid-cols-3 gap-5"
          style="animation: fadeInUp 0.45s ease-out 0.08s both"
        >
          <!-- Main column -->
          <div class="lg:col-span-2 flex flex-col gap-5">
            <!-- Pricing -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.PRICING' | translate }}
                </h3>
              </div>
              <div class="p-5">
                @if (priceCount() > 0) {
                  <div class="flex flex-wrap gap-6">
                    @if (p.priceMonthly) {
                      <div class="flex items-baseline gap-2.5">
                        <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                          formatCurrency(p.priceMonthly)
                        }}</span>
                        <span class="text-xs text-text-muted"
                          >/ {{ 'PRODUCTS.MONTHLY' | translate }}</span
                        >
                      </div>
                    }
                    @if (p.priceYearly) {
                      @if (p.priceMonthly) {
                        <div class="w-px self-stretch bg-border-light"></div>
                      }
                      <div class="flex items-baseline gap-2.5">
                        <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                          formatCurrency(p.priceYearly)
                        }}</span>
                        <span class="text-xs text-text-muted"
                          >/ {{ 'PRODUCTS.YEARLY' | translate }}</span
                        >
                      </div>
                    }
                    @if (p.priceUnit) {
                      @if (p.priceMonthly || p.priceYearly) {
                        <div class="w-px self-stretch bg-border-light"></div>
                      }
                      <div class="flex items-baseline gap-2.5">
                        <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                          formatCurrency(p.priceUnit)
                        }}</span>
                        <span class="text-xs text-text-muted"
                          >/ {{ 'PRODUCTS.UNIT_PRICE' | translate }}</span
                        >
                      </div>
                    }
                  </div>
                  @if (priceCount() > 1 && p.priceMonthly && p.priceYearly) {
                    <div class="mt-4 pt-4 border-t border-border-light">
                      <div class="flex items-center gap-2">
                        <span class="text-xs text-success font-medium">
                          {{ getYearlySavings() }}
                        </span>
                      </div>
                    </div>
                  }
                } @else {
                  <div class="flex items-center gap-2 py-2">
                    <span class="text-sm text-text-muted">{{ 'PRODUCTS.NA' | translate }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Description -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.DESCRIPTION' | translate }}
                </h3>
              </div>
              <div class="divide-y divide-border-light">
                <div class="px-6 py-5">
                  <div class="flex items-center gap-2 mb-3">
                    <span
                      class="inline-flex items-center rounded bg-background border border-border-light px-2 py-0.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider"
                      >FR</span
                    >
                  </div>
                  <p class="text-sm text-text-primary leading-relaxed whitespace-pre-wrap !m-0">
                    {{ p.descriptionFr || ('PRODUCTS.NA' | translate) }}
                  </p>
                </div>
                <div class="px-6 py-5">
                  <div class="flex items-center gap-2 mb-3">
                    <span
                      class="inline-flex items-center rounded bg-background border border-border-light px-2 py-0.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider"
                      >EN</span
                    >
                  </div>
                  <p class="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap !m-0">
                    {{ p.descriptionEn || ('PRODUCTS.NA' | translate) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Characteristics -->
            @if (p.characteristics?.length) {
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden flex-1"
              >
                <div
                  class="px-6 py-4 border-b border-border-light flex items-center justify-between"
                >
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.CHARACTERISTICS' | translate }}
                  </h3>
                  <span class="text-[11px] text-text-muted"
                    >{{ p.characteristics.length }}
                    {{ p.characteristics.length > 1 ? 'items' : 'item' }}</span
                  >
                </div>
                <div class="divide-y divide-border-light">
                  @for (char of p.characteristics; track char.id; let odd = $odd) {
                    <div
                      class="flex items-baseline gap-3 px-6 py-3"
                      [class]="odd ? 'bg-background/50' : ''"
                    >
                      @if (char.keyFr) {
                        <span
                          class="text-xs font-medium text-text-muted uppercase tracking-wide shrink-0"
                          >{{ char.keyFr }}</span
                        >
                        <span class="text-xs text-text-muted/30">—</span>
                      }
                      <span class="text-sm text-text-primary">{{ char.valueFr || '—' }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Sidebar -->
          <div class="flex flex-col gap-5">
            <!-- Images -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.IMAGES' | translate }}
                </h3>
              </div>
              @if (p.images?.length) {
                <div class="p-4">
                  @if (selectedImage()) {
                    <div
                      class="relative w-full overflow-hidden rounded-lg bg-border-light mb-3"
                      style="aspect-ratio: 4/3"
                    >
                      <img
                        [src]="selectedImage()"
                        [alt]="p.nameFr"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  }
                  @if (p.images.length > 1) {
                    <div class="grid grid-cols-4 gap-2">
                      @for (img of p.images; track img.id) {
                        <button
                          (click)="selectedImage.set(img.imageUrl)"
                          class="aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-transparent p-0"
                          [class]="
                            selectedImage() === img.imageUrl
                              ? 'border-primary shadow-sm'
                              : 'border-border-light hover:border-primary/30'
                          "
                        >
                          <img
                            [src]="img.imageUrl"
                            [alt]="img.altTextFr || ''"
                            class="w-full h-full object-cover"
                          />
                        </button>
                      }
                    </div>
                  }
                </div>
              } @else {
                <div class="flex flex-col items-center justify-center gap-2 py-10">
                  <div
                    class="w-10 h-10 rounded-full bg-background flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-text-muted/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                      />
                    </svg>
                  </div>
                  <span class="text-xs text-text-muted">{{
                    'PRODUCTS.NO_IMAGES' | translate
                  }}</span>
                </div>
              }
            </div>

            <!-- Stock (physical only) -->
            @if (p.productType === 'PHYSICAL') {
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.STOCK' | translate }}
                  </h3>
                </div>
                <div class="p-5">
                  <div class="flex items-baseline justify-between mb-3">
                    <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                      p.stockQuantity ?? 0
                    }}</span>
                    <span class="text-xs text-text-muted"
                      >{{ 'PRODUCTS.ALERT_THRESHOLD' | translate }}:
                      {{ p.stockAlertThreshold }}</span
                    >
                  </div>
                  <div class="w-full bg-border-light rounded-full h-2">
                    <div
                      class="rounded-full h-2 transition-all duration-500"
                      [class]="stockBarColor()"
                      [style.width.%]="stockPercent()"
                    ></div>
                  </div>
                  @if (isLowStock()) {
                    <div class="flex items-center gap-1.5 mt-3">
                      <svg
                        class="w-3.5 h-3.5 text-warning"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                      <span class="text-xs font-medium text-warning">{{
                        'PRODUCTS.LOW_STOCK' | translate
                      }}</span>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Quick info -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.DETAILS' | translate }}
                </h3>
              </div>
              <div class="divide-y divide-border-light">
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{ 'PRODUCTS.SLUG' | translate }}</span>
                  <span
                    class="text-xs font-mono text-text-secondary bg-background px-2 py-0.5 rounded"
                    >{{ p.slug }}</span
                  >
                </div>
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{ 'PRODUCTS.SKU' | translate }}</span>
                  <span
                    class="text-xs font-mono text-text-secondary bg-background px-2 py-0.5 rounded"
                    >{{ p.sku }}</span
                  >
                </div>
                @if (p.nameEn) {
                  <div class="flex items-center justify-between px-6 py-3.5">
                    <span class="text-xs text-text-muted">{{
                      'PRODUCTS.NAME_EN' | translate
                    }}</span>
                    <span class="text-xs text-text-secondary">{{ p.nameEn }}</span>
                  </div>
                }
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'PRODUCTS.DISPLAY_ORDER' | translate
                  }}</span>
                  <span class="text-xs font-medium text-text-secondary">{{ p.displayOrder }}</span>
                </div>
                @if (p.updatedAt) {
                  <div class="flex items-center justify-between px-6 py-3.5">
                    <span class="text-xs text-text-muted">{{
                      'PRODUCTS.UPDATED_AT' | translate
                    }}</span>
                    <span class="text-xs text-text-secondary">{{ formatDate(p.updatedAt) }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }

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
  selectedImage = signal<string>('');
  basePath = '/products';

  stockPercent = computed(() => {
    const p = this.product();
    if (!p || p.productType !== 'PHYSICAL') return 0;
    const qty = p.stockQuantity ?? 0;
    const max = Math.max(qty, p.stockAlertThreshold * 3, 100);
    return Math.min((qty / max) * 100, 100);
  });

  stockBarColor = computed(() => {
    const p = this.product();
    if (!p) return 'bg-success';
    const qty = p.stockQuantity ?? 0;
    if (qty === 0) return 'bg-error';
    if (qty <= p.stockAlertThreshold) return 'bg-warning';
    return 'bg-success';
  });

  isLowStock = computed(() => {
    const p = this.product();
    if (!p || p.productType !== 'PHYSICAL') return false;
    return (p.stockQuantity ?? 0) <= p.stockAlertThreshold;
  });

  priceCount = computed(() => {
    const p = this.product();
    if (!p) return 0;
    return (p.priceMonthly ? 1 : 0) + (p.priceYearly ? 1 : 0) + (p.priceUnit ? 1 : 0);
  });

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
        const primary = product.images?.find((img) => img.isPrimary);
        this.selectedImage.set(primary?.imageUrl || product.images?.[0]?.imageUrl || '');
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

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  getYearlySavings(): string {
    const p = this.product();
    if (!p?.priceMonthly || !p?.priceYearly) return '';
    const monthlyCost = p.priceMonthly * 12;
    const savings = monthlyCost - p.priceYearly;
    if (savings <= 0) return '';
    const pct = Math.round((savings / monthlyCost) * 100);
    return this.translate.instant('PRODUCTS.YEARLY_SAVINGS', { pct });
  }
}
