import Link from "next/link";
import React from "react";

type LandingHeroProps = {
  onSearchSubmit?: string;
};

export default function LandingHero({
  onSearchSubmit = "/search",
}: LandingHeroProps) {
  return (
    <main className="mx-auto max-w-5xl px-8 py-8">
      <form
        action={onSearchSubmit}
        method="get"
        className="flex w-full gap-3"
      >
        <input
          type="text"
          name="query"
          placeholder="Search games..."
          className="flex-1 rounded-lg border border-gray-600 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
        />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 active:scale-95"
        >
          Search
        </button>
      </form>

      <p className="mt-4">
        <Link
          href="/search?query=witcher"
          className="text-blue-400 transition hover:text-blue-300 hover:underline"
        >
          Browse a sample search
        </Link>
      </p>
    </main>
  );
}