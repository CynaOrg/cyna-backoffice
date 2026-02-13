import {
  Router
} from "./chunk-D4TFPFZU.js";
import {
  HttpClient,
  environment
} from "./chunk-IBCBMH7I.js";
import {
  Injectable,
  catchError,
  computed,
  inject,
  map,
  setClassMetadata,
  signal,
  tap,
  throwError,
  ɵɵdefineInjectable
} from "./chunk-7J6Y2ARR.js";

// src/app/core/auth/services/admin-auth.service.ts
var AdminAuthService = class _AdminAuthService {
  http = inject(HttpClient);
  router = inject(Router);
  baseUrl = `${environment.apiUrl}/auth/admin`;
  _admin = signal(null, ...ngDevMode ? [{ debugName: "_admin" }] : []);
  _accessToken = signal(null, ...ngDevMode ? [{ debugName: "_accessToken" }] : []);
  _tempToken = signal(null, ...ngDevMode ? [{ debugName: "_tempToken" }] : []);
  admin = this._admin.asReadonly();
  accessToken = this._accessToken.asReadonly();
  tempToken = this._tempToken.asReadonly();
  isAuthenticated = computed(() => !!this._accessToken(), ...ngDevMode ? [{ debugName: "isAuthenticated" }] : []);
  isSuperAdmin = computed(() => this._admin()?.role === "super_admin", ...ngDevMode ? [{ debugName: "isSuperAdmin" }] : []);
  isCommercial = computed(() => this._admin()?.role === "commercial", ...ngDevMode ? [{ debugName: "isCommercial" }] : []);
  login(email, password) {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(map((r) => r.data), tap((response) => {
      if (response.requires2FA) {
        this._tempToken.set(response.tempToken);
      }
    }));
  }
  verify2FA(code) {
    const tempToken = this._tempToken();
    return this.http.post(`${this.baseUrl}/verify-2fa`, { tempToken, code }).pipe(map((r) => r.data), tap((response) => {
      this._accessToken.set(response.accessToken);
      this._admin.set(response.admin);
      this._tempToken.set(null);
    }));
  }
  resend2FA() {
    const tempToken = this._tempToken();
    return this.http.post(`${this.baseUrl}/resend-2fa`, { tempToken }).pipe(map((r) => r.data), tap((response) => {
      this._tempToken.set(response.tempToken);
    }));
  }
  refreshToken() {
    return this.http.post(`${this.baseUrl}/refresh-token`, {}, { withCredentials: true }).pipe(map((r) => r.data), tap((response) => {
      this._accessToken.set(response.accessToken);
      this._admin.set(response.admin);
    }), catchError((err) => {
      this.clearSession();
      return throwError(() => err);
    }));
  }
  logout() {
    const token = this._accessToken();
    if (token) {
      this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).subscribe({ error: () => {
      } });
    }
    this.clearSession();
    this.router.navigate(["/login"]);
  }
  clearSession() {
    this._accessToken.set(null);
    this._admin.set(null);
    this._tempToken.set(null);
  }
  tryRestoreSession() {
    return this.refreshToken();
  }
  static \u0275fac = function AdminAuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminAuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminAuthService, factory: _AdminAuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminAuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  AdminAuthService
};
//# sourceMappingURL=chunk-77RDWDYA.js.map
