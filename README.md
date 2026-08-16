# Movie App

A React + Vite app for browsing now-playing movies and popular TV shows, backed by [TMDB](https://www.themoviedb.org/documentation/api). Built with Redux Toolkit, React Router, Bootstrap, and [Motion](https://motion.dev).

## Features

- Browse now-playing movies / popular TV shows, with pagination
- Search movies and TV shows
- Movie/show details: TMDB/IMDb/Rotten Tomatoes ratings, genres, overview, clickable cast (with filmography), and trailer playback
- Watchlist (favorites), persisted to `localStorage`
- Light/dark theme toggle
- Multi-language UI (English, Arabic, French, Chinese)
- TMDB API key is never shipped to the browser — all requests go through a serverless proxy

## Setup

```bash
npm install
```

Copy `src/.env.example` to `.env` at the project root and fill in:

| Variable | Where it's used | Notes |
| --- | --- | --- |
| `TMDB_API_KEY` | server-only, read by `api/tmdb/[...path].js` | **No** `VITE_` prefix — this keeps it out of the client bundle. Get one from [TMDB settings](https://www.themoviedb.org/settings/api). |
| `VITE_IMAGE_BASE_URL` | client, e.g. `https://image.tmdb.org/t/p/w500` | Public CDN prefix, safe to expose. |
| `OMDB_API_KEY` | server-only, read by `api/omdb/index.js` | Optional — powers the IMDb/Rotten Tomatoes ratings on the details page. Without it those two ratings just don't show (TMDB's own rating still does). Free key at [omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx). |

## Development

```bash
npm run dev
```

In production (Vercel), TMDB calls go through a serverless function at `/api/tmdb/*` (`api/tmdb/[...path].js`) so the API key never reaches the browser. `npm run dev` mirrors that same behavior via a Vite dev-server plugin (see `vite.config.js`), so local development works standalone — no Vercel CLI required.

## Scripts

```bash
npm run dev       # start Vite dev server
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # eslint
npm run test      # run the Vitest suite
```

## Deployment

Deployed on Vercel. Set `TMDB_API_KEY` and `VITE_IMAGE_BASE_URL` as environment variables in the Vercel project settings (not in `vercel.json`).
