import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCardComponent } from './kpi-card.component';

describe('KpiCardComponent', () => {
  let fixture: ComponentFixture<KpiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [KpiCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(KpiCardComponent);
  });

  it('renders the value and label', () => {
    fixture.componentRef.setInput('value', '42');
    fixture.componentRef.setInput('label', 'Orders');
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('42');
    expect(text).toContain('Orders');
  });

  it('renders the positive variation with a + prefix', () => {
    fixture.componentRef.setInput('value', '10');
    fixture.componentRef.setInput('label', 'L');
    fixture.componentRef.setInput('variation', 12);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('+12%');
  });

  it('renders the negative variation without a + prefix', () => {
    fixture.componentRef.setInput('value', '10');
    fixture.componentRef.setInput('label', 'L');
    fixture.componentRef.setInput('variation', -8);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('-8%');
  });

  it('hides the variation badge when not provided', () => {
    fixture.componentRef.setInput('value', '10');
    fixture.componentRef.setInput('label', 'L');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('%');
  });

  it('falls back to inline SVG when iconName is empty', () => {
    fixture.componentRef.setInput('value', '10');
    fixture.componentRef.setInput('label', 'L');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('svg')).not.toBeNull();
  });
});
