import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  APP_INITIALIZER,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
  provideHttpClient,
  withInterceptors,
  withFetch,
  HttpClient,
  HttpBackend,
} from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';
import { errorInterceptor } from './core/auth/interceptors/error.interceptor';
import { AdminAuthService } from './core/auth/services/admin-auth.service';
import { LanguageService } from './core/services/language.service';

// Use HttpBackend (bypasses interceptors) for translations to avoid the
// errorInterceptor → TranslateService → HttpClient → errorInterceptor cycle.
export function HttpLoaderFactory(handler: HttpBackend): TranslateHttpLoader {
  return new TranslateHttpLoader(new HttpClient(handler), './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor, errorInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend],
        },
      }),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: (languageService: LanguageService) => () => {
        languageService.init();
      },
      deps: [LanguageService],
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AdminAuthService) => () =>
        authService.tryRestoreSession().pipe(catchError(() => of(null))),
      deps: [AdminAuthService],
      multi: true,
    },
  ],
};
