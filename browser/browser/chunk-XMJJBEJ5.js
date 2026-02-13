import {
  Injectable,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-7J6Y2ARR.js";

// src/app/core/services/notification.service.ts
var NotificationService = class _NotificationService {
  toasts = signal([], ...ngDevMode ? [{ debugName: "toasts" }] : []);
  success(_message, _duration = 3e3) {
  }
  error(_message, _duration = 5e3) {
  }
  warning(_message, _duration = 4e3) {
  }
  info(_message, _duration = 3e3) {
  }
  dismiss(_id) {
  }
  static \u0275fac = function NotificationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotificationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NotificationService, factory: _NotificationService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotificationService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  NotificationService
};
//# sourceMappingURL=chunk-XMJJBEJ5.js.map
