import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { SearchService } from '../../services/search.service';

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

  // Search value
  searchValue = '';

  // Links do menu com ícones do Bootstrap Icons
  protected menuItems = [
    { label: 'Characters', icon: 'bi-people-fill', route: '/character' },
    { label: 'Locations', icon: 'bi-geo-alt-fill', route: '/location' },
    { label: 'Episodes', icon: 'bi-film', route: '/episode' }
  ];

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  closeOffcanvas(): void {
    // Fecha o offcanvas programaticamente
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
}
