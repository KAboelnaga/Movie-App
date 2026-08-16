// Soft same-origin check: browsers can't forge Origin/Referer from client-side JS,
// so this blocks other websites' frontends from calling our proxy directly. It does
// NOT stop a determined caller using curl/Postman with spoofed headers — this is a
// deterrent against casual quota abuse, not an auth system.
export function isAllowedOrigin(req) {
  const source = req.headers.origin || req.headers.referer;
  if (!source) return true;
  try {
    return new URL(source).host === req.headers.host;
  } catch {
    return false;
  }
}
