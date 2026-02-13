import {
  LoadingSpinnerComponent
} from "./chunk-65YBE2BR.js";
import {
  StatusBadgeComponent
} from "./chunk-LY5M4DQD.js";
import {
  ApiService
} from "./chunk-XHKBGM2G.js";
import {
  NotificationService
} from "./chunk-XMJJBEJ5.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-D4TFPFZU.js";
import "./chunk-7NBDW476.js";
import "./chunk-IBCBMH7I.js";
import {
  Component,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  __spreadProps,
  __spreadValues,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-7J6Y2ARR.js";

// src/app/features/customers/customer-detail/customer-detail.component.ts
function CustomerDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function CustomerDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "a", 2);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 3);
    \u0275\u0275element(4, "path", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div")(6, "h1", 5);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 6);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "button", 7);
    \u0275\u0275listener("click", function CustomerDetailComponent_Conditional_2_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleActive());
    });
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 8)(16, "div", 9)(17, "h3", 10);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 11)(21, "div", 12)(22, "span", 13);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "app-status-badge", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "div", 12)(27, "span", 13);
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(30, "app-status-badge", 15);
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "div", 12)(34, "span", 13);
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 12)(40, "span", 13);
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "span");
    \u0275\u0275text(44);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(45, "div", 9)(46, "h3", 10);
    \u0275\u0275text(47);
    \u0275\u0275pipe(48, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 11)(50, "div", 12)(51, "span", 13);
    \u0275\u0275text(52);
    \u0275\u0275pipe(53, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "span");
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(57, "div", 12)(58, "span", 13);
    \u0275\u0275text(59);
    \u0275\u0275pipe(60, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "span");
    \u0275\u0275text(62);
    \u0275\u0275pipe(63, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 12)(65, "span", 13);
    \u0275\u0275text(66);
    \u0275\u0275pipe(67, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "span", 16);
    \u0275\u0275text(69);
    \u0275\u0275pipe(70, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2(" ", ctx_r1.user().firstName, " ", ctx_r1.user().lastName, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.user().email);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.user().isActive ? "border-error text-error hover:bg-error-light" : "border-success text-success hover:bg-success-light");
    \u0275\u0275property("disabled", ctx_r1.toggling());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.toggling() ? \u0275\u0275pipeBind1(12, 24, "CUSTOMERS.UPDATING") : ctx_r1.user().isActive ? \u0275\u0275pipeBind1(13, 26, "CUSTOMERS.DEACTIVATE") : \u0275\u0275pipeBind1(14, 28, "CUSTOMERS.ACTIVATE"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 30, "CUSTOMERS.PROFILE"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 32, "CUSTOMERS.STATUS"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r1.user().isActive ? "active" : "inactive");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 34, "CUSTOMERS.VERIFIED"));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", ctx_r1.user().isVerified ? "verified" : "pending")("label", ctx_r1.user().isVerified ? \u0275\u0275pipeBind1(31, 36, "CUSTOMERS.YES") : \u0275\u0275pipeBind1(32, 38, "CUSTOMERS.NO"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(36, 40, "CUSTOMERS.LANGUAGE"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.user().preferredLanguage);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(42, 42, "CUSTOMERS.JOINED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.user().createdAt));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(48, 44, "CUSTOMERS.BUSINESS"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(53, 46, "CUSTOMERS.COMPANY"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.user().companyName || \u0275\u0275pipeBind1(56, 48, "CUSTOMERS.NA"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(60, 50, "CUSTOMERS.VAT_NUMBER"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.user().vatNumber || \u0275\u0275pipeBind1(63, 52, "CUSTOMERS.NA"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(67, 54, "CUSTOMERS.STRIPE_CUSTOMER"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.user().stripeCustomerId || \u0275\u0275pipeBind1(70, 56, "CUSTOMERS.NA"));
  }
}
var CustomerDetailComponent = class _CustomerDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  api = inject(ApiService);
  notifications = inject(NotificationService);
  translate = inject(TranslateService);
  user = signal(null, ...ngDevMode ? [{ debugName: "user" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  toggling = signal(false, ...ngDevMode ? [{ debugName: "toggling" }] : []);
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.loadUser(id);
  }
  loadUser(id) {
    this.api.get(`admin/users/${id}`).subscribe({
      next: (u) => {
        this.user.set(u);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("CUSTOMERS.NOT_FOUND"));
        this.router.navigate(["/customers"]);
      }
    });
  }
  toggleActive() {
    const u = this.user();
    if (!u)
      return;
    this.toggling.set(true);
    this.api.patch(`admin/users/${u.id}/status`, { isActive: !u.isActive }).subscribe({
      next: () => {
        this.user.update((usr) => usr ? __spreadProps(__spreadValues({}, usr), { isActive: !usr.isActive }) : null);
        this.notifications.success(!u.isActive ? this.translate.instant("CUSTOMERS.ACTIVATED") : this.translate.instant("CUSTOMERS.DEACTIVATED"));
        this.toggling.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("CUSTOMERS.UPDATE_FAILED"));
        this.toggling.set(false);
      }
    });
  }
  formatDate(d) {
    return new Date(d).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  static \u0275fac = function CustomerDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerDetailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerDetailComponent, selectors: [["app-customer-detail"]], decls: 3, vars: 1, consts: [[1, "flex", "items-center", "justify-between", "mb-6"], [1, "flex", "items-center", "gap-3"], ["routerLink", "/customers", 1, "p-2", "rounded-lg", "hover:bg-gray-100", "text-text-muted"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "text-2xl", "font-bold", "text-text-primary"], [1, "text-sm", "text-text-secondary"], [1, "px-4", "py-2", "text-sm", "font-medium", "rounded-lg", "border", "transition-colors", 3, "click", "disabled"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "p-6"], [1, "text-lg", "font-semibold", "mb-4"], [1, "space-y-3", "text-sm"], [1, "flex", "justify-between"], [1, "text-text-muted"], [3, "status"], [3, "status", "label"], [1, "font-mono", "text-xs"]], template: function CustomerDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275conditionalCreate(1, CustomerDetailComponent_Conditional_1_Template, 1, 0, "app-loading-spinner")(2, CustomerDetailComponent_Conditional_2_Template, 71, 58);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : ctx.user() ? 2 : -1);
    }
  }, dependencies: [RouterLink, TranslateModule, StatusBadgeComponent, LoadingSpinnerComponent, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerDetailComponent, [{
    type: Component,
    args: [{
      selector: "app-customer-detail",
      standalone: true,
      imports: [RouterLink, TranslateModule, StatusBadgeComponent, LoadingSpinnerComponent],
      template: `
    <div>
      @if (loading()) {
        <app-loading-spinner />
      } @else if (user()) {
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <a routerLink="/customers" class="p-2 rounded-lg hover:bg-gray-100 text-text-muted">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </a>
            <div>
              <h1 class="text-2xl font-bold text-text-primary">
                {{ user()!.firstName }} {{ user()!.lastName }}
              </h1>
              <p class="text-sm text-text-secondary">{{ user()!.email }}</p>
            </div>
          </div>
          <button
            (click)="toggleActive()"
            [disabled]="toggling()"
            class="px-4 py-2 text-sm font-medium rounded-lg border transition-colors"
            [class]="
              user()!.isActive
                ? 'border-error text-error hover:bg-error-light'
                : 'border-success text-success hover:bg-success-light'
            "
          >
            {{
              toggling()
                ? ('CUSTOMERS.UPDATING' | translate)
                : user()!.isActive
                  ? ('CUSTOMERS.DEACTIVATE' | translate)
                  : ('CUSTOMERS.ACTIVATE' | translate)
            }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">{{ 'CUSTOMERS.PROFILE' | translate }}</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.STATUS' | translate }}</span
                ><app-status-badge [status]="user()!.isActive ? 'active' : 'inactive'" />
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.VERIFIED' | translate }}</span
                ><app-status-badge
                  [status]="user()!.isVerified ? 'verified' : 'pending'"
                  [label]="
                    user()!.isVerified
                      ? ('CUSTOMERS.YES' | translate)
                      : ('CUSTOMERS.NO' | translate)
                  "
                />
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.LANGUAGE' | translate }}</span
                ><span>{{ user()!.preferredLanguage }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.JOINED' | translate }}</span
                ><span>{{ formatDate(user()!.createdAt) }}</span>
              </div>
            </div>
          </div>
          <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
            <h3 class="text-lg font-semibold mb-4">{{ 'CUSTOMERS.BUSINESS' | translate }}</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.COMPANY' | translate }}</span
                ><span>{{ user()!.companyName || ('CUSTOMERS.NA' | translate) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.VAT_NUMBER' | translate }}</span
                ><span>{{ user()!.vatNumber || ('CUSTOMERS.NA' | translate) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-text-muted">{{ 'CUSTOMERS.STRIPE_CUSTOMER' | translate }}</span
                ><span class="font-mono text-xs">{{
                  user()!.stripeCustomerId || ('CUSTOMERS.NA' | translate)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerDetailComponent, { className: "CustomerDetailComponent", filePath: "src/app/features/customers/customer-detail/customer-detail.component.ts", lineNumber: 111 });
})();
export {
  CustomerDetailComponent
};
//# sourceMappingURL=chunk-5KYWBARG.js.map
