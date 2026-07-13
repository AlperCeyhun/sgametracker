import { fetchRawgGames } from "../api/rawgClient";
import { RawgResponse } from "../types/rawg.types";
import { SimplePCGame } from "../types/game.types";
import {
  PC_PLATFORM_SLUG,
  DEFAULT_LIMIT,
  DEFAULT_IMAGE_FALLBACK,
  DEFAULT_PAGE,
} from "../utils/constants";

function mapGames(data: RawgResponse, limit: number): SimplePCGame[] {
  return data.results
    .filter((game) =>
      game.parent_platforms?.some(
        (p) => p.platform.slug === PC_PLATFORM_SLUG
      )
    )
    .slice(0, limit)
    .map((game) => ({
      id: game.id,
      name: game.name,
      released: game.released ?? "TBA",
      backgroundImage: game.background_image ?? DEFAULT_IMAGE_FALLBACK,
      metacritic: game.metacritic,
      genres: game.genres?.map((g) => g.name) ?? [],
    }));
}

export async function getSimplePCGames(
  apiKey: string,
  searchTerm: string,
  limit?: number,
  page?: number
): Promise<SimplePCGame[]> {
  if (!apiKey) {
    throw new Error("RAWG API key is missing.");
  }

  const displayLimit = limit ?? DEFAULT_LIMIT;
  const currentPage = page ?? DEFAULT_PAGE;

  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(
    searchTerm
  )}&page=${currentPage}&page_size=${displayLimit}`;

  const data: RawgResponse = await fetchRawgGames(url);

  return mapGames(data, displayLimit);
}

export async function getHighestRatedPCGames(
  apiKey: string,
  limit?: number
): Promise<SimplePCGame[]> {
  if (!apiKey) {
    throw new Error("RAWG API key is missing.");
  }

  const displayLimit = limit ?? DEFAULT_LIMIT;
  const requestedPageSize = Math.max(displayLimit * 2, DEFAULT_LIMIT);

  const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-metacritic&page_size=${requestedPageSize}`;

  const data: RawgResponse = await fetchRawgGames(url);

  return mapGames(data, displayLimit);
}

export async function getNewReleasePCGames(
  apiKey: string,
  limit?: number
): Promise<SimplePCGame[]> {
  if (!apiKey) {
    throw new Error("RAWG API key is missing.");
  }

  const displayLimit = limit ?? DEFAULT_LIMIT;
  const requestedPageSize = Math.max(displayLimit * 2, DEFAULT_LIMIT);

  const today = new Date();
  const lastYear = new Date();
  lastYear.setFullYear(today.getFullYear() - 1);

  const start = lastYear.toISOString().split("T")[0];
  const end = today.toISOString().split("T")[0];

  const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=${start},${end}&ordering=-released&page_size=${requestedPageSize}`;

  const data: RawgResponse = await fetchRawgGames(url);

  return mapGames(data, displayLimit);
}