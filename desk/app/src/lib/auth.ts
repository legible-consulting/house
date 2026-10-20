import { createAuthServer } from "@neondatabase/auth/server";
import type { APIContext } from "astro";
import { env } from "./env";

type Ctx = Pick<APIContext, "request" | "cookies" | "url">;

// One Neon Auth server per request. The SDK's RequestContext reads the request's cookies and
// writes Set-Cookie through Astro's cookie jar, so sign-in, sign-out and the signed session
// cache behave as they do under the Next.js adapter the SDK ships with.
export function authFor(ctx: Ctx) {
  return createAuthServer({
    baseUrl: env("NEON_AUTH_BASE_URL"),
    cookieSecret: env("NEON_AUTH_COOKIE_SECRET"),
    sameSite: "lax",
    context: () => ({
      getCookies: () => ctx.request.headers.get("cookie") ?? "",
      setCookie: (name, value, options) => {
        ctx.cookies.set(name, value, { ...options, path: options.path ?? "/" });
      },
      getHeader: (name) => ctx.request.headers.get(name),
      getOrigin: () => ctx.request.headers.get("origin") ?? ctx.url.origin,
      getFramework: () => "astro",
    }),
  });
}

export interface SessionUser {
  id: string;
  email: string;
  name?: string | null;
}

// The signed-in user from the Neon Auth session, or null.
export async function sessionUser(ctx: Ctx): Promise<SessionUser | null> {
  const { data } = await authFor(ctx).getSession();
  const user = (data as { user?: SessionUser } | null)?.user;
  return user?.email ? user : null;
}

// Only same-origin paths are safe redirect targets after sign-in.
export function safeNext(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}
