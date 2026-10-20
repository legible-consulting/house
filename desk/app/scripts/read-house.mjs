// Reads the house at build time: clients/*/record.md frontmatter for the clients table, and
// clients/_template/record.md for the handoff PR. Writes lib/house.json, which the pages
// import, so the deployed function never touches the repo. Runs first in `npm run build`.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const app = fileURLToPath(new URL("..", import.meta.url));
const clientsDir = join(app, "..", "..", "clients");

const frontmatter = (raw) => parse(raw.split(/^---$/m)[1] ?? "") ?? {};

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

writeFileSync(join(app, "lib", "house.json"), JSON.stringify({ clients, template }, null, 2));
console.log(`lib/house.json: ${clients.length} clients`);
