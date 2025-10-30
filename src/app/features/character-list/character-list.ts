import { Component, inject, OnInit, signal, ElementRef, viewChild, AfterViewInit, DestroyRef } from '@angular/core';
import { CharacterService } from '../../core/services/character.service';
import { Character } from '../../shared/models/character.model';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SearchService } from '../../core/services/search.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatChipsModule, RouterLink],
  templateUrl: './character-list.html',
  styleUrl: './character-list.scss',
})
export class CharacterList implements OnInit, AfterViewInit {
  private characterService = inject(CharacterService);
  private searchService = inject(SearchService);
  private destroyRef = inject(DestroyRef);

  scrollTrigger = viewChild<ElementRef>('scrollTrigger');

  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);
  loadingMore = signal<boolean>(false);
  error = signal<string | null>(null);
  hasMore = signal<boolean>(true);
  searchTerm = signal<string>('');

  private currentPage = 1;
  private totalPages = 1;

  ngOnInit(): void {
    this.loadCharacters();
    this.setupSearchListener();
  }

  ngAfterViewInit(): void {
    this.setupInfiniteScroll();
  }

  private setupSearchListener(): void {
    this.searchService.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((term) => {
        this.searchTerm.set(term);
        this.searchCharacters(term);
      });
  }

  private searchCharacters(term: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage = 1;

    if (!term.trim()) {
      this.loadCharacters();
      return;
    }

    this.characterService.getCharactersWithFilters({ name: term }, 1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.characters.set(response.results);
          this.totalPages = response.info.pages;
          this.hasMore.set(this.currentPage < this.totalPages);
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Erro na busca:', err);
          if (err.status === 404) {
            this.characters.set([]);
            this.error.set('No characters found with that name.');
          } else {
            this.error.set('Error searching characters. Please try again.');
          }
          this.loading.set(false);
        }
      });
  }

  private setupInfiniteScroll(): void {
    const trigger = this.scrollTrigger();
    if (!trigger) {
      console.warn('[CharacterList] Scroll trigger element not found');
      setTimeout(() => this.setupInfiniteScroll(), 500);
      return;
    }

    console.log('[CharacterList] Setting up IntersectionObserver');

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        console.log('[CharacterList] Intersection event:', {
          isIntersecting: first.isIntersecting,
          loading: this.loading(),
          loadingMore: this.loadingMore(),
          hasMore: this.hasMore(),
          currentPage: this.currentPage,
          totalPages: this.totalPages
        });

        if (first.isIntersecting && !this.loading() && !this.loadingMore() && this.hasMore()) {
          console.log('[CharacterList] Triggering loadMoreCharacters');
          this.loadMoreCharacters();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '300px'
      }
    );

    observer.observe(trigger.nativeElement);
    console.log('[CharacterList] Observer attached to element');

    this.destroyRef.onDestroy(() => {
      console.log('[CharacterList] Cleaning up observer');
      observer.disconnect();
    });
  }

  loadCharacters(): void {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage = 1;

    this.characterService.getCharacters(1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.characters.set(response.results);
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

  loadMoreCharacters(): void {
    if (this.currentPage >= this.totalPages) {
      this.hasMore.set(false);
      return;
    }

    this.loadingMore.set(true);
    this.currentPage++;

    const searchTerm = this.searchTerm();
    const request$ = searchTerm
      ? this.characterService.getCharactersWithFilters({ name: searchTerm }, this.currentPage)
      : this.characterService.getCharacters(this.currentPage);

    request$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.characters.update(current => [...current, ...response.results]);
          this.hasMore.set(this.currentPage < this.totalPages);
          this.loadingMore.set(false);
        },
        error: (err) => {
          console.error('Erro ao carregar mais Characters:', err);
          this.currentPage--;
          this.loadingMore.set(false);
        }
      });
  }

  retry(): void {
    const searchTerm = this.searchTerm();
    if (searchTerm) {
      this.searchCharacters(searchTerm);
    } else {
      this.loadCharacters();
    }
  }
}
