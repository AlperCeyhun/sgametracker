"use client";

import Link from "next/link";
import React, { useState } from "react";
import LibrarySidebar from "@/components/LibrarySidebar";
import GameSearchBar from "@/components/GameSearchBar";
import {
  LANDING_HERO_DEFAULT_SEARCH_PATH,
  LANDING_HERO_SAMPLE_LINK_LABEL,
  LANDING_HERO_SAMPLE_SEARCH_PATH,
} from "@/utils/constants";
import { SavedGameStatus, SimplePCGame } from "@/types/game.types";
import { useSavedGames } from "@/hooks/useSavedGames";


type LandingHeroProps = {
  onSearchSubmit?: string;
  apiKey?: string;
  highestRated: SimplePCGame[];
  newReleases: SimplePCGame[];
};


function SampleSearchLink() {
  return (
    <p className="mt-4">
      <Link
        href={LANDING_HERO_SAMPLE_SEARCH_PATH}
        className="text-blue-400 transition hover:text-blue-300 hover:underline"
      >
        {LANDING_HERO_SAMPLE_LINK_LABEL}
      </Link>
    </p>
  );
}

export default function LandingHero({
  onSearchSubmit = LANDING_HERO_DEFAULT_SEARCH_PATH,
  apiKey,
  highestRated,
  newReleases,
}: LandingHeroProps) {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const { savedGames, toggleSavedGame, isSaved } = useSavedGames();

  return (
    <div className="relative min-h-screen bg-gray-950 text-white">
      <button
        type="button"
        onClick={() => setIsLibraryOpen((open) => !open)}
        className="fixed top-4 left-4 z-30 rounded-lg border border-gray-700 bg-gray-900/90 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-gray-800"
      >
        {isLibraryOpen ? "Close Library" : "Open Library"}
      </button>

      <LibrarySidebar
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        apiKey={apiKey}
      />

      <main className="mx-auto max-w-5xl px-8 py-16">
        <GameSearchBar action={onSearchSubmit} />
        <SampleSearchLink />
        <h2 className="mt-12 mb-4 text-2xl font-bold">
           New Releases
        </h2>

        <div className="grid grid-cols-5 gap-4">
          {newReleases.map((game) => {
            return (
              <div key={game.id}>
                <div className="group relative overflow-visible rounded-lg">
                  <img
                    src={game.backgroundImage}
                    alt={game.name}
                    className="h-48 w-full rounded-lg object-cover transition duration-200 group-hover:scale-105"
                  />

                  <button
                    type="button"
                    onClick={() => toggleSavedGame(game.id)}
                    aria-label={
                      isSaved(game.id)
                        ? `Remove ${game.name} from library`
                        : `Add ${game.name} to library`
                    }
                    className={`absolute inset-x-3 bottom-3 flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-all duration-200 ${
                      isSaved(game.id)
                        ? "bg-red-600/90 hover:bg-red-700"
                        : "bg-green-600/90 hover:bg-green-700"
                    } opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 hover:scale-105`}
                  >
                    {isSaved(game.id) ? "Remove from library" : "Add to library"}
                  </button>
                </div>

                <p className="mt-2 text-sm">{game.name}</p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}