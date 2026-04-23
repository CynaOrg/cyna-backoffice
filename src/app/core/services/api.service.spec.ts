import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('get', () => {
    it('should unwrap ApiResponse envelope', () => {
      let result: any;
      service.get<{ name: string }>('admin/test').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/admin/test`);
      req.flush({ data: { name: 'value' }, meta: { timestamp: '', requestId: '' } });

      expect(result).toEqual({ name: 'value' });
    });

    it('should pass query params', () => {
      service.get('admin/test', { status: 'active', page: 1 }).subscribe();

      const req = httpMock.expectOne((r) => r.url === `${baseUrl}/admin/test`);
      expect(req.request.params.get('status')).toBe('active');
      expect(req.request.params.get('page')).toBe('1');
      req.flush({ data: null });
    });

    it('should skip null/undefined params', () => {
      service.get('admin/test', { valid: 'yes', empty: undefined as any }).subscribe();

      const req = httpMock.expectOne((r) => r.url === `${baseUrl}/admin/test`);
      expect(req.request.params.get('valid')).toBe('yes');
      expect(req.request.params.has('empty')).toBe(false);
      req.flush({ data: null });
    });
  });

  describe('getRaw', () => {
    it('should return raw response without unwrapping', () => {
      let result: any;
      service.getRaw<{ raw: true }>('admin/raw').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/admin/raw`);
      req.flush({ raw: true });

      expect(result).toEqual({ raw: true });
    });
  });

  describe('getList', () => {
    it('should unwrap data array from envelope', () => {
      let result: any;
      service.getList<{ id: string }>('admin/items').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/admin/items`);
      req.flush({ data: [{ id: '1' }, { id: '2' }] });

      expect(result.length).toBe(2);
      expect(result[0].id).toBe('1');
    });
  });

  describe('getPaginated', () => {
    it('should return full paginated response', () => {
      let result: any;
      service
        .getPaginated<{ id: string }>('admin/paged', { page: 2 })
        .subscribe((r) => (result = r));

      const req = httpMock.expectOne((r) => r.url === `${baseUrl}/admin/paged`);
      req.flush({ data: [{ id: '1' }], total: 50, page: 2, limit: 10, totalPages: 5 });

      expect(result.total).toBe(50);
      expect(result.page).toBe(2);
      expect(result.data.length).toBe(1);
    });
  });

  describe('post', () => {
    it('should send body and unwrap response', () => {
      let result: any;
      service
        .post<{ name: string }, { id: string }>('admin/create', { name: 'test' })
        .subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/admin/create`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ name: 'test' });
      req.flush({ data: { id: 'new-id' } });

      expect(result).toEqual({ id: 'new-id' });
    });
  });

  describe('patch', () => {
    it('should send PATCH and unwrap response', () => {
      let result: any;
      service
        .patch<{ status: string }, { ok: boolean }>('admin/update/1', { status: 'active' })
        .subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/admin/update/1`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ data: { ok: true } });

      expect(result).toEqual({ ok: true });
    });
  });

  describe('delete', () => {
    it('should send DELETE and unwrap response', () => {
      let result: any;
      service.delete<void>('admin/remove/1').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/admin/remove/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ data: null });

      expect(result).toBeNull();
    });
  });
});
