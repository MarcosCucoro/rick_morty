import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Episode } from '../../shared/models/episode.model';
import { EpisodeService } from '../../core/services/episode.service';
import { SearchService } from '../../core/services/search.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-episodes-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './episodes-list.html',
  styleUrl: './episodes-list.scss',
})
export class EpisodesList {
  private episodeService = inject(EpisodeService);
  private searchService = inject(SearchService);
  private destroyRef = inject(DestroyRef);

  // ViewChild para o elemento de scroll
  scrollTrigger = viewChild<ElementRef>('scrollTrigger');

  // Signals para gerenciar estado
  episodes = signal<Episode[]>([]);
  loading = signal<boolean>(false);
  loadingMore = signal<boolean>(false);
  error = signal<string | null>(null);
  hasMore = signal<boolean>(true);
  searchTerm = signal<string>('');

  // Paginação
  private currentPage = 1;
  private totalPages = 1;

  ngOnInit(): void {
    this.loadEpisodes();
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
        this.searchEpisodes(term);
      });
  }

  private searchEpisodes(term: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage = 1;

    if (!term.trim()) {
      // Se a busca estiver vazia, carrega todos os Characters
      this.loadEpisodes();
      return;
    }

    this.episodeService.getEpisodesWithFilters({ name: term }, 1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.episodes.set(response.results);
          this.totalPages = response.info.pages;
          this.hasMore.set(this.currentPage < this.totalPages);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Erro na busca:', err);
          if (err.status === 404) {
            this.episodes.set([]);
            this.error.set('No episodes found with that name.');
          } else {
            this.error.set('Error searching episodes. Please try again.');
          }
          this.loading.set(false);
        }
      });
  }

    private setupInfiniteScroll(): void {
    const trigger = this.scrollTrigger();
    if (!trigger) {
      console.warn('[EpisodeList] Scroll trigger element not found');
      setTimeout(() => this.setupInfiniteScroll(), 500);
      return;
    }

    console.log('[EpisodeList] Setting up IntersectionObserver');

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        console.log('[EpisodeList] Intersection event:', {
          isIntersecting: first.isIntersecting,
          loading: this.loading(),
          loadingMore: this.loadingMore(),
          hasMore: this.hasMore()
        });

        if (first.isIntersecting && !this.loading() && !this.loadingMore() && this.hasMore()) {
          console.log('[EpisodeList] Triggering loadMoreepisodes');
          this.loadMoreEpisodes();
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

  loadEpisodes(): void {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage = 1;

    this.episodeService.getEpisodes(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          console.log('Total de episode: ', response);
          this.episodes.set(response.results);
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

  loadMoreEpisodes(): void {
        if (this.currentPage >= this.totalPages) {
      this.hasMore.set(false);
      return;
    }

    this.loadingMore.set(true);
    this.currentPage++;

    const searchTerm = this.searchTerm();
    const request$ = searchTerm
      ? this.episodeService.getEpisodesWithFilters({ name: searchTerm }, this.currentPage)
      : this.episodeService.getEpisodes(this.currentPage);

    request$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          // Adiciona os novos Characters aos existentes
          this.episodes.update(current => [...current, ...response.results]);
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
      this.searchEpisodes(searchTerm);
    } else {
      this.loadEpisodes();
    }
  }

}
