import { Field, FieldActions, FieldGroup } from "@/components/desk/field-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { LANGUAGES } from "@/lib/pool";
import { addProspect } from "./actions";

// The add form: company and source are required (prospect.md, Fields); the rest is on the
// row's page. The page puts it in the drawer or the card (./_add.tsx).
export function AddProspectForm() {
  return (
    <form action={addProspect}>
      <FieldGroup>
        <Field label="Company">
          <Input name="company" required autoComplete="organization" enterKeyHint="next" />
        </Field>
        <Field label="Source">
          <Input name="source" required placeholder="who referred, which event, which list" enterKeyHint="next" />
        </Field>
        <Field label="Contact">
          <Input name="contact_name" autoComplete="name" enterKeyHint="next" />
        </Field>
        <Field label="Email">
          <Input type="email" name="email" autoComplete="email" inputMode="email" enterKeyHint="next" />
        </Field>
        <Field label="Phone">
          <Input name="phone" placeholder="+351 …" autoComplete="tel" inputMode="tel" enterKeyHint="next" />
        </Field>
        <Field label="WhatsApp">
          <Input name="whatsapp" placeholder="+351 …" inputMode="tel" enterKeyHint="next" />
        </Field>
        <Field label="Instagram">
          <Input name="instagram" placeholder="@handle" autoCapitalize="none" spellCheck={false} enterKeyHint="next" />
        </Field>
        <Field label="Country">
          <Input name="country" placeholder="PT, BE, GB" maxLength={2} autoComplete="country" enterKeyHint="next" />
        </Field>
        <Field label="Language">
          <NativeSelect name="language" defaultValue="">
            <NativeSelectOption value="">—</NativeSelectOption>
            {LANGUAGES.map((l) => (
              <NativeSelectOption key={l} value={l}>
                {l}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Notes" full>
          <Textarea name="notes" rows={2} />
        </Field>
        <FieldActions>
          <Button type="submit">Add</Button>
        </FieldActions>
      </FieldGroup>
    </form>
  );
}
