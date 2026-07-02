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
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid #333",
        borderRadius: "12px",
        backgroundColor: "#111827",
        alignItems: "flex-start",
      }}
    >
      <img
        src={game.backgroundImage}
        alt={game.name}
        style={{
          width: "220px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
          flexShrink: 0,
        }}
      />

      <div style={{ flex: 1 }}>
        <h2
          style={{
            margin: 0,
            marginBottom: "0.75rem",
            fontSize: "1.6rem",
            fontWeight: "bold",
          }}
        >
          {game.name}
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            color: "#d1d5db",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>Released:</strong> {game.released}
          </p>

          <p style={{ margin: 0 }}>
            <strong>Metacritic:</strong> {game.metacritic ?? "N/A"}
          </p>

          <p style={{ margin: 0 }}>
            <strong>Genres:</strong>{" "}
            {game.genres.length ? game.genres.join(", ") : "N/A"}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
  );
}
