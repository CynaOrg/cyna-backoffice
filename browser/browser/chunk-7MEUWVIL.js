import {
  ApiService
} from "./chunk-XHKBGM2G.js";
import {
  HttpClient,
  environment
} from "./chunk-IBCBMH7I.js";
import {
  Component,
  Injectable,
  Input,
  inject,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-7J6Y2ARR.js";

// src/app/core/services/analytics.service.ts
var AnalyticsService = class _AnalyticsService {
  api = inject(ApiService);
  http = inject(HttpClient);
  basePath = "admin/analytics";
  getDashboard(period) {
    const params = period ? { period } : void 0;
    return this.api.get(`${this.basePath}/dashboard`, params);
  }
  getSales(period, groupBy) {
    const params = {};
    if (period)
      params["period"] = period;
    if (groupBy)
      params["groupBy"] = groupBy;
    return this.api.get(`${this.basePath}/sales`, params);
  }
  getSalesByCategory(period) {
    const params = period ? { period } : void 0;
    return this.api.get(`${this.basePath}/sales-by-category`, params);
  }
  getSalesByProductType(period) {
    const params = period ? { period } : void 0;
    return this.api.get(`${this.basePath}/sales-by-product-type`, params);
  }
  getAverageCart(period) {
    const params = period ? { period } : void 0;
    return this.api.get(`${this.basePath}/average-cart`, params);
  }
  getMrr() {
    return this.api.get(`${this.basePath}/mrr`);
  }
  getStockStatus() {
    return this.api.get(`${this.basePath}/stock`);
  }
  exportData(type, dateFrom, dateTo, format = "csv") {
    return this.http.get(`${environment.apiUrl}/${this.basePath}/export/${type}`, {
      params: { dateFrom, dateTo, format },
      responseType: "blob"
    });
  }
  static \u0275fac = function AnalyticsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AnalyticsService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AnalyticsService, factory: _AnalyticsService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnalyticsService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/shared/components/kpi-card/kpi-card.component.ts
function KpiCardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r0.variation() >= 0 ? "bg-success-light text-success" : "bg-error-light text-error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r0.variation() >= 0 ? "+" : "", "", ctx_r0.variation(), "% ");
  }
}
var KpiCardComponent = class _KpiCardComponent {
  value = input.required(...ngDevMode ? [{ debugName: "value" }] : []);
  label = input.required(...ngDevMode ? [{ debugName: "label" }] : []);
  iconPath = input("M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", ...ngDevMode ? [{ debugName: "iconPath" }] : []);
  iconBgClass = input("bg-primary-light", ...ngDevMode ? [{ debugName: "iconBgClass" }] : []);
  iconClass = input("text-primary", ...ngDevMode ? [{ debugName: "iconClass" }] : []);
  variation = input(void 0, ...ngDevMode ? [{ debugName: "variation" }] : []);
  static \u0275fac = function KpiCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KpiCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KpiCardComponent, selectors: [["app-kpi-card"]], inputs: { value: [1, "value"], label: [1, "label"], iconPath: [1, "iconPath"], iconBgClass: [1, "iconBgClass"], iconClass: [1, "iconClass"], variation: [1, "variation"] }, decls: 10, vars: 8, consts: [[1, "rounded-xl", "border", "border-border-light", "bg-surface", "p-6", "shadow-sm", "hover:shadow-md", "hover:-translate-y-px", "transition-all", "duration-200"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "w-10", "h-10", "rounded-lg", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2"], [1, "text-xs", "font-semibold", "px-2", "py-1", "rounded-full", 3, "class"], [1, "text-2xl", "font-bold", "text-text-primary"], [1, "text-sm", "text-text-secondary", "mt-1"], [1, "text-xs", "font-semibold", "px-2", "py-1", "rounded-full"]], template: function KpiCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275domElementStart(3, "svg", 3);
      \u0275\u0275domElement(4, "path", 4);
      \u0275\u0275domElementEnd()();
      \u0275\u0275conditionalCreate(5, KpiCardComponent_Conditional_5_Template, 2, 4, "span", 5);
      \u0275\u0275domElementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275domElementStart(6, "div", 6);
      \u0275\u0275text(7);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "div", 7);
      \u0275\u0275text(9);
      \u0275\u0275domElementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.iconBgClass());
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.iconClass());
      \u0275\u0275advance();
      \u0275\u0275attribute("d", ctx.iconPath());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.variation() !== void 0 ? 5 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.value());
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.label());
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(KpiCardComponent, [{
    type: Component,
    args: [{
      selector: "app-kpi-card",
      standalone: true,
      template: `
    <div
      class="rounded-xl border border-border-light bg-surface p-6 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200"
    >
      <div class="flex items-center justify-between mb-4">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" [class]="iconBgClass()">
          <svg
            class="w-5 h-5"
            [class]="iconClass()"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              [attr.d]="iconPath()"
            />
          </svg>
        </div>
        @if (variation() !== undefined) {
          <span
            class="text-xs font-semibold px-2 py-1 rounded-full"
            [class]="
              variation()! >= 0 ? 'bg-success-light text-success' : 'bg-error-light text-error'
            "
          >
            {{ variation()! >= 0 ? '+' : '' }}{{ variation() }}%
          </span>
        }
      </div>
      <div class="text-2xl font-bold text-text-primary">{{ value() }}</div>
      <div class="text-sm text-text-secondary mt-1">{{ label() }}</div>
    </div>
  `
    }]
  }], null, { value: [{ type: Input, args: [{ isSignal: true, alias: "value", required: true }] }], label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: true }] }], iconPath: [{ type: Input, args: [{ isSignal: true, alias: "iconPath", required: false }] }], iconBgClass: [{ type: Input, args: [{ isSignal: true, alias: "iconBgClass", required: false }] }], iconClass: [{ type: Input, args: [{ isSignal: true, alias: "iconClass", required: false }] }], variation: [{ type: Input, args: [{ isSignal: true, alias: "variation", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KpiCardComponent, { className: "KpiCardComponent", filePath: "src/app/shared/components/kpi-card/kpi-card.component.ts", lineNumber: 43 });
})();

export {
  AnalyticsService,
  KpiCardComponent
};
//# sourceMappingURL=chunk-7MEUWVIL.js.map
