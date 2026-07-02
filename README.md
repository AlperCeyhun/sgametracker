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

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root:
   ```bash
   RAWG_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

## Live Demo

You can also view the deployed app here:

- https://sgametracker.vercel.app

## Available Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production build
- `npm run lint` - run ESLint

## Project Notes

- Saved games are stored in browser local storage under the `saved-game-ids` key.
- The library sidebar can be opened from the landing page and the search results page.
- If no RAWG API key is provided, the app will show the relevant fallback message instead of loading live data.