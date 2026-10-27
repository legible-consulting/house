"use server";

import { NEON_AUTH_SESSION_DATA_COOKIE_NAME } from "@neondatabase/auth/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth, mailSignInLink } from "@/lib/auth";
import { ensureUser, userByEmail } from "@/lib/db";
import { attempt } from "@/lib/guard";

const USE_THE_LINK = "A client signs in by link, not by password: use “Email me a sign-in link” below.";

// Email and password against Neon Auth. A success sets the session cookies through the
// SDK and opens the user's row at role client if it is the first sign-in. A client user of a
// folder never signs in with a password: the users row is read before Neon Auth is asked, and
// the form answers with the note to use the link (magic-link-sign-in of .icm/intake/desk-forms).
export async function signIn(form: FormData) {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  let error = "";
  if (!email || !password) {
    error = "Email and password are required.";
  } else {
    error = await attempt(async () => {
      const row = await userByEmail(email);
      if (row?.role === "client" && row.client) throw new Error(USE_THE_LINK);
      const { data, error: e } = await auth().signIn.email({ email, password });
      const user = (data as { user?: { name?: string | null } } | null)?.user;
      if (e || !user) throw new Error(e?.message ?? "Sign-in failed.");
      await ensureUser(email, user.name ?? "");
    });
  }
  if (error) redirect(`/sign-in?error=${encodeURIComponent(error)}`);
  redirect("/");
}

// "Email me a sign-in link": the desk asks Neon Auth for a link only when an active client user
// of a folder has that email, and does nothing otherwise. The note is the same in both cases, so
// the form tells nobody who is a client, as /forgot-password does. A failure upstream is logged
// for the Vercel function log and not shown.
export async function requestLink(form: FormData) {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!email) redirect(`/sign-in?error=${encodeURIComponent("Email is required.")}`);
  const failure = await attempt(async () => {
    const row = await userByEmail(email);
    if (row?.role === "client" && row.client && row.active) await mailSignInLink(email);
  });
  if (failure) console.error("[desk] requestLink:", failure);
  redirect(
    `/sign-in?note=${encodeURIComponent(
      "If that address belongs to a client of the desk, a sign-in link is on its way. Open it in this browser.",
    )}`,
  );
}

// Ends the Neon Auth session upstream; the SDK clears the session cookie. The signed session
// cache is cleared here too, so the next request cannot read a stale copy.
export async function signOut() {
  await attempt(() => auth().signOut().then(() => undefined));
  (await cookies()).delete(NEON_AUTH_SESSION_DATA_COOKIE_NAME);
  redirect("/sign-in");
}
