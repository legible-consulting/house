"use server";

import { redirect } from "next/navigation";
import { freeSlug, insertProspect } from "@/lib/db";
import { attempt, back } from "@/lib/guard";
import { fieldsFrom } from "@/lib/pool";
import { currentUser } from "@/lib/user";

// A new row at `new`, sourced by the signed-in user. The slug comes from the company
// (lib/db.ts freeSlug); the sourcer may edit it until the handoff.
export async function addProspect(form: FormData) {
  let id = "";
  const error = await attempt(async () => {
    const user = await currentUser();
    if (!user || user.role === "client") throw new Error("Sign in first.");
    const f = fieldsFrom(form);
    id = await insertProspect(user.id, await freeSlug(f.company), f);
  });
  if (error) back("/pool", { error });
  redirect(`/pool/${id}`);
}
