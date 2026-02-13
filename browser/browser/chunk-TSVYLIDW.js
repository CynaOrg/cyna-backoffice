import {
  Component,
  Input,
  Output,
  computed,
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
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵnextContext,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-7J6Y2ARR.js";

// src/app/shared/components/pagination/pagination.component.ts
function PaginationComponent_Conditional_0_For_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "span", 4);
    \u0275\u0275text(1, "...");
    \u0275\u0275domElementEnd();
  }
}
function PaginationComponent_Conditional_0_For_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "button", 6);
    \u0275\u0275domListener("click", function PaginationComponent_Conditional_0_For_7_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const p_r4 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goTo(p_r4));
    });
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const p_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(p_r4 === ctx_r1.currentPage() ? "bg-primary text-white" : "hover:bg-gray-50 text-text-secondary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", p_r4, " ");
  }
}
function PaginationComponent_Conditional_0_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, PaginationComponent_Conditional_0_For_7_Conditional_0_Template, 2, 0, "span", 4)(1, PaginationComponent_Conditional_0_For_7_Conditional_1_Template, 2, 3, "button", 5);
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    \u0275\u0275conditional(p_r4 === -1 ? 0 : 1);
  }
}
function PaginationComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "div", 0)(1, "div", 1);
    \u0275\u0275text(2);
    \u0275\u0275domElementEnd();
    \u0275\u0275domElementStart(3, "div", 2)(4, "button", 3);
    \u0275\u0275domListener("click", function PaginationComponent_Conditional_0_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goTo(ctx_r1.currentPage() - 1));
    });
    \u0275\u0275text(5, " Previous ");
    \u0275\u0275domElementEnd();
    \u0275\u0275repeaterCreate(6, PaginationComponent_Conditional_0_For_7_Template, 2, 1, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275domElementStart(8, "button", 3);
    \u0275\u0275domListener("click", function PaginationComponent_Conditional_0_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goTo(ctx_r1.currentPage() + 1));
    });
    \u0275\u0275text(9, " Next ");
    \u0275\u0275domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" Showing ", ctx_r1.startItem(), "-", ctx_r1.endItem(), " of ", ctx_r1.total(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.currentPage() <= 1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.pages());
    \u0275\u0275advance(2);
    \u0275\u0275domProperty("disabled", ctx_r1.currentPage() >= ctx_r1.totalPages());
  }
}
var PaginationComponent = class _PaginationComponent {
  currentPage = input.required(...ngDevMode ? [{ debugName: "currentPage" }] : []);
  total = input.required(...ngDevMode ? [{ debugName: "total" }] : []);
  limit = input(20, ...ngDevMode ? [{ debugName: "limit" }] : []);
  pageChange = output();
  totalPages = computed(() => Math.ceil(this.total() / this.limit()), ...ngDevMode ? [{ debugName: "totalPages" }] : []);
  startItem = computed(() => (this.currentPage() - 1) * this.limit() + 1, ...ngDevMode ? [{ debugName: "startItem" }] : []);
  endItem = computed(() => Math.min(this.currentPage() * this.limit(), this.total()), ...ngDevMode ? [{ debugName: "endItem" }] : []);
  pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    if (total <= 7)
      return Array.from({ length: total }, (_, i) => i + 1);
    const pages = [1];
    if (current > 3)
      pages.push(-1);
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i);
    }
    if (current < total - 2)
      pages.push(-1);
    pages.push(total);
    return pages;
  }, ...ngDevMode ? [{ debugName: "pages" }] : []);
  goTo(page) {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
  static \u0275fac = function PaginationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PaginationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PaginationComponent, selectors: [["app-pagination"]], inputs: { currentPage: [1, "currentPage"], total: [1, "total"], limit: [1, "limit"] }, outputs: { pageChange: "pageChange" }, decls: 1, vars: 1, consts: [[1, "flex", "items-center", "justify-between", "px-4", "py-3"], [1, "text-sm", "text-text-secondary"], [1, "flex", "items-center", "gap-1"], [1, "px-3", "py-1.5", "text-sm", "rounded-lg", "border", "border-border", "hover:bg-gray-50", "disabled:opacity-40", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "px-2", "text-text-muted"], [1, "w-8", "h-8", "text-sm", "rounded-lg", 3, "class"], [1, "w-8", "h-8", "text-sm", "rounded-lg", 3, "click"]], template: function PaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, PaginationComponent_Conditional_0_Template, 10, 5, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.totalPages() > 1 ? 0 : -1);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PaginationComponent, [{
    type: Component,
    args: [{
      selector: "app-pagination",
      standalone: true,
      template: `
    @if (totalPages() > 1) {
      <div class="flex items-center justify-between px-4 py-3">
        <div class="text-sm text-text-secondary">
          Showing {{ startItem() }}-{{ endItem() }} of {{ total() }}
        </div>
        <div class="flex items-center gap-1">
          <button
            (click)="goTo(currentPage() - 1)"
            [disabled]="currentPage() <= 1"
            class="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          @for (p of pages(); track p) {
            @if (p === -1) {
              <span class="px-2 text-text-muted">...</span>
            } @else {
              <button
                (click)="goTo(p)"
                class="w-8 h-8 text-sm rounded-lg"
                [class]="
                  p === currentPage()
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-50 text-text-secondary'
                "
              >
                {{ p }}
              </button>
            }
          }
          <button
            (click)="goTo(currentPage() + 1)"
            [disabled]="currentPage() >= totalPages()"
            class="px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    }
  `
    }]
  }], null, { currentPage: [{ type: Input, args: [{ isSignal: true, alias: "currentPage", required: true }] }], total: [{ type: Input, args: [{ isSignal: true, alias: "total", required: true }] }], limit: [{ type: Input, args: [{ isSignal: true, alias: "limit", required: false }] }], pageChange: [{ type: Output, args: ["pageChange"] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PaginationComponent, { className: "PaginationComponent", filePath: "src/app/shared/components/pagination/pagination.component.ts", lineNumber: 49 });
})();

export {
  PaginationComponent
};
//# sourceMappingURL=chunk-TSVYLIDW.js.map
