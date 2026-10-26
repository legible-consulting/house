import { auth } from "./auth";
import { userByEmail } from "./db";
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
// sent link, whom Jamie has not activated yet (client-signs-up of .icm/intake/desk-forms).
export async function currentUser(): Promise<DeskUser | null> {
  const s = await sessionUser();
  if (!s) return null;
  const u = await userByEmail(s.email);
  if (!u) return { id: "", email: s.email, name: s.name, role: "client", handle: "", client: null, active: false };
  return u.active ? u : { ...u, role: "client", client: null };
}
