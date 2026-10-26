"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { answersFile, checkAnswers, writeAnswers } from "@/lib/answers";
import { countSubmission } from "@/lib/db";
import type { FormSnapshot } from "@/lib/forms";
import { forms } from "@/lib/house";
import { EMAIL_RE, insertLead, leadFields, MAX } from "@/lib/lead";
import { mailJamie } from "@/lib/mail";
import { COPY, languageOf, type StartState } from "./copy";

// The free look's submit. The questions are read again from the build, never from the post
// (why: a doctored post cannot skip a required question · 2026-10-25). In order:
// 1. A filled honeypot is thanked, and nothing is stored.
// 2. A bad answer comes back with the error under its field. The page keeps what was typed.
// 3. The submission counts against the hashed IP and the hour. A sixth is thanked and dropped.
// 4. The pool row, as POST /api/pool inserts it (lib/lead.ts): the open row with that email
//    when there is one, and then nothing is inserted.
// 5. The answers to 01-prospecting/leads/<slug>/free-look-<date>.md on main.
// 6. One mail to Jamie, reply-to the visitor. The visitor gets no mail.
// A failed row is an error on the page, and the visitor can send again. A failed file goes
// into the mail with the reason, and the visitor sees the confirmation (why: the row is in, and
// the mail then holds the answers · 2026-10-26).

const FORM = "free-look";
const PER_HOUR = 5;
const POOL_URL = "https://desk.jamienisbet.com/pool";

// option position → pool field (forms-in-the-house: the language files share positions).
const SERVICE = ["site", "app", "platform", "unknown"]; // done_looks_like, the 4th question
const DEAL_SIZE = ["<2k", "<2k", "2k-10k", "2k-10k", "10k-30k", ""]; // budget, the 7th
const LANGUAGE = ["en-GB", "fr-BE", "pt-PT"]; // language, the 8th

const optionAt = (form: FormSnapshot, key: string, answer: string): number =>
  form.fields.find((f) => f.key === key)?.options?.indexOf(answer) ?? -1;

// The visitor's IP, hashed: Vercel sets x-forwarded-for, and the first address is the client.
async function ipHash(): Promise<string> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

export async function submitStart(_prev: StartState, data: FormData): Promise<StartState> {
  const language = languageOf(data.get("lang"));
  const copy = COPY[language];
  const form = forms[FORM]?.[language];
  if (!form) return { status: "error", message: copy.errors.failed };

  if (String(data.get("company") ?? "")) return { status: "done" };

  const get = (name: string) => String(data.get(name) ?? "").trim();
  const who = { name: get("name"), email: get("email").toLowerCase(), phone: get("phone") };
  const values: Record<string, string> = Object.fromEntries(form.fields.map((f) => [f.key, get(`q_${f.key}`)]));

  const errors = checkAnswers(form, values, copy.errors);
  if (!who.name || who.name.length > MAX.name) errors.name = copy.errors.name;
  if (!who.email) errors.email = copy.errors.email;
  else if (!EMAIL_RE.test(who.email) || who.email.length > MAX.email) errors.email = copy.errors.emailInvalid;
  if (who.phone.length > MAX.phone) errors.phone = copy.errors.long(MAX.phone);
  if (Object.keys(errors).length) return { status: "error", message: copy.errors.fix, errors };

  // A ticked box is the visitor's own yes; the free look has none today.
  const answers: Record<string, string> = Object.fromEntries(
    form.fields.map((f) => [f.key, f.type === "boolean" ? (values[f.key] ? copy.yes : copy.no) : values[f.key]]),
  );

  // A count that fails lets the submission through (why: the limit guards the pool, and a
  // missing `throttle` table must not close the door · 2026-10-26).
  const count = await countSubmission(await ipHash()).catch((e) => {
    console.error("[start] the throttle count failed:", e);
    return 0;
  });
  if (count > PER_HOUR) return { status: "done" };

  let lead: Awaited<ReturnType<typeof insertLead>>;
  try {
    const ask = [answers.eats_the_week, answers.business ? `(${answers.business})` : ""].filter(Boolean).join(" ");
    const spoken = LANGUAGE[optionAt(form, "language", answers.language)];
    lead = await insertLead({
      ...leadFields({ name: who.name, email: who.email, phone: who.phone, message: ask || who.name, language: spoken ?? language }),
      source: "free look",
      service: SERVICE[optionAt(form, "done_looks_like", answers.done_looks_like)] ?? "",
      deal_size: DEAL_SIZE[optionAt(form, "budget", answers.budget)] ?? "",
    });
  } catch (e) {
    console.error("[start] the pool row failed:", e);
    return { status: "error", message: copy.errors.failed };
  }

  const at = new Date();
  let file: string;
  try {
    file = await writeAnswers(
      `01-prospecting/leads/${lead.slug}`,
      FORM,
      answersFile(form, who, answers, "start", at),
      at,
      `lead: free look from ${lead.slug}`,
    );
  } catch (e) {
    console.error("[start] the answers file failed:", e);
    file = `not written (${e instanceof Error ? e.message : String(e)}). The answers are only in this mail.`;
  }

  const text = [
    `${who.name} <${who.email}>${who.phone ? `, ${who.phone}` : ""} sent the free look in ${language}.`,
    `Pool row: ${POOL_URL}/${lead.id}${lead.open ? " (open already: no second row)" : " (new)"}`,
    `Answers file: ${file}`,
    ...form.fields.map((f) => `${f.label}\n${answers[f.key] || "—"}`),
  ].join("\n\n");
  await mailJamie({ subject: `Free look: ${who.name}`, text, replyTo: who.email });
  return { status: "done" };
}
