import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ToastContainerComponent } from './toast-container.component';
import { NotificationService, Toast } from '../../../core/services/notification.service';

describe('ToastContainerComponent', () => {
  let fixture: ComponentFixture<ToastContainerComponent>;
  let component: ToastContainerComponent;
  let toasts: ReturnType<typeof signal<Toast[]>>;
  const notifications = {
    dismiss: vi.fn(),
    toasts: undefined as never,
  };

  beforeEach(async () => {
    toasts = signal<Toast[]>([]);
    (notifications as unknown as { toasts: typeof toasts }).toasts = toasts;
    notifications.dismiss.mockClear();

    await TestBed.configureTestingModule({
      imports: [ToastContainerComponent],
      providers: [{ provide: NotificationService, useValue: notifications }],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastContainerComponent);
    component = fixture.componentInstance;
  });

  it('returns the right class for each toast type', () => {
    expect(component.getToastClass('success')).toContain('bg-emerald-500');
    expect(component.getToastClass('error')).toContain('bg-red-500');
    expect(component.getToastClass('warning')).toContain('bg-amber-500');
    expect(component.getToastClass('info')).toContain('bg-blue-500');
  });

  it('falls back to info classes for unknown types', () => {
    expect(component.getToastClass('mystery' as Toast['type'])).toContain('bg-blue-500');
  });

  it('renders one row per toast', () => {
    toasts.set([
      { id: '1', message: 'Hello', type: 'success', duration: 3000 },
      { id: '2', message: 'World', type: 'error', duration: 3000 },
    ]);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Hello');
    expect(text).toContain('World');
  });

  it('calls dismiss when the close button is clicked', () => {
    toasts.set([{ id: '1', message: 'Hi', type: 'info', duration: 3000 }]);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button')!.click();
    expect(notifications.dismiss).toHaveBeenCalledWith('1');
  });
});
