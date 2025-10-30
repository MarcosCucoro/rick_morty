import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Sidebar } from "./core/layouts/sidebar/sidebar";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  showSidebar = signal(false);

  constructor(private router: Router) {
    this.updateSidebarVisibility(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateSidebarVisibility(event.url);
    });
  }

  private updateSidebarVisibility(url: string): void {
    this.showSidebar.set(!url.includes('/login'));
  }
}
