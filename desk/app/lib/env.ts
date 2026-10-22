// Every value comes from the deployment's environment (the Vercel project's variables).
// Only the names live in git: see .env.example.
// ESTATE_PAT_<OWNER> is one read-only token per client repo owner (lib/repos.ts).
// DEPLOY_HOOK_URL is the Vercel deploy hook for main, which the sync pill posts to
// (lib/refresh.ts); unset, the pill says so and Jamie redeploys from Vercel.
export type EnvName =
  | "DATABASE_URL"
  | "NEON_AUTH_BASE_URL"
  | "NEON_AUTH_COOKIE_SECRET"
  | "DESK_PAT"
  | "DEPLOY_HOOK_URL"
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
