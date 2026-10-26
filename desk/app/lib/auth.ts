import { createNeonAuth, type NeonAuth } from "@neondatabase/auth/next/server";
import { headers } from "next/headers";
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

// The desk's own origin for this request, so a link that Neon Auth mails lands on the
// deployment that asked for it (production or a preview).
export async function deskOrigin(): Promise<string> {
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "https"}://${h.get("x-forwarded-host") ?? h.get("host")}`;
}

// Asks Neon Auth to mail a sign-in link to a client user (magic-link-sign-in of
// .icm/intake/desk-forms). Neon Auth sends the mail, as it sends the reset mail; the desk's own
// mail still goes to Jamie only. The link lands on /link, which opens the person's folder; a
// spent or expired link lands on /sign-in with Neon Auth's error code. The caller checks that
// the address is an active client user first: the desk asks for a link for nobody else.
export async function mailSignInLink(email: string): Promise<void> {
  const origin = await deskOrigin();
  const { error } = await auth().signIn.magicLink({
    email,
    callbackURL: `${origin}/link`,
    errorCallbackURL: `${origin}/sign-in`,
  });
  if (error) throw new Error(error.message);
}
