import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ImageUploadComponent } from './image-upload.component';
import { ProductImage } from '../../../core/models/product.model';

const createMockImage = (overrides: Partial<ProductImage> = {}): ProductImage => ({
  id: 'img-001',
  imageUrl: 'https://pub.r2.dev/products/prod-001/image.jpg',
  altTextFr: 'Alt FR',
  altTextEn: 'Alt EN',
  isPrimary: false,
  displayOrder: 0,
  ...overrides,
});

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

  it('should render empty state with drop zone when no images', () => {
    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    const dropZone = el.querySelector('[class*="border-dashed"]');
    expect(dropZone).toBeTruthy();
    const grid = el.querySelector('[class*="grid"]');
    expect(grid).toBeFalsy();
  });

  it('should render image grid when images are provided', () => {
    // Arrange
    const images = [
      createMockImage({ id: 'img-001' }),
      createMockImage({ id: 'img-002', displayOrder: 1 }),
    ];
    componentRef.setInput('images', images);

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    const grid = el.querySelector('[class*="grid"]');
    expect(grid).toBeTruthy();
    const imgElements = el.querySelectorAll('img');
    expect(imgElements.length).toBe(2);
  });

  it('should emit filesSelected when files are selected via input', () => {
    // Arrange
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.filesSelected, 'emit');
    const file = new File(['data'], 'test.jpg', { type: 'image/jpeg' });

    // Act - call onFileSelected directly with a mock event
    const mockInput = { files: [file] as unknown as FileList, value: '' };
    component.onFileSelected({ target: mockInput } as unknown as Event);

    // Assert
    expect(emitSpy).toHaveBeenCalledTimes(1);
    const emittedFiles = emitSpy.mock.calls[0][0];
    expect(emittedFiles.length).toBe(1);
    expect(emittedFiles[0].name).toBe('test.jpg');
  });

  it('should emit imageReordered on drag and drop between images', () => {
    // Arrange
    const images = [
      createMockImage({ id: 'img-001', displayOrder: 0 }),
      createMockImage({ id: 'img-002', displayOrder: 1 }),
    ];
    componentRef.setInput('images', images);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.imageReordered, 'emit');

    // Act - call drag handlers directly (DragEvent not available in jsdom)
    const mockDragEvent = {
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      dataTransfer: { effectAllowed: '', dropEffect: '' },
    } as unknown as DragEvent;
    component.onImageDragStart(mockDragEvent, 0);
    component.onImageDrop(mockDragEvent, 1);

    // Assert
    expect(emitSpy).toHaveBeenCalledWith({ fromIndex: 0, toIndex: 1 });
  });

  it('should emit imageDeleted with correct ID when delete is clicked', () => {
    // Arrange
    const images = [createMockImage({ id: 'img-001' })];
    componentRef.setInput('images', images);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.imageDeleted, 'emit');

    // Act
    const mockEvent = new Event('click');
    vi.spyOn(mockEvent, 'stopPropagation');
    component.onDelete(mockEvent, 'img-001');

    // Assert
    expect(emitSpy).toHaveBeenCalledWith('img-001');
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it('should emit imagePrimaryChanged when set primary is clicked', () => {
    // Arrange
    const images = [createMockImage({ id: 'img-001', isPrimary: false })];
    componentRef.setInput('images', images);
    fixture.detectChanges();
    const emitSpy = vi.spyOn(component.imagePrimaryChanged, 'emit');

    // Act
    const mockEvent = new Event('click');
    component.onSetPrimary(mockEvent, 'img-001');

    // Assert
    expect(emitSpy).toHaveBeenCalledWith('img-001');
  });

  it('should hide drop zone when max images reached', () => {
    // Arrange
    const images = Array.from({ length: 10 }, (_, i) =>
      createMockImage({ id: `img-${i}`, displayOrder: i }),
    );
    componentRef.setInput('images', images);
    componentRef.setInput('maxImages', 10);

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    const dropZone = el.querySelector('[class*="border-dashed"]');
    expect(dropZone).toBeFalsy();
  });

  it('should display counter with correct format "X / 10"', () => {
    // Arrange
    const images = [
      createMockImage({ id: 'img-001' }),
      createMockImage({ id: 'img-002' }),
      createMockImage({ id: 'img-003' }),
    ];
    componentRef.setInput('images', images);
    componentRef.setInput('maxImages', 10);

    // Act
    fixture.detectChanges();

    // Assert
    const el = fixture.nativeElement as HTMLElement;
    const counter = el.querySelector('[class*="text-xs"]');
    expect(counter?.textContent?.trim()).toContain('3');
    expect(counter?.textContent?.trim()).toContain('10');
  });
});
