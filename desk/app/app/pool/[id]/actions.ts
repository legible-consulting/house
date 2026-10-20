"use server";

import {
  insertTouch,
  prospectById,
  revertReady,
  setHandedOff,
  setNextAction,
  setReady,
  setStatus,
  slugTaken,
  touchesOf,
  updateProspect,
} from "@/lib/db";
import { handoffPrState, openHandoffPr } from "@/lib/github";
import { attempt, back } from "@/lib/guard";
import { clientSlugs } from "@/lib/house";
import {
  DATE_RE,
  SLUG_RE,
  UUID_RE,
  canGoReady,
  canWrite,
  fieldsFrom,
  isChannel,
  isStatus,
  missingForReady,
  nextActionAfterTouch,
  nextMoves,
  slugOf,
  today,
  type DeskUser,
  type Prospect,
} from "@/lib/pool";
import { renderRecord } from "@/lib/record";
import { currentUser } from "@/lib/user";

function idOf(form: FormData): string {
  const id = String(form.get("id") ?? "");
  if (!UUID_RE.test(id)) back("/pool", { error: "No such prospect." });
  return id;
}

// The row, for a write: the sourcer's own, or Jamie's.
async function owned(id: string): Promise<{ user: DeskUser; p: Prospect }> {
  const user = await currentUser();
  if (!user || user.role === "client") throw new Error("Sign in first.");
  const p = await prospectById(id);
  if (!p) throw new Error("No such prospect.");
  if (!canWrite(p, user)) throw new Error("Only the sourcer and Jamie write this row.");
  return { user, p };
}

export async function saveProspect(form: FormData) {
  const id = idOf(form);
  const error = await attempt(async () => {
    const { p } = await owned(id);
    const f = fieldsFrom(form);
    let slug = p.slug ?? slugOf(f.company);
    if (!p.pr_url && p.status !== "ready for Jamie") {
      slug = String(form.get("slug") ?? "").trim() || slugOf(f.company);
      if (!SLUG_RE.test(slug) || slug.length > 40) {
        throw new Error("The slug is lower-case words joined by dashes, at most 40 characters.");
      }
      if (clientSlugs.has(slug) || (await slugTaken(slug, id))) {
        throw new Error(`${slug} is taken by another prospect or by clients/${slug}/.`);
      }
    }
    const next = String(form.get("next_action") ?? "").trim() || null;
    if (next && !DATE_RE.test(next)) throw new Error("Next action is a date, YYYY-MM-DD.");
    await updateProspect(id, slug, f, next);
  });
  back(`/pool/${id}`, { error });
}

// A touch is logged before the handoff and not on a lost row. Before a reply, the desk
// sets next_action from the cadence after each touch.
export async function logTouch(form: FormData) {
  const id = idOf(form);
  const error = await attempt(async () => {
    const { p } = await owned(id);
    if (p.status === "ready for Jamie" || p.status === "lost") {
      throw new Error("A touch is logged before the handoff, and not on a lost row.");
    }
    const touchedOn = String(form.get("touched_on") ?? "").trim();
    if (!DATE_RE.test(touchedOn)) throw new Error("The touch's date is YYYY-MM-DD.");
    const channel = form.get("channel");
    if (!isChannel(channel)) throw new Error("The channel is email, phone, whatsapp or in person.");
    await insertTouch(id, touchedOn, channel, String(form.get("note") ?? "").trim());
    const next = nextActionAfterTouch(p.status, await touchesOf(id));
    if (next) await setNextAction(id, next);
  });
  back(`/pool/${id}`, { error });
}

export async function moveStatus(form: FormData) {
  const id = idOf(form);
  const error = await attempt(async () => {
    const { user, p } = await owned(id);
    const status = form.get("status");
    if (!isStatus(status) || !nextMoves(p, user).includes(status)) throw new Error("Not a move from here.");
    const reason = String(form.get("lost_reason") ?? "").trim();
    if (status === "lost" && !reason) throw new Error("lost needs its reason.");
    await setStatus(id, status, status === "lost" ? reason : p.lost_reason);
  });
  back(`/pool/${id}`, { error });
}

// Opens the handoff PR and moves the row to `ready for Jamie`.
export async function readyForJamie(form: FormData) {
  const id = idOf(form);
  const error = await attempt(async () => {
    const { p } = await owned(id);
    if (!canGoReady(p)) throw new Error("Ready for Jamie goes from replied or meeting, once.");
    const missing = missingForReady(p);
    if (missing.length) throw new Error(`Fill first: ${missing.join(", ")}.`);
    const slug = p.slug ?? slugOf(p.company);
    if (clientSlugs.has(slug)) throw new Error(`clients/${slug}/ already exists.`);
    const touches = await touchesOf(id);
    const record = renderRecord(p, slug, touches, today());
    const prUrl = await openHandoffPr(p, slug, record, touches.length);
    await setReady(id, slug, prUrl);
  });
  back(`/pool/${id}`, { error });
}

// Reads the handoff PR. Merged: the row moves to handed off and names its record. Closed
// without a merge: the row returns to where it was. Anyone who reads the pool may check.
export async function checkHandoffPr(form: FormData) {
  const id = idOf(form);
  let note = "";
  const error = await attempt(async () => {
    const user = await currentUser();
    if (!user || user.role === "client") throw new Error("Sign in first.");
    const p = await prospectById(id);
    if (!p) throw new Error("No such prospect.");
    if (p.status !== "ready for Jamie" || !p.pr_url) throw new Error("No handoff PR is open for this row.");
    const state = await handoffPrState(p.pr_url);
    if (state === "merged") {
      await setHandedOff(id, `clients/${p.slug ?? slugOf(p.company)}/record.md`);
      note = "Merged: handed off.";
    } else if (state === "closed") {
      await revertReady(id);
      note = "Closed without a merge: the row is back where it was. Jamie's reason goes in notes.";
    } else {
      note = "The PR is still open.";
    }
  });
  back(`/pool/${id}`, { error, note });
}
