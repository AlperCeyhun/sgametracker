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

type LandingHeroProps = {
  onSearchSubmit?: string;
  apiKey?: string;
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
}: LandingHeroProps) {
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

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
      </main>
    </div>
  );
}
