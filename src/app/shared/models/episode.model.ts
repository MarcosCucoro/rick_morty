export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodeInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface EpisodeResponse {
  info: EpisodeInfo;
  results: Episode[];
}

export interface EpisodeFilters {
  name?: string;
  episode?: string;
}
