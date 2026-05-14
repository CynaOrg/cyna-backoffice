import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { errorInterceptor } from './error.interceptor';
import { NotificationService } from '../../services/notification.service';

describe('errorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let notifications: { error: ReturnType<typeof vi.fn> };
  let translate: { instant: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    notifications = { error: vi.fn() };
    translate = { instant: vi.fn((k: string) => k) };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: NotificationService, useValue: notifications },
        { provide: TranslateService, useValue: translate },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  function flushError(
    url: string,
    status: number,
    body: unknown = null,
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  ): void {
    const obs =
      method === 'GET'
        ? http.get(url)
        : method === 'POST'
          ? http.post(url, {})
          : method === 'PATCH'
            ? http.patch(url, {})
            : http.delete(url);
    obs.subscribe({ error: () => {} });
    httpMock.expectOne(url).flush((body ?? '') as string, { status, statusText: 'err' });
  }

  it('shows network toast on status 0', () => {
    flushError('/api/v1/foo', 0);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.NETWORK');
  });

  it('stays silent on status 0 for the refresh-token boot probe', () => {
    flushError('/api/v1/auth/admin/refresh-token', 0);
    expect(notifications.error).not.toHaveBeenCalled();
  });

  it('translates auth 400 to AUTH_INVALID', () => {
    flushError('/api/v1/auth/admin/login', 400, null, 'POST');
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.AUTH_INVALID');
  });

  it('uses server message on 400 for non-auth endpoints', () => {
    flushError('/api/v1/items', 400, { message: 'Validation failed' }, 'POST');
    expect(notifications.error).toHaveBeenCalledWith('Validation failed');
  });

  it('falls back to BAD_REQUEST when 400 has no server message', () => {
    flushError('/api/v1/items', 400, null, 'POST');
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.BAD_REQUEST');
  });

  it('shows AUTH_INVALID on 401 from auth endpoints', () => {
    flushError('/api/v1/auth/admin/login', 401, null, 'POST');
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.AUTH_INVALID');
  });

  it('stays silent on 401 from non-auth endpoints', () => {
    flushError('/api/v1/items', 401);
    expect(notifications.error).not.toHaveBeenCalled();
  });

  it('shows FORBIDDEN on 403', () => {
    flushError('/api/v1/items', 403);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.FORBIDDEN');
  });

  it('shows NOT_FOUND on 404 for resource detail GET (UUID)', () => {
    flushError('/api/v1/items/aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee', 404);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.NOT_FOUND');
  });

  it('shows NOT_FOUND on 404 for resource detail GET (numeric id)', () => {
    flushError('/api/v1/items/42', 404);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.NOT_FOUND');
  });

  it('stays silent on 404 collection GET', () => {
    flushError('/api/v1/items', 404);
    expect(notifications.error).not.toHaveBeenCalled();
  });

  it('shows NOT_FOUND on 404 PATCH', () => {
    flushError('/api/v1/items', 404, null, 'PATCH');
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.NOT_FOUND');
  });

  it('stays silent on 404 from refresh-token endpoint', () => {
    flushError('/api/v1/auth/admin/refresh-token', 404, null, 'POST');
    expect(notifications.error).not.toHaveBeenCalled();
  });

  it('prefers server message on 409', () => {
    flushError('/api/v1/items', 409, { message: 'Already exists' }, 'POST');
    expect(notifications.error).toHaveBeenCalledWith('Already exists');
  });

  it('falls back to CONFLICT key on 409', () => {
    flushError('/api/v1/items', 409, null, 'POST');
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.CONFLICT');
  });

  it('joins array server messages on 422', () => {
    flushError('/api/v1/items', 422, { message: ['nameFr required', 'sku required'] }, 'POST');
    expect(notifications.error).toHaveBeenCalledWith('nameFr required, sku required');
  });

  it('shows TOO_MANY_REQUESTS on 429', () => {
    flushError('/api/v1/items', 429);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.TOO_MANY_REQUESTS');
  });

  it('shows SERVER on 500', () => {
    flushError('/api/v1/items', 500);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.SERVER');
  });

  it('shows SERVER on 502', () => {
    flushError('/api/v1/items', 502);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.SERVER');
  });

  it('shows SERVICE_UNAVAILABLE on 503', () => {
    flushError('/api/v1/items', 503);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.SERVICE_UNAVAILABLE');
  });

  it('shows SERVICE_UNAVAILABLE on 504', () => {
    flushError('/api/v1/items', 504);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.SERVICE_UNAVAILABLE');
  });

  it('default branch: 418 falls through GENERIC', () => {
    flushError('/api/v1/items', 418);
    expect(notifications.error).toHaveBeenCalledWith('ERRORS.GENERIC');
  });
});
