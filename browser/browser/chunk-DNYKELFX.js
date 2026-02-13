import {
  Component,
  Input,
  Output,
  input,
  output,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7J6Y2ARR.js";

// src/app/shared/components/confirm-modal/confirm-modal.component.ts
function ConfirmModalComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275domListener("click", function ConfirmModalComponent_Conditional_0_Template_div_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancel.emit());
    });
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(2, "div", 2)(3, "h3", 3);
    \u0275\u0275text(4);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(5, "p", 4);
    \u0275\u0275text(6);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(7, "div", 5)(8, "button", 6);
    \u0275\u0275domListener("click", function ConfirmModalComponent_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancel.emit());
    });
    \u0275\u0275text(9, " Cancel ");
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(10, "button", 7);
    \u0275\u0275domListener("click", function ConfirmModalComponent_Conditional_0_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirm.emit());
    });
    \u0275\u0275text(11);
    \u0275\u0275domElementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.title(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.message());
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r1.variant() === "danger" ? "bg-error hover:bg-red-600" : "bg-primary hover:bg-primary-hover");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.confirmLabel(), " ");
  }
}
var ConfirmModalComponent = class _ConfirmModalComponent {
  open = input.required(...ngDevMode ? [{ debugName: "open" }] : []);
  title = input("Confirm action", ...ngDevMode ? [{ debugName: "title" }] : []);
  message = input("Are you sure?", ...ngDevMode ? [{ debugName: "message" }] : []);
  confirmLabel = input("Confirm", ...ngDevMode ? [{ debugName: "confirmLabel" }] : []);
  variant = input("primary", ...ngDevMode ? [{ debugName: "variant" }] : []);
  confirm = output();
  cancel = output();
  static \u0275fac = function ConfirmModalComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmModalComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmModalComponent, selectors: [["app-confirm-modal"]], inputs: { open: [1, "open"], title: [1, "title"], message: [1, "message"], confirmLabel: [1, "confirmLabel"], variant: [1, "variant"] }, outputs: { confirm: "confirm", cancel: "cancel" }, decls: 1, vars: 1, consts: [[1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center"], [1, "absolute", "inset-0", "bg-black/40", 3, "click"], [1, "relative", "bg-white", "rounded-xl", "shadow-xl", "p-6", "max-w-md", "w-full", "mx-4"], [1, "text-lg", "font-semibold", "text-text-primary"], [1, "mt-2", "text-sm", "text-text-secondary"], [1, "mt-6", "flex", "justify-end", "gap-3"], [1, "px-4", "py-2", "text-sm", "font-medium", "text-text-secondary", "border", "border-border", "rounded-lg", "hover:bg-gray-50", 3, "click"], [1, "px-4", "py-2", "text-sm", "font-medium", "text-white", "rounded-lg", 3, "click"]], template: function ConfirmModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ConfirmModalComponent_Conditional_0_Template, 12, 5, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.open() ? 0 : -1);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ConfirmModalComponent, [{
    type: Component,
    args: [{
      selector: "app-confirm-modal",
      standalone: true,
      template: `
    @if (open()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/40" (click)="cancel.emit()"></div>
        <div class="relative bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
          <h3 class="text-lg font-semibold text-text-primary">
            {{ title() }}
          </h3>
          <p class="mt-2 text-sm text-text-secondary">{{ message() }}</p>
          <div class="mt-6 flex justify-end gap-3">
            <button
              (click)="cancel.emit()"
              class="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              (click)="confirm.emit()"
              class="px-4 py-2 text-sm font-medium text-white rounded-lg"
              [class]="
                variant() === 'danger'
                  ? 'bg-error hover:bg-red-600'
                  : 'bg-primary hover:bg-primary-hover'
              "
            >
              {{ confirmLabel() }}
            </button>
          </div>
        </div>
      </div>
    }
  `
    }]
  }], null, { open: [{ type: Input, args: [{ isSignal: true, alias: "open", required: true }] }], title: [{ type: Input, args: [{ isSignal: true, alias: "title", required: false }] }], message: [{ type: Input, args: [{ isSignal: true, alias: "message", required: false }] }], confirmLabel: [{ type: Input, args: [{ isSignal: true, alias: "confirmLabel", required: false }] }], variant: [{ type: Input, args: [{ isSignal: true, alias: "variant", required: false }] }], confirm: [{ type: Output, args: ["confirm"] }], cancel: [{ type: Output, args: ["cancel"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmModalComponent, { className: "ConfirmModalComponent", filePath: "src/app/shared/components/confirm-modal/confirm-modal.component.ts", lineNumber: 39 });
})();

export {
  ConfirmModalComponent
};
//# sourceMappingURL=chunk-DNYKELFX.js.map
