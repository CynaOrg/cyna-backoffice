import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { Admin, CreateAdminDto, UpdateAdminDto } from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminManagementService {
  private readonly api = inject(ApiService);
  private readonly basePath = 'admin/admins';

  getAdmins(): Observable<Admin[]> {
    return this.api.get<any>(this.basePath).pipe(
      map((res) => {
        if (Array.isArray(res)) return res;
        if (res?.data && Array.isArray(res.data)) return res.data;
        return [];
      }),
    );
  }

  getAdmin(adminId: string): Observable<Admin> {
    return this.api.get<Admin>(`${this.basePath}/${adminId}`);
  }

  createAdmin(dto: CreateAdminDto): Observable<Admin> {
    return this.api.post<CreateAdminDto, Admin>(this.basePath, dto);
  }

  updateAdmin(adminId: string, dto: UpdateAdminDto): Observable<Admin> {
    return this.api.patch<UpdateAdminDto, Admin>(`${this.basePath}/${adminId}`, dto);
  }

  deleteAdmin(adminId: string): Observable<void> {
    return this.api.delete<void>(`${this.basePath}/${adminId}`);
  }
}
