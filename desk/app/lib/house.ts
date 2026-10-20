import data from "./house.json";

// The house at build time: lib/house.json is written by scripts/read-house.mjs from
// clients/*/record.md, clients/_template/record.md and sell/01-prospecting/. The deployed
// function never reads the repo.
export interface ClientRow {
  slug: string;
  name?: string;
  stage?: string;
  kind?: string | null;
  tier?: string | null;
  next_action?: string | null;
  deadline?: string | null;
  repo?: string | null;
}

export const clients = data.clients as unknown as ClientRow[];
export const template: string = String(data.template);
export const clientSlugs = new Set(clients.map((c) => c.slug));

export const day = (v: unknown): string => String(v ?? "").slice(0, 10);

// S1's words for a salesman, from sell/01-prospecting/: the target profile, the cadence and
// the pitch drafts. Each is a markdown body without its frontmatter, plus the title from it.
export interface Doc {
  file: string;
  title: string;
  body: string;
}
export interface Pitch extends Doc {
  touch: number;
  language: string;
}
export const sell = data.sell as unknown as { profile: Doc; cadence: Doc; pitch: Pitch[] };
