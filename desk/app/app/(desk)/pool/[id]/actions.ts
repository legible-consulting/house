"use server";

import {
  insertTouch,
  linksOf,
  prospectById,
  revertReady,
  setHandedOff,
  setNextAction,
  setReady,
  setStatus,
  slugTaken,
  suppressed,
  suppressProspect,
  touchesOf,
  updateProspect,
} from "@/lib/db";
import { handoffPrState, openHandoffPr } from "@/lib/github";
import { attempt, back } from "@/lib/guard";
import { clientSlugs } from "@/lib/house";
import {
  DATE_RE,
  NO_CONTACT,
  SLUG_RE,
  UUID_RE,
  canGoReady,
  canWrite,
  contactPoints,
  fieldsFrom,
  isChannel,
  isStatus,
  missingForReady,
  nextActionAfterTouch,
  nextMoves,
  noContactError,
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

// An email or phone new to the row is refused when it is on the no-contact list. The row's own
// contact points are not checked, so a row closed by "They asked not to be contacted" still saves.
export async function saveProspect(form: FormData) {
  const id = idOf(form);
  const error = await attempt(async () => {
    const { p } = await owned(id);
    const f = fieldsFrom(form);
    const had = contactPoints(p).map((c) => `${c.kind}:${c.value}`);
    const hits = await suppressed(contactPoints(f).filter((c) => !had.includes(`${c.kind}:${c.value}`)));
    if (hits.length) throw new Error(noContactError(hits));
    let slug = p.slug ?? slugOf(f.company);
    if (!p.pr_url && p.status !== "ready for Jamie") {
      slug = String(form.get("slug") ?? "").trim() || slugOf(f.company);
      if (!SLUG_RE.test(slug) || slug.length > 40) {
        throw new Error("The slug is lower-case words joined by dashes, at most 40 characters.");
      }
      if (clientSlugs.has(slug) || (await slugTaken(slug, id))) {
        throw new Error(`${slug} is taken by another prospect or by clients/${slug}/.`);
      }
      // A sent link lands its answers under the slug it was sent to (answer-a-link), so the
      // slug stays once one is sent (why: the answers and the row must keep one name · 2026-10-26).
      if (p.slug && slug !== p.slug && (await linksOf(p.slug)).length > 0) {
        throw new Error(`A form was sent to ${p.slug}: the slug stays.`);
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

// "They asked not to be contacted" (cadence.md, Channels): the row goes to lost with that reason
// and no next action, and its email and phone go on the no-contact list for good. The sourcer
// and Jamie only, from any status but handed off.
export async function askedNotToBeContacted(form: FormData) {
  const id = idOf(form);
  let note = "";
  const error = await attempt(async () => {
    const { p } = await owned(id);
    if (p.lost_reason === NO_CONTACT) throw new Error("This row is closed already: they asked not to be contacted.");
    const points = contactPoints(p);
    await suppressProspect(id, points);
    note = points.length
      ? `Lost: ${NO_CONTACT}. ${points.map((c) => c.value).join(" and ")} get no new row, on any channel.`
      : `Lost: ${NO_CONTACT}. The row has no email or phone, so search the pool for the company before each add.`;
  });
  back(`/pool/${id}`, { error, note });
}

// Opens the handoff PR and moves the row to `ready for Jamie`.
export async function readyForJamie(form: FormData) {
  const id = idOf(form);
  const error = await attempt(async () => {
    const { p } = await owned(id);
    if (!canGoReady(p)) throw new Error("Ready for Jamie goes from replied or meeting, once.");
    const missing = missingForReady(p);
    if (missing.length) throw new Error(`Fill first: ${missing.join(", ")}.`);
    // sourced_by in record.md is `jamie` or the salesman's handle (prospect.md, Fields). The
    // pool shows the email's first part for a salesman without one; the record must not.
    if (p.sourced_by !== "jamie" && !p.salesman_handle) {
      throw new Error(`${p.salesman_email} has no handle. Jamie sets it in the Neon console (db/schema.sql), then hand off again.`);
    }
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
