"use client";

import React, { useEffect, useState } from "react";
import { getGameDetails } from "@/services/gameDetailService";
import { SimplePCGame } from "@/types/game.types";
import {
  GAME_RESULTS_EMPTY_VALUE,
  GAME_RESULTS_GENRES_LABEL,
  GAME_RESULTS_RELEASED_LABEL,
  SAVED_GAMES_STORAGE_KEY,
} from "@/utils/constants";

type GameLibraryProps = {
  apiKey?: string;
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

function GameLibraryCard({
  game,
  onRemove,
}: {
  game: SimplePCGame;
  onRemove: (gameId: number) => void;
}) {
  return (
    <div className="group relative flex gap-3 rounded-lg border border-gray-800 bg-gray-900/80 p-3 transition duration-200 hover:bg-gray-800/90">
      <div className="shrink-0">
        <img
          src={game.backgroundImage}
          alt={game.name}
          className="h-20 w-28 rounded-md object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 text-sm font-semibold text-white line-clamp-2">
            {game.name}
          </h3>

          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold text-white ${getScoreColor(game.metacritic)}`}
          >
            ⭐ {game.metacritic ?? GAME_RESULTS_EMPTY_VALUE}
          </span>
        </div>

        <div className="space-y-0.5 text-xs text-gray-300">
          <p>
            <span className="font-semibold text-white">{GAME_RESULTS_RELEASED_LABEL}</span>{" "}
            {game.released}
          </p>

          <p className="truncate">
            <span className="font-semibold text-white">{GAME_RESULTS_GENRES_LABEL}</span>{" "}
            {game.genres.length ? game.genres.join(", ") : GAME_RESULTS_EMPTY_VALUE}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(game.id)}
        aria-label={`Remove ${game.name}`}
        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-600/70 text-lg font-bold text-white opacity-0 shadow-[0_0_18px_rgba(220,38,38,0.45)] transition-all duration-200 group-hover:opacity-100"
      >
        ✕
      </button>
    </div>
  );
}

export default function GameLibrary({ apiKey }: GameLibraryProps) {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [games, setGames] = useState<SimplePCGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_GAMES_STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          const normalizedIds = parsed
            .map((id) => Number(id))
            .filter((id): id is number => Number.isFinite(id));

          setSavedIds(normalizedIds);
          return;
        }
      }

      setSavedIds([]);
    } catch {
      setSavedIds([]);
    }
  }, []);

  const removeSavedGame = (gameId: number) => {
    const nextIds = savedIds.filter((id) => id !== gameId);

    setSavedIds(nextIds);
    localStorage.setItem(SAVED_GAMES_STORAGE_KEY, JSON.stringify(nextIds));
    setGames((current) => current.filter((game) => game.id !== gameId));
  };

  useEffect(() => {
    if (!savedIds.length) {
      setGames([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    if (!apiKey) {
      setGames([]);
      setIsLoading(false);
      setError("Set RAWG_API_KEY to load your saved games.");
      return;
    }

    if (!apiKey) {
      setGames([]);
      setIsLoading(false);
      setError("Set RAWG_API_KEY to load your saved games.");
      return;
    }

    let isActive = true;

    const loadGames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const details = await Promise.all(
          savedIds.map(async (id) => {
            try {
              return await getGameDetails(apiKey ?? "", id);
            } catch {
              return null;
            }
          })
        );

        if (!isActive) {
          return;
        }

        const loadedGames = details.filter(
          (game): game is SimplePCGame => game !== null
        );

        setGames(loadedGames);

        if (!loadedGames.length && savedIds.length > 0) {
          setError("Unable to load your saved games right now.");
        } else {
          setError(null);
        }
      } catch {
        if (isActive) {
          setError("Unable to load your saved games right now.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadGames();

    return () => {
      isActive = false;
    };
  }, [apiKey, savedIds]);

  if (isLoading) {
    return <div className="text-gray-300">Loading your game library...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  if (!games.length) {
    return <div className="text-gray-300">No saved games yet.</div>;
  }

  return (
    <div className="grid gap-3">
      {games.map((game) => (
        <GameLibraryCard key={game.id} game={game} onRemove={removeSavedGame} />
      ))}
    </div>
  );
}
