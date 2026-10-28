"use server";

import { setLanguage } from "@/lib/db";
import { attempt, back } from "@/lib/guard";
import { isLanguage, LANGUAGE_NAMES } from "@/lib/language";
import { currentUser, wordsLanguage } from "@/lib/user";
import { words } from "@/lib/words";

// Save on /preferences: the user's own language on their own row. Jamie and a salesman only. A
// refusal is in the user's words now; the note is in the words of the language just saved, as
// the page that shows it will be (lib/words.ts).
export async function savePreferences(form: FormData) {
  let note = "";
  const error = await attempt(async () => {
    const user = await currentUser();
    const e = words(await wordsLanguage(user)).errors;
    if (!user || user.role === "client") throw new Error(e.prefsOnly);
    const language = form.get("language");
    if (!isLanguage(language)) throw new Error(e.chooseLanguage);
    try {
      if (!(await setLanguage(user.id, language))) throw new Error(e.noUserRow);
    } catch (err) {
      const why = err instanceof Error ? err.message : String(err);
      throw new Error(e.notSaved(why));
    }
    note = words(await wordsLanguage({ ...user, language })).errors.saved(LANGUAGE_NAMES[language]);
  });
  back("/preferences", error ? { error } : { note });
}
