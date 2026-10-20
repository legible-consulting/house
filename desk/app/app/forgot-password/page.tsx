import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { Shell } from "../_shell";
import { Field, Flash } from "../_ui";
import { requestReset } from "./actions";

// Open to visitors without a session (proxy.ts does not match it).
export const dynamic = "force-dynamic";

export default async function ForgotPassword({ searchParams }: { searchParams: Search }) {
  const { error, note } = await flash(searchParams);
  return (
    <Shell user={null}>
      <Card className="mx-auto mt-8 w-full max-w-sm">
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>Give your email. A reset link follows.</CardDescription>
        </CardHeader>
        <CardContent>
          <Flash error={error} note={note} />
          <form action={requestReset} className="grid gap-4">
            <Field label="Email">
              <Input type="email" name="email" required autoComplete="username" />
            </Field>
            <Button type="submit" className="w-full">
              Send the reset link
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <a href="/sign-in" className="text-sm text-muted-foreground hover:text-foreground">
            Back to sign in
          </a>
        </CardFooter>
      </Card>
    </Shell>
  );
}
