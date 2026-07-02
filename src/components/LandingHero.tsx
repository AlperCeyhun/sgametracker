"use client";

import Link from "next/link";
import React, { useState } from "react";
import GameLibrary from "@/components/GameLibrary";
import {
  LANDING_HERO_BUTTON_LABEL,
  LANDING_HERO_DEFAULT_SEARCH_PATH,
  LANDING_HERO_PLACEHOLDER,
  LANDING_HERO_QUERY_PARAM,
  LANDING_HERO_SAMPLE_LINK_LABEL,
  LANDING_HERO_SAMPLE_SEARCH_PATH,
} from "@/utils/constants";

type LandingHeroProps = {
  onSearchSubmit?: string;
  apiKey?: string;
};

type SearchFormProps = {
  action: string;
};

function SearchForm({ action }: SearchFormProps) {
  return (
    <form action={action} method="get" className="flex w-full gap-3">
      <input
        type="text"
        name={LANDING_HERO_QUERY_PARAM}
        placeholder={LANDING_HERO_PLACEHOLDER}
        className="flex-1 rounded-lg border border-gray-600 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95"
      >
        {LANDING_HERO_BUTTON_LABEL}
      </button>
    </form>
  );
}

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

      <aside
        className={`fixed top-0 left-0 z-20 h-full w-80 max-w-[85vw] border-r border-gray-800 bg-gray-950/95 p-4 shadow-2xl backdrop-blur transition-transform duration-300 ${
          isLibraryOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-3">
          <h2 className="text-lg font-semibold">Saved Games</h2>
        </div>

        <GameLibrary apiKey={apiKey} />
      </aside>

      <main className="mx-auto max-w-5xl px-8 py-16">
        <SearchForm action={onSearchSubmit} />
        <SampleSearchLink />
      </main>
    </div>
  );
}