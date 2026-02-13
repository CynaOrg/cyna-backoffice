import {
  ContentService
} from "./chunk-GUJTGOJS.js";
import {
  LoadingSpinnerComponent
} from "./chunk-65YBE2BR.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-SOM4FACY.js";
import {
  ConfirmModalComponent
} from "./chunk-DNYKELFX.js";
import {
  StatusBadgeComponent
} from "./chunk-LY5M4DQD.js";
import "./chunk-XHKBGM2G.js";
import {
  NotificationService
} from "./chunk-XMJJBEJ5.js";
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
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7J6Y2ARR.js";

// src/app/features/content/content.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function ContentComponent_Conditional_14_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function ContentComponent_Conditional_14_Conditional_9_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 12);
  }
  if (rf & 2) {
    const slide_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", slide_r4.imageUrl, \u0275\u0275sanitizeUrl)("alt", slide_r4.titleFr);
  }
}
function ContentComponent_Conditional_14_Conditional_9_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 27);
    \u0275\u0275element(2, "path", 28);
    \u0275\u0275elementEnd()();
  }
}
function ContentComponent_Conditional_14_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 11);
    \u0275\u0275conditionalCreate(2, ContentComponent_Conditional_14_Conditional_9_For_2_Conditional_2_Template, 1, 2, "img", 12)(3, ContentComponent_Conditional_14_Conditional_9_For_2_Conditional_3_Template, 3, 0, "div", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14)(5, "p", 15);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 16);
    \u0275\u0275element(8, "app-status-badge", 17);
    \u0275\u0275elementStart(9, "span", 18);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 19)(12, "button", 20);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275listener("click", function ContentComponent_Conditional_14_Conditional_9_For_2_Template_button_click_12_listener() {
      const \u0275$index_40_r5 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.moveSlide(\u0275$index_40_r5, "up"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(14, "svg", 21);
    \u0275\u0275element(15, "path", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(16, "button", 20);
    \u0275\u0275pipe(17, "translate");
    \u0275\u0275listener("click", function ContentComponent_Conditional_14_Conditional_9_For_2_Template_button_click_16_listener() {
      const \u0275$index_40_r5 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.moveSlide(\u0275$index_40_r5, "down"));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(18, "svg", 21);
    \u0275\u0275element(19, "path", 23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(20, "div", 24)(21, "button", 25);
    \u0275\u0275listener("click", function ContentComponent_Conditional_14_Conditional_9_For_2_Template_button_click_21_listener() {
      const slide_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openSlideModal(slide_r4));
    });
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 26);
    \u0275\u0275listener("click", function ContentComponent_Conditional_14_Conditional_9_For_2_Template_button_click_24_listener() {
      const slide_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmDeleteSlide(slide_r4));
    });
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const slide_r4 = ctx.$implicit;
    const \u0275$index_40_r5 = ctx.$index;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(slide_r4.imageUrl ? 2 : 3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", slide_r4.titleFr, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("status", slide_r4.isActive ? "active" : "inactive");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Order: ", slide_r4.displayOrder, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_40_r5 === 0)("title", \u0275\u0275pipeBind1(13, 10, "CONTENT.MOVE_UP"));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", \u0275$index_40_r5 === ctx_r1.slides().length - 1)("title", \u0275\u0275pipeBind1(17, 12, "CONTENT.MOVE_DOWN"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(23, 14, "CONTENT.EDIT"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(26, 16, "CONTENT.DELETE"), " ");
  }
}
function ContentComponent_Conditional_14_Conditional_9_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "p", 29);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "CONTENT.NO_SLIDES"));
  }
}
function ContentComponent_Conditional_14_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275repeaterCreate(1, ContentComponent_Conditional_14_Conditional_9_For_2_Template, 27, 18, "div", 9, _forTrack0, false, ContentComponent_Conditional_14_Conditional_9_ForEmpty_3_Template, 4, 3, "div", 10);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.slides());
  }
}
function ContentComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div")(1, "div", 5)(2, "h2", 6);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 7);
    \u0275\u0275listener("click", function ContentComponent_Conditional_14_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openSlideModal());
    });
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(8, ContentComponent_Conditional_14_Conditional_8_Template, 1, 0, "app-loading-spinner")(9, ContentComponent_Conditional_14_Conditional_9_Template, 4, 1, "div", 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 3, "CONTENT.CAROUSEL_SLIDES"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 5, "CONTENT.ADD_SLIDE"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.loadingSlides() ? 8 : 9);
  }
}
function ContentComponent_Conditional_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function ContentComponent_Conditional_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "h2", 31);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 32)(5, "div")(6, "label", 33);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 34);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function ContentComponent_Conditional_15_Conditional_2_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.topServicesInput, $event) || (ctx_r1.topServicesInput = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 35)(12, "button", 36);
    \u0275\u0275listener("click", function ContentComponent_Conditional_15_Conditional_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveTopConfig("top_services"));
    });
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "div", 30)(17, "h2", 31);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 32)(21, "div")(22, "label", 33);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "input", 34);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275twoWayListener("ngModelChange", function ContentComponent_Conditional_15_Conditional_2_Template_input_ngModelChange_25_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.topProductsInput, $event) || (ctx_r1.topProductsInput = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 35)(28, "button", 36);
    \u0275\u0275listener("click", function ContentComponent_Conditional_15_Conditional_2_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveTopConfig("top_products"));
    });
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "translate");
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 12, "CONTENT.TOP_SERVICES"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(8, 14, "CONTENT.PRODUCT_IDS_LABEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.topServicesInput);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(10, 16, "CONTENT.PRODUCT_IDS_PLACEHOLDER"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.savingTopConfig());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingTopConfig() ? \u0275\u0275pipeBind1(14, 18, "CONTENT.SAVING") : \u0275\u0275pipeBind1(15, 20, "CONTENT.SAVE_TOP_SERVICES"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 22, "CONTENT.TOP_PRODUCTS"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(24, 24, "CONTENT.PRODUCT_IDS_LABEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.topProductsInput);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(26, 26, "CONTENT.PRODUCT_IDS_PLACEHOLDER"));
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r1.savingTopConfig());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingTopConfig() ? \u0275\u0275pipeBind1(30, 28, "CONTENT.SAVING") : \u0275\u0275pipeBind1(31, 30, "CONTENT.SAVE_TOP_PRODUCTS"), " ");
  }
}
function ContentComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2);
    \u0275\u0275conditionalCreate(1, ContentComponent_Conditional_15_Conditional_1_Template, 1, 0, "app-loading-spinner")(2, ContentComponent_Conditional_15_Conditional_2_Template, 32, 32);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loadingTopConfig() ? 1 : 2);
  }
}
function ContentComponent_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function ContentComponent_Conditional_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 30)(1, "h2", 31);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "form", 37);
    \u0275\u0275listener("ngSubmit", function ContentComponent_Conditional_16_Conditional_2_Template_form_ngSubmit_4_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveHeroText());
    });
    \u0275\u0275elementStart(5, "div", 38)(6, "div")(7, "label", 33);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div")(12, "label", 33);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 38)(17, "div")(18, "label", 33);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "textarea", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div")(23, "label", 33);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "textarea", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 35)(28, "button", 43);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "translate");
    \u0275\u0275pipe(31, "translate");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 8, "CONTENT.HERO_TEXT"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r1.heroForm);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 10, "CONTENT.TITLE_FR"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(14, 12, "CONTENT.TITLE_EN"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(20, 14, "CONTENT.SUBTITLE_FR"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(25, 16, "CONTENT.SUBTITLE_EN"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.savingHero());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingHero() ? \u0275\u0275pipeBind1(30, 18, "CONTENT.SAVING") : \u0275\u0275pipeBind1(31, 20, "CONTENT.SAVE_HERO"), " ");
  }
}
function ContentComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, ContentComponent_Conditional_16_Conditional_1_Template, 1, 0, "app-loading-spinner")(2, ContentComponent_Conditional_16_Conditional_2_Template, 32, 22, "div", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loadingHero() ? 1 : 2);
  }
}
function ContentComponent_Conditional_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading-spinner");
  }
}
function ContentComponent_Conditional_17_Conditional_2_For_25_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-status-badge", 59);
    \u0275\u0275pipe(1, "translate");
  }
  if (rf & 2) {
    \u0275\u0275property("label", \u0275\u0275pipeBind1(1, 1, "CONTENT.TREATED"));
  }
}
function ContentComponent_Conditional_17_Conditional_2_For_25_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 64)(2, "div", 65);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const msg_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", msg_r9.message, " ");
  }
}
function ContentComponent_Conditional_17_Conditional_2_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 51);
    \u0275\u0275listener("click", function ContentComponent_Conditional_17_Conditional_2_For_25_Template_tr_click_0_listener() {
      const msg_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleMessageExpand(msg_r9.id));
    });
    \u0275\u0275elementStart(1, "td", 52);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 54);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 55);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 56)(10, "div", 57);
    \u0275\u0275element(11, "app-status-badge", 58);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275conditionalCreate(14, ContentComponent_Conditional_17_Conditional_2_For_25_Conditional_14_Template, 2, 3, "app-status-badge", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 60);
    \u0275\u0275listener("click", function ContentComponent_Conditional_17_Conditional_2_For_25_Template_td_click_15_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(16, "div", 61)(17, "button", 62);
    \u0275\u0275listener("click", function ContentComponent_Conditional_17_Conditional_2_For_25_Template_button_click_17_listener() {
      const msg_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleMessageRead(msg_r9));
    });
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 62);
    \u0275\u0275listener("click", function ContentComponent_Conditional_17_Conditional_2_For_25_Template_button_click_21_listener() {
      const msg_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleMessageTreated(msg_r9));
    });
    \u0275\u0275text(22);
    \u0275\u0275pipe(23, "translate");
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 63);
    \u0275\u0275listener("click", function ContentComponent_Conditional_17_Conditional_2_For_25_Template_button_click_25_listener() {
      const msg_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.confirmDeleteMessage(msg_r9));
    });
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(28, ContentComponent_Conditional_17_Conditional_2_For_25_Conditional_28_Template, 4, 1, "tr");
  }
  if (rf & 2) {
    const msg_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", msg_r9.name, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(msg_r9.email);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", msg_r9.subject, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(msg_r9.createdAt), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("status", msg_r9.isRead ? "active" : "pending")("label", msg_r9.isRead ? \u0275\u0275pipeBind1(12, 11, "CONTENT.READ") : \u0275\u0275pipeBind1(13, 13, "CONTENT.UNREAD"));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(msg_r9.isTreated ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", msg_r9.isRead ? \u0275\u0275pipeBind1(19, 15, "CONTENT.MARK_UNREAD") : \u0275\u0275pipeBind1(20, 17, "CONTENT.MARK_READ"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", msg_r9.isTreated ? \u0275\u0275pipeBind1(23, 19, "CONTENT.UNTREATED") : \u0275\u0275pipeBind1(24, 21, "CONTENT.MARK_TREATED"), " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(27, 23, "CONTENT.DELETE"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.expandedMessageId() === msg_r9.id ? 28 : -1);
  }
}
function ContentComponent_Conditional_17_Conditional_2_ForEmpty_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 66);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, "CONTENT.NO_MESSAGES"), " ");
  }
}
function ContentComponent_Conditional_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "div", 45)(2, "table", 46)(3, "thead")(4, "tr", 47)(5, "th", 48);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 48);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 48);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 48);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 48);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 49);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "tbody", 50);
    \u0275\u0275repeaterCreate(24, ContentComponent_Conditional_17_Conditional_2_For_25_Template, 29, 25, null, null, _forTrack0, false, ContentComponent_Conditional_17_Conditional_2_ForEmpty_26_Template, 4, 3, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 7, "CONTENT.NAME"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 9, "CONTENT.EMAIL"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 11, "CONTENT.SUBJECT"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 13, "CONTENT.DATE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 15, "CONTENT.STATUS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 17, "CONTENT.ACTIONS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.messages());
  }
}
function ContentComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275conditionalCreate(1, ContentComponent_Conditional_17_Conditional_1_Template, 1, 0, "app-loading-spinner")(2, ContentComponent_Conditional_17_Conditional_2_Template, 27, 19, "div", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.loadingMessages() ? 1 : 2);
  }
}
function ContentComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 3)(1, "div", 67)(2, "h3", 31);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "form", 37);
    \u0275\u0275listener("ngSubmit", function ContentComponent_Conditional_18_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveSlide());
    });
    \u0275\u0275elementStart(7, "div", 68)(8, "div")(9, "label", 33);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "label", 33);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 40);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 68)(19, "div")(20, "label", 33);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div")(25, "label", 33);
    \u0275\u0275text(26);
    \u0275\u0275pipe(27, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "input", 70);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div")(30, "label", 33);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(33, "input", 71);
    \u0275\u0275pipe(34, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "div", 68)(36, "div")(37, "label", 33);
    \u0275\u0275text(38);
    \u0275\u0275pipe(39, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "input", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div")(42, "label", 33);
    \u0275\u0275text(43);
    \u0275\u0275pipe(44, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(45, "input", 73);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div")(47, "label", 33);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(50, "input", 74);
    \u0275\u0275pipe(51, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "div", 75)(53, "label", 76);
    \u0275\u0275text(54);
    \u0275\u0275pipe(55, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "button", 77);
    \u0275\u0275listener("click", function ContentComponent_Conditional_18_Template_button_click_56_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleSlideActive());
    });
    \u0275\u0275element(57, "span", 78);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "div", 79)(59, "button", 80);
    \u0275\u0275listener("click", function ContentComponent_Conditional_18_Template_button_click_59_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showSlideModal.set(false));
    });
    \u0275\u0275text(60);
    \u0275\u0275pipe(61, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "button", 43);
    \u0275\u0275text(63);
    \u0275\u0275pipe(64, "translate");
    \u0275\u0275pipe(65, "translate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_14_0;
    let tmp_15_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingSlide() ? \u0275\u0275pipeBind1(4, 20, "CONTENT.EDIT_SLIDE") : \u0275\u0275pipeBind1(5, 22, "CONTENT.NEW_SLIDE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r1.slideForm);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(11, 24, "CONTENT.TITLE_FR"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 26, "CONTENT.TITLE_EN"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 28, "CONTENT.SUBTITLE_FR"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(27, 30, "CONTENT.SUBTITLE_EN"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(32, 32, "CONTENT.IMAGE_URL"));
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(34, 34, "CONTENT.IMAGE_URL_PLACEHOLDER"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(39, 36, "CONTENT.BUTTON_TEXT_FR"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(44, 38, "CONTENT.BUTTON_TEXT_EN"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(49, 40, "CONTENT.BUTTON_LINK"));
    \u0275\u0275advance(2);
    \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(51, 42, "CONTENT.BUTTON_LINK_PLACEHOLDER"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(55, 44, "CONTENT.ACTIVE"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap(((tmp_14_0 = ctx_r1.slideForm.get("isActive")) == null ? null : tmp_14_0.value) ? "bg-primary" : "bg-gray-200");
    \u0275\u0275advance();
    \u0275\u0275classMap(((tmp_15_0 = ctx_r1.slideForm.get("isActive")) == null ? null : tmp_15_0.value) ? "translate-x-6" : "translate-x-1");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(61, 46, "CONTENT.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.savingSlide());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingSlide() ? \u0275\u0275pipeBind1(64, 48, "CONTENT.SAVING") : \u0275\u0275pipeBind1(65, 50, "CONTENT.SAVE"), " ");
  }
}
var ContentComponent = class _ContentComponent {
  contentService = inject(ContentService);
  notifications = inject(NotificationService);
  fb = inject(FormBuilder);
  translate = inject(TranslateService);
  // Tab state
  activeTab = signal("carousel", ...ngDevMode ? [{ debugName: "activeTab" }] : []);
  // Carousel state
  slides = signal([], ...ngDevMode ? [{ debugName: "slides" }] : []);
  loadingSlides = signal(false, ...ngDevMode ? [{ debugName: "loadingSlides" }] : []);
  showSlideModal = signal(false, ...ngDevMode ? [{ debugName: "showSlideModal" }] : []);
  editingSlide = signal(null, ...ngDevMode ? [{ debugName: "editingSlide" }] : []);
  savingSlide = signal(false, ...ngDevMode ? [{ debugName: "savingSlide" }] : []);
  showDeleteSlideModal = signal(false, ...ngDevMode ? [{ debugName: "showDeleteSlideModal" }] : []);
  slideToDelete = signal(null, ...ngDevMode ? [{ debugName: "slideToDelete" }] : []);
  // Top Products state
  topServicesInput = "";
  topProductsInput = "";
  loadingTopConfig = signal(false, ...ngDevMode ? [{ debugName: "loadingTopConfig" }] : []);
  savingTopConfig = signal(false, ...ngDevMode ? [{ debugName: "savingTopConfig" }] : []);
  // Hero Text state
  loadingHero = signal(false, ...ngDevMode ? [{ debugName: "loadingHero" }] : []);
  savingHero = signal(false, ...ngDevMode ? [{ debugName: "savingHero" }] : []);
  // Messages state
  messages = signal([], ...ngDevMode ? [{ debugName: "messages" }] : []);
  loadingMessages = signal(false, ...ngDevMode ? [{ debugName: "loadingMessages" }] : []);
  expandedMessageId = signal(null, ...ngDevMode ? [{ debugName: "expandedMessageId" }] : []);
  showDeleteMessageModal = signal(false, ...ngDevMode ? [{ debugName: "showDeleteMessageModal" }] : []);
  messageToDelete = signal(null, ...ngDevMode ? [{ debugName: "messageToDelete" }] : []);
  // Forms
  slideForm = this.fb.group({
    titleFr: ["", Validators.required],
    titleEn: ["", Validators.required],
    subtitleFr: [""],
    subtitleEn: [""],
    imageUrl: ["", Validators.required],
    buttonTextFr: [""],
    buttonTextEn: [""],
    buttonLink: [""],
    isActive: [true]
  });
  heroForm = this.fb.group({
    titleFr: [""],
    titleEn: [""],
    subtitleFr: [""],
    subtitleEn: [""]
  });
  ngOnInit() {
    this.loadCarouselSlides();
  }
  // --- Tab Management ---
  switchTab(tab) {
    this.activeTab.set(tab);
    if (tab === "carousel" && this.slides().length === 0) {
      this.loadCarouselSlides();
    } else if (tab === "top-products") {
      this.loadTopConfigs();
    } else if (tab === "hero-text") {
      this.loadHeroText();
    } else if (tab === "messages") {
      this.loadMessages();
    }
  }
  // --- Carousel ---
  loadCarouselSlides() {
    this.loadingSlides.set(true);
    this.contentService.getCarouselSlides().subscribe({
      next: (slides) => {
        this.slides.set(slides.sort((a, b) => a.displayOrder - b.displayOrder));
        this.loadingSlides.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("CONTENT.LOAD_SLIDES_FAILED"));
        this.loadingSlides.set(false);
      }
    });
  }
  openSlideModal(slide) {
    if (slide) {
      this.editingSlide.set(slide);
      this.slideForm.patchValue({
        titleFr: slide.titleFr,
        titleEn: slide.titleEn,
        subtitleFr: slide.subtitleFr,
        subtitleEn: slide.subtitleEn,
        imageUrl: slide.imageUrl,
        buttonTextFr: slide.buttonTextFr,
        buttonTextEn: slide.buttonTextEn,
        buttonLink: slide.buttonLink,
        isActive: slide.isActive
      });
    } else {
      this.editingSlide.set(null);
      this.slideForm.reset({ isActive: true });
    }
    this.showSlideModal.set(true);
  }
  toggleSlideActive() {
    const current = this.slideForm.get("isActive")?.value;
    this.slideForm.patchValue({ isActive: !current });
  }
  saveSlide() {
    if (this.slideForm.invalid)
      return;
    this.savingSlide.set(true);
    const data = this.slideForm.value;
    const editing = this.editingSlide();
    const request = editing ? this.contentService.updateSlide(editing.id, data) : this.contentService.createSlide(data);
    request.subscribe({
      next: () => {
        this.notifications.success(editing ? this.translate.instant("CONTENT.SLIDE_UPDATED") : this.translate.instant("CONTENT.SLIDE_CREATED"));
        this.showSlideModal.set(false);
        this.savingSlide.set(false);
        this.loadCarouselSlides();
      },
      error: (err) => {
        this.notifications.error(err.error?.message || this.translate.instant("CONTENT.SAVE_SLIDE_FAILED"));
        this.savingSlide.set(false);
      }
    });
  }
  confirmDeleteSlide(slide) {
    this.slideToDelete.set(slide);
    this.showDeleteSlideModal.set(true);
  }
  deleteSlide() {
    const slide = this.slideToDelete();
    if (!slide)
      return;
    this.contentService.deleteSlide(slide.id).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant("CONTENT.SLIDE_DELETED"));
        this.slides.update((s) => s.filter((x) => x.id !== slide.id));
        this.showDeleteSlideModal.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || this.translate.instant("CONTENT.DELETE_SLIDE_FAILED"));
        this.showDeleteSlideModal.set(false);
      }
    });
  }
  moveSlide(index, direction) {
    const current = [...this.slides()];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= current.length)
      return;
    [current[index], current[targetIndex]] = [current[targetIndex], current[index]];
    current.forEach((slide, i) => slide.displayOrder = i);
    this.slides.set(current);
    const slideIds = current.map((s) => s.id);
    this.contentService.reorderCarousel(slideIds).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant("CONTENT.CAROUSEL_ORDER_UPDATED"));
      },
      error: () => {
        this.notifications.error(this.translate.instant("CONTENT.REORDER_FAILED"));
        this.loadCarouselSlides();
      }
    });
  }
  // --- Top Products ---
  loadTopConfigs() {
    this.loadingTopConfig.set(true);
    let loaded = 0;
    const checkDone = () => {
      loaded++;
      if (loaded === 2)
        this.loadingTopConfig.set(false);
    };
    this.contentService.getTopConfig("top_services").subscribe({
      next: (config) => {
        this.topServicesInput = config.productIds?.join(", ") || "";
        checkDone();
      },
      error: () => {
        checkDone();
      }
    });
    this.contentService.getTopConfig("top_products").subscribe({
      next: (config) => {
        this.topProductsInput = config.productIds?.join(", ") || "";
        checkDone();
      },
      error: () => {
        checkDone();
      }
    });
  }
  saveTopConfig(type) {
    this.savingTopConfig.set(true);
    const input = type === "top_services" ? this.topServicesInput : this.topProductsInput;
    const productIds = input.split(",").map((id) => id.trim()).filter((id) => id.length > 0);
    this.contentService.updateTopConfig(type, { productIds }).subscribe({
      next: () => {
        const label = type === "top_services" ? this.translate.instant("CONTENT.TOP_SERVICES") : this.translate.instant("CONTENT.TOP_PRODUCTS");
        this.notifications.success(this.translate.instant("CONTENT.CONFIG_UPDATED", { label }));
        this.savingTopConfig.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || this.translate.instant("CONTENT.UPDATE_CONFIG_FAILED"));
        this.savingTopConfig.set(false);
      }
    });
  }
  // --- Hero Text ---
  loadHeroText() {
    this.loadingHero.set(true);
    this.contentService.getHeroText().subscribe({
      next: (hero) => {
        if (hero) {
          this.heroForm.patchValue({
            titleFr: hero.titleFr || "",
            titleEn: hero.titleEn || "",
            subtitleFr: hero.subtitleFr || "",
            subtitleEn: hero.subtitleEn || ""
          });
        }
        this.loadingHero.set(false);
      },
      error: () => {
        this.loadingHero.set(false);
      }
    });
  }
  saveHeroText() {
    this.savingHero.set(true);
    this.contentService.updateHeroText(this.heroForm.value).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant("CONTENT.HERO_UPDATED"));
        this.savingHero.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || this.translate.instant("CONTENT.HERO_UPDATE_FAILED"));
        this.savingHero.set(false);
      }
    });
  }
  // --- Contact Messages ---
  loadMessages() {
    this.loadingMessages.set(true);
    this.contentService.getContactMessages().subscribe({
      next: (messages) => {
        this.messages.set(messages);
        this.loadingMessages.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("CONTENT.LOAD_MESSAGES_FAILED"));
        this.loadingMessages.set(false);
      }
    });
  }
  toggleMessageExpand(messageId) {
    this.expandedMessageId.update((current) => current === messageId ? null : messageId);
  }
  toggleMessageRead(msg) {
    this.contentService.updateContactMessage(msg.id, { isRead: !msg.isRead }).subscribe({
      next: (updated) => {
        this.messages.update((msgs) => msgs.map((m) => m.id === msg.id ? updated : m));
        this.notifications.success(updated.isRead ? this.translate.instant("CONTENT.MARKED_READ") : this.translate.instant("CONTENT.MARKED_UNREAD"));
      },
      error: () => {
        this.notifications.error(this.translate.instant("CONTENT.UPDATE_MESSAGE_FAILED"));
      }
    });
  }
  toggleMessageTreated(msg) {
    this.contentService.updateContactMessage(msg.id, { isTreated: !msg.isTreated }).subscribe({
      next: (updated) => {
        this.messages.update((msgs) => msgs.map((m) => m.id === msg.id ? updated : m));
        this.notifications.success(updated.isTreated ? this.translate.instant("CONTENT.MARKED_TREATED") : this.translate.instant("CONTENT.MARKED_UNTREATED"));
      },
      error: () => {
        this.notifications.error(this.translate.instant("CONTENT.UPDATE_MESSAGE_FAILED"));
      }
    });
  }
  confirmDeleteMessage(msg) {
    this.messageToDelete.set(msg);
    this.showDeleteMessageModal.set(true);
  }
  deleteMessage() {
    const msg = this.messageToDelete();
    if (!msg)
      return;
    this.contentService.deleteContactMessage(msg.id).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant("CONTENT.MESSAGE_DELETED"));
        this.messages.update((msgs) => msgs.filter((m) => m.id !== msg.id));
        this.showDeleteMessageModal.set(false);
      },
      error: (err) => {
        this.notifications.error(err.error?.message || this.translate.instant("CONTENT.DELETE_MESSAGE_FAILED"));
        this.showDeleteMessageModal.set(false);
      }
    });
  }
  // --- Helpers ---
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  }
  static \u0275fac = function ContentComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContentComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ContentComponent, selectors: [["app-content"]], decls: 25, vars: 39, consts: [[1, "flex", "border-b", "border-border-light", "mb-6"], [1, "px-4", "py-2", "text-sm", "font-medium", "border-b-2", "transition-colors", 3, "click"], [1, "space-y-6"], [1, "fixed", "inset-0", "bg-black/50", "flex", "items-center", "justify-center", "z-50"], ["confirmLabel", "Delete", "variant", "danger", 3, "confirm", "cancel", "open", "title", "message"], [1, "flex", "items-center", "justify-between", "mb-4"], [1, "text-lg", "font-semibold", "text-text-primary"], [1, "bg-primary", "text-white", "hover:bg-primary-hover", "rounded-lg", "px-4", "py-2", "text-sm", "font-medium", 3, "click"], [1, "grid", "gap-4"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "p-4", "flex", "items-center", "gap-4"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "p-12", "text-center"], [1, "flex-shrink-0"], [1, "w-24", "h-16", "rounded-lg", "object-cover", "border", "border-border-light", 3, "src", "alt"], [1, "w-24", "h-16", "rounded-lg", "bg-gray-100", "flex", "items-center", "justify-center", "border", "border-border-light"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-medium", "text-text-primary", "truncate"], [1, "flex", "items-center", "gap-2", "mt-1"], [3, "status"], [1, "text-xs", "text-text-muted"], [1, "flex", "flex-col", "gap-1"], [1, "p-1", "rounded", "hover:bg-gray-100", "disabled:opacity-30", "disabled:cursor-not-allowed", "text-text-secondary", 3, "click", "disabled", "title"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 15l7-7 7 7"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 9l-7 7-7-7"], [1, "flex", "items-center", "gap-2"], [1, "text-sm", "text-primary", "hover:text-primary-hover", "font-medium", 3, "click"], [1, "text-sm", "text-error", "hover:text-red-700", "font-medium", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-text-muted"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"], [1, "text-sm", "text-text-muted"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "p-6"], [1, "text-lg", "font-semibold", "text-text-primary", "mb-4"], [1, "space-y-3"], [1, "block", "text-sm", "font-medium", "text-text-primary", "mb-1"], ["type", "text", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", 3, "ngModelChange", "ngModel", "placeholder"], [1, "flex", "justify-end"], [1, "bg-primary", "text-white", "hover:bg-primary-hover", "rounded-lg", "px-4", "py-2", "text-sm", "font-medium", "disabled:opacity-60", 3, "click", "disabled"], [1, "space-y-4", 3, "ngSubmit", "formGroup"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["formControlName", "titleFr", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary"], ["formControlName", "titleEn", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary"], ["formControlName", "subtitleFr", "rows", "3", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "resize-none"], ["formControlName", "subtitleEn", "rows", "3", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "resize-none"], ["type", "submit", 1, "bg-primary", "text-white", "hover:bg-primary-hover", "rounded-lg", "px-4", "py-2", "text-sm", "font-medium", "disabled:opacity-60", 3, "disabled"], [1, "bg-surface", "rounded-xl", "border", "border-border-light", "shadow-sm", "overflow-hidden"], [1, "overflow-x-auto"], [1, "w-full"], [1, "border-b", "border-border-light"], [1, "px-6", "py-3", "text-left", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "px-6", "py-3", "text-right", "text-xs", "font-semibold", "text-text-secondary", "uppercase", "tracking-wider"], [1, "divide-y", "divide-border-light"], [1, "hover:bg-gray-50/50", "cursor-pointer", 3, "click"], [1, "px-6", "py-4", "text-sm", "text-text-primary", "font-medium"], [1, "px-6", "py-4", "text-sm", "text-text-secondary"], [1, "px-6", "py-4", "text-sm", "text-text-secondary", "truncate", "max-w-[200px]"], [1, "px-6", "py-4", "text-sm", "text-text-secondary", "whitespace-nowrap"], [1, "px-6", "py-4"], [1, "flex", "items-center", "gap-1.5"], [3, "status", "label"], ["status", "completed", 3, "label"], [1, "px-6", "py-4", "text-right", 3, "click"], [1, "flex", "items-center", "justify-end", "gap-2"], [1, "text-xs", "text-primary", "hover:text-primary-hover", "font-medium", "whitespace-nowrap", 3, "click"], [1, "text-xs", "text-error", "hover:text-red-700", "font-medium", 3, "click"], ["colspan", "6", 1, "px-6", "py-4", "bg-gray-50/50"], [1, "text-sm", "text-text-primary", "whitespace-pre-wrap"], ["colspan", "6", 1, "px-6", "py-12", "text-center", "text-text-muted", "text-sm"], [1, "bg-white", "rounded-xl", "shadow-xl", "max-w-lg", "w-full", "p-6", "max-h-[80vh]", "overflow-y-auto", "mx-4"], [1, "grid", "grid-cols-2", "gap-4"], ["formControlName", "subtitleFr", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary"], ["formControlName", "subtitleEn", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary"], ["formControlName", "imageUrl", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", 3, "placeholder"], ["formControlName", "buttonTextFr", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary"], ["formControlName", "buttonTextEn", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary"], ["formControlName", "buttonLink", 1, "w-full", "px-3", "py-2", "border", "border-border", "rounded-lg", "text-sm", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", 3, "placeholder"], [1, "flex", "items-center", "gap-3"], [1, "block", "text-sm", "font-medium", "text-text-primary"], ["type", "button", 1, "relative", "inline-flex", "h-6", "w-11", "items-center", "rounded-full", "transition-colors", 3, "click"], [1, "inline-block", "h-4", "w-4", "rounded-full", "bg-white", "transition-transform"], [1, "flex", "justify-end", "gap-3", "pt-2"], ["type", "button", 1, "px-4", "py-2", "text-sm", "font-medium", "border", "border-border", "rounded-lg", "hover:bg-gray-50", 3, "click"]], template: function ContentComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div")(1, "div", 0)(2, "button", 1);
      \u0275\u0275listener("click", function ContentComponent_Template_button_click_2_listener() {
        return ctx.switchTab("carousel");
      });
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "button", 1);
      \u0275\u0275listener("click", function ContentComponent_Template_button_click_5_listener() {
        return ctx.switchTab("top-products");
      });
      \u0275\u0275text(6);
      \u0275\u0275pipe(7, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 1);
      \u0275\u0275listener("click", function ContentComponent_Template_button_click_8_listener() {
        return ctx.switchTab("hero-text");
      });
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "button", 1);
      \u0275\u0275listener("click", function ContentComponent_Template_button_click_11_listener() {
        return ctx.switchTab("messages");
      });
      \u0275\u0275text(12);
      \u0275\u0275pipe(13, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275conditionalCreate(14, ContentComponent_Conditional_14_Template, 10, 7, "div");
      \u0275\u0275conditionalCreate(15, ContentComponent_Conditional_15_Template, 3, 1, "div", 2);
      \u0275\u0275conditionalCreate(16, ContentComponent_Conditional_16_Template, 3, 1, "div");
      \u0275\u0275conditionalCreate(17, ContentComponent_Conditional_17_Template, 3, 1, "div");
      \u0275\u0275conditionalCreate(18, ContentComponent_Conditional_18_Template, 66, 52, "div", 3);
      \u0275\u0275elementStart(19, "app-confirm-modal", 4);
      \u0275\u0275pipe(20, "translate");
      \u0275\u0275pipe(21, "translate");
      \u0275\u0275listener("confirm", function ContentComponent_Template_app_confirm_modal_confirm_19_listener() {
        return ctx.deleteSlide();
      })("cancel", function ContentComponent_Template_app_confirm_modal_cancel_19_listener() {
        return ctx.showDeleteSlideModal.set(false);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "app-confirm-modal", 4);
      \u0275\u0275pipe(23, "translate");
      \u0275\u0275pipe(24, "translate");
      \u0275\u0275listener("confirm", function ContentComponent_Template_app_confirm_modal_confirm_22_listener() {
        return ctx.deleteMessage();
      })("cancel", function ContentComponent_Template_app_confirm_modal_cancel_22_listener() {
        return ctx.showDeleteMessageModal.set(false);
      });
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.activeTab() === "carousel" ? "border-primary text-primary" : "border-transparent text-text-secondary hover:text-text-primary");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 23, "CONTENT.CAROUSEL"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.activeTab() === "top-products" ? "border-primary text-primary" : "border-transparent text-text-secondary hover:text-text-primary");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(7, 25, "CONTENT.TOP_PRODUCTS"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.activeTab() === "hero-text" ? "border-primary text-primary" : "border-transparent text-text-secondary hover:text-text-primary");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 27, "CONTENT.HERO_TEXT"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.activeTab() === "messages" ? "border-primary text-primary" : "border-transparent text-text-secondary hover:text-text-primary");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 29, "CONTENT.CONTACT_MESSAGES"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.activeTab() === "carousel" ? 14 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "top-products" ? 15 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "hero-text" ? 16 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab() === "messages" ? 17 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.showSlideModal() ? 18 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("open", ctx.showDeleteSlideModal())("title", \u0275\u0275pipeBind1(20, 31, "CONTENT.DELETE_SLIDE_TITLE"))("message", \u0275\u0275pipeBind1(21, 33, "CONTENT.DELETE_SLIDE_CONFIRM"));
      \u0275\u0275advance(3);
      \u0275\u0275property("open", ctx.showDeleteMessageModal())("title", \u0275\u0275pipeBind1(23, 35, "CONTENT.DELETE_MESSAGE_TITLE"))("message", \u0275\u0275pipeBind1(24, 37, "CONTENT.DELETE_MESSAGE_CONFIRM"));
    }
  }, dependencies: [
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    FormsModule,
    NgModel,
    LoadingSpinnerComponent,
    StatusBadgeComponent,
    ConfirmModalComponent,
    TranslateModule,
    TranslatePipe
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContentComponent, [{
    type: Component,
    args: [{
      selector: "app-content",
      standalone: true,
      imports: [
        ReactiveFormsModule,
        FormsModule,
        LoadingSpinnerComponent,
        StatusBadgeComponent,
        ConfirmModalComponent,
        TranslateModule
      ],
      template: `
    <div>
      <!-- Tab Bar -->
      <div class="flex border-b border-border-light mb-6">
        <button
          (click)="switchTab('carousel')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'carousel'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'CONTENT.CAROUSEL' | translate }}
        </button>
        <button
          (click)="switchTab('top-products')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'top-products'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'CONTENT.TOP_PRODUCTS' | translate }}
        </button>
        <button
          (click)="switchTab('hero-text')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'hero-text'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'CONTENT.HERO_TEXT' | translate }}
        </button>
        <button
          (click)="switchTab('messages')"
          class="px-4 py-2 text-sm font-medium border-b-2 transition-colors"
          [class]="
            activeTab() === 'messages'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-secondary hover:text-text-primary'
          "
        >
          {{ 'CONTENT.CONTACT_MESSAGES' | translate }}
        </button>
      </div>

      <!-- Tab: Carousel -->
      @if (activeTab() === 'carousel') {
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-text-primary">
              {{ 'CONTENT.CAROUSEL_SLIDES' | translate }}
            </h2>
            <button
              (click)="openSlideModal()"
              class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium"
            >
              {{ 'CONTENT.ADD_SLIDE' | translate }}
            </button>
          </div>

          @if (loadingSlides()) {
            <app-loading-spinner />
          } @else {
            <div class="grid gap-4">
              @for (slide of slides(); track slide.id; let i = $index) {
                <div
                  class="bg-surface rounded-xl border border-border-light shadow-sm p-4 flex items-center gap-4"
                >
                  <!-- Image Preview -->
                  <div class="flex-shrink-0">
                    @if (slide.imageUrl) {
                      <img
                        [src]="slide.imageUrl"
                        [alt]="slide.titleFr"
                        class="w-24 h-16 rounded-lg object-cover border border-border-light"
                      />
                    } @else {
                      <div
                        class="w-24 h-16 rounded-lg bg-gray-100 flex items-center justify-center border border-border-light"
                      >
                        <svg
                          class="w-6 h-6 text-text-muted"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    }
                  </div>

                  <!-- Slide Info -->
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-text-primary truncate">
                      {{ slide.titleFr }}
                    </p>
                    <div class="flex items-center gap-2 mt-1">
                      <app-status-badge [status]="slide.isActive ? 'active' : 'inactive'" />
                      <span class="text-xs text-text-muted"> Order: {{ slide.displayOrder }} </span>
                    </div>
                  </div>

                  <!-- Reorder Buttons -->
                  <div class="flex flex-col gap-1">
                    <button
                      (click)="moveSlide(i, 'up')"
                      [disabled]="i === 0"
                      class="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
                      [title]="'CONTENT.MOVE_UP' | translate"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                    <button
                      (click)="moveSlide(i, 'down')"
                      [disabled]="i === slides().length - 1"
                      class="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary"
                      [title]="'CONTENT.MOVE_DOWN' | translate"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center gap-2">
                    <button
                      (click)="openSlideModal(slide)"
                      class="text-sm text-primary hover:text-primary-hover font-medium"
                    >
                      {{ 'CONTENT.EDIT' | translate }}
                    </button>
                    <button
                      (click)="confirmDeleteSlide(slide)"
                      class="text-sm text-error hover:text-red-700 font-medium"
                    >
                      {{ 'CONTENT.DELETE' | translate }}
                    </button>
                  </div>
                </div>
              } @empty {
                <div
                  class="bg-surface rounded-xl border border-border-light shadow-sm p-12 text-center"
                >
                  <p class="text-sm text-text-muted">{{ 'CONTENT.NO_SLIDES' | translate }}</p>
                </div>
              }
            </div>
          }
        </div>
      }

      <!-- Tab: Top Products -->
      @if (activeTab() === 'top-products') {
        <div class="space-y-6">
          @if (loadingTopConfig()) {
            <app-loading-spinner />
          } @else {
            <!-- Top Services -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h2 class="text-lg font-semibold text-text-primary mb-4">
                {{ 'CONTENT.TOP_SERVICES' | translate }}
              </h2>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.PRODUCT_IDS_LABEL' | translate }}
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="topServicesInput"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    [placeholder]="'CONTENT.PRODUCT_IDS_PLACEHOLDER' | translate"
                  />
                </div>
                <div class="flex justify-end">
                  <button
                    (click)="saveTopConfig('top_services')"
                    [disabled]="savingTopConfig()"
                    class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                  >
                    {{
                      savingTopConfig()
                        ? ('CONTENT.SAVING' | translate)
                        : ('CONTENT.SAVE_TOP_SERVICES' | translate)
                    }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Top Products -->
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h2 class="text-lg font-semibold text-text-primary mb-4">
                {{ 'CONTENT.TOP_PRODUCTS' | translate }}
              </h2>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.PRODUCT_IDS_LABEL' | translate }}
                  </label>
                  <input
                    type="text"
                    [(ngModel)]="topProductsInput"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    [placeholder]="'CONTENT.PRODUCT_IDS_PLACEHOLDER' | translate"
                  />
                </div>
                <div class="flex justify-end">
                  <button
                    (click)="saveTopConfig('top_products')"
                    [disabled]="savingTopConfig()"
                    class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                  >
                    {{
                      savingTopConfig()
                        ? ('CONTENT.SAVING' | translate)
                        : ('CONTENT.SAVE_TOP_PRODUCTS' | translate)
                    }}
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      }

      <!-- Tab: Hero Text -->
      @if (activeTab() === 'hero-text') {
        <div>
          @if (loadingHero()) {
            <app-loading-spinner />
          } @else {
            <div class="bg-surface rounded-xl border border-border-light shadow-sm p-6">
              <h2 class="text-lg font-semibold text-text-primary mb-4">
                {{ 'CONTENT.HERO_TEXT' | translate }}
              </h2>
              <form [formGroup]="heroForm" (ngSubmit)="saveHeroText()" class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      {{ 'CONTENT.TITLE_FR' | translate }}
                    </label>
                    <input
                      formControlName="titleFr"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      {{ 'CONTENT.TITLE_EN' | translate }}
                    </label>
                    <input
                      formControlName="titleEn"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      {{ 'CONTENT.SUBTITLE_FR' | translate }}
                    </label>
                    <textarea
                      formControlName="subtitleFr"
                      rows="3"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-text-primary mb-1">
                      {{ 'CONTENT.SUBTITLE_EN' | translate }}
                    </label>
                    <textarea
                      formControlName="subtitleEn"
                      rows="3"
                      class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    ></textarea>
                  </div>
                </div>
                <div class="flex justify-end">
                  <button
                    type="submit"
                    [disabled]="savingHero()"
                    class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                  >
                    {{
                      savingHero()
                        ? ('CONTENT.SAVING' | translate)
                        : ('CONTENT.SAVE_HERO' | translate)
                    }}
                  </button>
                </div>
              </form>
            </div>
          }
        </div>
      }

      <!-- Tab: Contact Messages -->
      @if (activeTab() === 'messages') {
        <div>
          @if (loadingMessages()) {
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
                        {{ 'CONTENT.NAME' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.EMAIL' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.SUBJECT' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.DATE' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.STATUS' | translate }}
                      </th>
                      <th
                        class="px-6 py-3 text-right text-xs font-semibold text-text-secondary uppercase tracking-wider"
                      >
                        {{ 'CONTENT.ACTIONS' | translate }}
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-border-light">
                    @for (msg of messages(); track msg.id) {
                      <tr
                        class="hover:bg-gray-50/50 cursor-pointer"
                        (click)="toggleMessageExpand(msg.id)"
                      >
                        <td class="px-6 py-4 text-sm text-text-primary font-medium">
                          {{ msg.name }}
                        </td>
                        <td class="px-6 py-4 text-sm text-text-secondary">{{ msg.email }}</td>
                        <td class="px-6 py-4 text-sm text-text-secondary truncate max-w-[200px]">
                          {{ msg.subject }}
                        </td>
                        <td class="px-6 py-4 text-sm text-text-secondary whitespace-nowrap">
                          {{ formatDate(msg.createdAt) }}
                        </td>
                        <td class="px-6 py-4">
                          <div class="flex items-center gap-1.5">
                            <app-status-badge
                              [status]="msg.isRead ? 'active' : 'pending'"
                              [label]="
                                msg.isRead
                                  ? ('CONTENT.READ' | translate)
                                  : ('CONTENT.UNREAD' | translate)
                              "
                            />
                            @if (msg.isTreated) {
                              <app-status-badge
                                status="completed"
                                [label]="'CONTENT.TREATED' | translate"
                              />
                            }
                          </div>
                        </td>
                        <td class="px-6 py-4 text-right" (click)="$event.stopPropagation()">
                          <div class="flex items-center justify-end gap-2">
                            <button
                              (click)="toggleMessageRead(msg)"
                              class="text-xs text-primary hover:text-primary-hover font-medium whitespace-nowrap"
                            >
                              {{
                                msg.isRead
                                  ? ('CONTENT.MARK_UNREAD' | translate)
                                  : ('CONTENT.MARK_READ' | translate)
                              }}
                            </button>
                            <button
                              (click)="toggleMessageTreated(msg)"
                              class="text-xs text-primary hover:text-primary-hover font-medium whitespace-nowrap"
                            >
                              {{
                                msg.isTreated
                                  ? ('CONTENT.UNTREATED' | translate)
                                  : ('CONTENT.MARK_TREATED' | translate)
                              }}
                            </button>
                            <button
                              (click)="confirmDeleteMessage(msg)"
                              class="text-xs text-error hover:text-red-700 font-medium"
                            >
                              {{ 'CONTENT.DELETE' | translate }}
                            </button>
                          </div>
                        </td>
                      </tr>
                      @if (expandedMessageId() === msg.id) {
                        <tr>
                          <td colspan="6" class="px-6 py-4 bg-gray-50/50">
                            <div class="text-sm text-text-primary whitespace-pre-wrap">
                              {{ msg.message }}
                            </div>
                          </td>
                        </tr>
                      }
                    } @empty {
                      <tr>
                        <td colspan="6" class="px-6 py-12 text-center text-text-muted text-sm">
                          {{ 'CONTENT.NO_MESSAGES' | translate }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          }
        </div>
      }

      <!-- Slide Modal -->
      @if (showSlideModal()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            class="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto mx-4"
          >
            <h3 class="text-lg font-semibold text-text-primary mb-4">
              {{
                editingSlide()
                  ? ('CONTENT.EDIT_SLIDE' | translate)
                  : ('CONTENT.NEW_SLIDE' | translate)
              }}
            </h3>
            <form [formGroup]="slideForm" (ngSubmit)="saveSlide()" class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.TITLE_FR' | translate }}
                  </label>
                  <input
                    formControlName="titleFr"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.TITLE_EN' | translate }}
                  </label>
                  <input
                    formControlName="titleEn"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.SUBTITLE_FR' | translate }}
                  </label>
                  <input
                    formControlName="subtitleFr"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.SUBTITLE_EN' | translate }}
                  </label>
                  <input
                    formControlName="subtitleEn"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'CONTENT.IMAGE_URL' | translate
                }}</label>
                <input
                  formControlName="imageUrl"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  [placeholder]="'CONTENT.IMAGE_URL_PLACEHOLDER' | translate"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.BUTTON_TEXT_FR' | translate }}
                  </label>
                  <input
                    formControlName="buttonTextFr"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-primary mb-1">
                    {{ 'CONTENT.BUTTON_TEXT_EN' | translate }}
                  </label>
                  <input
                    formControlName="buttonTextEn"
                    class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-primary mb-1">{{
                  'CONTENT.BUTTON_LINK' | translate
                }}</label>
                <input
                  formControlName="buttonLink"
                  class="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  [placeholder]="'CONTENT.BUTTON_LINK_PLACEHOLDER' | translate"
                />
              </div>
              <div class="flex items-center gap-3">
                <label class="block text-sm font-medium text-text-primary">{{
                  'CONTENT.ACTIVE' | translate
                }}</label>
                <button
                  type="button"
                  (click)="toggleSlideActive()"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  [class]="slideForm.get('isActive')?.value ? 'bg-primary' : 'bg-gray-200'"
                >
                  <span
                    class="inline-block h-4 w-4 rounded-full bg-white transition-transform"
                    [class]="slideForm.get('isActive')?.value ? 'translate-x-6' : 'translate-x-1'"
                  ></span>
                </button>
              </div>
              <div class="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  (click)="showSlideModal.set(false)"
                  class="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-gray-50"
                >
                  {{ 'CONTENT.CANCEL' | translate }}
                </button>
                <button
                  type="submit"
                  [disabled]="savingSlide()"
                  class="bg-primary text-white hover:bg-primary-hover rounded-lg px-4 py-2 text-sm font-medium disabled:opacity-60"
                >
                  {{
                    savingSlide() ? ('CONTENT.SAVING' | translate) : ('CONTENT.SAVE' | translate)
                  }}
                </button>
              </div>
            </form>
          </div>
        </div>
      }

      <!-- Confirm Delete Slide -->
      <app-confirm-modal
        [open]="showDeleteSlideModal()"
        [title]="'CONTENT.DELETE_SLIDE_TITLE' | translate"
        [message]="'CONTENT.DELETE_SLIDE_CONFIRM' | translate"
        confirmLabel="Delete"
        variant="danger"
        (confirm)="deleteSlide()"
        (cancel)="showDeleteSlideModal.set(false)"
      />

      <!-- Confirm Delete Message -->
      <app-confirm-modal
        [open]="showDeleteMessageModal()"
        [title]="'CONTENT.DELETE_MESSAGE_TITLE' | translate"
        [message]="'CONTENT.DELETE_MESSAGE_CONFIRM' | translate"
        confirmLabel="Delete"
        variant="danger"
        (confirm)="deleteMessage()"
        (cancel)="showDeleteMessageModal.set(false)"
      />
    </div>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ContentComponent, { className: "ContentComponent", filePath: "src/app/features/content/content.component.ts", lineNumber: 639 });
})();
export {
  ContentComponent
};
//# sourceMappingURL=chunk-3QUFDJIK.js.map
