"use server";

import { redirect } from "next/navigation";
import { freeSlug, insertProspect, suppressed } from "@/lib/db";
import { attempt, back } from "@/lib/guard";
import { contactPoints, fieldsFrom } from "@/lib/pool";
import { currentUser, wordsLanguage } from "@/lib/user";
import { words } from "@/lib/words";

// A new row at `new`, sourced by the signed-in user. The slug comes from the company
// (lib/db.ts freeSlug); the sourcer may edit it until the handoff. An email, phone or WhatsApp
// number on the no-contact list gets no row (cadence.md, Channels). A refusal is in the user's
// words (lib/words.ts errors).
export async function addProspect(form: FormData) {
  let id = "";
  const error = await attempt(async () => {
    const user = await currentUser();
    const e = words(await wordsLanguage(user)).errors; // inside attempt(): a failed read is refused in words
    if (!user || user.role === "client") throw new Error(e.signIn);
    const f = fieldsFrom(form, e);
    const hits = await suppressed(contactPoints(f));
    if (hits.length) throw new Error(e.noContact(hits.map((c) => c.value)));
    id = await insertProspect(user.id, await freeSlug(f.company), f);
  });
  if (error) back("/pool", { error });
  redirect(`/pool/${id}`);
}
