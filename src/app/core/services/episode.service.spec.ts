import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EpisodeService } from './episode.service';
import { Episode, EpisodeResponse, EpisodeFilters } from '../../shared/models/episode.model';
import { environment } from '../../../environments/environment';

describe('EpisodeService', () => {
  let service: EpisodeService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/episode`;

  const mockEpisode: Episode = {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [
      'https://rickandmortyapi.com/api/character/1',
      'https://rickandmortyapi.com/api/character/2'
    ],
    url: 'https://rickandmortyapi.com/api/episode/1',
    created: '2017-11-10T12:56:33.798Z'
  };

  const mockEpisodeResponse: EpisodeResponse = {
    info: {
      count: 51,
      pages: 3,
      next: 'https://rickandmortyapi.com/api/episode?page=2',
      prev: null
    },
    results: [mockEpisode]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpisodeService]
    });
    service = TestBed.inject(EpisodeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getEpisodes', () => {
    it('should return episodes for page 1', () => {
      service.getEpisodes(1).subscribe((response) => {
        expect(response).toEqual(mockEpisodeResponse);
        expect(response.results.length).toBe(1);
        expect(response.results[0].name).toBe('Pilot');
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEpisodeResponse);
    });

    it('should use default page 1 if no page provided', () => {
      service.getEpisodes().subscribe();

      const req = httpMock.expectOne(`${apiUrl}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEpisodeResponse);
    });
  });

  describe('getEpisodeById', () => {
    it('should return a single episode by id', () => {
      service.getEpisodeById(1).subscribe((episode) => {
        expect(episode).toEqual(mockEpisode);
        expect(episode.id).toBe(1);
        expect(episode.name).toBe('Pilot');
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEpisode);
    });
  });

  describe('getMultipleEpisodes', () => {
    it('should return multiple episodes by ids', () => {
      const mockEpisodes = [
        mockEpisode,
        { ...mockEpisode, id: 2, name: 'Lawnmower Dog', episode: 'S01E02' }
      ];

      service.getMultipleEpisodes([1, 2]).subscribe((episodes) => {
        expect(episodes).toEqual(mockEpisodes);
        expect(episodes.length).toBe(2);
      });

      const req = httpMock.expectOne(`${apiUrl}/1,2`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEpisodes);
    });
  });

  describe('getEpisodesWithFilters', () => {
    it('should return filtered episodes with name filter', () => {
      const filters: EpisodeFilters = { name: 'Pilot' };

      service.getEpisodesWithFilters(filters, 1).subscribe((response) => {
        expect(response).toEqual(mockEpisodeResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&name=Pilot`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEpisodeResponse);
    });

    it('should return filtered episodes with episode code filter', () => {
      const filters: EpisodeFilters = { episode: 'S01E01' };

      service.getEpisodesWithFilters(filters, 1).subscribe((response) => {
        expect(response).toEqual(mockEpisodeResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&episode=S01E01`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEpisodeResponse);
    });

    it('should return filtered episodes with multiple filters', () => {
      const filters: EpisodeFilters = {
        name: 'Pilot',
        episode: 'S01E01'
      };

      service.getEpisodesWithFilters(filters, 1).subscribe((response) => {
        expect(response).toEqual(mockEpisodeResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&name=Pilot&episode=S01E01`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEpisodeResponse);
    });

    it('should handle empty filters', () => {
      const filters: EpisodeFilters = {};

      service.getEpisodesWithFilters(filters, 1).subscribe();

      const req = httpMock.expectOne(`${apiUrl}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockEpisodeResponse);
    });
  });
});
