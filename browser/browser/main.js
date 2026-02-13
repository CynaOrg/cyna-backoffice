import {
  AdminAuthService
} from "./chunk-77RDWDYA.js";
import {
  NotificationService
} from "./chunk-XMJJBEJ5.js";
import {
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-D4TFPFZU.js";
import "./chunk-7NBDW476.js";
import {
  HttpClient,
  environment,
  provideHttpClient,
  withFetch,
  withInterceptors
} from "./chunk-IBCBMH7I.js";
import {
  APP_INITIALIZER,
  Component,
  Inject,
  Injectable,
  TranslateLoader,
  TranslateModule,
  catchError,
  importProvidersFrom,
  inject,
  of,
  provideBrowserGlobalErrorListeners,
  setClassMetadata,
  switchMap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelement,
  ɵɵinject
} from "./chunk-7J6Y2ARR.js";

// node_modules/@ngx-translate/http-loader/fesm2022/ngx-translate-http-loader.mjs
var TranslateHttpLoader = class _TranslateHttpLoader {
  http;
  prefix;
  suffix;
  constructor(http, prefix = "/assets/i18n/", suffix = ".json") {
    this.http = http;
    this.prefix = prefix;
    this.suffix = suffix;
  }
  /**
   * Gets the translations from the server
   */
  getTranslation(lang) {
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
  static \u0275fac = function TranslateHttpLoader_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TranslateHttpLoader)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(String), \u0275\u0275inject(String));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
    token: _TranslateHttpLoader,
    factory: _TranslateHttpLoader.\u0275fac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TranslateHttpLoader, [{
    type: Injectable
  }], () => [{
    type: HttpClient
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [String]
    }]
  }], null);
})();

// src/app/core/auth/guards/admin-auth.guard.ts
var adminAuthGuard = () => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);
  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(["/login"]);
  return false;
};

// src/app/core/auth/guards/super-admin.guard.ts
var superAdminGuard = () => {
  const authService = inject(AdminAuthService);
  const router = inject(Router);
  if (authService.isAuthenticated() && authService.isSuperAdmin()) {
    return true;
  }
  if (!authService.isAuthenticated()) {
    router.navigate(["/login"]);
  } else {
    router.navigate(["/dashboard"]);
  }
  return false;
};

// src/app/app.routes.ts
var routes = [
  {
    path: "login",
    loadComponent: () => import("./chunk-HBPN6O2X.js").then((m) => m.LoginComponent)
  },
  {
    path: "verify-2fa",
    loadComponent: () => import("./chunk-YFYEASPT.js").then((m) => m.Verify2FAComponent)
  },
  {
    path: "",
    loadComponent: () => import("./chunk-YGKA3IJU.js").then((m) => m.AdminLayoutComponent),
    canActivate: [adminAuthGuard],
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        loadComponent: () => import("./chunk-KNHYZ7Q2.js").then((m) => m.DashboardComponent)
      },
      {
        path: "products",
        loadComponent: () => import("./chunk-AFKKG4C5.js").then((m) => m.ProductListComponent),
        data: {
          productType: "physical",
          titleKey: "PRODUCTS.TITLE",
          subtitleKey: "PRODUCTS.SUBTITLE",
          newLabelKey: "PRODUCTS.NEW_PRODUCT",
          basePath: "/products"
        }
      },
      {
        path: "products/new",
        loadComponent: () => import("./chunk-5RM5TXMF.js").then((m) => m.ProductFormComponent),
        canActivate: [superAdminGuard],
        data: { basePath: "/products", newTitleKey: "PRODUCTS.NEW_PRODUCT" }
      },
      {
        path: "products/:id/edit",
        loadComponent: () => import("./chunk-5RM5TXMF.js").then((m) => m.ProductFormComponent),
        canActivate: [superAdminGuard],
        data: { basePath: "/products" }
      },
      {
        path: "products/:id",
        loadComponent: () => import("./chunk-YCMDSHAV.js").then((m) => m.ProductDetailComponent),
        data: { basePath: "/products" }
      },
      {
        path: "services",
        loadComponent: () => import("./chunk-AFKKG4C5.js").then((m) => m.ProductListComponent),
        data: {
          productType: "saas",
          titleKey: "SERVICES.TITLE",
          subtitleKey: "SERVICES.SUBTITLE",
          newLabelKey: "SERVICES.NEW_SERVICE",
          basePath: "/services"
        }
      },
      {
        path: "services/new",
        loadComponent: () => import("./chunk-5RM5TXMF.js").then((m) => m.ProductFormComponent),
        canActivate: [superAdminGuard],
        data: { basePath: "/services", newTitleKey: "SERVICES.NEW_SERVICE" }
      },
      {
        path: "services/:id/edit",
        loadComponent: () => import("./chunk-5RM5TXMF.js").then((m) => m.ProductFormComponent),
        canActivate: [superAdminGuard],
        data: { basePath: "/services" }
      },
      {
        path: "services/:id",
        loadComponent: () => import("./chunk-YCMDSHAV.js").then((m) => m.ProductDetailComponent),
        data: { basePath: "/services" }
      },
      {
        path: "licences",
        loadComponent: () => import("./chunk-AFKKG4C5.js").then((m) => m.ProductListComponent),
        data: {
          productType: "license",
          titleKey: "LICENCES.TITLE",
          subtitleKey: "LICENCES.SUBTITLE",
          newLabelKey: "LICENCES.NEW_LICENCE",
          basePath: "/licences"
        }
      },
      {
        path: "licences/new",
        loadComponent: () => import("./chunk-5RM5TXMF.js").then((m) => m.ProductFormComponent),
        canActivate: [superAdminGuard],
        data: { basePath: "/licences", newTitleKey: "LICENCES.NEW_LICENCE" }
      },
      {
        path: "licences/:id/edit",
        loadComponent: () => import("./chunk-5RM5TXMF.js").then((m) => m.ProductFormComponent),
        canActivate: [superAdminGuard],
        data: { basePath: "/licences" }
      },
      {
        path: "licences/:id",
        loadComponent: () => import("./chunk-YCMDSHAV.js").then((m) => m.ProductDetailComponent),
        data: { basePath: "/licences" }
      },
      {
        path: "orders",
        loadComponent: () => import("./chunk-WSS4ZSFN.js").then((m) => m.OrderListComponent),
        canActivate: [superAdminGuard]
      },
      {
        path: "orders/:id",
        loadComponent: () => import("./chunk-GZ4FJIGL.js").then((m) => m.OrderDetailComponent),
        canActivate: [superAdminGuard]
      },
      {
        path: "subscriptions",
        loadComponent: () => import("./chunk-BWMSPGGC.js").then((m) => m.SubscriptionListComponent)
      },
      {
        path: "customers",
        loadComponent: () => import("./chunk-NO5JC36L.js").then((m) => m.CustomerListComponent),
        canActivate: [superAdminGuard]
      },
      {
        path: "customers/:id",
        loadComponent: () => import("./chunk-5KYWBARG.js").then((m) => m.CustomerDetailComponent),
        canActivate: [superAdminGuard]
      },
      {
        path: "analytics",
        loadComponent: () => import("./chunk-QFWQNMKC.js").then((m) => m.AnalyticsComponent)
      },
      {
        path: "content",
        loadComponent: () => import("./chunk-3QUFDJIK.js").then((m) => m.ContentComponent),
        canActivate: [superAdminGuard]
      },
      {
        path: "admins",
        loadComponent: () => import("./chunk-K4PESTVC.js").then((m) => m.AdminListComponent),
        canActivate: [superAdminGuard]
      },
      {
        path: "account",
        loadComponent: () => import("./chunk-EWLYARRY.js").then((m) => m.AccountComponent)
      }
    ]
  },
  { path: "**", redirectTo: "" }
];

// src/app/core/auth/interceptors/auth.interceptor.ts
var authInterceptor = (req, next) => {
  const authService = inject(AdminAuthService);
  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const isAuthEndpoint = req.url.includes("/auth/admin/login") || req.url.includes("/auth/admin/verify-2fa") || req.url.includes("/auth/admin/resend-2fa") || req.url.includes("/auth/admin/refresh-token");
  if (!isApiRequest) {
    return next(req);
  }
  const token = authService.accessToken();
  let authReq = req.clone({ withCredentials: true });
  if (token && !isAuthEndpoint) {
    authReq = req.clone({
      withCredentials: true,
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(authReq).pipe(catchError((error) => {
    if (error.status === 401 && !isAuthEndpoint && token) {
      return authService.refreshToken().pipe(switchMap((response) => {
        const retryReq = req.clone({
          setHeaders: { Authorization: `Bearer ${response.accessToken}` }
        });
        return next(retryReq);
      }), catchError((refreshError) => {
        authService.clearSession();
        return throwError(() => refreshError);
      }));
    }
    return throwError(() => error);
  }));
};

// src/app/core/auth/interceptors/error.interceptor.ts
var errorInterceptor = (req, next) => {
  const notifications = inject(NotificationService);
  return next(req).pipe(catchError((error) => {
    if (error.status === 0) {
      notifications.error("Unable to connect to server");
    } else if (error.status === 403) {
      notifications.error("Access denied");
    } else if (error.status === 500) {
      notifications.error("Server error. Please try again later.");
    } else if (error.status === 503) {
      notifications.error("Service temporarily unavailable");
    }
    return throwError(() => error);
  }));
};

// src/app/app.config.ts
function HttpLoaderFactory(http) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
var appConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    importProvidersFrom(TranslateModule.forRoot({
      defaultLanguage: "fr",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService) => () => authService.tryRestoreSession().pipe(catchError(() => of(null))),
      deps: [AdminAuthService],
      multi: true
    }
  ]
};

// src/app/app.ts
var AppComponent = class _AppComponent {
  static \u0275fac = function AppComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AppComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275element(0, "router-outlet");
    }
  }, dependencies: [RouterOutlet], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppComponent, [{
    type: Component,
    args: [{
      selector: "app-root",
      standalone: true,
      imports: [RouterOutlet],
      template: `<router-outlet />`
    }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent", filePath: "src/app/app.ts", lineNumber: 10 });
})();

// src/main.ts
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
//# sourceMappingURL=main.js.map
