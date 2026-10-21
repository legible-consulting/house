// Every value comes from the deployment's environment (the Vercel project's variables).
// Only the names live in git: see .env.example.
export type EnvName = "DATABASE_URL" | "NEON_AUTH_BASE_URL" | "NEON_AUTH_COOKIE_SECRET" | "DESK_PAT" | "ESTATE_PAT";

export function env(name: EnvName): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not set in this environment`);
  return value;
}

// A variable that only one cell needs (ESTATE_PAT): unset gives null, and the caller says so
// in that cell instead of failing the page.
export function maybeEnv(name: EnvName): string | null {
  return process.env[name] || null;
}
