import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
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
import { firstValueFrom } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { ImageService } from '../../../core/services/image.service';
import { Product, ProductImage, Category, UploadItem } from '../../../core/models/product.model';
import { ImageUploadComponent } from '../../../shared/components/image-upload/image-upload.component';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

const UPLOAD_CONCURRENCY = 3;

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
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  private readonly notifications = inject(NotificationService);
  private readonly translate = inject(TranslateService);
  private readonly imageService = inject(ImageService);
  private readonly location = inject(Location);

  isEdit = signal(false);
  loadingProduct = signal(false);
  saving = signal(false);
  savingLabel = signal<'PRODUCTS.SAVING' | 'PRODUCTS.UPLOADING_IMAGES'>('PRODUCTS.SAVING');
  categories = signal<Category[]>([]);
  product = signal<Product | null>(null);
  items = signal<UploadItem[]>([]);
  showDeleteImageModal = signal(false);
  deletingImageId = signal<string | null>(null);
  productId = '';
  basePath = '/products';
  newTitleKey = 'PRODUCTS.NEW_PRODUCT';
  fixedProductType: '' | 'physical' | 'saas' | 'license' = '';

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
        displayOrder: [this.characteristics.length],
      }),
    );
  }

  removeCharacteristic(index: number) {
    this.characteristics.removeAt(index);
  }

  ngOnInit(): void {
    const data = this.route.snapshot.data;
    if (data['basePath']) this.basePath = data['basePath'];
    if (data['newTitleKey']) this.newTitleKey = data['newTitleKey'];

    // PROD-6: when the route fixes a productType ('physical' / 'saas' / 'license'),
    // pre-select it on the form and disable/hide the selector.
    const routeProductType = data['productType'] as 'physical' | 'saas' | 'license' | undefined;
    if (routeProductType) {
      this.fixedProductType = routeProductType;
      this.form.patchValue({ productType: routeProductType });
      this.form.get('productType')?.disable({ emitEvent: false });
    }

    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit.set(true);
      this.productId = id;
      this.loadProduct(id);
    }
  }

  ngOnDestroy(): void {
    this.revokeAllLocalPreviewUrls();
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
        this.items.set(this.itemsFromProduct(p));
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
        this.characteristics.clear();
        if (p.characteristics?.length) {
          for (const [index, char] of p.characteristics.entries()) {
            this.characteristics.push(
              this.fb.group({
                keyFr: [char.keyFr || ''],
                keyEn: [char.keyEn || ''],
                valueFr: [char.valueFr || ''],
                valueEn: [char.valueEn || ''],
                displayOrder: [char.displayOrder ?? index],
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

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifications.error(this.translate.instant('PRODUCTS.FORM_INVALID'));
      this.focusFirstInvalidField();
      return;
    }
    this.saving.set(true);
    this.savingLabel.set('PRODUCTS.SAVING');

    const isEditing = this.isEdit();
    const payload = isEditing ? this.buildPatchPayload() : this.form.getRawValue();

    // PROD-8: in edit mode with no changes and no queued items, skip the API call.
    if (
      isEditing &&
      Object.keys(payload).length === 0 &&
      !this.items().some((it) => it.status === 'pending' || it.status === 'error')
    ) {
      this.saving.set(false);
      this.notifications.info(this.translate.instant('PRODUCTS.NO_CHANGES'));
      this.router.navigate([this.basePath, this.productId]);
      return;
    }

    try {
      let product: Product | null = this.product();
      const needsProductWrite = !isEditing || Object.keys(payload).length > 0;

      if (needsProductWrite) {
        const request$ = isEditing
          ? this.api.patch<Partial<Product>, Product>(
              `admin/catalog/products/${this.productId}`,
              payload as Partial<Product>,
            )
          : this.api.post<unknown, Product>('admin/catalog/products', payload);

        product = await firstValueFrom(request$);
        this.product.set(product);
        this.form.markAsPristine();
      }

      if (!product) throw new Error('Product creation returned no payload');

      if (!isEditing) {
        // Soft URL transition: stay on the same component, switch to edit mode in place,
        // so any failed uploads remain visible for retry without losing state.
        this.isEdit.set(true);
        this.productId = product.id;
        this.location.replaceState(`${this.basePath}/${product.id}/edit`);
      }

      this.notifications.success(
        isEditing
          ? this.translate.instant('PRODUCTS.UPDATED')
          : this.translate.instant('PRODUCTS.CREATED'),
      );

      const pendingItems = this.items().filter(
        (it) => it.status === 'pending' || it.status === 'error',
      );
      if (pendingItems.length > 0) {
        this.savingLabel.set('PRODUCTS.UPLOADING_IMAGES');
        await this.runUploadQueue(pendingItems.map((it) => it.id));
      }

      const failedCount = this.items().filter((it) => it.status === 'error').length;
      this.saving.set(false);
      this.savingLabel.set('PRODUCTS.SAVING');

      if (failedCount > 0) {
        this.notifications.error(
          this.translate.instant('PRODUCTS.IMAGES_PARTIAL_FAILURE', { count: failedCount }),
        );
        return;
      }

      this.router.navigate([this.basePath, product.id]);
    } catch (err) {
      this.saving.set(false);
      this.savingLabel.set('PRODUCTS.SAVING');
      const message =
        (err as { error?: { message?: string } })?.error?.message ||
        this.translate.instant('PRODUCTS.SAVE_ERROR');
      this.notifications.error(message);
    }
  }

  /**
   * Build a PATCH payload containing only fields that actually changed
   * compared to the loaded product. Keeps requests minimal and prevents
   * accidentally overwriting untouched fields.
   */
  private buildPatchPayload(): Partial<Product> {
    const original = this.product();
    if (!original) return this.form.value as Partial<Product>;

    const payload: Record<string, unknown> = {};
    const formValue = this.form.value as Record<string, unknown>;

    for (const [key, value] of Object.entries(formValue)) {
      if (key === 'characteristics') continue;
      const control = this.form.get(key);
      if (!control || !control.dirty) continue;
      const originalValue = (original as unknown as Record<string, unknown>)[key];
      if (!this.valuesEqual(value, originalValue)) {
        payload[key] = value;
      }
    }

    if (this.characteristics.dirty) {
      payload['characteristics'] = this.form.value.characteristics;
    }

    return payload as Partial<Product>;
  }

  private valuesEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (a == null && b == null) return true;
    if (a === '' && b == null) return true;
    if (b === '' && a == null) return true;
    return false;
  }

  // --- Item handlers ---

  onFilesSelected(files: File[]) {
    const current = this.items();
    const remaining = 10 - current.length;
    if (remaining <= 0) {
      this.notifications.error(this.translate.instant('IMAGE_UPLOAD.MAX_REACHED'));
      return;
    }

    const newItems: UploadItem[] = [];
    const hasAnyPrimary = current.some((it) => it.isPrimary);

    for (const file of files.slice(0, remaining)) {
      const validation = this.imageService.validateFile(file);
      if (!validation.valid) {
        this.notifications.error(validation.error!);
        continue;
      }
      newItems.push({
        id: this.generateClientId(),
        status: 'pending',
        previewUrl: URL.createObjectURL(file),
        isPrimary: !hasAnyPrimary && newItems.length === 0,
        order: current.length + newItems.length,
        file,
      });
    }

    if (newItems.length === 0) return;
    this.items.set([...current, ...newItems]);
  }

  onItemReordered({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) {
    const list = [...this.items()];
    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);
    const reordered = list.map((it, idx) => ({ ...it, order: idx }));
    this.items.set(reordered);

    // If all reordered items are already uploaded, persist the order server-side.
    const allUploaded = reordered.every((it) => it.status === 'uploaded' && it.productImage);
    if (allUploaded && this.productId) {
      const imageIds = reordered.map((it) => it.productImage!.id);
      this.imageService.reorderImages(this.productId, imageIds).subscribe({
        error: () => {
          this.reloadProductImages();
          this.notifications.error(this.translate.instant('PRODUCTS.IMAGE_REORDER_ERROR'));
        },
      });
    }
  }

  onItemPrimaryChanged(itemId: string) {
    this.items.update((list) => list.map((it) => ({ ...it, isPrimary: it.id === itemId })));

    const item = this.items().find((it) => it.id === itemId);
    if (item?.status === 'uploaded' && item.productImage && this.productId) {
      this.api
        .patch<
          unknown,
          unknown
        >(`admin/catalog/products/${this.productId}/images/${item.productImage.id}/primary`, {})
        .subscribe({
          error: () => {
            this.reloadProductImages();
            this.notifications.error(this.translate.instant('PRODUCTS.IMAGE_PRIMARY_ERROR'));
          },
        });
    }
  }

  onItemDeleted(itemId: string) {
    const item = this.items().find((it) => it.id === itemId);
    if (!item) return;

    if (item.status === 'uploaded' && item.productImage) {
      this.deletingImageId.set(item.productImage.id);
      this.showDeleteImageModal.set(true);
      return;
    }

    // Pending / uploading / error: drop locally and revoke the objectURL.
    this.revokeLocalPreviewUrl(item);
    this.items.update((list) => list.filter((it) => it.id !== itemId));
  }

  onItemRetried(itemId: string) {
    const item = this.items().find((it) => it.id === itemId);
    if (!item || item.status !== 'error') return;
    this.runUploadQueue([itemId]);
  }

  confirmDeleteImage() {
    const productImageId = this.deletingImageId();
    this.showDeleteImageModal.set(false);
    this.deletingImageId.set(null);
    if (!productImageId || !this.productId) return;

    this.imageService.deleteImage(this.productId, productImageId).subscribe({
      next: () => {
        this.items.update((list) => list.filter((it) => it.productImage?.id !== productImageId));
        const p = this.product();
        if (p) {
          this.product.set({
            ...p,
            images: p.images.filter((img) => img.id !== productImageId),
          });
        }
        this.notifications.success(this.translate.instant('PRODUCTS.IMAGE_DELETED'));
      },
      error: (err: { error?: { message?: string } }) => {
        this.notifications.error(
          err.error?.message || this.translate.instant('PRODUCTS.IMAGE_DELETE_ERROR'),
        );
      },
    });
  }

  // --- Upload queue ---

  private async runUploadQueue(itemIds: string[]): Promise<void> {
    if (!this.productId) return;
    // Reset any prior error state on retried items so the UI reflects retry intent.
    this.items.update((list) =>
      list.map((it) =>
        itemIds.includes(it.id) && it.status === 'error'
          ? { ...it, status: 'pending', errorMessage: undefined }
          : it,
      ),
    );

    const queue = [...itemIds];
    const worker = async (): Promise<void> => {
      while (queue.length > 0) {
        const id = queue.shift();
        if (!id) return;
        await this.uploadOne(id);
      }
    };

    const workers = Array.from({ length: Math.min(UPLOAD_CONCURRENCY, itemIds.length) }, () =>
      worker(),
    );
    await Promise.all(workers);

    // After all uploads settle, if every item is uploaded, persist the user-defined order.
    const all = this.items();
    const allUploaded =
      all.length > 0 && all.every((it) => it.status === 'uploaded' && it.productImage);
    if (allUploaded) {
      const imageIds = all.map((it) => it.productImage!.id);
      this.imageService.reorderImages(this.productId, imageIds).subscribe({
        error: () => {
          /* non-fatal: leave the server-side order as-is */
        },
      });
    }
  }

  private async uploadOne(itemId: string): Promise<void> {
    const item = this.items().find((it) => it.id === itemId);
    if (!item || !item.file) return;

    this.updateItem(itemId, { status: 'uploading', progress: 0, errorMessage: undefined });

    try {
      const presigned = await firstValueFrom(
        this.imageService.requestUploadUrl(this.productId, item.file),
      );

      await new Promise<void>((resolve, reject) => {
        this.imageService.uploadToR2(item.file!, presigned.uploadUrl).subscribe({
          next: (progress) => {
            this.updateItem(itemId, { progress: progress.progress });
          },
          error: (err) => reject(err),
          complete: () => resolve(),
        });
      });

      const confirmed = await firstValueFrom(
        this.imageService.confirmUpload(this.productId, {
          storageKey: presigned.storageKey,
          isPrimary: item.isPrimary,
        }),
      );

      // Adopt remote URL, then revoke the local preview to release the blob.
      const oldPreviewUrl = item.previewUrl;
      this.updateItem(itemId, {
        status: 'uploaded',
        progress: 100,
        productImage: confirmed,
        previewUrl: confirmed.imageUrl,
        file: undefined,
      });
      if (oldPreviewUrl.startsWith('blob:')) URL.revokeObjectURL(oldPreviewUrl);
    } catch (err) {
      const message =
        (err as { error?: { message?: string } })?.error?.message ||
        (err as Error)?.message ||
        this.translate.instant('IMAGE_UPLOAD.UPLOAD_FAILED');
      this.updateItem(itemId, { status: 'error', errorMessage: message, progress: undefined });
    }
  }

  // --- Helpers ---

  private updateItem(itemId: string, patch: Partial<UploadItem>): void {
    this.items.update((list) => list.map((it) => (it.id === itemId ? { ...it, ...patch } : it)));
  }

  private itemsFromProduct(p: Product): UploadItem[] {
    return (p.images ?? [])
      .slice()
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .map((img, index) => ({
        id: img.id,
        status: 'uploaded' as const,
        previewUrl: img.imageUrl,
        isPrimary: img.isPrimary,
        order: index,
        productImage: img,
      }));
  }

  private generateClientId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `local-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  private revokeLocalPreviewUrl(item: UploadItem): void {
    if (item.previewUrl?.startsWith('blob:')) URL.revokeObjectURL(item.previewUrl);
  }

  private revokeAllLocalPreviewUrls(): void {
    for (const it of this.items()) this.revokeLocalPreviewUrl(it);
  }

  private reloadProductImages() {
    if (!this.productId) return;
    this.api.get<Product>(`admin/catalog/products/${this.productId}`).subscribe({
      next: (p) => {
        this.product.set(p);
        this.items.set(this.itemsFromProduct(p));
      },
    });
  }

  isInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return !!control && control.invalid && control.touched;
  }

  private focusFirstInvalidField(): void {
    const firstInvalid = Object.keys(this.form.controls).find((name) => {
      const control = this.form.get(name);
      return control?.invalid && control?.enabled;
    });
    if (!firstInvalid) return;
    setTimeout(() => {
      const el = document.querySelector<HTMLElement>(`[formcontrolname="${firstInvalid}"]`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus({ preventScroll: true });
    }, 0);
  }
}
