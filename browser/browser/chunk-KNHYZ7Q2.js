import {
  AnalyticsService,
  KpiCardComponent
} from "./chunk-7MEUWVIL.js";
import {
  ContentService
} from "./chunk-GUJTGOJS.js";
import {
  LoadingSpinnerComponent
} from "./chunk-65YBE2BR.js";
import {
  StatusBadgeComponent
} from "./chunk-LY5M4DQD.js";
import {
  AdminAuthService
} from "./chunk-77RDWDYA.js";
import "./chunk-XHKBGM2G.js";
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
  computed,
  forkJoin,
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
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3
} from "./chunk-7J6Y2ARR.js";

// src/app/features/dashboard/dashboard.component.ts
var _c0 = (a0) => ({ name: a0 });
var _c1 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
function DashboardComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function DashboardComponent_Conditional_6_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "a", 11)(2, "div", 12);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 13);
    \u0275\u0275element(4, "path", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div")(6, "div", 15);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 16);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 17);
    \u0275\u0275element(12, "path", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "a", 19)(14, "div", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 21);
    \u0275\u0275element(16, "path", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "div")(18, "div", 15);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 16);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(23, "svg", 17);
    \u0275\u0275element(24, "path", 18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r0.lowStockCount());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 4, "DASHBOARD.LOW_STOCK"), " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r0.unreadMessages());
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 6, "DASHBOARD.UNREAD_MESSAGES"), " ");
  }
}
function DashboardComponent_Conditional_6_Conditional_10_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 31)(1, "td", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 33);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 34);
    \u0275\u0275element(6, "app-status-badge", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 36);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", order_r2.orderNumber, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDate(order_r2.createdAt), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("status", order_r2.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatCurrency(order_r2.total), " ");
  }
}
function DashboardComponent_Conditional_6_Conditional_10_ForEmpty_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 37);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "DASHBOARD.NO_ORDERS"), " ");
  }
}
function DashboardComponent_Conditional_6_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 23)(2, "h3", 2);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "a", 24);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 25)(9, "table", 26)(10, "thead")(11, "tr", 27)(12, "th", 28);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 28);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 28);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "th", 29);
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "tbody", 30);
    \u0275\u0275repeaterCreate(25, DashboardComponent_Conditional_6_Conditional_10_For_26_Template, 9, 4, "tr", 31, _forTrack0, false, DashboardComponent_Conditional_6_Conditional_10_ForEmpty_27_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_8_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 7, "DASHBOARD.RECENT_ORDERS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 9, "DASHBOARD.VIEW_ALL"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 11, "DASHBOARD.ORDER"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(17, 13, "DASHBOARD.DATE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 15, "DASHBOARD.STATUS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(23, 17, "DASHBOARD.TOTAL"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(((tmp_8_0 = ctx_r0.data()) == null ? null : tmp_8_0.recentOrders) || \u0275\u0275pureFunction0(19, _c1));
  }
}
function DashboardComponent_Conditional_6_Conditional_11_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275classMap(ctx_r0.data().kpis.avgCartVariation >= 0 ? "text-success" : "text-error");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3(" ", ctx_r0.data().kpis.avgCartVariation >= 0 ? "+" : "", "", ctx_r0.data().kpis.avgCartVariation, "% ", \u0275\u0275pipeBind1(2, 5, "DASHBOARD.VS_LAST_PERIOD"), " ");
  }
}
function DashboardComponent_Conditional_6_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "h3", 38);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 39)(5, "div", 40)(6, "div", 41);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 42);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, DashboardComponent_Conditional_6_Conditional_11_Conditional_11_Template, 3, 7, "span", 43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div", 40)(13, "div", 41);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 42);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 44);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 45)(22, "div", 46)(23, "span", 16);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 47);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 48);
    \u0275\u0275element(29, "div", 49);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_7_0;
    let tmp_10_0;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 11, "DASHBOARD.SALES_OVERVIEW"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(8, 13, "DASHBOARD.AVG_CART"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatCurrency(((tmp_4_0 = ctx_r0.data()) == null ? null : tmp_4_0.kpis == null ? null : tmp_4_0.kpis.avgCartValue) || 0), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_5_0 = ctx_r0.data()) == null ? null : tmp_5_0.kpis == null ? null : tmp_5_0.kpis.avgCartVariation) !== void 0 ? 11 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 15, "DASHBOARD.CONVERSION_RATE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ((tmp_7_0 = ctx_r0.data()) == null ? null : tmp_7_0.kpis == null ? null : tmp_7_0.kpis.conversionRate) !== void 0 ? ctx_r0.data().kpis.conversionRate + "%" : "N/A", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 17, "DASHBOARD.BASED_ON_PERIOD"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(25, 19, "DASHBOARD.REVENUE_TARGET"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatCurrency(((tmp_10_0 = ctx_r0.data()) == null ? null : tmp_10_0.kpis == null ? null : tmp_10_0.kpis.totalRevenue) || 0), " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", ctx_r0.revenueProgress(), "%");
  }
}
function DashboardComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3);
    \u0275\u0275element(1, "app-kpi-card", 4);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275element(3, "app-kpi-card", 5);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275element(5, "app-kpi-card", 6);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275element(7, "app-kpi-card", 7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(9, DashboardComponent_Conditional_6_Conditional_9_Template, 25, 8, "div", 8);
    \u0275\u0275conditionalCreate(10, DashboardComponent_Conditional_6_Conditional_10_Template, 28, 20, "div", 9);
    \u0275\u0275conditionalCreate(11, DashboardComponent_Conditional_6_Conditional_11_Template, 30, 21, "div", 10);
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_3_0;
    let tmp_4_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_9_0;
    let tmp_10_0;
    let tmp_12_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r0.formatCurrency(((tmp_1_0 = ctx_r0.data()) == null ? null : tmp_1_0.kpis == null ? null : tmp_1_0.kpis.totalRevenue) || 0))("label", \u0275\u0275pipeBind1(2, 15, "DASHBOARD.TOTAL_REVENUE"))("variation", (tmp_3_0 = ctx_r0.data()) == null ? null : tmp_3_0.kpis == null ? null : tmp_3_0.kpis.revenueVariation);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", ctx_r0.formatCurrency(((tmp_4_0 = ctx_r0.data()) == null ? null : tmp_4_0.kpis == null ? null : tmp_4_0.kpis.mrr) || 0))("label", \u0275\u0275pipeBind1(4, 17, "DASHBOARD.MRR"))("variation", (tmp_6_0 = ctx_r0.data()) == null ? null : tmp_6_0.kpis == null ? null : tmp_6_0.kpis.mrrVariation);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", (((tmp_7_0 = ctx_r0.data()) == null ? null : tmp_7_0.kpis == null ? null : tmp_7_0.kpis.totalOrders) || 0).toString())("label", \u0275\u0275pipeBind1(6, 19, "DASHBOARD.TOTAL_ORDERS"))("variation", (tmp_9_0 = ctx_r0.data()) == null ? null : tmp_9_0.kpis == null ? null : tmp_9_0.kpis.ordersVariation);
    \u0275\u0275advance(2);
    \u0275\u0275property("value", (((tmp_10_0 = ctx_r0.data()) == null ? null : tmp_10_0.kpis == null ? null : tmp_10_0.kpis.activeSubscriptions) || 0).toString())("label", \u0275\u0275pipeBind1(8, 21, "DASHBOARD.ACTIVE_SUBSCRIPTIONS"))("variation", (tmp_12_0 = ctx_r0.data()) == null ? null : tmp_12_0.kpis == null ? null : tmp_12_0.kpis.subscriptionsVariation);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.authService.isSuperAdmin() ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.authService.isSuperAdmin() ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.authService.isCommercial() ? 11 : -1);
  }
}
var DashboardComponent = class _DashboardComponent {
  authService = inject(AdminAuthService);
  analyticsService = inject(AnalyticsService);
  contentService = inject(ContentService);
  notifications = inject(NotificationService);
  translate = inject(TranslateService);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  data = signal(null, ...ngDevMode ? [{ debugName: "data" }] : []);
  lowStockCount = signal(0, ...ngDevMode ? [{ debugName: "lowStockCount" }] : []);
  unreadMessages = signal(0, ...ngDevMode ? [{ debugName: "unreadMessages" }] : []);
  adminFirstName = computed(() => this.authService.admin()?.firstName || "Admin", ...ngDevMode ? [{ debugName: "adminFirstName" }] : []);
  revenueProgress = computed(() => {
    const revenue = this.data()?.kpis?.totalRevenue || 0;
    const target = 1e5;
    return Math.min(revenue / target * 100, 100);
  }, ...ngDevMode ? [{ debugName: "revenueProgress" }] : []);
  ngOnInit() {
    this.loadDashboard();
  }
  loadDashboard() {
    this.loading.set(true);
    this.analyticsService.getDashboard().subscribe({
      next: (apiData) => {
        const viewModel = {
          kpis: {
            totalRevenue: apiData?.revenue?.total ?? 0,
            revenueVariation: apiData?.revenue?.changePercent,
            mrr: apiData?.subscriptions?.mrr ?? 0,
            mrrVariation: apiData?.subscriptions?.changePercent,
            totalOrders: apiData?.orders?.total ?? 0,
            ordersVariation: apiData?.orders?.changePercent,
            activeSubscriptions: apiData?.subscriptions?.active ?? 0,
            subscriptionsVariation: apiData?.subscriptions?.changePercent,
            avgCartValue: apiData?.averageOrderValue ?? 0,
            conversionRate: apiData?.conversionRate
          },
          recentOrders: []
          // API does not return recent orders in dashboard endpoint
        };
        this.data.set(viewModel);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("DASHBOARD.LOAD_ERROR"));
        this.loading.set(false);
      }
    });
    if (this.authService.isSuperAdmin()) {
      this.loadSuperAdminData();
    }
  }
  loadSuperAdminData() {
    forkJoin({
      stock: this.analyticsService.getStockStatus(),
      messages: this.contentService.getContactMessages()
    }).subscribe({
      next: ({ stock, messages }) => {
        const lowStockAlerts = (stock?.summary?.lowStock ?? 0) + (stock?.summary?.outOfStock ?? 0);
        this.lowStockCount.set(lowStockAlerts);
        const unread = (messages || []).filter((msg) => !msg.isRead);
        this.unreadMessages.set(unread.length);
      },
      error: () => {
      }
    });
  }
  formatCurrency(value) {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
  }
  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 7, vars: 7, consts: [[2, "animation", "fadeInUp 0.45s ease-out"], [1, "mb-8"], [1, "text-lg", "font-semibold", "text-text-primary", "!m-0"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4", "gap-4", "mb-8"], ["iconPath", "M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "iconBgClass", "bg-success-light", "iconClass", "text-success", 3, "value", "label", "variation"], ["iconPath", "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941", "iconBgClass", "bg-info-light", "iconClass", "text-info", 3, "value", "label", "variation"], ["iconPath", "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z", "iconBgClass", "bg-primary-light", "iconClass", "text-primary", 3, "value", "label", "variation"], ["iconPath", "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182", "iconBgClass", "bg-warning-light", "iconClass", "text-warning", 3, "value", "label", "variation"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-4", "mb-8"], [1, "rounded-xl", "border", "border-border-light", "bg-surface", "shadow-sm"], [1, "rounded-xl", "border", "border-border-light", "bg-surface", "shadow-sm", "p-6"], ["routerLink", "/analytics", 1, "group", "flex", "items-center", "gap-4", "rounded-xl", "border", "border-border-light", "bg-surface", "p-6", "shadow-sm", "hover:shadow-md", "hover:-translate-y-px", "transition-all", "duration-200", "no-underline"], [1, "w-12", "h-12", "rounded-lg", "bg-warning-light", "flex", "items-center", "justify-center", "shrink-0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-warning"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"], [1, "text-2xl", "font-bold", "text-text-primary"], [1, "text-sm", "text-text-secondary"], ["fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", "stroke-width", "2", 1, "w-5", "h-5", "text-text-muted", "ml-auto", "opacity-0", "-translate-x-1", "group-hover:opacity-100", "group-hover:translate-x-0", "transition-all", "duration-200"], ["stroke-linecap", "round", "stroke-linejoin", "round", "d", "m8.25 4.5 7.5 7.5-7.5 7.5"], ["routerLink", "/content", 1, "group", "flex", "items-center", "gap-4", "rounded-xl", "border", "border-border-light", "bg-surface", "p-6", "shadow-sm", "hover:shadow-md", "hover:-translate-y-px", "transition-all", "duration-200", "no-underline"], [1, "w-12", "h-12", "rounded-lg", "bg-info-light", "flex", "items-center", "justify-center", "shrink-0"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-info"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"], [1, "px-6", "py-4", "border-b", "border-border-light", "flex", "items-center", "justify-between"], ["routerLink", "/orders", 1, "text-sm", "text-primary", "hover:text-primary-hover", "font-medium", "no-underline"], [1, "overflow-x-auto"], [1, "w-full"], [1, "border-b", "border-border-light"], [1, "px-6", "py-3", "text-left", "text-[11px]", "font-semibold", "uppercase", "tracking-wider", "text-text-muted"], [1, "px-6", "py-3", "text-right", "text-[11px]", "font-semibold", "uppercase", "tracking-wider", "text-text-muted"], [1, "divide-y", "divide-border-light"], [1, "hover:bg-background", "transition-colors"], [1, "px-6", "py-4", "text-sm", "font-medium", "text-text-primary"], [1, "px-6", "py-4", "text-sm", "text-text-secondary"], [1, "px-6", "py-4"], [3, "status"], [1, "px-6", "py-4", "text-sm", "text-text-primary", "text-right", "font-medium"], ["colspan", "4", 1, "px-6", "py-12", "text-center", "text-text-muted", "text-sm"], [1, "text-lg", "font-semibold", "text-text-primary", "!m-0", "mb-4"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], [1, "rounded-lg", "bg-background", "p-5"], [1, "text-sm", "text-text-secondary", "mb-1"], [1, "text-xl", "font-bold", "text-text-primary"], [1, "text-xs", "font-semibold", "mt-1", "inline-block", 3, "class"], [1, "text-xs", "text-text-secondary", "mt-1", "inline-block"], [1, "mt-6", "pt-6", "border-t", "border-border-light"], [1, "flex", "items-center", "justify-between", "mb-2"], [1, "text-sm", "font-medium", "text-text-primary"], [1, "w-full", "bg-border-light", "rounded-full", "h-3"], [1, "bg-primary", "rounded-full", "h-3", "transition-all", "duration-500"], [1, "text-xs", "font-semibold", "mt-1", "inline-block"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h2", 2);
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(5, DashboardComponent_Conditional_5_Template, 1, 0, "app-loading-spinner")(6, DashboardComponent_Conditional_6_Template, 12, 23);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(4, 2, "DASHBOARD.WELCOME_BACK", \u0275\u0275pureFunction1(5, _c0, ctx.adminFirstName())), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 5 : 6);
    }
  }, dependencies: [
    RouterLink,
    KpiCardComponent,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    TranslateModule,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{
      selector: "app-dashboard",
      standalone: true,
      imports: [
        RouterLink,
        KpiCardComponent,
        StatusBadgeComponent,
        LoadingSpinnerComponent,
        TranslateModule
      ],
      template: `
    <div style="animation: fadeInUp 0.45s ease-out">
      <!-- Welcome header -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-text-primary !m-0">
          {{ 'DASHBOARD.WELCOME_BACK' | translate: { name: adminFirstName() } }}
        </h2>
      </div>

      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <app-kpi-card
            [value]="formatCurrency(data()?.kpis?.totalRevenue || 0)"
            [label]="'DASHBOARD.TOTAL_REVENUE' | translate"
            [variation]="data()?.kpis?.revenueVariation"
            iconPath="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            iconBgClass="bg-success-light"
            iconClass="text-success"
          />
          <app-kpi-card
            [value]="formatCurrency(data()?.kpis?.mrr || 0)"
            [label]="'DASHBOARD.MRR' | translate"
            [variation]="data()?.kpis?.mrrVariation"
            iconPath="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            iconBgClass="bg-info-light"
            iconClass="text-info"
          />
          <app-kpi-card
            [value]="(data()?.kpis?.totalOrders || 0).toString()"
            [label]="'DASHBOARD.TOTAL_ORDERS' | translate"
            [variation]="data()?.kpis?.ordersVariation"
            iconPath="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
            iconBgClass="bg-primary-light"
            iconClass="text-primary"
          />
          <app-kpi-card
            [value]="(data()?.kpis?.activeSubscriptions || 0).toString()"
            [label]="'DASHBOARD.ACTIVE_SUBSCRIPTIONS' | translate"
            [variation]="data()?.kpis?.subscriptionsVariation"
            iconPath="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
            iconBgClass="bg-warning-light"
            iconClass="text-warning"
          />
        </div>

        <!-- Super Admin: Quick Access Cards -->
        @if (authService.isSuperAdmin()) {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <!-- Low Stock Alerts -->
            <a
              routerLink="/analytics"
              class="group flex items-center gap-4 rounded-xl border border-border-light bg-surface p-6 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200 no-underline"
            >
              <div
                class="w-12 h-12 rounded-lg bg-warning-light flex items-center justify-center shrink-0"
              >
                <svg
                  class="w-6 h-6 text-warning"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-text-primary">{{ lowStockCount() }}</div>
                <div class="text-sm text-text-secondary">
                  {{ 'DASHBOARD.LOW_STOCK' | translate }}
                </div>
              </div>
              <svg
                class="w-5 h-5 text-text-muted ml-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>

            <!-- Unread Messages -->
            <a
              routerLink="/content"
              class="group flex items-center gap-4 rounded-xl border border-border-light bg-surface p-6 shadow-sm hover:shadow-md hover:-translate-y-px transition-all duration-200 no-underline"
            >
              <div
                class="w-12 h-12 rounded-lg bg-info-light flex items-center justify-center shrink-0"
              >
                <svg
                  class="w-6 h-6 text-info"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <div class="text-2xl font-bold text-text-primary">{{ unreadMessages() }}</div>
                <div class="text-sm text-text-secondary">
                  {{ 'DASHBOARD.UNREAD_MESSAGES' | translate }}
                </div>
              </div>
              <svg
                class="w-5 h-5 text-text-muted ml-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          </div>
        }

        <!-- Super Admin: Recent Orders Table -->
        @if (authService.isSuperAdmin()) {
          <div class="rounded-xl border border-border-light bg-surface shadow-sm">
            <div class="px-6 py-4 border-b border-border-light flex items-center justify-between">
              <h3 class="text-lg font-semibold text-text-primary !m-0">
                {{ 'DASHBOARD.RECENT_ORDERS' | translate }}
              </h3>
              <a
                routerLink="/orders"
                class="text-sm text-primary hover:text-primary-hover font-medium no-underline"
              >
                {{ 'DASHBOARD.VIEW_ALL' | translate }}
              </a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-border-light">
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'DASHBOARD.ORDER' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'DASHBOARD.DATE' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'DASHBOARD.STATUS' | translate }}
                    </th>
                    <th
                      class="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'DASHBOARD.TOTAL' | translate }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-border-light">
                  @for (order of data()?.recentOrders || []; track order.id) {
                    <tr class="hover:bg-background transition-colors">
                      <td class="px-6 py-4 text-sm font-medium text-text-primary">
                        {{ order.orderNumber }}
                      </td>
                      <td class="px-6 py-4 text-sm text-text-secondary">
                        {{ formatDate(order.createdAt) }}
                      </td>
                      <td class="px-6 py-4">
                        <app-status-badge [status]="order.status" />
                      </td>
                      <td class="px-6 py-4 text-sm text-text-primary text-right font-medium">
                        {{ formatCurrency(order.total) }}
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="4" class="px-6 py-12 text-center text-text-muted text-sm">
                        {{ 'DASHBOARD.NO_ORDERS' | translate }}
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }

        <!-- Commercial: Sales Overview -->
        @if (authService.isCommercial()) {
          <div class="rounded-xl border border-border-light bg-surface shadow-sm p-6">
            <h3 class="text-lg font-semibold text-text-primary !m-0 mb-4">
              {{ 'DASHBOARD.SALES_OVERVIEW' | translate }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="rounded-lg bg-background p-5">
                <div class="text-sm text-text-secondary mb-1">
                  {{ 'DASHBOARD.AVG_CART' | translate }}
                </div>
                <div class="text-xl font-bold text-text-primary">
                  {{ formatCurrency(data()?.kpis?.avgCartValue || 0) }}
                </div>
                @if (data()?.kpis?.avgCartVariation !== undefined) {
                  <span
                    class="text-xs font-semibold mt-1 inline-block"
                    [class]="data()!.kpis.avgCartVariation! >= 0 ? 'text-success' : 'text-error'"
                  >
                    {{ data()!.kpis.avgCartVariation! >= 0 ? '+' : ''
                    }}{{ data()!.kpis.avgCartVariation }}%
                    {{ 'DASHBOARD.VS_LAST_PERIOD' | translate }}
                  </span>
                }
              </div>

              <div class="rounded-lg bg-background p-5">
                <div class="text-sm text-text-secondary mb-1">
                  {{ 'DASHBOARD.CONVERSION_RATE' | translate }}
                </div>
                <div class="text-xl font-bold text-text-primary">
                  {{
                    data()?.kpis?.conversionRate !== undefined
                      ? data()!.kpis.conversionRate + '%'
                      : 'N/A'
                  }}
                </div>
                <span class="text-xs text-text-secondary mt-1 inline-block">
                  {{ 'DASHBOARD.BASED_ON_PERIOD' | translate }}
                </span>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-border-light">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-text-secondary">{{
                  'DASHBOARD.REVENUE_TARGET' | translate
                }}</span>
                <span class="text-sm font-medium text-text-primary">
                  {{ formatCurrency(data()?.kpis?.totalRevenue || 0) }}
                </span>
              </div>
              <div class="w-full bg-border-light rounded-full h-3">
                <div
                  class="bg-primary rounded-full h-3 transition-all duration-500"
                  [style.width.%]="revenueProgress()"
                ></div>
              </div>
            </div>
          </div>
        }
      }
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/dashboard/dashboard.component.ts", lineNumber: 309 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-KNHYZ7Q2.js.map
