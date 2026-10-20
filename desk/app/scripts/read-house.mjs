// Reads the house at build time: clients/*/record.md frontmatter for the clients table,
// clients/_template/record.md for the handoff PR, and sell/01-prospecting/ for the Sell page.
// Writes lib/house.json, which the pages import, so the deployed function never touches the
// repo. Runs first in `npm run build`.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const app = fileURLToPath(new URL("..", import.meta.url));
const house = join(app, "..", "..");
const clientsDir = join(house, "clients");
const sellDir = join(house, "sell", "01-prospecting");

// A markdown file as its frontmatter fields and its body without them.
const split = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { fm: parse(m[1]) ?? {}, body: m[2].trim() } : { fm: {}, body: raw.trim() };
};
const frontmatter = (raw) => split(raw).fm;

// The template folder is skipped: its {{PLACEHOLDERS}} are not a client.
const clients = readdirSync(clientsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
  .flatMap((d) => {
    try {
      const fm = frontmatter(readFileSync(join(clientsDir, d.name, "record.md"), "utf8"));
      return [{ ...fm, slug: String(fm.slug ?? d.name) }];
    } catch {
      return [];
    }
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

const template = readFileSync(join(clientsDir, "_template", "record.md"), "utf8");

// S1's words for a salesman (sell/01-prospecting/prospect.md, "The salesman's deal"): the
// target profile, the cadence and every pitch draft, in file order (touch, then language).
// Each is its body without the frontmatter; the title comes from the frontmatter.
const doc = (...path) => {
  const { fm, body } = split(readFileSync(join(sellDir, ...path), "utf8"));
  const file = path.at(-1);
  return { fm, doc: { file, title: String(fm.title ?? file), body } };
};
const sell = {
  profile: doc("target-profile.md").doc,
  cadence: doc("cadence.md").doc,
  pitch: readdirSync(join(sellDir, "pitch"))
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((f) => {
      const { fm, doc: d } = doc("pitch", f);
      return { ...d, touch: Number(fm.touch ?? 0), language: String(fm.language ?? "") };
    }),
};

writeFileSync(join(app, "lib", "house.json"), JSON.stringify({ clients, template, sell }, null, 2));
console.log(`lib/house.json: ${clients.length} clients, ${sell.pitch.length} pitch drafts`);
