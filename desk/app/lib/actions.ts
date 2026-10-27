import type { ClientRow } from "./house";
import { glanceRows, type GlanceRow } from "./rhythms";

// The home's next client actions (desk/app/DESIGN.md, rule 1): the glance's rows, each as an
// urgency and the prompt Jamie copies into a session on the house to do the action. The
// prompt carries the context a cold session needs: the action, the deadline, the record's
// fields and body, the folder's files and the contract to read first.

export type Urgency = "overdue" | "soon" | "later" | "open";

// Overdue: past the deadline. Soon: today or inside seven days. Later: a deadline after that.
// Open: no valid deadline.
export const urgencyOf = (days: number | null): Urgency =>
  days === null ? "open" : days < 0 ? "overdue" : days <= 7 ? "soon" : "later";

export interface Action extends GlanceRow {
  urgency: Urgency;
  prompt: string;
}

// The contract a stage's next action starts from (CLAUDE.md, Routing). A training goes to
// training/ from the agreement on: it has no build and no handover.
export function contractOf(c: ClientRow): string {
  if (c.kind === "training" && ["kickoff", "build", "handover", "after"].includes(c.stage ?? "")) {
    return "training/CONTEXT.md";
  }
  switch (c.stage) {
    case "prospect":
    case "research":
      return "02-client-research/CONTEXT.md";
    case "proposal":
      return "03-proposal/CONTEXT.md";
    case "agreement":
      return "05-agreement/CONTEXT.md";
    case "kickoff":
      return "06-kickoff/CONTEXT.md";
    case "build":
      return "07-build/CONTEXT.md";
    case "handover":
    case "after":
      return "08-handover/CONTEXT.md";
    default:
      return "clients/CONTEXT.md";
  }
}

const oneLine = (v: unknown): string => String(v ?? "").replace(/\s*\n\s*/g, " ").trim();

function dueLine({ deadline, days }: GlanceRow): string {
  if (!deadline) return "No deadline.";
  if (days === null) return `${deadline}.`;
  if (days < 0) return `${deadline}, ${-days} ${-days === 1 ? "day" : "days"} overdue.`;
  if (days === 0) return `${deadline}, today.`;
  return `${deadline}, in ${days} ${days === 1 ? "day" : "days"}.`;
}

// The words Jamie pastes into a new session on legible-consulting/house. Technical text in
// Simplified Technical English (CLAUDE.md, Writing). The Boundaries of CLAUDE.md stay the
// session's rules: the prompt repeats the ones a client action touches.
export function actionPrompt(row: GlanceRow): string {
  const c = row.client;
  const name = c.name ?? c.slug;
  const folder = `clients/${c.slug}/`;
  const facts = [
    `- Stage: ${c.stage ?? "not set"}. Kind: ${c.kind ?? "not set"}. Language: ${c.language ?? "not set"}.`,
    `- Deadline: ${dueLine(row)}`,
    `- Folder: ${folder}`,
    c.repo ? `- Client repo: ${c.repo}` : "",
    c.drive ? `- Drive: ${c.drive}` : "",
    c.agreement_drive ? `- Agreement in Drive: ${c.agreement_drive}` : "",
    `- Desk: https://desk.jamienisbet.com/clients/${c.slug}`,
  ].filter(Boolean);
  const files = (c.files ?? []).map((f) => `- ${folder}${f}`);
  const lines = [
    `Repo legible-consulting/house. Client action for ${name} (${c.slug}).`,
    "",
    "## The action",
    "",
    oneLine(c.next_action) || "The record has no next action. Read the folder and propose the next action.",
    "",
    "## The facts",
    "",
    ...facts,
    "",
    "## What to read",
    "",
    `1. CLAUDE.md, then ${contractOf(c)}. When the action belongs to another module, route by the Routing table in CLAUDE.md.`,
    `2. ${folder}record.md, then only the files that the contract's Inputs name.`,
    "",
    ...(files.length > 0 ? ["The files in the folder:", "", ...files, ""] : []),
    ...(c.notes ? ["## The record", "", c.notes.trim(), ""] : []),
    "## The rules",
    "",
    "- Draft into the folder. Do not send anything to the client: Jamie sends.",
    `- Write client-facing text in ${c.language ?? "the client's language"}. Write internal notes in English.`,
    `- When the action is done, write the new next_action and deadline in ${folder}record.md. Move stage only as clients/CONTEXT.md says.`,
    "- Do not tick a gate. Do not merge.",
    "- Your last message says what you did, what Jamie must do next, and the files you changed.",
  ];
  return `${lines.join("\n").trim()}\n`;
}

// Every next action, the soonest deadline first (lib/rhythms.ts glanceRows), with its urgency
// and its prompt; and the clients with no next action and no deadline, apart.
export function actions(clients: ClientRow[], day: string): { actions: Action[]; silent: ClientRow[]; ongoing: ClientRow[] } {
  const { rows, ongoing } = glanceRows(clients, day);
  const listed = new Set(rows.map((r) => r.client.slug));
  const ongoingSlugs = new Set(ongoing.map((c) => c.slug));
  return {
    actions: rows.map((r) => ({ ...r, urgency: urgencyOf(r.days), prompt: actionPrompt(r) })),
    silent: clients.filter((c) => c.stage !== "lost" && !listed.has(c.slug) && !ongoingSlugs.has(c.slug)),
    ongoing,
  };
}
