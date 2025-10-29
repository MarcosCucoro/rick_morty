import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { LocationService } from '../../core/services/location.service';
import { SearchService } from '../../core/services/search.service';
import { Location } from '../../shared/models/location.model';

@Component({
  selector: 'app-location-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './location-list.html',
  styleUrl: './location-list.scss',
})
export class LocationList implements OnInit, AfterViewInit {
  private locationService = inject(LocationService);
  private searchService = inject(SearchService);
  private destroyRef = inject(DestroyRef);

  // ViewChild para o elemento de scroll
  scrollTrigger = viewChild<ElementRef>('scrollTrigger');

  // Signals para gerenciar estado
  locations = signal<Location[]>([]);
  loading = signal<boolean>(false);
  loadingMore = signal<boolean>(false);
  error = signal<string | null>(null);
  hasMore = signal<boolean>(true);
  searchTerm = signal<string>('');

  // Paginação
  private currentPage = 1;
  private totalPages = 1;

  ngOnInit(): void {
    this.loadLocations();
    this.setupSearchListener();
  }

  ngAfterViewInit(): void {
    this.setupInfiniteScroll();
  }

  private setupSearchListener(): void {
    this.searchService.search$
      .pipe(
        debounceTime(500), // Espera 500ms após o usuário parar de digitar
        distinctUntilChanged(), // Só emite se o valor mudou
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((term) => {
        this.searchTerm.set(term);
        this.searchLocations(term);
      });
  }

  private searchLocations(term: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage = 1;

    if (!term.trim()) {
      // Se a busca estiver vazia, carrega todos os Characters
      this.loadLocations();
      return;
    }

    this.locationService.getLocationsWithFilters({ name: term }, 1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.locations.set(response.results);
          this.totalPages = response.info.pages;
          this.hasMore.set(this.currentPage < this.totalPages);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Erro na busca:', err);
          if (err.status === 404) {
            this.locations.set([]);
            this.error.set('No locations found with that name.');
          } else {
            this.error.set('Error searching locations. Please try again.');
          }
          this.loading.set(false);
        }
      });
  }

  private setupInfiniteScroll(): void {
    const trigger = this.scrollTrigger();
    if (!trigger) {
      console.warn('[LocationList] Scroll trigger element not found');
      setTimeout(() => this.setupInfiniteScroll(), 500);
      return;
    }

    console.log('[LocationList] Setting up IntersectionObserver');

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        console.log('[LocationList] Intersection event:', {
          isIntersecting: first.isIntersecting,
          loading: this.loading(),
          loadingMore: this.loadingMore(),
          hasMore: this.hasMore()
        });

        if (first.isIntersecting && !this.loading() && !this.loadingMore() && this.hasMore()) {
          console.log('[LocationList] Triggering loadMoreLocations');
          this.loadMoreLocations();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '300px'
      }
    );

    observer.observe(trigger.nativeElement);

    // Cleanup quando o componente for destruído
    this.destroyRef.onDestroy(() => {
      observer.disconnect();
    });
  }

  loadLocations(): void {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage = 1;

    this.locationService.getLocations(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.locations.set(response.results);
          this.totalPages = response.info.pages;
          this.hasMore.set(this.currentPage < this.totalPages);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Erro ao carregar Characters:', err);
          this.error.set('Erro ao carregar Characters. Tente novamente.');
          this.loading.set(false);
        }
      });
  }

  loadMoreLocations(): void {
    if (this.currentPage >= this.totalPages) {
      this.hasMore.set(false);
      return;
    }

    this.loadingMore.set(true);
    this.currentPage++;

    const searchTerm = this.searchTerm();
    const request$ = searchTerm
      ? this.locationService.getLocationsWithFilters({ name: searchTerm }, this.currentPage)
      : this.locationService.getLocations(this.currentPage);

    request$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          // Adiciona os novos Characters aos existentes
          this.locations.update(current => [...current, ...response.results]);
          this.hasMore.set(this.currentPage < this.totalPages);
          this.loadingMore.set(false);
        },
        error: (err) => {
          console.error('Erro ao carregar mais Characters:', err);
          this.currentPage--; // Volta para a página anterior em caso de erro
          this.loadingMore.set(false);
        }
      });
  }

  retry(): void {
    const searchTerm = this.searchTerm();
    if (searchTerm) {
      this.searchLocations(searchTerm);
    } else {
      this.loadLocations();
    }
  }


}
