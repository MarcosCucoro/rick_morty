import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { CharacterResponse, Character, CharacterFilters } from "../../shared/models/character.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CharacterService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/character`;

  getCharacters(page: number = 1): Observable<CharacterResponse> {
    const params = new HttpParams().set("page", page.toString());
    return this.http.get<CharacterResponse>(this.apiUrl, { params });
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  getMultipleCharacters(ids: number[]): Observable<Character[]> {
    const idsString = ids.join(",");
    return this.http.get<Character[]>(`${this.apiUrl}/${idsString}`);
  }

  getCharactersWithFilters(filters: CharacterFilters, page: number = 1): Observable<CharacterResponse> {
    let params = new HttpParams().set("page", page.toString());

    if (filters.name) {
      params = params.set("name", filters.name);
    }
    if (filters.status) {
      params = params.set("status", filters.status);
    }
    if (filters.species) {
      params = params.set("species", filters.species);
    }
    if (filters.type) {
      params = params.set("type", filters.type);
    }
    if (filters.gender) {
      params = params.set("gender", filters.gender);
    }

    return this.http.get<CharacterResponse>(this.apiUrl, { params });
  }
}
