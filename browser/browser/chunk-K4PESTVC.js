import {
  LoadingSpinnerComponent
} from "./chunk-65YBE2BR.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-SOM4FACY.js";
import {
  ConfirmModalComponent
} from "./chunk-DNYKELFX.js";
import {
  StatusBadgeComponent
} from "./chunk-LY5M4DQD.js";
import {
  ApiService
} from "./chunk-XHKBGM2G.js";
import {
  NotificationService
} from "./chunk-XMJJBEJ5.js";
import "./chunk-7NBDW476.js";
import "./chunk-IBCBMH7I.js";
import {
  Component,
  Injectable,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  __spreadProps,
  __spreadValues,
  inject,
  map,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵtextInterpolate2
} from "./chunk-7J6Y2ARR.js";

// src/app/core/services/admin-management.service.ts
var AdminManagementService = class _AdminManagementService {
  api = inject(ApiService);
  basePath = "admin/admins";
  getAdmins() {
    return this.api.get(this.basePath).pipe(map((res) => {
      if (Array.isArray(res))
        return res;
      if (res?.data && Array.isArray(res.data))
        return res.data;
      return [];
    }));
  }
  getAdmin(adminId) {
    return this.api.get(`${this.basePath}/${adminId}`);
  }
  createAdmin(dto) {
    return this.api.post(this.basePath, dto);
  }
  updateAdmin(adminId, dto) {
    return this.api.patch(`${this.basePath}/${adminId}`, dto);
  }
  deleteAdmin(adminId) {
    return this.api.delete(`${this.basePath}/${adminId}`);
  }
  static \u0275fac = function AdminManagementService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminManagementService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminManagementService, factory: _AdminManagementService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminManagementService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/features/admins/admin-list/admin-list.component.ts
var _c0 = (a0) => ({ name: a0 });
var _forTrack0 = ($index, $item) => $item.id;
function AdminListComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function AdminListComponent_Conditional_6_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 11)(1, "td", 12)(2, "span", 13);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 14);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 12)(7, "span", 15);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 12);
    \u0275\u0275element(12, "app-status-badge", 16);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 14);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "td", 17)(19, "div", 18)(20, "button", 19);
    \u0275\u0275listener("click", function AdminListComponent_Conditional_6_For_25_Template_button_click_20_listener() {
      const admin_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleActive(admin_r2));
    });
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 20);
    \u0275\u0275listener("click", function AdminListComponent_Conditional_6_For_25_Template_button_click_24_listener() {
      const admin_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openEditModal(admin_r2));
    });
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 21);
    \u0275\u0275listener("click", function AdminListComponent_Conditional_6_For_25_Template_button_click_27_listener() {
      const admin_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmDelete(admin_r2));
    });
    \u0275\u0275text(28);
    \u0275\u0275pipe(29, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const admin_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", admin_r2.firstName, " ", admin_r2.lastName, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", admin_r2.email, " ");
    \u0275\u0275advance(2);
    \u0275\u0275classMap(admin_r2.role === "super_admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", admin_r2.role === "super_admin" ? \u0275\u0275pipeBind1(9, 14, "ADMINS.SUPER_ADMIN") : \u0275\u0275pipeBind1(10, 16, "ADMINS.COMMERCIAL"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("status", admin_r2.isActive ? "active" : "inactive")("label", admin_r2.isActive ? \u0275\u0275pipeBind1(13, 18, "ADMINS.ACTIVE") : \u0275\u0275pipeBind1(14, 20, "ADMINS.INACTIVE"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", admin_r2.lastLoginAt ? ctx_r2.formatDate(admin_r2.lastLoginAt) : \u0275\u0275pipeBind1(17, 22, "ADMINS.NEVER"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(admin_r2.isActive ? "bg-red-50 text-red-600 hover:bg-red-100" : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", admin_r2.isActive ? \u0275\u0275pipeBind1(22, 24, "ADMINS.DEACTIVATE") : \u0275\u0275pipeBind1(23, 26, "ADMINS.ACTIVATE"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(26, 28, "ADMINS.EDIT"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(29, 30, "ADMINS.DELETE"), " ");
  }
}
function AdminListComponent_Conditional_6_ForEmpty_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 22);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "ADMINS.NO_ADMINS"), " ");
  }
}
function AdminListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 5)(2, "table", 6)(3, "thead")(4, "tr", 7)(5, "th", 8);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 8);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 8);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 8);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 8);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 9);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "tbody", 10);
    \u0275\u0275repeaterCreate(24, AdminListComponent_Conditional_6_For_25_Template, 30, 32, "tr", 11, _forTrack0, false, AdminListComponent_Conditional_6_ForEmpty_26_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 7, "ADMINS.NAME"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 9, "ADMINS.EMAIL"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 11, "ADMINS.ROLE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 13, "ADMINS.STATUS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 15, "ADMINS.LAST_LOGIN"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 17, "ADMINS.ACTIONS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.admins());
  }
}
function AdminListComponent_Conditional_7_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "ADMINS.FIRST_NAME_REQUIRED"), " ");
  }
}
function AdminListComponent_Conditional_7_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "ADMINS.LAST_NAME_REQUIRED"), " ");
  }
}
function AdminListComponent_Conditional_7_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "ADMINS.EMAIL_REQUIRED"));
  }
}
function AdminListComponent_Conditional_7_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "ADMINS.PASSWORD_MIN"));
  }
}
function AdminListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 23)(2, "h3", 24);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 25);
    \u0275\u0275listener("ngSubmit", function AdminListComponent_Conditional_7_Template_form_ngSubmit_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.createAdmin());
    });
    \u0275\u0275elementStart(6, "div", 26)(7, "div")(8, "label", 27);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 28);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275conditionalCreate(13, AdminListComponent_Conditional_7_Conditional_13_Template, 3, 3, "p", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div")(15, "label", 27);
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "input", 30);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275conditionalCreate(20, AdminListComponent_Conditional_7_Conditional_20_Template, 3, 3, "p", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "div")(22, "label", 27);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 31);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275conditionalCreate(27, AdminListComponent_Conditional_7_Conditional_27_Template, 3, 3, "p", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "label", 27);
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(32, "input", 32);
    \u0275\u0275pipe(33, "translate");
    \u0275\u0275conditionalCreate(34, AdminListComponent_Conditional_7_Conditional_34_Template, 3, 3, "p", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div")(36, "label", 27);
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "select", 33)(40, "option", 34);
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "option", 35);
    \u0275\u0275text(44);
    \u0275\u0275pipe(45, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(46, "div", 36)(47, "button", 37);
    \u0275\u0275listener("click", function AdminListComponent_Conditional_7_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showCreateModal.set(false));
    });
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "button", 38);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "translate");
    \u0275\u0275pipe(53, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    let tmp_8_0;
    let tmp_11_0;
    let tmp_14_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 20, "ADMINS.NEW_ADMIN_TITLE"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r2.createForm);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 22, "ADMINS.FIRST_NAME"));
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(12, 24, "ADMINS.FIRST_NAME_PLACEHOLDER"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_5_0 = ctx_r2.createForm.get("firstName")) == null ? null : tmp_5_0.touched) && ((tmp_5_0 = ctx_r2.createForm.get("firstName")) == null ? null : tmp_5_0.invalid) ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 26, "ADMINS.LAST_NAME"));
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(19, 28, "ADMINS.LAST_NAME_PLACEHOLDER"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_8_0 = ctx_r2.createForm.get("lastName")) == null ? null : tmp_8_0.touched) && ((tmp_8_0 = ctx_r2.createForm.get("lastName")) == null ? null : tmp_8_0.invalid) ? 20 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 30, "ADMINS.EMAIL"));
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(26, 32, "ADMINS.EMAIL_PLACEHOLDER"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_11_0 = ctx_r2.createForm.get("email")) == null ? null : tmp_11_0.touched) && ((tmp_11_0 = ctx_r2.createForm.get("email")) == null ? null : tmp_11_0.invalid) ? 27 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(31, 34, "ADMINS.PASSWORD"));
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(33, 36, "ADMINS.PASSWORD_PLACEHOLDER"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_14_0 = ctx_r2.createForm.get("password")) == null ? null : tmp_14_0.touched) && ((tmp_14_0 = ctx_r2.createForm.get("password")) == null ? null : tmp_14_0.invalid) ? 34 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(38, 38, "ADMINS.ROLE"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(42, 40, "ADMINS.SUPER_ADMIN"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(45, 42, "ADMINS.COMMERCIAL"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(49, 44, "ADMINS.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.createForm.invalid || ctx_r2.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.saving() ? \u0275\u0275pipeBind1(52, 46, "ADMINS.CREATING") : \u0275\u0275pipeBind1(53, 48, "ADMINS.CREATE_ADMIN"), " ");
  }
}
function AdminListComponent_Conditional_8_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "ADMINS.FIRST_NAME_REQUIRED"), " ");
  }
}
function AdminListComponent_Conditional_8_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "ADMINS.LAST_NAME_REQUIRED"), " ");
  }
}
function AdminListComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 23)(2, "h3", 24);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "form", 25);
    \u0275\u0275listener("ngSubmit", function AdminListComponent_Conditional_8_Template_form_ngSubmit_5_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.updateAdmin());
    });
    \u0275\u0275elementStart(6, "div", 26)(7, "div")(8, "label", 27);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 39);
    \u0275\u0275conditionalCreate(12, AdminListComponent_Conditional_8_Conditional_12_Template, 3, 3, "p", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "label", 27);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 40);
    \u0275\u0275conditionalCreate(18, AdminListComponent_Conditional_8_Conditional_18_Template, 3, 3, "p", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "label", 27);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 41);
    \u0275\u0275elementStart(24, "p", 42);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div")(28, "label", 27);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "select", 33)(32, "option", 34);
    \u0275\u0275text(33);
    \u0275\u0275pipe(34, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "option", 35);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(38, "div", 36)(39, "button", 37);
    \u0275\u0275listener("click", function AdminListComponent_Conditional_8_Template_button_click_39_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showEditModal.set(false));
    });
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 38);
    \u0275\u0275text(43);
    \u0275\u0275pipe(44, "translate");
    \u0275\u0275pipe(45, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_6_0;
    let tmp_8_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 15, "ADMINS.EDIT_ADMIN_TITLE"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r2.editForm);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 17, "ADMINS.FIRST_NAME"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r2.editForm.get("firstName")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx_r2.editForm.get("firstName")) == null ? null : tmp_4_0.invalid) ? 12 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 19, "ADMINS.LAST_NAME"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(((tmp_6_0 = ctx_r2.editForm.get("lastName")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx_r2.editForm.get("lastName")) == null ? null : tmp_6_0.invalid) ? 18 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 21, "ADMINS.EMAIL"));
    \u0275\u0275advance(2);
    \u0275\u0275property("value", (tmp_8_0 = ctx_r2.editingAdmin()) == null ? null : tmp_8_0.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(26, 23, "ADMINS.EMAIL_READONLY"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(30, 25, "ADMINS.ROLE"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(34, 27, "ADMINS.SUPER_ADMIN"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(37, 29, "ADMINS.COMMERCIAL"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(41, 31, "ADMINS.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.editForm.invalid || ctx_r2.saving());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.saving() ? \u0275\u0275pipeBind1(44, 33, "ADMINS.CREATING") : \u0275\u0275pipeBind1(45, 35, "ADMINS.SAVE_CHANGES"), " ");
  }
}
var AdminListComponent = class _AdminListComponent {
  adminService = inject(AdminManagementService);
  notifications = inject(NotificationService);
  fb = inject(FormBuilder);
  translate = inject(TranslateService);
  admins = signal([], ...ngDevMode ? [{ debugName: "admins" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  showCreateModal = signal(false, ...ngDevMode ? [{ debugName: "showCreateModal" }] : []);
  showEditModal = signal(false, ...ngDevMode ? [{ debugName: "showEditModal" }] : []);
  showDeleteModal = signal(false, ...ngDevMode ? [{ debugName: "showDeleteModal" }] : []);
  editingAdmin = signal(null, ...ngDevMode ? [{ debugName: "editingAdmin" }] : []);
  adminToDelete = signal(null, ...ngDevMode ? [{ debugName: "adminToDelete" }] : []);
  createForm = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    role: ["super_admin", Validators.required]
  });
  editForm = this.fb.nonNullable.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    role: ["super_admin", Validators.required]
  });
  ngOnInit() {
    this.loadAdmins();
  }
  loadAdmins() {
    this.loading.set(true);
    this.adminService.getAdmins().subscribe({
      next: (admins) => {
        this.admins.set(admins);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("ADMINS.LOAD_FAILED"));
        this.loading.set(false);
      }
    });
  }
  openCreateModal() {
    this.createForm.reset({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "super_admin"
    });
    this.showCreateModal.set(true);
  }
  openEditModal(admin) {
    this.editingAdmin.set(admin);
    this.editForm.reset({
      firstName: admin.firstName,
      lastName: admin.lastName,
      role: admin.role
    });
    this.showEditModal.set(true);
  }
  createAdmin() {
    if (this.createForm.invalid)
      return;
    this.saving.set(true);
    const dto = this.createForm.getRawValue();
    this.adminService.createAdmin(dto).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant("ADMINS.CREATED_SUCCESS"));
        this.showCreateModal.set(false);
        this.saving.set(false);
        this.loadAdmins();
      },
      error: (err) => {
        this.notifications.error(err.error?.message || this.translate.instant("ADMINS.CREATE_FAILED"));
        this.saving.set(false);
      }
    });
  }
  updateAdmin() {
    const admin = this.editingAdmin();
    if (!admin || this.editForm.invalid)
      return;
    this.saving.set(true);
    const dto = this.editForm.getRawValue();
    this.adminService.updateAdmin(admin.id, dto).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant("ADMINS.UPDATED_SUCCESS"));
        this.showEditModal.set(false);
        this.saving.set(false);
        this.loadAdmins();
      },
      error: (err) => {
        this.notifications.error(err.error?.message || this.translate.instant("ADMINS.UPDATE_FAILED"));
        this.saving.set(false);
      }
    });
  }
  toggleActive(admin) {
    const dto = { isActive: !admin.isActive };
    this.adminService.updateAdmin(admin.id, dto).subscribe({
      next: () => {
        this.notifications.success(admin.isActive ? this.translate.instant("ADMINS.DEACTIVATED_SUCCESS") : this.translate.instant("ADMINS.ACTIVATED_SUCCESS"));
        this.admins.update((list) => list.map((a) => a.id === admin.id ? __spreadProps(__spreadValues({}, a), { isActive: !a.isActive }) : a));
      },
      error: (err) => {
        this.notifications.error(err.error?.message || this.translate.instant("ADMINS.STATUS_FAILED"));
      }
    });
  }
  confirmDelete(admin) {
    this.adminToDelete.set(admin);
    this.showDeleteModal.set(true);
  }
  deleteAdmin() {
    const admin = this.adminToDelete();
    if (!admin)
      return;
    this.adminService.deleteAdmin(admin.id).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant("ADMINS.DELETED_SUCCESS"));
        this.admins.update((list) => list.filter((a) => a.id !== admin.id));
        this.showDeleteModal.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || this.translate.instant("ADMINS.DELETE_FAILED"));
        this.showDeleteModal.set(false);
      }
    });
  }
  formatDate(date) {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  static \u0275fac = function AdminListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminListComponent, selectors: [["app-admin-list"]], decls: 12, vars: 16, consts: [[1, "flex", "justify-end", "mb-6"], [1, "bg-primary", "text-white", "hover:bg-primary-hover", "rounded-lg", "px-4", "py-2", "text-sm", "font-medium", 3, "click"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "overflow-hidden"], [1, "fixed", "inset-0", "bg-black/50", "flex", "items-center", "justify-center", "z-50"], ["variant", "danger", 3, "confirm", "cancel", "open", "title", "message", "confirmLabel"], [1, "overflow-x-auto"], [1, "w-full"], [1, "border-b", "border-border-light"], [1, "px-6", "py-3", "text-left", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "px-6", "py-3", "text-right", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "divide-y", "divide-border-light"], [1, "hover:bg-gray-50/50", "border-b", "border-border-light"], [1, "px-6", "py-4"], [1, "text-sm", "font-medium", "text-text-primary"], [1, "px-6", "py-4", "text-sm", "text-text-secondary"], [1, "inline-flex", "items-center", "px-2.5", "py-0.5", "rounded-full", "text-xs", "font-medium"], [3, "status", "label"], [1, "px-6", "py-4", "text-right"], [1, "flex", "items-center", "justify-end", "gap-2"], [1, "text-xs", "font-medium", "px-2.5", "py-1", "rounded-lg", 3, "click"], [1, "text-sm", "text-primary", "hover:text-primary-hover", 3, "click"], [1, "text-sm", "text-error", "hover:text-red-700", 3, "click"], ["colspan", "6", 1, "px-6", "py-12", "text-center", "text-text-muted", "text-sm"], [1, "bg-white", "rounded-xl", "shadow-xl", "max-w-md", "w-full", "p-6", "mx-4"], [1, "text-lg", "font-semibold", "text-text-primary", "mb-4"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-2", "gap-4"], [1, "block", "text-sm", "font-medium", "text-text-primary", "mb-1"], ["formControlName", "firstName", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", 3, "placeholder"], [1, "text-xs", "text-error", "mt-1"], ["formControlName", "lastName", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", 3, "placeholder"], ["formControlName", "email", "type", "email", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", 3, "placeholder"], ["formControlName", "password", "type", "password", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", 3, "placeholder"], ["formControlName", "role", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary"], ["value", "super_admin"], ["value", "commercial"], [1, "flex", "justify-end", "gap-3", "pt-2"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "text-text-secondary", "border", "border-border", "rounded-lg", "hover:bg-gray-50", 3, "click"], ["type", "submit", 1, "bg-primary", "text-white", "hover:bg-primary-hover", "rounded-lg", "px-4", "py-2", "text-sm", "font-medium", "disabled:opacity-60", 3, "disabled"], ["formControlName", "firstName", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary"], ["formControlName", "lastName", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary"], ["type", "email", "disabled", "", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "bg-gray-50", "text-text-muted", "cursor-not-allowed", 3, "value"], [1, "text-xs", "text-text-muted", "mt-1"]], template: function AdminListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div")(1, "div", 0)(2, "button", 1);
      \u0275\u0275listener("click", function AdminListComponent_Template_button_click_2_listener() {
        return ctx.openCreateModal();
      });
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(5, AdminListComponent_Conditional_5_Template, 1, 0, "app-loading-spinner")(6, AdminListComponent_Conditional_6_Template, 27, 19, "div", 2);
      \u0275\u0275conditionalCreate(7, AdminListComponent_Conditional_7_Template, 54, 50, "div", 3);
      \u0275\u0275conditionalCreate(8, AdminListComponent_Conditional_8_Template, 46, 37, "div", 3);
      \u0275\u0275elementStart(9, "app-confirm-modal", 4);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275pipe(11, "translate");
      \u0275\u0275listener("confirm", function AdminListComponent_Template_app_confirm_modal_confirm_9_listener() {
        return ctx.deleteAdmin();
      })("cancel", function AdminListComponent_Template_app_confirm_modal_cancel_9_listener() {
        return ctx.showDeleteModal.set(false);
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_6_0;
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 8, "ADMINS.NEW_ADMIN"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 5 : 6);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.showCreateModal() ? 7 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showEditModal() ? 8 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteModal())("title", \u0275\u0275pipeBind1(10, 10, "ADMINS.DELETE_ADMIN_TITLE"))("message", ctx.translate.instant("ADMINS.DELETE_CONFIRM", \u0275\u0275pureFunction1(14, _c0, (((tmp_6_0 = ctx.adminToDelete()) == null ? null : tmp_6_0.firstName) || "") + " " + (((tmp_6_0 = ctx.adminToDelete()) == null ? null : tmp_6_0.lastName) || ""))))("confirmLabel", \u0275\u0275pipeBind1(11, 12, "ADMINS.DELETE_BTN"));
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    TranslateModule,
    StatusBadgeComponent,
    LoadingSpinnerComponent,
    ConfirmModalComponent,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminListComponent, [{
    type: Component,
    args: [{
      selector: "app-admin-list",
      standalone: true,
      imports: [
        ReactiveFormsModule,
        TranslateModule,
        StatusBadgeComponent,
        LoadingSpinnerComponent,
        ConfirmModalComponent
      ],
      template: `
    <div>
      <!-- Header -->
      <div class="flex justify-end mb-6">
        <button
          (click)="openCreateModal()"
          class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium"
        >
          {{ 'ADMINS.NEW_ADMIN' | translate }}
        </button>
      </div>

      <!-- Loading -->
      @if (loading()) {
        <app-loading-spinner />
      } @else {
        <!-- Table -->
        <div class="bg-surface rounded-xl border border-border-light shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.NAME' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.EMAIL' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.ROLE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.LAST_LOGIN' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                  >
                    {{ 'ADMINS.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (admin of admins(); track admin.id) {
                  <tr class="hover:bg-gray-50/50 border-b border-border-light">
                    <td class="px-6 py-4">
                      <span class="text-sm font-medium text-text-primary">
                        {{ admin.firstName }} {{ admin.lastName }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{ admin.email }}
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        [class]="
                          admin.role === 'super_admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        "
                      >
                        {{
                          admin.role === 'super_admin'
                            ? ('ADMINS.SUPER_ADMIN' | translate)
                            : ('ADMINS.COMMERCIAL' | translate)
                        }}
                      </span>
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge
                        [status]="admin.isActive ? 'active' : 'inactive'"
                        [label]="
                          admin.isActive
                            ? ('ADMINS.ACTIVE' | translate)
                            : ('ADMINS.INACTIVE' | translate)
                        "
                      />
                    </td>
                    <td class="px-6 py-4 text-sm text-text-secondary">
                      {{
                        admin.lastLoginAt
                          ? formatDate(admin.lastLoginAt)
                          : ('ADMINS.NEVER' | translate)
                      }}
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-2">
                        <button
                          (click)="toggleActive(admin)"
                          class="text-xs font-medium px-2.5 py-1 rounded-lg"
                          [class]="
                            admin.isActive
                              ? 'bg-red-50 text-red-600 hover:bg-red-100'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                          "
                        >
                          {{
                            admin.isActive
                              ? ('ADMINS.DEACTIVATE' | translate)
                              : ('ADMINS.ACTIVATE' | translate)
                          }}
                        </button>
                        <button
                          (click)="openEditModal(admin)"
                          class="text-sm text-primary hover:text-primary-hover"
                        >
                          {{ 'ADMINS.EDIT' | translate }}
                        </button>
                        <button
                          (click)="confirmDelete(admin)"
                          class="text-sm text-error hover:text-red-700"
                        >
                          {{ 'ADMINS.DELETE' | translate }}
                        </button>
                      </div>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center text-text-muted text-sm">
                      {{ 'ADMINS.NO_ADMINS' | translate }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }

      <!-- Create Admin Modal -->
      @if (showCreateModal()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4">
            <h3 class="text-lg font-semibold text-text-primary mb-4">
              {{ 'ADMINS.NEW_ADMIN_TITLE' | translate }}
            </h3>
            <form [formGroup]="createForm" (ngSubmit)="createAdmin()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">{{
                    'ADMINS.FIRST_NAME' | translate
                  }}</label>
                  <input
                    formControlName="firstName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    [placeholder]="'ADMINS.FIRST_NAME_PLACEHOLDER' | translate"
                  />
                  @if (
                    createForm.get('firstName')?.touched && createForm.get('firstName')?.invalid
                  ) {
                    <p class="text-xs text-error mt-1">
                      {{ 'ADMINS.FIRST_NAME_REQUIRED' | translate }}
                    </p>
                  }
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">{{
                    'ADMINS.LAST_NAME' | translate
                  }}</label>
                  <input
                    formControlName="lastName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    [placeholder]="'ADMINS.LAST_NAME_PLACEHOLDER' | translate"
                  />
                  @if (createForm.get('lastName')?.touched && createForm.get('lastName')?.invalid) {
                    <p class="text-xs text-error mt-1">
                      {{ 'ADMINS.LAST_NAME_REQUIRED' | translate }}
                    </p>
                  }
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.EMAIL' | translate
                }}</label>
                <input
                  formControlName="email"
                  type="email"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  [placeholder]="'ADMINS.EMAIL_PLACEHOLDER' | translate"
                />
                @if (createForm.get('email')?.touched && createForm.get('email')?.invalid) {
                  <p class="text-xs text-error mt-1">{{ 'ADMINS.EMAIL_REQUIRED' | translate }}</p>
                }
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.PASSWORD' | translate
                }}</label>
                <input
                  formControlName="password"
                  type="password"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  [placeholder]="'ADMINS.PASSWORD_PLACEHOLDER' | translate"
                />
                @if (createForm.get('password')?.touched && createForm.get('password')?.invalid) {
                  <p class="text-xs text-error mt-1">{{ 'ADMINS.PASSWORD_MIN' | translate }}</p>
                }
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.ROLE' | translate
                }}</label>
                <select
                  formControlName="role"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="super_admin">{{ 'ADMINS.SUPER_ADMIN' | translate }}</option>
                  <option value="commercial">{{ 'ADMINS.COMMERCIAL' | translate }}</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="showCreateModal.set(false)"
                  class="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50"
                >
                  {{ 'ADMINS.CANCEL' | translate }}
                </button>
                <button
                  type="submit"
                  [disabled]="createForm.invalid || saving()"
                  class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {{
                    saving() ? ('ADMINS.CREATING' | translate) : ('ADMINS.CREATE_ADMIN' | translate)
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Edit Admin Modal -->
      @if (showEditModal()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4">
            <h3 class="text-lg font-semibold text-text-primary mb-4">
              {{ 'ADMINS.EDIT_ADMIN_TITLE' | translate }}
            </h3>
            <form [formGroup]="editForm" (ngSubmit)="updateAdmin()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">{{
                    'ADMINS.FIRST_NAME' | translate
                  }}</label>
                  <input
                    formControlName="firstName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  @if (editForm.get('firstName')?.touched && editForm.get('firstName')?.invalid) {
                    <p class="text-xs text-error mt-1">
                      {{ 'ADMINS.FIRST_NAME_REQUIRED' | translate }}
                    </p>
                  }
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">{{
                    'ADMINS.LAST_NAME' | translate
                  }}</label>
                  <input
                    formControlName="lastName"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  @if (editForm.get('lastName')?.touched && editForm.get('lastName')?.invalid) {
                    <p class="text-xs text-error mt-1">
                      {{ 'ADMINS.LAST_NAME_REQUIRED' | translate }}
                    </p>
                  }
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.EMAIL' | translate
                }}</label>
                <input
                  type="email"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm bg-gray-50 text-text-muted cursor-not-allowed"
                  [value]="editingAdmin()?.email"
                  disabled
                />
                <p class="text-xs text-text-muted mt-1">
                  {{ 'ADMINS.EMAIL_READONLY' | translate }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'ADMINS.ROLE' | translate
                }}</label>
                <select
                  formControlName="role"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="super_admin">{{ 'ADMINS.SUPER_ADMIN' | translate }}</option>
                  <option value="commercial">{{ 'ADMINS.COMMERCIAL' | translate }}</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="showEditModal.set(false)"
                  class="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-gray-50"
                >
                  {{ 'ADMINS.CANCEL' | translate }}
                </button>
                <button
                  type="submit"
                  [disabled]="editForm.invalid || saving()"
                  class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {{
                    saving() ? ('ADMINS.CREATING' | translate) : ('ADMINS.SAVE_CHANGES' | translate)
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Delete Confirmation Modal -->
      <app-confirm-modal
        [open]="showDeleteModal()"
        [title]="'ADMINS.DELETE_ADMIN_TITLE' | translate"
        [message]="
          translate.instant('ADMINS.DELETE_CONFIRM', {
            name: (adminToDelete()?.firstName || '') + ' ' + (adminToDelete()?.lastName || ''),
          })
        "
        [confirmLabel]="'ADMINS.DELETE_BTN' | translate"
        variant="danger"
        (confirm)="deleteAdmin()"
        (cancel)="showDeleteModal.set(false)"
      />
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminListComponent, { className: "AdminListComponent", filePath: "src/app/features/admins/admin-list/admin-list.component.ts", lineNumber: 373 });
})();
export {
  AdminListComponent
};
//# sourceMappingURL=chunk-K4PESTVC.js.map
