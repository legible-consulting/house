"use server";

import { redirect } from "next/navigation";
import { insertProspect, slugTaken } from "@/lib/db";
import { attempt, back } from "@/lib/guard";
import { clientSlugs } from "@/lib/house";
import { fieldsFrom, slugOf } from "@/lib/pool";
import { currentUser } from "@/lib/user";

// A new row at `new`, sourced by the signed-in user. The slug comes from the company and is
// unique in the pool and against clients/*/; the sourcer may edit it until the handoff.
export async function addProspect(form: FormData) {
  let id = "";
  const error = await attempt(async () => {
    const user = await currentUser();
    if (!user || user.role === "client") throw new Error("Sign in first.");
    const f = fieldsFrom(form);
    const base = slugOf(f.company);
    let slug = base;
    for (let n = 2; clientSlugs.has(slug) || (await slugTaken(slug)); n++) {
      if (n > 9) throw new Error(`No free slug for ${base}: edit the company name.`);
      slug = `${base}-${n}`;
    }
    id = await insertProspect(user.id, slug, f);
  });
  if (error) back("/pool", { error });
  redirect(`/pool/${id}`);
}
