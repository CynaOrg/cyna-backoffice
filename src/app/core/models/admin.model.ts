export interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'commercial';
  isActive?: boolean;
  createdAt?: string;
  lastLoginAt?: string | null;
}

export interface AdminLoginResponse {
  requires2FA: boolean;
  tempToken: string;
  message: string;
}

export interface AdminAuthResponse {
  accessToken: string;
  expiresIn: number;
  admin: Admin;
}

export interface Admin2FAVerifyRequest {
  tempToken: string;
  code: string;
}

export interface CreateAdminDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'commercial';
}

export interface UpdateAdminDto {
  firstName?: string;
  lastName?: string;
  role?: 'super_admin' | 'commercial';
  isActive?: boolean;
}
