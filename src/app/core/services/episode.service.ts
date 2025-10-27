import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Episode, EpisodeFilters, EpisodeResponse } from '../../shared/models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/episode`;

  getEpisodes(page: number = 1): Observable<EpisodeResponse> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<EpisodeResponse>(this.apiUrl, { params });
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/${id}`);
  }

  getMultipleEpisodes(ids: number[]): Observable<Episode[]> {
    const idsString = ids.join(',');
    return this.http.get<Episode[]>(`${this.apiUrl}/${idsString}`);
  }

  getEpisodesWithFilters(filters: EpisodeFilters, page: number = 1): Observable<EpisodeResponse> {
    let params = new HttpParams().set('page', page.toString());

    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.episode) {
      params = params.set('episode', filters.episode);
    }

    return this.http.get<EpisodeResponse>(this.apiUrl, { params });
  }
}
