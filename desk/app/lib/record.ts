import { template } from "./house";
import type { Prospect, Touch } from "./pool";

// A YAML double-quoted scalar: JSON strings are valid YAML, so quotes and colons in a
// company name cannot break the frontmatter that check.yml parses.
const y = (s: string) => JSON.stringify(s ?? "");

// clients/<slug>/record.md from clients/_template/record.md (read at build time) and the
// row, by the handoff mapping in sell/01-prospecting/prospect.md. Every field not named
// there keeps the template's value. Replacements are functions: a `$` in a company name
// must stay a `$`.
export function renderRecord(p: Prospect, slug: string, touches: Touch[], today: string): string {
  const salesman = p.sourced_by === "jamie" ? "" : p.sourced_by;
  const n = touches.length;
  const last = touches.map((t) => t.touched_on).sort().at(-1) ?? "";
  const contact = [p.contact_name, p.role, p.email || p.phone, p.country].filter(Boolean).join(", ");
  const line =
    `Sourced by ${p.sourced_by} via ${p.source}. ${n} ${n === 1 ? "touch" : "touches"}, ` +
    `last on ${last}. Contact: ${contact}.`;
  const body = [p.ask.trim(), line].filter(Boolean).join("\n\n");

  return template
    .replace("slug: {{SLUG}}", () => `slug: ${slug}`)
    .replace("name: {{CLIENT_NAME}}", () => `name: ${y(p.company)}`)
    .replace("language: {{CLIENT_LANGUAGE}}", () => `language: ${y(p.language)}`)
    .replace("{{YYYY-MM-DD}}", () => today)
    .replace(/^next_action:$/m, () => (p.next_action ? `next_action: ${p.next_action}` : "next_action:"))
    .replace(/^salesman:$/m, () => (salesman ? `salesman: ${y(salesman)}` : "salesman:"))
    .replace(/^  sourced_by:$/m, () => `  sourced_by: ${y(p.sourced_by)}`)
    .replaceAll("{{CLIENT_NAME}}", () => p.company)
    .replace(/^One paragraph:.*$/m, () => body);
}
