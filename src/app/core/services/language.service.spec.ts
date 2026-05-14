import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let translate: { setDefaultLang: ReturnType<typeof vi.fn>; use: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    translate = { setDefaultLang: vi.fn(), use: vi.fn() };
    // Reset cookies between tests
    document.cookie
      .split('; ')
      .filter((c) => c.startsWith('cyna_admin_lang='))
      .forEach((c) => {
        const name = c.split('=')[0];
        document.cookie = `${name}=; Path=/; Max-Age=0`;
      });

    TestBed.configureTestingModule({
      providers: [LanguageService, { provide: TranslateService, useValue: translate }],
    });
    service = TestBed.inject(LanguageService);
  });

  describe('init()', () => {
    it('defaults to fr when no cookie is set', () => {
      service.init();
      expect(translate.setDefaultLang).toHaveBeenCalledWith('fr');
      expect(translate.use).toHaveBeenCalledWith('fr');
      expect(service.current()).toBe('fr');
    });

    it('reads stored language from cookie', () => {
      document.cookie = 'cyna_admin_lang=en; Path=/';
      service.init();
      expect(translate.use).toHaveBeenCalledWith('en');
      expect(service.current()).toBe('en');
    });

    it('normalizes upper-case cookie values', () => {
      document.cookie = 'cyna_admin_lang=EN; Path=/';
      service.init();
      expect(service.current()).toBe('en');
    });

    it('falls back to default for unsupported values', () => {
      document.cookie = 'cyna_admin_lang=zz; Path=/';
      service.init();
      expect(service.current()).toBe('fr');
    });

    it('falls back to default for empty cookie value', () => {
      document.cookie = 'cyna_admin_lang=; Path=/';
      service.init();
      expect(service.current()).toBe('fr');
    });
  });

  describe('use()', () => {
    it('updates translate, signal, and writes the cookie', () => {
      service.use('en');
      expect(translate.use).toHaveBeenCalledWith('en');
      expect(service.current()).toBe('en');
      expect(document.cookie).toContain('cyna_admin_lang=en');
    });

    it('ignores unsupported languages', () => {
      service.use('de' as 'fr' | 'en');
      expect(translate.use).not.toHaveBeenCalled();
      expect(service.current()).toBe('fr');
    });
  });

  describe('toggle()', () => {
    it('switches fr -> en', () => {
      service.use('fr');
      translate.use.mockClear();
      service.toggle();
      expect(service.current()).toBe('en');
    });

    it('switches en -> fr', () => {
      service.use('en');
      service.toggle();
      expect(service.current()).toBe('fr');
    });
  });
});
