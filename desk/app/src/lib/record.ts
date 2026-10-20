import template from "../../../../clients/_template/record.md?raw";
import type { DeskUser, Prospect } from "./db";

// A YAML double-quoted scalar: JSON strings are valid YAML, so quotes and colons in a
// company name cannot break the frontmatter that check.yml parses.
const y = (s: string) => JSON.stringify(s ?? "");

// The slug is the folder name under clients/: ASCII, lower case, dashes.
export function slugOf(company: string): string {
  const slug = company
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/, "");
  return slug || "prospect";
}

// clients/<slug>/record.md from clients/_template/record.md (read at build time) and the
// prospect's facts. Fields the template has and the pool does not stay empty for Jamie.
export function renderRecord(p: Prospect, salesman: DeskUser, slug: string, today: string): string {
  const who = salesman.email;
  const contact = [p.contact_name, p.email ? `<${p.email}>` : ""].filter(Boolean).join(" ");
  const facts = [
    contact ? `Contact: ${contact}.` : "",
    p.source ? `Source: ${p.source}.` : "",
    `Handed off from the pool by ${who} on ${today}.`,
  ]
    .filter(Boolean)
    .join(" ");
  const body = [p.notes.trim(), facts].filter(Boolean).join("\n\n");

  return template
    .replace("name: {{CLIENT_NAME}}", `name: ${y(p.company)}`)
    .replaceAll("{{CLIENT_NAME}}", p.company)
    .replaceAll("{{SLUG}}", slug)
    .replace("language: {{CLIENT_LANGUAGE}}", `language: ${y(p.language)}`)
    .replace("{{YYYY-MM-DD}}", today)
    .replace(/^next_action:$/m, `next_action: ${y(p.next_action)}`)
    .replace(/^salesman:$/m, `salesman: ${y(who)}`)
    .replace(/^  sourced_by:$/m, `  sourced_by: ${y(who)}`)
    .replace(/^One paragraph:.*$/m, body);
}
