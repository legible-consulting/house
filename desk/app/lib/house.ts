import data from "./house.json";

// The house at build time: lib/house.json is written by scripts/read-house.mjs (the list of
// what it reads is there). The deployed function never reads the repo. A change in the
// house ships with the next push to main.

export interface Invoice {
  file: string;
  number: string;
  issued: string; // YYYY-MM-DD
  due: string;
  paid: string; // YYYY-MM-DD, or "" while unpaid
  amount: number; // excluding VAT
  currency: string;
  vat: number;
  for: string;
}

export interface Doc {
  file: string;
  title: string;
  date?: string;
  body: string;
}

export interface ClientDoc extends Doc {
  stage: "proposal" | "quote" | "agreement" | "handover";
}

export interface Economics {
  kind?: string;
  currency?: string;
  price?: Record<string, number | string>;
  hours?: Record<string, number | string>;
  costs_monthly?: Record<string, number | string>;
  margin_monthly?: number;
  margin_ratio?: number;
}

export interface ClientRow {
  slug: string;
  name?: string;
  language?: string;
  stage?: string;
  kind?: string | null;
  tier?: string | null;
  opened?: string | null;
  next_action?: string | null;
  deadline?: string | null;
  salesman?: string | null;
  commission?: { sourced_by?: string | null; owed?: number | string | null } | null;
  repo?: string | null;
  owner?: string | null;
  vercel_project?: string[] | null;
  invoices: Invoice[];
  economics: Economics | null;
  documents: ClientDoc[];
}

export interface Pitch extends Doc {
  touch: number;
  language: string;
}

export const built: string = String(data.built);
export const clients = data.clients as unknown as ClientRow[];
export const clientBySlug = (slug: string): ClientRow | undefined => clients.find((c) => c.slug === slug);
export const template: string = String(data.template);
export const clientSlugs = new Set(clients.map((c) => c.slug));
export const openItems = data.openItems as Doc;
export const glance = data.glance as unknown as Doc | null;
export const estate = data.estate as unknown as Doc | null;
export const sell = data.sell as unknown as { profile: Doc; cadence: Doc; pitch: Pitch[] };

export const day = (v: unknown): string => String(v ?? "").slice(0, 10);
