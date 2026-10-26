"use server";

import { insertLink, prospectById } from "@/lib/db";
import { attempt, back } from "@/lib/guard";
import { clientBySlug, forms } from "@/lib/house";
import { EMAIL_RE, MAX } from "@/lib/lead";
import { isFormLanguage } from "@/lib/links";
import { SLUG_RE, UUID_RE } from "@/lib/pool";
import { currentUser } from "@/lib/user";

// The Send a form card's one action (app/_send.tsx): a `links` row with the form frozen in the
// chosen language. The target is a client folder or a pool row, never a slug the browser
// chose: the slug and `signup` come from the server's own read of it (decision 11 of
// .icm/intake/desk-forms: a client page saves the user, a pool row collects answers only).
export async function sendForm(form: FormData) {
  const client = String(form.get("client") ?? "");
  const prospect = String(form.get("prospect") ?? "");
  const path = SLUG_RE.test(client) ? `/clients/${client}` : UUID_RE.test(prospect) ? `/pool/${prospect}` : "";
  if (!path) back("/", { error: "No such client or prospect." });
  const error = await attempt(async () => {
    const user = await currentUser();
    if (user?.role !== "jamie" || !user.id) throw new Error("Only Jamie sends a form.");
    let slug: string;
    let signup: boolean;
    if (client) {
      if (!clientBySlug(client)) throw new Error(`clients/${client}/ is not in the house.`);
      slug = client;
      signup = true;
    } else {
      const p = await prospectById(prospect);
      if (!p) throw new Error("No such prospect.");
      if (!p.slug) throw new Error("The row has no slug yet: save its facts first.");
      slug = p.slug;
      signup = false;
    }
    const name = String(form.get("form") ?? "");
    const language = form.get("language");
    if (!isFormLanguage(language)) throw new Error("The language is en-GB, fr-BE or pt-PT.");
    const snapshot = forms[name]?.[language];
    if (!snapshot) throw new Error(`The house has no ${name || "such form"} in ${language}.`);
    const to = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    if (!to || to.length > MAX.name) throw new Error(`The name is required, at most ${MAX.name} characters.`);
    if (!EMAIL_RE.test(email) || email.length > MAX.email) throw new Error("The email is not an address.");
    await insertLink(slug, snapshot, { name: to, email }, signup, user.id);
  });
  back(path, { error, note: error ? "" : "The link is made: copy it from the list and send it yourself." });
}
