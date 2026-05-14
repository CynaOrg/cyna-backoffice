import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { AdminAuthService } from '../services/admin-auth.service';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let auth: {
    accessToken: () => string | null;
    refreshToken: ReturnType<typeof vi.fn>;
    clearSession: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    auth = {
      accessToken: vi.fn().mockReturnValue('jwt-1'),
      refreshToken: vi.fn(),
      clearSession: vi.fn(),
    };
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AdminAuthService, useValue: auth },
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('attaches Bearer token and withCredentials on API requests', () => {
    http.get('/api/v1/items').subscribe();
    const req = httpMock.expectOne('/api/v1/items');
    expect(req.request.headers.get('Authorization')).toBe('Bearer jwt-1');
    expect(req.request.withCredentials).toBe(true);
    req.flush(null);
  });

  it('skips Authorization on the login auth endpoint', () => {
    http.post('/api/v1/auth/admin/login', {}).subscribe();
    const req = httpMock.expectOne('/api/v1/auth/admin/login');
    expect(req.request.headers.get('Authorization')).toBeNull();
    req.flush(null);
  });

  it('passes non-API requests through untouched', () => {
    http.get('https://cdn.example.com/foo.json').subscribe();
    const req = httpMock.expectOne('https://cdn.example.com/foo.json');
    expect(req.request.headers.get('Authorization')).toBeNull();
    expect(req.request.withCredentials).toBeFalsy();
    req.flush(null);
  });

  it('does not add Authorization when there is no access token', () => {
    (auth.accessToken as ReturnType<typeof vi.fn>).mockReturnValue(null);
    http.get('/api/v1/items').subscribe();
    const req = httpMock.expectOne('/api/v1/items');
    expect(req.request.headers.get('Authorization')).toBeNull();
    expect(req.request.withCredentials).toBe(true);
    req.flush(null);
  });

  it('refreshes and retries on 401 for non-auth endpoints', () => {
    let received: unknown;
    auth.refreshToken.mockReturnValue(of({ accessToken: 'jwt-2' }));

    http.get('/api/v1/items').subscribe((r) => (received = r));

    const first = httpMock.expectOne('/api/v1/items');
    first.flush({ message: 'unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    expect(auth.refreshToken).toHaveBeenCalled();

    const retry = httpMock.expectOne('/api/v1/items');
    expect(retry.request.headers.get('Authorization')).toBe('Bearer jwt-2');
    retry.flush({ ok: true });

    expect(received).toEqual({ ok: true });
  });

  it('clears the session and propagates the error when refresh fails', () => {
    let err: unknown;
    auth.refreshToken.mockReturnValue(throwError(() => new Error('expired')));

    http.get('/api/v1/items').subscribe({ error: (e) => (err = e) });
    httpMock.expectOne('/api/v1/items').flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(auth.clearSession).toHaveBeenCalled();
    expect(err).toBeInstanceOf(Error);
  });

  it('does not refresh on 401 from auth endpoints', () => {
    let err: unknown;
    http.post('/api/v1/auth/admin/login', {}).subscribe({ error: (e) => (err = e) });
    httpMock
      .expectOne('/api/v1/auth/admin/login')
      .flush(null, { status: 401, statusText: 'Unauthorized' });
    expect(auth.refreshToken).not.toHaveBeenCalled();
    expect(err).toBeTruthy();
  });

  it('propagates non-401 errors without refreshing', () => {
    let err: unknown;
    http.get('/api/v1/items').subscribe({ error: (e) => (err = e) });
    httpMock.expectOne('/api/v1/items').flush(null, { status: 500, statusText: 'Server' });
    expect(auth.refreshToken).not.toHaveBeenCalled();
    expect(err).toBeTruthy();
  });
});
