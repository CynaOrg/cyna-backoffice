import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AdminManagementService } from './admin-management.service';
import { ApiService } from './api.service';
import { CreateAdminDto, UpdateAdminDto } from '../models/admin.model';

describe('AdminManagementService', () => {
  let service: AdminManagementService;
  let api: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    api = { get: vi.fn(), post: vi.fn(), patch: vi.fn(), delete: vi.fn() };
    TestBed.configureTestingModule({
      providers: [AdminManagementService, { provide: ApiService, useValue: api }],
    });
    service = TestBed.inject(AdminManagementService);
  });

  describe('getAdmins()', () => {
    it('returns the array directly when the API returns a plain array', () => {
      api.get.mockReturnValue(of([{ id: '1' }, { id: '2' }]));
      let result: unknown;
      service.getAdmins().subscribe((r) => (result = r));
      expect(api.get).toHaveBeenCalledWith('admin/admins');
      expect(result).toEqual([{ id: '1' }, { id: '2' }]);
    });

    it('unwraps { data: [...] } shape', () => {
      api.get.mockReturnValue(of({ data: [{ id: '3' }] }));
      let result: unknown;
      service.getAdmins().subscribe((r) => (result = r));
      expect(result).toEqual([{ id: '3' }]);
    });

    it('falls back to empty array on unexpected payloads', () => {
      api.get.mockReturnValue(of(null));
      let result: unknown;
      service.getAdmins().subscribe((r) => (result = r));
      expect(result).toEqual([]);
    });
  });

  describe('getAdmin()', () => {
    it('queries the admin by id', () => {
      api.get.mockReturnValue(of({ id: 'a-1' }));
      let result: unknown;
      service.getAdmin('a-1').subscribe((r) => (result = r));
      expect(api.get).toHaveBeenCalledWith('admin/admins/a-1');
      expect(result).toEqual({ id: 'a-1' });
    });
  });

  describe('createAdmin()', () => {
    it('POSTs to the admins endpoint', () => {
      const dto: CreateAdminDto = {
        email: 'a@b.com',
        password: 'pw',
        firstName: 'A',
        lastName: 'B',
        role: 'commercial',
      };
      api.post.mockReturnValue(of({ id: 'new' }));
      let result: unknown;
      service.createAdmin(dto).subscribe((r) => (result = r));
      expect(api.post).toHaveBeenCalledWith('admin/admins', dto);
      expect(result).toEqual({ id: 'new' });
    });
  });

  describe('updateAdmin()', () => {
    it('PATCHes the admin', () => {
      const dto: UpdateAdminDto = { firstName: 'C' };
      api.patch.mockReturnValue(of({ id: 'a-1', firstName: 'C' }));
      service.updateAdmin('a-1', dto).subscribe();
      expect(api.patch).toHaveBeenCalledWith('admin/admins/a-1', dto);
    });
  });

  describe('deleteAdmin()', () => {
    it('DELETEs the admin', () => {
      api.delete.mockReturnValue(of(undefined));
      service.deleteAdmin('a-1').subscribe();
      expect(api.delete).toHaveBeenCalledWith('admin/admins/a-1');
    });
  });
});
