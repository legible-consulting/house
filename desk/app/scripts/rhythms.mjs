// Writes the morning glance and the monthly close as files, with the app's own rules: this
// script imports lib/rhythms.ts (Node 24 strips the types) and reads lib/house.json, so run
// scripts/read-house.mjs first. It does not touch git: rhythms.yml commits the result. Usage,
// from desk/app:
//   node scripts/rhythms.mjs glance [--root <dir>]          desk/glance/<date>.md
//   node scripts/rhythms.mjs close [YYYY-MM] [--root <dir>]  desk/close/<YYYY-MM>.md
// The close covers the month that ended before today unless a month is given: the workflow
// runs on the 1st. --root writes under <dir>/desk/ instead of the house (check.yml uses it to
// run the script on every push without a commit). The glance keeps the latest file only and
// the closes keep 13 months, which /close?month= reads. Git holds the past.
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { STAGES, close, closeTotals, glance, money, today as lisbon } from "../lib/rhythms.ts";

const app = fileURLToPath(new URL("..", import.meta.url));
const house = JSON.parse(readFileSync(join(app, "lib", "house.json"), "utf8"));

const args = process.argv.slice(2);
const at = args.indexOf("--root");
const root = at >= 0 ? args.splice(at, 2)[1] : join(app, "..", "..");
if (!root) throw new Error("--root needs a directory");
const [rhythm, monthArg] = args;

const today = lisbon();
const addMonths = (month, n) => {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 7);
};

// A table cell: one line, no pipe. A client name links to the record, as the glance does;
// read-house.mjs turns the link into the client's page in the desk.
const cell = (v) => String(v ?? "").replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ").trim();
const recordOf = (c) => `../../clients/${c.slug}/record.md`;
const link = (c) => `[${cell(c.name ?? c.slug)}](${recordOf(c)})`;
const front = (fields) => ["---", ...Object.entries(fields).map(([k, v]) => `${k}: ${v}`), "---"].join("\n");

function write(dir, name, text) {
  const out = join(root, "desk", dir);
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, name), text);
  console.log(`Wrote desk/${dir}/${name}`);
}

// Delete the files whose name, without .md, sorts before the cutoff and matches the pattern.
function prune(dir, pattern, cutoff) {
  const path = join(root, "desk", dir);
  if (!existsSync(path)) return;
  for (const f of readdirSync(path)) {
    const key = f.replace(/\.md$/, "");
    if (f.endsWith(".md") && pattern.test(key) && key < cutoff) {
      rmSync(join(path, f));
      console.log(`Deleted desk/${dir}/${f}`);
    }
  }
}

// Delete every file in the folder that matches the pattern, except the one named.
function keepOnly(dir, pattern, name) {
  const path = join(root, "desk", dir);
  if (!existsSync(path)) return;
  for (const f of readdirSync(path)) {
    if (f !== name && f.endsWith(".md") && pattern.test(f.replace(/\.md$/, ""))) {
      rmSync(join(path, f));
      console.log(`Deleted desk/${dir}/${f}`);
    }
  }
}

function writeGlance() {
  const text = [
    front({ title: `Morning glance ${today}`, kind: "glance", date: today }),
    `# Morning glance ${today}`,
    "",
    glance(house.clients, house.decides.body, today, recordOf),
  ].join("\n");
  write("glance", `${today}.md`, text);
  keepOnly("glance", /^\d{4}-\d{2}-\d{2}$/, `${today}.md`);
  return today;
}

function writeClose() {
  const month = monthArg ?? addMonths(today.slice(0, 7), -1);
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new Error(`month "${month}" is not YYYY-MM`);
  const { rows, projected } = close(house.clients);
  const t = closeTotals(rows);
  const cur = rows[0]?.currency ?? "EUR";
  const m = (n, c = cur) => (n === null || n === undefined ? "—" : money(n, c));
  const lines = [
    front({ title: `Monthly close ${month}`, kind: "close", date: today, month }),
    `# Monthly close ${month}`,
    "",
    `Written ${today} by \`rhythms.yml\` from the house as of this date. Every engaged client against its \`quote/economics.yaml\`: the agreed price, the quote's estimate of the hours and the cost per month, and what is left. The house measures neither hours nor cost. Invoices and payments are handled outside the house.`,
    "",
    "## Engagements",
    "",
  ];
  if (rows.length === 0) {
    lines.push("Nothing to close: no client is at agreement or later.");
  } else {
    lines.push(
      "| Client | Kind | Price | Hours / month | Cost / month | Margin / month | Hourly | Commission owed |",
      "|---|---|--:|--:|--:|--:|--:|--:|",
    );
    for (const r of rows) {
      const c = r.client;
      const price = r.price === null ? "not set" : `${money(r.price, r.currency)} ${r.priceKind === "total" ? "total" : "/ month"}`;
      lines.push(
        `| ${link(c)} | ${cell(c.kind)} | ${price} | ${r.hours === null ? "—" : r.hours} | ${m(r.cost, r.currency)} | ${m(r.margin, r.currency)} | ${m(r.hourly, r.currency)} | ${m(r.commission, r.currency)} |`,
      );
    }
    lines.push(
      `| **Total** | | **${m(t.monthly)} / month** | **${t.hours}** | **${m(t.cost)}** | **${m(t.margin)}** | | **${m(t.commission)}** |`,
    );
  }
  if (projected.length > 0) {
    lines.push(
      "",
      `Projected, not agreed: ${projected
        .map((r) => `${link(r.client)} (${r.client.stage}) ${r.price === null ? "no price" : `${money(r.price, r.currency)} ${r.priceKind === "total" ? "total" : "/ month"}`}`)
        .join(", ")}.`,
    );
  }
  lines.push(
    "",
    "Price is `price.monthly` for a retainer or a role and `price.total` for a build. Hours and cost are the quote's estimates, `hours.per_month` and `costs_monthly`. Margin is the monthly price less the monthly cost, and hourly is the monthly price over the hours; a build shows neither, because its price is a total. Commission is the record's `commission.owed`, settled as the client pays, outside the house (`sell/01-prospecting/prospect.md`).",
    "",
    "## Pipeline",
    "",
    "The pool's counts and the conversion are not in the house: the desk reads them live from the pool on `/close`.",
    "",
    "The folders by stage:",
    "",
    `| ${STAGES.join(" | ")} |`,
    `|${STAGES.map(() => "--:").join("|")}|`,
    `| ${STAGES.map((s) => house.clients.filter((c) => c.stage === s).length).join(" | ")} |`,
    "",
    `${house.clients.length} client folders.`,
    "",
  );
  write("close", `${month}.md`, lines.join("\n"));
  // Keep 13 months: delete a close whose month is before the month 13 months ago.
  prune("close", /^\d{4}-\d{2}$/, addMonths(today.slice(0, 7), -13));
  return month;
}

let done;
if (rhythm === "glance") done = writeGlance();
else if (rhythm === "close") done = writeClose();
else throw new Error("usage: node scripts/rhythms.mjs glance|close [YYYY-MM] [--root <dir>]");

if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `name=${done}\n`);
