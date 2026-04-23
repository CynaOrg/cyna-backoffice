import { TestBed } from '@angular/core/testing';
import { of, delay } from 'rxjs';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should call fetcher on first access', () => {
    const fetcher = vi.fn(() => of('data'));

    let result: any;
    service.get('key', fetcher).subscribe((r) => (result = r));

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(result).toBe('data');
  });

  it('should return cached value on second access', () => {
    const fetcher = vi.fn(() => of('data'));

    service.get('key', fetcher).subscribe();
    service.get('key', fetcher).subscribe();

    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('should refetch after TTL expires', () => {
    let callCount = 0;
    const fetcher = vi.fn(() => of(`data-${++callCount}`));

    let result: any;
    service.get('key', fetcher, 1000).subscribe((r) => (result = r));
    expect(result).toBe('data-1');

    vi.advanceTimersByTime(1001);

    service.get('key', fetcher, 1000).subscribe((r) => (result = r));
    expect(result).toBe('data-2');
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('should deduplicate inflight requests', () => {
    const fetcher = vi.fn(() => of('data').pipe(delay(100)));

    const results: string[] = [];
    service.get('key', fetcher).subscribe((r) => results.push(r));
    service.get('key', fetcher).subscribe((r) => results.push(r));

    vi.advanceTimersByTime(100);

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(results).toEqual(['data', 'data']);
  });

  it('should invalidate a specific key', () => {
    const fetcher = vi.fn(() => of('data'));

    service.get('key', fetcher).subscribe();
    service.invalidate('key');
    service.get('key', fetcher).subscribe();

    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('should invalidate by prefix with wildcard', () => {
    const fetcher = vi.fn(() => of('data'));

    service.get('products:list', fetcher).subscribe();
    service.get('products:detail:1', fetcher).subscribe();
    service.get('orders:list', fetcher).subscribe();

    service.invalidate('products:*');

    service.get('products:list', fetcher).subscribe();
    service.get('products:detail:1', fetcher).subscribe();
    service.get('orders:list', fetcher).subscribe();

    // products refetched (2 more), orders from cache (0 more) = 3 initial + 2 = 5
    expect(fetcher).toHaveBeenCalledTimes(5);
  });

  it('should clear all cache', () => {
    const fetcher = vi.fn(() => of('data'));

    service.get('a', fetcher).subscribe();
    service.get('b', fetcher).subscribe();

    service.clear();

    service.get('a', fetcher).subscribe();
    service.get('b', fetcher).subscribe();

    expect(fetcher).toHaveBeenCalledTimes(4);
  });
});
