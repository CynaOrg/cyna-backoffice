import {
  ApiService
} from "./chunk-XHKBGM2G.js";
import {
  Injectable,
  catchError,
  inject,
  of,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-7J6Y2ARR.js";

// src/app/core/services/content.service.ts
var ContentService = class _ContentService {
  api = inject(ApiService);
  basePath = "admin/content";
  // Carousel
  getCarouselSlides() {
    return this.api.getList(`${this.basePath}/carousel`);
  }
  createSlide(dto) {
    return this.api.post(`${this.basePath}/carousel`, dto);
  }
  updateSlide(slideId, dto) {
    return this.api.patch(`${this.basePath}/carousel/${slideId}`, dto);
  }
  deleteSlide(slideId) {
    return this.api.delete(`${this.basePath}/carousel/${slideId}`);
  }
  reorderCarousel(slideIds) {
    return this.api.patch(`${this.basePath}/carousel/reorder`, {
      slideIds
    });
  }
  // Hero Text
  getHeroText() {
    return this.api.get(`${this.basePath}/hero-text`).pipe(catchError(() => {
      return of(null);
    }));
  }
  updateHeroText(dto) {
    return this.api.patch(`${this.basePath}/hero-text`, dto);
  }
  // Top Products
  getTopConfig(type) {
    return this.api.get(`${this.basePath}/${type === "top_services" ? "top-services" : "top-products"}`);
  }
  updateTopConfig(type, dto) {
    const endpoint = type === "top_services" ? "top-services" : "top-products";
    return this.api.patch(`${this.basePath}/${endpoint}`, dto);
  }
  // Contact Messages
  getContactMessages(params) {
    return this.api.getList(`${this.basePath}/contact-messages`, params);
  }
  updateContactMessage(messageId, body) {
    return this.api.patch(`${this.basePath}/contact-messages/${messageId}`, body);
  }
  deleteContactMessage(messageId) {
    return this.api.delete(`${this.basePath}/contact-messages/${messageId}`);
  }
  static \u0275fac = function ContentService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContentService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ContentService, factory: _ContentService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContentService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ContentService
};
//# sourceMappingURL=chunk-GUJTGOJS.js.map
