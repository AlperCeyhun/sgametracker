import React from "react";
import { SimplePCGame } from "@/types/game.types";
import GameResultsList from "@/components/GameResultsList";
import GameSearchBar from "@/components/GameSearchBar";
import PaginationControls from "@/components/PaginationControls";
import { DEFAULT_PAGE } from "@/utils/constants";

type GameSearchPageProps = {
  apiKey?: string;
  searchQuery: string;
  currentPage: number;
  games: SimplePCGame[];
  previousHref: string;
  nextHref: string;
};

export default function GameSearchPage({
  apiKey,
  searchQuery,
  currentPage,
  games,
  previousHref,
  nextHref,
}: GameSearchPageProps) {
  return (
    <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>🎮 My Game Feed</h1>
      <p style={{ marginBottom: "1.25rem", color: "#9ca3af" }}>
        Search for PC games and browse through pages of results.
      </p>

      <GameSearchBar searchQuery={searchQuery} />

      {!apiKey ? (
        <p style={{ color: "#fbbf24" }}>Set RAWG_API_KEY to load live game data.</p>
      ) : games.length === 0 ? (
        <p>No PC games found for “{searchQuery}”.</p>
      ) : (
        <>
          <GameResultsList games={games} />

          <PaginationControls
            currentPage={currentPage}
            previousHref={previousHref}
            nextHref={nextHref}
          />
        </>
      )}
    </main>
  );
}
