import { Injectable } from '@angular/core';
import { Observable, of, tap, shareReplay } from 'rxjs';

interface CacheEntry<T> {
  data: T;
  expiry: number;
}

@Injectable({ providedIn: 'root' })
export class CacheService {
  private readonly cache = new Map<string, CacheEntry<any>>();
  private readonly inflight = new Map<string, Observable<any>>();

  get<T>(key: string, fetcher: () => Observable<T>, ttlMs = 60_000): Observable<T> {
    const cached = this.cache.get(key);
    if (cached && Date.now() < cached.expiry) {
      return of(cached.data as T);
    }

    const existing = this.inflight.get(key);
    if (existing) return existing as Observable<T>;

    const request$ = fetcher().pipe(
      tap((data) => {
        this.cache.set(key, { data, expiry: Date.now() + ttlMs });
        this.inflight.delete(key);
      }),
      shareReplay(1),
    );

    this.inflight.set(key, request$);
    return request$;
  }

  invalidate(keyOrPrefix: string): void {
    if (keyOrPrefix.endsWith('*')) {
      const prefix = keyOrPrefix.slice(0, -1);
      for (const key of this.cache.keys()) {
        if (key.startsWith(prefix)) this.cache.delete(key);
      }
    } else {
      this.cache.delete(keyOrPrefix);
    }
  }

  clear(): void {
    this.cache.clear();
    this.inflight.clear();
  }
}
