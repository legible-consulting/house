import { FORM_LANGUAGES, type FormLanguage } from "./forms";

// A sent link: one row of the Neon table `links` (db/schema.sql), a questionnaire Jamie sends
// to one lead or client from the Send a form card (app/_send.tsx). The row's id is the token.

export interface SentLink {
  id: string;
  form: string;
  title: string; // the frozen title, from the snapshot
  language: FormLanguage;
  name: string;
  email: string;
  sent: string; // YYYY-MM-DD
  answered: string | null; // YYYY-MM-DD, null until /f/<id> takes the answers
}

// The production host, not the request's: Jamie pastes the link into a mail, and a preview's
// address would die with the preview (why: the row lives in the one Neon database the
// production desk reads · 2026-10-26).
export const linkUrl = (id: string): string => `https://desk.jamienisbet.com/f/${id}`;

export const isFormLanguage = (v: unknown): v is FormLanguage =>
  typeof v === "string" && (FORM_LANGUAGES as readonly string[]).includes(v);

// A record's or a pool row's language as one of the forms' three: the tag itself, else the
// one with the same first two letters ("en", "en-US" → en-GB), else en-GB.
export function formLanguageOf(v: string | null | undefined): FormLanguage {
  if (isFormLanguage(v)) return v;
  const two = (v ?? "").slice(0, 2).toLowerCase();
  return FORM_LANGUAGES.find((l) => l.startsWith(two)) ?? "en-GB";
}
