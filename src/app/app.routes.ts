import { Routes } from '@angular/router';
import { adminAuthGuard } from './core/auth/guards/admin-auth.guard';
import { superAdminGuard } from './core/auth/guards/super-admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'verify-2fa',
    loadComponent: () =>
      import('./features/auth/verify-2fa/verify-2fa.component').then((m) => m.Verify2FAComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/admin-layout.component').then((m) => m.AdminLayoutComponent),
    canActivate: [adminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/product-list/product-list.component').then(
            (m) => m.ProductListComponent,
          ),
        canActivate: [superAdminGuard],
        data: {
          productType: 'physical',
          titleKey: 'PRODUCTS.TITLE',
          subtitleKey: 'PRODUCTS.SUBTITLE',
          newLabelKey: 'PRODUCTS.NEW_PRODUCT',
          basePath: '/products',
        },
      },
      {
        path: 'products/new',
        loadComponent: () =>
          import('./features/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
        canActivate: [superAdminGuard],
        data: { basePath: '/products', newTitleKey: 'PRODUCTS.NEW_PRODUCT' },
      },
      {
        path: 'products/:id/edit',
        loadComponent: () =>
          import('./features/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
        canActivate: [superAdminGuard],
        data: { basePath: '/products' },
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./features/products/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent,
          ),
        canActivate: [superAdminGuard],
        data: { basePath: '/products' },
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/products/product-list/product-list.component').then(
            (m) => m.ProductListComponent,
          ),
        canActivate: [superAdminGuard],
        data: {
          productType: 'saas',
          titleKey: 'SERVICES.TITLE',
          subtitleKey: 'SERVICES.SUBTITLE',
          newLabelKey: 'SERVICES.NEW_SERVICE',
          basePath: '/services',
        },
      },
      {
        path: 'services/new',
        loadComponent: () =>
          import('./features/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
        canActivate: [superAdminGuard],
        data: { basePath: '/services', newTitleKey: 'SERVICES.NEW_SERVICE' },
      },
      {
        path: 'services/:id/edit',
        loadComponent: () =>
          import('./features/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
        canActivate: [superAdminGuard],
        data: { basePath: '/services' },
      },
      {
        path: 'services/:id',
        loadComponent: () =>
          import('./features/products/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent,
          ),
        canActivate: [superAdminGuard],
        data: { basePath: '/services' },
      },
      {
        path: 'licences',
        loadComponent: () =>
          import('./features/products/product-list/product-list.component').then(
            (m) => m.ProductListComponent,
          ),
        canActivate: [superAdminGuard],
        data: {
          productType: 'license',
          titleKey: 'LICENCES.TITLE',
          subtitleKey: 'LICENCES.SUBTITLE',
          newLabelKey: 'LICENCES.NEW_LICENCE',
          basePath: '/licences',
        },
      },
      {
        path: 'licences/new',
        loadComponent: () =>
          import('./features/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
        canActivate: [superAdminGuard],
        data: { basePath: '/licences', newTitleKey: 'LICENCES.NEW_LICENCE' },
      },
      {
        path: 'licences/:id/edit',
        loadComponent: () =>
          import('./features/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
        canActivate: [superAdminGuard],
        data: { basePath: '/licences' },
      },
      {
        path: 'licences/:id',
        loadComponent: () =>
          import('./features/products/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent,
          ),
        canActivate: [superAdminGuard],
        data: { basePath: '/licences' },
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/category-list/category-list.component').then(
            (m) => m.CategoryListComponent,
          ),
        canActivate: [superAdminGuard],
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/order-list/order-list.component').then(
            (m) => m.OrderListComponent,
          ),
        canActivate: [superAdminGuard],
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./features/orders/order-detail/order-detail.component').then(
            (m) => m.OrderDetailComponent,
          ),
        canActivate: [superAdminGuard],
      },
      {
        path: 'subscriptions',
        loadComponent: () =>
          import('./features/subscriptions/subscription-list/subscription-list.component').then(
            (m) => m.SubscriptionListComponent,
          ),
        canActivate: [superAdminGuard],
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/customer-list/customer-list.component').then(
            (m) => m.CustomerListComponent,
          ),
        canActivate: [superAdminGuard],
      },
      {
        path: 'customers/:id',
        loadComponent: () =>
          import('./features/customers/customer-detail/customer-detail.component').then(
            (m) => m.CustomerDetailComponent,
          ),
        canActivate: [superAdminGuard],
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./features/analytics/analytics.component').then((m) => m.AnalyticsComponent),
      },
      {
        path: 'content',
        loadComponent: () =>
          import('./features/content/content.component').then((m) => m.ContentComponent),
        canActivate: [superAdminGuard],
      },
      {
        path: 'admins',
        loadComponent: () =>
          import('./features/admins/admin-list/admin-list.component').then(
            (m) => m.AdminListComponent,
          ),
        canActivate: [superAdminGuard],
      },
      {
        path: 'account',
        loadComponent: () =>
          import('./features/account/account.component').then((m) => m.AccountComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
