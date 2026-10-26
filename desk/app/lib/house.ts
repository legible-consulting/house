import type { FormLanguage, FormSnapshot } from "./forms";
import data from "./house.json";

// The house at build time: lib/house.json is written by scripts/read-house.mjs (the list of
// what it reads is there). The deployed function never reads the repo. A change in the
// house ships with the next push to main.

export interface Doc {
  file: string;
  title: string;
  date?: string;
  body: string;
}

export interface ClientDoc extends Doc {
  stage: "proposal" | "quote" | "agreement" | "handover";
}

// quote/economics.yaml, the quote's file (04-quote/CONTEXT.md). The close reads the price
// (`price.monthly` for a retainer or a role, `price.total` for a build) and the estimates
// (`hours.per_month`, `costs_monthly`).
export interface Economics {
  kind?: string;
  currency?: string;
  price?: Record<string, number | string>;
  hours?: Record<string, number | string>;
  costs_monthly?: Record<string, number | string>;
}

// The repo's line in the latest drift report (desk/estate/drift-<date>.md, conformance).
export interface Blueprint {
  tracks: string; // the blueprint tag the repo tracks, or "—"
  drift: string; // "current", "behind: copier update", "not adopted: …"
}

export interface ClientRow {
  slug: string;
  name?: string;
  language?: string;
  stage?: string;
  kind?: string | null;
  opened?: string | null;
  next_action?: string | null;
  deadline?: string | null;
  salesman?: string | null;
  commission?: { sourced_by?: string | null; owed?: number | string | null } | null;
  repo?: string | null;
  owner?: string | null;
  vercel_project?: string[] | null;
  economics: Economics | null;
  documents: ClientDoc[];
  blueprint: Blueprint | null;
}

export interface Pitch extends Doc {
  touch: number;
  language: string;
}

// 01-prospecting/kit.<language>.md: the seller kit, one per language.
export interface Kit extends Doc {
  language: string;
}

// The latest drift report: its file, its date and the blueprint tag it was read against.
export interface Estate {
  file: string;
  date: string;
  blueprint: string;
}

export const built: string = String(data.built);
export const clients = data.clients as unknown as ClientRow[];
export const clientBySlug = (slug: string): ClientRow | undefined => clients.find((c) => c.slug === slug);
export const template: string = String(data.template);
export const clientSlugs = new Set(clients.map((c) => c.slug));
// The Jamie's hand list of .icm/intake/README.md, as the glance prints it.
export const hand = data.hand as Doc;
export const estate = data.estate as unknown as Estate | null;
// Every desk/close/<YYYY-MM>.md (rhythms.yml).
export const closeDocs = data.closes as unknown as Doc[];
export const sell = data.sell as unknown as { profile: Doc; cadence: Doc; pitch: Pitch[]; kit: Kit[] };

export const day = (v: unknown): string => String(v ?? "").slice(0, 10);

// research/{verdicts,concepts}/<slug>.md (research, research/CONTEXT.md): one
// verdict or concept, its frontmatter as fields and its body as markdown without the title.
export interface Verdict {
  slug: string;
  folder: "verdicts" | "concepts";
  name: string;
  kind: string;
  verdict: string;
  tier: string;
  use: string[];
  tags: string[];
  recheck: string;
  source: string;
  via: string;
  date: string;
  body: string;
}

// Every verdict and concept, by name.
export const research = data.research as unknown as Verdict[];
export const verdictBySlug = (slug: string): Verdict | undefined => research.find((v) => v.slug === slug);

// Every form of the house (*/forms/<form>.<language>.md), parsed by lib/forms.ts: by form slug,
// then language.
export const forms = data.forms as unknown as Record<string, Partial<Record<FormLanguage, FormSnapshot>>>;
