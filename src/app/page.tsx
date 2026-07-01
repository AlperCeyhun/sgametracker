import React from "react";
import { getSimplePCGames } from "@/services/gameService";

export default async function Home() {
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    throw new Error("RAWG API key is missing");
  }

  const games = await getSimplePCGames(apiKey, "witcher");

  return (
    <main style={{ padding: "2rem" }}>
      <h1>🎮 My Game Feed</h1>

      <div style={{ display: "grid", gap: "1rem" }}>
        {games.map((game) => (
          <div
            key={game.id}
            style={{
              border: "1px solid #333",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <h2>{game.name}</h2>
            <p>Released: {game.released}</p>
            <p>Metacritic: {game.metacritic ?? "N/A"}</p>
            <p>Genres: {game.genres.join(", ")}</p>

            <img
              src={game.backgroundImage}
              alt={game.name}
              width={200}
              style={{ borderRadius: "6px" }}
            />
          </div>
        ))}
      </div>
    </main>
  );
}