import { isAllowedOrigin } from '../_utils.js';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export default async function handler(req, res) {
  if (!isAllowedOrigin(req)) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const { path, ...params } = req.query;
  const segments = Array.isArray(path) ? path.join('/') : path;

  const url = new URL(`${TMDB_BASE_URL}/${segments}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set('api_key', process.env.TMDB_API_KEY);

  try {
    const tmdbResponse = await fetch(url);
    const data = await tmdbResponse.json();
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    res.status(tmdbResponse.status).json(data);
  } catch {
    res.status(502).json({ error: 'Failed to reach TMDB' });
  }
}
