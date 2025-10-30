import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService]
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty search term', () => {
    expect(service.searchTerm()).toBe('');
  });

  describe('setSearchTerm', () => {
    it('should update search term signal', () => {
      const testTerm = 'Rick';

      service.setSearchTerm(testTerm);

      expect(service.searchTerm()).toBe(testTerm);
    });

    it('should emit search term through observable', (done) => {
      const testTerm = 'Morty';

      service.search$.subscribe((term) => {
        expect(term).toBe(testTerm);
        done();
      });

      service.setSearchTerm(testTerm);
    });

    it('should handle multiple search term updates', () => {
      service.setSearchTerm('Rick');
      expect(service.searchTerm()).toBe('Rick');

      service.setSearchTerm('Morty');
      expect(service.searchTerm()).toBe('Morty');

      service.setSearchTerm('Summer');
      expect(service.searchTerm()).toBe('Summer');
    });
  });

  describe('clearSearch', () => {
    it('should clear search term to empty string', () => {
      service.setSearchTerm('Rick');

      service.clearSearch();

      expect(service.searchTerm()).toBe('');
    });

    it('should emit empty string through observable', (done) => {
      const emittedValues: string[] = [];

      service.search$.subscribe((term) => {
        emittedValues.push(term);

        if (emittedValues.length === 2) {
          expect(emittedValues[0]).toBe('Rick');
          expect(emittedValues[1]).toBe('');
          done();
        }
      });

      service.setSearchTerm('Rick');
      service.clearSearch();
    });
  });

  describe('search$ observable', () => {
    it('should emit values in sequence', () => {
      const emittedValues: string[] = [];

      service.search$.subscribe((term) => {
        emittedValues.push(term);
      });

      service.setSearchTerm('Rick');
      service.setSearchTerm('Morty');
      service.clearSearch();

      expect(emittedValues).toEqual(['Rick', 'Morty', '']);
    });

    it('should allow multiple subscribers', () => {
      const subscriber1Values: string[] = [];
      const subscriber2Values: string[] = [];

      service.search$.subscribe((term) => subscriber1Values.push(term));
      service.search$.subscribe((term) => subscriber2Values.push(term));

      service.setSearchTerm('Rick');

      expect(subscriber1Values).toEqual(['Rick']);
      expect(subscriber2Values).toEqual(['Rick']);
    });
  });
});
