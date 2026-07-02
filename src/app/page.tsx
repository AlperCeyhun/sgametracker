import React from "react";
import LandingHero from "@/components/LandingHero";

export default function Home() {
  const apiKey = process.env.RAWG_API_KEY;

  return <LandingHero apiKey={apiKey} />;
}