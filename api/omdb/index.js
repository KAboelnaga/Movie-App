import { isAllowedOrigin } from '../_utils.js';

const OMDB_BASE_URL = 'https://www.omdbapi.com/';

export default async function handler(req, res) {
  if (!isAllowedOrigin(req)) {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const url = new URL(OMDB_BASE_URL);
  for (const [key, value] of Object.entries(req.query)) {
    url.searchParams.set(key, value);
  }
  url.searchParams.set('apikey', process.env.OMDB_API_KEY);

  try {
    const omdbResponse = await fetch(url);
    const data = await omdbResponse.json();
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');
    res.status(omdbResponse.status).json(data);
  } catch {
    res.status(502).json({ error: 'Failed to reach OMDb' });
  }
}
