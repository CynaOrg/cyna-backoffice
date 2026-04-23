import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';
import { environment } from '../../../../environments/environment';

describe('AdminAuthService', () => {
  let service: AdminAuthService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.apiUrl}/auth/admin`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminAuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });

    service = TestBed.inject(AdminAuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should start unauthenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
    expect(service.admin()).toBeNull();
    expect(service.accessToken()).toBeNull();
  });

  describe('login', () => {
    it('should store tempToken when 2FA required', () => {
      service.login('admin@test.com', 'password').subscribe();

      const req = httpMock.expectOne(`${baseUrl}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'admin@test.com', password: 'password' });

      req.flush({
        data: { requires2FA: true, tempToken: 'temp-123' },
      });

      expect(service.tempToken()).toBe('temp-123');
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('verify2FA', () => {
    it('should set accessToken and admin on success', () => {
      const mockAdmin = {
        id: '1',
        email: 'admin@test.com',
        role: 'super_admin',
        firstName: 'Admin',
      };

      service.verify2FA('123456').subscribe();

      const req = httpMock.expectOne(`${baseUrl}/verify-2fa`);
      expect(req.request.method).toBe('POST');

      req.flush({
        data: { accessToken: 'jwt-token', admin: mockAdmin },
      });

      expect(service.accessToken()).toBe('jwt-token');
      expect(service.admin()).toEqual(mockAdmin);
      expect(service.isAuthenticated()).toBe(true);
      expect(service.isSuperAdmin()).toBe(true);
      expect(service.tempToken()).toBeNull();
    });
  });

  describe('clearSession', () => {
    it('should reset all state', () => {
      // Simulate authenticated state via verify2FA
      service.verify2FA('code').subscribe();
      httpMock
        .expectOne(`${baseUrl}/verify-2fa`)
        .flush({ data: { accessToken: 'token', admin: { role: 'super_admin' } } });

      expect(service.isAuthenticated()).toBe(true);

      service.clearSession();

      expect(service.isAuthenticated()).toBe(false);
      expect(service.admin()).toBeNull();
      expect(service.accessToken()).toBeNull();
    });
  });

  describe('isSuperAdmin / isCommercial', () => {
    it('should return true for super_admin role', () => {
      service.verify2FA('code').subscribe();
      httpMock
        .expectOne(`${baseUrl}/verify-2fa`)
        .flush({ data: { accessToken: 'token', admin: { role: 'super_admin' } } });

      expect(service.isSuperAdmin()).toBe(true);
      expect(service.isCommercial()).toBe(false);
    });

    it('should return true for commercial role', () => {
      service.verify2FA('code').subscribe();
      httpMock
        .expectOne(`${baseUrl}/verify-2fa`)
        .flush({ data: { accessToken: 'token', admin: { role: 'commercial' } } });

      expect(service.isSuperAdmin()).toBe(false);
      expect(service.isCommercial()).toBe(true);
    });
  });

  describe('refreshToken', () => {
    it('should update tokens on success', () => {
      const mockAdmin = { id: '1', role: 'super_admin' };

      service.refreshToken().subscribe();

      const req = httpMock.expectOne(`${baseUrl}/refresh-token`);
      expect(req.request.method).toBe('POST');
      expect(req.request.withCredentials).toBe(true);

      req.flush({ data: { accessToken: 'new-token', admin: mockAdmin } });

      expect(service.accessToken()).toBe('new-token');
      expect(service.admin()).toEqual(mockAdmin);
    });

    it('should clear session on refresh failure', () => {
      service.refreshToken().subscribe({ error: () => {} });

      httpMock
        .expectOne(`${baseUrl}/refresh-token`)
        .flush(null, { status: 401, statusText: 'Unauthorized' });

      expect(service.isAuthenticated()).toBe(false);
    });
  });
});
