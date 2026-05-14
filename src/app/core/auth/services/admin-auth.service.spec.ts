import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AdminAuthService } from './admin-auth.service';
import { environment } from '../../../../environments/environment';

describe('AdminAuthService', () => {
  let service: AdminAuthService;
  let httpMock: HttpTestingController;
  let router: { navigate: ReturnType<typeof vi.fn> };
  const base = `${environment.apiUrl}/auth/admin`;

  beforeEach(() => {
    router = { navigate: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        AdminAuthService,
        { provide: Router, useValue: router },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AdminAuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  describe('login()', () => {
    it('sends credentials and stores tempToken when 2FA is required', () => {
      let result: unknown;
      service.login('a@b.com', 'pw').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${base}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'a@b.com', password: 'pw' });
      req.flush({
        data: { requires2FA: true, tempToken: 'tmp-123', message: 'check your email' },
      });

      expect(result).toMatchObject({ requires2FA: true, tempToken: 'tmp-123' });
      expect(service.tempToken()).toBe('tmp-123');
    });

    it('does not store tempToken when 2FA is not required', () => {
      service.login('a@b.com', 'pw').subscribe();
      const req = httpMock.expectOne(`${base}/login`);
      req.flush({ data: { requires2FA: false, tempToken: '', message: '' } });
      expect(service.tempToken()).toBeNull();
    });
  });

  describe('verify2FA()', () => {
    it('exchanges the temp token + code for an access token and admin', () => {
      // seed the temp token via login()
      service.login('a@b.com', 'pw').subscribe();
      httpMock
        .expectOne(`${base}/login`)
        .flush({ data: { requires2FA: true, tempToken: 'tmp-x', message: '' } });

      service.verify2FA('123456').subscribe();
      const req = httpMock.expectOne(`${base}/verify-2fa`);
      expect(req.request.body).toEqual({ tempToken: 'tmp-x', code: '123456' });
      req.flush({
        data: {
          accessToken: 'jwt-1',
          expiresIn: 3600,
          admin: { id: 'a1', email: 'a@b.com', firstName: 'A', lastName: 'B', role: 'commercial' },
        },
      });

      expect(service.accessToken()).toBe('jwt-1');
      expect(service.admin()?.id).toBe('a1');
      expect(service.tempToken()).toBeNull();
      expect(service.isAuthenticated()).toBe(true);
      expect(service.isCommercial()).toBe(true);
      expect(service.isSuperAdmin()).toBe(false);
    });
  });

  describe('resend2FA()', () => {
    it('reuses the temp token and stores the rotated one', () => {
      service.login('a@b.com', 'pw').subscribe();
      httpMock
        .expectOne(`${base}/login`)
        .flush({ data: { requires2FA: true, tempToken: 'old', message: '' } });

      service.resend2FA().subscribe();
      const req = httpMock.expectOne(`${base}/resend-2fa`);
      expect(req.request.body).toEqual({ tempToken: 'old' });
      req.flush({ data: { requires2FA: true, tempToken: 'new', message: '' } });
      expect(service.tempToken()).toBe('new');
    });
  });

  describe('refreshToken()', () => {
    it('updates accessToken + admin on success', () => {
      service.refreshToken().subscribe();
      const req = httpMock.expectOne(`${base}/refresh-token`);
      expect(req.request.withCredentials).toBe(true);
      req.flush({
        data: {
          accessToken: 'new-jwt',
          expiresIn: 3600,
          admin: { id: 'a2', email: 'x@y', firstName: 'X', lastName: 'Y', role: 'super_admin' },
        },
      });
      expect(service.accessToken()).toBe('new-jwt');
      expect(service.isSuperAdmin()).toBe(true);
    });

    it('clears the session on error', () => {
      let err: unknown;
      service.refreshToken().subscribe({ error: (e) => (err = e) });
      httpMock.expectOne(`${base}/refresh-token`).flush(null, { status: 401, statusText: 'no' });
      expect(err).toBeTruthy();
      expect(service.accessToken()).toBeNull();
      expect(service.admin()).toBeNull();
    });
  });

  describe('logout()', () => {
    it('calls /logout when a token is present, clears the session, and navigates to /login', () => {
      // seed an access token by going through 2FA verify
      service.login('a@b.com', 'pw').subscribe();
      httpMock
        .expectOne(`${base}/login`)
        .flush({ data: { requires2FA: true, tempToken: 't', message: '' } });
      service.verify2FA('1').subscribe();
      httpMock.expectOne(`${base}/verify-2fa`).flush({
        data: {
          accessToken: 'jwt',
          expiresIn: 1,
          admin: { id: 'a', email: 'x', firstName: 'F', lastName: 'L', role: 'commercial' },
        },
      });

      service.logout();
      const req = httpMock.expectOne(`${base}/logout`);
      expect(req.request.withCredentials).toBe(true);
      req.flush(null);

      expect(service.accessToken()).toBeNull();
      expect(service.admin()).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('skips the /logout HTTP call when no token is present', () => {
      service.logout();
      httpMock.expectNone(`${base}/logout`);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('swallows server errors during logout', () => {
      service.login('a@b.com', 'pw').subscribe();
      httpMock
        .expectOne(`${base}/login`)
        .flush({ data: { requires2FA: true, tempToken: 't', message: '' } });
      service.verify2FA('1').subscribe();
      httpMock.expectOne(`${base}/verify-2fa`).flush({
        data: {
          accessToken: 'jwt',
          expiresIn: 1,
          admin: { id: 'a', email: 'x', firstName: 'F', lastName: 'L', role: 'commercial' },
        },
      });

      service.logout();
      httpMock.expectOne(`${base}/logout`).flush(null, { status: 500, statusText: 'err' });
      // No throw means swallowed
      expect(service.accessToken()).toBeNull();
    });
  });

  describe('clearSession()', () => {
    it('resets all auth signals', () => {
      service.login('a@b.com', 'pw').subscribe();
      httpMock
        .expectOne(`${base}/login`)
        .flush({ data: { requires2FA: true, tempToken: 't', message: '' } });
      service.clearSession();
      expect(service.tempToken()).toBeNull();
      expect(service.accessToken()).toBeNull();
      expect(service.admin()).toBeNull();
    });
  });

  describe('fetchMe()', () => {
    it('normalizes empty-string timestamps and stores the admin', () => {
      let result: unknown;
      service.fetchMe().subscribe((r) => (result = r));
      const req = httpMock.expectOne(`${base}/me`);
      req.flush({
        data: {
          id: 'a',
          email: 'x',
          firstName: 'F',
          lastName: 'L',
          role: 'commercial',
          createdAt: '',
          lastLoginAt: '',
        },
      });
      expect(result).toMatchObject({ createdAt: undefined, lastLoginAt: null });
      expect(service.admin()?.id).toBe('a');
    });

    it('keeps real timestamps untouched', () => {
      service.fetchMe().subscribe();
      httpMock.expectOne(`${base}/me`).flush({
        data: {
          id: 'a',
          email: 'x',
          firstName: 'F',
          lastName: 'L',
          role: 'commercial',
          createdAt: '2026-01-01',
          lastLoginAt: '2026-05-01',
        },
      });
      expect(service.admin()?.createdAt).toBe('2026-01-01');
      expect(service.admin()?.lastLoginAt).toBe('2026-05-01');
    });
  });

  describe('tryRestoreSession()', () => {
    it('refreshes, then fetches /me, then resolves with the refresh payload', () => {
      let result: unknown;
      service.tryRestoreSession().subscribe((r) => (result = r));

      httpMock.expectOne(`${base}/refresh-token`).flush({
        data: {
          accessToken: 'jwt',
          expiresIn: 1,
          admin: { id: 'a', email: 'x', firstName: 'F', lastName: 'L', role: 'commercial' },
        },
      });
      httpMock.expectOne(`${base}/me`).flush({
        data: { id: 'a', email: 'x', firstName: 'F', lastName: 'L', role: 'commercial' },
      });
      expect(result).toMatchObject({ accessToken: 'jwt' });
    });

    it('still resolves when /me fails after a successful refresh', () => {
      let result: unknown;
      service.tryRestoreSession().subscribe((r) => (result = r));

      httpMock.expectOne(`${base}/refresh-token`).flush({
        data: {
          accessToken: 'jwt',
          expiresIn: 1,
          admin: { id: 'a', email: 'x', firstName: 'F', lastName: 'L', role: 'commercial' },
        },
      });
      httpMock.expectOne(`${base}/me`).flush(null, { status: 500, statusText: 'err' });
      expect(result).toMatchObject({ accessToken: 'jwt' });
    });
  });
});
