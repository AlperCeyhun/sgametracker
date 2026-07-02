import React from "react";
import Link from "next/link";

type LandingHeroProps = {
  onSearchSubmit?: string;
};

export default function LandingHero({ onSearchSubmit = "/search" }: LandingHeroProps) {
  return (
    <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>

      <form action={onSearchSubmit} method="get" style={{ display: "flex", gap: "0.75rem", width: "100%"}}>
        <input
          name="query"
          placeholder="Search games"
          style={{
            flex: 1,
            padding: "0.8rem 1rem",
            borderRadius: "8px",
            border: "1px solid #444",
            backgroundColor: "#ffffff",
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
