import { DataTable, type Column } from "@/components/desk/data-table";
import { Field, FieldActions, FieldGroup } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { linksOf } from "@/lib/db";
import { FORM_LANGUAGES } from "@/lib/forms";
import { forms } from "@/lib/house";
import { formLanguageOf, linkUrl, type SentLink } from "@/lib/links";
import { CopyButton } from "./_copy";
import { sendForm } from "./_send-actions";

// The links sent to one slug, or the reason they cannot be read. The table is applied by hand
// from db/schema.sql, so a missing table fails this card only, in words (why: a deploy never
// waits on the console · 2026-10-26).
export async function readLinks(slug: string | null): Promise<{ links: SentLink[]; error: string }> {
  if (!slug) return { links: [], error: "" };
  try {
    return { links: await linksOf(slug), error: "" };
  } catch (e) {
    return { links: [], error: `The sent links do not read: ${e instanceof Error ? e.message : String(e)}` };
  }
}

// Every form of the house by slug, with its en-GB title (or any language's) for the picker.
const formChoices = Object.entries(forms)
  .map(([slug, byLanguage]) => ({ slug, title: (byLanguage["en-GB"] ?? Object.values(byLanguage)[0])?.title ?? slug }))
  .sort((a, b) => a.title.localeCompare(b.title));

// The sent links. On the phone a link is one card: the form, then the language and the dates
// in mono, the person, and the link to copy while it waits for an answer.
const linkColumns: Column<SentLink>[] = [
  { key: "form", label: "Form", phone: "title", cell: (l) => l.title || l.form },
  { key: "language", label: "Language", phone: "meta", cell: (l) => <span className="font-mono text-meta">{l.language}</span> },
  {
    key: "sent",
    label: "Sent",
    phone: "meta",
    cell: (l) => (
      <span className="font-mono text-meta tabular-nums">
        <span className="md:hidden">sent </span>
        {l.sent}
      </span>
    ),
  },
  {
    key: "answered",
    label: "Answered",
    phone: "meta",
    cell: (l) => (
      <span className="font-mono text-meta tabular-nums">
        {l.answered ? (
          <>
            <span className="md:hidden">answered </span>
            {l.answered}
          </>
        ) : (
          "not answered"
        )}
      </span>
    ),
  },
  { key: "to", label: "To", cell: (l) => l.name },
  {
    key: "link",
    label: "Link",
    phone: "action",
    className: "md:w-auto max-md:ml-0 max-md:basis-full",
    cell: (l) =>
      l.answered ? null : (
        <span className="flex flex-wrap items-center gap-2 md:justify-end">
          <code className="font-mono text-meta max-md:break-all">{linkUrl(l.id)}</code>
          <CopyButton text={linkUrl(l.id)} label="Copy" size="xs" />
        </span>
      ),
  },
];

// The Send a form card, Jamie only, on /clients/<slug> and /pool/<id>: pick a form and a
// language, and the desk makes a `links` row with the questions frozen (app/_send-actions.ts).
// The picker is one field group, four across at the desk; the table under it is every link
// sent to this slug, newest first; one not yet answered shows its link to copy. The desk sends
// nothing: Jamie pastes the link into his own mail or WhatsApp (decision 4 of
// .icm/intake/desk-forms).
export function SendForm({
  target,
  read,
  language,
  name,
  email,
}: {
  target: { client: string } | { prospect: string };
  read: { links: SentLink[]; error: string };
  language: string | null | undefined;
  name: string;
  email: string;
}) {
  const [key, value] = "client" in target ? ["client", target.client] : ["prospect", target.prospect];
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Send a form</h2>
        </CardTitle>
        <CardDescription>
          The desk makes the link and sends nothing: copy it into your own mail or WhatsApp.{" "}
          {key === "client"
            ? "The answer also saves the person as a client user of this folder, not active."
            : "The answer is collected only: a pool row has no folder for a user yet."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form action={sendForm}>
          <input type="hidden" name={key} value={value} />
          <FieldGroup className="lg:grid-cols-4">
            <Field label="Form">
              <NativeSelect name="form" required>
                {formChoices.map((f) => (
                  <NativeSelectOption key={f.slug} value={f.slug}>
                    {f.title}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Language">
              <NativeSelect name="language" defaultValue={formLanguageOf(language)}>
                {FORM_LANGUAGES.map((l) => (
                  <NativeSelectOption key={l} value={l}>
                    {l}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Name">
              <Input name="name" defaultValue={name} maxLength={200} required enterKeyHint="next" />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                name="email"
                defaultValue={email}
                maxLength={254}
                required
                inputMode="email"
                enterKeyHint="send"
              />
            </Field>
            <FieldActions>
              <Button type="submit">Send</Button>
            </FieldActions>
          </FieldGroup>
        </form>

        {read.error ? (
          <Flash error={read.error} className="mb-0" />
        ) : (
          <DataTable
            columns={linkColumns}
            rows={read.links}
            rowKey={(l) => l.id}
            empty="No link sent yet. Send makes one."
          />
        )}
      </CardContent>
    </Card>
  );
}
