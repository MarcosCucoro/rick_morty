import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocationFilters, LocationResponse } from '../../shared/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/location`;

  getLocations(page: number = 1): Observable<LocationResponse> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<LocationResponse>(this.apiUrl, { params });
  }

  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${id}`);
  }

  getMultipleLocations(ids: number[]): Observable<Location[]> {
    const idsString = ids.join(',');
    return this.http.get<Location[]>(`${this.apiUrl}/${idsString}`);
  }

  getLocationsWithFilters(filters: LocationFilters, page: number = 1): Observable<LocationResponse> {
    let params = new HttpParams().set('page', page.toString());

    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.type) {
      params = params.set('type', filters.type);
    }
    if (filters.dimension) {
      params = params.set('dimension', filters.dimension);
    }

    return this.http.get<LocationResponse>(this.apiUrl, { params });
  }
}
