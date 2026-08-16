const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Soft same-origin check: browsers can't forge Origin/Referer from client-side JS,
// so this blocks other websites' frontends from calling our proxy directly. It does
// NOT stop a determined caller using curl/Postman with spoofed headers — this is a
// deterrent against casual quota abuse, not an auth system.
function isAllowedOrigin(req) {
  const source = req.headers.origin || req.headers.referer;
  if (!source) return true;
  try {
    return new URL(source).host === req.headers.host;
  } catch {
    return false;
  }
}

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
