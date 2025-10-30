import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { PLATFORM_ID } from '@angular/core';

describe('ThemeService', () => {
  let service: ThemeService;
  let localStorageMock: { [key: string]: string };

  beforeEach(() => {
    localStorageMock = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return localStorageMock[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      localStorageMock[key] = value;
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => true,
      }),
    });

    TestBed.configureTestingModule({
      providers: [
        ThemeService,
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default theme', () => {
    expect(service.isDarkMode()).toBeDefined();
  });

  describe('toggleTheme', () => {
    it('should toggle theme from light to dark', () => {
      service.isDarkMode.set(false);

      service.toggleTheme();

      expect(service.isDarkMode()).toBe(true);
      expect(localStorageMock['theme-preference']).toBe('dark');
    });

    it('should toggle theme from dark to light', () => {
      service.isDarkMode.set(true);

      service.toggleTheme();

      expect(service.isDarkMode()).toBe(false);
      expect(localStorageMock['theme-preference']).toBe('light');
    });

    it('should apply theme to document', () => {
      const setAttributeSpy = spyOn(document.documentElement, 'setAttribute');

      service.isDarkMode.set(false);
      service.toggleTheme();

      expect(setAttributeSpy).toHaveBeenCalledWith('data-bs-theme', 'dark');
    });

    it('should add dark class to body when theme is dark', () => {
      service.isDarkMode.set(false);

      service.toggleTheme();

      expect(document.body.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class from body when theme is light', () => {
      service.isDarkMode.set(true);
      document.body.classList.add('dark');

      service.toggleTheme();

      expect(document.body.classList.contains('dark')).toBe(false);
    });
  });

  describe('loadTheme', () => {
    it('should load saved theme from localStorage', () => {
      localStorageMock['theme-preference'] = 'dark';

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeService,
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });

      service = TestBed.inject(ThemeService);

      expect(service.isDarkMode()).toBe(true);
    });

    it('should use system preference if no saved theme', () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => true,
        }),
      });

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ThemeService,
          { provide: PLATFORM_ID, useValue: 'browser' }
        ]
      });

      service = TestBed.inject(ThemeService);

      expect(service.isDarkMode()).toBe(true);
    });
  });
});
