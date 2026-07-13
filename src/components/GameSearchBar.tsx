import React from "react";
import {
  DEFAULT_PAGE,
  LANDING_HERO_BUTTON_LABEL,
  LANDING_HERO_PLACEHOLDER,
  LANDING_HERO_QUERY_PARAM,
} from "@/utils/constants";

type GameSearchBarProps = {
  searchQuery?: string;
  action?: string;
};

export default function GameSearchBar({
  searchQuery = "",
  action = "/search",
}: GameSearchBarProps) {
  return (
    <form action={action} method="get" className="mb-6 flex gap-3">
      <input
        name={LANDING_HERO_QUERY_PARAM}
        defaultValue={searchQuery}
        placeholder={LANDING_HERO_PLACEHOLDER}
        className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-gray-50 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
      />
      <input type="hidden" name="page" value={DEFAULT_PAGE} />
      <button
        type="submit"
        className="rounded-lg border-none bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        {LANDING_HERO_BUTTON_LABEL}
      </button>
    </form>
  );
}
