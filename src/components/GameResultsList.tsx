"use client";

import React, { useEffect, useState } from "react";
import { SimplePCGame } from "@/types/game.types";

type GameResultsListProps = {
  games: SimplePCGame[];
};

const STORAGE_KEY = "saved-game-ids";

export default function GameResultsList({ games }: GameResultsListProps) {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

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

      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds));

      return nextIds;
    });
  };

  return (
    <div className="grid gap-4">
      {games.map((game) => {
        const isSaved = savedIds.includes(game.id);

        const scoreColor =
          game.metacritic == null
            ? "bg-gray-500"
            : game.metacritic >= 80
            ? "bg-green-600"
            : game.metacritic >= 60
            ? "bg-yellow-600"
            : "bg-red-600";

        return (
          <div
            key={game.id}
            className="flex gap-4 rounded-xl border border-gray-700 bg-gray-900 p-4"
          >
            <div className="group relative shrink-0">
              <img
                src={game.backgroundImage}
                alt={game.name}
                className="h-30 w-55 rounded-lg object-cover"
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSavedGame(game.id);
                }}
                aria-label={isSaved ? `Remove ${game.name}` : `Save ${game.name}`}
                className={`absolute top-2.5 right-2.5 flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-white backdrop-blur-md transition-all duration-200
                  ${
                    isSaved
                      ? "bg-red-600/70 shadow-[0_0_18px_rgba(220,38,38,0.45)] opacity-100"
                      : "bg-green-600/70 shadow-[0_0_18px_rgba(34,197,94,0.45)] opacity-0 -translate-y-1 group-hover:translate-y-0 group-hover:opacity-100"
                  }`}
              >
                {isSaved ? "✕" : "✓"}
              </button>
            </div>

            <div className="flex-1">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="min-w-0 flex-1 wrap-break-word text-2xl font-bold text-white">
                {game.name}
                </h2>

                <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-bold text-white ${scoreColor}`}>
                ⭐ {game.metacritic ?? "N/A"}
                </span>
              </div>

              <div className="space-y-1 text-gray-300">
                <p>
                  <span className="font-semibold text-white">Released:</span>{" "}
                  {game.released}
                </p>

                <p>
                  <span className="font-semibold text-white flex-col">Genres:</span>{" "}
                  {game.genres.length ? game.genres.join(", ") : "N/A"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}