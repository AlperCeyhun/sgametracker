import React from "react";
import { DEFAULT_PAGE } from "@/utils/constants";

type GameSearchBarProps = {
  searchQuery: string;
};

export default function GameSearchBar({ searchQuery }: GameSearchBarProps) {
  return (
    <form
      action="/"
      method="get"
      style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}
    >
      <input
        name="query"
        defaultValue={searchQuery}
        placeholder="Search games"
        style={{
          flex: 1,
          padding: "0.8rem 1rem",
          borderRadius: "8px",
          border: "1px solid #444",
          backgroundColor: "#111827",
          color: "#f9fafb",
        }}
      />
      <input type="hidden" name="page" value={DEFAULT_PAGE} />
      <button
        type="submit"
        style={{
          padding: "0.8rem 1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        Search
      </button>
    </form>
  );
}
