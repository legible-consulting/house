"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { attempt } from "@/lib/guard";

// Sets the new password with the token from the emailed link, then returns to sign-in.
export async function resetPassword(form: FormData) {
  const token = String(form.get("token") ?? "");
  const newPassword = String(form.get("password") ?? "");
  const again = String(form.get("password_again") ?? "");
  let error = "";
  if (!token) error = "The link is missing its token. Ask for a new one.";
  else if (newPassword.length < 8) error = "The password needs at least 8 characters.";
  else if (newPassword !== again) error = "The two passwords differ.";
  else {
    error = await attempt(async () => {
      const { error: e } = await auth().resetPassword({ newPassword, token });
      if (e) throw new Error(e.message);
    });
  }
  if (error) {
    redirect(`/reset-password?token=${encodeURIComponent(token)}&error=${encodeURIComponent(error)}`);
  }
  redirect(`/sign-in?note=${encodeURIComponent("Password changed. Sign in with it.")}`);
}
