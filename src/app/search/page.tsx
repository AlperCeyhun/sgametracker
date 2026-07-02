import React from "react";
import { getSimplePCGames } from "@/services/gameService";
import GameSearchPage from "@/components/GameSearchPage";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/utils/constants";

type SearchPageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const apiKey = process.env.RAWG_API_KEY;
  const searchQuery = (params?.query ?? "").trim() || "witcher";
  const currentPage = Math.max(
    DEFAULT_PAGE,
    Number(params?.page ?? DEFAULT_PAGE) || DEFAULT_PAGE
  );

  const games = apiKey
    ? await getSimplePCGames(apiKey, searchQuery, DEFAULT_PAGE_SIZE, currentPage)
    : [];

  const buildPageHref = (page: number) => {
    const queryParams = new URLSearchParams({
      query: searchQuery,
      page: String(page),
    });

    return `/search?${queryParams.toString()}`;
  };

  return (
    <GameSearchPage
      apiKey={apiKey}
      searchQuery={searchQuery}
      currentPage={currentPage}
      games={games}
      previousHref={buildPageHref(Math.max(DEFAULT_PAGE, currentPage - 1))}
      nextHref={buildPageHref(currentPage + 1)}
    />
  );
}
