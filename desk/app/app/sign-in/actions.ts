"use server";

import { NEON_AUTH_SESSION_DATA_COOKIE_NAME } from "@neondatabase/auth/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ensureUser } from "@/lib/db";
import { attempt } from "@/lib/guard";

// Email and password against Neon Auth. A success sets the session cookies through the
// SDK and opens the user's row at role client if it is the first sign-in.
export async function signIn(form: FormData) {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  let error = "";
  if (!email || !password) {
    error = "Email and password are required.";
  } else {
    error = await attempt(async () => {
      const { data, error: e } = await auth().signIn.email({ email, password });
      const user = (data as { user?: { name?: string | null } } | null)?.user;
      if (e || !user) throw new Error(e?.message ?? "Sign-in failed.");
      await ensureUser(email, user.name ?? "");
    });
  }
  if (error) redirect(`/sign-in?error=${encodeURIComponent(error)}`);
  redirect("/");
}

// Ends the Neon Auth session upstream; the SDK clears the session cookie. The signed session
// cache is cleared here too, so the next request cannot read a stale copy.
export async function signOut() {
  await attempt(() => auth().signOut().then(() => undefined));
  (await cookies()).delete(NEON_AUTH_SESSION_DATA_COOKIE_NAME);
  redirect("/sign-in");
}
