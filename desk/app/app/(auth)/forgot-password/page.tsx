import { Field } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { AuthCard, AuthLink } from "../_card";
import { requestReset } from "./actions";

// Open to visitors without a session (proxy.ts does not match it).
export const dynamic = "force-dynamic";

export default async function ForgotPassword({ searchParams }: { searchParams: Search }) {
  const { error, note } = await flash(searchParams);
  return (
    <AuthCard
      title="Forgot your password?"
      description="Give your email. A reset link follows."
      footer={<AuthLink href="/sign-in">Back to sign in</AuthLink>}
    >
      <Flash error={error} note={note} />
      <form action={requestReset} className="grid gap-4">
        <Field label="Email">
          <Input type="email" name="email" required autoComplete="username" inputMode="email" enterKeyHint="send" />
        </Field>
        <Button type="submit" className="w-full">
          Send the reset link
        </Button>
      </form>
    </AuthCard>
  );
}
