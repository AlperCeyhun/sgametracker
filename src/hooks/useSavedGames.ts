"use client";

import { useEffect, useState } from "react";
import { SavedGame, SavedGameStatus } from "@/types/game.types";
import { SAVED_GAMES_STORAGE_KEY } from "@/utils/constants";

const subscribers = new Set<() => void>();
let savedGamesStore: SavedGame[] | null = null;

function isValidSavedGameStatus(value: unknown): value is SavedGameStatus {
  return value === "played" || value === "playing" || value === "will play";
}

function parseSavedGames(stored: string | null): SavedGame[] {
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
          typeof (item as any).id === "number" &&
          isValidSavedGameStatus((item as any).status)
        ) {
          return { id: (item as any).id, status: (item as any).status };
        }

        return null;
      })
      .filter((item): item is SavedGame => item !== null);
  } catch {
    return [];
  }
}

function loadSavedGames(): SavedGame[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(SAVED_GAMES_STORAGE_KEY);
  const parsed = parseSavedGames(stored);
  savedGamesStore = parsed;
  return parsed;
}

function saveSavedGames(next: SavedGame[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(SAVED_GAMES_STORAGE_KEY, JSON.stringify(next));
  }

  savedGamesStore = next;
  subscribers.forEach((callback) => callback());
}

function getSavedGamesFromStore(): SavedGame[] {
  if (savedGamesStore === null) {
    return loadSavedGames();
  }

  return savedGamesStore;
}

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

function getNextStatus(current: SavedGameStatus): SavedGameStatus {
  const order: SavedGameStatus[] = ["will play", "playing", "played"];
  const index = order.indexOf(current);
  const nextIndex = (index + 1) % order.length;
  return order[nextIndex];
}

function toggleSavedGame(gameId: number): SavedGame[] {
  const current = getSavedGamesFromStore();
  const next: SavedGame[] = current.some((item) => item.id === gameId)
    ? current.filter((item) => item.id !== gameId)
    : [...current, { id: gameId, status: "will play" as SavedGameStatus }];

  saveSavedGames(next);
  return next;
}

function removeSavedGame(gameId: number): SavedGame[] {
  const current = getSavedGamesFromStore();
  const next = current.filter((item) => item.id !== gameId);
  saveSavedGames(next);
  return next;
}

function toggleSavedGameStatus(gameId: number): SavedGame[] {
  const current = getSavedGamesFromStore();
  const next = current.map((item) =>
    item.id === gameId ? { ...item, status: getNextStatus(item.status) } : item
  );

  saveSavedGames(next);
  return next;
}

export function useSavedGames() {
  const [savedGames, setSavedGames] = useState<SavedGame[]>(getSavedGamesFromStore());

  useEffect(() => {
    if (savedGamesStore === null) {
      setSavedGames(loadSavedGames());
    }

    const unsubscribe = subscribe(() => {
      setSavedGames(getSavedGamesFromStore());
    });

    return () => unsubscribe();
  }, []);

  return {
    savedGames,
    toggleSavedGame,
    removeSavedGame,
    toggleSavedGameStatus,
    isSaved: (gameId: number) => getSavedGamesFromStore().some((item) => item.id === gameId),
    getStatus: (gameId: number) => getSavedGamesFromStore().find((item) => item.id === gameId)?.status,
  };
}
