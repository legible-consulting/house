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
import { currentUser, wordsLanguage } from "@/lib/user";
import { words } from "@/lib/words";
import { savePreferences } from "./actions";

// Preferences: the user's own row, for Jamie and a salesman (a client goes to /). The name and
// the email are facts, read-only: Neon Auth holds them. The language is the one choice. With no
// preference saved, the select shows the language the desk reads now, from the browser, and the
// hint says so. The shell's user name links here (components/desk/shell.tsx). The words are the
// user's (lib/words.ts); each language keeps its own name.
export const dynamic = "force-dynamic";

export default async function Preferences({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const [{ error, note }, h] = await Promise.all([flash(searchParams), headers()]);
  const current = languageOf(user, h.get("accept-language"));
  const w = words(await wordsLanguage(user));
  return (
    <>
      <PageHeader user={user} title={w.preferences.title} meta={user.email} />
      <Flash error={error} note={note} />
      <form action={savePreferences} className="grid gap-6">
        <FieldGroup>
          <Field label={w.fields.name}>
            <Input defaultValue={user.name} placeholder="—" readOnly />
          </Field>
          <Field label={w.fields.email}>
            <Input type="email" defaultValue={user.email} readOnly />
          </Field>
          <Field label={w.fields.language} hint={user.language ? undefined : w.preferences.fromBrowser}>
            <NativeSelect name="language" defaultValue={current}>
              {LANGUAGES.map((l) => (
                <NativeSelectOption key={l} value={l} lang={l}>
                  {LANGUAGE_NAMES[l]}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </Field>
          <FieldActions>
            <Button type="submit">{w.save}</Button>
          </FieldActions>
        </FieldGroup>
      </form>
    </>
  );
}
