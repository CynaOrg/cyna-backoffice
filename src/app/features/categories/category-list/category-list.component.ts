import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Category } from '../../../core/models/product.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

interface CategoryFormData {
  nameFr: string;
  nameEn: string;
  slug: string;
  descriptionFr: string;
  descriptionEn: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
  ],
  template: `
    <div>
      @if (auth.isSuperAdmin()) {
        <div class="flex justify-end mb-6">
          <button
            (click)="openForm()"
            class="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover"
          >
            {{ 'CATEGORIES.NEW_CATEGORY' | translate }}
          </button>
        </div>
      }

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
                    {{ 'CATEGORIES.NAME' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CATEGORIES.SLUG' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CATEGORIES.ORDER' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CATEGORIES.STATUS' | translate }}
                  </th>
                  @if (auth.isSuperAdmin()) {
                    <th
                      class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      {{ 'CATEGORIES.ACTIONS' | translate }}
                    </th>
                  }
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (cat of categories(); track cat.id; let i = $index) {
                  <tr class="hover:bg-gray-50/50">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        @if (cat.imageUrl) {
                          <img
                            [src]="cat.imageUrl"
                            [alt]="cat.nameFr"
                            class="w-8 h-8 rounded object-cover"
                          />
                        }
                        <div>
                          <p class="text-sm font-medium text-text-primary">{{ cat.nameFr }}</p>
                          <p class="text-xs text-text-muted">{{ cat.nameEn }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary font-mono">{{ cat.slug }}</td>
                    <td class="px-6 py-4 text-sm text-text-secondary">{{ cat.displayOrder }}</td>
                    <td class="px-6 py-4">
                      <app-status-badge [status]="cat.isActive ? 'active' : 'inactive'" />
                    </td>
                    @if (auth.isSuperAdmin()) {
                      <td class="px-6 py-4 text-right">
                        <div class="flex items-center justify-end gap-2">
                          <div class="flex flex-col gap-0.5 mr-2">
                            <button
                              type="button"
                              (click)="moveCategory(i, 'up')"
                              [disabled]="i === 0 || reordering()"
                              class="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
                              [title]="'CATEGORIES.MOVE_UP' | translate"
                              [attr.aria-label]="'CATEGORIES.MOVE_UP' | translate"
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
                                  d="M5 15l7-7 7 7"
                                />
                              </svg>
                            </button>
                            <button
                              type="button"
                              (click)="moveCategory(i, 'down')"
                              [disabled]="i === categories().length - 1 || reordering()"
                              class="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
                              [title]="'CATEGORIES.MOVE_DOWN' | translate"
                              [attr.aria-label]="'CATEGORIES.MOVE_DOWN' | translate"
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
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          </div>
                          <button
                            (click)="openForm(cat)"
                            class="text-sm text-primary hover:text-primary-hover"
                          >
                            {{ 'CATEGORIES.EDIT' | translate }}
                          </button>
                          <button
                            (click)="confirmDelete(cat)"
                            class="text-sm text-error hover:text-red-700"
                          >
                            {{ 'CATEGORIES.DELETE' | translate }}
                          </button>
                        </div>
                      </td>
                    }
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'CATEGORIES.NO_CATEGORIES' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- Inline Form Modal -->
      @if (showForm()) {
        <div class="fixed inset-0 z-50 flex items-center justify-center">
          <div class="absolute inset-0 bg-black/40" (click)="showForm.set(false)"></div>
          <div
            class="relative bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 class="text-lg font-semibold mb-4">
              {{
                editingCategory()
                  ? ('CATEGORIES.EDIT_TITLE' | translate)
                  : ('CATEGORIES.NEW_TITLE' | translate)
              }}
            </h3>
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1">{{
                    'CATEGORIES.NAME_FR' | translate
                  }}</label>
                  <input
                    [(ngModel)]="formData.nameFr"
                    class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1">{{
                    'CATEGORIES.NAME_EN' | translate
                  }}</label>
                  <input
                    [(ngModel)]="formData.nameEn"
                    class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">{{
                  'CATEGORIES.SLUG' | translate
                }}</label>
                <input
                  [(ngModel)]="formData.slug"
                  class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono"
                />
              </div>
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1">{{
                    'CATEGORIES.DESCRIPTION_FR' | translate
                  }}</label>
                  <textarea
                    [(ngModel)]="formData.descriptionFr"
                    rows="3"
                    class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1">{{
                    'CATEGORIES.DESCRIPTION_EN' | translate
                  }}</label>
                  <textarea
                    [(ngModel)]="formData.descriptionEn"
                    rows="3"
                    class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  ></textarea>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">{{
                  'CATEGORIES.IMAGE_URL' | translate
                }}</label>
                <input
                  [(ngModel)]="formData.imageUrl"
                  type="url"
                  placeholder="https://..."
                  class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                @if (formData.imageUrl) {
                  <div class="mt-3 flex items-center gap-3">
                    <img
                      [src]="formData.imageUrl"
                      [alt]="'CATEGORIES.IMAGE_PREVIEW' | translate"
                      class="w-16 h-16 rounded-lg object-cover border border-border-light"
                    />
                    <span class="text-xs text-text-muted">{{
                      'CATEGORIES.IMAGE_PREVIEW' | translate
                    }}</span>
                  </div>
                }
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-secondary mb-1">{{
                    'CATEGORIES.DISPLAY_ORDER' | translate
                  }}</label>
                  <input
                    type="number"
                    [(ngModel)]="formData.displayOrder"
                    class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div class="flex items-end pb-1">
                  <label class="flex items-center gap-2 text-sm">
                    <input type="checkbox" [(ngModel)]="formData.isActive" class="rounded" />
                    {{ 'CATEGORIES.ACTIVE' | translate }}
                  </label>
                </div>
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button
                (click)="showForm.set(false)"
                class="px-4 py-2 text-sm border border-border rounded-lg hover:bg-gray-50"
              >
                {{ 'CATEGORIES.CANCEL' | translate }}
              </button>
              <button
                (click)="saveCategory()"
                [disabled]="saving()"
                class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover disabled:opacity-60"
              >
                {{ saving() ? ('CATEGORIES.SAVING' | translate) : ('CATEGORIES.SAVE' | translate) }}
              </button>
            </div>
          </div>
        </div>
      }
    </div>

    <app-confirm-modal
      [open]="showDeleteModal()"
      [title]="'CATEGORIES.DELETE_TITLE' | translate"
      [message]="'CATEGORIES.DELETE_CONFIRM' | translate"
      [confirmLabel]="'CATEGORIES.DELETE_BTN' | translate"
      variant="danger"
      (confirm)="deleteCategory()"
      (cancel)="showDeleteModal.set(false)"
    />
  `,
})
export class CategoryListComponent implements OnInit {
  private readonly api = inject(ApiService);
  readonly auth = inject(AdminAuthService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);

  categories = signal<Category[]>([]);
  loading = signal<boolean>(true);
  showForm = signal<boolean>(false);
  showDeleteModal = signal<boolean>(false);
  saving = signal<boolean>(false);
  reordering = signal<boolean>(false);
  editingCategory = signal<Category | null>(null);
  categoryToDelete = signal<Category | null>(null);

  formData: CategoryFormData = this.emptyForm();

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading.set(true);
    this.api.get<Category[]>('admin/catalog/categories').subscribe({
      next: (res) => {
        const cats = Array.isArray(res) ? res : [];
        this.categories.set([...cats].sort((a, b) => a.displayOrder - b.displayOrder));
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('CATEGORIES.LOAD_FAILED'));
        this.loading.set(false);
      },
    });
  }

  openForm(cat?: Category): void {
    if (cat) {
      this.editingCategory.set(cat);
      this.formData = {
        nameFr: cat.nameFr,
        nameEn: cat.nameEn,
        slug: cat.slug,
        descriptionFr: cat.descriptionFr ?? '',
        descriptionEn: cat.descriptionEn ?? '',
        imageUrl: cat.imageUrl ?? '',
        displayOrder: cat.displayOrder,
        isActive: cat.isActive,
      };
    } else {
      this.editingCategory.set(null);
      this.formData = this.emptyForm();
    }
    this.showForm.set(true);
  }

  saveCategory(): void {
    // CAT-1: client-side validation. Block submit + toast when name/slug are invalid.
    if (!this.isFormValid(this.formData)) {
      this.notifications.error(this.translate.instant('CATEGORIES.VALIDATION_FAILED'));
      return;
    }

    this.saving.set(true);
    const editing = this.editingCategory();
    const payload = this.buildPayload(this.formData, editing !== null);

    const request = editing
      ? this.api.patch<Partial<Category>, Category>(
          `admin/catalog/categories/${editing.id}`,
          payload,
        )
      : this.api.post<Partial<Category>, Category>('admin/catalog/categories', payload);

    request.subscribe({
      next: () => {
        this.notifications.success(
          editing
            ? this.translate.instant('CATEGORIES.UPDATED')
            : this.translate.instant('CATEGORIES.CREATED'),
        );
        this.showForm.set(false);
        this.saving.set(false);
        this.loadCategories();
      },
      error: (err: { error?: { message?: string } }) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('CATEGORIES.SAVE_FAILED'),
        );
        this.saving.set(false);
      },
    });
  }

  confirmDelete(cat: Category): void {
    this.categoryToDelete.set(cat);
    this.showDeleteModal.set(true);
  }

  deleteCategory(): void {
    const cat = this.categoryToDelete();
    if (!cat) return;
    this.api.delete<void>(`admin/catalog/categories/${cat.id}`).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('CATEGORIES.DELETED'));
        this.categories.update((list) => list.filter((x) => x.id !== cat.id));
        this.showDeleteModal.set(false);
      },
      error: (err: { error?: { message?: string } }) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('CATEGORIES.DELETE_FAILED'),
        );
        this.showDeleteModal.set(false);
      },
    });
  }

  moveCategory(index: number, direction: 'up' | 'down'): void {
    if (this.reordering()) return;
    const previous = this.categories();
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= previous.length) return;

    // Optimistic update (swap + re-number displayOrder locally)
    const next = [...previous];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    const reindexed = next.map((cat, i) => ({ ...cat, displayOrder: i }));
    this.categories.set(reindexed);

    const categoryIds = reindexed.map((c) => c.id);
    this.reordering.set(true);
    this.api
      .patch<{ categoryIds: string[] }, Category[]>('admin/catalog/categories/reorder', {
        categoryIds,
      })
      .subscribe({
        next: () => {
          this.reordering.set(false);
        },
        error: (err: { error?: { message?: string } }) => {
          // Rollback
          this.categories.set(previous);
          this.reordering.set(false);
          this.notifications.error(
            err.error?.message || this.translate.instant('CATEGORIES.REORDER_FAILED'),
          );
        },
      });
  }

  private emptyForm(): CategoryFormData {
    return {
      nameFr: '',
      nameEn: '',
      slug: '',
      descriptionFr: '',
      descriptionEn: '',
      imageUrl: '',
      displayOrder: 0,
      isActive: true,
    };
  }

  private isFormValid(data: CategoryFormData): boolean {
    if (!data.nameFr?.trim() || !data.nameEn?.trim()) return false;
    const slug = data.slug?.trim() ?? '';
    // RFC: lowercase letters, digits, hyphens; must start/end with alphanumeric.
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  }

  private buildPayload(data: CategoryFormData, isUpdate: boolean): Partial<Category> {
    const payload: Partial<Category> = {
      nameFr: data.nameFr.trim(),
      nameEn: data.nameEn.trim(),
      slug: data.slug.trim(),
      displayOrder: data.displayOrder,
      isActive: data.isActive,
    };

    // CAT-3: send `null` (not empty string) when admin clears description on update,
    // so the backend properly persists the cleared value. On create, omit the key.
    const trimmedFr = data.descriptionFr?.trim() ?? '';
    const trimmedEn = data.descriptionEn?.trim() ?? '';
    if (trimmedFr) {
      payload.descriptionFr = trimmedFr;
    } else if (isUpdate) {
      (payload as Record<string, unknown>)['descriptionFr'] = null;
    }
    if (trimmedEn) {
      payload.descriptionEn = trimmedEn;
    } else if (isUpdate) {
      (payload as Record<string, unknown>)['descriptionEn'] = null;
    }

    // imageUrl must remain a valid URL or be omitted (avoid @IsUrl() failure on '').
    if (data.imageUrl?.trim()) {
      payload.imageUrl = data.imageUrl.trim();
    } else if (isUpdate) {
      (payload as Record<string, unknown>)['imageUrl'] = null;
    }
    return payload;
  }
}
