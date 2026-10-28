import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Field, FieldActions, FieldGroup } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { flash, type Search } from "@/lib/guard";
import { LANGUAGE_NAMES, languageOf } from "@/lib/language";
import { LANGUAGES } from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { savePreferences } from "./actions";

// Preferences: the user's own row, for Jamie and a salesman (a client goes to /). The name and
// the email are facts, read-only: Neon Auth holds them. The language is the one choice. With no
// preference saved, the select shows the language the desk reads now, from the browser, and the
// hint says so. The shell's user name links here (components/desk/shell.tsx).
export const dynamic = "force-dynamic";

export default async function Preferences({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const [{ error, note }, h] = await Promise.all([flash(searchParams), headers()]);
  const current = languageOf(user, h.get("accept-language"));
  return (
    <>
      <PageHeader user={user} title="Preferences" meta={user.email} />
      <Flash error={error} note={note} />
      <form action={savePreferences} className="grid gap-6">
        <FieldGroup>
          <Field label="Name">
            <Input defaultValue={user.name} placeholder="—" readOnly />
          </Field>
          <Field label="Email">
            <Input type="email" defaultValue={user.email} readOnly />
          </Field>
          <Field label="Language" hint={user.language ? undefined : "From your browser. Save to keep it."}>
            <NativeSelect name="language" defaultValue={current}>
              {LANGUAGES.map((l) => (
                <NativeSelectOption key={l} value={l} lang={l}>
                  {LANGUAGE_NAMES[l]}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
          <FieldActions>
            <Button type="submit">Save</Button>
          </FieldActions>
        </FieldGroup>
      </form>
    </>
  );
}
