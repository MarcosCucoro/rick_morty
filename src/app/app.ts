import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Sidebar } from "./core/layouts/sidebar/sidebar";
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showSidebar = signal(false);

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.updateSidebarVisibility(this.router.url);

      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: any) => {
        this.updateSidebarVisibility(event.url);
      });
    }
  }

  private updateSidebarVisibility(url: string): void {
    this.showSidebar.set(!url.includes('/login'));
  }
}
