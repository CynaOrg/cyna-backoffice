import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ providers: [NotificationService] });
    service = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('success()', () => {
    it('adds a success toast with default duration', () => {
      const id = service.success('Saved!');

      const toasts = service.toasts();
      expect(toasts.length).toBe(1);
      expect(toasts[0]).toMatchObject({ id, message: 'Saved!', type: 'success', duration: 3000 });
    });

    it('auto-dismisses after the configured duration', () => {
      service.success('hello', 1000);
      expect(service.toasts().length).toBe(1);

      vi.advanceTimersByTime(1000);
      expect(service.toasts().length).toBe(0);
    });
  });

  describe('error()', () => {
    it('adds an error toast with default duration of 5000ms', () => {
      service.error('Boom');
      expect(service.toasts()[0]).toMatchObject({ message: 'Boom', type: 'error', duration: 5000 });
    });
  });

  describe('warning()', () => {
    it('adds a warning toast', () => {
      service.warning('Careful');
      expect(service.toasts()[0]).toMatchObject({ type: 'warning', duration: 4000 });
    });
  });

  describe('info()', () => {
    it('adds an info toast', () => {
      service.info('FYI');
      expect(service.toasts()[0]).toMatchObject({ type: 'info', duration: 3000 });
    });
  });

  describe('duration <= 0', () => {
    it('keeps the toast indefinitely', () => {
      service.success('persistent', 0);
      vi.advanceTimersByTime(60_000);
      expect(service.toasts().length).toBe(1);
    });
  });

  describe('dismiss()', () => {
    it('removes the toast by id', () => {
      const id = service.success('keep me');
      service.dismiss(id);
      expect(service.toasts().length).toBe(0);
    });

    it('is a no-op for unknown ids', () => {
      service.success('a');
      service.dismiss('unknown-id');
      expect(service.toasts().length).toBe(1);
    });

    it('clears any pending timer so it cannot fire later', () => {
      const id = service.success('a', 1000);
      service.dismiss(id);
      // Re-add then advance — the cleared timer must not also drop the new toast.
      service.success('b', 5000);
      vi.advanceTimersByTime(1000);
      expect(service.toasts().length).toBe(1);
      expect(service.toasts()[0].message).toBe('b');
    });
  });

  describe('multiple toasts', () => {
    it('keeps them in insertion order', () => {
      service.info('first');
      service.info('second');
      service.info('third');
      expect(service.toasts().map((t) => t.message)).toEqual(['first', 'second', 'third']);
    });
  });
});
