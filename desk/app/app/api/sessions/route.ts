import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { sessionsOfMonth, upsertSession, type SessionRow } from "@/lib/db";
import { maybeEnv } from "@/lib/env";

// The session ledger (desk/CONTEXT.md). POST: one line per session from the session-ledger
// hook that runs at the end of every turn, on the laptop, in the cloud and on the phone;
// the row is upserted by session id, so a repeated post only brings it up to date. GET
// ?month=YYYY-MM: the rows of a month, for desk/app/scripts/sessions.mjs, which writes
// desk/sessions/<month>.yaml. Both need the bearer token SESSIONS_TOKEN; the route is
// outside proxy.ts, so no sign-in. A row holds counts and names, never content.
export const dynamic = "force-dynamic";

const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;
const ID = /^[A-Za-z0-9_.:-]{1,128}$/;

function allowed(req: Request): boolean {
  const token = maybeEnv("SESSIONS_TOKEN");
  const given = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!token || !given) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}

const unauthorized = () => NextResponse.json({ error: "SESSIONS_TOKEN does not match" }, { status: 401 });
const bad = (error: string) => NextResponse.json({ error }, { status: 400 });

const str = (v: unknown, max: number): string => String(v ?? "").slice(0, max);
const count = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? Math.round(n) : 0;
};
const time = (v: unknown): string | null => {
  const t = Date.parse(String(v ?? ""));
  return Number.isNaN(t) ? null : new Date(t).toISOString();
};

export async function POST(req: Request) {
  if (!allowed(req)) return unauthorized();
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return bad("The body is not JSON.");
  const id = str(body.id, 128);
  if (!ID.test(id)) return bad("id is missing or not a session id.");
  const started = time(body.started);
  const ended = time(body.ended);
  if (!started || !ended) return bad("started and ended are not times.");
  const row: SessionRow = {
    id,
    repo: str(body.repo, 200),
    cwd: str(body.cwd, 500),
    host: str(body.host, 100),
    started,
    ended,
    active_ms: count(body.active_ms),
    tokens: count(body.tokens),
    turns: count(body.turns),
  };
  await upsertSession(row);
  return new NextResponse(null, { status: 204 });
}

export async function GET(req: Request) {
  if (!allowed(req)) return unauthorized();
  const month = new URL(req.url).searchParams.get("month") ?? "";
  if (!MONTH.test(month)) return bad("month is YYYY-MM.");
  return NextResponse.json(await sessionsOfMonth(month));
}
