import { defineMiddleware } from "astro:middleware";
import { sessionUser } from "./lib/auth";
import { userByEmail } from "./lib/db";

// Every page needs a Neon Auth session except sign-in and sign-out. The role comes from the
// users table; a signed-in user without a row is a client, who sees nothing yet.
const OPEN = new Set(["/sign-in", "/sign-out"]);

export const onRequest = defineMiddleware(async (ctx, next) => {
  ctx.locals.user = null;
  if (OPEN.has(ctx.url.pathname)) return next();

  const session = await sessionUser(ctx);
  if (!session) {
    const back = ctx.url.pathname + ctx.url.search;
    return ctx.redirect(`/sign-in?next=${encodeURIComponent(back)}`, 303);
  }
  const email = session.email.toLowerCase();
  ctx.locals.user = (await userByEmail(email)) ?? {
    id: "",
    email,
    name: session.name ?? "",
    role: "client",
  };
  return next();
});
