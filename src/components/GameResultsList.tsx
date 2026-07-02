"use client";

import React, { useEffect, useState } from "react";
import { SimplePCGame } from "@/types/game.types";
import {
  GAME_RESULTS_EMPTY_VALUE,
  GAME_RESULTS_GENRES_LABEL,
  GAME_RESULTS_RELEASED_LABEL,
  SAVED_GAMES_STORAGE_KEY,
} from "@/utils/constants";

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
    return "bg-gray-500";
  }

  if (metacritic >= 80) {
    return "bg-green-600";
  }

  if (metacritic >= 60) {
    return "bg-yellow-600";
  }

  return "bg-red-600";
}

function GameCover({ game, isSaved, onToggleSave }: GameCardProps) {
  return (
    <div className="group relative shrink-0">
      <img
        src={game.backgroundImage}
        alt={game.name}
        className="h-30 w-55 rounded-lg object-cover"
      />

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggleSave(game.id);
        }}
        aria-label={isSaved ? `Remove ${game.name}` : `Save ${game.name}`}
        className={`absolute top-2.5 right-2.5 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white backdrop-blur-md transition-all duration-200 ${
          isSaved
            ? "bg-red-600/70 shadow-[0_0_18px_rgba(220,38,38,0.45)]"
            : "bg-green-600/70 shadow-[0_0_18px_rgba(34,197,94,0.45)]"
        } opacity-0 -translate-y-1 group-hover:translate-y-0 group-hover:opacity-100`}
      >
        {isSaved ? "✕" : "✓"}
      </button>
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
      <GameCover game={game} isSaved={isSaved} onToggleSave={onToggleSave} />

      <div className="flex-1">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="min-w-0 flex-1 wrap-break-word text-2xl font-bold text-white">
            {game.name}
          </h2>

          <GameScoreBadge metacritic={game.metacritic} />
        </div>

        <GameMetaInfo game={game} />
      </div>
    </div>
  );
}

export default function GameResultsList({ games }: GameResultsListProps) {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_GAMES_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored) as number[];

        if (Array.isArray(parsed)) {
          setSavedIds(parsed);
        }
      }
    } catch {
      setSavedIds([]);
    }
  }, []);

  const toggleSavedGame = (gameId: number) => {
    setSavedIds((current) => {
      const nextIds = current.includes(gameId)
        ? current.filter((id) => id !== gameId)
        : [...current, gameId];

      localStorage.setItem(SAVED_GAMES_STORAGE_KEY, JSON.stringify(nextIds));

      return nextIds;
    });
  };

  return (
    <div className="grid gap-4">
      {games.map((game) => {
        const isSaved = savedIds.includes(game.id);

        return (
          <GameCard
            key={game.id}
            game={game}
            isSaved={isSaved}
            onToggleSave={toggleSavedGame}
          />
        );
      })}
    </div>
  );
}