"use server";

import { mailSignInLink } from "@/lib/auth";
import { activateClientUser } from "@/lib/db";
import { attempt, back } from "@/lib/guard";
import { clientBySlug } from "@/lib/house";
import { SLUG_RE } from "@/lib/pool";
import { currentUser } from "@/lib/user";

// The Users card's one action (app/_users.tsx), Jamie only: "Activate" sets the user active and
// asks Neon Auth to mail them a sign-in link; "Send again" asks for the link once more for a user
// who is active already (magic-link-sign-in of .icm/intake/desk-forms). The user is activated
// before the link is asked for, so a link that arrives always opens the folder. A link that fails
// leaves the user active, and the page says so: Jamie sends again.
export async function activateUser(form: FormData) {
  const slug = String(form.get("client") ?? "");
  if (!SLUG_RE.test(slug)) back("/", { error: "No such client." });
  const path = `/clients/${slug}`;
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  let activated = false;
  const error = await attempt(async () => {
    const user = await currentUser();
    if (user?.role !== "jamie") throw new Error("Only Jamie activates a user.");
    if (!clientBySlug(slug)) throw new Error(`clients/${slug}/ is not in the house.`);
    if (!(await activateClientUser(email, slug))) throw new Error(`${email || "That address"} is not a user of this folder.`);
    activated = true;
    await mailSignInLink(email);
  });
  if (error && activated) {
    back(path, { error: `${email} is active, but Neon Auth did not send the link: ${error}. Use “Send again”.` });
  }
  back(path, { error, note: error ? "" : `A sign-in link is on its way to ${email}.` });
}
