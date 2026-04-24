import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../core/services/api.service';
import { AdminAuthService } from '../../../core/auth/services/admin-auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Product } from '../../../core/models/product.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, FormsModule, TranslateModule, StatusBadgeComponent, ConfirmModalComponent],
  template: `
    <div style="animation: fadeInUp 0.45s ease-out both">
      <!-- Summary cards -->
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        style="animation: fadeInUp 0.45s ease-out both"
      >
        <!-- Total -->
        <div
          class="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-px"
        >
          <svg
            class="w-[18px] h-[18px] text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <div class="flex flex-col gap-0.5">
            @if (loading()) {
              <div class="h-7 w-8 animate-pulse rounded bg-gray-100"></div>
            } @else {
              <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                totalCount()
              }}</span>
            }
            <span class="text-[11px] text-text-muted leading-tight">{{
              'PRODUCTS.STAT_TOTAL' | translate
            }}</span>
          </div>
        </div>

        <!-- Available -->
        <div
          class="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-px"
        >
          <svg
            class="w-[18px] h-[18px] text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="flex flex-col gap-0.5">
            @if (loading()) {
              <div class="h-7 w-8 animate-pulse rounded bg-gray-100"></div>
            } @else {
              <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                availableCount()
              }}</span>
            }
            <span class="text-[11px] text-text-muted leading-tight">{{
              'PRODUCTS.STAT_AVAILABLE' | translate
            }}</span>
          </div>
        </div>

        <!-- Unavailable -->
        <div
          class="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-px"
        >
          <svg
            class="w-[18px] h-[18px] text-error"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <div class="flex flex-col gap-0.5">
            @if (loading()) {
              <div class="h-7 w-8 animate-pulse rounded bg-gray-100"></div>
            } @else {
              <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                unavailableCount()
              }}</span>
            }
            <span class="text-[11px] text-text-muted leading-tight">{{
              'PRODUCTS.STAT_UNAVAILABLE' | translate
            }}</span>
          </div>
        </div>

        <!-- Featured -->
        <div
          class="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-px"
        >
          <svg
            class="w-[18px] h-[18px] text-warning"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <div class="flex flex-col gap-0.5">
            @if (loading()) {
              <div class="h-7 w-8 animate-pulse rounded bg-gray-100"></div>
            } @else {
              <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                featuredCount()
              }}</span>
            }
            <span class="text-[11px] text-text-muted leading-tight">{{
              'PRODUCTS.STAT_FEATURED' | translate
            }}</span>
          </div>
        </div>
      </div>

      <!-- Toolbar: search + actions -->
      <div
        class="flex items-center justify-between gap-4 mb-5"
        style="animation: fadeInUp 0.45s ease-out 0.08s both"
      >
        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            [placeholder]="'PRODUCTS.SEARCH_PLACEHOLDER' | translate"
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
            class="pl-9 pr-4 py-2 rounded-lg border border-border-light bg-surface text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-72 transition-all"
          />
        </div>

        <div class="flex items-center gap-3">
          @if (!fixedType) {
            <select
              [(ngModel)]="typeFilter"
              (change)="loadProducts()"
              class="px-3 py-2 rounded-lg border border-border-light bg-surface text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              <option value="">{{ 'PRODUCTS.ALL_TYPES' | translate }}</option>
              <option value="saas">{{ 'PRODUCTS.SAAS' | translate }}</option>
              <option value="physical">{{ 'PRODUCTS.PHYSICAL' | translate }}</option>
              <option value="license">{{ 'PRODUCTS.LICENSE' | translate }}</option>
            </select>
          }
          @if (auth.isSuperAdmin()) {
            <a
              [routerLink]="newProductLink"
              class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              {{ newProductLabelKey | translate }}
            </a>
          }
        </div>
      </div>

      <!-- Bulk action bar -->
      @if (selectedIds().size > 0 && auth.isSuperAdmin()) {
        <div
          class="flex items-center justify-between gap-4 mb-3 px-4 py-3 rounded-xl border border-primary/30 bg-primary-light/40 shadow-sm"
          style="animation: fadeInUp 0.3s ease-out both"
        >
          <span class="text-sm font-medium text-text-primary">
            {{ 'PRODUCTS.SELECTED_COUNT' | translate: { count: selectedIds().size } }}
          </span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="clearSelection()"
              class="px-3 py-1.5 text-[13px] font-medium text-text-secondary bg-surface border border-border rounded-lg hover:bg-background transition-colors cursor-pointer"
            >
              {{ 'PRODUCTS.DESELECT_ALL' | translate }}
            </button>
            <button
              type="button"
              (click)="openBulkDeleteModal()"
              [disabled]="bulkDeleting()"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white bg-error rounded-lg hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              {{ 'PRODUCTS.DELETE_SELECTED' | translate }}
            </button>
          </div>
        </div>
      }

      <!-- Table -->
      <div
        class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
        style="animation: fadeInUp 0.45s ease-out 0.14s both"
      >
        @if (loading()) {
          <!-- Skeleton loading -->
          <div class="divide-y divide-border-light">
            @for (i of skeletonRows; track i) {
              <div class="flex items-center gap-4 px-6 py-4">
                <div class="w-10 h-10 rounded-lg animate-pulse bg-gray-100 shrink-0"></div>
                <div class="flex-1 flex flex-col gap-2">
                  <div class="h-4 w-40 animate-pulse rounded bg-gray-100"></div>
                  <div class="h-3 w-24 animate-pulse rounded bg-gray-100"></div>
                </div>
                <div class="h-4 w-20 animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-16 animate-pulse rounded bg-gray-100"></div>
                <div class="h-5 w-16 animate-pulse rounded-full bg-gray-100"></div>
                <div class="h-5 w-16 animate-pulse rounded-full bg-gray-100"></div>
              </div>
            }
          </div>
        } @else if (filteredProducts().length === 0) {
          <!-- Empty state -->
          <div class="flex flex-col items-center justify-center gap-3 py-16">
            <div class="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
              <svg
                class="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <div class="flex flex-col items-center gap-1 text-center">
              <span class="text-sm font-medium text-text-secondary">{{
                'PRODUCTS.NO_PRODUCTS' | translate
              }}</span>
              <span class="text-xs text-text-muted">{{
                'PRODUCTS.NO_PRODUCTS_DESC' | translate
              }}</span>
            </div>
            @if (auth.isSuperAdmin()) {
              <a
                [routerLink]="newProductLink"
                class="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                {{ newProductLabelKey | translate }}
              </a>
            }
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  @if (auth.isSuperAdmin()) {
                    <th class="px-4 py-3 w-10">
                      <input
                        type="checkbox"
                        class="w-4 h-4 rounded border-border cursor-pointer accent-primary"
                        [checked]="allSelected()"
                        [indeterminate]="someSelected()"
                        (change)="toggleSelectAll()"
                      />
                    </th>
                  }
                  <th
                    class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.PRODUCT' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.SKU' | translate }}
                  </th>
                  @if (!fixedType) {
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'PRODUCTS.TYPE' | translate }}
                    </th>
                  }
                  <th
                    class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.PRICE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (product of filteredProducts(); track product.id) {
                  <tr class="group hover:bg-background transition-colors">
                    @if (auth.isSuperAdmin()) {
                      <td class="px-4 py-4 w-10">
                        <input
                          type="checkbox"
                          class="w-4 h-4 rounded border-border cursor-pointer accent-primary"
                          [checked]="selectedIds().has(product.id)"
                          (change)="toggleSelect(product.id)"
                          (click)="$event.stopPropagation()"
                        />
                      </td>
                    }
                    <td class="px-6 py-4">
                      <a
                        [routerLink]="[basePath, product.id]"
                        class="flex items-center gap-3"
                        style="text-decoration: none"
                      >
                        @if (product.images?.[0]?.imageUrl) {
                          <img
                            [src]="product.images[0].imageUrl"
                            [alt]="product.nameFr"
                            class="w-10 h-10 rounded-lg object-cover border border-border-light shrink-0"
                          />
                        } @else {
                          <div
                            class="w-10 h-10 rounded-lg bg-border-light flex items-center justify-center shrink-0"
                          >
                            <svg
                              class="w-4 h-4 text-text-muted/40"
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
                        }
                        <div class="min-w-0">
                          <span
                            class="text-sm font-medium text-text-primary group-hover:text-primary transition-colors truncate block"
                          >
                            {{ product.nameFr }}
                          </span>
                          <span class="text-xs text-text-muted truncate block">{{
                            product.nameEn
                          }}</span>
                        </div>
                      </a>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="text-xs text-text-secondary font-mono bg-background px-2 py-0.5 rounded"
                      >
                        {{ product.sku }}
                      </span>
                    </td>
                    @if (!fixedType) {
                      <td class="px-6 py-4">
                        <span
                          class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          [class]="getTypeBadgeClasses(product.productType)"
                        >
                          <span
                            class="w-1.5 h-1.5 rounded-full"
                            [class]="getTypeDotClass(product.productType)"
                          ></span>
                          {{ product.productType }}
                        </span>
                      </td>
                    }
                    <td class="px-6 py-4">
                      <span class="text-sm font-semibold text-text-primary">{{
                        getPrice(product)
                      }}</span>
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
                      <div class="flex items-center justify-end gap-1">
                        <a
                          [routerLink]="[basePath, product.id]"
                          class="p-2 text-text-muted hover:text-primary rounded-lg hover:bg-primary-light transition-colors"
                          [title]="'PRODUCTS.VIEW' | translate"
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
                              stroke-width="1.5"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </a>
                        @if (auth.isSuperAdmin()) {
                          <a
                            [routerLink]="[basePath, product.id, 'edit']"
                            class="p-2 text-text-muted hover:text-primary rounded-lg hover:bg-primary-light transition-colors"
                            [title]="'PRODUCTS.EDIT' | translate"
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
                                stroke-width="1.5"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                              />
                            </svg>
                          </a>
                          <button
                            (click)="confirmDelete(product)"
                            class="p-2 text-text-muted hover:text-error rounded-lg hover:bg-error-light transition-colors border-none bg-transparent cursor-pointer"
                            [title]="'PRODUCTS.DELETE' | translate"
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
                                stroke-width="1.5"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        }
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Results count -->
          <div class="px-6 py-3 border-t border-border-light">
            <span class="text-xs text-text-muted">
              {{ filteredProducts().length }} {{ 'PRODUCTS.RESULTS' | translate }}
            </span>
          </div>
        }
      </div>
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

    <app-confirm-modal
      [open]="showBulkDeleteModal()"
      [title]="'PRODUCTS.BULK_DELETE_CONFIRM' | translate"
      [message]="'PRODUCTS.SELECTED_COUNT' | translate: { count: selectedIds().size }"
      [confirmLabel]="'PRODUCTS.DELETE_SELECTED' | translate"
      variant="danger"
      (confirm)="deleteSelected()"
      (cancel)="showBulkDeleteModal.set(false)"
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
  selectedIds = signal<Set<string>>(new Set<string>());
  bulkDeleting = signal<boolean>(false);
  showBulkDeleteModal = signal<boolean>(false);

  titleKey = 'PRODUCTS.TITLE';
  subtitleKey = 'PRODUCTS.SUBTITLE';
  newProductLabelKey = 'PRODUCTS.NEW_PRODUCT';
  newProductLink = '/products/new';
  basePath = '/products';

  readonly skeletonRows = Array.from({ length: 6 }, (_, i) => i);

  totalCount = computed(() => this.products().length);
  availableCount = computed(() => this.products().filter((p) => p.isAvailable).length);
  unavailableCount = computed(() => this.products().filter((p) => !p.isAvailable).length);
  featuredCount = computed(() => this.products().filter((p) => p.isFeatured).length);

  allSelected = computed<boolean>(() => {
    const filtered = this.filteredProducts();
    if (filtered.length === 0) return false;
    const selected = this.selectedIds();
    return filtered.every((p) => selected.has(p.id));
  });

  someSelected = computed<boolean>(() => {
    const filtered = this.filteredProducts();
    const selected = this.selectedIds();
    const selectedInFiltered = filtered.filter((p) => selected.has(p.id)).length;
    return selectedInFiltered > 0 && selectedInFiltered < filtered.length;
  });

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
    const filtered = this.filteredProducts();
    const allCurrentlySelected = this.allSelected();
    this.selectedIds.update((current) => {
      const next = new Set(current);
      if (allCurrentlySelected) {
        for (const p of filtered) next.delete(p.id);
      } else {
        for (const p of filtered) next.add(p.id);
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
