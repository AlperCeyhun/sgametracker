import { fetchRawgGames } from "../api/rawgClient";
import { SimplePCGame } from "../types/game.types";
import { RawgGame } from "../types/rawg.types";
import { DEFAULT_IMAGE_FALLBACK } from "../utils/constants";

export async function getGameDetails(
  apiKey: string,
  gameId: number | string
): Promise<SimplePCGame> {
  if (!apiKey) {
    throw new Error("RAWG API key is missing.");
  }

  const url = `https://api.rawg.io/api/games/${encodeURIComponent(String(gameId))}?key=${apiKey}`;
  const data = (await fetchRawgGames(url)) as RawgGame;

  return {
    id: data.id,
    name: data.name,
    released: data.released ?? "TBA",
    backgroundImage: data.background_image ?? DEFAULT_IMAGE_FALLBACK,
    metacritic: data.metacritic,
    genres: data.genres?.map((genre) => genre.name) ?? [],
  };
}
