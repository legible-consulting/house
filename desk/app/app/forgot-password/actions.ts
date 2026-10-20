"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { attempt } from "@/lib/guard";

// Asks Neon Auth to mail a reset link that lands on /reset-password. The answer is the same
// whether or not the address has an account, so the form tells nobody who is a user.
// A failure upstream is logged for the Vercel function log and not shown.
export async function requestReset(form: FormData) {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!email) redirect(`/forgot-password?error=${encodeURIComponent("Email is required.")}`);
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("x-forwarded-host") ?? h.get("host")}`;
  const failure = await attempt(async () => {
    const { error } = await auth().requestPasswordReset({ email, redirectTo: `${origin}/reset-password` });
    if (error) throw new Error(error.message);
  });
  if (failure) console.error("[desk] requestPasswordReset:", failure);
  redirect(
    `/forgot-password?note=${encodeURIComponent(
      "If that address has an account, a reset link is on its way. It is valid for 15 minutes.",
    )}`,
  );
}
