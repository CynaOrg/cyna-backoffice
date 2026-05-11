import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ImageUploadComponent } from './image-upload.component';
import { ProductImage, UploadItem, UploadItemStatus } from '../../../core/models/product.model';

const createMockImage = (overrides: Partial<ProductImage> = {}): ProductImage => ({
  id: 'img-001',
  imageUrl: 'https://pub.r2.dev/products/prod-001/image.jpg',
  altTextFr: 'Alt FR',
  altTextEn: 'Alt EN',
  isPrimary: false,
  displayOrder: 0,
  ...overrides,
});

const createMockItem = (overrides: Partial<UploadItem> = {}): UploadItem => {
  const status: UploadItemStatus = overrides.status ?? 'uploaded';
  const baseImage = createMockImage({ id: overrides.id ?? 'img-001' });
  return {
    id: overrides.id ?? 'img-001',
    status,
    previewUrl: status === 'uploaded' ? baseImage.imageUrl : 'blob:http://localhost/abc',
    isPrimary: false,
    order: 0,
    productImage: status === 'uploaded' ? baseImage : undefined,
    ...overrides,
  };
};

describe('ImageUploadComponent', () => {
  let component: ImageUploadComponent;
  let fixture: ComponentFixture<ImageUploadComponent>;
  let componentRef: ComponentRef<ImageUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageUploadComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageUploadComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should render empty state with drop zone when no items', () => {
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const dropZone = el.querySelector('[class*="border-dashed"]');
    expect(dropZone).toBeTruthy();
    const grid = el.querySelector('[class*="grid-cols-2"]');
    expect(grid).toBeFalsy();
  });

  it('should render image grid when items are provided', () => {
    const items = [createMockItem({ id: 'item-1' }), createMockItem({ id: 'item-2', order: 1 })];
    componentRef.setInput('items', items);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const imgElements = el.querySelectorAll('img');
    expect(imgElements.length).toBe(2);
  });

  it('should emit filesSelected when files are selected via input', () => {
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.filesSelected, 'emit');
    const file = new File(['data'], 'test.jpg', { type: 'image/jpeg' });

    const mockInput = { files: [file] as unknown as FileList, value: '' };
    component.onFileSelected({ target: mockInput } as unknown as Event);

    expect(emitSpy).toHaveBeenCalledTimes(1);
    const emittedFiles = emitSpy.mock.calls[0][0];
    expect(emittedFiles.length).toBe(1);
    expect(emittedFiles[0].name).toBe('test.jpg');
  });

  it('should emit itemReordered on drag and drop between items', () => {
    const items = [createMockItem({ id: 'item-1' }), createMockItem({ id: 'item-2', order: 1 })];
    componentRef.setInput('items', items);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.itemReordered, 'emit');

    const mockDragEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      dataTransfer: { effectAllowed: '', dropEffect: '' },
    } as unknown as DragEvent;
    component.onImageDragStart(mockDragEvent, 0);
    component.onImageDrop(mockDragEvent, 1);

    expect(emitSpy).toHaveBeenCalledWith({ fromIndex: 0, toIndex: 1 });
  });

  it('should not start drag for an uploading item', () => {
    const items = [createMockItem({ id: 'item-1', status: 'uploading', progress: 42 })];
    componentRef.setInput('items', items);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.itemReordered, 'emit');

    const preventDefault = vi.fn();
    const mockDragEvent = {
      preventDefault,
      stopPropagation: vi.fn(),
      dataTransfer: { effectAllowed: '', dropEffect: '' },
    } as unknown as DragEvent;
    component.onImageDragStart(mockDragEvent, 0);
    component.onImageDrop(mockDragEvent, 0);

    expect(preventDefault).toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit itemDeleted with correct id when delete is clicked', () => {
    const items = [createMockItem({ id: 'item-1' })];
    componentRef.setInput('items', items);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.itemDeleted, 'emit');

    const mockEvent = new Event('click');
    vi.spyOn(mockEvent, 'stopPropagation');
    component.onDelete(mockEvent, 'item-1');

    expect(emitSpy).toHaveBeenCalledWith('item-1');
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should emit itemPrimaryChanged when set primary is clicked', () => {
    const items = [createMockItem({ id: 'item-1', isPrimary: false })];
    componentRef.setInput('items', items);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.itemPrimaryChanged, 'emit');

    const mockEvent = new Event('click');
    component.onSetPrimary(mockEvent, 'item-1');

    expect(emitSpy).toHaveBeenCalledWith('item-1');
  });

  it('should emit itemRetried when retry is clicked on an errored item', () => {
    const items = [
      createMockItem({ id: 'item-1', status: 'error', errorMessage: 'Network error' }),
    ];
    componentRef.setInput('items', items);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.itemRetried, 'emit');

    const mockEvent = new Event('click');
    vi.spyOn(mockEvent, 'stopPropagation');
    component.onRetry(mockEvent, 'item-1');

    expect(emitSpy).toHaveBeenCalledWith('item-1');
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should hide drop zone when max images reached', () => {
    const items = Array.from({ length: 10 }, (_, i) =>
      createMockItem({ id: `item-${i}`, order: i }),
    );
    componentRef.setInput('items', items);
    componentRef.setInput('maxImages', 10);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const dropZone = el.querySelector('[class*="border-dashed"]');
    expect(dropZone).toBeFalsy();
  });

  it('should hide drop zone while any item is uploading', () => {
    const items = [createMockItem({ id: 'item-1', status: 'uploading', progress: 30 })];
    componentRef.setInput('items', items);
    componentRef.setInput('maxImages', 10);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const dropZone = el.querySelector('[class*="border-dashed"]');
    expect(dropZone).toBeFalsy();
  });

  it('should display counter with correct format "X / 10"', () => {
    const items = [
      createMockItem({ id: 'item-1' }),
      createMockItem({ id: 'item-2' }),
      createMockItem({ id: 'item-3' }),
    ];
    componentRef.setInput('items', items);
    componentRef.setInput('maxImages', 10);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const counter = el.querySelector('[class*="text-xs"]');
    expect(counter?.textContent?.trim()).toContain('3');
    expect(counter?.textContent?.trim()).toContain('10');
  });

  it('should render per-tile progress for uploading items', () => {
    const items = [createMockItem({ id: 'item-1', status: 'uploading', progress: 73 })];
    componentRef.setInput('items', items);

    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('73%');
  });
});
