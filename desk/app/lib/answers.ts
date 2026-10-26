import { stringify } from "yaml";
import type { FormSnapshot } from "./forms";
import { writeFile } from "./github";

// A form's answers: checked against the snapshot the visitor saw, then written to the house as
// one markdown file on main (decision 1 of .icm/intake/desk-forms): frontmatter `kind: answers`,
// `form`, `language`, `folder`, `name`, `email`, `phone`, `answered`, `source`, and one
// `## question` per question with the answer under it, in the words the visitor read. /start
// writes it under 01-prospecting/leads/<slug>/.

// The longest answer, by type. A select is one of its options, and a boolean is a box.
export const MAX_ANSWER = { text: 500, textarea: 2000 } as const;

// The words a failed check says, in the visitor's language.
export interface CheckWords {
  required: string;
  option: string;
  long: (max: number) => string;
}

export interface Identity {
  name: string;
  email: string;
  phone: string;
}

// The posted value of each question by key ("" when skipped; "yes" for a ticked box), to the
// first thing wrong with each, by key. No entry means the answer is good.
export function checkAnswers(
  form: FormSnapshot,
  values: Record<string, string>,
  words: CheckWords,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of form.fields) {
    const v = (values[f.key] ?? "").trim();
    if (!v) {
      if (f.required) errors[f.key] = words.required;
    } else if (f.type === "select") {
      if (!f.options?.includes(v)) errors[f.key] = words.option;
    } else if (f.type === "text" || f.type === "textarea") {
      if (v.length > MAX_ANSWER[f.type]) errors[f.key] = words.long(MAX_ANSWER[f.type]);
    }
  }
  return errors;
}

// An answer as a block under its `##`: a line that starts with `#` is escaped, so a visitor's
// text never opens a question of its own. A skipped answer is a dash.
const block = (text: string) => text.trim().replace(/^(\s*)#/gm, "$1\\#") || "—";

// The file. `answers` holds each question's text as the visitor gave it, by key.
export function answersFile(
  form: FormSnapshot,
  who: Identity,
  answers: Record<string, string>,
  source: "start" | "link",
  at: Date,
): string {
  const front = {
    kind: "answers",
    form: form.slug,
    language: form.language,
    folder: form.folder,
    name: who.name,
    email: who.email,
    phone: who.phone,
    answered: `${at.toISOString().slice(0, 19)}Z`,
    source,
  };
  const body = form.fields.map((f) => `## ${f.label}\n\n${block(answers[f.key] ?? "")}\n`).join("\n");
  return `---\n${stringify(front)}---\n${body}`;
}

// Writes the file to `<dir>/<form>-<YYYY-MM-DD>.md` on main. A second file on the same day gets
// `-2`, then `-3`, up to `-9`. Returns the path written.
export async function writeAnswers(dir: string, form: string, content: string, at: Date, message: string) {
  const base = `${dir}/${form}-${at.toISOString().slice(0, 10)}`;
  for (let n = 1; n <= 9; n++) {
    const path = n === 1 ? `${base}.md` : `${base}-${n}.md`;
    if ((await writeFile(path, content, message)) === "created") return path;
  }
  throw new Error(`${base}.md and -2 to -9 exist already.`);
}
