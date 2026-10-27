import { redirect } from "next/navigation";
import { Field } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { sessionUser } from "@/lib/user";
import { AuthCard, AuthLink } from "../_card";
import { requestLink, signIn } from "./actions";

export const dynamic = "force-dynamic";

// A spent or expired sign-in link lands here with Neon Auth's error code (INVALID_TOKEN,
// EXPIRED_TOKEN and the like): a word without spaces, never one of the desk's own sentences.
const LINK_ERROR_RE = /^[A-Za-z_]+$/;

export default async function SignIn({ searchParams }: { searchParams: Search }) {
  if (await sessionUser()) redirect("/");
  const flashed = await flash(searchParams);
  const { note } = flashed;
  const error = LINK_ERROR_RE.test(flashed.error)
    ? `The sign-in link is not valid any more (${flashed.error}). Ask for a new one below.`
    : flashed.error;
  return (
    <AuthCard
      title="Sign in"
      description={"Legible Consulting's desk."}
      footer={
        <>
          <AuthLink href="/forgot-password">Forgot your password?</AuthLink>
          {/* The desk installs from the browser's menu; it never asks (desk/CONTEXT.md, The phone). */}
          <p className="text-ui text-muted-foreground">On a phone, add this page to the Home Screen.</p>
        </>
      }
    >
      <Flash error={error} note={note} />
      <form action={signIn} className="grid gap-4">
        <Field label="Email">
          <Input type="email" name="email" required autoComplete="username" inputMode="email" enterKeyHint="next" />
        </Field>
        <Field label="Password">
          <Input type="password" name="password" required autoComplete="current-password" enterKeyHint="go" />
        </Field>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
      {/* A client of the desk keeps no password: Neon Auth mails a sign-in link instead
          (magic-link-sign-in of .icm/intake/desk-forms). */}
      <form action={requestLink} className="mt-6 grid gap-4 border-t pt-6">
        <p className="text-ui text-muted-foreground">A client of the desk? Sign in by a link in your mail.</p>
        <Field label="Email">
          <Input type="email" name="email" required autoComplete="email" inputMode="email" enterKeyHint="send" />
        </Field>
        <Button type="submit" variant="outline" className="w-full">
          Email me a sign-in link
        </Button>
      </form>
    </AuthCard>
  );
}
