export async function fetchRawgGames(url: string) {
  const res = await fetch(url, {
    next: { revalidate: 86400 },
  });

  if (!res.ok) {
    throw new Error(`RAWG API request failed: ${res.status}`);
  }

  return res.json();
}