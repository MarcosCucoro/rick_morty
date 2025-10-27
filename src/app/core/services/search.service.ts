import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchTerm = signal<string>('');

  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();

  setSearchTerm(term: string): void {
    this.searchTerm.set(term);
    this.searchSubject.next(term);
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.searchSubject.next('');
  }
}
