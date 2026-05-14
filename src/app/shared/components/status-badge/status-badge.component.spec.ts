import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EMPTY } from 'rxjs';
import { StatusBadgeComponent } from './status-badge.component';

describe('StatusBadgeComponent', () => {
  let fixture: ComponentFixture<StatusBadgeComponent>;
  let component: StatusBadgeComponent;

  function setup(translateMock?: Partial<TranslateService>) {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [StatusBadgeComponent, TranslateModule.forRoot()],
      providers: translateMock ? [{ provide: TranslateService, useValue: translateMock }] : [],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBadgeComponent);
    component = fixture.componentInstance;
  }

  beforeEach(() =>
    setup({
      instant: (k: string) => k,
      onLangChange: EMPTY,
      currentLang: 'fr',
    } as unknown as Partial<TranslateService>),
  );

  describe('displayLabel', () => {
    it('returns the explicit label when provided', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('label', 'Custom');
      expect(component.displayLabel()).toBe('Custom');
    });

    it('returns kebab-cased raw status when no translation is found', () => {
      fixture.componentRef.setInput('status', 'past_due');
      expect(component.displayLabel()).toBe('past due');
    });

    it('returns the translated value when present', () => {
      setup({
        instant: (k: string) => (k === 'STATUS.ACTIVE' ? 'Actif' : k),
        onLangChange: EMPTY,
        currentLang: 'fr',
      } as unknown as Partial<TranslateService>);
      fixture.componentRef.setInput('status', 'active');
      expect(component.displayLabel()).toBe('Actif');
    });

    it('returns empty string for an empty status', () => {
      fixture.componentRef.setInput('status', '');
      expect(component.displayLabel()).toBe('');
    });
  });

  describe('badgeClasses', () => {
    it('uses success colors for active', () => {
      fixture.componentRef.setInput('status', 'active');
      expect(component.badgeClasses()).toContain('bg-success-light');
    });

    it('falls back to neutral classes for unknown statuses', () => {
      fixture.componentRef.setInput('status', 'mystery');
      const classes = component.badgeClasses();
      expect(classes).toContain('bg-[#f3f4f6]');
      expect(classes).toContain('text-text-secondary');
    });
  });

  describe('dotClass', () => {
    it('returns the configured dot color for known statuses', () => {
      fixture.componentRef.setInput('status', 'pending');
      expect(component.dotClass()).toBe('bg-warning');
    });

    it('falls back to bg-text-muted for unknown statuses', () => {
      fixture.componentRef.setInput('status', 'mystery');
      expect(component.dotClass()).toBe('bg-text-muted');
    });
  });

  describe('template', () => {
    it('renders the displayLabel in the DOM', () => {
      fixture.componentRef.setInput('status', 'active');
      fixture.componentRef.setInput('label', 'Live');
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('Live');
    });
  });
});
