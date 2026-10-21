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
// a row yet is a client, who sees nothing.
export async function currentUser(): Promise<DeskUser | null> {
  const s = await sessionUser();
  if (!s) return null;
  return (
    (await userByEmail(s.email)) ?? { id: "", email: s.email, name: s.name, role: "client", handle: "", client: null }
  );
}
