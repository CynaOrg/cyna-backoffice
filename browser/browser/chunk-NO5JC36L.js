import {
  PaginationComponent
} from "./chunk-TSVYLIDW.js";
import {
  LoadingSpinnerComponent
} from "./chunk-65YBE2BR.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-SOM4FACY.js";
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
  RouterLink
} from "./chunk-D4TFPFZU.js";
import "./chunk-7NBDW476.js";
import "./chunk-IBCBMH7I.js";
import {
  Component,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7J6Y2ARR.js";

// src/app/features/customers/customer-list/customer-list.component.ts
var _c0 = (a0) => ["/customers", a0];
var _forTrack0 = ($index, $item) => $item.id;
function CustomerListComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function CustomerListComponent_Conditional_5_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 9)(1, "td", 11)(2, "a", 12);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 13);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 13);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 11);
    \u0275\u0275element(9, "app-status-badge", 14);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 13);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 15)(15, "a", 16);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const user_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(16, _c0, user_r2.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", user_r2.firstName, " ", user_r2.lastName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(user_r2.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", user_r2.companyName || "-", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("status", user_r2.isActive ? "active" : "inactive")("label", user_r2.isActive ? \u0275\u0275pipeBind1(10, 10, "CUSTOMERS.ACTIVE") : \u0275\u0275pipeBind1(11, 12, "CUSTOMERS.INACTIVE"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(user_r2.createdAt), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(18, _c0, user_r2.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 14, "CUSTOMERS.VIEW"));
  }
}
function CustomerListComponent_Conditional_5_ForEmpty_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 17);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "CUSTOMERS.NO_CUSTOMERS"), " ");
  }
}
function CustomerListComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "table", 4)(3, "thead")(4, "tr", 5)(5, "th", 6);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 6);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 6);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 6);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 6);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 7);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "tbody", 8);
    \u0275\u0275repeaterCreate(24, CustomerListComponent_Conditional_5_For_25_Template, 18, 20, "tr", 9, _forTrack0, false, CustomerListComponent_Conditional_5_ForEmpty_26_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "app-pagination", 10);
    \u0275\u0275listener("pageChange", function CustomerListComponent_Conditional_5_Template_app_pagination_pageChange_27_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageChange($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 10, "CUSTOMERS.NAME"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 12, "CUSTOMERS.EMAIL"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 14, "CUSTOMERS.COMPANY"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 16, "CUSTOMERS.STATUS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 18, "CUSTOMERS.JOINED"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 20, "CUSTOMERS.ACTIONS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.users());
    \u0275\u0275advance(3);
    \u0275\u0275property("currentPage", ctx_r2.page())("total", ctx_r2.total())("limit", 20);
  }
}
var CustomerListComponent = class _CustomerListComponent {
  api = inject(ApiService);
  notifications = inject(NotificationService);
  translate = inject(TranslateService);
  users = signal([], ...ngDevMode ? [{ debugName: "users" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  page = signal(1, ...ngDevMode ? [{ debugName: "page" }] : []);
  total = signal(0, ...ngDevMode ? [{ debugName: "total" }] : []);
  search = "";
  searchTimeout;
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.loading.set(true);
    const params = { page: this.page(), limit: 20 };
    if (this.search)
      params["search"] = this.search;
    this.api.get("admin/users", params).subscribe({
      next: (res) => {
        this.users.set(res?.data || []);
        this.total.set(res?.total || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("CUSTOMERS.LOAD_FAILED"));
        this.loading.set(false);
      }
    });
  }
  onSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.page.set(1);
      this.loadUsers();
    }, 400);
  }
  onPageChange(p) {
    this.page.set(p);
    this.loadUsers();
  }
  formatDate(d) {
    return new Date(d).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  static \u0275fac = function CustomerListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CustomerListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CustomerListComponent, selectors: [["app-customer-list"]], decls: 6, vars: 5, consts: [[1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "p-4", "mb-6"], ["type", "text", 1, "px-4", "py-2", "rounded-lg", "border", "border-border", "bg-white", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "w-72", 3, "ngModelChange", "input", "placeholder", "ngModel"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full"], [1, "border-b", "border-border-light"], [1, "px-6", "py-3", "text-left", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "px-6", "py-3", "text-right", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "divide-y", "divide-border-light"], [1, "hover:bg-gray-50/50"], [3, "pageChange", "currentPage", "total", "limit"], [1, "px-6", "py-4"], [1, "text-sm", "font-medium", "text-text-primary", "hover:text-primary", 3, "routerLink"], [1, "px-6", "py-4", "text-sm", "text-text-secondary"], [3, "status", "label"], [1, "px-6", "py-4", "text-right"], [1, "text-sm", "text-primary", "hover:text-primary-hover", 3, "routerLink"], ["colspan", "6", 1, "px-6", "py-12", "text-center", "text-text-muted", "text-sm"]], template: function CustomerListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div")(1, "div", 0)(2, "input", 1);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function CustomerListComponent_Template_input_ngModelChange_2_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.search, $event) || (ctx.search = $event);
        return $event;
      });
      \u0275\u0275listener("input", function CustomerListComponent_Template_input_input_2_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(4, CustomerListComponent_Conditional_4_Template, 1, 0, "app-loading-spinner")(5, CustomerListComponent_Conditional_5_Template, 28, 22, "div", 2);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(3, 3, "CUSTOMERS.SEARCH_PLACEHOLDER"));
      \u0275\u0275twoWayProperty("ngModel", ctx.search);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 4 : 5);
    }
  }, dependencies: [
    RouterLink,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    TranslateModule,
    StatusBadgeComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CustomerListComponent, [{
    type: Component,
    args: [{
      selector: "app-customer-list",
      standalone: true,
      imports: [
        RouterLink,
        FormsModule,
        TranslateModule,
        StatusBadgeComponent,
        PaginationComponent,
        LoadingSpinnerComponent
      ],
      template: `
    <div>
      <div class="bg-surface rounded-xl border border-border-light shadow-sm p-4 mb-6">
        <input
          type="text"
          [placeholder]="'CUSTOMERS.SEARCH_PLACEHOLDER' | translate"
          [(ngModel)]="search"
          (input)="onSearch()"
          class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-72"
        />
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <div class="bg-surface rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.NAME' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.EMAIL' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.COMPANY' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.JOINED' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'CUSTOMERS.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (user of users(); track user.id) {
                  <tr class="hover:bg-gray-50/50">
                    <td class="px-6 py-4">
                      <a
                        [routerLink]="['/customers', user.id]"
                        class="text-sm font-medium text-text-primary hover:text-primary"
                        >{{ user.firstName }} {{ user.lastName }}</a
                      >
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">{{ user.email }}</td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ user.companyName || '-' }}
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge
                        [status]="user.isActive ? 'active' : 'inactive'"
                        [label]="
                          user.isActive
                            ? ('CUSTOMERS.ACTIVE' | translate)
                            : ('CUSTOMERS.INACTIVE' | translate)
                        "
                      />
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ formatDate(user.createdAt) }}
                    </td>
                    <td class="px-6 py-4 text-right">
                      <a
                        [routerLink]="['/customers', user.id]"
                        class="text-sm text-primary hover:text-primary-hover"
                        >{{ 'CUSTOMERS.VIEW' | translate }}</a
                      >
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'CUSTOMERS.NO_CUSTOMERS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <app-pagination
            [currentPage]="page()"
            [total]="total()"
            [limit]="20"
            (pageChange)="onPageChange($event)"
          />
        </div>
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CustomerListComponent, { className: "CustomerListComponent", filePath: "src/app/features/customers/customer-list/customer-list.component.ts", lineNumber: 131 });
})();
export {
  CustomerListComponent
};
//# sourceMappingURL=chunk-NO5JC36L.js.map
