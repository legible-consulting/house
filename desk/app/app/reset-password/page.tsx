import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { Shell } from "../_shell";
import { Field, Flash } from "../_ui";
import { resetPassword } from "./actions";

// The emailed link lands here with ?token=, or with ?error=INVALID_TOKEN when Neon Auth
// rejected it. Open to visitors without a session (proxy.ts does not match it).
export const dynamic = "force-dynamic";

export default async function ResetPassword({ searchParams }: { searchParams: Search }) {
  const q = await searchParams;
  const token = typeof q.token === "string" ? q.token : "";
  const { error } = await flash(searchParams);
  const invalid = error === "INVALID_TOKEN" || !token;
  return (
    <Shell user={null}>
      <Card className="mx-auto mt-8 w-full max-w-sm">
        <CardHeader>
          <CardTitle>New password</CardTitle>
          <CardDescription>From the link in your mail, valid for 15 minutes.</CardDescription>
        </CardHeader>
        <CardContent>
          {invalid ? (
            <Flash error="This link is not valid, or it has expired. Ask for a new one." />
          ) : (
            <>
              <Flash error={error} />
              <form action={resetPassword} className="grid gap-4">
                <input type="hidden" name="token" value={token} />
                <Field label="New password">
                  <Input type="password" name="password" required minLength={8} autoComplete="new-password" />
                </Field>
                <Field label="Again">
                  <Input type="password" name="password_again" required minLength={8} autoComplete="new-password" />
                </Field>
                <Button type="submit" className="w-full">
                  Set the password
                </Button>
              </form>
            </>
          )}
        </CardContent>
        <CardFooter className="gap-4">
          <a href="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
            Ask for a new link
          </a>
          <a href="/sign-in" className="text-sm text-muted-foreground hover:text-foreground">
            Sign in
          </a>
        </CardFooter>
      </Card>
    </Shell>
  );
}
