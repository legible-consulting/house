import { redirect } from "next/navigation";
import { Field } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { sessionUser } from "@/lib/user";
import { Shell } from "../_shell";
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
    <Shell user={null}>
      <Card className="mx-auto mt-8 w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Legible Consulting&apos;s desk.</CardDescription>
        </CardHeader>
        <CardContent>
          <Flash error={error} note={note} />
          <form action={signIn} className="grid gap-4">
            <Field label="Email">
              <Input type="email" name="email" required autoComplete="username" />
            </Field>
            <Field label="Password">
              <Input type="password" name="password" required autoComplete="current-password" />
            </Field>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
          {/* A client of the desk keeps no password: Neon Auth mails a sign-in link instead
              (magic-link-sign-in of .icm/intake/desk-forms). */}
          <form action={requestLink} className="mt-6 grid gap-4 border-t pt-6">
            <p className="text-sm text-muted-foreground">A client of the desk? Sign in by a link in your mail.</p>
            <Field label="Email">
              <Input type="email" name="email" required autoComplete="email" />
            </Field>
            <Button type="submit" variant="outline" className="w-full">
              Email me a sign-in link
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <a href="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
            Forgot your password?
          </a>
        </CardFooter>
      </Card>
    </Shell>
  );
}
