import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationService } from './location.service';
import { Location, LocationResponse, LocationFilters } from '../../shared/models/location.model';
import { environment } from '../../../environments/environment';

describe('LocationService', () => {
  let service: LocationService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/location`;

  const mockLocation: Location = {
    id: 1,
    name: 'Earth (C-137)',
    type: 'Planet',
    dimension: 'Dimension C-137',
    residents: [
      'https://rickandmortyapi.com/api/character/1',
      'https://rickandmortyapi.com/api/character/2'
    ],
    url: 'https://rickandmortyapi.com/api/location/1',
    created: '2017-11-10T12:42:04.162Z'
  };

  const mockLocationResponse: LocationResponse = {
    info: {
      count: 126,
      pages: 7,
      next: 'https://rickandmortyapi.com/api/location?page=2',
      prev: null
    },
    results: [mockLocation]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationService]
    });
    service = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocations', () => {
    it('should return locations for page 1', () => {
      service.getLocations(1).subscribe((response) => {
        expect(response).toEqual(mockLocationResponse);
        expect(response.results.length).toBe(1);
        expect(response.results[0].name).toBe('Earth (C-137)');
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLocationResponse);
    });

    it('should use default page 1 if no page provided', () => {
      service.getLocations().subscribe();

      const req = httpMock.expectOne(`${apiUrl}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLocationResponse);
    });
  });

  describe('getLocationById', () => {
    it('should return a single location by id', () => {
      service.getLocationById(1).subscribe((location) => {
        expect(location).toEqual(mockLocation);
        expect(location.id).toBe(1);
        expect(location.name).toBe('Earth (C-137)');
      });

      const req = httpMock.expectOne(`${apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLocation);
    });
  });

  describe('getMultipleLocations', () => {
    it('should return multiple locations by ids', () => {
      const mockLocations = [
        mockLocation,
        { ...mockLocation, id: 2, name: 'Citadel of Ricks' }
      ];

      service.getMultipleLocations([1, 2]).subscribe((locations) => {
        expect(locations).toEqual(mockLocations);
        expect(locations.length).toBe(2);
      });

      const req = httpMock.expectOne(`${apiUrl}/1,2`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLocations);
    });
  });

  describe('getLocationsWithFilters', () => {
    it('should return filtered locations with name filter', () => {
      const filters: LocationFilters = { name: 'Earth' };

      service.getLocationsWithFilters(filters, 1).subscribe((response) => {
        expect(response).toEqual(mockLocationResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}?page=1&name=Earth`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLocationResponse);
    });

    it('should return filtered locations with multiple filters', () => {
      const filters: LocationFilters = {
        name: 'Earth',
        type: 'Planet',
        dimension: 'Dimension C-137'
      };

      service.getLocationsWithFilters(filters, 1).subscribe((response) => {
        expect(response).toEqual(mockLocationResponse);
      });

      const req = httpMock.expectOne(
        `${apiUrl}?page=1&name=Earth&type=Planet&dimension=Dimension%20C-137`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockLocationResponse);
    });

    it('should handle empty filters', () => {
      const filters: LocationFilters = {};

      service.getLocationsWithFilters(filters, 1).subscribe();

      const req = httpMock.expectOne(`${apiUrl}?page=1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockLocationResponse);
    });
  });
});
