import { fetchRawgGames } from "../api/rawgClient";
import { RawgResponse } from "../types/rawg.types";
import { SimplePCGame } from "../types/game.types";
import {
  PC_PLATFORM_SLUG,
  DEFAULT_LIMIT,
  DEFAULT_IMAGE_FALLBACK,
} from "../utils/constants";

export async function getSimplePCGames(
  apiKey: string,
  searchTerm: string,
  limit?: number
): Promise<SimplePCGame[]> {
  if (!apiKey) {
    throw new Error("RAWG API key is missing.");
  }

  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(
    searchTerm
  )}`;

  const data: RawgResponse = await fetchRawgGames(url);
  const displayLimit = limit ?? DEFAULT_LIMIT;

  return data.results
    .filter((game) =>
      game.parent_platforms?.some(
        (p) => p.platform.slug === PC_PLATFORM_SLUG
      )
    )
    .slice(0, displayLimit)
    .map((game) => ({
      id: game.id,
      name: game.name,
      released: game.released ?? "TBA",
      backgroundImage:
        game.background_image ?? DEFAULT_IMAGE_FALLBACK,
      metacritic: game.metacritic,
      genres: game.genres?.map((g) => g.name) ?? [],
    }));
}