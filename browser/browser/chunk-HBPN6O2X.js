import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-SOM4FACY.js";
import {
  AdminAuthService
} from "./chunk-77RDWDYA.js";
import {
  Router
} from "./chunk-D4TFPFZU.js";
import "./chunk-7NBDW476.js";
import "./chunk-IBCBMH7I.js";
import {
  Component,
  TranslateModule,
  TranslatePipe,
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
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7J6Y2ARR.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "AUTH.EMAIL_REQUIRED"));
  }
}
function LoginComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, "AUTH.PASSWORD_REQUIRED"));
  }
}
function LoginComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function LoginComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 15);
    \u0275\u0275element(1, "circle", 16)(2, "path", 17);
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AdminAuthService);
  router = inject(Router);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  });
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.errorMessage.set("");
    const { email, password } = this.form.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(["/verify-2fa"]);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || "Invalid credentials");
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 31, vars: 31, consts: [[1, "min-h-screen", "bg-background"], [1, "px-6", "py-5"], ["src", "assets/cyna-backoffice.svg", "alt", "CYNA", 1, "h-10", "w-auto", "object-contain"], [1, "flex", "flex-col", "items-center", "gap-[52px]", "p-8", "pt-12", "mx-auto", "max-w-md"], [1, "flex", "flex-col", "items-center", "gap-1", "text-black"], [1, "!text-[32px]", "!font-bold", "!leading-normal", "!m-0"], [1, "text-base", "font-normal", "text-text-secondary"], [1, "flex", "w-full", "flex-col", "items-center", "gap-4", 3, "ngSubmit", "formGroup"], [1, "flex", "flex-col", "gap-2.5", "w-full"], [1, "text-sm", "font-normal", "text-black"], ["type", "email", "formControlName", "email", 3, "placeholder"], [1, "text-xs", "text-error", "-mt-1"], ["type", "password", "formControlName", "password", 3, "placeholder"], [1, "w-full", "text-center", "text-sm", "text-error"], ["type", "submit", 1, "flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-full", "px-6", "py-3", "text-[15px]", "leading-normal", "font-semibold", "bg-primary", "text-text-inverse", "hover:bg-primary-hover", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4)(5, "h1", 5);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "form", 7);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_11_listener() {
        return ctx.onSubmit();
      });
      \u0275\u0275elementStart(12, "div", 8)(13, "label", 9);
      \u0275\u0275text(14);
      \u0275\u0275pipe(15, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "input", 10);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275conditionalCreate(18, LoginComponent_Conditional_18_Template, 3, 3, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 8)(20, "label", 9);
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "input", 12);
      \u0275\u0275pipe(24, "translate");
      \u0275\u0275conditionalCreate(25, LoginComponent_Conditional_25_Template, 3, 3, "p", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(26, LoginComponent_Conditional_26_Template, 2, 1, "p", 13);
      \u0275\u0275elementStart(27, "button", 14);
      \u0275\u0275conditionalCreate(28, LoginComponent_Conditional_28_Template, 3, 0, ":svg:svg", 15);
      \u0275\u0275text(29);
      \u0275\u0275pipe(30, "translate");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      let tmp_4_0;
      let tmp_6_0;
      let tmp_8_0;
      let tmp_10_0;
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 17, "AUTH.SIGN_IN"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 19, "AUTH.BACKOFFICE_ADMIN"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(15, 21, "AUTH.EMAIL"));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(((tmp_4_0 = ctx.form.get("email")) == null ? null : tmp_4_0.touched) && ((tmp_4_0 = ctx.form.get("email")) == null ? null : tmp_4_0.invalid) ? "h-14 w-full rounded-full border border-error bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors" : "h-14 w-full rounded-full border border-input-border bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors focus:border-primary");
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(17, 23, "AUTH.EMAIL_PLACEHOLDER"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_6_0 = ctx.form.get("email")) == null ? null : tmp_6_0.touched) && ((tmp_6_0 = ctx.form.get("email")) == null ? null : tmp_6_0.errors == null ? null : tmp_6_0.errors["required"]) ? 18 : -1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 25, "AUTH.PASSWORD"));
      \u0275\u0275advance(2);
      \u0275\u0275classMap(((tmp_8_0 = ctx.form.get("password")) == null ? null : tmp_8_0.touched) && ((tmp_8_0 = ctx.form.get("password")) == null ? null : tmp_8_0.invalid) ? "h-14 w-full rounded-full border border-error bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors" : "h-14 w-full rounded-full border border-input-border bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors focus:border-primary");
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(24, 27, "AUTH.PASSWORD_PLACEHOLDER"));
      \u0275\u0275advance(2);
      \u0275\u0275conditional(((tmp_10_0 = ctx.form.get("password")) == null ? null : tmp_10_0.touched) && ((tmp_10_0 = ctx.form.get("password")) == null ? null : tmp_10_0.errors == null ? null : tmp_10_0.errors["required"]) ? 25 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.errorMessage() ? 26 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.loading() || ctx.form.invalid);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(30, 29, "AUTH.SUBMIT"), " ");
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, TranslateModule, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{
      selector: "app-login",
      standalone: true,
      imports: [ReactiveFormsModule, TranslateModule],
      template: `
    <div class="min-h-screen bg-background">
      <!-- Logo top-left -->
      <div class="px-6 py-5">
        <img src="assets/cyna-backoffice.svg" alt="CYNA" class="h-10 w-auto object-contain" />
      </div>

      <!-- Form centered -->
      <div class="flex flex-col items-center gap-[52px] p-8 pt-12 mx-auto max-w-md">
        <!-- Header -->
        <div class="flex flex-col items-center gap-1 text-black">
          <h1 class="!text-[32px] !font-bold !leading-normal !m-0">
            {{ 'AUTH.SIGN_IN' | translate }}
          </h1>
          <p class="text-base font-normal text-text-secondary">
            {{ 'AUTH.BACKOFFICE_ADMIN' | translate }}
          </p>
        </div>

        <!-- Form -->
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="flex w-full flex-col items-center gap-4"
        >
          <!-- Email -->
          <div class="flex flex-col gap-2.5 w-full">
            <label class="text-sm font-normal text-black">{{ 'AUTH.EMAIL' | translate }}</label>
            <input
              type="email"
              formControlName="email"
              [placeholder]="'AUTH.EMAIL_PLACEHOLDER' | translate"
              [class]="
                form.get('email')?.touched && form.get('email')?.invalid
                  ? 'h-14 w-full rounded-full border border-error bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors'
                  : 'h-14 w-full rounded-full border border-input-border bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors focus:border-primary'
              "
            />
            @if (form.get('email')?.touched && form.get('email')?.errors?.['required']) {
              <p class="text-xs text-error -mt-1">{{ 'AUTH.EMAIL_REQUIRED' | translate }}</p>
            }
          </div>

          <!-- Password -->
          <div class="flex flex-col gap-2.5 w-full">
            <label class="text-sm font-normal text-black">{{ 'AUTH.PASSWORD' | translate }}</label>
            <input
              type="password"
              formControlName="password"
              [placeholder]="'AUTH.PASSWORD_PLACEHOLDER' | translate"
              [class]="
                form.get('password')?.touched && form.get('password')?.invalid
                  ? 'h-14 w-full rounded-full border border-error bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors'
                  : 'h-14 w-full rounded-full border border-input-border bg-input-bg px-5 text-sm text-text-primary placeholder:text-[#828282] outline-none transition-colors focus:border-primary'
              "
            />
            @if (form.get('password')?.touched && form.get('password')?.errors?.['required']) {
              <p class="text-xs text-error -mt-1">{{ 'AUTH.PASSWORD_REQUIRED' | translate }}</p>
            }
          </div>

          <!-- Error message (inline, not toast) -->
          @if (errorMessage()) {
            <p class="w-full text-center text-sm text-error">{{ errorMessage() }}</p>
          }

          <!-- Submit -->
          <button
            type="submit"
            [disabled]="loading() || form.invalid"
            class="flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] leading-normal font-semibold bg-primary text-text-inverse hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            @if (loading()) {
              <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            }
            {{ 'AUTH.SUBMIT' | translate }}
          </button>
        </form>
      </div>
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/login/login.component.ts", lineNumber: 107 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-HBPN6O2X.js.map
