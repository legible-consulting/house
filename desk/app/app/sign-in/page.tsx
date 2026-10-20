import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { sessionUser } from "@/lib/user";
import { Shell } from "../_shell";
import { Field, Flash } from "../_ui";
import { signIn } from "./actions";

export const dynamic = "force-dynamic";

export default async function SignIn({ searchParams }: { searchParams: Search }) {
  if (await sessionUser()) redirect("/");
  const { error, note } = await flash(searchParams);
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
