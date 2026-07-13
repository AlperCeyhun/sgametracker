export interface SimplePCGame {
  id: number;
  name: string;
  released: string;
  backgroundImage: string;
  metacritic: number | null;
  genres: string[];
}

export type SavedGameStatus = "played" | "playing" | "will play";

export type SavedGame = {
  id: number;
  status: SavedGameStatus;
};