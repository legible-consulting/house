"use server";

import { attempt, back } from "@/lib/guard";
import { queueLink } from "@/lib/research";
import { currentUser } from "@/lib/user";

// A link pasted on /research: queued like a share (lib/research.ts). Jamie only.
export async function addLink(form: FormData) {
  let note = "";
  const error = await attempt(async () => {
    const user = await currentUser();
    if (user?.role !== "jamie") throw new Error("Jamie only.");
    const s = (k: string) => {
      const v = form.get(k);
      return typeof v === "string" ? v : "";
    };
    note = (await queueLink({ url: s("url"), text: s("text") })).note;
  });
  back("/research", error ? { error } : { note });
}
