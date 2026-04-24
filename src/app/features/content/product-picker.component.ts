import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../core/models/product.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

type ProductType = 'saas' | 'physical' | 'license';

@Component({
  selector: 'app-product-picker',
  standalone: true,
  imports: [FormsModule, TranslateModule, LoadingSpinnerComponent],
  template: `
    @if (open()) {
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[85vh] flex flex-col mx-4">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-border-light">
            <h3 class="text-lg font-semibold text-text-primary">
              {{ titleKey() ? (titleKey() | translate) : ('CONTENT.PICK_PRODUCTS' | translate) }}
            </h3>
            <button
              type="button"
              (click)="handleClose()"
              class="text-text-secondary hover:text-text-primary"
              [attr.aria-label]="'CONTENT.CLOSE' | translate"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Search + count -->
          <div class="px-6 py-3 border-b border-border-light flex items-center gap-3">
            <input
              type="text"
              [(ngModel)]="searchQuery"
              (ngModelChange)="onSearchChange($event)"
              class="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              [placeholder]="'CONTENT.SEARCH_PRODUCTS' | translate"
            />
            <span class="text-xs text-text-muted whitespace-nowrap">
              {{ 'CONTENT.SELECTED_COUNT' | translate: { count: selectedOrder().length } }}
            </span>
          </div>

          <!-- Selected (ordered) -->
          @if (selectedOrder().length > 0) {
            <div class="px-6 py-3 border-b border-border-light max-h-48 overflow-y-auto">
              <p class="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
                {{ 'CONTENT.SELECTED_ORDER' | translate }}
              </p>
              <div class="flex flex-col gap-1">
                @for (productId of selectedOrder(); track productId; let i = $index) {
                  @if (productById(productId); as product) {
                    <div
                      class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-border-light"
                    >
                      <span class="text-xs text-text-muted w-5 text-right">{{ i + 1 }}.</span>
                      @if (primaryImageUrl(product); as url) {
                        <img
                          [src]="url"
                          [alt]="product.nameFr"
                          class="w-8 h-8 rounded object-cover border border-border-light flex-shrink-0"
                        />
                      } @else {
                        <div class="w-8 h-8 rounded bg-gray-200 flex-shrink-0"></div>
                      }
                      <div class="flex-1 min-w-0">
                        <p class="text-xs font-medium text-text-primary truncate">
                          {{ product.nameFr }}
                        </p>
                        <p class="text-[10px] text-text-muted truncate">{{ product.sku }}</p>
                      </div>
                      <div class="flex items-center gap-1">
                        <button
                          type="button"
                          (click)="moveSelected(i, 'up')"
                          [disabled]="i === 0"
                          class="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
                          [title]="'CONTENT.MOVE_UP' | translate"
                        >
                          <svg
                            class="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          (click)="moveSelected(i, 'down')"
                          [disabled]="i === selectedOrder().length - 1"
                          class="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
                          [title]="'CONTENT.MOVE_DOWN' | translate"
                        >
                          <svg
                            class="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          (click)="toggleProduct(product)"
                          class="p-1 rounded hover:bg-red-50 text-error"
                          [title]="'CONTENT.DELETE' | translate"
                        >
                          <svg
                            class="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  }
                }
              </div>
            </div>
          }

          <!-- Available products -->
          <div class="flex-1 overflow-y-auto px-6 py-3">
            @if (loading()) {
              <app-loading-spinner />
            } @else {
              <div class="flex flex-col gap-1">
                @for (product of filteredProducts(); track product.id) {
                  <label
                    class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent"
                    [class.border-primary]="isSelected(product.id)"
                    [class.bg-primary/5]="isSelected(product.id)"
                  >
                    <input
                      type="checkbox"
                      [checked]="isSelected(product.id)"
                      (change)="toggleProduct(product)"
                      class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    @if (primaryImageUrl(product); as url) {
                      <img
                        [src]="url"
                        [alt]="product.nameFr"
                        class="w-10 h-10 rounded object-cover border border-border-light flex-shrink-0"
                      />
                    } @else {
                      <div
                        class="w-10 h-10 rounded bg-gray-100 border border-border-light flex-shrink-0"
                      ></div>
                    }
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-text-primary truncate">
                        {{ product.nameFr }}
                      </p>
                      <p class="text-xs text-text-muted truncate">{{ product.sku }}</p>
                    </div>
                  </label>
                } @empty {
                  <div class="p-8 text-center text-sm text-text-muted">
                    {{ 'CONTENT.NO_PRODUCTS_FOUND' | translate }}
                  </div>
                }
              </div>
            }
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-3 px-6 py-4 border-t border-border-light">
            <button
              type="button"
              (click)="handleClose()"
              class="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-gray-50"
            >
              {{ 'CONTENT.CANCEL' | translate }}
            </button>
            <button
              type="button"
              (click)="handleConfirm()"
              class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium"
            >
              {{ 'CONTENT.CONFIRM' | translate }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ProductPickerComponent {
  private readonly api = inject(ApiService);

  // Inputs
  readonly productType = input<ProductType>('physical');
  readonly selectedIds = input<string[]>([]);
  readonly titleKey = input<string>('');
  readonly open = input<boolean>(false);

  // Outputs
  readonly close = output<void>();
  readonly saved = output<string[]>();

  // State
  readonly products = signal<Product[]>([]);
  readonly loading = signal<boolean>(false);
  readonly selectedOrder = signal<string[]>([]);
  searchQuery = '';
  readonly searchValue = signal<string>('');

  readonly productMap = computed(() => {
    const map = new Map<string, Product>();
    for (const p of this.products()) {
      map.set(p.id, p);
    }
    return map;
  });

  readonly filteredProducts = computed(() => {
    const query = this.searchValue().trim().toLowerCase();
    const list = this.products();
    if (!query) return list;
    return list.filter(
      (p) =>
        p.nameFr.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query),
    );
  });

  constructor() {
    // Load products when opens or productType changes
    effect(() => {
      const isOpen = this.open();
      const type = this.productType();
      if (isOpen) {
        this.loadProducts(type);
      }
    });

    // Sync selectedOrder from input when modal opens
    effect(() => {
      const isOpen = this.open();
      if (isOpen) {
        this.selectedOrder.set([...this.selectedIds()]);
        this.searchQuery = '';
        this.searchValue.set('');
      }
    });
  }

  private loadProducts(type: ProductType): void {
    this.loading.set(true);
    this.api
      .get<Product[] | { data: Product[] }>('admin/catalog/products', { productType: type })
      .subscribe({
        next: (res) => {
          const list = Array.isArray(res) ? res : (res?.data ?? []);
          this.products.set(list);
          this.loading.set(false);
        },
        error: () => {
          this.products.set([]);
          this.loading.set(false);
        },
      });
  }

  onSearchChange(value: string): void {
    this.searchValue.set(value);
  }

  isSelected(productId: string): boolean {
    return this.selectedOrder().includes(productId);
  }

  toggleProduct(product: Product): void {
    const current = this.selectedOrder();
    if (current.includes(product.id)) {
      this.selectedOrder.set(current.filter((id) => id !== product.id));
    } else {
      this.selectedOrder.set([...current, product.id]);
    }
  }

  moveSelected(index: number, direction: 'up' | 'down'): void {
    const current = [...this.selectedOrder()];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= current.length) return;
    [current[index], current[targetIndex]] = [current[targetIndex], current[index]];
    this.selectedOrder.set(current);
  }

  productById(id: string): Product | undefined {
    return this.productMap().get(id);
  }

  primaryImageUrl(product: Product): string | null {
    const primary = product.images?.find((img) => img.isPrimary);
    return primary?.imageUrl ?? product.images?.[0]?.imageUrl ?? null;
  }

  handleClose(): void {
    this.close.emit();
  }

  handleConfirm(): void {
    this.saved.emit(this.selectedOrder());
  }
}
