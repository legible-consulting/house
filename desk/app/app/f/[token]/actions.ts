"use server";

import { answersFile, checkAnswers, writeAnswers } from "@/lib/answers";
import { linkById, markAnswered } from "@/lib/db";
import { existsOnMain } from "@/lib/github";
import { mailJamie } from "@/lib/mail";
import { UUID_RE } from "@/lib/pool";
import { COPY, errorsOf, type LinkState } from "./copy";

// A sent link's submit. The row is read again here, never trusted from the post: its snapshot
// is what was asked, so a doctored post cannot skip a required question. In order:
// 1. No row, or a row answered already: the page's dead end.
// 2. A bad answer comes back with the error under its field. The page keeps what was typed.
// 3. The row is marked answered. The guard is in the update, so a double submit lands once, and
//    the one that matches no row gets the answered dead end.
// 4. The answers to clients/<slug>/<folder>/<form>-<date>.md when clients/<slug>/record.md is
//    on main, else to 01-prospecting/leads/<slug>/<form>-<date>.md.
// 5. One mail to Jamie, with the answers as text, reply-to the row's email.
// The desk marks the row before it writes the file (why: a second submit must see the row
// spent. A failed write is in the Vercel log with the row id · 2026-10-25). The mail still goes,
// with the answers and the reason, and the person sees the confirmation. A failed mark is an
// error on the page, and the person can send again.

export async function submitLink(_prev: LinkState, data: FormData): Promise<LinkState> {
  const id = String(data.get("token") ?? "").toLowerCase();
  if (!UUID_RE.test(id)) return { status: "invalid" };
  let link: Awaited<ReturnType<typeof linkById>>;
  try {
    link = await linkById(id);
  } catch (e) {
    console.error(`[f] link ${id} not read:`, e);
    return { status: "error", message: errorsOf("en-GB").failed };
  }
  if (!link) return { status: "invalid" };
  if (link.answered) return { status: "answered" };

  const words = errorsOf(link.language);
  const form = link.snapshot;
  const get = (name: string) => String(data.get(name) ?? "").trim();
  const values: Record<string, string> = Object.fromEntries(form.fields.map((f) => [f.key, get(`q_${f.key}`)]));
  const errors = checkAnswers(form, values, words);
  if (Object.keys(errors).length) return { status: "error", message: words.fix, errors };

  const { yes, no } = COPY[link.language];
  const answers: Record<string, string> = Object.fromEntries(
    form.fields.map((f) => [f.key, f.type === "boolean" ? (values[f.key] ? yes : no) : values[f.key]]),
  );

  try {
    if (!(await markAnswered(id))) return { status: "answered" };
  } catch (e) {
    console.error(`[f] link ${id} not marked:`, e);
    return { status: "error", message: words.failed };
  }

  const at = new Date();
  let file: string;
  try {
    const client = await existsOnMain(`clients/${link.slug}/record.md`);
    file = await writeAnswers(
      client ? `clients/${link.slug}/${link.folder}` : `01-prospecting/leads/${link.slug}`,
      link.form,
      answersFile(form, { name: link.name, email: link.email, phone: "" }, answers, "link", at),
      at,
      `${client ? "client" : "lead"}: ${link.form} from ${link.slug}`,
    );
  } catch (e) {
    console.error(`[f] link ${id} is marked answered, and the answers file was not written:`, e);
    file = `not written (${e instanceof Error ? e.message : String(e)}). The answers are below and in no file; link ${id}.`;
  }

  const text = [
    `${link.name} <${link.email}> answered ${link.form} in ${link.language}, sent to ${link.slug}.`,
    `Answers file: ${file}`,
    ...form.fields.map((f) => `${f.label}\n${answers[f.key] || "—"}`),
  ].join("\n\n");
  await mailJamie({ subject: `${form.title}: ${link.name}`, text, replyTo: link.email });
  return { status: "done" };
}
