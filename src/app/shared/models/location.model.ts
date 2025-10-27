export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface LocationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface LocationResponse {
  info: LocationInfo;
  results: Location[];
}

export interface LocationFilters {
  name?: string;
  type?: string;
  dimension?: string;
}
