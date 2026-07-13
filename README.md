# SGAMETRACKER

A modern Next.js app for discovering PC games from RAWG, saving favorites locally, and browsing them from a library sidebar.

## Features

- Search for PC games from the RAWG API
- Browse results with pagination
- Save and remove games from a local library
- View your saved games in a sidebar from both the landing page and search page
- Responsive game cards with score badges and genre/release info

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Live Demo

You can also view the deployed app here:

- https://sgametracker.vercel.app

## Project Notes

- Saved games are stored in browser local storage under the `saved-game-ids` key.
- The library sidebar can be opened from the landing page and the search results page.
- If no RAWG API key is provided, the app will show the relevant fallback message instead of loading live data.