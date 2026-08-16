import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

// Mirrors api/tmdb/[...path].js so `vite dev` works standalone without the
// Vercel CLI. Dev-only (configureServer never runs during `vite build`) —
// production still goes through the real serverless function.
function tmdbDevProxy(apiKey) {
  return {
    name: 'tmdb-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/tmdb', async (req, res) => {
        const requestUrl = new URL(req.url, 'http://localhost');
        const segments = requestUrl.pathname.replace(/^\/+/, '');
        const upstream = new URL(`${TMDB_BASE_URL}/${segments}`);
        requestUrl.searchParams.forEach((value, key) => upstream.searchParams.set(key, value));
        upstream.searchParams.set('api_key', apiKey);

        try {
          const tmdbResponse = await fetch(upstream);
          const data = await tmdbResponse.json();
          res.statusCode = tmdbResponse.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: 'Failed to reach TMDB' }));
        }
      });
    },
  };
}

// Mirrors api/omdb/index.js for local dev, same reasoning as tmdbDevProxy.
function omdbDevProxy(apiKey) {
  return {
    name: 'omdb-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/omdb', async (req, res) => {
        const requestUrl = new URL(req.url, 'http://localhost');
        const upstream = new URL(OMDB_BASE_URL);
        requestUrl.searchParams.forEach((value, key) => upstream.searchParams.set(key, value));
        upstream.searchParams.set('apikey', apiKey);

        try {
          const omdbResponse = await fetch(upstream);
          const data = await omdbResponse.json();
          res.statusCode = omdbResponse.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch {
          res.statusCode = 502;
          res.end(JSON.stringify({ error: 'Failed to reach OMDb' }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tmdbDevProxy(env.TMDB_API_KEY), omdbDevProxy(env.OMDB_API_KEY)],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router'],
            'vendor-bootstrap': ['react-bootstrap', 'bootstrap'],
            'vendor-motion': ['motion'],
            'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
            'vendor-lottie': ['lottie-react'],
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: './src/setupTests.js',
    },
  };
})
