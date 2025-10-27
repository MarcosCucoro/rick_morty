import { CommonModule } from '@angular/common';
import { Component, inject, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  protected readonly title = 'Rick and Morty Universe';
  protected themeService = inject(ThemeService);
  protected searchService = inject(SearchService);

  // ViewChild para acessar o sidenav
  sidenav = viewChild.required<MatSidenav>('sidenav');

  // Search value
  searchValue = '';

  // Links do menu
  protected menuItems = [
    { label: 'Characters', icon: 'people', route: '/characters' },
    { label: 'Locations', icon: 'location_on', route: '/locations' },
    { label: 'Episodes', icon: 'movie', route: '/episodes' }
  ];

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  protected toggleSidenav(): void {
    this.sidenav().toggle();
  }

  onSearchChange(value: string): void {
    this.searchService.setSearchTerm(value);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.searchService.clearSearch();
  }
}
