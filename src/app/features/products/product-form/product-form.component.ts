import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ImageService } from '../../../core/services/image.service';
import { Product, ProductImage, Category } from '../../../core/models/product.model';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslateModule,
    ImageUploadComponent,
    ConfirmModalComponent,
  ],
  template: `
    @if (loadingProduct()) {
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
            <div class="h-9 w-28 animate-pulse rounded-lg bg-gray-100"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div class="lg:col-span-2 space-y-5">
            @for (i of [0, 1, 2]; track i) {
              <div class="rounded-xl border border-border-light bg-surface p-6">
                <div class="h-5 w-32 animate-pulse rounded bg-gray-100 mb-5"></div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="h-10 animate-pulse rounded-lg bg-gray-100"></div>
                  <div class="h-10 animate-pulse rounded-lg bg-gray-100"></div>
                </div>
              </div>
            }
          </div>
          <div class="space-y-5">
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-28 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-3">
                <div class="h-10 animate-pulse rounded-lg bg-gray-100"></div>
                <div class="h-10 animate-pulse rounded-lg bg-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div style="animation: fadeInUp 0.45s ease-out both">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <a
              [routerLink]="isEdit() ? [basePath, productId] : basePath"
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
              <h1 class="text-xl font-bold text-text-primary truncate !m-0">
                {{ isEdit() ? ('PRODUCTS.EDIT' | translate) : (newTitleKey | translate) }}
              </h1>
              @if (isEdit()) {
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="text-xs text-text-muted font-mono">{{
                    form.get('sku')?.value
                  }}</span>
                  <span class="text-text-muted/30 text-xs">|</span>
                  <span class="text-xs text-text-muted">{{ form.get('productType')?.value }}</span>
                </div>
              }
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a
              [routerLink]="isEdit() ? [basePath, productId] : basePath"
              class="inline-flex items-center px-4 py-2 border border-border-light text-text-muted text-sm font-medium rounded-lg hover:bg-background transition-colors"
              style="text-decoration: none"
            >
              {{ 'PRODUCTS.CANCEL' | translate }}
            </a>
            <button
              (click)="onSubmit()"
              [disabled]="saving()"
              class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-60 border-0 cursor-pointer"
            >
              @if (saving()) {
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                {{ 'PRODUCTS.SAVING' | translate }}
              } @else {
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {{ isEdit() ? ('PRODUCTS.UPDATE' | translate) : ('PRODUCTS.CREATE' | translate) }}
              }
            </button>
          </div>
        </div>

        <!-- Content -->
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="space-y-5"
          style="animation: fadeInUp 0.45s ease-out 0.08s both"
        >
          <!-- Main 2-column layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <!-- Left column: Basic Info + Description -->
            <div class="lg:col-span-2 flex flex-col gap-5">
              <!-- Basic Info -->
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.BASIC_INFO' | translate }}
                  </h3>
                </div>
                <div class="px-6 py-5">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.NAME_FR' | translate
                      }}</label>
                      <input
                        formControlName="nameFr"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.NAME_EN' | translate
                      }}</label>
                      <input
                        formControlName="nameEn"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.SLUG' | translate
                      }}</label>
                      <input
                        formControlName="slug"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.SKU' | translate
                      }}</label>
                      <input
                        formControlName="sku"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.CATEGORY' | translate
                      }}</label>
                      <select
                        formControlName="categoryId"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">{{ 'PRODUCTS.SELECT_CATEGORY' | translate }}</option>
                        @for (cat of categories(); track cat.id) {
                          <option [value]="cat.id">{{ cat.nameFr }}</option>
                        }
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.PRODUCT_TYPE' | translate
                      }}</label>
                      <select
                        formControlName="productType"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="saas">{{ 'PRODUCTS.SAAS' | translate }}</option>
                        <option value="physical">{{ 'PRODUCTS.PHYSICAL' | translate }}</option>
                        <option value="license">{{ 'PRODUCTS.LICENSE' | translate }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div
                class="flex-1 rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden flex flex-col"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.DESCRIPTION' | translate }}
                  </h3>
                </div>
                <div
                  class="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-light"
                >
                  <div class="px-6 py-5">
                    <div class="flex items-center gap-2 mb-3">
                      <span
                        class="inline-flex items-center rounded bg-background border border-border-light px-2 py-0.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider"
                        >FR</span
                      >
                    </div>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.DESCRIPTION_FR' | translate
                        }}</label>
                        <textarea
                          formControlName="descriptionFr"
                          rows="3"
                          class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none leading-relaxed"
                        ></textarea>
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.SHORT_DESC_FR' | translate
                        }}</label>
                        <input
                          formControlName="shortDescriptionFr"
                          class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="px-6 py-5">
                    <div class="flex items-center gap-2 mb-3">
                      <span
                        class="inline-flex items-center rounded bg-background border border-border-light px-2 py-0.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider"
                        >EN</span
                      >
                    </div>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.DESCRIPTION_EN' | translate
                        }}</label>
                        <textarea
                          formControlName="descriptionEn"
                          rows="3"
                          class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none leading-relaxed"
                        ></textarea>
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.SHORT_DESC_EN' | translate
                        }}</label>
                        <input
                          formControlName="shortDescriptionEn"
                          class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right column: Options + Pricing + Stock -->
            <div class="flex flex-col gap-5">
              <!-- Options -->
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.OPTIONS' | translate }}
                  </h3>
                </div>
                <div class="divide-y divide-border-light">
                  <label class="flex items-center justify-between px-6 py-3.5 cursor-pointer">
                    <span class="text-xs text-text-muted">{{
                      'PRODUCTS.AVAILABLE' | translate
                    }}</span>
                    <div class="relative">
                      <input type="checkbox" formControlName="isAvailable" class="sr-only peer" />
                      <div
                        class="w-9 h-5 bg-border-light rounded-full peer-checked:bg-primary transition-colors"
                      ></div>
                      <div
                        class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4"
                      ></div>
                    </div>
                  </label>
                  <label class="flex items-center justify-between px-6 py-3.5 cursor-pointer">
                    <span class="text-xs text-text-muted">{{
                      'PRODUCTS.FEATURED' | translate
                    }}</span>
                    <div class="relative">
                      <input type="checkbox" formControlName="isFeatured" class="sr-only peer" />
                      <div
                        class="w-9 h-5 bg-border-light rounded-full peer-checked:bg-primary transition-colors"
                      ></div>
                      <div
                        class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4"
                      ></div>
                    </div>
                  </label>
                  <div class="px-6 py-3.5">
                    <label class="block text-xs text-text-muted mb-1.5">{{
                      'PRODUCTS.DISPLAY_ORDER' | translate
                    }}</label>
                    <input
                      type="number"
                      formControlName="displayOrder"
                      class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>

              <!-- Pricing -->
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.PRICING' | translate }}
                  </h3>
                </div>
                <div class="px-6 py-5">
                  @if (form.get('productType')?.value === 'saas') {
                    <div class="space-y-4">
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.MONTHLY_PRICE' | translate
                        }}</label>
                        <div class="relative">
                          <span
                            class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted"
                            >EUR</span
                          >
                          <input
                            type="number"
                            step="0.01"
                            formControlName="priceMonthly"
                            class="w-full pl-11 pr-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.YEARLY_PRICE' | translate
                        }}</label>
                        <div class="relative">
                          <span
                            class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted"
                            >EUR</span
                          >
                          <input
                            type="number"
                            step="0.01"
                            formControlName="priceYearly"
                            class="w-full pl-11 pr-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  } @else {
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.UNIT_PRICE_EUR' | translate
                      }}</label>
                      <div class="relative">
                        <span
                          class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted"
                          >EUR</span
                        >
                        <input
                          type="number"
                          step="0.01"
                          formControlName="priceUnit"
                          class="w-full pl-11 pr-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Stock (physical only) -->
              @if (form.get('productType')?.value === 'physical') {
                <div
                  class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
                >
                  <div class="px-6 py-4 border-b border-border-light">
                    <h3 class="text-sm font-semibold text-text-primary !m-0">
                      {{ 'PRODUCTS.STOCK' | translate }}
                    </h3>
                  </div>
                  <div class="px-6 py-5 space-y-4">
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.STOCK_QUANTITY' | translate
                      }}</label>
                      <input
                        type="number"
                        formControlName="stockQuantity"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.STOCK_ALERT' | translate
                      }}</label>
                      <input
                        type="number"
                        formControlName="stockAlertThreshold"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Row 3: Characteristics (full-width) -->
          <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-border-light flex items-center justify-between">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.CHARACTERISTICS' | translate }}
                </h3>
                @if (characteristics.length > 0) {
                  <span class="text-[11px] text-text-muted"
                    >{{ characteristics.length }}
                    {{ characteristics.length > 1 ? 'items' : 'item' }}</span
                  >
                }
              </div>
              <button
                type="button"
                (click)="addCharacteristic()"
                class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary-light rounded-md transition-colors bg-transparent border-0 cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                {{ 'PRODUCTS.ADD_CHAR' | translate }}
              </button>
            </div>
            @if (characteristics.length === 0) {
              <div class="flex flex-col items-center justify-center gap-2 py-8">
                <span class="text-xs text-text-muted">{{ 'PRODUCTS.NO_CHARS' | translate }}</span>
              </div>
            } @else {
              <div class="divide-y divide-border-light">
                @for (char of characteristics.controls; track $index; let i = $index) {
                  <div class="px-6 py-4" [formGroup]="asFormGroup(char)">
                    <div class="flex items-start gap-3">
                      <div class="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
                        <div>
                          <label class="block text-xs font-medium text-text-muted mb-1"
                            >{{ 'PRODUCTS.CHAR_KEY' | translate }} (FR)</label
                          >
                          <input
                            formControlName="keyFr"
                            class="w-full px-3 py-1.5 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label class="block text-xs font-medium text-text-muted mb-1"
                            >{{ 'PRODUCTS.CHAR_KEY' | translate }} (EN)</label
                          >
                          <input
                            formControlName="keyEn"
                            class="w-full px-3 py-1.5 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label class="block text-xs font-medium text-text-muted mb-1"
                            >{{ 'PRODUCTS.CHAR_VALUE' | translate }} (FR)</label
                          >
                          <input
                            formControlName="valueFr"
                            class="w-full px-3 py-1.5 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label class="block text-xs font-medium text-text-muted mb-1"
                            >{{ 'PRODUCTS.CHAR_VALUE' | translate }} (EN)</label
                          >
                          <input
                            formControlName="valueEn"
                            class="w-full px-3 py-1.5 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        (click)="removeCharacteristic(i)"
                        class="mt-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted hover:text-error hover:bg-error-light transition-colors bg-transparent border-0 cursor-pointer"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>

          <!-- Images (only in edit mode) -->
          @if (isEdit()) {
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">Images</h3>
              </div>
              <div class="p-6">
                <app-image-upload
                  [images]="product()?.images ?? []"
                  [maxImages]="10"
                  [isUploading]="uploadingImages()"
                  [uploadProgress]="uploadProgress()"
                  (filesSelected)="onImagesSelected($event)"
                  (imageReordered)="onImageReordered($event)"
                  (imagePrimaryChanged)="onImagePrimaryChanged($event)"
                  (imageDeleted)="onImageDeleted($event)"
                  (altTextChanged)="onAltTextChanged($event)"
                />
              </div>
            </div>
          }
        </form>
      </div>
    }

    <app-confirm-modal
      [open]="showDeleteImageModal()"
      title="Supprimer l'image"
      message="Cette image sera definitivement supprimee. Cette action est irreversible."
      confirmLabel="Supprimer"
      cancelLabel="Annuler"
      variant="danger"
      (confirm)="confirmDeleteImage()"
      (cancel)="showDeleteImageModal.set(false)"
    />
  `,
})
export class ProductFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);
  private readonly imageService = inject(ImageService);

  isEdit = signal(false);
  loadingProduct = signal(false);
  saving = signal(false);
  categories = signal<Category[]>([]);
  product = signal<Product | null>(null);
  uploadingImages = signal(false);
  uploadProgress = signal<number | null>(null);
  showDeleteImageModal = signal(false);
  deletingImageId = signal<string | null>(null);
  productId = '';
  basePath = '/products';
  newTitleKey = 'PRODUCTS.NEW_PRODUCT';

  form = this.fb.group({
    nameFr: ['', Validators.required],
    nameEn: ['', Validators.required],
    slug: ['', Validators.required],
    sku: ['', Validators.required],
    categoryId: ['', Validators.required],
    productType: ['saas', Validators.required],
    descriptionFr: ['', Validators.required],
    descriptionEn: ['', Validators.required],
    shortDescriptionFr: [''],
    shortDescriptionEn: [''],
    priceMonthly: [null as number | null],
    priceYearly: [null as number | null],
    priceUnit: [null as number | null],
    isAvailable: [true],
    isFeatured: [false],
    displayOrder: [0],
    stockQuantity: [null as number | null],
    stockAlertThreshold: [10],
    characteristics: this.fb.array<FormGroup>([]),
  });

  get characteristics(): FormArray<FormGroup> {
    return this.form.get('characteristics') as FormArray<FormGroup>;
  }

  asFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  addCharacteristic() {
    this.characteristics.push(
      this.fb.group({
        keyFr: [''],
        keyEn: [''],
        valueFr: [''],
        valueEn: [''],
      }),
    );
  }

  removeCharacteristic(index: number) {
    this.characteristics.removeAt(index);
  }

  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data['basePath']) this.basePath = data['basePath'];
    if (data['newTitleKey']) this.newTitleKey = data['newTitleKey'];
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.productId = id;
      this.loadProduct(id);
    }
  }

  loadCategories() {
    this.api.get<any>('admin/catalog/categories').subscribe({
      next: (res) => {
        const cats = Array.isArray(res) ? res : res?.data || res || [];
        this.categories.set(cats);
      },
    });
  }

  loadProduct(id: string) {
    this.loadingProduct.set(true);
    this.api.get<Product>(`admin/catalog/products/${id}`).subscribe({
      next: (p) => {
        this.product.set(p);
        this.form.patchValue({
          nameFr: p.nameFr,
          nameEn: p.nameEn,
          slug: p.slug,
          sku: p.sku,
          categoryId: p.categoryId,
          productType: p.productType,
          descriptionFr: p.descriptionFr,
          descriptionEn: p.descriptionEn,
          shortDescriptionFr: p.shortDescriptionFr ?? '',
          shortDescriptionEn: p.shortDescriptionEn ?? '',
          priceMonthly: p.priceMonthly ?? null,
          priceYearly: p.priceYearly ?? null,
          priceUnit: p.priceUnit ?? null,
          isAvailable: p.isAvailable,
          isFeatured: p.isFeatured,
          displayOrder: p.displayOrder ?? 0,
          stockQuantity: p.stockQuantity ?? null,
          stockAlertThreshold: p.stockAlertThreshold,
        });
        // Load characteristics into FormArray
        this.characteristics.clear();
        if (p.characteristics?.length) {
          for (const char of p.characteristics) {
            this.characteristics.push(
              this.fb.group({
                keyFr: [char.keyFr || ''],
                keyEn: [char.keyEn || ''],
                valueFr: [char.valueFr || ''],
                valueEn: [char.valueEn || ''],
              }),
            );
          }
        }
        this.loadingProduct.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('PRODUCTS.NOT_FOUND'));
        this.router.navigate([this.basePath]);
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
        this.notifications.success(
          this.isEdit()
            ? this.translate.instant('PRODUCTS.UPDATED')
            : this.translate.instant('PRODUCTS.CREATED'),
        );
        this.router.navigate([this.basePath, product.id || this.productId]);
      },
      error: (err) => {
        this.saving.set(false);
        this.notifications.error(
          err.error?.message || this.translate.instant('PRODUCTS.SAVE_ERROR'),
        );
      },
    });
  }

  // --- Image handlers ---

  onImagesSelected(files: File[]) {
    const currentImages = this.product()?.images ?? [];
    const remaining = 10 - currentImages.length;
    if (remaining <= 0) {
      this.notifications.error("Nombre maximum d'images atteint (10).");
      return;
    }

    const validFiles: File[] = [];
    for (const file of files.slice(0, remaining)) {
      const validation = this.imageService.validateFile(file);
      if (!validation.valid) {
        this.notifications.error(validation.error!);
      } else {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) return;

    this.uploadingImages.set(true);
    this.uploadProgress.set(0);

    let completed = 0;
    for (const file of validFiles) {
      const isPrimary = currentImages.length === 0 && completed === 0;

      this.imageService
        .requestUploadUrl(this.productId, file)
        .pipe(
          switchMap((presigned) =>
            this.imageService.uploadToR2(file, presigned.uploadUrl).pipe(
              switchMap((progress) => {
                if (!progress.complete) {
                  this.uploadProgress.set(progress.progress);
                  return [];
                }
                return this.imageService.confirmUpload(this.productId, {
                  storageKey: presigned.storageKey,
                  isPrimary,
                });
              }),
            ),
          ),
        )
        .subscribe({
          next: (confirmedImage) => {
            const p = this.product();
            if (p && confirmedImage) {
              this.product.set({
                ...p,
                images: [...p.images, confirmedImage],
              });
            }
            completed++;
            if (completed === validFiles.length) {
              this.uploadingImages.set(false);
              this.uploadProgress.set(null);
              // Final reload to ensure full consistency with backend
              this.reloadProductImages();
            }
          },
          error: (err) => {
            completed++;
            this.notifications.error(err.error?.message || "Erreur lors de l'upload.");
            if (completed === validFiles.length) {
              this.uploadingImages.set(false);
              this.uploadProgress.set(null);
              this.reloadProductImages();
            }
          },
        });
    }
  }

  onImageDeleted(imageId: string) {
    this.deletingImageId.set(imageId);
    this.showDeleteImageModal.set(true);
  }

  confirmDeleteImage() {
    const imageId = this.deletingImageId();
    this.showDeleteImageModal.set(false);
    this.deletingImageId.set(null);
    if (!imageId) return;

    this.imageService.deleteImage(this.productId, imageId).subscribe({
      next: () => {
        const p = this.product();
        if (p) {
          this.product.set({
            ...p,
            images: p.images.filter((img) => img.id !== imageId),
          });
        }
        this.notifications.success('Image supprimee.');
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Erreur lors de la suppression.');
      },
    });
  }

  onImageReordered({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) {
    const p = this.product();
    if (!p) return;
    const images = [...p.images];
    const [moved] = images.splice(fromIndex, 1);
    images.splice(toIndex, 0, moved);
    this.product.set({ ...p, images });

    const imageIds = images.map((img) => img.id);
    this.imageService.reorderImages(this.productId, imageIds).subscribe({
      error: () => {
        this.reloadProductImages();
        this.notifications.error('Erreur lors du reordonnancement.');
      },
    });
  }

  onImagePrimaryChanged(imageId: string) {
    const p = this.product();
    if (!p) return;
    this.product.set({
      ...p,
      images: p.images.map((img) => ({
        ...img,
        isPrimary: img.id === imageId,
      })),
    });

    this.api
      .patch<any, any>(`admin/catalog/products/${this.productId}/images/${imageId}/primary`, {})
      .subscribe({
        error: () => {
          this.reloadProductImages();
          this.notifications.error("Erreur lors du changement d'image principale.");
        },
      });
  }

  onAltTextChanged(event: { imageId: string; altTextFr?: string; altTextEn?: string }) {
    this.api
      .patch<any, any>(`admin/catalog/products/${this.productId}/images/${event.imageId}`, {
        altTextFr: event.altTextFr,
        altTextEn: event.altTextEn,
      })
      .subscribe();
  }

  private reloadProductImages() {
    this.api.get<Product>(`admin/catalog/products/${this.productId}`).subscribe({
      next: (p) => this.product.set(p),
    });
  }
}
