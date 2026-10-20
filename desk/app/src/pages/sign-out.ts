import type { APIRoute } from "astro";
import { NEON_AUTH_SESSION_DATA_COOKIE_NAME } from "@neondatabase/auth/server";
import { authFor } from "../lib/auth";

// Ends the Neon Auth session upstream; the SDK clears the session cookie through the
// response. The signed session cache is cleared here too.
export const POST: APIRoute = async (ctx) => {
  await authFor(ctx).signOut();
  ctx.cookies.delete(NEON_AUTH_SESSION_DATA_COOKIE_NAME, { path: "/" });
  return ctx.redirect("/sign-in", 303);
};
