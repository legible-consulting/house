"use server";

import {
  insertTouch,
  linksOf,
  prospectById,
  revertReady,
  setHandedOff,
  setNextAction,
  setMeeting,
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
  meetingFrom,
  meetingOf,
  missingForReady,
  nextActionAfterTouch,
  nextMoves,
  slugOf,
  today,
  type DeskUser,
  type Prospect,
} from "@/lib/pool";
import { renderRecord } from "@/lib/record";
import { currentUser, wordsLanguage } from "@/lib/user";
import { words, type Words } from "@/lib/words";

// Every refusal and every note of a row's action is in the words of the user who acts
// (lib/words.ts); a status, a key and a value stay the model's. Read before attempt(): a failed
// read of the user gives en-GB here, and owned() then flashes the read's own error.
async function actWords(): Promise<Words> {
  try {
    return words(await wordsLanguage(await currentUser()));
  } catch {
    return words("en-GB");
  }
}

function idOf(form: FormData, e: Words["errors"]): string {
  const id = String(form.get("id") ?? "");
  if (!UUID_RE.test(id)) back("/pool", { error: e.noProspect });
  return id;
}

// The row, for a write: the sourcer's own, or Jamie's.
async function owned(id: string, e: Words["errors"]): Promise<{ user: DeskUser; p: Prospect }> {
  const user = await currentUser();
  if (!user || user.role === "client") throw new Error(e.signIn);
  const p = await prospectById(id);
  if (!p) throw new Error(e.noProspect);
  if (!canWrite(p, user)) throw new Error(e.notWriter);
  return { user, p };
}

// An email, phone or WhatsApp number new to the row is refused when it is on the no-contact list. The row's own
// contact points are not checked, so a row closed by "They asked not to be contacted" still saves.
export async function saveProspect(form: FormData) {
  const e = (await actWords()).errors;
  const id = idOf(form, e);
  const error = await attempt(async () => {
    const { p } = await owned(id, e);
    const f = fieldsFrom(form, e);
    const had = contactPoints(p).map((c) => `${c.kind}:${c.value}`);
    const hits = await suppressed(contactPoints(f).filter((c) => !had.includes(`${c.kind}:${c.value}`)));
    if (hits.length) throw new Error(e.noContact(hits.map((c) => c.value)));
    let slug = p.slug ?? slugOf(f.company);
    if (!p.pr_url && p.status !== "ready for Jamie") {
      slug = String(form.get("slug") ?? "").trim() || slugOf(f.company);
      if (!SLUG_RE.test(slug) || slug.length > 40) {
        throw new Error(e.slug);
      }
      if (clientSlugs.has(slug) || (await slugTaken(slug, id))) throw new Error(e.slugTaken(slug));
      // A sent link lands its answers under the slug it was sent to (answer-a-link), so the
      // slug stays once one is sent (why: the answers and the row must keep one name · 2026-10-26).
      if (p.slug && slug !== p.slug && (await linksOf(p.slug)).length > 0) {
        throw new Error(e.slugSent(p.slug));
      }
    }
    const next = String(form.get("next_action") ?? "").trim() || null;
    if (next && !DATE_RE.test(next)) throw new Error(e.nextAction);
    // The Meeting field group shows from `replied` on and sends `meeting_group`. At `meeting` and
    // at `ready for Jamie` the meeting stays set (prospect.md, Fields).
    const meeting = form.has("meeting_group") ? meetingFrom(form, e) : undefined;
    if (meeting === null && (p.status === "meeting" || p.status === "ready for Jamie")) {
      throw new Error(e.meetingAt(p.status));
    }
    await updateProspect(id, slug, f, next);
    // Written only when it changed, so a row saves before db/schema.sql adds the columns.
    if (meeting !== undefined && JSON.stringify(meeting) !== JSON.stringify(meetingOf(p))) {
      await setMeeting(id, meeting);
    }
  });
  back(`/pool/${id}`, { error });
}

// A touch is logged before the handoff and not on a lost row. Before a reply, the desk
// sets next_action from the cadence after each touch.
export async function logTouch(form: FormData) {
  const e = (await actWords()).errors;
  const id = idOf(form, e);
  const error = await attempt(async () => {
    const { p } = await owned(id, e);
    if (p.status === "ready for Jamie" || p.status === "lost") throw new Error(e.touchClosed);
    const touchedOn = String(form.get("touched_on") ?? "").trim();
    if (!DATE_RE.test(touchedOn)) throw new Error(e.touchDate);
    const channel = form.get("channel");
    if (!isChannel(channel)) throw new Error(e.channel);
    await insertTouch(id, touchedOn, channel, String(form.get("note") ?? "").trim());
    const next = nextActionAfterTouch(p.status, await touchesOf(id));
    if (next) await setNextAction(id, next);
  });
  back(`/pool/${id}`, { error });
}

export async function moveStatus(form: FormData) {
  const e = (await actWords()).errors;
  const id = idOf(form, e);
  const error = await attempt(async () => {
    const { user, p } = await owned(id, e);
    const status = form.get("status");
    if (!isStatus(status) || !nextMoves(p, user).includes(status)) throw new Error(e.notAMove);
    const reason = String(form.get("lost_reason") ?? "").trim();
    if (status === "lost" && !reason) throw new Error(e.lostReason);
    // The move to `meeting` carries the meeting: when, with whom and where (prospect.md, Fields).
    if (status === "meeting") {
      const meeting = meetingFrom(form, e);
      if (!meeting) throw new Error(e.meetingNeeded);
      await setMeeting(id, meeting);
    }
    await setStatus(id, status, status === "lost" ? reason : p.lost_reason);
  });
  back(`/pool/${id}`, { error });
}

// "They asked not to be contacted" (cadence.md, Channels): the row goes to lost with that reason
// and no next action, and its email, phone and WhatsApp number go on the no-contact list for good. The sourcer
// and Jamie only, from any status but handed off.
export async function askedNotToBeContacted(form: FormData) {
  const e = (await actWords()).errors;
  const id = idOf(form, e);
  let note = "";
  const error = await attempt(async () => {
    const { p } = await owned(id, e);
    if (p.lost_reason === NO_CONTACT) throw new Error(e.closedAlready);
    const points = contactPoints(p);
    await suppressProspect(id, points);
    note = points.length ? e.noContactNote(points.map((c) => c.value)) : e.noContactBare;
  });
  back(`/pool/${id}`, { error, note });
}

// Opens the handoff PR and moves the row to `ready for Jamie`.
export async function readyForJamie(form: FormData) {
  const w = await actWords();
  const e = w.errors;
  const id = idOf(form, e);
  const error = await attempt(async () => {
    const { p } = await owned(id, e);
    if (!canGoReady(p)) throw new Error(e.readyFrom);
    const missing = missingForReady(p);
    if (missing.length) throw new Error(w.row.fillFirst(missing.map((m) => w.row.missing[m])));
    // sourced_by in record.md is `jamie` or the salesman's handle (prospect.md, Fields). The
    // pool shows the email's first part for a salesman without one; the record must not.
    if (p.sourced_by !== "jamie" && !p.salesman_handle) {
      throw new Error(e.noHandle(p.salesman_email));
    }
    const slug = p.slug ?? slugOf(p.company);
    if (clientSlugs.has(slug)) throw new Error(e.exists(slug));
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
  const e = (await actWords()).errors;
  const id = idOf(form, e);
  let note = "";
  const error = await attempt(async () => {
    const user = await currentUser();
    if (!user || user.role === "client") throw new Error(e.signIn);
    const p = await prospectById(id);
    if (!p) throw new Error(e.noProspect);
    if (p.status !== "ready for Jamie" || !p.pr_url) throw new Error(e.noPr);
    const state = await handoffPrState(p.pr_url);
    if (state === "merged") {
      await setHandedOff(id, `clients/${p.slug ?? slugOf(p.company)}/record.md`);
      note = e.merged;
    } else if (state === "closed") {
      await revertReady(id);
      note = e.closed;
    } else {
      note = e.stillOpen;
    }
  });
  back(`/pool/${id}`, { error, note });
}
