import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminAuthService } from '../../core/auth/services/admin-auth.service';
import { LanguageService } from '../../core/services/language.service';

describe('AdminLayoutComponent', () => {
  let fixture: ComponentFixture<AdminLayoutComponent>;
  let component: AdminLayoutComponent;
  let language: { use: ReturnType<typeof vi.fn>; current: () => 'fr' | 'en' };

  async function setup(opts: { isSuperAdmin?: boolean; url?: string } = {}) {
    language = { use: vi.fn(), current: () => 'fr' };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [AdminLayoutComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        {
          provide: AdminAuthService,
          useValue: {
            admin: () => ({ firstName: 'A', lastName: 'B' }),
            isSuperAdmin: () => opts.isSuperAdmin ?? true,
          },
        },
        { provide: LanguageService, useValue: language },
      ],
    }).compileComponents();

    const router = TestBed.inject(Router);
    Object.defineProperty(router, 'url', {
      configurable: true,
      get: () => opts.url ?? '/dashboard',
    });
    // Replace events with a quiet subject so ngOnInit doesn't react to navigation
    Object.defineProperty(router, 'events', {
      configurable: true,
      get: () => new Subject(),
    });

    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
  }

  describe('mobile drawer', () => {
    it('openMobile/closeMobile flip the signal', async () => {
      await setup();
      expect(component.mobileOpen()).toBe(false);
      component.openMobile();
      expect(component.mobileOpen()).toBe(true);
      component.closeMobile();
      expect(component.mobileOpen()).toBe(false);
    });

    it('Escape closes the drawer when open', async () => {
      await setup();
      component.openMobile();
      component.onEscape();
      expect(component.mobileOpen()).toBe(false);
    });

    it('Escape is a no-op when the drawer is closed', async () => {
      await setup();
      component.onEscape();
      expect(component.mobileOpen()).toBe(false);
    });
  });

  describe('setLanguage', () => {
    it('forwards to the language service', async () => {
      await setup();
      component.setLanguage('en');
      expect(language.use).toHaveBeenCalledWith('en');
    });
  });

  describe('pageTitleKey / pageSubtitleKey', () => {
    it.each([
      ['/dashboard', 'PAGES.DASHBOARD', 'DASHBOARD.SUBTITLE'],
      ['/products/123', 'PAGES.PRODUCTS', 'PRODUCTS.SUBTITLE'],
      ['/services', 'PAGES.SERVICES', 'SERVICES.SUBTITLE'],
      ['/licences', 'PAGES.LICENCES', 'LICENCES.SUBTITLE'],
      ['/orders/abc', 'PAGES.ORDERS', 'ORDERS.SUBTITLE'],
      ['/subscriptions', 'PAGES.SUBSCRIPTIONS', 'SUBSCRIPTIONS.SUBTITLE'],
      ['/customers', 'PAGES.CUSTOMERS', 'CUSTOMERS.SUBTITLE'],
      ['/analytics', 'PAGES.ANALYTICS', 'ANALYTICS.SUBTITLE'],
      ['/content', 'PAGES.CONTENT', 'CONTENT.SUBTITLE'],
      ['/messages', 'PAGES.MESSAGES', 'MESSAGES.SUBTITLE'],
      ['/admins', 'PAGES.ADMIN_MANAGEMENT', 'ADMINS.SUBTITLE'],
      ['/account', 'PAGES.ACCOUNT', 'ACCOUNT.SUBTITLE'],
    ])('%s -> %s', async (url, expectedTitle, expectedSubtitle) => {
      await setup({ url });
      expect(component.pageTitleKey()).toBe(expectedTitle);
      expect(component.pageSubtitleKey()).toBe(expectedSubtitle);
    });

    it('falls back to DASHBOARD for unknown routes', async () => {
      await setup({ url: '/something-else' });
      expect(component.pageTitleKey()).toBe('PAGES.DASHBOARD');
      expect(component.pageSubtitleKey()).toBe('');
    });
  });

  describe('visibleSections', () => {
    it('hides super-admin-only items for non super admins', async () => {
      await setup({ isSuperAdmin: false });
      const labels = component.visibleSections().flatMap((s) => s.items.map((i) => i.labelKey));
      expect(labels).not.toContain('SIDEBAR.PRODUCTS');
      expect(labels).toContain('SIDEBAR.ORDERS');
    });

    it('returns all sections for super admins', async () => {
      await setup({ isSuperAdmin: true });
      const labels = component.visibleSections().flatMap((s) => s.items.map((i) => i.labelKey));
      expect(labels).toContain('SIDEBAR.PRODUCTS');
      expect(labels).toContain('SIDEBAR.ADMINS');
      expect(labels).toContain('SIDEBAR.CONTENT');
    });
  });
});
