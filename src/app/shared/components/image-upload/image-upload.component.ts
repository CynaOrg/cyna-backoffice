import {
  Component,
  input,
  output,
  signal,
  ElementRef,
  viewChild,
  inject,
  computed,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UploadItem } from '../../../core/models/product.model';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [TranslateModule],
  template: `
    <!-- Counter -->
    <div class="flex items-center justify-between mb-4">
      <span class="text-xs text-text-muted">
        {{ items().length }} / {{ maxImages() }} {{ 'IMAGE_UPLOAD.IMAGES_LABEL' | translate }}
      </span>
    </div>

    <!-- Drop zone -->
    @if (canShowDropZone()) {
      <div
        class="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors"
        [class.border-primary]="isDragOver()"
        [class.bg-primary/5]="isDragOver()"
        [class.border-border-light]="!isDragOver()"
        [class.hover:border-primary/50]="!isDragOver()"
        [class.hover:bg-background]="!isDragOver()"
        (drop)="onDrop($event)"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave()"
        (click)="openFileDialog()"
      >
        <input
          #fileInput
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          class="hidden"
          (change)="onFileSelected($event)"
        />
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 h-10 rounded-full bg-background flex items-center justify-center">
            <svg
              class="w-5 h-5 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
          <div>
            <p class="text-sm text-text-primary font-medium !m-0">
              {{ 'IMAGE_UPLOAD.DROP_OR_CLICK' | translate }}
            </p>
            <p class="text-xs text-text-muted mt-1 !mb-0">
              {{ 'IMAGE_UPLOAD.ACCEPTED_FORMATS' | translate }}
            </p>
          </div>
        </div>
      </div>
    }

    <!-- Image grid -->
    @if (items().length > 0) {
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        @for (item of items(); track item.id; let i = $index) {
          <div
            [attr.draggable]="item.status !== 'uploading'"
            (dragstart)="onImageDragStart($event, i)"
            (dragover)="onImageDragOver($event, i)"
            (drop)="onImageDrop($event, i)"
            (dragend)="onImageDragEnd()"
            class="relative group rounded-lg overflow-hidden border-2 aspect-square bg-background transition-all"
            [class.border-primary]="item.isPrimary && item.status !== 'error'"
            [class.border-error]="item.status === 'error'"
            [class.border-border-light]="!item.isPrimary && item.status !== 'error'"
            [class.opacity-50]="draggedIndex() === i"
            [class.ring-2]="dropTargetIndex() === i && draggedIndex() !== i"
            [class.ring-primary/30]="dropTargetIndex() === i && draggedIndex() !== i"
          >
            <!-- Image preview -->
            <img
              [src]="item.previewUrl"
              [alt]="
                item.productImage?.altTextFr ||
                item.productImage?.altTextEn ||
                ('IMAGE_UPLOAD.PRODUCT_IMAGE_ALT' | translate)
              "
              class="w-full h-full object-cover"
              [class.opacity-60]="item.status === 'pending' || item.status === 'uploading'"
            />

            <!-- Uploading overlay (per-tile progress) -->
            @if (item.status === 'uploading') {
              <div
                class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2"
              >
                <div
                  class="w-10 h-10 rounded-full border-4 border-white/30 border-t-white animate-spin"
                ></div>
                <span class="text-[11px] font-mono text-white">{{ item.progress ?? 0 }}%</span>
              </div>
            }

            <!-- Pending badge (top-right) -->
            @if (item.status === 'pending') {
              <div
                class="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-text-primary/80 text-white text-[10px] font-medium uppercase tracking-wider"
              >
                {{ 'IMAGE_UPLOAD.STATUS_PENDING' | translate }}
              </div>
            }

            <!-- Error overlay -->
            @if (item.status === 'error') {
              <div
                class="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-error text-white text-[10px] font-semibold uppercase tracking-wider"
                [title]="item.errorMessage || ('IMAGE_UPLOAD.STATUS_ERROR' | translate)"
              >
                {{ 'IMAGE_UPLOAD.STATUS_ERROR' | translate }}
              </div>
            }

            <!-- Hover overlay with actions (hidden during uploading) -->
            @if (item.status !== 'uploading') {
              <div
                class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
              >
                @if (item.status === 'error') {
                  <button
                    type="button"
                    (click)="onRetry($event, item.id)"
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-text-primary hover:bg-white transition-colors border-0 cursor-pointer"
                    [title]="'IMAGE_UPLOAD.RETRY' | translate"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                }

                @if (!item.isPrimary && item.status !== 'error') {
                  <button
                    type="button"
                    (click)="onSetPrimary($event, item.id)"
                    class="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-text-primary hover:bg-white transition-colors border-0 cursor-pointer"
                    [title]="'IMAGE_UPLOAD.SET_PRIMARY' | translate"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  </button>
                }

                <button
                  type="button"
                  (click)="onDelete($event, item.id)"
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-error hover:bg-white transition-colors border-0 cursor-pointer"
                  [title]="'IMAGE_UPLOAD.DELETE_IMAGE' | translate"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            }

            <!-- Primary badge -->
            @if (item.isPrimary && item.status !== 'error') {
              <div
                class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary text-white text-[10px] font-semibold uppercase tracking-wider"
              >
                {{ 'IMAGE_UPLOAD.PRIMARY' | translate }}
              </div>
            }
          </div>
        }
      </div>
    }
  `,
})
export class ImageUploadComponent {
  // Available for callers needing programmatic access to localized labels.
  protected readonly translate = inject(TranslateService);

  items = input<UploadItem[]>([]);
  maxImages = input<number>(10);

  filesSelected = output<File[]>();
  itemReordered = output<{ fromIndex: number; toIndex: number }>();
  itemPrimaryChanged = output<string>();
  itemDeleted = output<string>();
  itemRetried = output<string>();

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  isDragOver = signal(false);
  draggedIndex = signal<number | null>(null);
  dropTargetIndex = signal<number | null>(null);

  canShowDropZone = computed(() => {
    const list = this.items();
    if (list.length >= this.maxImages()) return false;
    return !list.some((it) => it.status === 'uploading');
  });

  openFileDialog() {
    this.fileInput()?.nativeElement?.click();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave() {
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.filesSelected.emit(Array.from(files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.filesSelected.emit(Array.from(input.files));
      input.value = '';
    }
  }

  onSetPrimary(event: Event, itemId: string) {
    event.stopPropagation();
    this.itemPrimaryChanged.emit(itemId);
  }

  onDelete(event: Event, itemId: string) {
    event.stopPropagation();
    this.itemDeleted.emit(itemId);
  }

  onRetry(event: Event, itemId: string) {
    event.stopPropagation();
    this.itemRetried.emit(itemId);
  }

  onImageDragStart(event: DragEvent, index: number) {
    const item = this.items()[index];
    if (item?.status === 'uploading') {
      event.preventDefault();
      return;
    }
    this.draggedIndex.set(index);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
    }
  }

  onImageDragOver(event: DragEvent, index: number) {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    this.dropTargetIndex.set(index);
  }

  onImageDrop(event: DragEvent, toIndex: number) {
    event.preventDefault();
    event.stopPropagation();
    const fromIndex = this.draggedIndex();
    if (fromIndex !== null && fromIndex !== toIndex) {
      this.itemReordered.emit({ fromIndex, toIndex });
    }
    this.draggedIndex.set(null);
    this.dropTargetIndex.set(null);
  }

  onImageDragEnd() {
    this.draggedIndex.set(null);
    this.dropTargetIndex.set(null);
  }
}
