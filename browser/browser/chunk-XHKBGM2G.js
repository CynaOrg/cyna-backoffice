import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-IBCBMH7I.js";
import {
  Injectable,
  inject,
  map,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-7J6Y2ARR.js";

// src/app/core/services/api.service.ts
var ApiService = class _ApiService {
  http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  get(path, params) {
    return this.http.get(`${this.baseUrl}/${path}`, { params: this.buildParams(params) }).pipe(map((r) => r.data));
  }
  getRaw(path, params) {
    return this.http.get(`${this.baseUrl}/${path}`, { params: this.buildParams(params) });
  }
  getList(path, params) {
    return this.http.get(`${this.baseUrl}/${path}`, { params: this.buildParams(params) }).pipe(map((r) => r.data));
  }
  getPaginated(path, params) {
    return this.http.get(`${this.baseUrl}/${path}`, {
      params: this.buildParams(params)
    });
  }
  post(path, body) {
    return this.http.post(`${this.baseUrl}/${path}`, body).pipe(map((r) => r.data));
  }
  postRaw(path, body) {
    return this.http.post(`${this.baseUrl}/${path}`, body);
  }
  patch(path, body) {
    return this.http.patch(`${this.baseUrl}/${path}`, body).pipe(map((r) => r.data));
  }
  patchRaw(path, body) {
    return this.http.patch(`${this.baseUrl}/${path}`, body);
  }
  delete(path) {
    return this.http.delete(`${this.baseUrl}/${path}`).pipe(map((r) => r.data));
  }
  buildParams(params) {
    let httpParams = new HttpParams();
    if (!params)
      return httpParams;
    for (const [key, value] of Object.entries(params)) {
      if (value !== void 0 && value !== null) {
        httpParams = httpParams.set(key, value.toString());
      }
    }
    return httpParams;
  }
  static \u0275fac = function ApiService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ApiService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ApiService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ApiService
};
//# sourceMappingURL=chunk-XHKBGM2G.js.map
