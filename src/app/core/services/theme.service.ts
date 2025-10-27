import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  private readonly THEME_KEY = 'theme-preference';

  isDarkMode = signal<boolean>(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadTheme();
    }
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    this.isDarkMode.set(isDark);
    this.applyTheme(isDark);
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    this.applyTheme(newTheme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.THEME_KEY, newTheme ? 'dark' : 'light');
    }
  }

  private applyTheme(isDark: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      if (isDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }
}
