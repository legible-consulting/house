import { parse } from "yaml";

// Read at build time: Vite inlines every clients/*/record.md, so the deployed function never
// touches the repo. The template folder is skipped; its {{PLACEHOLDERS}} are not a client.
const files = import.meta.glob("../../../../clients/*/record.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export interface ClientRow {
  slug: string;
  name: string;
  stage: string;
  kind?: string;
  tier?: string;
  next_action?: string;
  deadline?: string | Date;
  repo?: string;
}

export const clients: ClientRow[] = Object.entries(files)
  .filter(([path]) => !path.includes("/_template/"))
  .map(([, raw]) => parse(raw.split(/^---$/m)[1] ?? "") as ClientRow)
  .sort((a, b) => String(a.slug).localeCompare(String(b.slug)));

export const day = (v: unknown): string =>
  v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? "");
