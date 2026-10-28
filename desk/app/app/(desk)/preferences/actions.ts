"use server";

import { setLanguage } from "@/lib/db";
import { attempt, back } from "@/lib/guard";
import { isLanguage, LANGUAGE_NAMES } from "@/lib/language";
import { currentUser } from "@/lib/user";

// Save on /preferences: the user's own language on their own row. Jamie and a salesman only.
export async function savePreferences(form: FormData) {
  let note = "";
  const error = await attempt(async () => {
    const user = await currentUser();
    if (!user || user.role === "client") throw new Error("Jamie and the salesmen only.");
    const language = form.get("language");
    if (!isLanguage(language)) throw new Error("Choose English, Français or Português.");
    try {
      if (!(await setLanguage(user.id, language))) throw new Error("No user row has your id.");
    } catch (e) {
      const why = e instanceof Error ? e.message : String(e);
      throw new Error(`The language is not saved: ${why}`);
    }
    note = `Saved. The desk reads in ${LANGUAGE_NAMES[language]}.`;
  });
  back("/preferences", error ? { error } : { note });
}
