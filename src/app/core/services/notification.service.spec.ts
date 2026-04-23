import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start with empty toasts', () => {
    expect(service.toasts()).toEqual([]);
  });

  it('should add a success toast', () => {
    service.success('Operation OK');

    const toasts = service.toasts();
    expect(toasts.length).toBe(1);
    expect(toasts[0].message).toBe('Operation OK');
    expect(toasts[0].type).toBe('success');
  });

  it('should add an error toast with default 5s duration', () => {
    service.error('Something failed');

    const toast = service.toasts()[0];
    expect(toast.type).toBe('error');
    expect(toast.duration).toBe(5000);
  });

  it('should add a warning toast', () => {
    service.warning('Be careful');

    expect(service.toasts()[0].type).toBe('warning');
    expect(service.toasts()[0].duration).toBe(4000);
  });

  it('should add an info toast', () => {
    service.info('FYI');

    expect(service.toasts()[0].type).toBe('info');
    expect(service.toasts()[0].duration).toBe(3000);
  });

  it('should support custom duration', () => {
    service.success('Quick', 1000);

    expect(service.toasts()[0].duration).toBe(1000);
  });

  it('should assign unique incremental ids', () => {
    service.success('First');
    service.error('Second');
    service.info('Third');

    const ids = service.toasts().map((t) => t.id);
    expect(ids[0]).toBe(0);
    expect(ids[1]).toBe(1);
    expect(ids[2]).toBe(2);
  });

  it('should dismiss a toast by id', () => {
    service.success('One');
    service.error('Two');

    const idToRemove = service.toasts()[0].id;
    service.dismiss(idToRemove);

    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Two');
  });

  it('should auto-dismiss after duration', () => {
    service.success('Auto', 2000);

    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(2000);

    expect(service.toasts().length).toBe(0);
  });

  it('should handle multiple toasts with different durations', () => {
    service.success('Short', 1000);
    service.error('Long', 3000);

    expect(service.toasts().length).toBe(2);

    vi.advanceTimersByTime(1000);
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Long');

    vi.advanceTimersByTime(2000);
    expect(service.toasts().length).toBe(0);
  });

  it('should not fail when dismissing non-existent id', () => {
    service.success('Test');
    service.dismiss(999);

    expect(service.toasts().length).toBe(1);
  });
});
