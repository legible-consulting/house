import { Field, FieldActions, FieldGroup } from "@/components/desk/field-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { LANGUAGES } from "@/lib/pool";
import type { Words } from "@/lib/words";
import { addProspect } from "./actions";

// The add form: company and source are required (prospect.md, Fields); the rest is on the
// row's page. The page puts it in the drawer or the card (./_add.tsx). The labels are the user's
// words (lib/words.ts); a language code and a country code stay the model's.
export function AddProspectForm({ w }: { w: Words }) {
  return (
    <form action={addProspect}>
      <FieldGroup>
        <Field label={w.fields.company}>
          <Input name="company" required autoComplete="organization" enterKeyHint="next" />
        </Field>
        <Field label={w.fields.source}>
          <Input name="source" required placeholder={w.placeholders.source} enterKeyHint="next" />
        </Field>
        <Field label={w.fields.contact}>
          <Input name="contact_name" autoComplete="name" enterKeyHint="next" />
        </Field>
        <Field label={w.fields.email}>
          <Input type="email" name="email" autoComplete="email" inputMode="email" enterKeyHint="next" />
        </Field>
        <Field label={w.fields.phone}>
          <Input name="phone" placeholder="+351 …" autoComplete="tel" inputMode="tel" enterKeyHint="next" />
        </Field>
        <Field label={w.fields.whatsapp}>
          <Input name="whatsapp" placeholder="+351 …" inputMode="tel" enterKeyHint="next" />
        </Field>
        <Field label={w.fields.instagram}>
          <Input
            name="instagram"
            placeholder={w.placeholders.handle}
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="next"
          />
        </Field>
        <Field label={w.fields.country}>
          <Input name="country" placeholder="PT, BE, GB" maxLength={2} autoComplete="country" enterKeyHint="next" />
        </Field>
        <Field label={w.fields.language}>
          <NativeSelect name="language" defaultValue="">
            <NativeSelectOption value="">—</NativeSelectOption>
            {LANGUAGES.map((l) => (
              <NativeSelectOption key={l} value={l}>
                {l}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field label={w.fields.notes} full>
          <Textarea name="notes" rows={2} />
        </Field>
        <FieldActions>
          <Button type="submit">{w.add.submit}</Button>
        </FieldActions>
      </FieldGroup>
    </form>
  );
}
