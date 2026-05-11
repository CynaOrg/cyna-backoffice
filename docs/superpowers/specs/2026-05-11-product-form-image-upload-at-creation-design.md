# Product form: image upload at creation time

**Date:** 2026-05-11
**Branch:** `fix/product-form-image-upload-at-creation`
**Repo:** `cyna-backoffice`
**Scope:** Front office only. **Zero backend change.**

## Problem

Today, the back office product form (`ProductFormComponent`) only renders the image upload UI when `isEdit()` is `true`. In create mode, a fallback panel asks the user to "save first, then upload images". This forces a two-step flow:

1. Fill the create form, submit
2. Get redirected to `/products/:id/edit`
3. Only there, the upload zone becomes available

The code itself flags this as temporary — `product-form.component.ts:592` carries a `TODO(PROD-9): polished 2-step UX (queue files in memory then upload after create)`.

The bad UX hits all three product types (saas, physical, license).

## Why this exists

The image upload endpoints (`POST /admin/catalog/products/:id/images/upload-url`, `POST /admin/catalog/products/:id/images/confirm`) all require an existing `productId`. There is no draft-product concept and no "pre-create images" endpoint. The fix has to live entirely on the client.

## Goal

The user picks images in the same form as everything else, including in create mode. Submitting the form creates the product *and* uploads its images as a single user action. No redirect-to-edit detour.

## Industry pattern reference

Behavior modeled on Shopify / Stripe / Linear product galleries:

- One unified upload component, **state-agnostic** — it renders a list of items, each carries its own status
- **Optimistic local previews** (via `URL.createObjectURL`) appear instantly on drop
- **Per-tile error state** with retry button (not a single global "X failed" message)
- **Parallel uploads** with concurrency limit (3) — faster than serial, still safe
- **Soft URL transition** after create (no full Angular navigation) so retries don't lose state

## Design

### 1. Unified item model

Replace the current two-prop split (`images: ProductImage[]` for edit, nothing for create) with a single discriminated union:

```ts
type UploadItem = {
  id: string;                   // client-side uuid, stable across lifecycle
  status: 'pending' | 'uploading' | 'uploaded' | 'error';
  previewUrl: string;           // objectURL for pending/uploading/error, remote URL for uploaded
  isPrimary: boolean;
  order: number;
  file?: File;                  // present unless status === 'uploaded'
  productImage?: ProductImage;  // present only when status === 'uploaded'
  errorMessage?: string;        // present only when status === 'error'
  progress?: number;            // 0–100, present only when status === 'uploading'
};
```

The component receives one prop: `items: UploadItem[]`. The parent (`ProductFormComponent`) owns the array and decides what each item is.

### 2. `ImageUploadComponent` refactor

**Inputs**
- `items = input<UploadItem[]>([])`
- `maxImages = input<number>(10)`
- (drop the existing `images`, `isUploading`, `uploadProgress` inputs — superseded by per-item status)

**Outputs**
- `filesAdded = output<File[]>()` — user dropped/picked new files
- `itemReordered = output<{ fromIndex: number; toIndex: number }>()`
- `itemPrimaryChanged = output<string>()` — payload is `UploadItem.id`
- `itemDeleted = output<string>()` — payload is `UploadItem.id`
- `itemRetried = output<string>()` — payload is `UploadItem.id`, new event for the per-tile retry button

**Rendering per status**
- `pending` — full-opacity tile with a faint "en attente" badge top-right; primary star + delete buttons available; drag-reorderable
- `uploading` — overlay with circular progress (per tile, not global); buttons disabled; not drag-reorderable
- `uploaded` — current edit-mode rendering (unchanged)
- `error` — red border, retry icon button visible on hover (alongside delete), `errorMessage` shown as `title` attribute

The drop zone above the grid stays as today.

### 3. `ProductFormComponent` orchestration

**State**
- New `items = signal<UploadItem[]>([])` — single source of truth for the gallery
- In `loadProduct()` (edit mode), seed `items` from `product.images` with `status: 'uploaded'`
- In create mode, `items` starts empty

**Event handlers**
- `onFilesAdded(files)` — validate via `ImageService.validateFile`, create `UploadItem` entries with `status: 'pending'`, mint `previewUrl` via `URL.createObjectURL`, set `isPrimary: true` on the first one if no existing primary
- `onItemReordered` / `onItemPrimaryChanged` / `onItemDeleted` — pure state mutations on the `items` signal in both modes; `delete` also calls the existing API when the item is `uploaded`
- `onItemDeleted` for a `pending`/`uploading`/`error` item revokes its `objectURL` and removes it from the array — no API call
- `onItemRetried` — flips the item back to `pending` and reschedules its upload (see below)

**Submit flow (create)**
1. `POST /admin/catalog/products` — unchanged
2. On success:
   - Set `product.set(created)`, `productId = created.id`, `isEdit.set(true)`
   - Use `Location.replaceState('/{basePath}/{id}/edit')` — **not** `router.navigate`, to preserve form state
   - Show success toast `PRODUCTS.CREATED` immediately
3. If there are `pending` items, kick off the upload queue
4. When the queue settles:
   - All `uploaded` → `router.navigateByUrl('/{basePath}/{id}')` (soft nav to detail page)
   - At least one `error` → stay on the edit page; show toast `PRODUCTS.IMAGES_PARTIAL_FAILURE` with the count

**Submit flow (edit)** — unchanged. Image uploads in edit mode already work; the only change there is that the gallery now goes through the unified item model.

### 4. Upload queue

A small helper inside the form component (no separate service needed yet):

```ts
private async runUploadQueue(items: UploadItem[]): Promise<void>
```

- Concurrency: 3 simultaneous uploads max (matches Shopify's behavior, keeps R2 happy)
- For each pending item: `requestUploadUrl(productId, file)` → `uploadToR2` (subscribe to progress, update `item.progress` and `item.status` reactively) → `confirmUpload(productId, { storageKey, isPrimary })`
- On success: mutate the item to `status: 'uploaded'`, attach `productImage`, swap `previewUrl` to the remote URL, revoke the old objectURL
- On failure: mutate to `status: 'error'`, attach `errorMessage` from the API response
- Returns when all items have settled (no rejection — partial failure is normal)

`itemRetried` calls this same helper for a single item.

### 5. Cleanup

- Remove the `@else` fallback block at `product-form.component.ts:592-616`
- Remove the i18n keys `PRODUCTS.IMAGES_AFTER_CREATE` (FR + EN)
- Remove the `TODO(PROD-9)` markers (`product-form.component.ts:592` and the redirect-to-edit at `:823`)
- Remove the old uploader state signals `uploadingImages`, `uploadProgress` (replaced by per-item state)

### 6. Memory hygiene

`URL.createObjectURL` returns must be revoked, otherwise the browser holds the file blob alive:
- On item deletion (pending/uploading/error)
- On promotion from `uploading` to `uploaded` (right after we adopt the remote URL)
- On component destroy (`ngOnDestroy`), iterate over `items` and revoke any objectURL we still hold

### 7. i18n additions

New keys (FR + EN):
- `IMAGE_UPLOAD.STATUS_PENDING` — "En attente" / "Pending"
- `IMAGE_UPLOAD.STATUS_UPLOADING` — "Envoi en cours…" / "Uploading…"
- `IMAGE_UPLOAD.STATUS_ERROR` — "Échec" / "Failed"
- `IMAGE_UPLOAD.RETRY` — "Réessayer" / "Retry"
- `PRODUCTS.UPLOADING_IMAGES` — "Envoi des images…" / "Uploading images…"
- `PRODUCTS.IMAGES_PARTIAL_FAILURE` — "{count} image(s) n'ont pas pu être envoyées. Réessayez depuis la galerie." / "{count} image(s) could not be uploaded. Retry from the gallery."

## Tests

**Unit / component**
- `image-upload.component.spec.ts` — update existing tests to use the new `items` input; add cases for each of the four statuses; add a case for the retry button event
- `product-form.component.spec.ts` — if it does not already exist, scaffold it; cover:
  - Create flow with no images (regression: existing behavior)
  - Create flow with N queued images, all succeed
  - Create flow where 2 of 5 fail — verify items stay in `error`, URL replaced to `/edit`, partial-failure toast fired
  - Retry on an `error` item flips back to `pending` and triggers the upload helper

**Manual verification**
- All three productType routes (saas / physical / license)
- Drag & drop, file picker, removing a pending item, marking primary before upload
- Network throttling: confirm progress per tile is visible
- Force an upload failure (block R2 in DevTools) and verify partial-failure flow
- Memory: open DevTools Memory tab, queue 10 images, delete them, confirm objectURLs are revoked (no leaked blobs)

## Out of scope

- Backend changes (no draft-product endpoint, no batch upload endpoint)
- Resumable uploads / chunked uploads
- Replacing the star-primary pattern with "position 0 = primary" (refactor would touch edit mode too; kept consistent with current pattern)
- Image cropping / editing in-form

## Files touched

- `src/app/features/products/product-form/product-form.component.ts` — orchestration, state, event handlers, submit flow
- `src/app/shared/components/image-upload/image-upload.component.ts` — input/output shape, per-status rendering, retry event
- `src/app/shared/components/image-upload/image-upload.component.spec.ts` — updated tests
- `src/app/features/products/product-form/product-form.component.spec.ts` — new tests (if missing)
- `src/app/core/models/product.model.ts` — possibly add the `UploadItem` type, or co-locate it with the component
- `src/assets/i18n/fr.json` / `en.json` — new keys, remove `IMAGES_AFTER_CREATE`
