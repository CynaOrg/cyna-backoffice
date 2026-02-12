import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    ConfirmModalComponent,
  ],
  template: `
    <div>
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
          Content Management
        </h1>
        <p class="text-sm text-text-secondary mt-1">
          Manage carousel, hero text, top products and contact messages
        </p>
      </div>

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
          Carousel
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
          Top Products
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
          Hero Text
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
          Contact Messages
        </button>
      </div>

      <!-- Tab: Carousel -->
      @if (activeTab() === 'carousel') {
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2
              class="text-lg font-semibold text-text-primary font-[family-name:var(--font-heading)]"
            >
              Carousel Slides
            </h2>
            <button
              (click)="openSlideModal()"
              class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium"
            >
              + Add Slide
            </button>
          </div>

          @if (loadingSlides()) {
            <app-loading-spinner />
          } @else {
            <div class="grid gap-4">
              @for (slide of slides(); track slide.id; let i = $index) {
                <div
                  class="bg-card-bg rounded-xl border border-border-light shadow-sm p-4 flex items-center gap-4"
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
                      title="Move up"
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
                      title="Move down"
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
                      class="text-sm text-primary hover:text-primary-dark font-medium"
                    >
                      Edit
                    </button>
                    <button
                      (click)="confirmDeleteSlide(slide)"
                      class="text-sm text-danger hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              } @empty {
                <div
                  class="bg-card-bg rounded-xl border border-border-light shadow-sm p-12 text-center"
                >
                  <p class="text-sm text-text-muted">No carousel slides yet</p>
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
            <!-- Top Services -->
            <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
              <h2
                class="text-lg font-semibold text-text-primary mb-4 font-[family-name:var(--font-heading)]"
              >
                Top Services
              </h2>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    Product IDs (comma-separated)
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="topServicesInput"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g. uuid-1, uuid-2, uuid-3"
                  />
                </div>
                <div class="flex justify-end">
                  <button
                    (click)="saveTopConfig('top_services')"
                    [disabled]="savingTopConfig()"
                    class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                  >
                    {{ savingTopConfig() ? 'Saving...' : 'Save Top Services' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Top Products -->
            <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
              <h2
                class="text-lg font-semibold text-text-primary mb-4 font-[family-name:var(--font-heading)]"
              >
                Top Products
              </h2>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    Product IDs (comma-separated)
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="topProductsInput"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g. uuid-1, uuid-2, uuid-3"
                  />
                </div>
                <div class="flex justify-end">
                  <button
                    (click)="saveTopConfig('top_products')"
                    [disabled]="savingTopConfig()"
                    class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                  >
                    {{ savingTopConfig() ? 'Saving...' : 'Save Top Products' }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Tab: Hero Text -->
      @if (activeTab() === 'hero-text') {
        <div>
          @if (loadingHero()) {
            <app-loading-spinner />
          } @else {
            <div class="bg-card-bg rounded-xl border border-border-light shadow-sm p-6">
              <h2
                class="text-lg font-semibold text-text-primary mb-4 font-[family-name:var(--font-heading)]"
              >
                Hero Text
              </h2>
              <form [formGroup]="heroForm" (ngSubmit)="saveHeroText()" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      Title (FR)
                    </label>
                    <input
                      formControlName="titleFr"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      Title (EN)
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
                      Subtitle (FR)
                    </label>
                    <textarea
                      formControlName="subtitleFr"
                      rows="3"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      Subtitle (EN)
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
                    class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                  >
                    {{ savingHero() ? 'Saving...' : 'Save Hero Text' }}
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
            <div class="bg-card-bg rounded-xl border border-border-light shadow-sm overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-border-light">
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        Subject
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        Actions
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
                              [label]="msg.isRead ? 'Read' : 'Unread'"
                            />
                            @if (msg.isTreated) {
                              <app-status-badge status="completed" label="Treated" />
                            }
                          </div>
                        </td>
                        <td class="px-6 py-4 text-right" (click)="$event.stopPropagation()">
                          <div class="flex items-center justify-end gap-2">
                            <button
                              (click)="toggleMessageRead(msg)"
                              class="text-xs text-primary hover:text-primary-dark font-medium whitespace-nowrap"
                            >
                              {{ msg.isRead ? 'Mark unread' : 'Mark read' }}
                            </button>
                            <button
                              (click)="toggleMessageTreated(msg)"
                              class="text-xs text-primary hover:text-primary-dark font-medium whitespace-nowrap"
                            >
                              {{ msg.isTreated ? 'Untreated' : 'Mark treated' }}
                            </button>
                            <button
                              (click)="confirmDeleteMessage(msg)"
                              class="text-xs text-danger hover:text-red-700 font-medium"
                            >
                              Delete
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
                          No contact messages
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
            <h3
              class="text-lg font-semibold text-text-primary mb-4 font-[family-name:var(--font-heading)]"
            >
              {{ editingSlide() ? 'Edit Slide' : 'New Slide' }}
            </h3>
            <form [formGroup]="slideForm" (ngSubmit)="saveSlide()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    Title (FR)
                  </label>
                  <input
                    formControlName="titleFr"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    Title (EN)
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
                    Subtitle (FR)
                  </label>
                  <input
                    formControlName="subtitleFr"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    Subtitle (EN)
                  </label>
                  <input
                    formControlName="subtitleEn"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Image URL</label>
                <input
                  formControlName="imageUrl"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="https://..."
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    Button Text (FR)
                  </label>
                  <input
                    formControlName="buttonTextFr"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    Button Text (EN)
                  </label>
                  <input
                    formControlName="buttonTextEn"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">Button Link</label>
                <input
                  formControlName="buttonLink"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="/products or https://..."
                />
              </div>
              <div class="flex items-center gap-3">
                <label class="block text-sm font-medium text-text-primary">Active</label>
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
                  Cancel
                </button>
                <button
                  type="submit"
                  [disabled]="savingSlide()"
                  class="bg-primary text-white hover:bg-primary-dark rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {{ savingSlide() ? 'Saving...' : 'Save' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Confirm Delete Slide -->
      <app-confirm-modal
        [open]="showDeleteSlideModal()"
        title="Delete Slide"
        message="Are you sure you want to delete this carousel slide? This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        (confirm)="deleteSlide()"
        (cancel)="showDeleteSlideModal.set(false)"
      />

      <!-- Confirm Delete Message -->
      <app-confirm-modal
        [open]="showDeleteMessageModal()"
        title="Delete Message"
        message="Are you sure you want to delete this contact message? This action cannot be undone."
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
  topServicesInput = '';
  topProductsInput = '';
  loadingTopConfig = signal(false);
  savingTopConfig = signal(false);

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
        this.notifications.error('Failed to load carousel slides');
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
        this.notifications.success(editing ? 'Slide updated' : 'Slide created');
        this.showSlideModal.set(false);
        this.savingSlide.set(false);
        this.loadCarouselSlides();
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Failed to save slide');
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
        this.notifications.success('Slide deleted');
        this.slides.update((s) => s.filter((x) => x.id !== slide.id));
        this.showDeleteSlideModal.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Failed to delete slide');
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
        this.notifications.success('Carousel order updated');
      },
      error: () => {
        this.notifications.error('Failed to reorder carousel');
        this.loadCarouselSlides();
      },
    });
  }

  // --- Top Products ---

  loadTopConfigs() {
    this.loadingTopConfig.set(true);
    let loaded = 0;
    const checkDone = () => {
      loaded++;
      if (loaded === 2) this.loadingTopConfig.set(false);
    };

    this.contentService.getTopConfig('top_services').subscribe({
      next: (config) => {
        this.topServicesInput = config.productIds?.join(', ') || '';
        checkDone();
      },
      error: () => {
        checkDone();
      },
    });

    this.contentService.getTopConfig('top_products').subscribe({
      next: (config) => {
        this.topProductsInput = config.productIds?.join(', ') || '';
        checkDone();
      },
      error: () => {
        checkDone();
      },
    });
  }

  saveTopConfig(type: 'top_services' | 'top_products') {
    this.savingTopConfig.set(true);
    const input = type === 'top_services' ? this.topServicesInput : this.topProductsInput;
    const productIds = input
      .split(',')
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    this.contentService.updateTopConfig(type, { productIds }).subscribe({
      next: () => {
        const label = type === 'top_services' ? 'Top Services' : 'Top Products';
        this.notifications.success(`${label} updated`);
        this.savingTopConfig.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Failed to update configuration');
        this.savingTopConfig.set(false);
      },
    });
  }

  // --- Hero Text ---

  loadHeroText() {
    this.loadingHero.set(true);
    this.contentService.getHeroText().subscribe({
      next: (hero) => {
        this.heroForm.patchValue({
          titleFr: hero.titleFr,
          titleEn: hero.titleEn,
          subtitleFr: hero.subtitleFr,
          subtitleEn: hero.subtitleEn,
        });
        this.loadingHero.set(false);
      },
      error: () => {
        this.notifications.error('Failed to load hero text');
        this.loadingHero.set(false);
      },
    });
  }

  saveHeroText() {
    this.savingHero.set(true);
    this.contentService.updateHeroText(this.heroForm.value).subscribe({
      next: () => {
        this.notifications.success('Hero text updated');
        this.savingHero.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Failed to update hero text');
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
        this.notifications.error('Failed to load contact messages');
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
        this.notifications.success(updated.isRead ? 'Marked as read' : 'Marked as unread');
      },
      error: () => {
        this.notifications.error('Failed to update message');
      },
    });
  }

  toggleMessageTreated(msg: ContactMessage) {
    this.contentService.updateContactMessage(msg.id, { isTreated: !msg.isTreated }).subscribe({
      next: (updated) => {
        this.messages.update((msgs) => msgs.map((m) => (m.id === msg.id ? updated : m)));
        this.notifications.success(updated.isTreated ? 'Marked as treated' : 'Marked as untreated');
      },
      error: () => {
        this.notifications.error('Failed to update message');
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
        this.notifications.success('Message deleted');
        this.messages.update((msgs) => msgs.filter((m) => m.id !== msg.id));
        this.showDeleteMessageModal.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || 'Failed to delete message');
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
