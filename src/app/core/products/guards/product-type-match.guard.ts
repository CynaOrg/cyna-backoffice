import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map, of } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { Product } from '../../models/product.model';

const TYPE_TO_BASE_PATH: Record<Product['productType'], string> = {
  physical: '/products',
  saas: '/services',
  license: '/licences',
};

/**
 * PROD-7: when navigating to /<basePath>/:id (or :id/edit), fetch the product
 * and verify its `productType` matches the section being viewed. If not, redirect
 * to the correct section's detail page so the user lands on the right list view.
 *
 * The route's `data.productType` ('physical' | 'saas' | 'license') is the
 * expected type for the current URL.
 */
export const productTypeMatchGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const api = inject(ApiService);
  const notifications = inject(NotificationService);
  const translate = inject(TranslateService);

  const expectedType = route.data['productType'] as Product['productType'] | undefined;
  const id = route.paramMap.get('id');

  if (!expectedType || !id) return true;

  return api.get<Product>(`admin/catalog/products/${id}`).pipe(
    map((product) => {
      if (product?.productType === expectedType) {
        return true;
      }
      const correctBase = TYPE_TO_BASE_PATH[product.productType] ?? '/products';
      notifications.warning(translate.instant('PRODUCTS.WRONG_TYPE_REDIRECT'));
      // Preserve the action segment (`edit`) when redirecting from /:id/edit.
      const isEdit = route.url.some((seg) => seg.path === 'edit');
      const target = isEdit ? [correctBase, product.id, 'edit'] : [correctBase, product.id];
      return router.createUrlTree(target);
    }),
    catchError(() => {
      // If the product cannot be fetched, fall back to letting the component handle 404s.
      return of(true);
    }),
  );
};
