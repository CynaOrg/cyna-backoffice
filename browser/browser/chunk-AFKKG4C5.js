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
  ɵɵpureFunction2,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7J6Y2ARR.js";

// src/app/features/products/product-list/product-list.component.ts
var _c0 = (a0, a1) => [a0, a1];
var _c1 = (a0, a1) => [a0, a1, "edit"];
var _forTrack0 = ($index, $item) => $item.id;
function ProductListComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 6);
  }
}
function ProductListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.totalCount());
  }
}
function ProductListComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 6);
  }
}
function ProductListComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.availableCount());
  }
}
function ProductListComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 6);
  }
}
function ProductListComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.unavailableCount());
  }
}
function ProductListComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 6);
  }
}
function ProductListComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.featuredCount());
  }
}
function ProductListComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "select", 27);
    \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_Conditional_45_Template_select_ngModelChange_0_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r0.typeFilter, $event) || (ctx_r0.typeFilter = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function ProductListComponent_Conditional_45_Template_select_change_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.loadProducts());
    });
    \u0275\u0275elementStart(1, "option", 28);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "option", 29);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "option", 30);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "option", 31);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275twoWayProperty("ngModel", ctx_r0.typeFilter);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 5, "PRODUCTS.ALL_TYPES"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 7, "PRODUCTS.SAAS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 9, "PRODUCTS.PHYSICAL"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 11, "PRODUCTS.LICENSE"));
  }
}
function ProductListComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 22);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "path", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", ctx_r0.newProductLink);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 2, ctx_r0.newProductLabelKey), " ");
  }
}
function ProductListComponent_Conditional_48_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "div", 35);
    \u0275\u0275elementStart(2, "div", 36);
    \u0275\u0275element(3, "div", 37)(4, "div", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "div", 39)(6, "div", 40)(7, "div", 41)(8, "div", 41);
    \u0275\u0275elementEnd();
  }
}
function ProductListComponent_Conditional_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24);
    \u0275\u0275repeaterCreate(1, ProductListComponent_Conditional_48_For_2_Template, 9, 0, "div", 34, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r0.skeletonRows);
  }
}
function ProductListComponent_Conditional_49_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 47);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 32);
    \u0275\u0275element(2, "path", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", ctx_r0.newProductLink);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(4, 2, ctx_r0.newProductLabelKey), " ");
  }
}
function ProductListComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "div", 42);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 43);
    \u0275\u0275element(3, "path", 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div", 44)(5, "span", 45);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 46);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(11, ProductListComponent_Conditional_49_Conditional_11_Template, 5, 4, "a", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 3, "PRODUCTS.NO_PRODUCTS"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 5, "PRODUCTS.NO_PRODUCTS_DESC"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.auth.isSuperAdmin() ? 11 : -1);
  }
}
function ProductListComponent_Conditional_50_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 1, "PRODUCTS.TYPE"), " ");
  }
}
function ProductListComponent_Conditional_50_For_22_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 57);
  }
  if (rf & 2) {
    const product_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", product_r3.images[0].imageUrl, \u0275\u0275sanitizeUrl)("alt", product_r3.nameFr);
  }
}
function ProductListComponent_Conditional_50_For_22_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 58);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 70);
    \u0275\u0275element(2, "path", 71);
    \u0275\u0275elementEnd()();
  }
}
function ProductListComponent_Conditional_50_For_22_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 72);
    \u0275\u0275element(2, "span", 73);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const product_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getTypeBadgeClasses(product_r3.productType));
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r0.getTypeDotClass(product_r3.productType));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", product_r3.productType, " ");
  }
}
function ProductListComponent_Conditional_50_For_22_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 67);
    \u0275\u0275pipe(1, "translate");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 32);
    \u0275\u0275element(3, "path", 74);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "button", 75);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275listener("click", function ProductListComponent_Conditional_50_For_22_Conditional_28_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const product_r3 = \u0275\u0275nextContext().$implicit;
      const ctx_r0 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r0.confirmDelete(product_r3));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 32);
    \u0275\u0275element(7, "path", 76);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const product_r3 = \u0275\u0275nextContext().$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction2(7, _c1, ctx_r0.basePath, product_r3.id))("title", \u0275\u0275pipeBind1(1, 3, "PRODUCTS.EDIT"));
    \u0275\u0275advance(4);
    \u0275\u0275property("title", \u0275\u0275pipeBind1(5, 5, "PRODUCTS.DELETE"));
  }
}
function ProductListComponent_Conditional_50_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 53)(1, "td", 55)(2, "a", 56);
    \u0275\u0275conditionalCreate(3, ProductListComponent_Conditional_50_For_22_Conditional_3_Template, 1, 2, "img", 57)(4, ProductListComponent_Conditional_50_For_22_Conditional_4_Template, 3, 0, "div", 58);
    \u0275\u0275elementStart(5, "div", 59)(6, "span", 60);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 61);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "td", 55)(11, "span", 62);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(13, ProductListComponent_Conditional_50_For_22_Conditional_13_Template, 4, 5, "td", 55);
    \u0275\u0275elementStart(14, "td", 55)(15, "span", 63);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td", 55);
    \u0275\u0275element(18, "app-status-badge", 64);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275pipe(20, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 65)(22, "div", 66)(23, "a", 67);
    \u0275\u0275pipe(24, "translate");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(25, "svg", 32);
    \u0275\u0275element(26, "path", 68)(27, "path", 69);
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(28, ProductListComponent_Conditional_50_For_22_Conditional_28_Template, 8, 10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction2(18, _c0, ctx_r0.basePath, product_r3.id));
    \u0275\u0275advance();
    \u0275\u0275conditional((product_r3.images == null ? null : product_r3.images[0] == null ? null : product_r3.images[0].imageUrl) ? 3 : 4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", product_r3.nameFr, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r3.nameEn);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", product_r3.sku, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!ctx_r0.fixedType ? 13 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.getPrice(product_r3));
    \u0275\u0275advance(2);
    \u0275\u0275property("status", product_r3.isAvailable ? "active" : "inactive")("label", product_r3.isAvailable ? \u0275\u0275pipeBind1(19, 12, "PRODUCTS.AVAILABLE") : \u0275\u0275pipeBind1(20, 14, "PRODUCTS.UNAVAILABLE"));
    \u0275\u0275advance(5);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction2(21, _c0, ctx_r0.basePath, product_r3.id))("title", \u0275\u0275pipeBind1(24, 16, "PRODUCTS.VIEW"));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r0.auth.isSuperAdmin() ? 28 : -1);
  }
}
function ProductListComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 48)(1, "table", 49)(2, "thead")(3, "tr", 50)(4, "th", 51);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 51);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275conditionalCreate(10, ProductListComponent_Conditional_50_Conditional_10_Template, 3, 3, "th", 51);
    \u0275\u0275elementStart(11, "th", 51);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 51);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "th", 52);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "translate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "tbody", 24);
    \u0275\u0275repeaterCreate(21, ProductListComponent_Conditional_50_For_22_Template, 29, 24, "tr", 53, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 54)(24, "span", 46);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 8, "PRODUCTS.PRODUCT"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(9, 10, "PRODUCTS.SKU"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!ctx_r0.fixedType ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(13, 12, "PRODUCTS.PRICE"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(16, 14, "PRODUCTS.STATUS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(19, 16, "PRODUCTS.ACTIONS"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r0.filteredProducts());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r0.filteredProducts().length, " ", \u0275\u0275pipeBind1(26, 18, "PRODUCTS.RESULTS"), " ");
  }
}
var ProductListComponent = class _ProductListComponent {
  api = inject(ApiService);
  auth = inject(AdminAuthService);
  notifications = inject(NotificationService);
  translate = inject(TranslateService);
  route = inject(ActivatedRoute);
  products = signal([], ...ngDevMode ? [{ debugName: "products" }] : []);
  loading = signal(true, ...ngDevMode ? [{ debugName: "loading" }] : []);
  searchQuery = "";
  typeFilter = "";
  fixedType = "";
  showDeleteModal = signal(false, ...ngDevMode ? [{ debugName: "showDeleteModal" }] : []);
  productToDelete = signal(null, ...ngDevMode ? [{ debugName: "productToDelete" }] : []);
  titleKey = "PRODUCTS.TITLE";
  subtitleKey = "PRODUCTS.SUBTITLE";
  newProductLabelKey = "PRODUCTS.NEW_PRODUCT";
  newProductLink = "/products/new";
  basePath = "/products";
  skeletonRows = Array.from({ length: 6 }, (_, i) => i);
  totalCount = computed(() => this.products().length, ...ngDevMode ? [{ debugName: "totalCount" }] : []);
  availableCount = computed(() => this.products().filter((p) => p.isAvailable).length, ...ngDevMode ? [{ debugName: "availableCount" }] : []);
  unavailableCount = computed(() => this.products().filter((p) => !p.isAvailable).length, ...ngDevMode ? [{ debugName: "unavailableCount" }] : []);
  featuredCount = computed(() => this.products().filter((p) => p.isFeatured).length, ...ngDevMode ? [{ debugName: "featuredCount" }] : []);
  searchTimeout;
  ngOnInit() {
    const data = this.route.snapshot.data;
    if (data["productType"]) {
      this.fixedType = data["productType"];
      this.typeFilter = this.fixedType;
    }
    if (data["titleKey"])
      this.titleKey = data["titleKey"];
    if (data["subtitleKey"])
      this.subtitleKey = data["subtitleKey"];
    if (data["newLabelKey"])
      this.newProductLabelKey = data["newLabelKey"];
    if (data["basePath"]) {
      this.basePath = data["basePath"];
      this.newProductLink = data["basePath"] + "/new";
    }
    this.loadProducts();
  }
  loadProducts() {
    this.loading.set(true);
    const params = {};
    if (this.typeFilter)
      params["productType"] = this.typeFilter;
    this.api.get("admin/catalog/products", params).subscribe({
      next: (res) => {
        const products = Array.isArray(res) ? res : res?.data || [];
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("PRODUCTS.LOAD_ERROR"));
        this.loading.set(false);
      }
    });
  }
  filteredProducts() {
    const query = this.searchQuery.toLowerCase();
    if (!query)
      return this.products();
    return this.products().filter((p) => p.nameFr.toLowerCase().includes(query) || p.nameEn.toLowerCase().includes(query) || p.sku.toLowerCase().includes(query));
  }
  onSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.loadProducts();
    }, 300);
  }
  getPrice(product) {
    const fmt = (v) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(v);
    if (product.priceMonthly)
      return `${fmt(product.priceMonthly)}/mo`;
    if (product.priceYearly)
      return `${fmt(product.priceYearly)}/yr`;
    if (product.priceUnit)
      return fmt(product.priceUnit);
    return this.translate.instant("PRODUCTS.NA");
  }
  getTypeBadgeClasses(type) {
    switch (type?.toLowerCase()) {
      case "saas":
        return "bg-info-light text-info";
      case "physical":
        return "bg-warning-light text-warning";
      case "license":
        return "bg-primary-light text-primary";
      default:
        return "bg-gray-100 text-text-secondary";
    }
  }
  getTypeDotClass(type) {
    switch (type?.toLowerCase()) {
      case "saas":
        return "bg-info";
      case "physical":
        return "bg-warning";
      case "license":
        return "bg-primary";
      default:
        return "bg-text-muted";
    }
  }
  confirmDelete(product) {
    this.productToDelete.set(product);
    this.showDeleteModal.set(true);
  }
  deleteProduct() {
    const product = this.productToDelete();
    if (!product)
      return;
    this.api.delete(`admin/catalog/products/${product.id}`).subscribe({
      next: () => {
        this.notifications.success(this.translate.instant("PRODUCTS.DELETED"));
        this.products.update((list) => list.filter((p) => p.id !== product.id));
        this.showDeleteModal.set(false);
      },
      error: () => {
        this.notifications.error(this.translate.instant("PRODUCTS.DELETE_ERROR"));
        this.showDeleteModal.set(false);
      }
    });
  }
  static \u0275fac = function ProductListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductListComponent, selectors: [["app-product-list"]], decls: 55, vars: 33, consts: [[2, "animation", "fadeInUp 0.45s ease-out both"], [1, "grid", "grid-cols-2", "lg:grid-cols-4", "gap-3", "mb-6", 2, "animation", "fadeInUp 0.45s ease-out both"], [1, "flex", "flex-col", "gap-2.5", "rounded-xl", "border", "border-border-light", "bg-surface", "p-4", "sm:p-5", "transition-all", "duration-200", "hover:shadow-md", "hover:-translate-y-px"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-[18px]", "h-[18px]", "text-text-muted"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"], [1, "flex", "flex-col", "gap-0.5"], [1, "h-7", "w-8", "animate-pulse", "rounded", "bg-gray-100"], [1, "text-2xl", "font-semibold", "tracking-tight", "text-text-primary"], [1, "text-[11px]", "text-text-muted", "leading-tight"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-[18px]", "h-[18px]", "text-success"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-[18px]", "h-[18px]", "text-error"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-[18px]", "h-[18px]", "text-warning"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"], [1, "flex", "items-center", "justify-between", "gap-4", "mb-5", 2, "animation", "fadeInUp 0.45s ease-out 0.08s both"], [1, "relative"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "w-4", "h-4", "text-text-muted", "pointer-events-none"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"], ["type", "text", 1, "pl-9", "pr-4", "py-2", "rounded-lg", "border", "border-border-light", "bg-surface", "text-sm", "text-text-primary", "placeholder:text-text-muted", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "w-72", "transition-all", 3, "ngModelChange", "input", "placeholder", "ngModel"], [1, "flex", "items-center", "gap-3"], [1, "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-surface", "text-sm", "text-text-secondary", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-all", "cursor-pointer", 3, "ngModel"], [1, "inline-flex", "items-center", "gap-2", "px-4", "py-2", "bg-primary", "text-white", "text-sm", "font-medium", "rounded-lg", "hover:bg-primary-hover", "transition-colors", 3, "routerLink"], [1, "rounded-xl", "border", "border-border-light", "bg-surface", "shadow-sm", "overflow-hidden", 2, "animation", "fadeInUp 0.45s ease-out 0.14s both"], [1, "divide-y", "divide-border-light"], [1, "flex", "flex-col", "items-center", "justify-center", "gap-3", "py-16"], ["variant", "danger", 3, "confirm", "cancel", "open", "title", "message", "confirmLabel"], [1, "px-3", "py-2", "rounded-lg", "border", "border-border-light", "bg-surface", "text-sm", "text-text-secondary", "focus:outline-none", "focus:ring-2", "focus:ring-primary/20", "focus:border-primary", "transition-all", "cursor-pointer", 3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "saas"], ["value", "physical"], ["value", "license"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4.5v15m7.5-7.5h-15"], [1, "flex", "items-center", "gap-4", "px-6", "py-4"], [1, "w-10", "h-10", "rounded-lg", "animate-pulse", "bg-gray-100", "shrink-0"], [1, "flex-1", "flex", "flex-col", "gap-2"], [1, "h-4", "w-40", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-3", "w-24", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-4", "w-20", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-4", "w-16", "animate-pulse", "rounded", "bg-gray-100"], [1, "h-5", "w-16", "animate-pulse", "rounded-full", "bg-gray-100"], [1, "w-12", "h-12", "rounded-full", "bg-primary-light", "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-primary"], [1, "flex", "flex-col", "items-center", "gap-1", "text-center"], [1, "text-sm", "font-medium", "text-text-secondary"], [1, "text-xs", "text-text-muted"], [1, "mt-2", "inline-flex", "items-center", "gap-1.5", "px-4", "py-2", "text-sm", "font-medium", "rounded-lg", "bg-primary", "text-white", "hover:bg-primary-hover", "transition-colors", 3, "routerLink"], [1, "overflow-x-auto"], [1, "w-full"], [1, "border-b", "border-border-light"], [1, "px-6", "py-3", "text-left", "text-[11px]", "font-semibold", "uppercase", "tracking-wider", "text-text-muted"], [1, "px-6", "py-3", "text-right", "text-[11px]", "font-semibold", "uppercase", "tracking-wider", "text-text-muted"], [1, "group", "hover:bg-background", "transition-colors"], [1, "px-6", "py-3", "border-t", "border-border-light"], [1, "px-6", "py-4"], [1, "flex", "items-center", "gap-3", 2, "text-decoration", "none", 3, "routerLink"], [1, "w-10", "h-10", "rounded-lg", "object-cover", "border", "border-border-light", "shrink-0", 3, "src", "alt"], [1, "w-10", "h-10", "rounded-lg", "bg-border-light", "flex", "items-center", "justify-center", "shrink-0"], [1, "min-w-0"], [1, "text-sm", "font-medium", "text-text-primary", "group-hover:text-primary", "transition-colors", "truncate", "block"], [1, "text-xs", "text-text-muted", "truncate", "block"], [1, "text-xs", "text-text-secondary", "font-mono", "bg-background", "px-2", "py-0.5", "rounded"], [1, "text-sm", "font-semibold", "text-text-primary"], [3, "status", "label"], [1, "px-6", "py-4", "text-right"], [1, "flex", "items-center", "justify-end", "gap-1"], [1, "p-2", "text-text-muted", "hover:text-primary", "rounded-lg", "hover:bg-primary-light", "transition-colors", 3, "routerLink", "title"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "text-text-muted/40"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"], [1, "inline-flex", "items-center", "gap-1.5", "px-2", "py-0.5", "rounded-full", "text-[10px]", "font-semibold"], [1, "w-1.5", "h-1.5", "rounded-full"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"], [1, "p-2", "text-text-muted", "hover:text-error", "rounded-lg", "hover:bg-error-light", "transition-colors", "border-none", "bg-transparent", "cursor-pointer", 3, "click", "title"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"]], template: function ProductListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(3, "svg", 3);
      \u0275\u0275element(4, "path", 4);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(5, "div", 5);
      \u0275\u0275conditionalCreate(6, ProductListComponent_Conditional_6_Template, 1, 0, "div", 6)(7, ProductListComponent_Conditional_7_Template, 2, 1, "span", 7);
      \u0275\u0275elementStart(8, "span", 8);
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(12, "svg", 9);
      \u0275\u0275element(13, "path", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(14, "div", 5);
      \u0275\u0275conditionalCreate(15, ProductListComponent_Conditional_15_Template, 1, 0, "div", 6)(16, ProductListComponent_Conditional_16_Template, 2, 1, "span", 7);
      \u0275\u0275elementStart(17, "span", 8);
      \u0275\u0275text(18);
      \u0275\u0275pipe(19, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(21, "svg", 11);
      \u0275\u0275element(22, "path", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(23, "div", 5);
      \u0275\u0275conditionalCreate(24, ProductListComponent_Conditional_24_Template, 1, 0, "div", 6)(25, ProductListComponent_Conditional_25_Template, 2, 1, "span", 7);
      \u0275\u0275elementStart(26, "span", 8);
      \u0275\u0275text(27);
      \u0275\u0275pipe(28, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "div", 2);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(30, "svg", 13);
      \u0275\u0275element(31, "path", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(32, "div", 5);
      \u0275\u0275conditionalCreate(33, ProductListComponent_Conditional_33_Template, 1, 0, "div", 6)(34, ProductListComponent_Conditional_34_Template, 2, 1, "span", 7);
      \u0275\u0275elementStart(35, "span", 8);
      \u0275\u0275text(36);
      \u0275\u0275pipe(37, "translate");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(38, "div", 15)(39, "div", 16);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(40, "svg", 17);
      \u0275\u0275element(41, "path", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(42, "input", 19);
      \u0275\u0275pipe(43, "translate");
      \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_Template_input_ngModelChange_42_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
        return $event;
      });
      \u0275\u0275listener("input", function ProductListComponent_Template_input_input_42_listener() {
        return ctx.onSearch();
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div", 20);
      \u0275\u0275conditionalCreate(45, ProductListComponent_Conditional_45_Template, 13, 13, "select", 21);
      \u0275\u0275conditionalCreate(46, ProductListComponent_Conditional_46_Template, 5, 4, "a", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(47, "div", 23);
      \u0275\u0275conditionalCreate(48, ProductListComponent_Conditional_48_Template, 3, 0, "div", 24)(49, ProductListComponent_Conditional_49_Template, 12, 7, "div", 25)(50, ProductListComponent_Conditional_50_Template, 27, 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(51, "app-confirm-modal", 26);
      \u0275\u0275pipe(52, "translate");
      \u0275\u0275pipe(53, "translate");
      \u0275\u0275pipe(54, "translate");
      \u0275\u0275listener("confirm", function ProductListComponent_Template_app_confirm_modal_confirm_51_listener() {
        return ctx.deleteProduct();
      })("cancel", function ProductListComponent_Template_app_confirm_modal_cancel_51_listener() {
        return ctx.showDeleteModal.set(false);
      });
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_15_0;
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loading() ? 6 : 7);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 17, "PRODUCTS.STAT_TOTAL"));
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loading() ? 15 : 16);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(19, 19, "PRODUCTS.STAT_AVAILABLE"));
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loading() ? 24 : 25);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(28, 21, "PRODUCTS.STAT_UNAVAILABLE"));
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.loading() ? 33 : 34);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(37, 23, "PRODUCTS.STAT_FEATURED"));
      \u0275\u0275advance(6);
      \u0275\u0275property("placeholder", \u0275\u0275pipeBind1(43, 25, "PRODUCTS.SEARCH_PLACEHOLDER"));
      \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.fixedType ? 45 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.auth.isSuperAdmin() ? 46 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 48 : ctx.filteredProducts().length === 0 ? 49 : 50);
      \u0275\u0275advance(3);
      \u0275\u0275property("open", ctx.showDeleteModal())("title", \u0275\u0275pipeBind1(52, 27, "PRODUCTS.DELETE_TITLE"))("message", \u0275\u0275pipeBind1(53, 29, "PRODUCTS.DELETE_WARNING") + " " + (((tmp_15_0 = ctx.productToDelete()) == null ? null : tmp_15_0.nameFr) || "") + "?")("confirmLabel", \u0275\u0275pipeBind1(54, 31, "PRODUCTS.DELETE_CONFIRM"));
    }
  }, dependencies: [RouterLink, FormsModule, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgModel, TranslateModule, StatusBadgeComponent, ConfirmModalComponent, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProductListComponent, [{
    type: Component,
    args: [{
      selector: "app-product-list",
      standalone: true,
      imports: [RouterLink, FormsModule, TranslateModule, StatusBadgeComponent, ConfirmModalComponent],
      template: `
    <div style="animation: fadeInUp 0.45s ease-out both">
      <!-- Summary cards -->
      <div
        class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        style="animation: fadeInUp 0.45s ease-out both"
      >
        <!-- Total -->
        <div
          class="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-px"
        >
          <svg
            class="w-[18px] h-[18px] text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <div class="flex flex-col gap-0.5">
            @if (loading()) {
              <div class="h-7 w-8 animate-pulse rounded bg-gray-100"></div>
            } @else {
              <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                totalCount()
              }}</span>
            }
            <span class="text-[11px] text-text-muted leading-tight">{{
              'PRODUCTS.STAT_TOTAL' | translate
            }}</span>
          </div>
        </div>

        <!-- Available -->
        <div
          class="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-px"
        >
          <svg
            class="w-[18px] h-[18px] text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="flex flex-col gap-0.5">
            @if (loading()) {
              <div class="h-7 w-8 animate-pulse rounded bg-gray-100"></div>
            } @else {
              <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                availableCount()
              }}</span>
            }
            <span class="text-[11px] text-text-muted leading-tight">{{
              'PRODUCTS.STAT_AVAILABLE' | translate
            }}</span>
          </div>
        </div>

        <!-- Unavailable -->
        <div
          class="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-px"
        >
          <svg
            class="w-[18px] h-[18px] text-error"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <div class="flex flex-col gap-0.5">
            @if (loading()) {
              <div class="h-7 w-8 animate-pulse rounded bg-gray-100"></div>
            } @else {
              <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                unavailableCount()
              }}</span>
            }
            <span class="text-[11px] text-text-muted leading-tight">{{
              'PRODUCTS.STAT_UNAVAILABLE' | translate
            }}</span>
          </div>
        </div>

        <!-- Featured -->
        <div
          class="flex flex-col gap-2.5 rounded-xl border border-border-light bg-surface p-4 sm:p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-px"
        >
          <svg
            class="w-[18px] h-[18px] text-warning"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <div class="flex flex-col gap-0.5">
            @if (loading()) {
              <div class="h-7 w-8 animate-pulse rounded bg-gray-100"></div>
            } @else {
              <span class="text-2xl font-semibold tracking-tight text-text-primary">{{
                featuredCount()
              }}</span>
            }
            <span class="text-[11px] text-text-muted leading-tight">{{
              'PRODUCTS.STAT_FEATURED' | translate
            }}</span>
          </div>
        </div>
      </div>

      <!-- Toolbar: search + actions -->
      <div
        class="flex items-center justify-between gap-4 mb-5"
        style="animation: fadeInUp 0.45s ease-out 0.08s both"
      >
        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            [placeholder]="'PRODUCTS.SEARCH_PLACEHOLDER' | translate"
            [(ngModel)]="searchQuery"
            (input)="onSearch()"
            class="pl-9 pr-4 py-2 rounded-lg border border-border-light bg-surface text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-72 transition-all"
          />
        </div>

        <div class="flex items-center gap-3">
          @if (!fixedType) {
            <select
              [(ngModel)]="typeFilter"
              (change)="loadProducts()"
              class="px-3 py-2 rounded-lg border border-border-light bg-surface text-sm text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
            >
              <option value="">{{ 'PRODUCTS.ALL_TYPES' | translate }}</option>
              <option value="saas">{{ 'PRODUCTS.SAAS' | translate }}</option>
              <option value="physical">{{ 'PRODUCTS.PHYSICAL' | translate }}</option>
              <option value="license">{{ 'PRODUCTS.LICENSE' | translate }}</option>
            </select>
          }
          @if (auth.isSuperAdmin()) {
            <a
              [routerLink]="newProductLink"
              class="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              {{ newProductLabelKey | translate }}
            </a>
          }
        </div>
      </div>

      <!-- Table -->
      <div
        class="rounded-xl border border-border-light bg-surface shadow-sm overflow-hidden"
        style="animation: fadeInUp 0.45s ease-out 0.14s both"
      >
        @if (loading()) {
          <!-- Skeleton loading -->
          <div class="divide-y divide-border-light">
            @for (i of skeletonRows; track i) {
              <div class="flex items-center gap-4 px-6 py-4">
                <div class="w-10 h-10 rounded-lg animate-pulse bg-gray-100 shrink-0"></div>
                <div class="flex-1 flex flex-col gap-2">
                  <div class="h-4 w-40 animate-pulse rounded bg-gray-100"></div>
                  <div class="h-3 w-24 animate-pulse rounded bg-gray-100"></div>
                </div>
                <div class="h-4 w-20 animate-pulse rounded bg-gray-100"></div>
                <div class="h-4 w-16 animate-pulse rounded bg-gray-100"></div>
                <div class="h-5 w-16 animate-pulse rounded-full bg-gray-100"></div>
                <div class="h-5 w-16 animate-pulse rounded-full bg-gray-100"></div>
              </div>
            }
          </div>
        } @else if (filteredProducts().length === 0) {
          <!-- Empty state -->
          <div class="flex flex-col items-center justify-center gap-3 py-16">
            <div class="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center">
              <svg
                class="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <div class="flex flex-col items-center gap-1 text-center">
              <span class="text-sm font-medium text-text-secondary">{{
                'PRODUCTS.NO_PRODUCTS' | translate
              }}</span>
              <span class="text-xs text-text-muted">{{
                'PRODUCTS.NO_PRODUCTS_DESC' | translate
              }}</span>
            </div>
            @if (auth.isSuperAdmin()) {
              <a
                [routerLink]="newProductLink"
                class="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                {{ newProductLabelKey | translate }}
              </a>
            }
          </div>
        } @else {
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-border-light">
                  <th
                    class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.PRODUCT' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.SKU' | translate }}
                  </th>
                  @if (!fixedType) {
                    <th
                      class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      {{ 'PRODUCTS.TYPE' | translate }}
                    </th>
                  }
                  <th
                    class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.PRICE' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.STATUS' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-text-muted"
                  >
                    {{ 'PRODUCTS.ACTIONS' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border-light">
                @for (product of filteredProducts(); track product.id) {
                  <tr class="group hover:bg-background transition-colors">
                    <td class="px-6 py-4">
                      <a
                        [routerLink]="[basePath, product.id]"
                        class="flex items-center gap-3"
                        style="text-decoration: none"
                      >
                        @if (product.images?.[0]?.imageUrl) {
                          <img
                            [src]="product.images[0].imageUrl"
                            [alt]="product.nameFr"
                            class="w-10 h-10 rounded-lg object-cover border border-border-light shrink-0"
                          />
                        } @else {
                          <div
                            class="w-10 h-10 rounded-lg bg-border-light flex items-center justify-center shrink-0"
                          >
                            <svg
                              class="w-4 h-4 text-text-muted/40"
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
                        }
                        <div class="min-w-0">
                          <span
                            class="text-sm font-medium text-text-primary group-hover:text-primary transition-colors truncate block"
                          >
                            {{ product.nameFr }}
                          </span>
                          <span class="text-xs text-text-muted truncate block">{{
                            product.nameEn
                          }}</span>
                        </div>
                      </a>
                    </td>
                    <td class="px-6 py-4">
                      <span
                        class="text-xs text-text-secondary font-mono bg-background px-2 py-0.5 rounded"
                      >
                        {{ product.sku }}
                      </span>
                    </td>
                    @if (!fixedType) {
                      <td class="px-6 py-4">
                        <span
                          class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          [class]="getTypeBadgeClasses(product.productType)"
                        >
                          <span
                            class="w-1.5 h-1.5 rounded-full"
                            [class]="getTypeDotClass(product.productType)"
                          ></span>
                          {{ product.productType }}
                        </span>
                      </td>
                    }
                    <td class="px-6 py-4">
                      <span class="text-sm font-semibold text-text-primary">{{
                        getPrice(product)
                      }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <app-status-badge
                        [status]="product.isAvailable ? 'active' : 'inactive'"
                        [label]="
                          product.isAvailable
                            ? ('PRODUCTS.AVAILABLE' | translate)
                            : ('PRODUCTS.UNAVAILABLE' | translate)
                        "
                      />
                    </td>
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end gap-1">
                        <a
                          [routerLink]="[basePath, product.id]"
                          class="p-2 text-text-muted hover:text-primary rounded-lg hover:bg-primary-light transition-colors"
                          [title]="'PRODUCTS.VIEW' | translate"
                        >
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </a>
                        @if (auth.isSuperAdmin()) {
                          <a
                            [routerLink]="[basePath, product.id, 'edit']"
                            class="p-2 text-text-muted hover:text-primary rounded-lg hover:bg-primary-light transition-colors"
                            [title]="'PRODUCTS.EDIT' | translate"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
                              />
                            </svg>
                          </a>
                          <button
                            (click)="confirmDelete(product)"
                            class="p-2 text-text-muted hover:text-error rounded-lg hover:bg-error-light transition-colors border-none bg-transparent cursor-pointer"
                            [title]="'PRODUCTS.DELETE' | translate"
                          >
                            <svg
                              class="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        }
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <!-- Results count -->
          <div class="px-6 py-3 border-t border-border-light">
            <span class="text-xs text-text-muted">
              {{ filteredProducts().length }} {{ 'PRODUCTS.RESULTS' | translate }}
            </span>
          </div>
        }
      </div>
    </div>

    <app-confirm-modal
      [open]="showDeleteModal()"
      [title]="'PRODUCTS.DELETE_TITLE' | translate"
      [message]="
        ('PRODUCTS.DELETE_WARNING' | translate) + ' ' + (productToDelete()?.nameFr || '') + '?'
      "
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent", filePath: "src/app/features/products/product-list/product-list.component.ts", lineNumber: 492 });
})();
export {
  ProductListComponent
};
//# sourceMappingURL=chunk-AFKKG4C5.js.map
