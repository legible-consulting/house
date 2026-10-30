import { type NextRequest, NextResponse } from "next/server";
import { needsText, queueLink } from "@/lib/research";
import { currentUser } from "@/lib/user";

// The share target (app/desk.webmanifest/route.ts): Android's share sheet opens this route
// with ?url=, ?text= and ?title= when Jamie shares a link to the installed desk. The link is
// queued for the research intake (lib/research.ts) and the view moves to /research with the
// result. A LinkedIn link with no text of its own is not queued: the view moves to the form on
// /research with the link filled in, and the form asks for the post's text (lib/research.ts,
// needsText). proxy.ts sends a visitor without a session to sign-in first. Jamie only: another
// role is sent to its own desk.
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<Response> {
  const user = await currentUser();
  if (!user) return NextResponse.redirect(new URL("/sign-in", req.url), 303);
  if (user.role !== "jamie") return NextResponse.redirect(new URL("/", req.url), 303);
  const q = req.nextUrl.searchParams;
  const to = new URL("/research", req.url);
  const shared = { url: q.get("url") ?? "", text: q.get("text") ?? "", title: q.get("title") ?? "" };
  const ask = needsText(shared);
  if (ask) {
    to.searchParams.set("link", ask.link);
    to.hash = "queue-a-link";
    return NextResponse.redirect(to, 303);
  }
  try {
    const { note } = await queueLink(shared);
    to.searchParams.set("note", note);
  } catch (e) {
    to.searchParams.set("error", e instanceof Error ? e.message : String(e));
  }
  return NextResponse.redirect(to, 303);
}
