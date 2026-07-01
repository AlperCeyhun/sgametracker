export interface RawgPlatform {
  platform: {
    slug: string;
  };
}

export interface RawgGenre {
  name: string;
}

export interface RawgGame {
  id: number;
  name: string;
  released: string | null;
  background_image: string | null;
  metacritic: number | null;
  parent_platforms?: RawgPlatform[];
  genres?: RawgGenre[];
}

export interface RawgResponse {
  results: RawgGame[];
}