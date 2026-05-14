import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { ContentComponent } from './content.component';
import { ContentService } from '../../core/services/content.service';
import { NotificationService } from '../../core/services/notification.service';
import { CarouselSlide, HeroText, TopProductConfig } from '../../core/models/content.model';

describe('ContentComponent', () => {
  let fixture: ComponentFixture<ContentComponent>;
  let component: ContentComponent;
  let content: {
    getCarouselSlides: ReturnType<typeof vi.fn>;
    createSlide: ReturnType<typeof vi.fn>;
    updateSlide: ReturnType<typeof vi.fn>;
    deleteSlide: ReturnType<typeof vi.fn>;
    reorderCarousel: ReturnType<typeof vi.fn>;
    getHeroText: ReturnType<typeof vi.fn>;
    updateHeroText: ReturnType<typeof vi.fn>;
    getTopConfig: ReturnType<typeof vi.fn>;
    updateTopConfig: ReturnType<typeof vi.fn>;
    requestCarouselUploadUrl: ReturnType<typeof vi.fn>;
    uploadBlobToPresignedUrl: ReturnType<typeof vi.fn>;
  };
  let notifications: {
    success: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };

  function makeSlide(over: Partial<CarouselSlide> = {}): CarouselSlide {
    return {
      id: 's1',
      titleFr: 'Titre',
      titleEn: 'Title',
      subtitleFr: '',
      subtitleEn: '',
      imageUrl: 'http://img/x.jpg',
      linkTextFr: '',
      linkTextEn: '',
      linkUrl: '',
      isActive: true,
      displayOrder: 0,
      createdAt: '2026-01-01',
      updatedAt: '2026-01-01',
      ...over,
    };
  }

  function makeHero(): HeroText {
    return {
      id: 'h1',
      titleFr: 'HT FR',
      titleEn: 'HT EN',
      subtitleFr: 'HS FR',
      subtitleEn: 'HS EN',
      updatedAt: '2026-01-01',
    };
  }

  function makeTopConfig(over: Partial<TopProductConfig> = {}): TopProductConfig {
    return {
      id: 'tc1',
      type: 'top_services',
      productIds: ['p1', 'p2'],
      updatedAt: '2026-01-01',
      ...over,
    };
  }

  beforeEach(async () => {
    content = {
      getCarouselSlides: vi.fn().mockReturnValue(of([])),
      createSlide: vi.fn().mockReturnValue(of(makeSlide())),
      updateSlide: vi.fn().mockReturnValue(of(makeSlide())),
      deleteSlide: vi.fn().mockReturnValue(of(void 0)),
      reorderCarousel: vi.fn().mockReturnValue(of(void 0)),
      getHeroText: vi.fn().mockReturnValue(of(null)),
      updateHeroText: vi.fn().mockReturnValue(of(makeHero())),
      getTopConfig: vi.fn().mockReturnValue(of(makeTopConfig())),
      updateTopConfig: vi.fn().mockReturnValue(of(makeTopConfig())),
      requestCarouselUploadUrl: vi.fn().mockReturnValue(
        of({
          uploadUrl: 'http://upload/',
          storageKey: 'k',
          publicUrl: 'http://cdn/x.jpg',
          expiresAt: '',
        }),
      ),
      uploadBlobToPresignedUrl: vi.fn().mockReturnValue(of(void 0)),
    };
    notifications = { success: vi.fn(), error: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [ContentComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ContentService, useValue: content },
        { provide: NotificationService, useValue: notifications },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('loads slides, top configs and hero on init', () => {
      content.getCarouselSlides.mockReturnValue(of([makeSlide()]));
      content.getHeroText.mockReturnValue(of(makeHero()));
      fixture.detectChanges();
      expect(content.getCarouselSlides).toHaveBeenCalled();
      expect(content.getTopConfig).toHaveBeenCalledTimes(3);
      expect(content.getHeroText).toHaveBeenCalled();
      expect(component.slides().length).toBe(1);
    });

    it('sorts slides by displayOrder', () => {
      content.getCarouselSlides.mockReturnValue(
        of([makeSlide({ id: 'b', displayOrder: 2 }), makeSlide({ id: 'a', displayOrder: 0 })]),
      );
      fixture.detectChanges();
      expect(component.slides()[0].id).toBe('a');
    });

    it('shows error toast when loading slides fails', () => {
      content.getCarouselSlides.mockReturnValue(throwError(() => new Error('500')));
      fixture.detectChanges();
      expect(notifications.error).toHaveBeenCalled();
      expect(component.loadingSlides()).toBe(false);
    });

    it('hydrates hero form when hero text exists', () => {
      content.getHeroText.mockReturnValue(of(makeHero()));
      fixture.detectChanges();
      expect(component.heroForm.value.titleFr).toBe('HT FR');
    });

    it('handles top config errors gracefully', () => {
      content.getTopConfig.mockReturnValue(throwError(() => new Error('500')));
      fixture.detectChanges();
      expect(component.loadingTopConfig()).toBe(false);
    });
  });

  describe('slide modal', () => {
    beforeEach(() => fixture.detectChanges());

    it('opens with empty form when no slide is passed', () => {
      component.openSlideModal();
      expect(component.showSlideModal()).toBe(true);
      expect(component.editingSlide()).toBeNull();
    });

    it('opens with patched values for an existing slide', () => {
      const slide = makeSlide({ titleFr: 'A', linkUrl: 'http://x' });
      component.openSlideModal(slide);
      expect(component.editingSlide()).toBe(slide);
      expect(component.slideForm.value.titleFr).toBe('A');
    });

    it('toggleSlideActive flips the active flag', () => {
      component.slideForm.patchValue({ isActive: true });
      component.toggleSlideActive();
      expect(component.slideForm.value.isActive).toBe(false);
    });

    it('aborts saving when the form is invalid', () => {
      component.slideForm.reset();
      component.saveSlide();
      expect(content.createSlide).not.toHaveBeenCalled();
      expect(content.updateSlide).not.toHaveBeenCalled();
    });

    it('creates a new slide and reloads', () => {
      component.openSlideModal();
      component.slideForm.patchValue({
        titleFr: 'A',
        titleEn: 'B',
        imageUrl: 'http://img',
      });
      component.saveSlide();
      expect(content.createSlide).toHaveBeenCalled();
      expect(notifications.success).toHaveBeenCalled();
      expect(component.showSlideModal()).toBe(false);
    });

    it('updates an existing slide', () => {
      const slide = makeSlide({ id: 's-7' });
      component.openSlideModal(slide);
      component.saveSlide();
      expect(content.updateSlide).toHaveBeenCalledWith('s-7', expect.any(Object));
    });

    it('shows error toast when saving fails', () => {
      component.openSlideModal();
      component.slideForm.patchValue({
        titleFr: 'A',
        titleEn: 'B',
        imageUrl: 'http://img',
      });
      content.createSlide.mockReturnValue(throwError(() => ({ error: { message: 'fail' } })));
      component.saveSlide();
      expect(notifications.error).toHaveBeenCalledWith('fail');
      expect(component.savingSlide()).toBe(false);
    });
  });

  describe('delete slide', () => {
    beforeEach(() => {
      content.getCarouselSlides.mockReturnValue(of([makeSlide()]));
      fixture.detectChanges();
    });

    it('opens the delete modal on confirmDeleteSlide', () => {
      const slide = makeSlide();
      component.confirmDeleteSlide(slide);
      expect(component.showDeleteSlideModal()).toBe(true);
      expect(component.slideToDelete()).toBe(slide);
    });

    it('deleteSlide is a no-op without a target', () => {
      component.deleteSlide();
      expect(content.deleteSlide).not.toHaveBeenCalled();
    });

    it('deletes and removes from the list on success', () => {
      const slide = makeSlide();
      component.confirmDeleteSlide(slide);
      component.deleteSlide();
      expect(content.deleteSlide).toHaveBeenCalledWith('s1');
      expect(component.slides()).toEqual([]);
      expect(component.showDeleteSlideModal()).toBe(false);
    });

    it('handles delete error gracefully', () => {
      content.deleteSlide.mockReturnValue(throwError(() => ({ error: { message: 'no' } })));
      component.confirmDeleteSlide(makeSlide());
      component.deleteSlide();
      expect(notifications.error).toHaveBeenCalledWith('no');
      expect(component.showDeleteSlideModal()).toBe(false);
    });
  });

  describe('moveSlide', () => {
    beforeEach(() => {
      content.getCarouselSlides.mockReturnValue(
        of([
          makeSlide({ id: 'a', displayOrder: 0 }),
          makeSlide({ id: 'b', displayOrder: 1 }),
          makeSlide({ id: 'c', displayOrder: 2 }),
        ]),
      );
      fixture.detectChanges();
    });

    it('moves a slide down and persists the order', () => {
      component.moveSlide(0, 'down');
      expect(component.slides()[0].id).toBe('b');
      expect(content.reorderCarousel).toHaveBeenCalledWith(['b', 'a', 'c']);
      expect(notifications.success).toHaveBeenCalled();
    });

    it('moves a slide up', () => {
      component.moveSlide(2, 'up');
      expect(component.slides()[1].id).toBe('c');
    });

    it('is a no-op when target is out of bounds', () => {
      content.reorderCarousel.mockClear();
      component.moveSlide(0, 'up');
      expect(content.reorderCarousel).not.toHaveBeenCalled();
    });

    it('reloads slides on reorder failure', () => {
      content.reorderCarousel.mockReturnValue(throwError(() => new Error('x')));
      content.getCarouselSlides.mockClear();
      component.moveSlide(0, 'down');
      expect(notifications.error).toHaveBeenCalled();
      expect(content.getCarouselSlides).toHaveBeenCalled();
    });
  });

  describe('top products picker', () => {
    beforeEach(() => {
      content.getTopConfig.mockImplementation((type: string) =>
        of(makeTopConfig({ productIds: type === 'top_services' ? ['s1'] : ['p1'] })),
      );
      fixture.detectChanges();
    });

    it('opens for services with saas product type', () => {
      component.openPicker('top_services');
      expect(component.showPicker()).toBe(true);
      expect(component.pickerProductType()).toBe('saas');
      expect(component.pickerSelectedIds()).toEqual(['s1']);
      expect(component.pickerTitleKey()).toBe('CONTENT.PICK_SERVICES');
    });

    it('opens for physical products', () => {
      component.openPicker('top_products');
      expect(component.pickerProductType()).toBe('physical');
    });

    it('opens for licenses', () => {
      component.openPicker('top_licenses');
      expect(component.pickerProductType()).toBe('license');
    });

    it('saves selected ids to the right target', () => {
      component.pickerTarget.set('top_services');
      component.onPickerSaved(['a', 'b']);
      expect(content.updateTopConfig).toHaveBeenCalledWith('top_services', {
        productIds: ['a', 'b'],
      });
      expect(notifications.success).toHaveBeenCalled();
      expect(component.topServicesIds()).toEqual(['a', 'b']);
    });

    it('saves to top_products and updates state', () => {
      component.pickerTarget.set('top_products');
      component.onPickerSaved(['x']);
      expect(component.topProductsIds()).toEqual(['x']);
    });

    it('saves to top_licenses and updates state', () => {
      component.pickerTarget.set('top_licenses');
      component.onPickerSaved(['y']);
      expect(component.topLicensesIds()).toEqual(['y']);
    });

    it('shows error toast when saving config fails', () => {
      content.updateTopConfig.mockReturnValue(throwError(() => ({ error: { message: 'boom' } })));
      component.pickerTarget.set('top_services');
      component.onPickerSaved(['a']);
      expect(notifications.error).toHaveBeenCalledWith('boom');
      expect(component.savingTopConfig()).toBe(false);
    });
  });

  describe('hero text', () => {
    beforeEach(() => fixture.detectChanges());

    it('saves hero text via the service', () => {
      component.heroForm.patchValue({ titleFr: 'X' });
      component.saveHeroText();
      expect(content.updateHeroText).toHaveBeenCalled();
      expect(notifications.success).toHaveBeenCalled();
      expect(component.savingHero()).toBe(false);
    });

    it('shows error toast on save failure', () => {
      content.updateHeroText.mockReturnValue(throwError(() => ({ error: { message: 'no' } })));
      component.saveHeroText();
      expect(notifications.error).toHaveBeenCalledWith('no');
    });
  });

  describe('onCarouselFileSelected', () => {
    beforeEach(() => fixture.detectChanges());

    function makeEvent(file: File | null): Event {
      const input = document.createElement('input');
      Object.defineProperty(input, 'files', {
        value: file ? [file] : [],
      });
      return { target: input } as unknown as Event;
    }

    it('ignores when no file is selected', () => {
      component.onCarouselFileSelected(makeEvent(null));
      expect(content.requestCarouselUploadUrl).not.toHaveBeenCalled();
    });

    it('rejects unsupported types', () => {
      const file = new File(['x'], 'a.gif', { type: 'image/gif' });
      component.onCarouselFileSelected(makeEvent(file));
      expect(notifications.error).toHaveBeenCalled();
      expect(content.requestCarouselUploadUrl).not.toHaveBeenCalled();
    });

    it('rejects files larger than the max size', () => {
      const big = new File([new ArrayBuffer(6 * 1024 * 1024)], 'a.png', { type: 'image/png' });
      component.onCarouselFileSelected(makeEvent(big));
      expect(notifications.error).toHaveBeenCalled();
      expect(content.requestCarouselUploadUrl).not.toHaveBeenCalled();
    });

    it('uploads then patches imageUrl on success', () => {
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      component.onCarouselFileSelected(makeEvent(file));
      expect(content.requestCarouselUploadUrl).toHaveBeenCalled();
      expect(component.slideForm.value.imageUrl).toBe('http://cdn/x.jpg');
      expect(component.carouselUploading()).toBe(false);
    });

    it('maps 413 status to UPLOAD_TOO_LARGE', () => {
      content.requestCarouselUploadUrl.mockReturnValue(throwError(() => ({ status: 413 })));
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      component.onCarouselFileSelected(makeEvent(file));
      expect(notifications.error).toHaveBeenCalledWith('CONTENT.UPLOAD_TOO_LARGE');
    });

    it('maps 415 status to UPLOAD_INVALID_TYPE', () => {
      content.requestCarouselUploadUrl.mockReturnValue(throwError(() => ({ status: 415 })));
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      component.onCarouselFileSelected(makeEvent(file));
      expect(notifications.error).toHaveBeenCalledWith('CONTENT.UPLOAD_INVALID_TYPE');
    });

    it('maps 0 status to UPLOAD_NETWORK', () => {
      content.requestCarouselUploadUrl.mockReturnValue(throwError(() => ({ status: 0 })));
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      component.onCarouselFileSelected(makeEvent(file));
      expect(notifications.error).toHaveBeenCalledWith('CONTENT.UPLOAD_NETWORK');
    });

    it('maps other statuses to UPLOAD_FAILED', () => {
      content.requestCarouselUploadUrl.mockReturnValue(throwError(() => ({ status: 500 })));
      const file = new File(['x'], 'a.png', { type: 'image/png' });
      component.onCarouselFileSelected(makeEvent(file));
      expect(notifications.error).toHaveBeenCalledWith('CONTENT.UPLOAD_FAILED');
    });
  });
});
