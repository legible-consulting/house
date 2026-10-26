import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { linksOf } from "@/lib/db";
import { FORM_LANGUAGES } from "@/lib/forms";
import { forms } from "@/lib/house";
import { formLanguageOf, linkUrl, type SentLink } from "@/lib/links";
import { CopyButton } from "./_copy";
import { sendForm } from "./_send-actions";
import { Field } from "./_ui";

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

// The Send a form card, Jamie only, on /clients/<slug> and /pool/<id>: pick a form and a
// language, and the desk makes a `links` row with the questions frozen (app/_send-actions.ts).
// The list under it is every link sent to this slug, newest first; one not yet answered shows
// its link to copy. The desk sends nothing: Jamie pastes the link into his own mail or WhatsApp
// (decision 4 of .icm/intake/desk-forms).
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
        <CardTitle>Send a form</CardTitle>
        <CardDescription>
          The desk makes the link and sends nothing: copy it into your own mail or WhatsApp.{" "}
          {key === "client"
            ? "The answer also saves the person as a client user of this folder, not active."
            : "The answer is collected only: a pool row has no folder for a user yet."}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form action={sendForm} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input type="hidden" name={key} value={value} />
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
            <Input name="name" defaultValue={name} maxLength={200} required />
          </Field>
          <Field label="Email">
            <Input type="email" name="email" defaultValue={email} maxLength={254} required />
          </Field>
          <div>
            <Button type="submit">Send</Button>
          </div>
        </form>

        {read.error ? (
          <p className="text-sm text-destructive">{read.error}</p>
        ) : read.links.length === 0 ? (
          <p className="text-sm text-muted-foreground">No link sent yet.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Form</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Sent</TableHead>
                <TableHead>Answered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {read.links.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>{l.title || l.form}</TableCell>
                  <TableCell>{l.language}</TableCell>
                  <TableCell>{l.name}</TableCell>
                  <TableCell className="tabular-nums">{l.sent}</TableCell>
                  <TableCell className="tabular-nums">
                    {l.answered ?? (
                      <span className="flex flex-wrap items-center gap-2">
                        <code className="font-mono text-xs break-all">{linkUrl(l.id)}</code>
                        <CopyButton text={linkUrl(l.id)} label="Copy" size="xs" />
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
