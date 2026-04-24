import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { ContentService } from '../../core/services/content.service';
import { NotificationService } from '../../core/services/notification.service';
import {
  CarouselSlide,
  HeroText,
  TopProductConfig,
  ContactMessage,
} from '../../core/models/content.model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { ConfirmModalComponent } from '../../shared/components/confirm-modal/confirm-modal.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductPickerComponent } from './product-picker.component';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    ConfirmModalComponent,
    TranslateModule,
    ProductPickerComponent,
  ],
  template: `
    <div>
      <!-- Tab Bar -->
      <div class="flex border-b border-border-light mb-6">
        <button
          (click)="switchTab('carousel')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'carousel'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'CONTENT.CAROUSEL' | translate }}
        </button>
        <button
          (click)="switchTab('top-products')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'top-products'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'CONTENT.TOP_PRODUCTS' | translate }}
        </button>
        <button
          (click)="switchTab('hero-text')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'hero-text'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'CONTENT.HERO_TEXT' | translate }}
        </button>
        <button
          (click)="switchTab('messages')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'messages'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'CONTENT.CONTACT_MESSAGES' | translate }}
        </button>
      </div>

      <!-- Tab: Carousel -->
      @if (activeTab() === 'carousel') {
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-text-primary">
              {{ 'CONTENT.CAROUSEL_SLIDES' | translate }}
            </h2>
            <button
              (click)="openSlideModal()"
              class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium"
            >
              {{ 'CONTENT.ADD_SLIDE' | translate }}
            </button>
          </div>

          @if (loadingSlides()) {
            <app-loading-spinner />
          } @else {
            <div class="grid gap-4">
              @for (slide of slides(); track slide.id; let i = $index) {
                <div
                  class="bg-surface rounded-xl border border-border-light shadow-sm p-4 flex items-center gap-4"
                >
                  <!-- Image Preview -->
                  <div class="flex-shrink-0">
                    @if (slide.imageUrl) {
                      <img
                        [src]="slide.imageUrl"
                        [alt]="slide.titleFr"
                        class="w-24 h-16 rounded-lg object-cover border border-border-light"
                      />
                    } @else {
                      <div
                        class="w-24 h-16 rounded-lg bg-gray-100 flex items-center justify-center border border-border-light"
                      >
                        <svg
                          class="w-6 h-6 text-text-muted"
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
                  </div>

                  <!-- Slide Info -->
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-text-primary truncate">
                      {{ slide.titleFr }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <app-status-badge [status]="slide.isActive ? 'active' : 'inactive'" />
                      <span class="text-xs text-text-muted"> Order: {{ slide.displayOrder }} </span>
                    </div>
                  </div>

                  <!-- Reorder Buttons -->
                  <div class="flex flex-col gap-1">
                    <button
                      (click)="moveSlide(i, 'up')"
                      [disabled]="i === 0"
                      class="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
                      [title]="'CONTENT.MOVE_UP' | translate"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <button
                      (click)="moveSlide(i, 'down')"
                      [disabled]="i === slides().length - 1"
                      class="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
                      [title]="'CONTENT.MOVE_DOWN' | translate"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center gap-2">
                    <button
                      (click)="openSlideModal(slide)"
                      class="text-sm text-primary hover:text-primary-hover font-medium"
                    >
                      {{ 'CONTENT.EDIT' | translate }}
                    </button>
                    <button
                      (click)="confirmDeleteSlide(slide)"
                      class="text-sm text-error hover:text-red-700 font-medium"
                    >
                      {{ 'CONTENT.DELETE' | translate }}
                    </button>
                  </div>
                </div>
              } @empty {
                <div
                  class="bg-surface rounded-xl border border-border-light shadow-sm p-12 text-center"
                >
                  <p class="text-sm text-text-muted">{{ 'CONTENT.NO_SLIDES' | translate }}</p>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- Tab: Top Products -->
      @if (activeTab() === 'top-products') {
        <div class="space-y-6">
          @if (loadingTopConfig()) {
            <app-loading-spinner />
          } @else {
            <!-- Top Services (SaaS) -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-text-primary">
                  {{ 'CONTENT.TOP_SERVICES' | translate }}
                </h2>
                <button
                  type="button"
                  (click)="openPicker('top_services')"
                  class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium"
                >
                  {{ 'CONTENT.CONFIGURE' | translate }}
                </button>
              </div>
              <p class="text-xs text-text-muted">
                {{ 'CONTENT.SELECTED_COUNT' | translate: { count: topServicesIds().length } }}
              </p>
            </div>

            <!-- Top Products (Physical) -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-text-primary">
                  {{ 'CONTENT.TOP_PRODUCTS' | translate }}
                </h2>
                <button
                  type="button"
                  (click)="openPicker('top_products')"
                  class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium"
                >
                  {{ 'CONTENT.CONFIGURE' | translate }}
                </button>
              </div>
              <p class="text-xs text-text-muted">
                {{ 'CONTENT.SELECTED_COUNT' | translate: { count: topProductsIds().length } }}
              </p>
            </div>
          }
        </div>
      }

      <!-- Product Picker Modal -->
      <app-product-picker
        [open]="showPicker()"
        [productType]="pickerProductType()"
        [selectedIds]="pickerSelectedIds()"
        [titleKey]="pickerTitleKey()"
        (close)="showPicker.set(false)"
        (saved)="onPickerSaved($event)"
      />

      <!-- Tab: Hero Text -->
      @if (activeTab() === 'hero-text') {
        <div>
          @if (loadingHero()) {
            <app-loading-spinner />
          } @else {
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h2 class="text-lg font-semibold text-text-primary mb-4">
                {{ 'CONTENT.HERO_TEXT' | translate }}
              </h2>
              <form [formGroup]="heroForm" (ngSubmit)="saveHeroText()" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      {{ 'CONTENT.TITLE_FR' | translate }}
                    </label>
                    <input
                      formControlName="titleFr"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      {{ 'CONTENT.TITLE_EN' | translate }}
                    </label>
                    <input
                      formControlName="titleEn"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      {{ 'CONTENT.SUBTITLE_FR' | translate }}
                    </label>
                    <textarea
                      formControlName="subtitleFr"
                      rows="3"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      {{ 'CONTENT.SUBTITLE_EN' | translate }}
                    </label>
                    <textarea
                      formControlName="subtitleEn"
                      rows="3"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    ></textarea>
                  </div>
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    [disabled]="savingHero()"
                    class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                  >
                    {{
                      savingHero()
                        ? ('CONTENT.SAVING' | translate)
                        : ('CONTENT.SAVE_HERO' | translate)
                    }}
                  </button>
                </div>
              </form>
            </div>
          }
        </div>
      }

      <!-- Tab: Contact Messages -->
      @if (activeTab() === 'messages') {
        <div>
          @if (loadingMessages()) {
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
                        {{ 'CONTENT.NAME' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.EMAIL' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.SUBJECT' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.DATE' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.STATUS' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.ACTIONS' | translate }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border-light">
                    @for (msg of messages(); track msg.id) {
                      <tr
                        class="hover:bg-gray-50/50 cursor-pointer"
                        (click)="toggleMessageExpand(msg.id)"
                      >
                        <td class="px-6 py-4 text-sm text-text-primary font-medium">
                          {{ msg.name }}
                        </td>
                        <td class="px-6 py-4 text-sm text-text-secondary">{{ msg.email }}</td>
                        <td class="px-6 py-4 text-sm text-text-secondary truncate max-w-[200px]">
                          {{ msg.subject }}
                        </td>
                        <td class="px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                          {{ formatDate(msg.createdAt) }}
                        </td>
                        <td class="px-6 py-4">
                          <div class="flex items-center gap-1.5">
                            <app-status-badge
                              [status]="msg.isRead ? 'active' : 'pending'"
                              [label]="
                                msg.isRead
                                  ? ('CONTENT.READ' | translate)
                                  : ('CONTENT.UNREAD' | translate)
                              "
                            />
                            @if (msg.isTreated) {
                              <app-status-badge
                                status="completed"
                                [label]="'CONTENT.TREATED' | translate"
                              />
                            }
                          </div>
                        </td>
                        <td class="px-6 py-4 text-right" (click)="$event.stopPropagation()">
                          <div class="flex items-center justify-end gap-2">
                            <button
                              (click)="toggleMessageRead(msg)"
                              class="text-xs text-primary hover:text-primary-hover font-medium whitespace-nowrap"
                            >
                              {{
                                msg.isRead
                                  ? ('CONTENT.MARK_UNREAD' | translate)
                                  : ('CONTENT.MARK_READ' | translate)
                              }}
                            </button>
                            <button
                              (click)="toggleMessageTreated(msg)"
                              class="text-xs text-primary hover:text-primary-hover font-medium whitespace-nowrap"
                            >
                              {{
                                msg.isTreated
                                  ? ('CONTENT.UNTREATED' | translate)
                                  : ('CONTENT.MARK_TREATED' | translate)
                              }}
                            </button>
                            <button
                              (click)="confirmDeleteMessage(msg)"
                              class="text-xs text-error hover:text-red-700 font-medium"
                            >
                              {{ 'CONTENT.DELETE' | translate }}
                            </button>
                          </div>
                        </td>
                      </tr>
                      @if (expandedMessageId() === msg.id) {
                        <tr>
                          <td colspan="6" class="px-6 py-4 bg-gray-50/50">
                            <div class="text-sm text-text-primary whitespace-pre-wrap">
                              {{ msg.message }}
                            </div>
                          </td>
                        </tr>
                      }
                    } @empty {
                      <tr>
                        <td colspan="6" class="px-6 py-12 text-center text-text-muted text-sm">
                          {{ 'CONTENT.NO_MESSAGES' | translate }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>
      }

      <!-- Slide Modal -->
      @if (showSlideModal()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto mx-4"
          >
            <h3 class="text-lg font-semibold text-text-primary mb-4">
              {{
                editingSlide()
                  ? ('CONTENT.EDIT_SLIDE' | translate)
                  : ('CONTENT.NEW_SLIDE' | translate)
              }}
            </h3>
            <form [formGroup]="slideForm" (ngSubmit)="saveSlide()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.TITLE_FR' | translate }}
                  </label>
                  <input
                    formControlName="titleFr"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.TITLE_EN' | translate }}
                  </label>
                  <input
                    formControlName="titleEn"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.SUBTITLE_FR' | translate }}
                  </label>
                  <input
                    formControlName="subtitleFr"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.SUBTITLE_EN' | translate }}
                  </label>
                  <input
                    formControlName="subtitleEn"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'CONTENT.IMAGE_URL' | translate
                }}</label>

                <!-- Mode toggle -->
                <div class="flex gap-2 mb-2">
                  <button
                    type="button"
                    (click)="imageInputMode.set('upload')"
                    class="px-3 py-1.5 text-xs font-medium rounded-lg border"
                    [class]="
                      imageInputMode() === 'upload'
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-text-secondary border-border hover:bg-gray-50'
                    "
                  >
                    {{ 'CONTENT.UPLOAD_IMAGE' | translate }}
                  </button>
                  <button
                    type="button"
                    (click)="imageInputMode.set('url')"
                    class="px-3 py-1.5 text-xs font-medium rounded-lg border"
                    [class]="
                      imageInputMode() === 'url'
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-text-secondary border-border hover:bg-gray-50'
                    "
                  >
                    {{ 'CONTENT.PASTE_URL' | translate }}
                  </button>
                </div>

                @if (imageInputMode() === 'upload') {
                  <!-- Upload mode -->
                  <input
                    #carouselFileInput
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    class="hidden"
                    (change)="onCarouselFileSelected($event)"
                  />
                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      (click)="carouselFileInput.click()"
                      [disabled]="carouselUploading()"
                      class="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-gray-50 disabled:opacity-60"
                    >
                      @if (carouselUploading()) {
                        {{ 'CONTENT.UPLOAD_IN_PROGRESS' | translate }}
                      } @else {
                        {{ 'CONTENT.UPLOAD_IMAGE' | translate }}
                      }
                    </button>
                    @if (carouselUploading()) {
                      <div class="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          class="h-full bg-primary rounded-full animate-pulse"
                          style="width: 100%"
                        ></div>
                      </div>
                    }
                  </div>
                } @else {
                  <input
                    formControlName="imageUrl"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    [placeholder]="'CONTENT.IMAGE_URL_PLACEHOLDER' | translate"
                  />
                }

                @if (slideForm.get('imageUrl')?.value) {
                  <div class="mt-3">
                    <p class="text-xs text-text-muted mb-1">
                      {{ 'CONTENT.IMAGE_PREVIEW' | translate }}
                    </p>
                    <img
                      [src]="slideForm.get('imageUrl')?.value"
                      alt="Preview"
                      class="w-full max-w-xs h-32 rounded-lg object-cover border border-border-light"
                    />
                  </div>
                }
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.BUTTON_TEXT_FR' | translate }}
                  </label>
                  <input
                    formControlName="buttonTextFr"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.BUTTON_TEXT_EN' | translate }}
                  </label>
                  <input
                    formControlName="buttonTextEn"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'CONTENT.BUTTON_LINK' | translate
                }}</label>
                <input
                  formControlName="buttonLink"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  [placeholder]="'CONTENT.BUTTON_LINK_PLACEHOLDER' | translate"
                />
              </div>
              <div class="flex items-center gap-3">
                <label class="block text-sm font-medium text-text-primary">{{
                  'CONTENT.ACTIVE' | translate
                }}</label>
                <button
                  type="button"
                  (click)="toggleSlideActive()"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  [class]="slideForm.get('isActive')?.value ? 'bg-primary' : 'bg-gray-200'"
                >
                  <span
                    class="inline-block h-4 w-4 rounded-full bg-white transition-transform"
                    [class]="slideForm.get('isActive')?.value ? 'translate-x-6' : 'translate-x-1'"
                  ></span>
                </button>
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="showSlideModal.set(false)"
                  class="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-gray-50"
                >
                  {{ 'CONTENT.CANCEL' | translate }}
                </button>
                <button
                  type="submit"
                  [disabled]="savingSlide()"
                  class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {{
                    savingSlide() ? ('CONTENT.SAVING' | translate) : ('CONTENT.SAVE' | translate)
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Confirm Delete Slide -->
      <app-confirm-modal
        [open]="showDeleteSlideModal()"
        [title]="'CONTENT.DELETE_SLIDE_TITLE' | translate"
        [message]="'CONTENT.DELETE_SLIDE_CONFIRM' | translate"
        confirmLabel="Delete"
        variant="danger"
        (confirm)="deleteSlide()"
        (cancel)="showDeleteSlideModal.set(false)"
      />

      <!-- Confirm Delete Message -->
      <app-confirm-modal
        [open]="showDeleteMessageModal()"
        [title]="'CONTENT.DELETE_MESSAGE_TITLE' | translate"
        [message]="'CONTENT.DELETE_MESSAGE_CONFIRM' | translate"
        confirmLabel="Delete"
        variant="danger"
        (confirm)="deleteMessage()"
        (cancel)="showDeleteMessageModal.set(false)"
      />
    </div>
  `,
})
export class ContentComponent implements OnInit {
  private readonly contentService = inject(ContentService);
  private readonly notifications = inject(NotificationService);
  private readonly fb = inject(FormBuilder);
  private readonly translate = inject(TranslateService);

  // Tab state
  activeTab = signal<'carousel' | 'top-products' | 'hero-text' | 'messages'>('carousel');

  // Carousel state
  slides = signal<CarouselSlide[]>([]);
  loadingSlides = signal(false);
  showSlideModal = signal(false);
  editingSlide = signal<CarouselSlide | null>(null);
  savingSlide = signal(false);
  showDeleteSlideModal = signal(false);
  slideToDelete = signal<CarouselSlide | null>(null);

  // Top Products state
  topServicesIds = signal<string[]>([]);
  topProductsIds = signal<string[]>([]);
  loadingTopConfig = signal(false);
  savingTopConfig = signal(false);

  // Picker state
  showPicker = signal(false);
  pickerTarget = signal<'top_services' | 'top_products'>('top_services');
  pickerProductType = signal<'saas' | 'physical' | 'license'>('saas');
  pickerSelectedIds = signal<string[]>([]);
  pickerTitleKey = signal<string>('');

  // Carousel image upload
  imageInputMode = signal<'upload' | 'url'>('upload');
  carouselUploading = signal(false);

  // Hero Text state
  loadingHero = signal(false);
  savingHero = signal(false);

  // Messages state
  messages = signal<ContactMessage[]>([]);
  loadingMessages = signal(false);
  expandedMessageId = signal<string | null>(null);
  showDeleteMessageModal = signal(false);
  messageToDelete = signal<ContactMessage | null>(null);

  // Forms
  slideForm: FormGroup = this.fb.group({
    titleFr: ['', Validators.required],
    titleEn: ['', Validators.required],
    subtitleFr: [''],
    subtitleEn: [''],
    imageUrl: ['', Validators.required],
    buttonTextFr: [''],
    buttonTextEn: [''],
    buttonLink: [''],
    isActive: [true],
  });

  heroForm: FormGroup = this.fb.group({
    titleFr: [''],
    titleEn: [''],
    subtitleFr: [''],
    subtitleEn: [''],
  });

  ngOnInit() {
    this.loadCarouselSlides();
  }

  // --- Tab Management ---

  switchTab(tab: 'carousel' | 'top-products' | 'hero-text' | 'messages') {
    this.activeTab.set(tab);
    if (tab === 'carousel' && this.slides().length === 0) {
      this.loadCarouselSlides();
    } else if (tab === 'top-products') {
      this.loadTopConfigs();
    } else if (tab === 'hero-text') {
      this.loadHeroText();
    } else if (tab === 'messages') {
      this.loadMessages();
    }
  }

  // --- Carousel ---

  loadCarouselSlides() {
    this.loadingSlides.set(true);
    this.contentService.getCarouselSlides().subscribe({
      next: (slides) => {
        this.slides.set(slides.sort((a, b) => a.displayOrder - b.displayOrder));
        this.loadingSlides.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('CONTENT.LOAD_SLIDES_FAILED'));
        this.loadingSlides.set(false);
      },
    });
  }

  openSlideModal(slide?: CarouselSlide) {
    if (slide) {
      this.editingSlide.set(slide);
      this.slideForm.patchValue({
        titleFr: slide.titleFr,
        titleEn: slide.titleEn,
        subtitleFr: slide.subtitleFr,
        subtitleEn: slide.subtitleEn,
        imageUrl: slide.imageUrl,
        buttonTextFr: slide.buttonTextFr,
        buttonTextEn: slide.buttonTextEn,
        buttonLink: slide.buttonLink,
        isActive: slide.isActive,
      });
    } else {
      this.editingSlide.set(null);
      this.slideForm.reset({ isActive: true });
    }
    this.showSlideModal.set(true);
  }

  toggleSlideActive() {
    const current = this.slideForm.get('isActive')?.value;
    this.slideForm.patchValue({ isActive: !current });
  }

  saveSlide() {
    if (this.slideForm.invalid) return;
    this.savingSlide.set(true);
    const data = this.slideForm.value;
    const editing = this.editingSlide();

    const request = editing
      ? this.contentService.updateSlide(editing.id, data)
      : this.contentService.createSlide(data);

    request.subscribe({
      next: () => {
        this.notifications.success(
          editing
            ? this.translate.instant('CONTENT.SLIDE_UPDATED')
            : this.translate.instant('CONTENT.SLIDE_CREATED'),
        );
        this.showSlideModal.set(false);
        this.savingSlide.set(false);
        this.loadCarouselSlides();
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('CONTENT.SAVE_SLIDE_FAILED'),
        );
        this.savingSlide.set(false);
      },
    });
  }

  confirmDeleteSlide(slide: CarouselSlide) {
    this.slideToDelete.set(slide);
    this.showDeleteSlideModal.set(true);
  }

  deleteSlide() {
    const slide = this.slideToDelete();
    if (!slide) return;
    this.contentService.deleteSlide(slide.id).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('CONTENT.SLIDE_DELETED'));
        this.slides.update((s) => s.filter((x) => x.id !== slide.id));
        this.showDeleteSlideModal.set(false);
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('CONTENT.DELETE_SLIDE_FAILED'),
        );
        this.showDeleteSlideModal.set(false);
      },
    });
  }

  moveSlide(index: number, direction: 'up' | 'down') {
    const current = [...this.slides()];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= current.length) return;

    // Swap
    [current[index], current[targetIndex]] = [current[targetIndex], current[index]];

    // Update display orders
    current.forEach((slide, i) => (slide.displayOrder = i));
    this.slides.set(current);

    // Persist the new order
    const slideIds = current.map((s) => s.id);
    this.contentService.reorderCarousel(slideIds).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('CONTENT.CAROUSEL_ORDER_UPDATED'));
      },
      error: () => {
        this.notifications.error(this.translate.instant('CONTENT.REORDER_FAILED'));
        this.loadCarouselSlides();
      },
    });
  }

  // --- Top Products ---

  loadTopConfigs() {
    this.loadingTopConfig.set(true);
    let loaded = 0;
    const checkDone = (): void => {
      loaded++;
      if (loaded === 2) this.loadingTopConfig.set(false);
    };

    this.contentService.getTopConfig('top_services').subscribe({
      next: (config) => {
        this.topServicesIds.set(config.productIds ?? []);
        checkDone();
      },
      error: () => {
        checkDone();
      },
    });

    this.contentService.getTopConfig('top_products').subscribe({
      next: (config) => {
        this.topProductsIds.set(config.productIds ?? []);
        checkDone();
      },
      error: () => {
        checkDone();
      },
    });
  }

  openPicker(type: 'top_services' | 'top_products'): void {
    this.pickerTarget.set(type);
    if (type === 'top_services') {
      this.pickerProductType.set('saas');
      this.pickerSelectedIds.set([...this.topServicesIds()]);
      this.pickerTitleKey.set('CONTENT.PICK_SERVICES');
    } else {
      this.pickerProductType.set('physical');
      this.pickerSelectedIds.set([...this.topProductsIds()]);
      this.pickerTitleKey.set('CONTENT.PICK_PRODUCTS');
    }
    this.showPicker.set(true);
  }

  onPickerSaved(productIds: string[]): void {
    const type = this.pickerTarget();
    this.savingTopConfig.set(true);
    this.showPicker.set(false);

    this.contentService.updateTopConfig(type, { productIds }).subscribe({
      next: () => {
        if (type === 'top_services') {
          this.topServicesIds.set(productIds);
        } else {
          this.topProductsIds.set(productIds);
        }
        const label =
          type === 'top_services'
            ? this.translate.instant('CONTENT.TOP_SERVICES')
            : this.translate.instant('CONTENT.TOP_PRODUCTS');
        this.notifications.success(this.translate.instant('CONTENT.CONFIG_UPDATED', { label }));
        this.savingTopConfig.set(false);
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('CONTENT.UPDATE_CONFIG_FAILED'),
        );
        this.savingTopConfig.set(false);
      },
    });
  }

  // --- Carousel Image Upload ---

  onCarouselFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      this.notifications.error(this.translate.instant('CONTENT.UPLOAD_FAILED'));
      target.value = '';
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      this.notifications.error(this.translate.instant('CONTENT.UPLOAD_FAILED'));
      target.value = '';
      return;
    }

    this.carouselUploading.set(true);

    this.contentService
      .requestCarouselUploadUrl(file.name, file.type)
      .pipe(
        switchMap((response) =>
          this.contentService
            .uploadBlobToPresignedUrl(response.uploadUrl, file)
            .pipe(map(() => response)),
        ),
      )
      .subscribe({
        next: (response) => {
          this.slideForm.patchValue({ imageUrl: response.publicUrl });
          this.carouselUploading.set(false);
          target.value = '';
        },
        error: () => {
          this.notifications.error(this.translate.instant('CONTENT.UPLOAD_FAILED'));
          this.carouselUploading.set(false);
          target.value = '';
        },
      });
  }

  // --- Hero Text ---

  loadHeroText() {
    this.loadingHero.set(true);
    this.contentService.getHeroText().subscribe({
      next: (hero) => {
        if (hero) {
          this.heroForm.patchValue({
            titleFr: hero.titleFr || '',
            titleEn: hero.titleEn || '',
            subtitleFr: hero.subtitleFr || '',
            subtitleEn: hero.subtitleEn || '',
          });
        }
        this.loadingHero.set(false);
      },
      error: () => {
        // Hero text may not exist yet (404) - this is handled gracefully in the service
        this.loadingHero.set(false);
      },
    });
  }

  saveHeroText() {
    this.savingHero.set(true);
    this.contentService.updateHeroText(this.heroForm.value).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('CONTENT.HERO_UPDATED'));
        this.savingHero.set(false);
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('CONTENT.HERO_UPDATE_FAILED'),
        );
        this.savingHero.set(false);
      },
    });
  }

  // --- Contact Messages ---

  loadMessages() {
    this.loadingMessages.set(true);
    this.contentService.getContactMessages().subscribe({
      next: (messages) => {
        this.messages.set(messages);
        this.loadingMessages.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant('CONTENT.LOAD_MESSAGES_FAILED'));
        this.loadingMessages.set(false);
      },
    });
  }

  toggleMessageExpand(messageId: string) {
    this.expandedMessageId.update((current) => (current === messageId ? null : messageId));
  }

  toggleMessageRead(msg: ContactMessage) {
    this.contentService.updateContactMessage(msg.id, { isRead: !msg.isRead }).subscribe({
      next: (updated) => {
        this.messages.update((msgs) => msgs.map((m) => (m.id === msg.id ? updated : m)));
        this.notifications.success(
          updated.isRead
            ? this.translate.instant('CONTENT.MARKED_READ')
            : this.translate.instant('CONTENT.MARKED_UNREAD'),
        );
      },
      error: () => {
        this.notifications.error(this.translate.instant('CONTENT.UPDATE_MESSAGE_FAILED'));
      },
    });
  }

  toggleMessageTreated(msg: ContactMessage) {
    this.contentService.updateContactMessage(msg.id, { isTreated: !msg.isTreated }).subscribe({
      next: (updated) => {
        this.messages.update((msgs) => msgs.map((m) => (m.id === msg.id ? updated : m)));
        this.notifications.success(
          updated.isTreated
            ? this.translate.instant('CONTENT.MARKED_TREATED')
            : this.translate.instant('CONTENT.MARKED_UNTREATED'),
        );
      },
      error: () => {
        this.notifications.error(this.translate.instant('CONTENT.UPDATE_MESSAGE_FAILED'));
      },
    });
  }

  confirmDeleteMessage(msg: ContactMessage) {
    this.messageToDelete.set(msg);
    this.showDeleteMessageModal.set(true);
  }

  deleteMessage() {
    const msg = this.messageToDelete();
    if (!msg) return;
    this.contentService.deleteContactMessage(msg.id).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant('CONTENT.MESSAGE_DELETED'));
        this.messages.update((msgs) => msgs.filter((m) => m.id !== msg.id));
        this.showDeleteMessageModal.set(false);
      },
      error: (err) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('CONTENT.DELETE_MESSAGE_FAILED'),
        );
        this.showDeleteMessageModal.set(false);
      },
    });
  }

  // --- Helpers ---

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
