# SGAMETRACKER

A modern Next.js app for discovering PC games from RAWG, saving favorites locally, and browsing them from a library sidebar.

## Features

- Search for PC games from the RAWG API
- Browse results with pagination
- Browse latest game relases
- Save and remove games from a local library
- View your saved games in a sidebar from both the landing page and search page
- Responsive game cards with score badges and genre/release info
- Update saved game status between played/playing/will play

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel

## Live Demo

You can also view the deployed app here:

- https://sgametracker.vercel.app

## Project Notes

- Saved games are stored in browser local storage under the `saved-game-ids` key.
- The library sidebar can be opened from the landing page and the search results page.
- If no RAWG API key is provided, the app will show the relevant fallback message instead of loading live data.

### Where are CRUD operations

- Adding to library `CREATES` a array using localStorage for games.
  <img width="688" height="193" alt="image" src="https://github.com/user-attachments/assets/bc6d8373-8447-4dae-92fc-8acd4f59f8fc" />

- Can `UPDATE` Game status between 3 different values on the same array.

  <img width="301" height="568" alt="image" src="https://github.com/user-attachments/assets/7ce0a7ab-9adb-446b-b050-711da7567703" />

- Can `DELETE` from saved games library with X button.

  <img width="327" height="423" alt="image" src="https://github.com/user-attachments/assets/9dcc5ac3-7e3a-48e5-9b5b-cf96185f337b" />

- `READ` incoming data from rawg API and LocalStorage


  
