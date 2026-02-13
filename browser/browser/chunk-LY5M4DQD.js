import {
  Component,
  Input,
  computed,
  input,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-7J6Y2ARR.js";

// src/app/shared/components/status-badge/status-badge.component.ts
var StatusBadgeComponent = class _StatusBadgeComponent {
  status = input.required(...ngDevMode ? [{ debugName: "status" }] : []);
  label = input(...ngDevMode ? [void 0, { debugName: "label" }] : []);
  displayLabel = computed(() => this.label() || this.status().replace(/_/g, " "), ...ngDevMode ? [{ debugName: "displayLabel" }] : []);
  statusConfig = {
    active: { bg: "bg-success-light", text: "text-success", dot: "bg-success" },
    paid: { bg: "bg-success-light", text: "text-success", dot: "bg-success" },
    completed: { bg: "bg-success-light", text: "text-success", dot: "bg-success" },
    delivered: { bg: "bg-success-light", text: "text-success", dot: "bg-success" },
    verified: { bg: "bg-success-light", text: "text-success", dot: "bg-success" },
    pending: { bg: "bg-warning-light", text: "text-warning", dot: "bg-warning" },
    processing: { bg: "bg-info-light", text: "text-info", dot: "bg-info" },
    shipped: { bg: "bg-info-light", text: "text-info", dot: "bg-info" },
    past_due: { bg: "bg-warning-light", text: "text-warning", dot: "bg-warning" },
    cancelled: { bg: "bg-[#f3f4f6]", text: "text-text-muted", dot: "bg-text-muted" },
    paused: { bg: "bg-[#f3f4f6]", text: "text-text-muted", dot: "bg-text-muted" },
    refunded: { bg: "bg-primary-light", text: "text-primary", dot: "bg-primary" },
    unpaid: { bg: "bg-error-light", text: "text-error", dot: "bg-error" },
    inactive: { bg: "bg-error-light", text: "text-error", dot: "bg-error" }
  };
  badgeClasses = computed(() => {
    const config = this.statusConfig[this.status()] || {
      bg: "bg-[#f3f4f6]",
      text: "text-text-secondary"
    };
    return `${config.bg} ${config.text}`;
  }, ...ngDevMode ? [{ debugName: "badgeClasses" }] : []);
  dotClass = computed(() => {
    const config = this.statusConfig[this.status()];
    return config?.dot || "bg-text-muted";
  }, ...ngDevMode ? [{ debugName: "dotClass" }] : []);
  static \u0275fac = function StatusBadgeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StatusBadgeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StatusBadgeComponent, selectors: [["app-status-badge"]], inputs: { status: [1, "status"], label: [1, "label"] }, decls: 3, vars: 5, consts: [[1, "inline-flex", "items-center", "gap-1.5", "px-2.5", "py-1", "rounded-full", "text-xs", "font-medium"], [1, "w-1.5", "h-1.5", "rounded-full"]], template: function StatusBadgeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "span", 0);
      \u0275\u0275domElement(1, "span", 1);
      \u0275\u0275text(2);
      \u0275\u0275domElementEnd();
    }
    if (rf & 2) {
      \u0275\u0275classMap(ctx.badgeClasses());
      \u0275\u0275advance();
      \u0275\u0275classMap(ctx.dotClass());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.displayLabel(), " ");
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StatusBadgeComponent, [{
    type: Component,
    args: [{
      selector: "app-status-badge",
      standalone: true,
      template: `
    <span
      class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      [class]="badgeClasses()"
    >
      <span class="w-1.5 h-1.5 rounded-full" [class]="dotClass()"></span>
      {{ displayLabel() }}
    </span>
  `
    }]
  }], null, { status: [{ type: Input, args: [{ isSignal: true, alias: "status", required: true }] }], label: [{ type: Input, args: [{ isSignal: true, alias: "label", required: false }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StatusBadgeComponent, { className: "StatusBadgeComponent", filePath: "src/app/shared/components/status-badge/status-badge.component.ts", lineNumber: 16 });
})();

export {
  StatusBadgeComponent
};
//# sourceMappingURL=chunk-LY5M4DQD.js.map
