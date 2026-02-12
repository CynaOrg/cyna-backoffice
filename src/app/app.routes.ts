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
      },
      {
        path: 'products/new',
        loadComponent: () =>
          import('./features/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
        canActivate: [superAdminGuard],
      },
      {
        path: 'products/:id/edit',
        loadComponent: () =>
          import('./features/products/product-form/product-form.component').then(
            (m) => m.ProductFormComponent,
          ),
        canActivate: [superAdminGuard],
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('./features/products/product-detail/product-detail.component').then(
            (m) => m.ProductDetailComponent,
          ),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/category-list/category-list.component').then(
            (m) => m.CategoryListComponent,
          ),
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
    ],
  },
  { path: '**', redirectTo: '' },
];
