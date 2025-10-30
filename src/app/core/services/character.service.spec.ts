import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';
import { Character, CharacterResponse, CharacterFilters } from '../../shared/models/character.model';
import { environment } from '../../../environments/environment';

describe('CharacterService', () => {
  let service: CharacterService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/character`;

  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
      url: 'https://rickandmortyapi.com/api/location/1'
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3'
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [
      'https://rickandmortyapi.com/api/episode/1',
      'https://rickandmortyapi.com/api/episode/2'
    ],
    url: 'https://rickandmortyapi.com/api/character/1',
    created: '2017-11-04T18:48:46.250Z'
  };

  const mockCharacterResponse: CharacterResponse = {
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character?page=2',
      prev: null
    },
    results: [mockCharacter]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharacterService]
    });
    service = TestBed.inject(CharacterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCharacters', () => {
    it('should return characters for page 1', () => {
      service.getCharacters(1).subscribe((response) => {
        expect(response).toEqual(mockCharacterResponse);
        expect(response.results.length).toBe(1);
        expect(response.results[0].name).toBe('Rick Sanchez');
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacterResponse);
    });

    it('should use default page 1 if no page provided', () => {
      service.getCharacters().subscribe();

      const req = httpMock.expectOne(`${apiUrl}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacterResponse);
    });
  });

  describe('getCharacterById', () => {
    it('should return a single character by id', () => {
      service.getCharacterById(1).subscribe((character) => {
        expect(character).toEqual(mockCharacter);
        expect(character.id).toBe(1);
        expect(character.name).toBe('Rick Sanchez');
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacter);
    });
  });

  describe('getMultipleCharacters', () => {
    it('should return multiple characters by ids', () => {
      const mockCharacters = [mockCharacter, { ...mockCharacter, id: 2, name: 'Morty Smith' }];

      service.getMultipleCharacters([1, 2]).subscribe((characters) => {
        expect(characters).toEqual(mockCharacters);
        expect(characters.length).toBe(2);
      });

      const req = httpMock.expectOne(`${apiUrl}/1,2`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacters);
    });
  });

  describe('getCharactersWithFilters', () => {
    it('should return filtered characters with name filter', () => {
      const filters: CharacterFilters = { name: 'Rick' };

      service.getCharactersWithFilters(filters, 1).subscribe((response) => {
        expect(response).toEqual(mockCharacterResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&name=Rick`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacterResponse);
    });

    it('should return filtered characters with multiple filters', () => {
      const filters: CharacterFilters = {
        name: 'Rick',
        status: 'alive',
        species: 'Human',
        gender: 'male'
      };

      service.getCharactersWithFilters(filters, 1).subscribe((response) => {
        expect(response).toEqual(mockCharacterResponse);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=1&name=Rick&status=alive&species=Human&gender=male`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacterResponse);
    });

    it('should handle empty filters', () => {
      const filters: CharacterFilters = {};

      service.getCharactersWithFilters(filters, 1).subscribe();

      const req = httpMock.expectOne(`${apiUrl}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockCharacterResponse);
    });
  });
});
