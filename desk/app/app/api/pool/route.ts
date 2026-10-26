import { timingSafeEqual } from "node:crypto";
import { maybeEnv } from "@/lib/env";
import { insertLead, leadFields } from "@/lib/lead";
import type { ProspectFields } from "@/lib/pool";

// The pool API: the portfolio's contact form (k0d0minio/jamienisbet) posts each lead here
// with `Authorization: Bearer <POOL_TOKEN>`, and the lead lands in the pool as a row Jamie
// sourced, at `new`, like a row he adds by hand on /pool. The portfolio sends its own mail;
// the desk sends nothing (cadence.md). The body and the row are lib/lead.ts, shared with /start.
//
//   POST /api/pool  body { name, email, message, language, company?, phone? }
//   201 { id }      the row is inserted
//   400 { error }   the body is not the JSON above
//   401 { error }   no bearer token, or one that is not POOL_TOKEN
//   422 { id }      a prospect with that email is open (status not lost and not handed off):
//                   nothing is inserted, the open row's id comes back
export const dynamic = "force-dynamic";

const json = (status: number, body: object) => Response.json(body, { status });

// The token is compared in constant time; no token, or none set on the project, is a no.
function authorised(req: Request): boolean {
  const header = req.headers.get("authorization") ?? "";
  const given = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const expected = maybeEnv("POOL_TOKEN");
  if (!given || !expected) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request): Promise<Response> {
  if (!authorised(req)) return json(401, { error: "A bearer POOL_TOKEN is required." });
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "The body is not JSON." });
  }
  let fields: ProspectFields;
  try {
    fields = leadFields(body);
  } catch (e) {
    return json(400, { error: e instanceof Error ? e.message : String(e) });
  }
  try {
    const lead = await insertLead(fields);
    return json(lead.open ? 422 : 201, { id: lead.id });
  } catch (e) {
    return json(500, { error: e instanceof Error ? e.message : String(e) });
  }
}
