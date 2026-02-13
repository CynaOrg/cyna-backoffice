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
  ConfirmModalComponent
} from "./chunk-DNYKELFX.js";
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
import "./chunk-D4TFPFZU.js";
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
  ɵɵclassMap,
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

// src/app/features/subscriptions/subscription-list/subscription-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SubscriptionListComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function SubscriptionListComponent_Conditional_22_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 14);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "SUBSCRIPTIONS.ACTIONS"), " ");
  }
}
function SubscriptionListComponent_Conditional_22_For_26_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 27);
    \u0275\u0275listener("click", function SubscriptionListComponent_Conditional_22_For_26_Conditional_13_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const sub_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmAction(sub_r2, "cancel"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "SUBSCRIPTIONS.CANCEL"), " ");
  }
}
function SubscriptionListComponent_Conditional_22_For_26_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function SubscriptionListComponent_Conditional_22_For_26_Conditional_13_Conditional_2_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const sub_r2 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmAction(sub_r2, "reactivate"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "SUBSCRIPTIONS.REACTIVATE"), " ");
  }
}
function SubscriptionListComponent_Conditional_22_For_26_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275conditionalCreate(1, SubscriptionListComponent_Conditional_22_For_26_Conditional_13_Conditional_1_Template, 3, 3, "button", 25)(2, SubscriptionListComponent_Conditional_22_For_26_Conditional_13_Conditional_2_Template, 3, 3, "button", 26);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sub_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(sub_r2.status === "active" ? 1 : sub_r2.status === "cancelled" || sub_r2.status === "paused" ? 2 : -1);
  }
}
function SubscriptionListComponent_Conditional_22_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 17)(1, "td", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 20);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 22);
    \u0275\u0275element(10, "app-status-badge", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 19);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(13, SubscriptionListComponent_Conditional_22_For_26_Conditional_13_Template, 3, 1, "td", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sub_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap(sub_r2.status === "past_due" ? "bg-orange-50/30" : "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", sub_r2.productName || sub_r2.productId, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", sub_r2.userId, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", sub_r2.billingPeriod == null ? null : sub_r2.billingPeriod.toLowerCase(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatCurrency(sub_r2.price), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("status", sub_r2.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatDate(sub_r2.currentPeriodEnd), " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.auth.isSuperAdmin() ? 13 : -1);
  }
}
function SubscriptionListComponent_Conditional_22_ForEmpty_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 29);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "SUBSCRIPTIONS.NO_SUBSCRIPTIONS"), " ");
  }
}
function SubscriptionListComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "div", 10)(2, "table", 11)(3, "thead")(4, "tr", 12)(5, "th", 13);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 13);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 13);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 13);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 13);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 13);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(23, SubscriptionListComponent_Conditional_22_Conditional_23_Template, 3, 3, "th", 14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "tbody", 15);
    \u0275\u0275repeaterCreate(25, SubscriptionListComponent_Conditional_22_For_26_Template, 14, 9, "tr", 16, _forTrack0, false, SubscriptionListComponent_Conditional_22_ForEmpty_27_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 8, "SUBSCRIPTIONS.PRODUCT"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 10, "SUBSCRIPTIONS.CUSTOMER"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 12, "SUBSCRIPTIONS.PERIOD"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 14, "SUBSCRIPTIONS.PRICE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 16, "SUBSCRIPTIONS.STATUS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 18, "SUBSCRIPTIONS.PERIOD_END"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.auth.isSuperAdmin() ? 23 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.subscriptions());
  }
}
var SubscriptionListComponent = class _SubscriptionListComponent {
  api = inject(ApiService);
  auth = inject(AdminAuthService);
  notifications = inject(NotificationService);
  translate = inject(TranslateService);
  subscriptions = signal([], ...ngDevMode ? [{ debugName: "subscriptions" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  statusFilter = "";
  showModal = signal(false, ...ngDevMode ? [{ debugName: "showModal" }] : []);
  modalAction = signal("cancel", ...ngDevMode ? [{ debugName: "modalAction" }] : []);
  selectedSub = signal(null, ...ngDevMode ? [{ debugName: "selectedSub" }] : []);
  ngOnInit() {
    this.loadSubscriptions();
  }
  loadSubscriptions() {
    this.loading.set(true);
    const params = {};
    if (this.statusFilter)
      params["status"] = this.statusFilter;
    this.api.getList("admin/payments/subscriptions", params).subscribe({
      next: (data) => {
        this.subscriptions.set(data || []);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error("Failed to load subscriptions");
        this.loading.set(false);
      }
    });
  }
  confirmAction(sub, action) {
    this.selectedSub.set(sub);
    this.modalAction.set(action);
    this.showModal.set(true);
  }
  executeAction() {
    const sub = this.selectedSub();
    if (!sub)
      return;
    this.api.patch(`admin/payments/subscriptions/${sub.id}/status`, {
      action: this.modalAction()
    }).subscribe({
      next: () => {
        this.notifications.success(this.modalAction() === "cancel" ? this.translate.instant("SUBSCRIPTIONS.CANCELLED_SUCCESS") : this.translate.instant("SUBSCRIPTIONS.REACTIVATED_SUCCESS"));
        this.loadSubscriptions();
        this.showModal.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("SUBSCRIPTIONS.UPDATE_FAILED"));
        this.showModal.set(false);
      }
    });
  }
  formatCurrency(v) {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(v);
  }
  formatDate(d) {
    return d ? new Date(d).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }) : "N/A";
  }
  static \u0275fac = function SubscriptionListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SubscriptionListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SubscriptionListComponent, selectors: [["app-subscription-list"]], decls: 30, vars: 37, consts: [[1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "p-4", "mb-6"], [1, "px-4", "py-2", "rounded-lg", "border", "border-border", "bg-white", "text-sm", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "active"], ["value", "past_due"], ["value", "cancelled"], ["value", "unpaid"], ["value", "paused"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "overflow-hidden"], [3, "confirm", "cancel", "open", "title", "message", "confirmLabel", "variant"], [1, "overflow-x-auto"], [1, "w-full"], [1, "border-b", "border-border-light"], [1, "px-6", "py-3", "text-left", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "px-6", "py-3", "text-right", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "divide-y", "divide-border-light"], [1, "hover:bg-gray-50/50", 3, "class"], [1, "hover:bg-gray-50/50"], [1, "px-6", "py-4", "text-sm", "font-medium", "text-text-primary"], [1, "px-6", "py-4", "text-sm", "text-text-secondary"], [1, "px-6", "py-4", "text-sm", "text-text-secondary", "capitalize"], [1, "px-6", "py-4", "text-sm", "text-text-primary", "font-medium"], [1, "px-6", "py-4"], [3, "status"], [1, "px-6", "py-4", "text-right"], [1, "text-sm", "text-error", "hover:text-red-700"], [1, "text-sm", "text-primary", "hover:text-primary-hover"], [1, "text-sm", "text-error", "hover:text-red-700", 3, "click"], [1, "text-sm", "text-primary", "hover:text-primary-hover", 3, "click"], ["colspan", "7", 1, "px-6", "py-12", "text-center", "text-text-muted", "text-sm"]], template: function SubscriptionListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div")(1, "div", 0)(2, "select", 1);
      \u0275\u0275twoWayListener("ngModelChange", function SubscriptionListComponent_Template_select_ngModelChange_2_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.statusFilter, $event) || (ctx.statusFilter = $event);
        return $event;
      });
      \u0275\u0275listener("change", function SubscriptionListComponent_Template_select_change_2_listener() {
        return ctx.loadSubscriptions();
      });
      \u0275\u0275elementStart(3, "option", 2);
      \u0275\u0275text(4);
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "option", 3);
      \u0275\u0275text(7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "option", 4);
      \u0275\u0275text(10);
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "option", 5);
      \u0275\u0275text(13);
      \u0275\u0275pipe(14, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "option", 6);
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "option", 7);
      \u0275\u0275text(19);
      \u0275\u0275pipe(20, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275conditionalCreate(21, SubscriptionListComponent_Conditional_21_Template, 1, 0, "app-loading-spinner")(22, SubscriptionListComponent_Conditional_22_Template, 28, 20, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "app-confirm-modal", 9);
      \u0275\u0275pipe(24, "translate");
      \u0275\u0275pipe(25, "translate");
      \u0275\u0275pipe(26, "translate");
      \u0275\u0275pipe(27, "translate");
      \u0275\u0275pipe(28, "translate");
      \u0275\u0275pipe(29, "translate");
      \u0275\u0275listener("confirm", function SubscriptionListComponent_Template_app_confirm_modal_confirm_23_listener() {
        return ctx.executeAction();
      })("cancel", function SubscriptionListComponent_Template_app_confirm_modal_cancel_23_listener() {
        return ctx.showModal.set(false);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.statusFilter);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 13, "SUBSCRIPTIONS.ALL_STATUSES"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 15, "SUBSCRIPTIONS.ACTIVE"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(11, 17, "SUBSCRIPTIONS.PAST_DUE"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 19, "SUBSCRIPTIONS.CANCELLED"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 21, "SUBSCRIPTIONS.UNPAID"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 23, "SUBSCRIPTIONS.PAUSED"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 21 : 22);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showModal())("title", ctx.modalAction() === "cancel" ? \u0275\u0275pipeBind1(24, 25, "SUBSCRIPTIONS.CANCEL_TITLE") : \u0275\u0275pipeBind1(25, 27, "SUBSCRIPTIONS.REACTIVATE_TITLE"))("message", ctx.modalAction() === "cancel" ? \u0275\u0275pipeBind1(26, 29, "SUBSCRIPTIONS.CANCEL_CONFIRM") : \u0275\u0275pipeBind1(27, 31, "SUBSCRIPTIONS.REACTIVATE_CONFIRM"))("confirmLabel", ctx.modalAction() === "cancel" ? \u0275\u0275pipeBind1(28, 33, "SUBSCRIPTIONS.CANCEL_BTN") : \u0275\u0275pipeBind1(29, 35, "SUBSCRIPTIONS.REACTIVATE_BTN"))("variant", ctx.modalAction() === "cancel" ? "danger" : "primary");
    }
  }, dependencies: [
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    TranslateModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SubscriptionListComponent, [{
    type: Component,
    args: [{
      selector: "app-subscription-list",
      standalone: true,
      imports: [
        FormsModule,
        TranslateModule,
        StatusBadgeComponent,
        LoadingSpinnerComponent,
        ConfirmModalComponent
      ],
      template: `
    <div>
      <div class="bg-surface rounded-xl border border-border-light shadow-sm p-4 mb-6">
        <select
          [(ngModel)]="statusFilter"
          (change)="loadSubscriptions()"
          class="px-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">{{ 'SUBSCRIPTIONS.ALL_STATUSES' | translate }}</option>
          <option value="active">{{ 'SUBSCRIPTIONS.ACTIVE' | translate }}</option>
          <option value="past_due">{{ 'SUBSCRIPTIONS.PAST_DUE' | translate }}</option>
          <option value="cancelled">{{ 'SUBSCRIPTIONS.CANCELLED' | translate }}</option>
          <option value="unpaid">{{ 'SUBSCRIPTIONS.UNPAID' | translate }}</option>
          <option value="paused">{{ 'SUBSCRIPTIONS.PAUSED' | translate }}</option>
        </select>
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
                    {{ 'SUBSCRIPTIONS.PRODUCT' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.CUSTOMER' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.PERIOD' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.PRICE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'SUBSCRIPTIONS.PERIOD_END' | translate }}
                  </th>
                  @if (auth.isSuperAdmin()) {
                    <th
                      class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                    >
                      {{ 'SUBSCRIPTIONS.ACTIONS' | translate }}
                    </th>
                  }
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (sub of subscriptions(); track sub.id) {
                  <tr
                    class="hover:bg-gray-50/50"
                    [class]="sub.status === 'past_due' ? 'bg-orange-50/30' : ''"
                  >
                    <td class="px-6 py-4 text-sm font-medium text-text-primary">
                      {{ sub.productName || sub.productId }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ sub.userId }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary capitalize">
                      {{ sub.billingPeriod?.toLowerCase() }}
                    </td>
                    <td class="px-6 py-4 text-sm text-text-primary font-medium">
                      {{ formatCurrency(sub.price) }}
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge [status]="sub.status" />
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ formatDate(sub.currentPeriodEnd) }}
                    </td>
                    @if (auth.isSuperAdmin()) {
                      <td class="px-6 py-4 text-right">
                        @if (sub.status === 'active') {
                          <button
                            (click)="confirmAction(sub, 'cancel')"
                            class="text-sm text-error hover:text-red-700"
                          >
                            {{ 'SUBSCRIPTIONS.CANCEL' | translate }}
                          </button>
                        } @else if (sub.status === 'cancelled' || sub.status === 'paused') {
                          <button
                            (click)="confirmAction(sub, 'reactivate')"
                            class="text-sm text-primary hover:text-primary-hover"
                          >
                            {{ 'SUBSCRIPTIONS.REACTIVATE' | translate }}
                          </button>
                        }
                      </td>
                    }
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'SUBSCRIPTIONS.NO_SUBSCRIPTIONS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>

    <app-confirm-modal
      [open]="showModal()"
      [title]="
        modalAction() === 'cancel'
          ? ('SUBSCRIPTIONS.CANCEL_TITLE' | translate)
          : ('SUBSCRIPTIONS.REACTIVATE_TITLE' | translate)
      "
      [message]="
        modalAction() === 'cancel'
          ? ('SUBSCRIPTIONS.CANCEL_CONFIRM' | translate)
          : ('SUBSCRIPTIONS.REACTIVATE_CONFIRM' | translate)
      "
      [confirmLabel]="
        modalAction() === 'cancel'
          ? ('SUBSCRIPTIONS.CANCEL_BTN' | translate)
          : ('SUBSCRIPTIONS.REACTIVATE_BTN' | translate)
      "
      [variant]="modalAction() === 'cancel' ? 'danger' : 'primary'"
      (confirm)="executeAction()"
      (cancel)="showModal.set(false)"
    />
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SubscriptionListComponent, { className: "SubscriptionListComponent", filePath: "src/app/features/subscriptions/subscription-list/subscription-list.component.ts", lineNumber: 167 });
})();
export {
  SubscriptionListComponent
};
//# sourceMappingURL=chunk-BWMSPGGC.js.map
