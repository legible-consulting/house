// Writes the Friday review and the monthly close as files, the way sweep-deadlines writes the
// glance, so phone, Google and terminal read the same words as the desk. The rules are the
// app's own: this script imports lib/rhythms.ts (Node 24 strips the types) and reads
// lib/house.json, so run scripts/read-house.mjs first. It does not touch git: rhythms.yml
// commits the result. Usage, from desk/app:
//   node scripts/rhythms.mjs review [--root <dir>]          desk/review/<ISO week>.md
//   node scripts/rhythms.mjs close [YYYY-MM] [--root <dir>]  desk/close/<YYYY-MM>.md
// The close covers the month that ended before today unless a month is given: the workflow
// runs on the 1st. --root writes under <dir>/desk/ instead of the house (check.yml uses it to
// run the script on every push without a commit). It deletes reviews older than 8 weeks and
// closes older than 13 months, the way the sweep prunes the glances.
import { appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { STAGES, close, isoWeek, money, review } from "../lib/rhythms.ts";

const app = fileURLToPath(new URL("..", import.meta.url));
const house = JSON.parse(readFileSync(join(app, "lib", "house.json"), "utf8"));

const args = process.argv.slice(2);
const at = args.indexOf("--root");
const root = at >= 0 ? args.splice(at, 2)[1] : join(app, "..", "..");
if (!root) throw new Error("--root needs a directory");
const [rhythm, monthArg] = args;

// Today in Lisbon, as the sweep dates the glance.
const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Lisbon" }).format(new Date());
const addDays = (d, n) => new Date(Date.parse(`${d}T00:00:00Z`) + n * 86400000).toISOString().slice(0, 10);
const addMonths = (month, n) => {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + n, 1)).toISOString().slice(0, 7);
};

// A table cell: one line, no pipe. A client name links to the record, as the glance does;
// read-house.mjs turns the link into the client's page in the desk.
const cell = (v) => String(v ?? "").replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ").trim();
const link = (c) => `[${cell(c.name ?? c.slug)}](../../clients/${c.slug}/record.md)`;
const day = (v) => String(v ?? "").slice(0, 10);
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

function writeReview() {
  const week = isoWeek(today);
  const { rows, ongoing } = review(house.clients, today);
  const lines = [
    front({ title: `Friday review ${week}`, kind: "review", date: today, week }),
    `# Friday review ${week}`,
    "",
    `${today}. Every client's next action and deadline, the soonest deadline first, then the open items. Written by \`rhythms.yml\` from the house as of this date.`,
    "",
    "## Clients",
    "",
  ];
  if (rows.length === 0) {
    lines.push("No client with a next action or a deadline.");
  } else {
    lines.push("| Client | Stage | Kind | Next action | Deadline | Days | Salesman |", "|---|---|---|---|---|---|---|");
    for (const { client: c, days } of rows) {
      const left = days === null ? "" : days < 0 ? `**${-days} overdue**` : days <= 7 ? `**${days}**` : String(days);
      lines.push(
        `| ${link(c)} | ${cell(c.stage)} | ${cell(c.kind)} | ${cell(c.next_action) || "no next action"} | ${day(c.deadline)} | ${left} | ${cell(c.salesman)} |`,
      );
    }
  }
  if (ongoing.length > 0) {
    lines.push("", `Ongoing, no next action needed: ${ongoing.map((c) => `${c.name ?? c.slug} (${c.kind})`).join(", ")}.`);
  }
  lines.push("", "## Open items", "", house.openItems.body.replace(/^# .*\n+/, "").trim(), "");
  write("review", `${week}.md`, lines.join("\n"));
  // Keep 8 weeks: delete a review whose week is before the week 56 days ago.
  prune("review", /^\d{4}-W\d{2}$/, isoWeek(addDays(today, -56)));
  return week;
}

function writeClose() {
  const month = monthArg ?? addMonths(today.slice(0, 7), -1);
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) throw new Error(`month "${month}" is not YYYY-MM`);
  const rows = close(house.clients, month);
  const cur = rows[0]?.currency ?? "EUR";
  const m = (n, c = cur) => (n ? money(n, c) : "—");
  const total = (k) => rows.reduce((n, r) => n + r[k], 0);
  const commission = rows.reduce((n, r) => n + (r.commission ?? 0), 0);
  const lines = [
    front({ title: `Monthly close ${month}`, kind: "close", date: today, month }),
    `# Monthly close ${month}`,
    "",
    `Written ${today} by \`rhythms.yml\` from the house as of this date. Amounts exclude VAT. Owed is every invoice issued by the month's end and unpaid at it.`,
    "",
    "## Money",
    "",
  ];
  if (rows.length === 0) {
    lines.push("Nothing to close: no client has an invoice in `quote/invoices/` or an `economics.yaml`.");
  } else {
    lines.push(
      "| Client | Kind | Invoiced | Paid | Owed | Overdue | Cost / month | Margin / month | Commission due |",
      "|---|---|--:|--:|--:|--:|--:|--:|--:|",
    );
    for (const r of rows) {
      const c = r.client;
      const due = c.salesman ? (r.commission === null ? "owed not set" : money(r.commission, r.currency)) : "—";
      lines.push(
        `| ${link(c)} | ${cell(c.kind)} | ${m(r.invoiced, r.currency)} | ${m(r.paid, r.currency)} | ${m(r.owed, r.currency)} | ${r.overdue ? `**${money(r.overdue, r.currency)}**` : "—"} | ${r.costMonthly === null ? "—" : money(r.costMonthly, r.currency)} | ${r.marginMonthly === null ? "—" : money(r.marginMonthly, r.currency)} | ${due} |`,
      );
    }
    lines.push(
      `| **Total** | | **${m(total("invoiced"))}** | **${m(total("paid"))}** | **${m(total("owed"))}** | **${m(total("overdue"))}** | | | **${m(commission)}** |`,
    );
  }
  lines.push(
    "",
    "Cost and margin per month come from each client's `quote/economics.yaml`, where a value marked estimate stays an estimate until measured. Commission is the record's `commission.owed`, due in proportion to what the client paid this month (`sell/01-prospecting/prospect.md`).",
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
if (rhythm === "review") done = writeReview();
else if (rhythm === "close") done = writeClose();
else throw new Error('usage: node scripts/rhythms.mjs review|close [YYYY-MM] [--root <dir>]');

if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `name=${done}\n`);
