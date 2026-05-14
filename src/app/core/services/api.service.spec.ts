import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
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

  afterEach(() => httpMock.verify());

  describe('get()', () => {
    it('unwraps data envelope', () => {
      let result: unknown;
      service.get<{ id: number }>('foo').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/foo`);
      expect(req.request.method).toBe('GET');
      req.flush({ data: { id: 42 } });

      expect(result).toEqual({ id: 42 });
    });

    it('serializes query params and skips null/undefined', () => {
      service
        .get('bar', { page: 1, q: 'x', enabled: true, missing: undefined as unknown as string })
        .subscribe();

      const req = httpMock.expectOne(
        (r) => r.url === `${baseUrl}/bar` && r.params.get('page') === '1',
      );
      expect(req.request.params.get('q')).toBe('x');
      expect(req.request.params.get('enabled')).toBe('true');
      expect(req.request.params.has('missing')).toBe(false);
      req.flush({ data: null });
    });

    it('propagates HTTP errors', () => {
      let err: unknown;
      service.get('bad').subscribe({ error: (e) => (err = e) });

      const req = httpMock.expectOne(`${baseUrl}/bad`);
      req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });

      expect(err).toBeInstanceOf(HttpErrorResponse);
    });
  });

  describe('getRaw()', () => {
    it('returns raw payload without unwrapping', () => {
      let result: unknown;
      service.getRaw<{ raw: true }>('raw').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/raw`);
      req.flush({ raw: true });

      expect(result).toEqual({ raw: true });
    });
  });

  describe('getList()', () => {
    it('unwraps array data', () => {
      let result: unknown;
      service.getList<number>('list').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/list`);
      req.flush({ data: [1, 2, 3] });

      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('getPaginated()', () => {
    it('returns paginated response untouched', () => {
      let result: unknown;
      service.getPaginated<{ id: number }>('page').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/page`);
      req.flush({ data: [{ id: 1 }], total: 1, page: 1, limit: 20, totalPages: 1 });

      expect(result).toEqual({
        data: [{ id: 1 }],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });
    });
  });

  describe('post()', () => {
    it('sends body and unwraps response', () => {
      let result: unknown;
      service.post('items', { name: 'x' }).subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/items`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ name: 'x' });
      req.flush({ data: { id: 'a' } });

      expect(result).toEqual({ id: 'a' });
    });
  });

  describe('postRaw()', () => {
    it('returns response without envelope unwrap', () => {
      let result: unknown;
      service.postRaw('items', { a: 1 }).subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/items`);
      req.flush({ ok: true });

      expect(result).toEqual({ ok: true });
    });
  });

  describe('patch()', () => {
    it('sends body and unwraps response', () => {
      let result: unknown;
      service.patch('items/1', { name: 'y' }).subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/items/1`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({ name: 'y' });
      req.flush({ data: { id: '1' } });

      expect(result).toEqual({ id: '1' });
    });
  });

  describe('patchRaw()', () => {
    it('returns raw response', () => {
      let result: unknown;
      service.patchRaw('items/1', { x: true }).subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/items/1`);
      req.flush({ done: true });

      expect(result).toEqual({ done: true });
    });
  });

  describe('delete()', () => {
    it('issues DELETE and unwraps data', () => {
      let result: unknown;
      service.delete('items/1').subscribe((r) => (result = r));

      const req = httpMock.expectOne(`${baseUrl}/items/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ data: null });

      expect(result).toBeNull();
    });
  });
});
