import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-SOM4FACY.js";
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
  ɵɵpureFunction0,
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-7J6Y2ARR.js";

// src/app/features/products/product-form/product-form.component.ts
var _c0 = () => [0, 1, 2];
var _c1 = (a0, a1) => [a0, a1];
var _forTrack0 = ($index, $item) => $item.id;
function ProductFormComponent_Conditional_0_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275element(1, "div", 17);
    \u0275\u0275elementStart(2, "div", 18);
    \u0275\u0275element(3, "div", 16)(4, "div", 16);
    \u0275\u0275elementEnd()();
  }
}
function ProductFormComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275element(3, "div", 3);
    \u0275\u0275elementStart(4, "div", 4);
    \u0275\u0275element(5, "div", 5)(6, "div", 6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 7);
    \u0275\u0275element(8, "div", 8)(9, "div", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 10)(11, "div", 11);
    \u0275\u0275repeaterCreate(12, ProductFormComponent_Conditional_0_For_13_Template, 5, 0, "div", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 13)(15, "div", 12);
    \u0275\u0275element(16, "div", 14);
    \u0275\u0275elementStart(17, "div", 15);
    \u0275\u0275element(18, "div", 16)(19, "div", 16);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(12);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(0, _c0));
  }
}
function ProductFormComponent_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 74);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 75);
    \u0275\u0275text(4, "|");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 58);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r1.form.get("sku")) == null ? null : tmp_2_0.value);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r1.form.get("productType")) == null ? null : tmp_3_0.value);
  }
}
function ProductFormComponent_Conditional_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 76);
    \u0275\u0275element(1, "circle", 77)(2, "path", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 1, "PRODUCTS.SAVING"), " ");
  }
}
function ProductFormComponent_Conditional_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 79);
    \u0275\u0275element(1, "path", 80);
    \u0275\u0275elementEnd();
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275pipe(4, "translate");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEdit() ? \u0275\u0275pipeBind1(3, 1, "PRODUCTS.UPDATE") : \u0275\u0275pipeBind1(4, 3, "PRODUCTS.CREATE"), " ");
  }
}
function ProductFormComponent_Conditional_1_For_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r3 = ctx.$implicit;
    \u0275\u0275property("value", cat_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r3.nameFr);
  }
}
function ProductFormComponent_Conditional_1_Conditional_143_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div")(2, "label", 35);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 59)(6, "span", 81);
    \u0275\u0275text(7, "EUR");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 82);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div")(10, "label", 35);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 59)(14, "span", 81);
    \u0275\u0275text(15, "EUR");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 83);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 2, "PRODUCTS.MONTHLY_PRICE"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 4, "PRODUCTS.YEARLY_PRICE"));
  }
}
function ProductFormComponent_Conditional_1_Conditional_144_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "label", 35);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 59)(5, "span", 81);
    \u0275\u0275text(6, "EUR");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 84);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "PRODUCTS.UNIT_PRICE_EUR"));
  }
}
function ProductFormComponent_Conditional_1_Conditional_145_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "div", 31)(2, "h3", 32);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 85)(6, "div")(7, "label", 35);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 86);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div")(12, "label", 35);
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 87);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 3, "PRODUCTS.STOCK"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 5, "PRODUCTS.STOCK_QUANTITY"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 7, "PRODUCTS.STOCK_ALERT"));
  }
}
function ProductFormComponent_Conditional_1_Conditional_152_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx_r1.characteristics.length, " ", ctx_r1.characteristics.length > 1 ? "items" : "item");
  }
}
function ProductFormComponent_Conditional_1_Conditional_158_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 73)(1, "span", 58);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, "PRODUCTS.NO_CHARS"));
  }
}
function ProductFormComponent_Conditional_1_Conditional_159_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 88)(1, "div", 89)(2, "div", 90)(3, "div")(4, "label", 91);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(7, "input", 92);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div")(9, "label", 91);
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 93);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "label", 91);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div")(19, "label", 91);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 96);
    \u0275\u0275listener("click", function ProductFormComponent_Conditional_1_Conditional_159_For_2_Template_button_click_23_listener() {
      const \u0275$index_412_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeCharacteristic(\u0275$index_412_r5));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(24, "svg", 79);
    \u0275\u0275element(25, "path", 97);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const char_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("formGroup", ctx_r1.asFormGroup(char_r6));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(6, 5, "PRODUCTS.CHAR_KEY"), " (FR)");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(11, 7, "PRODUCTS.CHAR_KEY"), " (EN)");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(16, 9, "PRODUCTS.CHAR_VALUE"), " (FR)");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(21, 11, "PRODUCTS.CHAR_VALUE"), " (EN)");
  }
}
function ProductFormComponent_Conditional_1_Conditional_159_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56);
    \u0275\u0275repeaterCreate(1, ProductFormComponent_Conditional_1_Conditional_159_For_2_Template, 26, 13, "div", 88, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.characteristics.controls);
  }
}
function ProductFormComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "a", 19);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(4, "svg", 20);
    \u0275\u0275element(5, "path", 21);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 22)(7, "h1", 23);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(11, ProductFormComponent_Conditional_1_Conditional_11_Template, 7, 2, "div", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 25)(13, "a", 26);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 27);
    \u0275\u0275listener("click", function ProductFormComponent_Conditional_1_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275conditionalCreate(17, ProductFormComponent_Conditional_1_Conditional_17_Template, 5, 3)(18, ProductFormComponent_Conditional_1_Conditional_18_Template, 5, 5);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "form", 28);
    \u0275\u0275listener("ngSubmit", function ProductFormComponent_Conditional_1_Template_form_ngSubmit_19_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(20, "div", 10)(21, "div", 29)(22, "div", 30)(23, "div", 31)(24, "h3", 32);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 33)(28, "div", 34)(29, "div")(30, "label", 35);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(33, "input", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "div")(35, "label", 35);
    \u0275\u0275text(36);
    \u0275\u0275pipe(37, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(38, "input", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div")(40, "label", 35);
    \u0275\u0275text(41);
    \u0275\u0275pipe(42, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(43, "input", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div")(45, "label", 35);
    \u0275\u0275text(46);
    \u0275\u0275pipe(47, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(48, "input", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div")(50, "label", 35);
    \u0275\u0275text(51);
    \u0275\u0275pipe(52, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "select", 40)(54, "option", 41);
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(57, ProductFormComponent_Conditional_1_For_58_Template, 2, 2, "option", 42, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div")(60, "label", 35);
    \u0275\u0275text(61);
    \u0275\u0275pipe(62, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "select", 43)(64, "option", 44);
    \u0275\u0275text(65);
    \u0275\u0275pipe(66, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "option", 45);
    \u0275\u0275text(68);
    \u0275\u0275pipe(69, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "option", 46);
    \u0275\u0275text(71);
    \u0275\u0275pipe(72, "translate");
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(73, "div", 47)(74, "div", 31)(75, "h3", 32);
    \u0275\u0275text(76);
    \u0275\u0275pipe(77, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(78, "div", 48)(79, "div", 33)(80, "div", 49)(81, "span", 50);
    \u0275\u0275text(82, "FR");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 15)(84, "div")(85, "label", 35);
    \u0275\u0275text(86);
    \u0275\u0275pipe(87, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(88, "textarea", 51);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "div")(90, "label", 35);
    \u0275\u0275text(91);
    \u0275\u0275pipe(92, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(93, "input", 52);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(94, "div", 33)(95, "div", 49)(96, "span", 50);
    \u0275\u0275text(97, "EN");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(98, "div", 15)(99, "div")(100, "label", 35);
    \u0275\u0275text(101);
    \u0275\u0275pipe(102, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(103, "textarea", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(104, "div")(105, "label", 35);
    \u0275\u0275text(106);
    \u0275\u0275pipe(107, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(108, "input", 54);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(109, "div", 55)(110, "div", 30)(111, "div", 31)(112, "h3", 32);
    \u0275\u0275text(113);
    \u0275\u0275pipe(114, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(115, "div", 56)(116, "label", 57)(117, "span", 58);
    \u0275\u0275text(118);
    \u0275\u0275pipe(119, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(120, "div", 59);
    \u0275\u0275element(121, "input", 60)(122, "div", 61)(123, "div", 62);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(124, "label", 57)(125, "span", 58);
    \u0275\u0275text(126);
    \u0275\u0275pipe(127, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(128, "div", 59);
    \u0275\u0275element(129, "input", 63)(130, "div", 61)(131, "div", 62);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(132, "div", 64)(133, "label", 65);
    \u0275\u0275text(134);
    \u0275\u0275pipe(135, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275element(136, "input", 66);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(137, "div", 30)(138, "div", 31)(139, "h3", 32);
    \u0275\u0275text(140);
    \u0275\u0275pipe(141, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(142, "div", 33);
    \u0275\u0275conditionalCreate(143, ProductFormComponent_Conditional_1_Conditional_143_Template, 17, 6, "div", 67)(144, ProductFormComponent_Conditional_1_Conditional_144_Template, 8, 3, "div");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(145, ProductFormComponent_Conditional_1_Conditional_145_Template, 16, 9, "div", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(146, "div", 30)(147, "div", 68)(148, "div", 25)(149, "h3", 32);
    \u0275\u0275text(150);
    \u0275\u0275pipe(151, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(152, ProductFormComponent_Conditional_1_Conditional_152_Template, 2, 2, "span", 69);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(153, "button", 70);
    \u0275\u0275listener("click", function ProductFormComponent_Conditional_1_Template_button_click_153_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addCharacteristic());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(154, "svg", 71);
    \u0275\u0275element(155, "path", 72);
    \u0275\u0275elementEnd();
    \u0275\u0275text(156);
    \u0275\u0275pipe(157, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(158, ProductFormComponent_Conditional_1_Conditional_158_Template, 4, 3, "div", 73)(159, ProductFormComponent_Conditional_1_Conditional_159_Template, 3, 0, "div", 56);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_31_0;
    let tmp_32_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", ctx_r1.isEdit() ? \u0275\u0275pureFunction2(87, _c1, ctx_r1.basePath, ctx_r1.productId) : ctx_r1.basePath);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isEdit() ? \u0275\u0275pipeBind1(9, 35, "PRODUCTS.EDIT") : \u0275\u0275pipeBind1(10, 37, ctx_r1.newTitleKey), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.isEdit() ? 11 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", ctx_r1.isEdit() ? \u0275\u0275pureFunction2(90, _c1, ctx_r1.basePath, ctx_r1.productId) : ctx_r1.basePath);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(15, 39, "PRODUCTS.CANCEL"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.saving());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.saving() ? 17 : 18);
    \u0275\u0275advance(2);
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(26, 41, "PRODUCTS.BASIC_INFO"), " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(32, 43, "PRODUCTS.NAME_FR"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(37, 45, "PRODUCTS.NAME_EN"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(42, 47, "PRODUCTS.SLUG"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(47, 49, "PRODUCTS.SKU"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(52, 51, "PRODUCTS.CATEGORY"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(56, 53, "PRODUCTS.SELECT_CATEGORY"));
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.categories());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(62, 55, "PRODUCTS.PRODUCT_TYPE"));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(66, 57, "PRODUCTS.SAAS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(69, 59, "PRODUCTS.PHYSICAL"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(72, 61, "PRODUCTS.LICENSE"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(77, 63, "PRODUCTS.DESCRIPTION"), " ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(87, 65, "PRODUCTS.DESCRIPTION_FR"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(92, 67, "PRODUCTS.SHORT_DESC_FR"));
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(102, 69, "PRODUCTS.DESCRIPTION_EN"));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(107, 71, "PRODUCTS.SHORT_DESC_EN"));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(114, 73, "PRODUCTS.OPTIONS"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(119, 75, "PRODUCTS.AVAILABLE"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(127, 77, "PRODUCTS.FEATURED"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(135, 79, "PRODUCTS.DISPLAY_ORDER"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(141, 81, "PRODUCTS.PRICING"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(((tmp_31_0 = ctx_r1.form.get("productType")) == null ? null : tmp_31_0.value) === "SAAS" ? 143 : 144);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_32_0 = ctx_r1.form.get("productType")) == null ? null : tmp_32_0.value) === "PHYSICAL" ? 145 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(151, 83, "PRODUCTS.CHARACTERISTICS"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.characteristics.length > 0 ? 152 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(157, 85, "PRODUCTS.ADD_CHAR"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.characteristics.length === 0 ? 158 : 159);
  }
}
var ProductFormComponent = class _ProductFormComponent {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  api = inject(ApiService);
  notifications = inject(NotificationService);
  translate = inject(TranslateService);
  isEdit = signal(false, ...ngDevMode ? [{ debugName: "isEdit" }] : []);
  loadingProduct = signal(false, ...ngDevMode ? [{ debugName: "loadingProduct" }] : []);
  saving = signal(false, ...ngDevMode ? [{ debugName: "saving" }] : []);
  categories = signal([], ...ngDevMode ? [{ debugName: "categories" }] : []);
  productId = "";
  basePath = "/products";
  newTitleKey = "PRODUCTS.NEW_PRODUCT";
  form = this.fb.group({
    nameFr: ["", Validators.required],
    nameEn: ["", Validators.required],
    slug: ["", Validators.required],
    sku: ["", Validators.required],
    categoryId: ["", Validators.required],
    productType: ["SAAS", Validators.required],
    descriptionFr: ["", Validators.required],
    descriptionEn: ["", Validators.required],
    shortDescriptionFr: [""],
    shortDescriptionEn: [""],
    priceMonthly: [null],
    priceYearly: [null],
    priceUnit: [null],
    isAvailable: [true],
    isFeatured: [false],
    displayOrder: [0],
    stockQuantity: [null],
    stockAlertThreshold: [10],
    characteristics: this.fb.array([])
  });
  get characteristics() {
    return this.form.get("characteristics");
  }
  asFormGroup(control) {
    return control;
  }
  addCharacteristic() {
    this.characteristics.push(this.fb.group({
      keyFr: [""],
      keyEn: [""],
      valueFr: [""],
      valueEn: [""]
    }));
  }
  removeCharacteristic(index) {
    this.characteristics.removeAt(index);
  }
  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data["basePath"])
      this.basePath = data["basePath"];
    if (data["newTitleKey"])
      this.newTitleKey = data["newTitleKey"];
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEdit.set(true);
      this.productId = id;
      this.loadProduct(id);
    }
  }
  loadCategories() {
    this.api.get("admin/catalog/categories").subscribe({
      next: (res) => {
        const cats = Array.isArray(res) ? res : res?.data || res || [];
        this.categories.set(cats);
      }
    });
  }
  loadProduct(id) {
    this.loadingProduct.set(true);
    this.api.get(`admin/catalog/products/${id}`).subscribe({
      next: (p) => {
        this.form.patchValue({
          nameFr: p.nameFr,
          nameEn: p.nameEn,
          slug: p.slug,
          sku: p.sku,
          categoryId: p.categoryId,
          productType: p.productType?.toUpperCase(),
          descriptionFr: p.descriptionFr,
          descriptionEn: p.descriptionEn,
          shortDescriptionFr: p.shortDescriptionFr ?? "",
          shortDescriptionEn: p.shortDescriptionEn ?? "",
          priceMonthly: p.priceMonthly ?? null,
          priceYearly: p.priceYearly ?? null,
          priceUnit: p.priceUnit ?? null,
          isAvailable: p.isAvailable,
          isFeatured: p.isFeatured,
          displayOrder: p.displayOrder ?? 0,
          stockQuantity: p.stockQuantity ?? null,
          stockAlertThreshold: p.stockAlertThreshold
        });
        this.characteristics.clear();
        if (p.characteristics?.length) {
          for (const char of p.characteristics) {
            this.characteristics.push(this.fb.group({
              keyFr: [char.keyFr || ""],
              keyEn: [char.keyEn || ""],
              valueFr: [char.valueFr || ""],
              valueEn: [char.valueEn || ""]
            }));
          }
        }
        this.loadingProduct.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("PRODUCTS.NOT_FOUND"));
        this.router.navigate([this.basePath]);
      }
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const data = this.form.value;
    const request = this.isEdit() ? this.api.patch(`admin/catalog/products/${this.productId}`, data) : this.api.post("admin/catalog/products", data);
    request.subscribe({
      next: (product) => {
        this.notifications.success(this.isEdit() ? this.translate.instant("PRODUCTS.UPDATED") : this.translate.instant("PRODUCTS.CREATED"));
        this.router.navigate([this.basePath, product.id || this.productId]);
      },
      error: (err) => {
        this.saving.set(false);
        this.notifications.error(err.error?.message || this.translate.instant("PRODUCTS.SAVE_ERROR"));
      }
    });
  }
  static \u0275fac = function ProductFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductFormComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductFormComponent, selectors: [["app-product-form"]], decls: 2, vars: 1, consts: [[2, "animation", "fadeInUp 0.45s ease-out both"], [1, "flex", "items-center", "justify-between", "mb-6"], [1, "flex", "items-center", "gap-3"], [1, "w-9", "h-9", "rounded-full", "animate-pulse", "bg-gray-100"], [1, "flex", "flex-col", "gap-2"], [1, "h-6", "w-48", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-4", "w-64", "animate-pulse", "rounded", "bg-gray-100"], [1, "flex", "gap-2"], [1, "h-9", "w-20", "animate-pulse", "rounded-lg", "bg-gray-100"], [1, "h-9", "w-28", "animate-pulse", "rounded-lg", "bg-gray-100"], [1, "grid", "grid-cols-1", "lg:grid-cols-3", "gap-5"], [1, "lg:col-span-2", "space-y-5"], [1, "rounded-xl", "border", "border-border-light", "bg-surface", "p-6"], [1, "space-y-5"], [1, "h-5", "w-28", "animate-pulse", "rounded", "bg-gray-100", "mb-4"], [1, "space-y-3"], [1, "h-10", "animate-pulse", "rounded-lg", "bg-gray-100"], [1, "h-5", "w-32", "animate-pulse", "rounded", "bg-gray-100", "mb-5"], [1, "grid", "grid-cols-2", "gap-4"], [1, "flex", "h-9", "w-9", "shrink-0", "items-center", "justify-center", "rounded-full", "bg-background", "transition-colors", "hover:bg-primary-light", 2, "text-decoration", "none", "color", "#0a0a0a", "border", "none", 3, "routerLink"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-[18px]", "h-[18px]"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M15.75 19.5L8.25 12l7.5-7.5"], [1, "min-w-0"], [1, "text-xl", "font-bold", "text-text-primary", "truncate", "!m-0"], [1, "flex", "items-center", "gap-1.5", "mt-0.5"], [1, "flex", "items-center", "gap-2"], [1, "inline-flex", "items-center", "px-4", "py-2", "border", "border-border-light", "text-text-muted", "text-sm", "font-medium", "rounded-lg", "hover:bg-background", "transition-colors", 2, "text-decoration", "none", 3, "routerLink"], [1, "inline-flex", "items-center", "gap-1.5", "px-4", "py-2", "bg-primary", "text-white", "text-sm", "font-medium", "rounded-lg", "hover:bg-primary-hover", "transition-colors", "disabled:opacity-60", "border-0", "cursor-pointer", 3, "click", "disabled"], [1, "space-y-5", 2, "animation", "fadeInUp 0.45s ease-out 0.08s both", 3, "ngSubmit", "formGroup"], [1, "lg:col-span-2", "flex", "flex-col", "gap-5"], [1, "rounded-xl", "border", "border-border-light", "bg-surface", "shadow-sm", "overflow-hidden"], [1, "px-6", "py-4", "border-b", "border-border-light"], [1, "text-sm", "font-semibold", "text-text-primary", "!m-0"], [1, "px-6", "py-5"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-x-5", "gap-y-4"], [1, "block", "text-xs", "font-medium", "text-text-muted", "mb-1.5"], ["formControlName", "nameFr", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "placeholder:text-text-muted/40", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["formControlName", "nameEn", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "placeholder:text-text-muted/40", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["formControlName", "slug", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "font-mono", "placeholder:text-text-muted/40", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["formControlName", "sku", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "font-mono", "placeholder:text-text-muted/40", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["formControlName", "categoryId", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["value", ""], [3, "value"], ["formControlName", "productType", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["value", "SAAS"], ["value", "PHYSICAL"], ["value", "LICENSE"], [1, "flex-1", "rounded-xl", "border", "border-border-light", "bg-surface", "shadow-sm", "overflow-hidden", "flex", "flex-col"], [1, "flex-1", "grid", "grid-cols-1", "lg:grid-cols-2", "divide-y", "lg:divide-y-0", "lg:divide-x", "divide-border-light"], [1, "flex", "items-center", "gap-2", "mb-3"], [1, "inline-flex", "items-center", "rounded", "bg-background", "border", "border-border-light", "px-2", "py-0.5", "text-[10px]", "font-semibold", "text-text-muted", "uppercase", "tracking-wider"], ["formControlName", "descriptionFr", "rows", "3", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "placeholder:text-text-muted/40", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors", "resize-none", "leading-relaxed"], ["formControlName", "shortDescriptionFr", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "placeholder:text-text-muted/40", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["formControlName", "descriptionEn", "rows", "3", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "placeholder:text-text-muted/40", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors", "resize-none", "leading-relaxed"], ["formControlName", "shortDescriptionEn", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "placeholder:text-text-muted/40", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], [1, "flex", "flex-col", "gap-5"], [1, "divide-y", "divide-border-light"], [1, "flex", "items-center", "justify-between", "px-6", "py-3.5", "cursor-pointer"], [1, "text-xs", "text-text-muted"], [1, "relative"], ["type", "checkbox", "formControlName", "isAvailable", 1, "sr-only", "peer"], [1, "w-9", "h-5", "bg-border-light", "rounded-full", "peer-checked:bg-primary", "transition-colors"], [1, "absolute", "left-0.5", "top-0.5", "w-4", "h-4", "bg-white", "rounded-full", "shadow-sm", "transition-transform", "peer-checked:translate-x-4"], ["type", "checkbox", "formControlName", "isFeatured", 1, "sr-only", "peer"], [1, "px-6", "py-3.5"], [1, "block", "text-xs", "text-text-muted", "mb-1.5"], ["type", "number", "formControlName", "displayOrder", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "font-mono", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], [1, "space-y-4"], [1, "px-6", "py-4", "border-b", "border-border-light", "flex", "items-center", "justify-between"], [1, "text-[11px]", "text-text-muted"], ["type", "button", 1, "inline-flex", "items-center", "gap-1", "px-2.5", "py-1", "text-xs", "font-medium", "text-primary", "hover:bg-primary-light", "rounded-md", "transition-colors", "bg-transparent", "border-0", "cursor-pointer", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3.5", "h-3.5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4.5v15m7.5-7.5h-15"], [1, "flex", "flex-col", "items-center", "justify-center", "gap-2", "py-8"], [1, "text-xs", "text-text-muted", "font-mono"], [1, "text-text-muted/30", "text-xs"], ["fill", "none", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z", 1, "opacity-75"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M4.5 12.75l6 6 9-13.5"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-xs", "text-text-muted"], ["type", "number", "step", "0.01", "formControlName", "priceMonthly", 1, "w-full", "pl-11", "pr-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "font-mono", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["type", "number", "step", "0.01", "formControlName", "priceYearly", 1, "w-full", "pl-11", "pr-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "font-mono", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["type", "number", "step", "0.01", "formControlName", "priceUnit", 1, "w-full", "pl-11", "pr-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "font-mono", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], [1, "px-6", "py-5", "space-y-4"], ["type", "number", "formControlName", "stockQuantity", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "font-mono", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["type", "number", "formControlName", "stockAlertThreshold", 1, "w-full", "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "font-mono", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], [1, "px-6", "py-4", 3, "formGroup"], [1, "flex", "items-start", "gap-3"], [1, "flex-1", "grid", "grid-cols-2", "lg:grid-cols-4", "gap-x-4", "gap-y-3"], [1, "block", "text-xs", "font-medium", "text-text-muted", "mb-1"], ["formControlName", "keyFr", 1, "w-full", "px-3", "py-1.5", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["formControlName", "keyEn", 1, "w-full", "px-3", "py-1.5", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["formControlName", "valueFr", 1, "w-full", "px-3", "py-1.5", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["formControlName", "valueEn", 1, "w-full", "px-3", "py-1.5", "rounded-lg", "border", "border-border-light", "bg-white", "text-sm", "text-text-primary", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-colors"], ["type", "button", 1, "mt-5", "flex", "h-8", "w-8", "shrink-0", "items-center", "justify-center", "rounded-lg", "text-text-muted", "hover:text-error", "hover:bg-error-light", "transition-colors", "bg-transparent", "border-0", "cursor-pointer", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M6 18L18 6M6 6l12 12"]], template: function ProductFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275conditionalCreate(0, ProductFormComponent_Conditional_0_Template, 20, 1, "div", 0)(1, ProductFormComponent_Conditional_1_Template, 160, 93, "div", 0);
    }
    if (rf & 2) {
      \u0275\u0275conditional(ctx.loadingProduct() ? 0 : 1);
    }
  }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, CheckboxControlValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, TranslateModule, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductFormComponent, [{
    type: Component,
    args: [{
      selector: "app-product-form",
      standalone: true,
      imports: [ReactiveFormsModule, RouterLink, TranslateModule],
      template: `
    @if (loadingProduct()) {
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
            <div class="h-9 w-28 animate-pulse rounded-lg bg-gray-100"></div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div class="lg:col-span-2 space-y-5">
            @for (i of [0, 1, 2]; track i) {
              <div class="rounded-xl border border-border-light bg-surface p-6">
                <div class="h-5 w-32 animate-pulse rounded bg-gray-100 mb-5"></div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="h-10 animate-pulse rounded-lg bg-gray-100"></div>
                  <div class="h-10 animate-pulse rounded-lg bg-gray-100"></div>
                </div>
              </div>
            }
          </div>
          <div class="space-y-5">
            <div class="rounded-xl border border-border-light bg-surface p-6">
              <div class="h-5 w-28 animate-pulse rounded bg-gray-100 mb-4"></div>
              <div class="space-y-3">
                <div class="h-10 animate-pulse rounded-lg bg-gray-100"></div>
                <div class="h-10 animate-pulse rounded-lg bg-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div style="animation: fadeInUp 0.45s ease-out both">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <a
              [routerLink]="isEdit() ? [basePath, productId] : basePath"
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
              <h1 class="text-xl font-bold text-text-primary truncate !m-0">
                {{ isEdit() ? ('PRODUCTS.EDIT' | translate) : (newTitleKey | translate) }}
              </h1>
              @if (isEdit()) {
                <div class="flex items-center gap-1.5 mt-0.5">
                  <span class="text-xs text-text-muted font-mono">{{
                    form.get('sku')?.value
                  }}</span>
                  <span class="text-text-muted/30 text-xs">|</span>
                  <span class="text-xs text-text-muted">{{ form.get('productType')?.value }}</span>
                </div>
              }
            </div>
          </div>
          <div class="flex items-center gap-2">
            <a
              [routerLink]="isEdit() ? [basePath, productId] : basePath"
              class="inline-flex items-center px-4 py-2 border border-border-light text-text-muted text-sm font-medium rounded-lg hover:bg-background transition-colors"
              style="text-decoration: none"
            >
              {{ 'PRODUCTS.CANCEL' | translate }}
            </a>
            <button
              (click)="onSubmit()"
              [disabled]="saving()"
              class="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-60 border-0 cursor-pointer"
            >
              @if (saving()) {
                <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
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
                {{ 'PRODUCTS.SAVING' | translate }}
              } @else {
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                {{ isEdit() ? ('PRODUCTS.UPDATE' | translate) : ('PRODUCTS.CREATE' | translate) }}
              }
            </button>
          </div>
        </div>

        <!-- Content -->
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="space-y-5"
          style="animation: fadeInUp 0.45s ease-out 0.08s both"
        >
          <!-- Main 2-column layout -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <!-- Left column: Basic Info + Description -->
            <div class="lg:col-span-2 flex flex-col gap-5">
              <!-- Basic Info -->
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.BASIC_INFO' | translate }}
                  </h3>
                </div>
                <div class="px-6 py-5">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.NAME_FR' | translate
                      }}</label>
                      <input
                        formControlName="nameFr"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.NAME_EN' | translate
                      }}</label>
                      <input
                        formControlName="nameEn"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.SLUG' | translate
                      }}</label>
                      <input
                        formControlName="slug"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.SKU' | translate
                      }}</label>
                      <input
                        formControlName="sku"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.CATEGORY' | translate
                      }}</label>
                      <select
                        formControlName="categoryId"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="">{{ 'PRODUCTS.SELECT_CATEGORY' | translate }}</option>
                        @for (cat of categories(); track cat.id) {
                          <option [value]="cat.id">{{ cat.nameFr }}</option>
                        }
                      </select>
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.PRODUCT_TYPE' | translate
                      }}</label>
                      <select
                        formControlName="productType"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      >
                        <option value="SAAS">{{ 'PRODUCTS.SAAS' | translate }}</option>
                        <option value="PHYSICAL">{{ 'PRODUCTS.PHYSICAL' | translate }}</option>
                        <option value="LICENSE">{{ 'PRODUCTS.LICENSE' | translate }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div
                class="flex-1 rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden flex flex-col"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.DESCRIPTION' | translate }}
                  </h3>
                </div>
                <div
                  class="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border-light"
                >
                  <div class="px-6 py-5">
                    <div class="flex items-center gap-2 mb-3">
                      <span
                        class="inline-flex items-center rounded bg-background border border-border-light px-2 py-0.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider"
                        >FR</span
                      >
                    </div>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.DESCRIPTION_FR' | translate
                        }}</label>
                        <textarea
                          formControlName="descriptionFr"
                          rows="3"
                          class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none leading-relaxed"
                        ></textarea>
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.SHORT_DESC_FR' | translate
                        }}</label>
                        <input
                          formControlName="shortDescriptionFr"
                          class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="px-6 py-5">
                    <div class="flex items-center gap-2 mb-3">
                      <span
                        class="inline-flex items-center rounded bg-background border border-border-light px-2 py-0.5 text-[10px] font-semibold text-text-muted uppercase tracking-wider"
                        >EN</span
                      >
                    </div>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.DESCRIPTION_EN' | translate
                        }}</label>
                        <textarea
                          formControlName="descriptionEn"
                          rows="3"
                          class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none leading-relaxed"
                        ></textarea>
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.SHORT_DESC_EN' | translate
                        }}</label>
                        <input
                          formControlName="shortDescriptionEn"
                          class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right column: Options + Pricing + Stock -->
            <div class="flex flex-col gap-5">
              <!-- Options -->
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.OPTIONS' | translate }}
                  </h3>
                </div>
                <div class="divide-y divide-border-light">
                  <label class="flex items-center justify-between px-6 py-3.5 cursor-pointer">
                    <span class="text-xs text-text-muted">{{
                      'PRODUCTS.AVAILABLE' | translate
                    }}</span>
                    <div class="relative">
                      <input type="checkbox" formControlName="isAvailable" class="sr-only peer" />
                      <div
                        class="w-9 h-5 bg-border-light rounded-full peer-checked:bg-primary transition-colors"
                      ></div>
                      <div
                        class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4"
                      ></div>
                    </div>
                  </label>
                  <label class="flex items-center justify-between px-6 py-3.5 cursor-pointer">
                    <span class="text-xs text-text-muted">{{
                      'PRODUCTS.FEATURED' | translate
                    }}</span>
                    <div class="relative">
                      <input type="checkbox" formControlName="isFeatured" class="sr-only peer" />
                      <div
                        class="w-9 h-5 bg-border-light rounded-full peer-checked:bg-primary transition-colors"
                      ></div>
                      <div
                        class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-4"
                      ></div>
                    </div>
                  </label>
                  <div class="px-6 py-3.5">
                    <label class="block text-xs text-text-muted mb-1.5">{{
                      'PRODUCTS.DISPLAY_ORDER' | translate
                    }}</label>
                    <input
                      type="number"
                      formControlName="displayOrder"
                      class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </div>

              <!-- Pricing -->
              <div
                class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
              >
                <div class="px-6 py-4 border-b border-border-light">
                  <h3 class="text-sm font-semibold text-text-primary !m-0">
                    {{ 'PRODUCTS.PRICING' | translate }}
                  </h3>
                </div>
                <div class="px-6 py-5">
                  @if (form.get('productType')?.value === 'SAAS') {
                    <div class="space-y-4">
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.MONTHLY_PRICE' | translate
                        }}</label>
                        <div class="relative">
                          <span
                            class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted"
                            >EUR</span
                          >
                          <input
                            type="number"
                            step="0.01"
                            formControlName="priceMonthly"
                            class="w-full pl-11 pr-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                          'PRODUCTS.YEARLY_PRICE' | translate
                        }}</label>
                        <div class="relative">
                          <span
                            class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted"
                            >EUR</span
                          >
                          <input
                            type="number"
                            step="0.01"
                            formControlName="priceYearly"
                            class="w-full pl-11 pr-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  } @else {
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.UNIT_PRICE_EUR' | translate
                      }}</label>
                      <div class="relative">
                        <span
                          class="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted"
                          >EUR</span
                        >
                        <input
                          type="number"
                          step="0.01"
                          formControlName="priceUnit"
                          class="w-full pl-11 pr-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  }
                </div>
              </div>

              <!-- Stock (physical only) -->
              @if (form.get('productType')?.value === 'PHYSICAL') {
                <div
                  class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
                >
                  <div class="px-6 py-4 border-b border-border-light">
                    <h3 class="text-sm font-semibold text-text-primary !m-0">
                      {{ 'PRODUCTS.STOCK' | translate }}
                    </h3>
                  </div>
                  <div class="px-6 py-5 space-y-4">
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.STOCK_QUANTITY' | translate
                      }}</label>
                      <input
                        type="number"
                        formControlName="stockQuantity"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-text-muted mb-1.5">{{
                        'PRODUCTS.STOCK_ALERT' | translate
                      }}</label>
                      <input
                        type="number"
                        formControlName="stockAlertThreshold"
                        class="w-full px-3 py-2 rounded-lg border border-border-light bg-white text-sm text-text-primary font-mono focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Row 3: Characteristics (full-width) -->
          <div class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden">
            <div class="px-6 py-4 border-b border-border-light flex items-center justify-between">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-semibold text-text-primary !m-0">
                  {{ 'PRODUCTS.CHARACTERISTICS' | translate }}
                </h3>
                @if (characteristics.length > 0) {
                  <span class="text-[11px] text-text-muted"
                    >{{ characteristics.length }}
                    {{ characteristics.length > 1 ? 'items' : 'item' }}</span
                  >
                }
              </div>
              <button
                type="button"
                (click)="addCharacteristic()"
                class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary-light rounded-md transition-colors bg-transparent border-0 cursor-pointer"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                {{ 'PRODUCTS.ADD_CHAR' | translate }}
              </button>
            </div>
            @if (characteristics.length === 0) {
              <div class="flex flex-col items-center justify-center gap-2 py-8">
                <span class="text-xs text-text-muted">{{ 'PRODUCTS.NO_CHARS' | translate }}</span>
              </div>
            } @else {
              <div class="divide-y divide-border-light">
                @for (char of characteristics.controls; track $index; let i = $index) {
                  <div class="px-6 py-4" [formGroup]="asFormGroup(char)">
                    <div class="flex items-start gap-3">
                      <div class="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
                        <div>
                          <label class="block text-xs font-medium text-text-muted mb-1"
                            >{{ 'PRODUCTS.CHAR_KEY' | translate }} (FR)</label
                          >
                          <input
                            formControlName="keyFr"
                            class="w-full px-3 py-1.5 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label class="block text-xs font-medium text-text-muted mb-1"
                            >{{ 'PRODUCTS.CHAR_KEY' | translate }} (EN)</label
                          >
                          <input
                            formControlName="keyEn"
                            class="w-full px-3 py-1.5 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label class="block text-xs font-medium text-text-muted mb-1"
                            >{{ 'PRODUCTS.CHAR_VALUE' | translate }} (FR)</label
                          >
                          <input
                            formControlName="valueFr"
                            class="w-full px-3 py-1.5 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label class="block text-xs font-medium text-text-muted mb-1"
                            >{{ 'PRODUCTS.CHAR_VALUE' | translate }} (EN)</label
                          >
                          <input
                            formControlName="valueEn"
                            class="w-full px-3 py-1.5 rounded-lg border border-border-light bg-white text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        (click)="removeCharacteristic(i)"
                        class="mt-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted hover:text-error hover:bg-error-light transition-colors bg-transparent border-0 cursor-pointer"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </form>
      </div>
    }
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductFormComponent, { className: "ProductFormComponent", filePath: "src/app/features/products/product-form/product-form.component.ts", lineNumber: 556 });
})();
export {
  ProductFormComponent
};
//# sourceMappingURL=chunk-5RM5TXMF.js.map
