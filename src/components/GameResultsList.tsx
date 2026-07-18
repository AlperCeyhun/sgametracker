"use client";

import React from "react";
import { SimplePCGame } from "@/types/game.types";
import {
  GAME_RESULTS_EMPTY_VALUE,
  GAME_RESULTS_GENRES_LABEL,
  GAME_RESULTS_RELEASED_LABEL,
} from "@/utils/constants";
import { useSavedGames } from "@/hooks/useSavedGames";

type GameResultsListProps = {
  games: SimplePCGame[];
};

type GameCardProps = {
  game: SimplePCGame;
  isSaved: boolean;
  onToggleSave: (gameId: number) => void;
};

function getScoreColor(metacritic: number | null) {
  if (metacritic == null) {
    return "bg-gray-600";
  }

  if (metacritic >= 80) {
    return "bg-green-700";
  }

  if (metacritic >= 60) {
    return "bg-yellow-700";
  }

  return "bg-red-700";
}

function GameCover({ game }: { game: SimplePCGame }) {
  return (
    <div className="shrink-0">
      <img
        src={game.backgroundImage}
        alt={game.name}
        className="h-30 w-55 rounded-lg object-cover"
      />
    </div>
  );
}

function GameScoreBadge({ metacritic }: { metacritic: number | null }) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold text-white ${getScoreColor(metacritic)}`}
    >
      ⭐ {metacritic ?? GAME_RESULTS_EMPTY_VALUE}
    </span>
  );
}

function GameMetaInfo({ game }: { game: SimplePCGame }) {
  return (
    <div className="space-y-1 text-gray-300">
      <p>
        <span className="font-semibold text-white">{GAME_RESULTS_RELEASED_LABEL}</span>{" "}
        {game.released}
      </p>

      <p>
        <span className="font-semibold text-white">{GAME_RESULTS_GENRES_LABEL}</span>{" "}
        {game.genres.length ? game.genres.join(", ") : GAME_RESULTS_EMPTY_VALUE}
      </p>
    </div>
  );
}

function GameCard({ game, isSaved, onToggleSave }: GameCardProps) {
  return (
    <div className="flex gap-4 rounded-xl border border-gray-700 bg-gray-900 p-4">
      <GameCover game={game} />

      <div className="flex-1">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h2 className="min-w-0 flex-1 wrap-break-word text-2xl font-bold text-white">
            {game.name}
          </h2>

          <div className="flex flex-col items-end gap-2">
            <GameScoreBadge metacritic={game.metacritic} />
          </div>
        </div>

        <div className="flex flex-col items-end">
          <button
            type="button"
            onClick={() => onToggleSave(game.id)}
            aria-label={
              isSaved
                ? `Remove ${game.name} from library`
                : `Add ${game.name} to library`
            }
            className={`inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2.5 text-[15px] font-semibold text-white shadow-lg transition-none ${
              isSaved
                ? "bg-red-600/95 shadow-[0_0_18px_rgba(220,38,38,0.45)]"
                : "bg-green-600/95 shadow-[0_0_18px_rgba(34,197,94,0.45)]"
            }`}
          >
            {isSaved ? "Remove" : "Add"}
          </button>
        </div>

        <GameMetaInfo game={game} />
      </div>
    </div>
  );
}

export default function GameResultsList({ games }: GameResultsListProps) {
  const { toggleSavedGame, isSaved } = useSavedGames();

  return (
    <div className="grid gap-4">
      {games.map((game) => (
        <GameCard
          key={game.id}
          game={game}
          isSaved={isSaved(game.id)}
          onToggleSave={toggleSavedGame}
        />
      ))}
    </div>
  );
}