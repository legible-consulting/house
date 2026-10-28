import { NEON_AUTH_SESSION_COOKIE_NAME } from "@neondatabase/auth/server";
import { cookies, headers } from "next/headers";
import { cache } from "react";
import { auth } from "./auth";
import { userByEmail } from "./db";
import { languageOf, type Language } from "./language";
import type { DeskUser } from "./pool";

export interface SessionUser {
  email: string;
  name: string;
}

// The Neon Auth session's user, or null.
export async function sessionUser(): Promise<SessionUser | null> {
  const { data } = await auth().getSession();
  const user = (data as { user?: { email?: string; name?: string | null } } | null)?.user;
  return user?.email ? { email: user.email.toLowerCase(), name: user.name ?? "" } : null;
}

// The signed-in desk user with the role from the users table, or null. A session without
// a row yet is a client, who sees nothing. So is a user with `active` false: a client saved by a
// sent link, whom Jamie has not activated yet (client-signs-up of .icm/intake/desk-forms). Read
// once per request: the shell's layout and the page both call it, and React's cache gives the
// second call the first read.
export const currentUser = cache(async (): Promise<DeskUser | null> => {
  const s = await sessionUser();
  if (!s) return null;
  const u = await userByEmail(s.email);
  if (!u) return { id: "", email: s.email, name: s.name, role: "client", handle: "", client: null, active: false, language: "" };
  return u.active ? u : { ...u, role: "client", client: null };
});

// The language of the desk's own words for this user (lib/words.ts): a salesman's own
// (lib/language.ts languageOf), and en-GB for everyone else. Jamie's pages are English, and the
// shell he reads holds them; a client's page and the pages without a session are English too
// (salesman-pages-in-their-language, the breakdown's Do not · 2026-10-28).
export async function wordsLanguage(user: DeskUser | null): Promise<Language> {
  if (user?.role !== "salesman") return "en-GB";
  return languageOf(user, (await headers()).get("accept-language"));
}

// `<html lang>` for this request (app/layout.tsx): the signed-in user's words language. A request
// with no Neon Auth session cookie is en-GB without a read, so a page without a session (/start,
// /f/<token>, /sign-in) asks Neon Auth nothing. A failed read is en-GB: the language must not stop
// a page.
export async function pageLanguage(): Promise<Language> {
  const jar = await cookies();
  if (!jar.getAll().some((c) => c.name.startsWith(NEON_AUTH_SESSION_COOKIE_NAME))) return "en-GB";
  try {
    return await wordsLanguage(await currentUser());
  } catch {
    return "en-GB";
  }
}
