import {
  LoadingSpinnerComponent
} from "./chunk-65YBE2BR.js";
import {
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
  AdminAuthService
} from "./chunk-77RDWDYA.js";
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7J6Y2ARR.js";

// src/app/features/orders/order-detail/order-detail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function OrderDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function OrderDetailComponent_Conditional_2_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div")(2, "p", 23);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 24);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "p", 23);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", (item_r1.productSnapshot == null ? null : item_r1.productSnapshot.name) || item_r1.productName || item_r1.productId, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", \u0275\u0275pipeBind1(6, 5, "ORDERS.QTY"), ": ", item_r1.quantity, " ", item_r1.billingPeriod ? "(" + item_r1.billingPeriod + ")" : "", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatCurrency(item_r1.unitPrice * item_r1.quantity), " ");
  }
}
function OrderDetailComponent_Conditional_2_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 16);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "ORDERS.SHIPPING"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.order().shippingAmount));
  }
}
function OrderDetailComponent_Conditional_2_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 11);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "select", 25);
    \u0275\u0275twoWayListener("ngModelChange", function OrderDetailComponent_Conditional_2_Conditional_45_Template_select_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.newStatus, $event) || (ctx_r1.newStatus = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(5, "option", 26);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "option", 27);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "option", 28);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "option", 29);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "option", 30);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 31);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "option", 32);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 33);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "button", 34);
    \u0275\u0275listener("click", function OrderDetailComponent_Conditional_2_Conditional_45_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.updateStatus());
    });
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 12, "ORDERS.UPDATE_STATUS"));
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newStatus);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 14, "ORDERS.PENDING"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 16, "ORDERS.PAID"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 18, "ORDERS.PROCESSING"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 20, "ORDERS.SHIPPED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 22, "ORDERS.DELIVERED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 24, "ORDERS.COMPLETED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(25, 26, "ORDERS.CANCELLED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 28, "ORDERS.REFUNDED"));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.updating());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.updating() ? \u0275\u0275pipeBind1(31, 30, "ORDERS.UPDATING") : \u0275\u0275pipeBind1(32, 32, "ORDERS.UPDATE_STATUS"), " ");
  }
}
function OrderDetailComponent_Conditional_2_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 20);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 21);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(3, 2, "ORDERS.EMAIL"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.order().guestEmail);
  }
}
function OrderDetailComponent_Conditional_2_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 20);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "ORDERS.PAID"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.order().paidAt));
  }
}
function OrderDetailComponent_Conditional_2_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 20);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "ORDERS.SHIPPED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.order().shippedAt));
  }
}
function OrderDetailComponent_Conditional_2_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "span", 20);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "ORDERS.DELIVERED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.order().deliveredAt));
  }
}
function OrderDetailComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
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
    \u0275\u0275element(10, "app-status-badge", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "div", 10)(14, "h3", 11);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 12);
    \u0275\u0275repeaterCreate(18, OrderDetailComponent_Conditional_2_For_19_Template, 9, 7, "div", 13, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 10)(21, "h3", 11);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 14)(25, "div", 15)(26, "span", 16);
    \u0275\u0275text(27);
    \u0275\u0275pipe(28, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 15)(32, "span", 16);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(37, OrderDetailComponent_Conditional_2_Conditional_37_Template, 6, 4, "div", 15);
    \u0275\u0275elementStart(38, "div", 17)(39, "span");
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span");
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(44, "div", 18);
    \u0275\u0275conditionalCreate(45, OrderDetailComponent_Conditional_2_Conditional_45_Template, 33, 34, "div", 10);
    \u0275\u0275elementStart(46, "div", 10)(47, "h3", 11);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 19)(51, "div")(52, "span", 20);
    \u0275\u0275text(53);
    \u0275\u0275pipe(54, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "span", 21);
    \u0275\u0275text(56);
    \u0275\u0275pipe(57, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(58, OrderDetailComponent_Conditional_2_Conditional_58_Template, 6, 4, "div");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 10)(60, "h3", 11);
    \u0275\u0275text(61);
    \u0275\u0275pipe(62, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 19)(64, "div", 22)(65, "span", 20);
    \u0275\u0275text(66);
    \u0275\u0275pipe(67, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "span");
    \u0275\u0275text(69);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(70, OrderDetailComponent_Conditional_2_Conditional_70_Template, 6, 4, "div", 22);
    \u0275\u0275conditionalCreate(71, OrderDetailComponent_Conditional_2_Conditional_71_Template, 6, 4, "div", 22);
    \u0275\u0275conditionalCreate(72, OrderDetailComponent_Conditional_2_Conditional_72_Template, 6, 4, "div", 22);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", ctx_r1.order().orderNumber, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.order().createdAt));
    \u0275\u0275advance();
    \u0275\u0275property("status", ctx_r1.order().status);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 23, "ORDERS.ITEMS"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.order().items);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(23, 25, "ORDERS.SUMMARY"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 27, "ORDERS.SUBTOTAL"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.order().subtotal));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(34, 29, "ORDERS.TAX"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.order().taxAmount));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.order().shippingAmount > 0 ? 37 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(41, 31, "ORDERS.TOTAL"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatCurrency(ctx_r1.order().total));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.auth.isSuperAdmin() ? 45 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(49, 33, "ORDERS.CUSTOMER"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(54, 35, "ORDERS.ID"), ":");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.order().userId || \u0275\u0275pipeBind1(57, 37, "ORDERS.GUEST"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.order().guestEmail ? 58 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(62, 39, "ORDERS.TIMELINE"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(67, 41, "ORDERS.CREATED"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.formatDate(ctx_r1.order().createdAt));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.order().paidAt ? 70 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.order().shippedAt ? 71 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.order().deliveredAt ? 72 : -1);
  }
}
var OrderDetailComponent = class _OrderDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  api = inject(ApiService);
  auth = inject(AdminAuthService);
  notifications = inject(NotificationService);
  translate = inject(TranslateService);
  order = signal(null, ...ngDevMode ? [{ debugName: "order" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  updating = signal(false, ...ngDevMode ? [{ debugName: "updating" }] : []);
  newStatus = "pending";
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.loadOrder(id);
  }
  loadOrder(id) {
    this.api.get(`admin/orders/${id}`).subscribe({
      next: (order) => {
        this.order.set(order);
        this.newStatus = order.status;
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("ORDERS.NOT_FOUND"));
        this.router.navigate(["/orders"]);
      }
    });
  }
  updateStatus() {
    const o = this.order();
    if (!o)
      return;
    this.updating.set(true);
    this.api.patch(`admin/orders/${o.id}/status`, { status: this.newStatus }).subscribe({
      next: () => {
        this.order.update((ord) => ord ? __spreadProps(__spreadValues({}, ord), { status: this.newStatus }) : null);
        this.notifications.success(this.translate.instant("ORDERS.STATUS_UPDATED"));
        this.updating.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("ORDERS.UPDATE_FAILED"));
        this.updating.set(false);
      }
    });
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
  static \u0275fac = function OrderDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _OrderDetailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderDetailComponent, selectors: [["app-order-detail"]], decls: 3, vars: 1, consts: [[1, "flex", "items-center", "justify-between", "mb-6"], [1, "flex", "items-center", "gap-3"], ["routerLink", "/orders", 1, "p-2", "rounded-lg", "hover:bg-gray-100", "text-text-muted"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "text-2xl", "font-bold", "text-text-primary"], [1, "text-sm", "text-text-secondary"], [3, "status"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-6"], [1, "lg:col-span-2", "space-y-6"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "p-6"], [1, "text-lg", "font-semibold", "mb-4"], [1, "space-y-3"], [1, "flex", "items-center", "justify-between", "py-3", "border-b", "border-border-light", "last:border-0"], [1, "space-y-2"], [1, "flex", "justify-between", "text-sm"], [1, "text-text-secondary"], [1, "flex", "justify-between", "text-sm", "font-bold", "pt-2", "border-t", "border-border-light"], [1, "space-y-6"], [1, "space-y-2", "text-sm"], [1, "text-text-muted"], [1, "text-text-primary"], [1, "flex", "justify-between"], [1, "text-sm", "font-medium", "text-text-primary"], [1, "text-xs", "text-text-muted"], [1, "w-full", "px-4", "py-2.5", "rounded-lg", "border", "border-border", "bg-white", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "mb-3", 3, "ngModelChange", "ngModel"], ["value", "pending"], ["value", "paid"], ["value", "processing"], ["value", "shipped"], ["value", "delivered"], ["value", "completed"], ["value", "cancelled"], ["value", "refunded"], [1, "w-full", "py-2", "bg-primary", "text-white", "text-sm", "font-medium", "rounded-lg", "hover:bg-primary-hover", "disabled:opacity-60", 3, "click", "disabled"]], template: function OrderDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div");
      \u0275\u0275conditionalCreate(1, OrderDetailComponent_Conditional_1_Template, 1, 0, "app-loading-spinner")(2, OrderDetailComponent_Conditional_2_Template, 73, 43);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 1 : ctx.order() ? 2 : -1);
    }
  }, dependencies: [
    RouterLink,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    TranslateModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(OrderDetailComponent, [{
    type: Component,
    args: [{
      selector: "app-order-detail",
      standalone: true,
      imports: [
        RouterLink,
        FormsModule,
        TranslateModule,
        StatusBadgeComponent,
        LoadingSpinnerComponent
      ],
      template: `
    <div>
      @if (loading()) {
        <app-loading-spinner />
      } @else if (order()) {
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <a routerLink="/orders" class="p-2 rounded-lg hover:bg-gray-100 text-text-muted">
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
                {{ order()!.orderNumber }}
              </h1>
              <p class="text-sm text-text-secondary">{{ formatDate(order()!.createdAt) }}</p>
            </div>
          </div>
          <app-status-badge [status]="order()!.status" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-6">
            <!-- Items -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.ITEMS' | translate }}</h3>
              <div class="space-y-3">
                @for (item of order()!.items; track item.id) {
                  <div
                    class="flex items-center justify-between py-3 border-b border-border-light last:border-0"
                  >
                    <div>
                      <p class="text-sm font-medium text-text-primary">
                        {{ item.productSnapshot?.name || item.productName || item.productId }}
                      </p>
                      <p class="text-xs text-text-muted">
                        {{ 'ORDERS.QTY' | translate }}: {{ item.quantity }}
                        {{ item.billingPeriod ? '(' + item.billingPeriod + ')' : '' }}
                      </p>
                    </div>
                    <p class="text-sm font-medium text-text-primary">
                      {{ formatCurrency(item.unitPrice * item.quantity) }}
                    </p>
                  </div>
                }
              </div>
            </div>

            <!-- Summary -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.SUMMARY' | translate }}</h3>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-text-secondary">{{ 'ORDERS.SUBTOTAL' | translate }}</span>
                  <span>{{ formatCurrency(order()!.subtotal) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-text-secondary">{{ 'ORDERS.TAX' | translate }}</span>
                  <span>{{ formatCurrency(order()!.taxAmount) }}</span>
                </div>
                @if (order()!.shippingAmount > 0) {
                  <div class="flex justify-between text-sm">
                    <span class="text-text-secondary">{{ 'ORDERS.SHIPPING' | translate }}</span>
                    <span>{{ formatCurrency(order()!.shippingAmount) }}</span>
                  </div>
                }
                <div
                  class="flex justify-between text-sm font-bold pt-2 border-t border-border-light"
                >
                  <span>{{ 'ORDERS.TOTAL' | translate }}</span>
                  <span>{{ formatCurrency(order()!.total) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="space-y-6">
            <!-- Status Update -->
            @if (auth.isSuperAdmin()) {
              <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
                <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.UPDATE_STATUS' | translate }}</h3>
                <select
                  [(ngModel)]="newStatus"
                  class="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary mb-3"
                >
                  <option value="pending">{{ 'ORDERS.PENDING' | translate }}</option>
                  <option value="paid">{{ 'ORDERS.PAID' | translate }}</option>
                  <option value="processing">{{ 'ORDERS.PROCESSING' | translate }}</option>
                  <option value="shipped">{{ 'ORDERS.SHIPPED' | translate }}</option>
                  <option value="delivered">{{ 'ORDERS.DELIVERED' | translate }}</option>
                  <option value="completed">{{ 'ORDERS.COMPLETED' | translate }}</option>
                  <option value="cancelled">{{ 'ORDERS.CANCELLED' | translate }}</option>
                  <option value="refunded">{{ 'ORDERS.REFUNDED' | translate }}</option>
                </select>
                <button
                  (click)="updateStatus()"
                  [disabled]="updating()"
                  class="w-full py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover disabled:opacity-60"
                >
                  {{
                    updating()
                      ? ('ORDERS.UPDATING' | translate)
                      : ('ORDERS.UPDATE_STATUS' | translate)
                  }}
                </button>
              </div>
            }

            <!-- Customer Info -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.CUSTOMER' | translate }}</h3>
              <div class="space-y-2 text-sm">
                <div>
                  <span class="text-text-muted">{{ 'ORDERS.ID' | translate }}:</span>
                  <span class="text-text-primary">{{
                    order()!.userId || ('ORDERS.GUEST' | translate)
                  }}</span>
                </div>
                @if (order()!.guestEmail) {
                  <div>
                    <span class="text-text-muted">{{ 'ORDERS.EMAIL' | translate }}:</span>
                    <span class="text-text-primary">{{ order()!.guestEmail }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Dates -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h3 class="text-lg font-semibold mb-4">{{ 'ORDERS.TIMELINE' | translate }}</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-text-muted">{{ 'ORDERS.CREATED' | translate }}</span>
                  <span>{{ formatDate(order()!.createdAt) }}</span>
                </div>
                @if (order()!.paidAt) {
                  <div class="flex justify-between">
                    <span class="text-text-muted">{{ 'ORDERS.PAID' | translate }}</span>
                    <span>{{ formatDate(order()!.paidAt!) }}</span>
                  </div>
                }
                @if (order()!.shippedAt) {
                  <div class="flex justify-between">
                    <span class="text-text-muted">{{ 'ORDERS.SHIPPED' | translate }}</span>
                    <span>{{ formatDate(order()!.shippedAt!) }}</span>
                  </div>
                }
                @if (order()!.deliveredAt) {
                  <div class="flex justify-between">
                    <span class="text-text-muted">{{ 'ORDERS.DELIVERED' | translate }}</span>
                    <span>{{ formatDate(order()!.deliveredAt!) }}</span>
                  </div>
                }
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderDetailComponent, { className: "OrderDetailComponent", filePath: "src/app/features/orders/order-detail/order-detail.component.ts", lineNumber: 190 });
})();
export {
  OrderDetailComponent
};
//# sourceMappingURL=chunk-GZ4FJIGL.js.map
