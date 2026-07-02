import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>🎮 Game Search</h1>
      <p style={{ marginBottom: "1.5rem", color: "#9ca3af" }}>
        Enter a game title to search for PC games.
      </p>

      <form action="/search" method="get" style={{ display: "flex", gap: "0.75rem" }}>
        <input
          name="query"
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

      <p style={{ marginTop: "1rem" }}>
        <Link href="/search?query=witcher" style={{ color: "#93c5fd" }}>
          Browse a sample search
        </Link>
      </p>
    </main>
  );
}