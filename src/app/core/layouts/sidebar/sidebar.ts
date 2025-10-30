import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly title = 'Rick & Morty';
  protected themeService = inject(ThemeService);
  protected searchService = inject(SearchService);
  private authService = inject(AuthService);

  searchValue = '';

  protected menuItems = [
    { label: 'Characters', icon: 'bi-people-fill', route: '/character' },
    { label: 'Locations', icon: 'bi-geo-alt-fill', route: '/location' },
    { label: 'Episodes', icon: 'bi-film', route: '/episode' }
  ];

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  closeOffcanvas(): void {
    const offcanvasElement = document.getElementById('sidebarMenu');
    if (offcanvasElement) {
      const bsOffcanvas = (window as any).bootstrap?.Offcanvas?.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
  }

  onSearchChange(value: string): void {
    this.searchService.setSearchTerm(value);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.searchService.clearSearch();
  }

  get userInfo() {
    return this.authService.getUserInfo();
  }

  onSignout(): void {
    this.authService.logout();
  }
}
