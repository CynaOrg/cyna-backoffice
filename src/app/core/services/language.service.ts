import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type SupportedLanguage = 'fr' | 'en';

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['fr', 'en'];
const DEFAULT_LANGUAGE: SupportedLanguage = 'fr';
// Admin-prefixed to avoid collision with the public storefront's language cookie
// when both apps are served from the same root domain.
const COOKIE_NAME = 'cyna_admin_lang';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 year

/**
 * Manages the active UI language for the admin backoffice.
 *
 * Persists the user's choice in a regular cookie (not HttpOnly — UI prefs
 * must be readable from JS). Cookie attributes are `Secure` + `SameSite=Strict`
 * per CYNA security guidelines. localStorage is forbidden by the project
 * convention so we never touch it.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly _current = signal<SupportedLanguage>(DEFAULT_LANGUAGE);
  readonly current = this._current.asReadonly();

  /**
   * Initialize ngx-translate with the language stored in the `cyna_admin_lang`
   * cookie (or the default `fr` when the cookie is missing/invalid).
   * Idempotent — safe to call from APP_INITIALIZER and from the layout.
   */
  init(): void {
    const stored = this.readCookie();
    const lang = this.normalize(stored) ?? DEFAULT_LANGUAGE;
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    this.translate.use(lang);
    this._current.set(lang);
  }

  use(lang: SupportedLanguage): void {
    if (!SUPPORTED_LANGUAGES.includes(lang)) return;
    this.translate.use(lang);
    this._current.set(lang);
    this.writeCookie(lang);
  }

  toggle(): void {
    this.use(this._current() === 'fr' ? 'en' : 'fr');
  }

  private normalize(value: string | null): SupportedLanguage | null {
    if (!value) return null;
    const lower = value.toLowerCase();
    return SUPPORTED_LANGUAGES.includes(lower as SupportedLanguage)
      ? (lower as SupportedLanguage)
      : null;
  }

  private readCookie(): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    return match ? decodeURIComponent(match.split('=')[1] ?? '') : null;
  }

  private writeCookie(lang: SupportedLanguage): void {
    if (typeof document === 'undefined') return;
    const isSecureContext = typeof window !== 'undefined' && window.location.protocol === 'https:';
    const secureFlag = isSecureContext ? '; Secure' : '';
    document.cookie =
      `${COOKIE_NAME}=${encodeURIComponent(lang)}; ` +
      `Path=/; Max-Age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Strict${secureFlag}`;
  }
}
