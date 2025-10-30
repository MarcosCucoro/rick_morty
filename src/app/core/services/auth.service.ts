import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor(private router: Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): boolean {
    if (!this.isBrowser) return false;

    if (username && password) {
      const fakeToken = this.generateFakeJWT(username);

      localStorage.setItem(this.TOKEN_KEY, fakeToken);
      return true;
    }
    return false;
  }

  logout(): void {
    if (!this.isBrowser) return;

    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser) return false;

    const token = localStorage.getItem(this.TOKEN_KEY);

    if (!token) {
      return false;
    }

    return this.isTokenValid(token);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;

    return localStorage.getItem(this.TOKEN_KEY);
  }

  private generateFakeJWT(username: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: username,
      name: username,
      iat: Date.now(),
      exp: Date.now() + (24 * 60 * 60 * 1000)
    }));
    const signature = btoa('fake-signature');
    return `${header}.${payload}.${signature}`;
  }

  private isTokenValid(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return false;
      }

      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Date.now();

      if(payload.exp && payload.exp < currentTime) {
        return false;
      }

      return true;
    } catch(error) {
      return false;
    }
  }

  getUserInfo(): any {
    if (!this.isBrowser) return null;

    const token = this.getToken();
    if(!token) {
      return null;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        username: payload.name,
        sub: payload.sub
      };
    } catch(error) {
      return null;
    }
  }
}
