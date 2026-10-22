// Every value comes from the deployment's environment (the Vercel project's variables).
// Only the names live in git: see .env.example.
// ESTATE_PAT_<OWNER> is one read-only token per client repo owner (lib/repos.ts).
// SESSIONS_TOKEN is the bearer the session-ledger hook and scripts/sessions.mjs present to
// app/api/sessions (the same value as DESK_SESSIONS_TOKEN where they run).
export type EnvName =
  | "DATABASE_URL"
  | "NEON_AUTH_BASE_URL"
  | "NEON_AUTH_COOKIE_SECRET"
  | "DESK_PAT"
  | "SESSIONS_TOKEN"
  | "ESTATE_PAT"
  | `ESTATE_PAT_${string}`;

export function env(name: EnvName): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set in this environment`);
  return value;
}

// A variable that only one cell needs (an ESTATE_PAT): unset gives null, and the caller says so
// in that cell instead of failing the page.
export function maybeEnv(name: EnvName): string | null {
  return process.env[name] || null;
}
