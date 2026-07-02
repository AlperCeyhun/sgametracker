import React from "react";
import { SimplePCGame } from "@/types/game.types";

type GameResultsListProps = {
  games: SimplePCGame[];
};

export default function GameResultsList({ games }: GameResultsListProps) {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {games.map((game) => (
        <div
          key={game.id}
          style={{
            border: "1px solid #333",
            padding: "1rem",
            borderRadius: "8px",
            backgroundColor: "#111827",
          }}
        >
          <h2 style={{ marginTop: 0 }}>{game.name}</h2>
          <p>Released: {game.released}</p>
          <p>Metacritic: {game.metacritic ?? "N/A"}</p>
          <p>Genres: {game.genres.join(", ") || "N/A"}</p>

          <img
            src={game.backgroundImage}
            alt={game.name}
            width={200}
            style={{ borderRadius: "6px", marginTop: "0.5rem" }}
          />
        </div>
      ))}
    </div>
  );
}
