const OMDB_BASE_URL = 'https://www.omdbapi.com/';

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
