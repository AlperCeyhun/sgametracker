"use client";

import React, { useEffect, useState } from "react";
import { getGameDetails } from "@/services/gameDetailService";
import { SavedGame, SavedGameStatus, SimplePCGame } from "@/types/game.types";
import {
  GAME_RESULTS_EMPTY_VALUE,
  GAME_RESULTS_GENRES_LABEL,
  GAME_RESULTS_RELEASED_LABEL,
  SAVED_GAMES_STORAGE_KEY,
} from "@/utils/constants";

type GameLibraryProps = {
  apiKey?: string;
};

const SAVED_GAME_STATUS_ORDER: SavedGameStatus[] = ["will play", "playing", "played"];

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

function getNextStatus(current: SavedGameStatus) {
  const currentIndex = SAVED_GAME_STATUS_ORDER.indexOf(current);
  const nextIndex = (currentIndex + 1) % SAVED_GAME_STATUS_ORDER.length;

  return SAVED_GAME_STATUS_ORDER[nextIndex];
}

function getStatusStyle(status: SavedGameStatus) {
  switch (status) {
    case "will play":
      return "border border-violet-300 bg-violet-200/90 text-violet-900 hover:bg-violet-300/90";

    case "playing":
      return "border border-amber-300 bg-amber-200/90 text-amber-900 hover:bg-amber-300/90";

    case "played":
      return "border border-emerald-300 bg-emerald-200/90 text-emerald-900 hover:bg-emerald-300/90";
  }
}

function GameLibraryCard({
  game,
  status,
  onRemove,
  onStatusToggle,
}: {
  game: SimplePCGame;
  status: SavedGameStatus;
  onRemove: (gameId: number) => void;
  onStatusToggle: (gameId: number) => void;
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

      <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
        <button
          type="button"
          onClick={() => onStatusToggle(game.id)}
          title="Change play status"
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium capitalize tracking-wide transition-all duration-200 hover:scale-[1.03] active:scale-100 ${getStatusStyle(status)}`}
        >
          <span className="h-2 w-2 rounded-full bg-current opacity-70" />
          {status}
        </button>

        <button
          type="button"
          onClick={() => onRemove(game.id)}
          aria-label={`Remove ${game.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600/70 text-lg font-bold text-white shadow-[0_0_18px_rgba(220,38,38,0.45)] transition duration-200 hover:bg-red-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default function GameLibrary({ apiKey }: GameLibraryProps) {
  const [savedGames, setSavedGames] = useState<SavedGame[]>([]);
  const [games, setGames] = useState<SimplePCGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const parseSavedGames = (stored: string | null) => {
    if (!stored) {
      return [];
    }

    try {
      const parsed = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map((item) => {
          if (typeof item === "number") {
            return { id: item, status: "will play" as SavedGameStatus };
          }

          if (
            item &&
            typeof item === "object" &&
            typeof (item as any).id === "number"
          ) {
            const status = (item as any).status;

            if (status === "played" || status === "playing" || status === "will play") {
              return { id: (item as any).id, status };
            }
          }

          return null;
        })
        .filter((item): item is SavedGame => item !== null);
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem(SAVED_GAMES_STORAGE_KEY);
    const normalized = parseSavedGames(stored);
    setSavedGames(normalized);
  }, []);

  const removeSavedGame = (gameId: number) => {
    const nextSavedGames = savedGames.filter((saved) => saved.id !== gameId);
    setSavedGames(nextSavedGames);
    localStorage.setItem(SAVED_GAMES_STORAGE_KEY, JSON.stringify(nextSavedGames));
    setGames((current) => current.filter((game) => game.id !== gameId));
  };

  const toggleSavedGameStatus = (gameId: number) => {
    const nextSavedGames = savedGames.map((saved) =>
      saved.id === gameId ? { ...saved, status: getNextStatus(saved.status) } : saved
    );

    setSavedGames(nextSavedGames);
    localStorage.setItem(SAVED_GAMES_STORAGE_KEY, JSON.stringify(nextSavedGames));
  };

  useEffect(() => {
    if (!savedGames.length) {
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

    let isActive = true;

    const loadGames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const details = await Promise.all(
          savedGames.map(async (saved) => {
            try {
              return await getGameDetails(apiKey ?? "", saved.id);
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

        if (!loadedGames.length && savedGames.length > 0) {
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
  }, [apiKey, savedGames]);

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
      {games.map((game) => {
        const saved = savedGames.find((item) => item.id === game.id);

        return (
          <GameLibraryCard
            key={game.id}
            game={game}
            status={saved?.status ?? "will play"}
            onRemove={removeSavedGame}
            onStatusToggle={toggleSavedGameStatus}
          />
        );
      })}
    </div>
  );
}
