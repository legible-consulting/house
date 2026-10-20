import data from "./house.json";

// The house at build time: lib/house.json is written by scripts/read-house.mjs from
// clients/*/record.md and clients/_template/record.md. The deployed function never reads
// the repo.
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
