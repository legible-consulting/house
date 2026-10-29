"use server";

import { attempt, back } from "@/lib/guard";
import { dropLink, nameLink, queueLink } from "@/lib/research";
import { currentUser } from "@/lib/user";

const field = (form: FormData, k: string) => {
  const v = form.get(k);
  return typeof v === "string" ? v : "";
};

// One research action, Jamie only, back to /research with its note or its error.
async function jamieOnly(fn: () => Promise<{ note: string }>) {
  let note = "";
  const error = await attempt(async () => {
    const user = await currentUser();
    if (user?.role !== "jamie") throw new Error("Jamie only.");
    note = (await fn()).note;
  });
  back("/research", error ? { error } : { note });
}

// A link pasted on /research: queued like a share (lib/research.ts).
export async function addLink(form: FormData) {
  await jamieOnly(() => queueLink({ url: field(form, "url"), text: field(form, "text") }));
}

// A name typed under "Needs a name": written into the queue file for the next intake.
export async function nameShare(form: FormData) {
  await jamieOnly(() => nameLink(field(form, "file"), field(form, "name")));
}

// A share under "Needs a name" that Jamie drops: the queue file leaves main.
export async function dropShare(form: FormData) {
  await jamieOnly(() => dropLink(field(form, "file")));
}
