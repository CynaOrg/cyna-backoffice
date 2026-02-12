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
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-text-primary">{{ 'CATEGORIES.TITLE' | translate }}</h1>
          <p class="text-sm text-text-secondary mt-1">{{ 'CATEGORIES.SUBTITLE' | translate }}</p>
        </div>
        @if (auth.isSuperAdmin()) {
          <button
            (click)="openForm()"
            class="px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover"
          >
            {{ 'CATEGORIES.NEW_CATEGORY' | translate }}
          </button>
        }
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
                @for (cat of categories(); track cat.id) {
                  <tr class="hover:bg-gray-50/50">
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        @if (cat.imageUrl) {
                          <img [src]="cat.imageUrl" class="w-8 h-8 rounded object-cover" />
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
          <div class="relative bg-white rounded-xl shadow-xl p-6 max-w-lg w-full mx-4">
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
                  class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-text-secondary mb-1">{{
                  'CATEGORIES.IMAGE_URL' | translate
                }}</label>
                <input
                  [(ngModel)]="formData.imageUrl"
                  class="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
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
                  <label class="flex items-center gap-2 text-sm"
                    ><input type="checkbox" [(ngModel)]="formData.isActive" class="rounded" />
                    {{ 'CATEGORIES.ACTIVE' | translate }}</label
                  >
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
  loading = signal(true);
  showForm = signal(false);
  showDeleteModal = signal(false);
  saving = signal(false);
  editingCategory = signal<Category | null>(null);
  categoryToDelete = signal<Category | null>(null);

  formData = { nameFr: '', nameEn: '', slug: '', imageUrl: '', displayOrder: 0, isActive: true };

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading.set(true);
    this.api.get<any>('admin/catalog/categories').subscribe({
      next: (res) => {
        // Handle both array and wrapped formats
        const cats = Array.isArray(res) ? res : res?.data || res || [];
        this.categories.set(cats);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('CATEGORIES.LOAD_FAILED'));
        this.loading.set(false);
      },
    });
  }

  openForm(cat?: Category) {
    if (cat) {
      this.editingCategory.set(cat);
      this.formData = {
        nameFr: cat.nameFr,
        nameEn: cat.nameEn,
        slug: cat.slug,
        imageUrl: cat.imageUrl || '',
        displayOrder: cat.displayOrder,
        isActive: cat.isActive,
      };
    } else {
      this.editingCategory.set(null);
      this.formData = {
        nameFr: '',
        nameEn: '',
        slug: '',
        imageUrl: '',
        displayOrder: 0,
        isActive: true,
      };
    }
    this.showForm.set(true);
  }

  saveCategory() {
    this.saving.set(true);
    const editing = this.editingCategory();
    const request = editing
      ? this.api.patch<any, Category>(`admin/catalog/categories/${editing.id}`, this.formData)
      : this.api.post<any, Category>('admin/catalog/categories', this.formData);

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
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('CATEGORIES.SAVE_FAILED'),
        );
        this.saving.set(false);
      },
    });
  }

  confirmDelete(cat: Category) {
    this.categoryToDelete.set(cat);
    this.showDeleteModal.set(true);
  }

  deleteCategory() {
    const cat = this.categoryToDelete();
    if (!cat) return;
    this.api.delete(`admin/catalog/categories/${cat.id}`).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('CATEGORIES.DELETED'));
        this.categories.update((c) => c.filter((x) => x.id !== cat.id));
        this.showDeleteModal.set(false);
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('CATEGORIES.DELETE_FAILED'),
        );
        this.showDeleteModal.set(false);
      },
    });
  }
}
