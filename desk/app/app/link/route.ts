import { type NextRequest, NextResponse } from "next/server";
import { ensureUser } from "@/lib/db";
import { currentUser, sessionUser } from "@/lib/user";

// Where a sign-in link from Neon Auth lands (lib/auth.ts mailSignInLink). proxy.ts matches it,
// so the SDK's middleware sets the session cookies from the link before this runs and sends a
// visitor without a session to sign-in. The route opens the users row if it is the first
// sign-in, as the password form does, and lands a client on their folder.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<Response> {
  const s = await sessionUser();
  if (!s) return NextResponse.redirect(new URL("/sign-in", req.url), 303);
  await ensureUser(s.email, s.name);
  const user = await currentUser();
  const to = user?.role === "client" && user.client ? `/clients/${user.client}` : "/";
  return NextResponse.redirect(new URL(to, req.url), 303);
}
