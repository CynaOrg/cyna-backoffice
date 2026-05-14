import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let fixture: ComponentFixture<ConfirmModalComponent>;
  let component: ConfirmModalComponent;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: TranslateService,
          useValue: { instant: (k: string) => k },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => vi.useRealTimers());

  describe('resolved labels', () => {
    it('uses translation fallbacks when inputs are missing', () => {
      fixture.componentRef.setInput('open', false);
      fixture.detectChanges();
      expect(component.resolvedTitle()).toBe('COMMON.CONFIRM_TITLE');
      expect(component.resolvedMessage()).toBe('COMMON.CONFIRM_MESSAGE');
      expect(component.resolvedConfirmLabel()).toBe('COMMON.CONFIRM');
      expect(component.resolvedCancelLabel()).toBe('COMMON.CANCEL');
    });

    it('uses provided inputs verbatim', () => {
      fixture.componentRef.setInput('open', false);
      fixture.componentRef.setInput('title', 'Delete?');
      fixture.componentRef.setInput('message', 'Are you sure?');
      fixture.componentRef.setInput('confirmLabel', 'Yes');
      fixture.componentRef.setInput('cancelLabel', 'No');
      fixture.detectChanges();
      expect(component.resolvedTitle()).toBe('Delete?');
      expect(component.resolvedMessage()).toBe('Are you sure?');
      expect(component.resolvedConfirmLabel()).toBe('Yes');
      expect(component.resolvedCancelLabel()).toBe('No');
    });
  });

  describe('open state', () => {
    it('hides the dialog when open=false', () => {
      fixture.componentRef.setInput('open', false);
      fixture.detectChanges();
      expect(component.visible()).toBe(false);
    });

    it('shows the dialog when open=true', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();
      expect(component.visible()).toBe(true);
    });

    it('delays hiding by 200ms after open flips to false', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();
      expect(component.visible()).toBe(true);

      fixture.componentRef.setInput('open', false);
      fixture.detectChanges();
      // Still visible during fade-out
      expect(component.visible()).toBe(true);

      vi.advanceTimersByTime(200);
      expect(component.visible()).toBe(false);
    });
  });

  describe('outputs', () => {
    it('emits cancel when onCancel is called', () => {
      const spy = vi.fn();
      component.cancel.subscribe(spy);
      component.onCancel();
      expect(spy).toHaveBeenCalled();
    });

    it('emits confirm when the user clicks the confirm button', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();
      const spy = vi.fn();
      component.confirm.subscribe(spy);

      // Skip the rAF gates that toggle animateIn — the buttons are already
      // present in the DOM since visible() is true.
      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBe(2);
      (buttons[1] as HTMLButtonElement).click();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('variant', () => {
    it('renders the danger icon when variant=danger', () => {
      fixture.componentRef.setInput('open', true);
      fixture.componentRef.setInput('variant', 'danger');
      fixture.detectChanges();
      const html = fixture.nativeElement.innerHTML as string;
      expect(html).toContain('bg-error-light');
    });

    it('renders the primary icon when variant=primary (default)', () => {
      fixture.componentRef.setInput('open', true);
      fixture.detectChanges();
      const html = fixture.nativeElement.innerHTML as string;
      expect(html).toContain('bg-primary-light');
    });
  });
});
