export interface SimplePCGame {
  id: number;
  name: string;
  released: string;
  backgroundImage: string;
  metacritic: number | null;
  genres: string[];
}