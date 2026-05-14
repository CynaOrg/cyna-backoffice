import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product, Category } from '../../../core/models/product.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { TableSkeletonComponent } from '../../../shared/components/table-skeleton/table-skeleton.component';
import { StatCardSkeletonComponent } from '../../../shared/components/stat-card-skeleton/stat-card-skeleton.component';

interface AdminProductListResponse {
  data: Product[];
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    TranslateModule,
    StatusBadgeComponent,
    ConfirmModalComponent,
    PaginationComponent,
    TableSkeletonComponent,
    StatCardSkeletonComponent,
  ],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  private readonly api = inject(ApiService);
  readonly auth = inject(AdminAuthService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);
  private readonly route = inject(ActivatedRoute);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);
  searchQuery = '';
  typeFilter = '';
  categoryFilter = '';
  statusFilter: '' | 'active' | 'inactive' = '';
  priceMin: number | null = null;
  priceMax: number | null = null;
  fixedType = '';
  showDeleteModal = signal(false);
  productToDelete = signal<Product | null>(null);
  selectedIds = signal<Set<string>>(new Set<string>());
  bulkDeleting = signal<boolean>(false);
  showBulkDeleteModal = signal<boolean>(false);

  // Pagination
  page = signal<number>(1);
  limit = signal<number>(20);
  total = signal<number>(0);

  titleKey = 'PRODUCTS.TITLE';
  subtitleKey = 'PRODUCTS.SUBTITLE';
  newProductLabelKey = 'PRODUCTS.NEW_PRODUCT';
  newProductLink = '/products/new';
  basePath = '/products';

  readonly skeletonRows = Array.from({ length: 6 }, (_, i) => i);

  // Counts come from total + currently displayed page (only used for cosmetic header chips).
  totalCount = computed(() => this.total());
  availableCount = computed(() => this.products().filter((p) => p.isAvailable).length);
  unavailableCount = computed(() => this.products().filter((p) => !p.isAvailable).length);
  featuredCount = computed(() => this.products().filter((p) => p.isFeatured).length);

  emptyTitleKey = computed<string>(() => {
    switch (this.fixedType) {
      case 'saas':
        return 'PRODUCTS.EMPTY_SAAS';
      case 'license':
        return 'PRODUCTS.EMPTY_LICENSE';
      case 'physical':
        return 'PRODUCTS.EMPTY_PHYSICAL';
      default:
        return 'PRODUCTS.NO_PRODUCTS';
    }
  });

  // PROD-11: build the delete-confirm message via translateParams so {{name}}
  // is interpolated with the product's name instead of being shown literally.
  deleteMessage = computed<string>(() => {
    const product = this.productToDelete();
    if (!product) return this.translate.instant('PRODUCTS.DELETE_WARNING');
    const name = product.nameFr || product.nameEn || product.sku || '';
    return this.translate.instant('PRODUCTS.DELETE_CONFIRM', { name });
  });

  allSelected = computed<boolean>(() => {
    const list = this.products();
    if (list.length === 0) return false;
    const selected = this.selectedIds();
    return list.every((p) => selected.has(p.id));
  });

  someSelected = computed<boolean>(() => {
    const list = this.products();
    const selected = this.selectedIds();
    const selectedInList = list.filter((p) => selected.has(p.id)).length;
    return selectedInList > 0 && selectedInList < list.length;
  });

  // PROD-16: properly typed timeout handle (no `any`).
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;
  private routerSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.applyRouteData();
    this.loadCategories();
    this.loadProducts();

    // PROD-3: re-fetch on route changes via this component's own ActivatedRoute
    // data stream (only fires when the route data for this component instance
    // changes — never on unrelated navigations elsewhere in the app).
    this.routerSubscription = this.route.data.subscribe(() => {
      const previousType = this.fixedType;
      this.applyRouteData();
      if (previousType !== this.fixedType) {
        this.page.set(1);
        this.resetFiltersState();
        this.loadProducts();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.searchTimeout !== null) {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
    this.routerSubscription?.unsubscribe();
  }

  private applyRouteData(): void {
    const data = this.route.snapshot.data;
    if (data['productType']) {
      this.fixedType = data['productType'];
      this.typeFilter = this.fixedType;
    } else {
      this.fixedType = '';
    }
    if (data['titleKey']) this.titleKey = data['titleKey'];
    if (data['subtitleKey']) this.subtitleKey = data['subtitleKey'];
    if (data['newLabelKey']) this.newProductLabelKey = data['newLabelKey'];
    if (data['basePath']) {
      this.basePath = data['basePath'];
      this.newProductLink = data['basePath'] + '/new';
    }
  }

  private loadCategories(): void {
    this.api.get<Category[]>('admin/catalog/categories').subscribe({
      next: (res) => {
        const cats = Array.isArray(res) ? res : [];
        this.categories.set(cats);
      },
    });
  }

  loadProducts(): void {
    this.loading.set(true);
    const params: Record<string, string | number | boolean> = {
      page: this.page(),
      limit: this.limit(),
    };
    if (this.typeFilter) params['productType'] = this.typeFilter;
    if (this.categoryFilter) params['categorySlug'] = this.categoryFilter;
    if (this.statusFilter === 'active') params['isAvailable'] = true;
    if (this.statusFilter === 'inactive') params['isAvailable'] = false;
    if (this.priceMin !== null && !Number.isNaN(this.priceMin)) params['minPrice'] = this.priceMin;
    if (this.priceMax !== null && !Number.isNaN(this.priceMax)) params['maxPrice'] = this.priceMax;
    if (this.searchQuery.trim()) params['search'] = this.searchQuery.trim();

    // ApiService.get<T>() unwraps the outer { data: T, meta } envelope, so when the
    // backend returns a paginated response { data: Product[], total, page, limit }, we get
    // that object directly here. Plain arrays are also tolerated for legacy endpoints.
    this.api.get<AdminProductListResponse | Product[]>('admin/catalog/products', params).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.products.set(res);
          this.total.set(res.length);
        } else if (Array.isArray(res?.data)) {
          this.products.set(res.data);
          this.total.set(res.total ?? res.data.length);
        } else {
          this.products.set([]);
          this.total.set(0);
        }
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('PRODUCTS.LOAD_ERROR'));
        this.loading.set(false);
      },
    });
  }

  onSearch(): void {
    if (this.searchTimeout !== null) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.page.set(1);
      this.loadProducts();
    }, 300);
  }

  onFilterChange(): void {
    this.page.set(1);
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.loadProducts();
  }

  resetFilters(): void {
    this.resetFiltersState();
    this.loadProducts();
  }

  private resetFiltersState(): void {
    this.searchQuery = '';
    this.categoryFilter = '';
    this.statusFilter = '';
    this.priceMin = null;
    this.priceMax = null;
    if (!this.fixedType) this.typeFilter = '';
    this.page.set(1);
  }

  getPrice(product: Product): string {
    const fmt = (v: number): string =>
      new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(v);
    if (product.priceMonthly) return `${fmt(product.priceMonthly)}/mo`;
    if (product.priceYearly) return `${fmt(product.priceYearly)}/yr`;
    if (product.priceUnit) return fmt(product.priceUnit);
    return this.translate.instant('PRODUCTS.NA');
  }

  getTypeBadgeClasses(type: string): string {
    switch (type?.toLowerCase()) {
      case 'saas':
        return 'bg-info-light text-info';
      case 'physical':
        return 'bg-warning-light text-warning';
      case 'license':
        return 'bg-primary-light text-primary';
      default:
        return 'bg-gray-100 text-text-secondary';
    }
  }

  getTypeDotClass(type: string): string {
    switch (type?.toLowerCase()) {
      case 'saas':
        return 'bg-info';
      case 'physical':
        return 'bg-warning';
      case 'license':
        return 'bg-primary';
      default:
        return 'bg-text-muted';
    }
  }

  confirmDelete(product: Product): void {
    this.productToDelete.set(product);
    this.showDeleteModal.set(true);
  }

  deleteProduct(): void {
    const product = this.productToDelete();
    if (!product) return;
    this.api.delete(`admin/catalog/products/${product.id}`).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('PRODUCTS.DELETED'));
        this.products.update((list) => list.filter((p) => p.id !== product.id));
        this.total.update((t) => Math.max(0, t - 1));
        this.showDeleteModal.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('PRODUCTS.DELETE_ERROR'));
        this.showDeleteModal.set(false);
      },
    });
  }

  toggleSelect(productId: string): void {
    this.selectedIds.update((current) => {
      const next = new Set(current);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }

  toggleSelectAll(): void {
    const list = this.products();
    const allCurrentlySelected = this.allSelected();
    this.selectedIds.update((current) => {
      const next = new Set(current);
      if (allCurrentlySelected) {
        for (const p of list) next.delete(p.id);
      } else {
        for (const p of list) next.add(p.id);
      }
      return next;
    });
  }

  clearSelection(): void {
    this.selectedIds.set(new Set<string>());
  }

  openBulkDeleteModal(): void {
    if (this.selectedIds().size === 0) return;
    this.showBulkDeleteModal.set(true);
  }

  deleteSelected(): void {
    const ids = Array.from(this.selectedIds());
    if (ids.length === 0) {
      this.showBulkDeleteModal.set(false);
      return;
    }

    this.bulkDeleting.set(true);
    this.api
      .post<
        { productIds: string[] },
        { deletedCount: number; failedIds: string[] }
      >('admin/catalog/products/bulk-delete', { productIds: ids })
      .subscribe({
        next: (res) => {
          const deletedCount = res?.deletedCount ?? 0;
          const failedIds = res?.failedIds ?? [];

          this.notifications.success(
            this.translate.instant('PRODUCTS.BULK_DELETE_SUCCESS', { count: deletedCount }),
          );

          if (failedIds.length > 0) {
            this.notifications.warning(
              this.translate.instant('PRODUCTS.BULK_DELETE_PARTIAL', {
                count: failedIds.length,
              }),
            );
          }

          this.showBulkDeleteModal.set(false);
          this.clearSelection();
          this.bulkDeleting.set(false);
          this.loadProducts();
        },
        error: () => {
          this.notifications.error(this.translate.instant('PRODUCTS.BULK_DELETE_FAILED'));
          this.showBulkDeleteModal.set(false);
          this.bulkDeleting.set(false);
        },
      });
  }
}
