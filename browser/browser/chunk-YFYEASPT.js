import {
  FormsModule
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
  TranslateService,
  ViewChildren,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵdomListener,
  ɵɵdomProperty,
  ɵɵgetCurrentView,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-7J6Y2ARR.js";

// src/app/features/auth/verify-2fa/verify-2fa.component.ts
var _c0 = ["digitInput"];
function Verify2FAComponent_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275domElementStart(0, "input", 18, 0);
    \u0275\u0275domListener("input", function Verify2FAComponent_For_14_Template_input_input_0_listener($event) {
      const i_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onDigitInput($event, i_r2));
    })("keydown", function Verify2FAComponent_For_14_Template_input_keydown_0_listener($event) {
      const i_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onKeyDown($event, i_r2));
    })("paste", function Verify2FAComponent_For_14_Template_input_paste_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPaste($event));
    });
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const i_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275domProperty("value", ctx_r2.code()[i_r2]);
  }
}
function Verify2FAComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.errorMessage());
  }
}
function Verify2FAComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElementStart(0, "p", 12);
    \u0275\u0275text(1);
    \u0275\u0275domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.successMessage());
  }
}
function Verify2FAComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275domElementStart(0, "svg", 14);
    \u0275\u0275domElement(1, "circle", 19)(2, "path", 20);
    \u0275\u0275domElementEnd();
  }
}
function Verify2FAComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind1(1, 2, "AUTH.RESEND_CODE"), " (", ctx_r2.resendCooldown(), "s) ");
  }
}
function Verify2FAComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(1, 1, "AUTH.RESEND_CODE"), " ");
  }
}
var Verify2FAComponent = class _Verify2FAComponent {
  digitInputs;
  authService = inject(AdminAuthService);
  router = inject(Router);
  translate = inject(TranslateService);
  digits = [0, 1, 2, 3, 4, 5];
  code = signal(["", "", "", "", "", ""], ...ngDevMode ? [{ debugName: "code" }] : []);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  errorMessage = signal("", ...ngDevMode ? [{ debugName: "errorMessage" }] : []);
  successMessage = signal("", ...ngDevMode ? [{ debugName: "successMessage" }] : []);
  resendCooldown = signal(0, ...ngDevMode ? [{ debugName: "resendCooldown" }] : []);
  cooldownInterval;
  ngAfterViewInit() {
    if (!this.authService.tempToken()) {
      this.router.navigate(["/login"]);
      return;
    }
    setTimeout(() => this.digitInputs.first?.nativeElement.focus());
  }
  onDigitInput(event, index) {
    const input = event.target;
    const value = input.value.replace(/\D/g, "");
    input.value = value;
    this.code.update((c) => {
      const newCode = [...c];
      newCode[index] = value;
      return newCode;
    });
    if (value && index < 5) {
      const inputs = this.digitInputs.toArray();
      inputs[index + 1]?.nativeElement.focus();
    }
    if (this.code().join("").length === 6) {
      this.verify();
    }
  }
  onKeyDown(event, index) {
    if (event.key === "Backspace" && !this.code()[index] && index > 0) {
      const inputs = this.digitInputs.toArray();
      inputs[index - 1]?.nativeElement.focus();
    }
  }
  onPaste(event) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData("text")?.replace(/\D/g, "").slice(0, 6);
    if (!pasted)
      return;
    const newCode = [...this.code()];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    this.code.set(newCode);
    const inputs = this.digitInputs.toArray();
    const focusIndex = Math.min(pasted.length, 5);
    inputs[focusIndex]?.nativeElement.focus();
    if (pasted.length === 6) {
      this.verify();
    }
  }
  verify() {
    const codeStr = this.code().join("");
    if (codeStr.length !== 6)
      return;
    this.loading.set(true);
    this.errorMessage.set("");
    this.successMessage.set("");
    this.authService.verify2FA(codeStr).subscribe({
      next: () => {
        this.router.navigate(["/dashboard"]);
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || this.translate.instant("AUTH.INVALID_CODE"));
        this.code.set(["", "", "", "", "", ""]);
        setTimeout(() => this.digitInputs.first?.nativeElement.focus());
      }
    });
  }
  resend() {
    this.errorMessage.set("");
    this.successMessage.set("");
    this.authService.resend2FA().subscribe({
      next: () => {
        this.successMessage.set(this.translate.instant("AUTH.CODE_SENT"));
        this.startCooldown();
      },
      error: () => {
        this.errorMessage.set(this.translate.instant("AUTH.RESEND_FAILED"));
      }
    });
  }
  backToLogin() {
    this.authService.clearSession();
    this.router.navigate(["/login"]);
  }
  startCooldown() {
    this.resendCooldown.set(60);
    clearInterval(this.cooldownInterval);
    this.cooldownInterval = setInterval(() => {
      this.resendCooldown.update((v) => {
        if (v <= 1) {
          clearInterval(this.cooldownInterval);
          return 0;
        }
        return v - 1;
      });
    }, 1e3);
  }
  static \u0275fac = function Verify2FAComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Verify2FAComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _Verify2FAComponent, selectors: [["app-verify-2fa"]], viewQuery: function Verify2FAComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.digitInputs = _t);
    }
  }, decls: 28, vars: 18, consts: [["digitInput", ""], [1, "min-h-screen", "bg-background"], [1, "px-6", "py-5"], ["src", "assets/cyna-backoffice.svg", "alt", "CYNA", 1, "h-10", "w-auto", "object-contain"], [1, "flex", "flex-col", "items-center", "gap-[52px]", "p-8", "pt-12", "mx-auto", "max-w-md"], [1, "flex", "flex-col", "items-center", "gap-1", "text-black"], [1, "!text-[32px]", "!font-bold", "!leading-normal", "!m-0"], [1, "text-base", "font-normal", "text-text-secondary"], [1, "flex", "w-full", "flex-col", "items-center", "gap-6"], [1, "flex", "justify-center", "gap-3"], ["type", "text", "maxlength", "1", 1, "w-12", "h-14", "text-center", "text-xl", "font-bold", "border", "border-input-border", "rounded-xl", "bg-input-bg", "focus:outline-none", "focus:border-primary", "transition-colors", 3, "value"], [1, "w-full", "text-center", "text-sm", "text-error"], [1, "w-full", "text-center", "text-sm", "text-success"], [1, "flex", "w-full", "items-center", "justify-center", "gap-2", "rounded-full", "px-6", "py-3", "text-[15px]", "leading-normal", "font-semibold", "bg-primary", "text-text-inverse", "hover:bg-primary-hover", "transition-colors", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["fill", "none", "viewBox", "0 0 24 24", 1, "animate-spin", "h-4", "w-4"], [1, "text-xs", "font-normal", "text-primary", "disabled:text-text-muted", "disabled:cursor-not-allowed", 3, "click", "disabled"], [1, "text-xs", "text-black"], [1, "font-bold", "text-primary", "bg-transparent", "border-none", "cursor-pointer", 3, "click"], ["type", "text", "maxlength", "1", 1, "w-12", "h-14", "text-center", "text-xl", "font-bold", "border", "border-input-border", "rounded-xl", "bg-input-bg", "focus:outline-none", "focus:border-primary", "transition-colors", 3, "input", "keydown", "paste", "value"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"]], template: function Verify2FAComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275domElementStart(0, "div", 1)(1, "div", 2);
      \u0275\u0275domElement(2, "img", 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(3, "div", 4)(4, "div", 5)(5, "h1", 6);
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(8, "p", 7);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275domElementEnd()();
      \u0275\u0275domElementStart(11, "div", 8)(12, "div", 9);
      \u0275\u0275repeaterCreate(13, Verify2FAComponent_For_14_Template, 2, 1, "input", 10, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275domElementEnd();
      \u0275\u0275conditionalCreate(15, Verify2FAComponent_Conditional_15_Template, 2, 1, "p", 11);
      \u0275\u0275conditionalCreate(16, Verify2FAComponent_Conditional_16_Template, 2, 1, "p", 12);
      \u0275\u0275domElementStart(17, "button", 13);
      \u0275\u0275domListener("click", function Verify2FAComponent_Template_button_click_17_listener() {
        return ctx.verify();
      });
      \u0275\u0275conditionalCreate(18, Verify2FAComponent_Conditional_18_Template, 3, 0, ":svg:svg", 14);
      \u0275\u0275text(19);
      \u0275\u0275pipe(20, "translate");
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(21, "button", 15);
      \u0275\u0275domListener("click", function Verify2FAComponent_Template_button_click_21_listener() {
        return ctx.resend();
      });
      \u0275\u0275conditionalCreate(22, Verify2FAComponent_Conditional_22_Template, 2, 4)(23, Verify2FAComponent_Conditional_23_Template, 2, 3);
      \u0275\u0275domElementEnd();
      \u0275\u0275domElementStart(24, "p", 16)(25, "button", 17);
      \u0275\u0275domListener("click", function Verify2FAComponent_Template_button_click_25_listener() {
        return ctx.backToLogin();
      });
      \u0275\u0275text(26);
      \u0275\u0275pipe(27, "translate");
      \u0275\u0275domElementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 10, "AUTH.VERIFICATION"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 12, "AUTH.ENTER_CODE"), " ");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.digits);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.errorMessage() ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.successMessage() ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275domProperty("disabled", ctx.loading() || ctx.code().join("").length < 6);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 14, "AUTH.VERIFY"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275domProperty("disabled", ctx.resendCooldown() > 0);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.resendCooldown() > 0 ? 22 : 23);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(27, 16, "AUTH.BACK_TO_LOGIN"), " ");
    }
  }, dependencies: [FormsModule, TranslateModule, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Verify2FAComponent, [{
    type: Component,
    args: [{
      selector: "app-verify-2fa",
      standalone: true,
      imports: [FormsModule, TranslateModule],
      template: `
    <div class="min-h-screen bg-background">
      <!-- Logo top-left -->
      <div class="px-6 py-5">
        <img src="assets/cyna-backoffice.svg" alt="CYNA" class="h-10 w-auto object-contain" />
      </div>

      <!-- Content centered -->
      <div class="flex flex-col items-center gap-[52px] p-8 pt-12 mx-auto max-w-md">
        <!-- Header -->
        <div class="flex flex-col items-center gap-1 text-black">
          <h1 class="!text-[32px] !font-bold !leading-normal !m-0">
            {{ 'AUTH.VERIFICATION' | translate }}
          </h1>
          <p class="text-base font-normal text-text-secondary">
            {{ 'AUTH.ENTER_CODE' | translate }}
          </p>
        </div>

        <!-- OTP Input -->
        <div class="flex w-full flex-col items-center gap-6">
          <div class="flex justify-center gap-3">
            @for (i of digits; track i) {
              <input
                #digitInput
                type="text"
                maxlength="1"
                class="w-12 h-14 text-center text-xl font-bold border border-input-border rounded-xl bg-input-bg focus:outline-none focus:border-primary transition-colors"
                [value]="code()[i]"
                (input)="onDigitInput($event, i)"
                (keydown)="onKeyDown($event, i)"
                (paste)="onPaste($event)"
              />
            }
          </div>

          <!-- Inline error message (red) -->
          @if (errorMessage()) {
            <p class="w-full text-center text-sm text-error">{{ errorMessage() }}</p>
          }

          <!-- Inline success message (green) -->
          @if (successMessage()) {
            <p class="w-full text-center text-sm text-success">{{ successMessage() }}</p>
          }

          <!-- Verify Button -->
          <button
            (click)="verify()"
            [disabled]="loading() || code().join('').length < 6"
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
            {{ 'AUTH.VERIFY' | translate }}
          </button>

          <!-- Resend -->
          <button
            (click)="resend()"
            [disabled]="resendCooldown() > 0"
            class="text-xs font-normal text-primary disabled:text-text-muted disabled:cursor-not-allowed"
          >
            @if (resendCooldown() > 0) {
              {{ 'AUTH.RESEND_CODE' | translate }} ({{ resendCooldown() }}s)
            } @else {
              {{ 'AUTH.RESEND_CODE' | translate }}
            }
          </button>

          <!-- Back to login -->
          <p class="text-xs text-black">
            <button
              (click)="backToLogin()"
              class="font-bold text-primary bg-transparent border-none cursor-pointer"
            >
              {{ 'AUTH.BACK_TO_LOGIN' | translate }}
            </button>
          </p>
        </div>
      </div>
    </div>
  `
    }]
  }], null, { digitInputs: [{
    type: ViewChildren,
    args: ["digitInput"]
  }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(Verify2FAComponent, { className: "Verify2FAComponent", filePath: "src/app/features/auth/verify-2fa/verify-2fa.component.ts", lineNumber: 118 });
})();
export {
  Verify2FAComponent
};
//# sourceMappingURL=chunk-YFYEASPT.js.map
