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
  NgModel,
  NgSelectOption,
  SelectControlValueAccessor,
  ɵNgSelectMultipleOption
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7J6Y2ARR.js";

// src/app/features/orders/order-list/order-list.component.ts
var _c0 = (a0) => ["/orders", a0];
var _forTrack0 = ($index, $item) => $item.id;
function OrderListComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function OrderListComponent_Conditional_34_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 20)(1, "td", 22)(2, "a", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 24);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 25);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 22);
    \u0275\u0275element(12, "app-status-badge", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 27);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 28)(16, "a", 29);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c0, order_r2.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r2.orderNumber, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", order_r2.userId || order_r2.guestEmail || \u0275\u0275pipeBind1(6, 9, "ORDERS.GUEST"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(order_r2.createdAt), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", order_r2.orderType == null ? null : order_r2.orderType.toLowerCase(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("status", order_r2.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatCurrency(order_r2.total), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(15, _c0, order_r2.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(18, 11, "ORDERS.VIEW"), " ");
  }
}
function OrderListComponent_Conditional_34_ForEmpty_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 30);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "ORDERS.NO_ORDERS"), " ");
  }
}
function OrderListComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "table", 15)(3, "thead")(4, "tr", 16)(5, "th", 17);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 17);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 17);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 17);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 17);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 18);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 18);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "tbody", 19);
    \u0275\u0275repeaterCreate(27, OrderListComponent_Conditional_34_For_28_Template, 19, 17, "tr", 20, _forTrack0, false, OrderListComponent_Conditional_34_ForEmpty_29_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(30, "app-pagination", 21);
    \u0275\u0275listener("pageChange", function OrderListComponent_Conditional_34_Template_app_pagination_pageChange_30_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageChange($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 11, "ORDERS.ORDER"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 13, "ORDERS.CUSTOMER"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 15, "ORDERS.DATE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 17, "ORDERS.TYPE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 19, "ORDERS.STATUS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 21, "ORDERS.TOTAL"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(25, 23, "ORDERS.ACTIONS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.orders());
    \u0275\u0275advance(3);
    \u0275\u0275property("currentPage", ctx_r2.page())("total", ctx_r2.total())("limit", 20);
  }
}
var OrderListComponent = class _OrderListComponent {
  api = inject(ApiService);
  notifications = inject(NotificationService);
  translate = inject(TranslateService);
  orders = signal([], ...ngDevMode ? [{ debugName: "orders" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  page = signal(1, ...ngDevMode ? [{ debugName: "page" }] : []);
  total = signal(0, ...ngDevMode ? [{ debugName: "total" }] : []);
  search = "";
  statusFilter = "";
  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.loading.set(true);
    const params = { page: this.page(), limit: 20 };
    if (this.search)
      params["search"] = this.search;
    if (this.statusFilter)
      params["status"] = this.statusFilter;
    this.api.get("admin/orders", params).subscribe({
      next: (res) => {
        this.orders.set(res?.data || []);
        this.total.set(res?.total || 0);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error("Failed to load orders");
        this.loading.set(false);
      }
    });
  }
  onPageChange(page) {
    this.page.set(page);
    this.loadOrders();
  }
  formatCurrency(v) {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(v);
  }
  formatDate(d) {
    return new Date(d).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  static \u0275fac = function OrderListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderListComponent, selectors: [["app-order-list"]], decls: 35, vars: 33, consts: [[1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "p-4", "mb-6"], [1, "flex", "flex-wrap", "gap-4", "items-center"], ["type", "text", 1, "px-4", "py-2", "rounded-lg", "border", "border-border", "bg-white", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "w-64", 3, "ngModelChange", "input", "placeholder", "ngModel"], [1, "px-4", "py-2", "rounded-lg", "border", "border-border", "bg-white", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "pending"], ["value", "paid"], ["value", "processing"], ["value", "shipped"], ["value", "delivered"], ["value", "completed"], ["value", "cancelled"], ["value", "refunded"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full"], [1, "border-b", "border-border-light"], [1, "px-6", "py-3", "text-left", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "px-6", "py-3", "text-right", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "divide-y", "divide-border-light"], [1, "hover:bg-gray-50/50"], [3, "pageChange", "currentPage", "total", "limit"], [1, "px-6", "py-4"], [1, "text-sm", "font-medium", "text-primary", "hover:text-primary-hover", 3, "routerLink"], [1, "px-6", "py-4", "text-sm", "text-text-secondary"], [1, "px-6", "py-4", "text-sm", "text-text-secondary", "capitalize"], [3, "status"], [1, "px-6", "py-4", "text-sm", "text-text-primary", "font-medium", "text-right"], [1, "px-6", "py-4", "text-right"], [1, "text-sm", "text-primary", "hover:text-primary-hover", 3, "routerLink"], ["colspan", "7", 1, "px-6", "py-12", "text-center", "text-text-muted", "text-sm"]], template: function OrderListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div")(1, "div", 0)(2, "div", 1)(3, "input", 2);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function OrderListComponent_Template_input_ngModelChange_3_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.search, $event) || (ctx.search = $event);
        return $event;
      });
      \u0275\u0275listener("input", function OrderListComponent_Template_input_input_3_listener() {
        return ctx.loadOrders();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "select", 3);
      \u0275\u0275twoWayListener("ngModelChange", function OrderListComponent_Template_select_ngModelChange_5_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function OrderListComponent_Template_select_change_5_listener() {
        return ctx.loadOrders();
      });
      \u0275\u0275elementStart(6, "option", 4);
      \u0275\u0275text(7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "option", 5);
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "option", 6);
      \u0275\u0275text(13);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "option", 7);
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "option", 8);
      \u0275\u0275text(19);
      \u0275\u0275pipe(20, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "option", 9);
      \u0275\u0275text(22);
      \u0275\u0275pipe(23, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "option", 10);
      \u0275\u0275text(25);
      \u0275\u0275pipe(26, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "option", 11);
      \u0275\u0275text(28);
      \u0275\u0275pipe(29, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "option", 12);
      \u0275\u0275text(31);
      \u0275\u0275pipe(32, "translate");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275conditionalCreate(33, OrderListComponent_Conditional_33_Template, 1, 0, "app-loading-spinner")(34, OrderListComponent_Conditional_34_Template, 31, 25, "div", 13);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(4, 13, "ORDERS.SEARCH_PLACEHOLDER"));
      \u0275\u0275twoWayProperty("ngModel", ctx.search);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 15, "ORDERS.ALL_STATUSES"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 17, "ORDERS.PENDING"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 19, "ORDERS.PAID"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 21, "ORDERS.PROCESSING"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 23, "ORDERS.SHIPPED"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 25, "ORDERS.DELIVERED"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(26, 27, "ORDERS.COMPLETED"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(29, 29, "ORDERS.CANCELLED"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(32, 31, "ORDERS.REFUNDED"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 33 : 34);
    }
  }, dependencies: [
    RouterLink,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
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
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderListComponent, [{
    type: Component,
    args: [{
      selector: "app-order-list",
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
        <div class="flex flex-wrap gap-4 items-center">
          <input
            type="text"
            [placeholder]="'ORDERS.SEARCH_PLACEHOLDER' | translate"
            [(ngModel)]="search"
            (input)="loadOrders()"
            class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
          />
          <select
            [(ngModel)]="statusFilter"
            (change)="loadOrders()"
            class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">{{ 'ORDERS.ALL_STATUSES' | translate }}</option>
            <option value="pending">{{ 'ORDERS.PENDING' | translate }}</option>
            <option value="paid">{{ 'ORDERS.PAID' | translate }}</option>
            <option value="processing">{{ 'ORDERS.PROCESSING' | translate }}</option>
            <option value="shipped">{{ 'ORDERS.SHIPPED' | translate }}</option>
            <option value="delivered">{{ 'ORDERS.DELIVERED' | translate }}</option>
            <option value="completed">{{ 'ORDERS.COMPLETED' | translate }}</option>
            <option value="cancelled">{{ 'ORDERS.CANCELLED' | translate }}</option>
            <option value="refunded">{{ 'ORDERS.REFUNDED' | translate }}</option>
          </select>
        </div>
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
                    {{ 'ORDERS.ORDER' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.CUSTOMER' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.DATE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.TYPE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.TOTAL' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ORDERS.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (order of orders(); track order.id) {
                  <tr class="hover:bg-gray-50/50">
                    <td class="px-6 py-4">
                      <a
                        [routerLink]="['/orders', order.id]"
                        class="text-sm font-medium text-primary hover:text-primary-hover"
                      >
                        {{ order.orderNumber }}
                      </a>
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ order.userId || order.guestEmail || ('ORDERS.GUEST' | translate) }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ formatDate(order.createdAt) }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary capitalize">
                      {{ order.orderType?.toLowerCase() }}
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge [status]="order.status" />
                    </td>
                    <td class="px-6 py-4 text-sm text-text-primary font-medium text-right">
                      {{ formatCurrency(order.total) }}
                    </td>
                    <td class="px-6 py-4 text-right">
                      <a
                        [routerLink]="['/orders', order.id]"
                        class="text-sm text-primary hover:text-primary-hover"
                      >
                        {{ 'ORDERS.VIEW' | translate }}
                      </a>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'ORDERS.NO_ORDERS' | translate }}
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderListComponent, { className: "OrderListComponent", filePath: "src/app/features/orders/order-list/order-list.component.ts", lineNumber: 153 });
})();
export {
  OrderListComponent
};
//# sourceMappingURL=chunk-WSS4ZSFN.js.map
