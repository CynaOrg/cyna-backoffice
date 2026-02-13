import {
  AdminAuthService
} from "./chunk-77RDWDYA.js";
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-D4TFPFZU.js";
import {
  isPlatformServer
} from "./chunk-7NBDW476.js";
import "./chunk-IBCBMH7I.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostAttributeToken,
  Inject,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  PLATFORM_ID,
  Renderer2,
  TranslateModule,
  TranslatePipe,
  TranslateService,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  computed,
  effect,
  filter,
  inject,
  input,
  isObservable,
  numberAttribute,
  runInInjectionContext,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-7J6Y2ARR.js";

// node_modules/@ng-icons/core/fesm2022/ng-icons-core.mjs
var _c0 = ["*"];
var NgGlyphConfigToken = new InjectionToken("Ng Glyph Config");
var defaultConfig = {
  size: "1em",
  opticalSize: 20,
  weight: 400,
  grade: 0,
  fill: false
};
function injectNgGlyphsConfig() {
  return inject(NgGlyphConfigToken, {
    optional: true
  }) ?? defaultConfig;
}
var NgGlyphsToken = new InjectionToken("NgGlyphsToken");
function injectNgGlyphs() {
  const glyphs = inject(NgGlyphsToken, {
    optional: true
  });
  if (!glyphs) {
    throw new Error("Please provide the glyphs using the provideNgGlyphs() function.");
  }
  return glyphs;
}
function coerceCssPixelValue(value) {
  return value == null ? "" : /^\d+$/.test(value) ? `${value}px` : value;
}
var NgGlyph = class _NgGlyph {
  constructor() {
    this.glyphsets = injectNgGlyphs();
    this.config = injectNgGlyphsConfig();
    this.name = input.required(...ngDevMode ? [{
      debugName: "name"
    }] : []);
    this.glyphset = input(this.glyphsets.defaultGlyphset, ...ngDevMode ? [{
      debugName: "glyphset"
    }] : []);
    this.opticalSize = input(this.config.opticalSize, ...ngDevMode ? [{
      debugName: "opticalSize",
      transform: numberAttribute
    }] : [{
      transform: numberAttribute
    }]);
    this.weight = input(this.config.weight, ...ngDevMode ? [{
      debugName: "weight",
      transform: numberAttribute
    }] : [{
      transform: numberAttribute
    }]);
    this.grade = input(this.config.grade, ...ngDevMode ? [{
      debugName: "grade",
      transform: numberAttribute
    }] : [{
      transform: numberAttribute
    }]);
    this.fill = input(this.config.fill, ...ngDevMode ? [{
      debugName: "fill",
      transform: booleanAttribute
    }] : [{
      transform: booleanAttribute
    }]);
    this.size = input(this.config.size, ...ngDevMode ? [{
      debugName: "size",
      transform: coerceCssPixelValue
    }] : [{
      transform: coerceCssPixelValue
    }]);
    this.color = input(this.config.color, ...ngDevMode ? [{
      debugName: "color"
    }] : []);
    this.glyphsetClass = computed(() => {
      const glyphset = this.glyphsets.glyphsets.find((glyphset2) => glyphset2.name === this.glyphset());
      if (!glyphset) {
        throw new Error(`The glyphset "${this.glyphset()}" does not exist. Please provide a valid glyphset.`);
      }
      return glyphset.baseClass;
    }, ...ngDevMode ? [{
      debugName: "glyphsetClass"
    }] : []);
    this.fontVariationSettings = computed(() => {
      return `'FILL' ${this.fill() ? 1 : 0}, 'wght' ${this.weight()}, 'GRAD' ${this.grade()}, 'opsz' ${this.opticalSize()}`;
    }, ...ngDevMode ? [{
      debugName: "fontVariationSettings"
    }] : []);
  }
  static {
    this.\u0275fac = function NgGlyph_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgGlyph)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _NgGlyph,
      selectors: [["ng-glyph"]],
      hostVars: 9,
      hostBindings: function NgGlyph_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275domProperty("textContent", ctx.name());
          \u0275\u0275classMap(ctx.glyphsetClass());
          \u0275\u0275styleProp("--ng-glyph__size", ctx.size())("color", ctx.color())("font-variation-settings", ctx.fontVariationSettings());
        }
      },
      inputs: {
        name: [1, "name"],
        glyphset: [1, "glyphset"],
        opticalSize: [1, "opticalSize"],
        weight: [1, "weight"],
        grade: [1, "grade"],
        fill: [1, "fill"],
        size: [1, "size"],
        color: [1, "color"]
      },
      decls: 0,
      vars: 0,
      template: function NgGlyph_Template(rf, ctx) {
      },
      styles: ["[_nghost-%COMP%]{display:inline-block;width:var(--ng-glyph__size);height:var(--ng-glyph__size);font-size:var(--ng-glyph__size);overflow:hidden}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgGlyph, [{
    type: Component,
    args: [{
      selector: "ng-glyph",
      standalone: true,
      template: ``,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class]": "glyphsetClass()",
        "[textContent]": "name()",
        "[style.--ng-glyph__size]": "size()",
        "[style.color]": "color()",
        "[style.font-variation-settings]": "fontVariationSettings()"
      },
      styles: [":host{display:inline-block;width:var(--ng-glyph__size);height:var(--ng-glyph__size);font-size:var(--ng-glyph__size);overflow:hidden}\n"]
    }]
  }], null, {
    name: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "name",
        required: true
      }]
    }],
    glyphset: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "glyphset",
        required: false
      }]
    }],
    opticalSize: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "opticalSize",
        required: false
      }]
    }],
    weight: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "weight",
        required: false
      }]
    }],
    grade: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "grade",
        required: false
      }]
    }],
    fill: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "fill",
        required: false
      }]
    }],
    size: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "size",
        required: false
      }]
    }],
    color: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "color",
        required: false
      }]
    }]
  });
})();
var NgIconPreProcessorToken = new InjectionToken("Ng Icon Pre Processor");
var NgIconPostProcessorToken = new InjectionToken("Ng Icon Post Processor");
function injectNgIconPreProcessor() {
  return inject(NgIconPreProcessorToken, {
    optional: true
  }) ?? ((icon) => icon);
}
function injectNgIconPostProcessor() {
  return inject(NgIconPostProcessorToken, {
    optional: true
  }) ?? (() => {
  });
}
var LoggerToken = new InjectionToken("Ng Icon Logger");
var DefaultLogger = class {
  log(message) {
    console.log(message);
  }
  warn(message) {
    console.warn(message);
  }
  error(message) {
    console.error(message);
  }
};
function injectLogger() {
  return inject(LoggerToken, {
    optional: true
  }) ?? new DefaultLogger();
}
var NgIconConfigToken = new InjectionToken("Ng Icon Config");
function injectNgIconConfig() {
  return inject(NgIconConfigToken, {
    optional: true
  }) ?? {};
}
var NgIconLoaderToken = new InjectionToken("Ng Icon Loader Token");
var NgIconCacheToken = new InjectionToken("Ng Icon Cache Token");
function injectNgIconLoader() {
  return inject(NgIconLoaderToken, {
    optional: true
  });
}
function injectNgIconLoaderCache() {
  return inject(NgIconCacheToken, {
    optional: true
  });
}
function provideIcons(icons) {
  return [{
    provide: NgIconsToken,
    useFactory: (parentIcons = inject(NgIconsToken, {
      optional: true,
      skipSelf: true
    })) => __spreadValues(__spreadValues({}, parentIcons?.reduce((acc, icons2) => __spreadValues(__spreadValues({}, acc), icons2), {})), icons),
    multi: true
  }];
}
var NgIconsToken = new InjectionToken("Icons Token");
function injectNgIcons() {
  return inject(NgIconsToken, {
    optional: true
  }) ?? [];
}
function coerceLoaderResult(result) {
  if (typeof result === "string") {
    return Promise.resolve(result);
  }
  if (isObservable(result)) {
    return result.toPromise();
  }
  return result;
}
function toPropertyName(str) {
  return str.replace(/([^a-zA-Z0-9])+(.)?/g, (_, __, chr) => chr ? chr.toUpperCase() : "").replace(/[^a-zA-Z\d]/g, "").replace(/^([A-Z])/, (m) => m.toLowerCase());
}
var uniqueId = 0;
var NgIcon = class _NgIcon {
  constructor() {
    this.config = injectNgIconConfig();
    this.icons = injectNgIcons();
    this.loader = injectNgIconLoader();
    this.cache = injectNgIconLoaderCache();
    this.preProcessor = injectNgIconPreProcessor();
    this.postProcessor = injectNgIconPostProcessor();
    this.injector = inject(Injector);
    this.renderer = inject(Renderer2);
    this.platform = inject(PLATFORM_ID);
    this.elementRef = inject(ElementRef);
    this.uniqueId = uniqueId++;
    this.logger = injectLogger();
    this.name = input(...ngDevMode ? [void 0, {
      debugName: "name"
    }] : []);
    this.svg = input(...ngDevMode ? [void 0, {
      debugName: "svg"
    }] : []);
    this.size = input(this.config.size, ...ngDevMode ? [{
      debugName: "size",
      transform: coerceCssPixelValue
    }] : [{
      transform: coerceCssPixelValue
    }]);
    this.strokeWidth = input(this.config.strokeWidth, ...ngDevMode ? [{
      debugName: "strokeWidth"
    }] : []);
    this.color = input(this.config.color, ...ngDevMode ? [{
      debugName: "color"
    }] : []);
    effect(() => this.updateIcon());
    const ariaHidden = inject(new HostAttributeToken("aria-hidden"), {
      optional: true
    });
    if (!ariaHidden) {
      this.elementRef.nativeElement.setAttribute("aria-hidden", "true");
    }
  }
  ngOnDestroy() {
    this.svgElement = void 0;
  }
  async updateIcon() {
    const name = this.name();
    const svg = this.svg();
    if (svg !== void 0) {
      this.setSvg(svg);
      return;
    }
    if (name === void 0) {
      return;
    }
    const propertyName = toPropertyName(name);
    for (const icons of [...this.icons].reverse()) {
      if (icons[propertyName]) {
        this.setSvg(icons[propertyName]);
        return;
      }
    }
    if (this.loader) {
      const result = await this.requestIconFromLoader(name);
      if (result !== null) {
        this.setSvg(result);
        return;
      }
    }
    this.logger.warn(`No icon named ${name} was found. You may need to import it using the withIcons function.`);
  }
  setSvg(svg) {
    if (isPlatformServer(this.platform)) {
      this.elementRef.nativeElement.innerHTML = svg;
      this.elementRef.nativeElement.setAttribute("data-ng-icon-ssr", "");
      return;
    }
    if (this.elementRef.nativeElement.hasAttribute("data-ng-icon-ssr")) {
      this.elementRef.nativeElement.removeAttribute("data-ng-icon-ssr");
      this.svgElement = this.elementRef.nativeElement.querySelector("svg") ?? void 0;
      if (this.elementRef.nativeElement.innerHTML === svg) {
        return;
      }
    }
    if (this.svgElement) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.svgElement);
    }
    if (svg === "") {
      return;
    }
    const template = this.renderer.createElement("template");
    svg = this.replaceIds(svg);
    this.renderer.setProperty(template, "innerHTML", this.preProcessor(svg));
    this.svgElement = template.content.firstElementChild;
    this.postProcessor(this.svgElement);
    this.renderer.appendChild(this.elementRef.nativeElement, this.svgElement);
  }
  replaceIds(svg) {
    if (!svg.includes("ID_PLACEHOLDER_")) {
      return svg;
    }
    const regex = /ID_PLACEHOLDER_(\d+)/g;
    const idMap = /* @__PURE__ */ new Map();
    const matches = new Set(svg.match(regex));
    if (matches === null) {
      return svg;
    }
    for (const match of matches) {
      const id = match.replace("ID_PLACEHOLDER_", "");
      const placeholder = `ng-icon-${this.uniqueId}-${idMap.size}`;
      idMap.set(id, placeholder);
      svg = svg.replace(new RegExp(match, "g"), placeholder);
    }
    return svg;
  }
  /**
   * Request the icon from the loader.
   * @param name The name of the icon to load.
   * @returns The SVG content for a given icon name.
   */
  requestIconFromLoader(name) {
    return new Promise((resolve) => {
      runInInjectionContext(this.injector, async () => {
        if (this.cache) {
          const cachedResult = this.cache.get(name);
          if (typeof cachedResult === "string") {
            resolve(cachedResult);
            return;
          }
          if (cachedResult instanceof Promise) {
            const result2 = await cachedResult;
            resolve(result2);
            return;
          }
        }
        const promise = coerceLoaderResult(this.loader(name));
        this.cache?.set(name, promise);
        const result = await promise;
        this.cache?.set(name, result);
        resolve(result);
      });
    });
  }
  static {
    this.\u0275fac = function NgIcon_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgIcon)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _NgIcon,
      selectors: [["ng-icon"]],
      hostAttrs: ["role", "img"],
      hostVars: 6,
      hostBindings: function NgIcon_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275styleProp("--ng-icon__stroke-width", ctx.strokeWidth())("--ng-icon__size", ctx.size())("--ng-icon__color", ctx.color());
        }
      },
      inputs: {
        name: [1, "name"],
        svg: [1, "svg"],
        size: [1, "size"],
        strokeWidth: [1, "strokeWidth"],
        color: [1, "color"]
      },
      decls: 0,
      vars: 0,
      template: function NgIcon_Template(rf, ctx) {
      },
      styles: ["[_nghost-%COMP%]{display:inline-block;width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);line-height:initial;vertical-align:initial;overflow:hidden}[_nghost-%COMP%]     svg{width:inherit;height:inherit;vertical-align:inherit}@layer ng-icon{[_nghost-%COMP%]{color:var(--ng-icon__color, currentColor)}}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgIcon, [{
    type: Component,
    args: [{
      selector: "ng-icon",
      template: "",
      standalone: true,
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        role: "img",
        "[style.--ng-icon__stroke-width]": "strokeWidth()",
        "[style.--ng-icon__size]": "size()",
        "[style.--ng-icon__color]": "color()"
      },
      styles: [":host{display:inline-block;width:var(--ng-icon__size, 1em);height:var(--ng-icon__size, 1em);line-height:initial;vertical-align:initial;overflow:hidden}:host ::ng-deep svg{width:inherit;height:inherit;vertical-align:inherit}@layer ng-icon{:host{color:var(--ng-icon__color, currentColor)}}\n"]
    }]
  }], () => [], {
    name: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "name",
        required: false
      }]
    }],
    svg: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "svg",
        required: false
      }]
    }],
    size: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "size",
        required: false
      }]
    }],
    strokeWidth: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "strokeWidth",
        required: false
      }]
    }],
    color: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "color",
        required: false
      }]
    }]
  });
})();
var NgIconsModule = class _NgIconsModule {
  constructor(icons) {
    if (Object.keys(icons).length === 0) {
      throw new Error("No icons have been provided. Ensure to include some icons by importing them using NgIconsModule.withIcons({ ... }).");
    }
  }
  /**
   * Define the icons that will be included in the application. This allows unused icons to
   * be tree-shaken away to reduce bundle size
   * @param icons The object containing the required icons
   */
  static withIcons(icons) {
    return {
      ngModule: _NgIconsModule,
      providers: provideIcons(icons)
    };
  }
  static {
    this.\u0275fac = function NgIconsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgIconsModule)(\u0275\u0275inject(NgIconsToken));
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _NgIconsModule,
      imports: [NgIcon],
      exports: [NgIcon]
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgIconsModule, [{
    type: NgModule,
    args: [{
      imports: [NgIcon],
      exports: [NgIcon]
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [NgIconsToken]
    }]
  }], null);
})();
var NgIconStack = class _NgIconStack {
  constructor() {
    this.size = input.required(...ngDevMode ? [{
      debugName: "size"
    }] : []);
  }
  static {
    this.\u0275fac = function NgIconStack_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgIconStack)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _NgIconStack,
      selectors: [["ng-icon-stack"]],
      hostVars: 2,
      hostBindings: function NgIconStack_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275styleProp("--ng-icon__size", ctx.size());
        }
      },
      inputs: {
        size: [1, "size"]
      },
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function NgIconStack_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275projection(0);
        }
      },
      styles: ["[_nghost-%COMP%]{display:inline-flex;justify-content:center;align-items:center;position:relative;width:var(--ng-icon__size);height:var(--ng-icon__size)}[_nghost-%COMP%]     ng-icon{position:absolute}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgIconStack, [{
    type: Component,
    args: [{
      selector: "ng-icon-stack",
      standalone: true,
      template: "<ng-content />",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[style.--ng-icon__size]": "size()"
      },
      styles: [":host{display:inline-flex;justify-content:center;align-items:center;position:relative;width:var(--ng-icon__size);height:var(--ng-icon__size)}:host ::ng-deep ng-icon{position:absolute}\n"]
    }]
  }], null, {
    size: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "size",
        required: true
      }]
    }]
  });
})();

// node_modules/@ng-icons/phosphor-icons/fesm2022/ng-icons-phosphor-icons-regular.mjs
var phosphorSignOut = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H56V208h56A8,8,0,0,1,120,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L204.69,120H112a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,229.66,122.34Z"></path></svg>`;
var phosphorUser = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path></svg>`;

// src/app/shared/layouts/admin-layout.component.ts
var _c02 = () => ({ exact: true });
var _c1 = (a0) => ({ exact: a0 });
var _forTrack0 = ($index, $item) => $item.labelKey;
var _forTrack1 = ($index, $item) => $item.route;
function AdminLayoutComponent_For_12_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 27, 2);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 9);
    \u0275\u0275element(3, "path", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const rla_r3 = \u0275\u0275reference(1);
    \u0275\u0275styleProp("color", rla_r3.isActive ? "#4f39f6" : "#585858");
    \u0275\u0275classProp("bg-primary-light", rla_r3.isActive);
    \u0275\u0275property("routerLink", item_r2.route)("routerLinkActiveOptions", \u0275\u0275pureFunction1(10, _c1, item_r2.exact || false));
    \u0275\u0275advance(3);
    \u0275\u0275attribute("d", item_r2.icon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(5, 8, item_r2.labelKey), " ");
  }
}
function AdminLayoutComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, AdminLayoutComponent_For_12_For_5_Template, 6, 12, "a", 26, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(3, 1, section_r4.labelKey), " ");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(section_r4.items);
  }
}
function AdminLayoutComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "translate");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, ctx));
  }
}
var AdminLayoutComponent = class _AdminLayoutComponent {
  auth = inject(AdminAuthService);
  router = inject(Router);
  translate = inject(TranslateService);
  routerSub;
  currentUrl = signal(this.router.url, ...ngDevMode ? [{ debugName: "currentUrl" }] : []);
  pageTitleKey = computed(() => {
    const path = this.currentUrl();
    const titleKeys = {
      "/dashboard": "PAGES.DASHBOARD",
      "/products": "PAGES.PRODUCTS",
      "/services": "PAGES.SERVICES",
      "/licences": "PAGES.LICENCES",
      "/orders": "PAGES.ORDERS",
      "/subscriptions": "PAGES.SUBSCRIPTIONS",
      "/customers": "PAGES.CUSTOMERS",
      "/analytics": "PAGES.ANALYTICS",
      "/content": "PAGES.CONTENT",
      "/admins": "PAGES.ADMIN_MANAGEMENT",
      "/account": "PAGES.ACCOUNT"
    };
    for (const [key, value] of Object.entries(titleKeys)) {
      if (path.startsWith(key))
        return value;
    }
    return "PAGES.DASHBOARD";
  }, ...ngDevMode ? [{ debugName: "pageTitleKey" }] : []);
  pageSubtitleKey = computed(() => {
    const path = this.currentUrl();
    const subtitleKeys = {
      "/dashboard": "DASHBOARD.SUBTITLE",
      "/products": "PRODUCTS.SUBTITLE",
      "/services": "SERVICES.SUBTITLE",
      "/licences": "LICENCES.SUBTITLE",
      "/orders": "ORDERS.SUBTITLE",
      "/subscriptions": "SUBSCRIPTIONS.SUBTITLE",
      "/customers": "CUSTOMERS.SUBTITLE",
      "/analytics": "ANALYTICS.SUBTITLE",
      "/content": "CONTENT.SUBTITLE",
      "/admins": "ADMINS.SUBTITLE"
    };
    for (const [key, value] of Object.entries(subtitleKeys)) {
      if (path.startsWith(key))
        return value;
    }
    return "";
  }, ...ngDevMode ? [{ debugName: "pageSubtitleKey" }] : []);
  ngOnInit() {
    this.routerSub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => this.currentUrl.set(e.urlAfterRedirects));
  }
  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
  catalogueSection = {
    labelKey: "SIDEBAR.CATALOGUE",
    items: [
      {
        route: "/products",
        labelKey: "SIDEBAR.PRODUCTS",
        icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      },
      {
        route: "/services",
        labelKey: "SIDEBAR.SERVICES",
        icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      },
      {
        route: "/licences",
        labelKey: "SIDEBAR.LICENCES",
        icon: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
      }
    ]
  };
  managementSection = {
    labelKey: "SIDEBAR.MANAGEMENT",
    items: [
      {
        route: "/orders",
        labelKey: "SIDEBAR.ORDERS",
        icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
        superAdminOnly: true
      },
      {
        route: "/subscriptions",
        labelKey: "SIDEBAR.SUBSCRIPTIONS",
        icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
      }
    ]
  };
  userManagementSection = {
    labelKey: "SIDEBAR.USER_MANAGEMENT",
    items: [
      {
        route: "/customers",
        labelKey: "SIDEBAR.CUSTOMERS",
        icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
        superAdminOnly: true
      },
      {
        route: "/admins",
        labelKey: "SIDEBAR.ADMINS",
        icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z M15 12a3 3 0 11-6 0 3 3 0 016 0z",
        superAdminOnly: true
      }
    ]
  };
  insightsSection = {
    labelKey: "SIDEBAR.INSIGHTS",
    items: [
      {
        route: "/analytics",
        labelKey: "SIDEBAR.ANALYTICS",
        icon: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      }
    ]
  };
  settingsSection = {
    labelKey: "SIDEBAR.SETTINGS",
    items: [
      {
        route: "/content",
        labelKey: "SIDEBAR.CONTENT",
        icon: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
        superAdminOnly: true
      }
    ]
  };
  allSections = [
    this.catalogueSection,
    this.managementSection,
    this.userManagementSection,
    this.insightsSection,
    this.settingsSection
  ];
  visibleSections = computed(() => {
    const isSuperAdmin = this.auth.isSuperAdmin();
    return this.allSections.map((section) => __spreadProps(__spreadValues({}, section), {
      items: section.items.filter((item) => !item.superAdminOnly || isSuperAdmin)
    })).filter((section) => section.items.length > 0);
  }, ...ngDevMode ? [{ debugName: "visibleSections" }] : []);
  static \u0275fac = function AdminLayoutComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AdminLayoutComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLayoutComponent, selectors: [["app-admin-layout"]], features: [\u0275\u0275ProvidersFeature([], [provideIcons({ phosphorSignOut, phosphorUser })])], decls: 35, vars: 25, consts: [["rlaDash", "routerLinkActive"], ["rlaAccount", "routerLinkActive"], ["rla", "routerLinkActive"], [1, "fixed", "left-0", "top-0", "z-40", "h-screen", "w-64", "flex", "flex-col", "border-r", "border-border-light", "bg-surface"], [1, "flex", "h-20", "items-center", "px-6"], ["routerLink", "/dashboard", 1, "no-underline"], ["src", "assets/cyna-backoffice.svg", "alt", "CYNA", 1, "h-8", "w-auto", "object-contain"], [1, "flex", "flex-1", "flex-col", "overflow-y-auto", "px-3"], ["routerLink", "/dashboard", "routerLinkActive", "active-dashboard", 1, "mb-6", "flex", "items-center", "gap-3", "rounded-lg", "px-4", "py-2.5", "text-sm", "font-medium", "transition-colors", "no-underline", 3, "routerLinkActiveOptions"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5", "d", "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z"], [1, "mb-6"], [1, "border-t", "border-border-light", "px-3", "py-3"], ["routerLink", "/account", "routerLinkActive", "active-account", 1, "flex", "items-center", "gap-3", "rounded-lg", "px-4", "py-2.5", "text-sm", "font-medium", "transition-colors", "no-underline"], ["name", "phosphorUser", "size", "20"], [1, "flex", "items-center", "gap-3", "w-full", "rounded-lg", "px-4", "py-2.5", "text-sm", "font-medium", "text-text-muted", "transition-colors", "hover:text-error", "hover:bg-error-light", "border-none", "bg-transparent", "cursor-pointer", 3, "click"], ["name", "phosphorSignOut", "size", "20"], [1, "ml-64", "min-h-screen", "bg-background"], [1, "fixed", "top-0", "right-0", "left-64", "z-20", "border-b", "border-border-light", "bg-surface"], [1, "flex", "items-center", "justify-between", "px-8", "py-4"], [1, "min-w-0"], [1, "m-0", "truncate", "text-xl", "font-bold", "text-text-primary"], [1, "m-0", "text-sm", "text-text-secondary", "truncate"], [1, "text-sm", "text-text-secondary", "whitespace-nowrap", "ml-4"], [1, "p-8", "pt-[96px]"], [1, "mb-2", "block", "px-4", "text-[11px]", "font-semibold", "uppercase", "tracking-wider", "text-text-muted"], ["routerLinkActive", "active-section", 1, "flex", "items-center", "gap-3", "rounded-lg", "px-4", "py-2.5", "text-sm", "font-medium", "transition-colors", "no-underline", 3, "routerLink", "routerLinkActiveOptions", "bg-primary-light", "color"], ["routerLinkActive", "active-section", 1, "flex", "items-center", "gap-3", "rounded-lg", "px-4", "py-2.5", "text-sm", "font-medium", "transition-colors", "no-underline", 3, "routerLink", "routerLinkActiveOptions"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "1.5"]], template: function AdminLayoutComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "aside", 3)(1, "div", 4)(2, "a", 5);
      \u0275\u0275element(3, "img", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "nav", 7)(5, "a", 8, 0);
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(7, "svg", 9);
      \u0275\u0275element(8, "path", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275text(9);
      \u0275\u0275pipe(10, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(11, AdminLayoutComponent_For_12_Template, 6, 3, "div", 11, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(13, "div", 12)(14, "a", 13, 1);
      \u0275\u0275element(16, "ng-icon", 14);
      \u0275\u0275text(17);
      \u0275\u0275pipe(18, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "button", 15);
      \u0275\u0275listener("click", function AdminLayoutComponent_Template_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.auth.logout());
      });
      \u0275\u0275element(20, "ng-icon", 16);
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "main", 17)(24, "div", 18)(25, "div", 19)(26, "div", 20)(27, "h1", 21);
      \u0275\u0275text(28);
      \u0275\u0275pipe(29, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(30, AdminLayoutComponent_Conditional_30_Template, 3, 3, "p", 22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span", 23);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(33, "div", 24);
      \u0275\u0275element(34, "router-outlet");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      let tmp_12_0;
      let tmp_13_0;
      const rlaDash_r5 = \u0275\u0275reference(6);
      const rlaAccount_r6 = \u0275\u0275reference(15);
      \u0275\u0275advance(5);
      \u0275\u0275styleProp("color", rlaDash_r5.isActive ? "#ffffff" : "#0a0a0a");
      \u0275\u0275classProp("bg-primary", rlaDash_r5.isActive);
      \u0275\u0275property("routerLinkActiveOptions", \u0275\u0275pureFunction0(24, _c02));
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(10, 16, "SIDEBAR.DASHBOARD"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.visibleSections());
      \u0275\u0275advance(3);
      \u0275\u0275styleProp("color", rlaAccount_r6.isActive ? "#4f39f6" : "#585858");
      \u0275\u0275classProp("bg-primary-light", rlaAccount_r6.isActive);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(18, 18, "SIDEBAR.ACCOUNT"), " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(22, 20, "SIDEBAR.SIGN_OUT"), " ");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(29, 22, ctx.pageTitleKey()), " ");
      \u0275\u0275advance(2);
      \u0275\u0275conditional((tmp_12_0 = ctx.pageSubtitleKey()) ? 30 : -1, tmp_12_0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" ", (tmp_13_0 = ctx.auth.admin()) == null ? null : tmp_13_0.firstName, " ", (tmp_13_0 = ctx.auth.admin()) == null ? null : tmp_13_0.lastName, " ");
    }
  }, dependencies: [RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, NgIcon, TranslatePipe], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AdminLayoutComponent, [{
    type: Component,
    args: [{
      selector: "app-admin-layout",
      standalone: true,
      imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, NgIcon],
      viewProviders: [provideIcons({ phosphorSignOut, phosphorUser })],
      template: `
    <!-- ========== SIDEBAR (fixed left, 256px) ========== -->
    <aside
      class="fixed left-0 top-0 z-40 h-screen w-64 flex flex-col border-r border-border-light bg-surface"
    >
      <!-- Logo -->
      <div class="flex h-20 items-center px-6">
        <a routerLink="/dashboard" class="no-underline">
          <img src="assets/cyna-backoffice.svg" alt="CYNA" class="h-8 w-auto object-contain" />
        </a>
      </div>

      <!-- Main nav -->
      <nav class="flex flex-1 flex-col overflow-y-auto px-3">
        <!-- Dashboard link (standalone, with primary bg when active) -->
        <a
          routerLink="/dashboard"
          routerLinkActive="active-dashboard"
          #rlaDash="routerLinkActive"
          [routerLinkActiveOptions]="{ exact: true }"
          class="mb-6 flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors no-underline"
          [class.bg-primary]="rlaDash.isActive"
          [style.color]="rlaDash.isActive ? '#ffffff' : '#0a0a0a'"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z"
            />
          </svg>
          {{ 'SIDEBAR.DASHBOARD' | translate }}
        </a>

        <!-- Sections -->
        @for (section of visibleSections(); track section.labelKey) {
          <div class="mb-6">
            <span
              class="mb-2 block px-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted"
            >
              {{ section.labelKey | translate }}
            </span>
            @for (item of section.items; track item.route) {
              <a
                [routerLink]="item.route"
                routerLinkActive="active-section"
                #rla="routerLinkActive"
                [routerLinkActiveOptions]="{ exact: item.exact || false }"
                class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors no-underline"
                [class.bg-primary-light]="rla.isActive"
                [style.color]="rla.isActive ? '#4f39f6' : '#585858'"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    [attr.d]="item.icon"
                  />
                </svg>
                {{ item.labelKey | translate }}
              </a>
            }
          </div>
        }
      </nav>

      <!-- Account + Logout -->
      <div class="border-t border-border-light px-3 py-3">
        <a
          routerLink="/account"
          routerLinkActive="active-account"
          #rlaAccount="routerLinkActive"
          class="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors no-underline"
          [class.bg-primary-light]="rlaAccount.isActive"
          [style.color]="rlaAccount.isActive ? '#4f39f6' : '#585858'"
        >
          <ng-icon name="phosphorUser" size="20" />
          {{ 'SIDEBAR.ACCOUNT' | translate }}
        </a>
        <button
          (click)="auth.logout()"
          class="flex items-center gap-3 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-error hover:bg-error-light border-none bg-transparent cursor-pointer"
        >
          <ng-icon name="phosphorSignOut" size="20" />
          {{ 'SIDEBAR.SIGN_OUT' | translate }}
        </button>
      </div>
    </aside>

    <!-- ========== MAIN CONTENT ========== -->
    <main class="ml-64 min-h-screen bg-background">
      <!-- Topbar -->
      <div class="fixed top-0 right-0 left-64 z-20 border-b border-border-light bg-surface">
        <div class="flex items-center justify-between px-8 py-4">
          <div class="min-w-0">
            <h1 class="m-0 truncate text-xl font-bold text-text-primary">
              {{ pageTitleKey() | translate }}
            </h1>
            @if (pageSubtitleKey(); as sub) {
              <p class="m-0 text-sm text-text-secondary truncate">{{ sub | translate }}</p>
            }
          </div>
          <span class="text-sm text-text-secondary whitespace-nowrap ml-4">
            {{ auth.admin()?.firstName }} {{ auth.admin()?.lastName }}
          </span>
        </div>
      </div>

      <!-- Page content -->
      <div class="p-8 pt-[96px]">
        <router-outlet />
      </div>
    </main>
  `
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLayoutComponent, { className: "AdminLayoutComponent", filePath: "src/app/shared/layouts/admin-layout.component.ts", lineNumber: 144 });
})();
export {
  AdminLayoutComponent
};
//# sourceMappingURL=chunk-YGKA3IJU.js.map
