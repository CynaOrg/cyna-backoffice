import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Admin, CreateAdminDto, UpdateAdminDto } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminManagementService {
  private readonly api = inject(ApiService);
  private readonly basePath = 'admin/admins';

  getAdmins(): Observable<Admin[]> {
    return this.api.getRaw<Admin[]>(this.basePath);
  }

  getAdmin(adminId: string): Observable<Admin> {
    return this.api.getRaw<Admin>(`${this.basePath}/${adminId}`);
  }

  createAdmin(dto: CreateAdminDto): Observable<Admin> {
    return this.api.postRaw<CreateAdminDto, Admin>(this.basePath, dto);
  }

  updateAdmin(adminId: string, dto: UpdateAdminDto): Observable<Admin> {
    return this.api.patchRaw<UpdateAdminDto, Admin>(`${this.basePath}/${adminId}`, dto);
  }

  deleteAdmin(adminId: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${adminId}`);
  }
}
