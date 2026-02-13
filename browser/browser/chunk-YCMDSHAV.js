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
  computed,
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
  ɵɵpureFunction0,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-7J6Y2ARR.js";

// src/app/features/products/product-detail/product-detail.component.ts
var _c0 = () => [0, 1, 2];
var _c1 = (a0, a1) => [a0, a1, "edit"];
var _forTrack0 = ($index, $item) => $item.id;
function ProductDetailComponent_Conditional_0_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275element(1, "div", 27)(2, "div", 28)(3, "div", 29);
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 2)(2, "div", 3);
    \u0275\u0275element(3, "div", 4);
    \u0275\u0275elementStart(4, "div", 5);
    \u0275\u0275element(5, "div", 6)(6, "div", 7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 8);
    \u0275\u0275element(8, "div", 9)(9, "div", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 11)(11, "div", 12)(12, "div", 13);
    \u0275\u0275element(13, "div", 14);
    \u0275\u0275elementStart(14, "div", 15)(15, "div", 16);
    \u0275\u0275element(16, "div", 17)(17, "div", 17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 13);
    \u0275\u0275element(19, "div", 18);
    \u0275\u0275elementStart(20, "div", 19);
    \u0275\u0275element(21, "div", 20)(22, "div", 21)(23, "div", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 13);
    \u0275\u0275element(25, "div", 23);
    \u0275\u0275elementStart(26, "div", 15);
    \u0275\u0275repeaterCreate(27, ProductDetailComponent_Conditional_0_For_28_Template, 4, 0, "div", 24, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 25)(30, "div", 13);
    \u0275\u0275element(31, "div", 26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 13);
    \u0275\u0275element(33, "div", 18);
    \u0275\u0275elementStart(34, "div", 19);
    \u0275\u0275element(35, "div", 20)(36, "div", 20);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(27);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 39);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r1.category == null ? null : p_r1.category.nameFr);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 38);
    \u0275\u0275text(1, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 61);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 1, "PRODUCTS.FEATURED"));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 40)(1, "a", 62);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 63);
    \u0275\u0275element(3, "path", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "button", 65);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_26_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.showDeleteModal.set(true));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(7, "svg", 63);
    \u0275\u0275element(8, "path", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction2(7, _c1, ctx_r2.basePath, p_r1.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 3, "PRODUCTS.EDIT"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 5, "PRODUCTS.DELETE"), " ");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_35_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 68)(1, "span", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 39);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(p_r1.priceMonthly));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("/ ", \u0275\u0275pipeBind1(5, 2, "PRODUCTS.MONTHLY"));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_35_Conditional_2_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 71);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_35_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductDetailComponent_Conditional_1_Conditional_35_Conditional_2_Conditional_0_Template, 1, 0, "div", 71);
    \u0275\u0275elementStart(1, "div", 68)(2, "span", 70);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 39);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(p_r1.priceMonthly ? 0 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(p_r1.priceYearly));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("/ ", \u0275\u0275pipeBind1(6, 3, "PRODUCTS.YEARLY"));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_35_Conditional_3_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 71);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_35_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, ProductDetailComponent_Conditional_1_Conditional_35_Conditional_3_Conditional_0_Template, 1, 0, "div", 71);
    \u0275\u0275elementStart(1, "div", 68)(2, "span", 70);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 39);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(p_r1.priceMonthly || p_r1.priceYearly ? 0 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(p_r1.priceUnit));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("/ ", \u0275\u0275pipeBind1(6, 3, "PRODUCTS.UNIT_PRICE"));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_35_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 69)(1, "div", 40)(2, "span", 72);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.getYearlySavings(), " ");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275conditionalCreate(1, ProductDetailComponent_Conditional_1_Conditional_35_Conditional_1_Template, 6, 4, "div", 68);
    \u0275\u0275conditionalCreate(2, ProductDetailComponent_Conditional_1_Conditional_35_Conditional_2_Template, 7, 5);
    \u0275\u0275conditionalCreate(3, ProductDetailComponent_Conditional_1_Conditional_35_Conditional_3_Template, 7, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(4, ProductDetailComponent_Conditional_1_Conditional_35_Conditional_4_Template, 4, 1, "div", 69);
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r1.priceMonthly ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r1.priceYearly ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r1.priceUnit ? 3 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.priceCount() > 1 && p_r1.priceMonthly && p_r1.priceYearly ? 4 : -1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47)(1, "span", 73);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "PRODUCTS.NA"));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_57_For_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 80);
    \u0275\u0275text(3, "\u2014");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const char_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(char_r4.keyFr);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_57_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275conditionalCreate(1, ProductDetailComponent_Conditional_1_Conditional_57_For_9_Conditional_1_Template, 4, 1);
    \u0275\u0275elementStart(2, "span", 78);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const char_r4 = ctx.$implicit;
    const \u0275$index_270_r5 = ctx.$index;
    \u0275\u0275classMap(\u0275$index_270_r5 % 2 !== 0 ? "bg-background/50" : "");
    \u0275\u0275advance();
    \u0275\u0275conditional(char_r4.keyFr ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(char_r4.valueFr || "\u2014");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 74)(2, "h3", 45);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 75);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 48);
    \u0275\u0275repeaterCreate(8, ProductDetailComponent_Conditional_1_Conditional_57_For_9_Template, 4, 4, "div", 76, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 3, "PRODUCTS.CHARACTERISTICS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", p_r1.characteristics.length, " ", p_r1.characteristics.length > 1 ? "items" : "item");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(p_r1.characteristics);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_64_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 81);
    \u0275\u0275element(1, "img", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext(2);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.selectedImage(), \u0275\u0275sanitizeUrl)("alt", p_r1.nameFr);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_64_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 85);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_64_Conditional_2_For_2_Template_button_click_0_listener() {
      const img_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.selectedImage.set(img_r7.imageUrl));
    });
    \u0275\u0275element(1, "img", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classMap(ctx_r2.selectedImage() === img_r7.imageUrl ? "border-primary shadow-sm" : "border-border-light hover:border-primary/30");
    \u0275\u0275advance();
    \u0275\u0275property("src", img_r7.imageUrl, \u0275\u0275sanitizeUrl)("alt", img_r7.altTextFr || "");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_64_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82);
    \u0275\u0275repeaterCreate(1, ProductDetailComponent_Conditional_1_Conditional_64_Conditional_2_For_2_Template, 2, 4, "button", 84, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(p_r1.images);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275conditionalCreate(1, ProductDetailComponent_Conditional_1_Conditional_64_Conditional_1_Template, 2, 2, "div", 81);
    \u0275\u0275conditionalCreate(2, ProductDetailComponent_Conditional_1_Conditional_64_Conditional_2_Template, 3, 0, "div", 82);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedImage() ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r1.images.length > 1 ? 2 : -1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 57)(1, "div", 86);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 87);
    \u0275\u0275element(3, "path", 88);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 39);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 1, "PRODUCTS.NO_IMAGES"));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_66_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 93);
    \u0275\u0275element(2, "path", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "span", 95);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 1, "PRODUCTS.LOW_STOCK"));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44)(2, "h3", 45);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 46)(6, "div", 89)(7, "span", 70);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 39);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 90);
    \u0275\u0275element(13, "div", 91);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(14, ProductDetailComponent_Conditional_1_Conditional_66_Conditional_14_Template, 6, 3, "div", 92);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 9, "PRODUCTS.STOCK"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r1.stockQuantity ?? 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind1(11, 11, "PRODUCTS.ALERT_THRESHOLD"), ": ", p_r1.stockAlertThreshold);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r2.stockBarColor());
    \u0275\u0275styleProp("width", ctx_r2.stockPercent(), "%");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isLowStock() ? 14 : -1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 96);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "PRODUCTS.NAME_EN"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r1.nameEn);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58)(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 96);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r1 = \u0275\u0275nextContext();
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, "PRODUCTS.UPDATED_AT"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(p_r1.updatedAt));
  }
}
function ProductDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 2)(2, "div", 3)(3, "a", 30);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 31);
    \u0275\u0275element(5, "path", 32);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 33)(7, "div", 3)(8, "h1", 34);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "app-status-badge", 35);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 36)(14, "span", 37);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 38);
    \u0275\u0275text(17, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 39);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(20, ProductDetailComponent_Conditional_1_Conditional_20_Template, 4, 1);
    \u0275\u0275conditionalCreate(21, ProductDetailComponent_Conditional_1_Conditional_21_Template, 5, 3);
    \u0275\u0275elementStart(22, "span", 38);
    \u0275\u0275text(23, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 39);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(26, ProductDetailComponent_Conditional_1_Conditional_26_Template, 11, 10, "div", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 41)(28, "div", 42)(29, "div", 43)(30, "div", 44)(31, "h3", 45);
    \u0275\u0275text(32);
    \u0275\u0275pipe(33, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 46);
    \u0275\u0275conditionalCreate(35, ProductDetailComponent_Conditional_1_Conditional_35_Template, 5, 4)(36, ProductDetailComponent_Conditional_1_Conditional_36_Template, 4, 3, "div", 47);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div", 43)(38, "div", 44)(39, "h3", 45);
    \u0275\u0275text(40);
    \u0275\u0275pipe(41, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "div", 48)(43, "div", 49)(44, "div", 50)(45, "span", 51);
    \u0275\u0275text(46, "FR");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "p", 52);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "div", 49)(51, "div", 50)(52, "span", 51);
    \u0275\u0275text(53, "EN");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(54, "p", 53);
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "translate");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275conditionalCreate(57, ProductDetailComponent_Conditional_1_Conditional_57_Template, 10, 5, "div", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 55)(59, "div", 43)(60, "div", 44)(61, "h3", 45);
    \u0275\u0275text(62);
    \u0275\u0275pipe(63, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(64, ProductDetailComponent_Conditional_1_Conditional_64_Template, 3, 2, "div", 56)(65, ProductDetailComponent_Conditional_1_Conditional_65_Template, 7, 3, "div", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(66, ProductDetailComponent_Conditional_1_Conditional_66_Template, 15, 13, "div", 43);
    \u0275\u0275elementStart(67, "div", 43)(68, "div", 44)(69, "h3", 45);
    \u0275\u0275text(70);
    \u0275\u0275pipe(71, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(72, "div", 48)(73, "div", 58)(74, "span", 39);
    \u0275\u0275text(75);
    \u0275\u0275pipe(76, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(77, "span", 59);
    \u0275\u0275text(78);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(79, "div", 58)(80, "span", 39);
    \u0275\u0275text(81);
    \u0275\u0275pipe(82, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "span", 59);
    \u0275\u0275text(84);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(85, ProductDetailComponent_Conditional_1_Conditional_85_Template, 6, 4, "div", 58);
    \u0275\u0275elementStart(86, "div", 58)(87, "span", 39);
    \u0275\u0275text(88);
    \u0275\u0275pipe(89, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "span", 60);
    \u0275\u0275text(91);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(92, ProductDetailComponent_Conditional_1_Conditional_92_Template, 6, 4, "div", 58);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const p_r1 = ctx;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", ctx_r2.basePath);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(p_r1.nameFr);
    \u0275\u0275advance();
    \u0275\u0275property("status", p_r1.isAvailable ? "active" : "inactive")("label", p_r1.isAvailable ? \u0275\u0275pipeBind1(11, 28, "PRODUCTS.AVAILABLE") : \u0275\u0275pipeBind1(12, 30, "PRODUCTS.UNAVAILABLE"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(p_r1.sku);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(p_r1.productType);
    \u0275\u0275advance();
    \u0275\u0275conditional((p_r1.category == null ? null : p_r1.category.nameFr) ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r1.isFeatured ? 21 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.formatDate(p_r1.createdAt));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.auth.isSuperAdmin() ? 26 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(33, 32, "PRODUCTS.PRICING"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.priceCount() > 0 ? 35 : 36);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(41, 34, "PRODUCTS.DESCRIPTION"), " ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", p_r1.descriptionFr || \u0275\u0275pipeBind1(49, 36, "PRODUCTS.NA"), " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", p_r1.descriptionEn || \u0275\u0275pipeBind1(56, 38, "PRODUCTS.NA"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((p_r1.characteristics == null ? null : p_r1.characteristics.length) ? 57 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(63, 40, "PRODUCTS.IMAGES"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional((p_r1.images == null ? null : p_r1.images.length) ? 64 : 65);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(p_r1.productType === "PHYSICAL" ? 66 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(71, 42, "PRODUCTS.DETAILS"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(76, 44, "PRODUCTS.SLUG"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r1.slug);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(82, 46, "PRODUCTS.SKU"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r1.sku);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r1.nameEn ? 85 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(89, 48, "PRODUCTS.DISPLAY_ORDER"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r1.displayOrder);
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r1.updatedAt ? 92 : -1);
  }
}
var ProductDetailComponent = class _ProductDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  api = inject(ApiService);
  auth = inject(AdminAuthService);
  notifications = inject(NotificationService);
  translate = inject(TranslateService);
  product = signal(null, ...ngDevMode ? [{ debugName: "product" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  showDeleteModal = signal(false, ...ngDevMode ? [{ debugName: "showDeleteModal" }] : []);
  selectedImage = signal("", ...ngDevMode ? [{ debugName: "selectedImage" }] : []);
  basePath = "/products";
  stockPercent = computed(() => {
    const p = this.product();
    if (!p || p.productType !== "PHYSICAL")
      return 0;
    const qty = p.stockQuantity ?? 0;
    const max = Math.max(qty, p.stockAlertThreshold * 3, 100);
    return Math.min(qty / max * 100, 100);
  }, ...ngDevMode ? [{ debugName: "stockPercent" }] : []);
  stockBarColor = computed(() => {
    const p = this.product();
    if (!p)
      return "bg-success";
    const qty = p.stockQuantity ?? 0;
    if (qty === 0)
      return "bg-error";
    if (qty <= p.stockAlertThreshold)
      return "bg-warning";
    return "bg-success";
  }, ...ngDevMode ? [{ debugName: "stockBarColor" }] : []);
  isLowStock = computed(() => {
    const p = this.product();
    if (!p || p.productType !== "PHYSICAL")
      return false;
    return (p.stockQuantity ?? 0) <= p.stockAlertThreshold;
  }, ...ngDevMode ? [{ debugName: "isLowStock" }] : []);
  priceCount = computed(() => {
    const p = this.product();
    if (!p)
      return 0;
    return (p.priceMonthly ? 1 : 0) + (p.priceYearly ? 1 : 0) + (p.priceUnit ? 1 : 0);
  }, ...ngDevMode ? [{ debugName: "priceCount" }] : []);
  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data["basePath"])
      this.basePath = data["basePath"];
    const id = this.route.snapshot.paramMap.get("id");
    if (id)
      this.loadProduct(id);
  }
  loadProduct(id) {
    this.api.get(`admin/catalog/products/${id}`).subscribe({
      next: (product) => {
        this.product.set(product);
        const primary = product.images?.find((img) => img.isPrimary);
        this.selectedImage.set(primary?.imageUrl || product.images?.[0]?.imageUrl || "");
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("PRODUCTS.NOT_FOUND"));
        this.router.navigate([this.basePath]);
      }
    });
  }
  deleteProduct() {
    const p = this.product();
    if (!p)
      return;
    this.api.delete(`admin/catalog/products/${p.id}`).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant("PRODUCTS.DELETED"));
        this.router.navigate([this.basePath]);
      },
      error: () => {
        this.notifications.error(this.translate.instant("PRODUCTS.DELETE_ERROR"));
        this.showDeleteModal.set(false);
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
  getYearlySavings() {
    const p = this.product();
    if (!p?.priceMonthly || !p?.priceYearly)
      return "";
    const monthlyCost = p.priceMonthly * 12;
    const savings = monthlyCost - p.priceYearly;
    if (savings <= 0)
      return "";
    const pct = Math.round(savings / monthlyCost * 100);
    return this.translate.instant("PRODUCTS.YEARLY_SAVINGS", { pct });
  }
  static \u0275fac = function ProductDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductDetailComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailComponent, selectors: [["app-product-detail"]], decls: 6, vars: 11, consts: [[2, "animation", "fadeInUp 0.45s ease-out both"], ["variant", "danger", 3, "confirm", "cancel", "open", "title", "message", "confirmLabel"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "flex", "items-center", "gap-3"], [1, "w-9", "h-9", "rounded-full", "animate-pulse", "bg-gray-100"], [1, "flex", "flex-col", "gap-2"], [1, "h-6", "w-48", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-4", "w-64", "animate-pulse", "rounded", "bg-gray-100"], [1, "flex", "gap-2"], [1, "h-9", "w-20", "animate-pulse", "rounded-lg", "bg-gray-100"], [1, "h-9", "w-24", "animate-pulse", "rounded-lg", "bg-gray-100"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-5"], [1, "lg:col-span-2", "space-y-5"], [1, "rounded-xl", "border", "border-border-light", "bg-surface", "p-6"], [1, "h-5", "w-32", "animate-pulse", "rounded", "bg-gray-100", "mb-4"], [1, "space-y-0"], [1, "flex", "gap-8", "py-3.5"], [1, "h-8", "w-28", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-5", "w-28", "animate-pulse", "rounded", "bg-gray-100", "mb-4"], [1, "space-y-3"], [1, "h-4", "w-full", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-4", "w-3/4", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-4", "w-5/6", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-5", "w-36", "animate-pulse", "rounded", "bg-gray-100", "mb-4"], [1, "flex", "items-center", "gap-4", "py-3"], [1, "space-y-5"], [1, "h-40", "animate-pulse", "rounded-lg", "bg-gray-100"], [1, "h-4", "w-32", "animate-pulse", "rounded", "bg-gray-100"], [1, "flex-1"], [1, "h-4", "w-40", "animate-pulse", "rounded", "bg-gray-100"], [1, "flex", "h-9", "w-9", "shrink-0", "items-center", "justify-center", "rounded-full", "bg-background", "transition-colors", "hover:bg-primary-light", 2, "text-decoration", "none", "color", "#0a0a0a", "border", "none", 3, "routerLink"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-[18px]", "h-[18px]"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M15.75 19.5L8.25 12l7.5-7.5"], [1, "min-w-0"], [1, "text-xl", "font-bold", "text-text-primary", "truncate", "!m-0"], [3, "status", "label"], [1, "flex", "items-center", "gap-1.5", "mt-0.5"], [1, "text-xs", "text-text-muted", "font-mono"], [1, "text-text-muted/30", "text-xs"], [1, "text-xs", "text-text-muted"], [1, "flex", "items-center", "gap-2"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-5", 2, "animation", "fadeInUp 0.45s ease-out 0.08s both"], [1, "lg:col-span-2", "flex", "flex-col", "gap-5"], [1, "rounded-xl", "border", "border-border-light", "bg-surface", "shadow-sm", "overflow-hidden"], [1, "px-6", "py-4", "border-b", "border-border-light"], [1, "text-sm", "font-semibold", "text-text-primary", "!m-0"], [1, "p-5"], [1, "flex", "items-center", "gap-2", "py-2"], [1, "divide-y", "divide-border-light"], [1, "px-6", "py-5"], [1, "flex", "items-center", "gap-2", "mb-3"], [1, "inline-flex", "items-center", "rounded", "bg-background", "border", "border-border-light", "px-2", "py-0.5", "text-[10px]", "font-semibold", "text-text-muted", "uppercase", "tracking-wider"], [1, "text-sm", "text-text-primary", "leading-relaxed", "whitespace-pre-wrap", "!m-0"], [1, "text-sm", "text-text-secondary", "leading-relaxed", "whitespace-pre-wrap", "!m-0"], [1, "rounded-xl", "border", "border-border-light", "bg-surface", "shadow-sm", "overflow-hidden", "flex-1"], [1, "flex", "flex-col", "gap-5"], [1, "p-4"], [1, "flex", "flex-col", "items-center", "justify-center", "gap-2", "py-10"], [1, "flex", "items-center", "justify-between", "px-6", "py-3.5"], [1, "text-xs", "font-mono", "text-text-secondary", "bg-background", "px-2", "py-0.5", "rounded"], [1, "text-xs", "font-medium", "text-text-secondary"], [1, "text-xs", "text-warning", "font-medium"], [1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-2", "bg-primary", "text-white", "text-sm", "font-medium", "rounded-lg", "hover:bg-primary-hover", "transition-colors", 2, "text-decoration", "none", 3, "routerLink"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"], [1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-2", "border", "border-border-light", "text-text-muted", "text-sm", "font-medium", "rounded-lg", "hover:text-error", "hover:border-error", "hover:bg-error-light", "transition-colors", "bg-transparent", "cursor-pointer", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"], [1, "flex", "flex-wrap", "gap-6"], [1, "flex", "items-baseline", "gap-2.5"], [1, "mt-4", "pt-4", "border-t", "border-border-light"], [1, "text-2xl", "font-semibold", "tracking-tight", "text-text-primary"], [1, "w-px", "self-stretch", "bg-border-light"], [1, "text-xs", "text-success", "font-medium"], [1, "text-sm", "text-text-muted"], [1, "px-6", "py-4", "border-b", "border-border-light", "flex", "items-center", "justify-between"], [1, "text-[11px]", "text-text-muted"], [1, "flex", "items-baseline", "gap-3", "px-6", "py-3", 3, "class"], [1, "flex", "items-baseline", "gap-3", "px-6", "py-3"], [1, "text-sm", "text-text-primary"], [1, "text-xs", "font-medium", "text-text-muted", "uppercase", "tracking-wide", "shrink-0"], [1, "text-xs", "text-text-muted/30"], [1, "relative", "w-full", "overflow-hidden", "rounded-lg", "bg-border-light", "mb-3", 2, "aspect-ratio", "4/3"], [1, "grid", "grid-cols-4", "gap-2"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "aspect-square", "rounded-lg", "overflow-hidden", "border-2", "transition-all", "cursor-pointer", "bg-transparent", "p-0", 3, "class"], [1, "aspect-square", "rounded-lg", "overflow-hidden", "border-2", "transition-all", "cursor-pointer", "bg-transparent", "p-0", 3, "click"], [1, "w-10", "h-10", "rounded-full", "bg-background", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-text-muted/40"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"], [1, "flex", "items-baseline", "justify-between", "mb-3"], [1, "w-full", "bg-border-light", "rounded-full", "h-2"], [1, "rounded-full", "h-2", "transition-all", "duration-500"], [1, "flex", "items-center", "gap-1.5", "mt-3"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3.5", "h-3.5", "text-warning"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"], [1, "text-xs", "font-medium", "text-warning"], [1, "text-xs", "text-text-secondary"]], template: function ProductDetailComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ProductDetailComponent_Conditional_0_Template, 37, 1, "div", 0)(1, ProductDetailComponent_Conditional_1_Template, 93, 50, "div", 0);
      \u0275\u0275elementStart(2, "app-confirm-modal", 1);
      \u0275\u0275pipe(3, "translate");
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275pipe(5, "translate");
      \u0275\u0275listener("confirm", function ProductDetailComponent_Template_app_confirm_modal_confirm_2_listener() {
        return ctx.deleteProduct();
      })("cancel", function ProductDetailComponent_Template_app_confirm_modal_cancel_2_listener() {
        return ctx.showDeleteModal.set(false);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275conditional(ctx.loading() ? 0 : (tmp_0_0 = ctx.product()) ? 1 : -1, tmp_0_0);
      \u0275\u0275advance(2);
      \u0275\u0275property("open", ctx.showDeleteModal())("title", \u0275\u0275pipeBind1(3, 5, "PRODUCTS.DELETE_TITLE"))("message", \u0275\u0275pipeBind1(4, 7, "PRODUCTS.DELETE_WARNING"))("confirmLabel", \u0275\u0275pipeBind1(5, 9, "PRODUCTS.DELETE_CONFIRM"));
    }
  }, dependencies: [RouterLink, TranslateModule, StatusBadgeComponent, ConfirmModalComponent, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductDetailComponent, [{
    type: Component,
    args: [{
      selector: "app-product-detail",
      standalone: true,
      imports: [RouterLink, TranslateModule, StatusBadgeComponent, ConfirmModalComponent],
      template: `
    @if (loading()) {
      <!-- Skeleton loading -->
      <div style="animation: fadeInUp 0.45s ease-out both">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full animate-pulse bg-gray-100"></div>
            <div class="flex flex-col gap-2">
              <div class="h-6 w-48 animate-pulse rounded bg-gray-100"></div>
              <div class="h-4 w-64 animate-pulse rounded bg-gray-100"></div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="h-9 w-20 animate-pulse rounded-lg bg-gray-100"></div>
            <div class="h-9 w-24 animate-pulse rounded-lg bg-gray-100"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div class="lg:col-span-2 space-y-5">
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-32 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-0">
                <div class="flex gap-8 py-3.5">
                  <div class="h-8 w-28 animate-pulse rounded bg-gray-100"></div>
                  <div class="h-8 w-28 animate-pulse rounded bg-gray-100"></div>
                </div>
              </div>
            </div>
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-28 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-3">
                <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-3/4 animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-5/6 animate-pulse rounded bg-gray-100"></div>
              </div>
            </div>
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-36 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-0">
                @for (i of [0, 1, 2]; track i) {
                  <div class="flex items-center gap-4 py-3">
                    <div class="h-4 w-32 animate-pulse rounded bg-gray-100"></div>
                    <div class="flex-1"></div>
                    <div class="h-4 w-40 animate-pulse rounded bg-gray-100"></div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div class="space-y-5">
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-40 animate-pulse rounded-lg bg-gray-100"></div>
            </div>
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-28 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-3">
                <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-full animate-pulse rounded bg-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    } @else if (product(); as p) {
      <div style="animation: fadeInUp 0.45s ease-out both">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <a
              [routerLink]="basePath"
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background transition-colors hover:bg-primary-light"
              style="text-decoration: none; color: #0a0a0a; border: none"
            >
              <svg class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </a>
            <div class="min-w-0">
              <div class="flex items-center gap-3">
                <h1 class="text-xl font-bold text-text-primary truncate !m-0">{{ p.nameFr }}</h1>
                <app-status-badge
                  [status]="p.isAvailable ? 'active' : 'inactive'"
                  [label]="
                    p.isAvailable
                      ? ('PRODUCTS.AVAILABLE' | translate)
                      : ('PRODUCTS.UNAVAILABLE' | translate)
                  "
                />
              </div>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="text-xs text-text-muted font-mono">{{ p.sku }}</span>
                <span class="text-text-muted/30 text-xs">|</span>
                <span class="text-xs text-text-muted">{{ p.productType }}</span>
                @if (p.category?.nameFr) {
                  <span class="text-text-muted/30 text-xs">|</span>
                  <span class="text-xs text-text-muted">{{ p.category?.nameFr }}</span>
                }
                @if (p.isFeatured) {
                  <span class="text-text-muted/30 text-xs">|</span>
                  <span class="text-xs text-warning font-medium">{{
                    'PRODUCTS.FEATURED' | translate
                  }}</span>
                }
                <span class="text-text-muted/30 text-xs">|</span>
                <span class="text-xs text-text-muted">{{ formatDate(p.createdAt) }}</span>
              </div>
            </div>
          </div>
          @if (auth.isSuperAdmin()) {
            <div class="flex items-center gap-2">
              <a
                [routerLink]="[basePath, p.id, 'edit']"
                class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
                style="text-decoration: none"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                  />
                </svg>
                {{ 'PRODUCTS.EDIT' | translate }}
              </a>
              <button
                (click)="showDeleteModal.set(true)"
                class="inline-flex items-center gap-1.5 px-4 py-2 border border-border-light text-text-muted text-sm font-medium rounded-lg hover:text-error hover:border-error hover:bg-error-light transition-colors bg-transparent cursor-pointer"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                {{ 'PRODUCTS.DELETE' | translate }}
              </button>
            </div>
          }
        </div>

        <!-- Content grid -->
        <div
          class="grid grid-cols-1 lg:grid-cols-3 gap-5"
          style="animation: fadeInUp 0.45s ease-out 0.08s both"
        >
          <!-- Main column -->
          <div class="lg:col-span-2 flex flex-col gap-5">
            <!-- Pricing -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.PRICING' | translate }}
                </h3>
              </div>
              <div class="p-5">
                @if (priceCount() > 0) {
                  <div class="flex flex-wrap gap-6">
                    @if (p.priceMonthly) {
                      <div class="flex items-baseline gap-2.5">
                        <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                          formatCurrency(p.priceMonthly)
                        }}</span>
                        <span class="text-xs text-text-muted"
                          >/ {{ 'PRODUCTS.MONTHLY' | translate }}</span
                        >
                      </div>
                    }
                    @if (p.priceYearly) {
                      @if (p.priceMonthly) {
                        <div class="w-px self-stretch bg-border-light"></div>
                      }
                      <div class="flex items-baseline gap-2.5">
                        <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                          formatCurrency(p.priceYearly)
                        }}</span>
                        <span class="text-xs text-text-muted"
                          >/ {{ 'PRODUCTS.YEARLY' | translate }}</span
                        >
                      </div>
                    }
                    @if (p.priceUnit) {
                      @if (p.priceMonthly || p.priceYearly) {
                        <div class="w-px self-stretch bg-border-light"></div>
                      }
                      <div class="flex items-baseline gap-2.5">
                        <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                          formatCurrency(p.priceUnit)
                        }}</span>
                        <span class="text-xs text-text-muted"
                          >/ {{ 'PRODUCTS.UNIT_PRICE' | translate }}</span
                        >
                      </div>
                    }
                  </div>
                  @if (priceCount() > 1 && p.priceMonthly && p.priceYearly) {
                    <div class="mt-4 pt-4 border-t border-border-light">
                      <div class="flex items-center gap-2">
                        <span class="text-xs text-success font-medium">
                          {{ getYearlySavings() }}
                        </span>
                      </div>
                    </div>
                  }
                } @else {
                  <div class="flex items-center gap-2 py-2">
                    <span class="text-sm text-text-muted">{{ 'PRODUCTS.NA' | translate }}</span>
                  </div>
                }
              </div>
            </div>

            <!-- Description -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.DESCRIPTION' | translate }}
                </h3>
              </div>
              <div class="divide-y divide-border-light">
                <div class="px-6 py-5">
                  <div class="flex items-center gap-2 mb-3">
                    <span
                      class="inline-flex items-center rounded bg-background border border-border-light px-2 py-0.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider"
                      >FR</span
                    >
                  </div>
                  <p class="text-sm text-text-primary leading-relaxed whitespace-pre-wrap !m-0">
                    {{ p.descriptionFr || ('PRODUCTS.NA' | translate) }}
                  </p>
                </div>
                <div class="px-6 py-5">
                  <div class="flex items-center gap-2 mb-3">
                    <span
                      class="inline-flex items-center rounded bg-background border border-border-light px-2 py-0.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider"
                      >EN</span
                    >
                  </div>
                  <p class="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap !m-0">
                    {{ p.descriptionEn || ('PRODUCTS.NA' | translate) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Characteristics -->
            @if (p.characteristics?.length) {
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden flex-1"
              >
                <div
                  class="px-6 py-4 border-b border-border-light flex items-center justify-between"
                >
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.CHARACTERISTICS' | translate }}
                  </h3>
                  <span class="text-[11px] text-text-muted"
                    >{{ p.characteristics.length }}
                    {{ p.characteristics.length > 1 ? 'items' : 'item' }}</span
                  >
                </div>
                <div class="divide-y divide-border-light">
                  @for (char of p.characteristics; track char.id; let odd = $odd) {
                    <div
                      class="flex items-baseline gap-3 px-6 py-3"
                      [class]="odd ? 'bg-background/50' : ''"
                    >
                      @if (char.keyFr) {
                        <span
                          class="text-xs font-medium text-text-muted uppercase tracking-wide shrink-0"
                          >{{ char.keyFr }}</span
                        >
                        <span class="text-xs text-text-muted/30">\u2014</span>
                      }
                      <span class="text-sm text-text-primary">{{ char.valueFr || '\u2014' }}</span>
                    </div>
                  }
                </div>
              </div>
            }
          </div>

          <!-- Sidebar -->
          <div class="flex flex-col gap-5">
            <!-- Images -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.IMAGES' | translate }}
                </h3>
              </div>
              @if (p.images?.length) {
                <div class="p-4">
                  @if (selectedImage()) {
                    <div
                      class="relative w-full overflow-hidden rounded-lg bg-border-light mb-3"
                      style="aspect-ratio: 4/3"
                    >
                      <img
                        [src]="selectedImage()"
                        [alt]="p.nameFr"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  }
                  @if (p.images.length > 1) {
                    <div class="grid grid-cols-4 gap-2">
                      @for (img of p.images; track img.id) {
                        <button
                          (click)="selectedImage.set(img.imageUrl)"
                          class="aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-transparent p-0"
                          [class]="
                            selectedImage() === img.imageUrl
                              ? 'border-primary shadow-sm'
                              : 'border-border-light hover:border-primary/30'
                          "
                        >
                          <img
                            [src]="img.imageUrl"
                            [alt]="img.altTextFr || ''"
                            class="w-full h-full object-cover"
                          />
                        </button>
                      }
                    </div>
                  }
                </div>
              } @else {
                <div class="flex flex-col items-center justify-center gap-2 py-10">
                  <div
                    class="w-10 h-10 rounded-full bg-background flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-text-muted/40"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                      />
                    </svg>
                  </div>
                  <span class="text-xs text-text-muted">{{
                    'PRODUCTS.NO_IMAGES' | translate
                  }}</span>
                </div>
              }
            </div>

            <!-- Stock (physical only) -->
            @if (p.productType === 'PHYSICAL') {
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.STOCK' | translate }}
                  </h3>
                </div>
                <div class="p-5">
                  <div class="flex items-baseline justify-between mb-3">
                    <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                      p.stockQuantity ?? 0
                    }}</span>
                    <span class="text-xs text-text-muted"
                      >{{ 'PRODUCTS.ALERT_THRESHOLD' | translate }}:
                      {{ p.stockAlertThreshold }}</span
                    >
                  </div>
                  <div class="w-full bg-border-light rounded-full h-2">
                    <div
                      class="rounded-full h-2 transition-all duration-500"
                      [class]="stockBarColor()"
                      [style.width.%]="stockPercent()"
                    ></div>
                  </div>
                  @if (isLowStock()) {
                    <div class="flex items-center gap-1.5 mt-3">
                      <svg
                        class="w-3.5 h-3.5 text-warning"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                      <span class="text-xs font-medium text-warning">{{
                        'PRODUCTS.LOW_STOCK' | translate
                      }}</span>
                    </div>
                  }
                </div>
              </div>
            }

            <!-- Quick info -->
            <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
              <div class="px-6 py-4 border-b border-border-light">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.DETAILS' | translate }}
                </h3>
              </div>
              <div class="divide-y divide-border-light">
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{ 'PRODUCTS.SLUG' | translate }}</span>
                  <span
                    class="text-xs font-mono text-text-secondary bg-background px-2 py-0.5 rounded"
                    >{{ p.slug }}</span
                  >
                </div>
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{ 'PRODUCTS.SKU' | translate }}</span>
                  <span
                    class="text-xs font-mono text-text-secondary bg-background px-2 py-0.5 rounded"
                    >{{ p.sku }}</span
                  >
                </div>
                @if (p.nameEn) {
                  <div class="flex items-center justify-between px-6 py-3.5">
                    <span class="text-xs text-text-muted">{{
                      'PRODUCTS.NAME_EN' | translate
                    }}</span>
                    <span class="text-xs text-text-secondary">{{ p.nameEn }}</span>
                  </div>
                }
                <div class="flex items-center justify-between px-6 py-3.5">
                  <span class="text-xs text-text-muted">{{
                    'PRODUCTS.DISPLAY_ORDER' | translate
                  }}</span>
                  <span class="text-xs font-medium text-text-secondary">{{ p.displayOrder }}</span>
                </div>
                @if (p.updatedAt) {
                  <div class="flex items-center justify-between px-6 py-3.5">
                    <span class="text-xs text-text-muted">{{
                      'PRODUCTS.UPDATED_AT' | translate
                    }}</span>
                    <span class="text-xs text-text-secondary">{{ formatDate(p.updatedAt) }}</span>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }

    <app-confirm-modal
      [open]="showDeleteModal()"
      [title]="'PRODUCTS.DELETE_TITLE' | translate"
      [message]="'PRODUCTS.DELETE_WARNING' | translate"
      [confirmLabel]="'PRODUCTS.DELETE_CONFIRM' | translate"
      variant="danger"
      (confirm)="deleteProduct()"
      (cancel)="showDeleteModal.set(false)"
    />
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent", filePath: "src/app/features/products/product-detail/product-detail.component.ts", lineNumber: 488 });
})();
export {
  ProductDetailComponent
};
//# sourceMappingURL=chunk-YCMDSHAV.js.map
