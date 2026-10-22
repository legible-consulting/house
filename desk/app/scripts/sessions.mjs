// Measures a month of Claude Code sessions per client from the transcripts on this machine
// and writes desk/sessions/<YYYY-MM>.yaml, which the monthly close reads for the hours and
// the cost put into each client (lib/rhythms.ts). Jamie only works in sessions, so the
// sessions are the measure; nothing is typed by hand. No dependency: it runs with Node alone.
// Usage, from anywhere:
//   node desk/app/scripts/sessions.mjs <YYYY-MM> [--plan <eur>] [--transcripts <dir>]...
// What it reads: every *.jsonl under ~/.claude/projects (and under each --transcripts dir, for
// transcripts exported from elsewhere). A session belongs to the client whose local-lane
// folder its cwd is in or under: <anything>/projects/<slug>/..., when clients/<slug>/ exists
// in the house; a worktree inside the folder counts. Every other session (the house, the
// blueprint, a personal repo) goes to `other`, so the share of the plan is honest.
// Hours are active time: the gap between one turn and the next, capped at 30 minutes, summed.
// Cost is the plan's price for the month shared by tokens (input, cache and output): without
// --plan the cost is left out and the close shows the estimate. Keeps 13 months of files,
// which /close?month= reads; git holds the past.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const IDLE_MS = 30 * 60 * 1000;
const house = resolve(fileURLToPath(new URL("..", import.meta.url)), "..", "..");

const args = process.argv.slice(2);
const month = args.shift();
if (!month || !/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
  throw new Error("usage: node desk/app/scripts/sessions.mjs <YYYY-MM> [--plan <eur>] [--transcripts <dir>]...");
}
let plan = null;
const roots = [join(homedir(), ".claude", "projects")];
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--plan") plan = Number(args[++i]);
  else if (args[i] === "--transcripts") roots.push(resolve(args[++i]));
  else throw new Error(`unknown argument ${args[i]}`);
}
if (plan !== null && !(plan >= 0)) throw new Error("--plan needs a number of euros");

const clientsDir = join(house, "clients");
const slugs = new Set(
  readdirSync(clientsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_") && existsSync(join(clientsDir, d.name, "record.md")))
    .map((d) => d.name),
);

// The client of a cwd, by the local-lane convention, else "other".
function clientOf(cwd) {
  const m = /\/projects\/([a-z0-9-]+)(?:\/|$)/.exec(cwd ?? "");
  return m && slugs.has(m[1]) ? m[1] : "other";
}

function* jsonlFiles(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* jsonlFiles(p);
    else if (name.endsWith(".jsonl")) yield p;
  }
}

// One pass over every transcript: per session, its cwd, its turns' times and its usage.
const sessions = new Map();
for (const root of roots) {
  for (const file of jsonlFiles(root)) {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      if (!line) continue;
      let d;
      try {
        d = JSON.parse(line);
      } catch {
        continue;
      }
      const t = Date.parse(d.timestamp ?? "");
      if (!d.sessionId || Number.isNaN(t)) continue;
      let s = sessions.get(d.sessionId);
      if (!s) {
        s = { cwd: null, times: [], usage: [] };
        sessions.set(d.sessionId, s);
      }
      if (d.cwd) s.cwd = d.cwd;
      s.times.push(t);
      const u = d.type === "assistant" ? d.message?.usage : null;
      if (u) {
        s.usage.push({
          t,
          tokens:
            (u.input_tokens ?? 0) +
            (u.cache_creation_input_tokens ?? 0) +
            (u.cache_read_input_tokens ?? 0) +
            (u.output_tokens ?? 0),
        });
      }
    }
  }
}

const monthOf = (t) => new Date(t).toISOString().slice(0, 7);
const bucket = () => ({ sessions: new Set(), ms: 0, tokens: 0, turns: 0 });
const buckets = new Map();
const at = (key) => {
  let b = buckets.get(key);
  if (!b) {
    b = bucket();
    buckets.set(key, b);
  }
  return b;
};
for (const [id, s] of sessions) {
  const key = clientOf(s.cwd);
  const times = s.times.sort((a, b) => a - b);
  for (let i = 1; i < times.length; i++) {
    if (monthOf(times[i]) !== month) continue;
    const b = at(key);
    b.ms += Math.min(times[i] - times[i - 1], IDLE_MS);
    b.sessions.add(id);
  }
  for (const { t, tokens } of s.usage) {
    if (monthOf(t) !== month) continue;
    const b = at(key);
    b.tokens += tokens;
    b.turns += 1;
    b.sessions.add(id);
  }
}

const total = [...buckets.values()].reduce((n, b) => n + b.tokens, 0);
const hours = (b) => Math.round((b.ms / 3600000) * 10) / 10;
const cost = (b) => (plan === null || total === 0 ? null : Math.round((plan * b.tokens) / total));
const entry = (b, indent) =>
  [
    `${indent}sessions: ${b.sessions.size}`,
    `${indent}hours: ${hours(b)}`,
    `${indent}tokens: ${b.tokens}`,
    ...(cost(b) === null ? [] : [`${indent}cost: ${cost(b)}`]),
  ].join("\n");

const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Lisbon" }).format(new Date());
const clientKeys = [...buckets.keys()].filter((k) => k !== "other").sort();
const lines = [
  `# Written ${today} by desk/app/scripts/sessions.mjs from the Claude Code transcripts on this`,
  "# machine. Hours are active time: the gaps between a session's turns, capped at 30 minutes.",
  "# Cost is the plan's price shared by tokens. The monthly close reads it (desk/CONTEXT.md).",
  `month: ${month}`,
  `written: ${today}`,
  ...(plan === null ? [] : [`plan: ${plan}`]),
  `tokens: ${total}`,
  "clients:",
  ...clientKeys.flatMap((k) => [`  ${k}:`, entry(buckets.get(k), "    ")]),
  ...(clientKeys.length === 0 ? ["  {}"] : []),
  "other:",
  entry(buckets.get("other") ?? bucket(), "  "),
  "",
];

const dir = join(house, "desk", "sessions");
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, `${month}.yaml`), lines.join("\n"));
console.log(`Wrote desk/sessions/${month}.yaml: ${clientKeys.length} clients, ${sessions.size} sessions read`);

// Keep 13 months: delete a file whose month is before the month 13 months ago.
const [y, m] = month.split("-").map(Number);
const cutoff = new Date(Date.UTC(y, m - 1 - 13, 1)).toISOString().slice(0, 7);
for (const f of readdirSync(dir)) {
  const key = f.replace(/\.yaml$/, "");
  if (f.endsWith(".yaml") && /^\d{4}-\d{2}$/.test(key) && key < cutoff) {
    rmSync(join(dir, f));
    console.log(`Deleted desk/sessions/${f}`);
  }
}
