import { createNeonAuth, type NeonAuth } from "@neondatabase/auth/next/server";
import { env } from "./env";

let instance: NeonAuth | undefined;

// Neon Auth's Next.js server: sign-in, sign-out, the session, and the middleware in
// proxy.ts. Built on first use, not at import: the CI build has no variables, so a missing
// one fails the request that needs it, never the build. Session cookies are lax (the SDK's
// default), so a link opened from a mail or a chat arrives signed in.
export function auth(): NeonAuth {
  return (instance ??= createNeonAuth({
    baseUrl: env("NEON_AUTH_BASE_URL"),
    cookies: { secret: env("NEON_AUTH_COOKIE_SECRET") },
  }));
}
