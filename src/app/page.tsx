import LandingHero from "@/components/LandingHero";
import {
  getHighestRatedPCGames,
  getNewReleasePCGames,
} from "@/services/gameService";

export default async function Home() {
  const apiKey = process.env.RAWG_API_KEY;

  const [highestRated, newReleases] = apiKey
    ? await Promise.all([
        getHighestRatedPCGames(apiKey, 5),
        getNewReleasePCGames(apiKey, 5),
      ])
    : [[], []];

  return (
    <LandingHero
      apiKey={apiKey}
      highestRated={highestRated}
      newReleases={newReleases}
    />
  );
}