// Reads the house at build time and writes lib/house.json, which the pages import, so the
// deployed function never touches the repo. Runs first in `npm run build`. What it reads:
//   clients/*/record.md            frontmatter: the clients table, the glance, the close; the
//                                   body and the folder's file list: the home's copied prompt
//   clients/*/quote/economics.yaml  the engagement's economics (the quote): the price, the estimates,
//                                   the actuals per month
//   clients/*/{proposal/proposal.md, agreement/*.md, handover/*.md}
//                                   the client-facing documents, for the client's page. The
//                                   quote is the proposal's last section, not a document of its own
//   clients/_template/record.md     the handoff commit
//   core/identity.md                the business email: lib/mail.ts sends the desk's mail to it;
//                                   the booking link: the lesson for `meeting` shows it with Copy
//   .icm/intake/README.md           the Jamie's hand list the glance prints
//   desk/close/*.md                 the monthly close files (rhythms.yml)
//   desk/estate/<latest drift>.md   the drift report: each repo's line goes to its client
//   01-prospecting/            the Sell page (the profile, the cadence, the pitches, the
//                                   seller kit) and the seller's next touch. The kit is parsed
//                                   by lib/kit.ts into lessons. A kit that does not parse fails
//                                   the build
//   research/{verdicts,concepts}/*.md
//                                   research's verdicts and concepts: the frontmatter as fields, the
//                                   body as prose, for /research
//   */forms/*.md                    every form, parsed by lib/forms.ts into a snapshot, by form
//                                   slug and language. A form that does not parse fails the build
//   desk/CONTEXT.md                 the table "The desk's writes to main": each row against
//                                   WRITES in lib/writes.ts. A difference fails the build
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { checkLanguages, parseForm } from "../lib/forms.ts";
import { checkKits, KIT_LANGUAGES, parseKit } from "../lib/kit.ts";
import { WRITES } from "../lib/writes.ts";

const app = fileURLToPath(new URL("..", import.meta.url));
const house = join(app, "..", "..");
const clientsDir = join(house, "clients");
const sellDir = join(house, "01-prospecting");

// A markdown file as its frontmatter fields and its body without them.
const split = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { fm: parse(m[1]) ?? {}, body: m[2].trim() } : { fm: {}, body: raw.trim() };
};
const read = (...path) => readFileSync(join(...path), "utf8");
const files = (dir, ext) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(ext)).sort() : [];
// Every file under a folder, as paths relative to it, sorted.
const tree = (dir, at = "") =>
  readdirSync(join(dir, at), { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? tree(dir, join(at, e.name)) : [join(at, e.name)]))
    .sort();

// A markdown file as { file, title, date, body, fm }: the body without the frontmatter, the
// title from it. Links to a client record (../../clients/<slug>/record.md, as the files
// write them) point at the client's page in the desk.
const doc = (dir, file) => {
  const { fm, body } = split(read(dir, file));
  return {
    file,
    title: String(fm.title ?? file),
    date: String(fm.date ?? ""),
    body: body.replace(/\]\((?:\.\.\/)*clients\/([a-z0-9-]+)\/record\.md\)/g, "](/clients/$1)"),
    fm,
  };
};
const latest = (dir, ext, keep = () => true) => files(dir, ext).map((file) => doc(dir, file)).filter(keep).at(-1) ?? null;
const plain = ({ file, title, date, body }) => ({ file, title, date, body });

// The latest drift report (conformance): one line per repo, keyed by the repo. The header names the
// columns, so a column added to or removed from drift.sh does not move the read.
const drift = latest(join(house, "desk", "estate"), ".md", (d) => d.fm.kind === "estate");
const blueprintOf = new Map();
if (drift) {
  const rows = drift.body.split("\n").filter((l) => l.startsWith("|"));
  const cells = (l) => l.split("|").slice(1, -1).map((c) => c.trim());
  const header = rows[0] ? cells(rows[0]).map((h) => h.toLowerCase()) : [];
  const col = (name) => header.indexOf(name);
  for (const row of rows.slice(2)) {
    const c = cells(row);
    const repo = /`([^`]+)`/.exec(c[col("repo")] ?? "")?.[1];
    if (!repo) continue;
    blueprintOf.set(repo, {
      tracks: (c[col("tracks")] ?? "").replace(/`/g, ""),
      drift: (c[col("drift")] ?? "").replace(/`/g, ""),
      // "backed", or the answers the platform does not back, "; " between them. A report from
      // before the column has none, and an empty cell or "—" is not read (conformance/CONTEXT.md).
      platform: (c[col("platform")] ?? "").replace(/`|\*\*/g, "").replace(/^—$/, ""),
    });
  }
}
const estate = drift ? { file: drift.file, date: drift.date, blueprint: String(drift.fm.blueprint ?? "") } : null;

// One client: the record's frontmatter, its economics, its client-facing documents and its
// repo's line in the drift report. The template folder is skipped: its {{PLACEHOLDERS}} are
// not a client. Research/, negotiation.md and economics.yaml are internal: never a document.
// The client reads the proposal and the quote as one document (03-proposal/CONTEXT.md): the
// proposal's section that holds the marker comment naming quote/quote.md is replaced by the
// quote's body, which is that section. A proposal without the marker (one transcribed as
// sent) holds its own price and is shown as it is. A quote without a proposal is not shown.
// HTML comments are notes for Jamie and the renderer, never for the client: they leave every
// client document, because the desk shows raw HTML as text (lib/markdown.ts).
const QUOTE_MARK = /<!--(?:(?!-->)[^])*quote\/quote\.md/;
const withQuote = (proposal, quote) => {
  const at = proposal.search(QUOTE_MARK);
  if (at < 0 || quote === null) return proposal;
  const heading = proposal.lastIndexOf("\n## ", at);
  const start = heading < 0 ? at : heading + 1;
  const next = proposal.indexOf("\n## ", at);
  return `${proposal.slice(0, start)}${quote}${next < 0 ? "" : `\n\n${proposal.slice(next + 1)}`}`;
};
const noComments = (body) => body.replace(/<!--[^]*?-->/g, "").replace(/\n{3,}/g, "\n\n").trim();

const clients = readdirSync(clientsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
  .flatMap((d) => {
    const dir = join(clientsDir, d.name);
    let fm;
    let notes;
    try {
      ({ fm, body: notes } = split(read(dir, "record.md")));
    } catch {
      return [];
    }
    const slug = String(fm.slug ?? d.name);
    const economics = existsSync(join(dir, "quote", "economics.yaml"))
      ? (parse(read(dir, "quote", "economics.yaml")) ?? null)
      : null;
    const documents = [
      ["proposal", "proposal.md"],
      ...files(join(dir, "agreement"), ".md").map((f) => ["agreement", f]),
      ...files(join(dir, "handover"), ".md").map((f) => ["handover", f]),
    ]
      .filter(([stage, f]) => existsSync(join(dir, stage, f)))
      .map(([stage, f]) => {
        const d = plain(doc(join(dir, stage), f));
        if (stage === "proposal") {
          const quote = existsSync(join(dir, "quote", "quote.md")) ? doc(join(dir, "quote"), "quote.md").body : null;
          d.body = withQuote(d.body, quote);
        }
        return { stage, ...d, body: noComments(d.body) };
      });
    const blueprint = fm.repo ? (blueprintOf.get(String(fm.repo)) ?? null) : null;
    // The record's body and the folder's files are for Jamie's copied prompt on / (lib/actions.ts),
    // never for a client's page.
    return [{ ...fm, slug, economics, documents, blueprint, notes, files: tree(dir) }];
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

const template = read(clientsDir, "_template", "record.md");
// Jamie's hand: the bullets under "## Jamie's hand" in .icm/intake/README.md, the steps of the
// house's own build that wait on him. The bullets only, each on one line: a bullet's wrapped
// lines (indented) join it. The section's prose stays in the README.
const intakeReadme = read(house, ".icm", "intake", "README.md");
const handSection = (intakeReadme.split(/^## Jamie's hand[^\n]*\n/m)[1] ?? "").split(/^## /m)[0];
const handBody = handSection
  .split("\n")
  .reduce((bullets, l) => {
    if (/^- /.test(l)) bullets.push(l.trimEnd());
    else if (/^\s+\S/.test(l) && bullets.length > 0) bullets[bullets.length - 1] += ` ${l.trim()}`;
    return bullets;
  }, [])
  .join("\n")
  .trim();
const hand = { file: ".icm/intake/README.md", title: "Jamie's hand", body: handBody };
// The close files: the page renders the file for its month when one exists, and computes the
// same words live otherwise.
const closeDir = join(house, "desk", "close");
const closes = files(closeDir, ".md")
  .map((f) => doc(closeDir, f))
  .filter((d) => d.fm.kind === "close")
  .map(plain);

// The seller kit (01-prospecting/kit.<language>.md), one file per language, parsed with the
// grammar in 01-prospecting/CONTEXT.md and checked against each other. Every break is listed,
// and then the build stops (why: the desk maps a lesson to a status and a touch by its key, so a
// kit that does not line up teaches the wrong step · 2026-10-28).
const kitErrors = [];
const kits = files(sellDir, ".md")
  .filter((f) => f.startsWith("kit."))
  .flatMap((f) => {
    const file = `01-prospecting/${f}`;
    try {
      return [{ file, kit: parseKit(file, read(sellDir, f)) }];
    } catch (e) {
      kitErrors.push(e instanceof Error ? e.message : String(e));
      return [];
    }
  });
for (const language of KIT_LANGUAGES) {
  if (!kits.some((k) => k.kit.language === language)) kitErrors.push(`01-prospecting/kit.${language}.md: the kit in ${language} is missing.`);
}
try {
  checkKits(kits);
} catch (e) {
  kitErrors.push(e instanceof Error ? e.message : String(e));
}
if (kitErrors.length) throw new Error(`The seller kit does not parse:\n${kitErrors.join("\n")}`);

// prospecting's words for a salesman (01-prospecting/prospect.md, "The salesman's deal"): the
// target profile, the cadence, every pitch draft, in file order (touch, then language), and
// the seller kit, one parsed kit per language.
const sellDoc = (...path) => doc(join(sellDir, ...path.slice(0, -1)), path.at(-1));
const sell = {
  profile: plain(sellDoc("target-profile.md")),
  cadence: plain(sellDoc("cadence.md")),
  pitch: files(join(sellDir, "pitch"), ".md").map((f) => {
    const d = sellDoc("pitch", f);
    return { ...plain(d), touch: Number(d.fm.touch ?? 0), language: String(d.fm.language ?? "") };
  }),
  kit: kits.map((k) => k.kit),
};

// research's verdicts and concepts (research/{verdicts,concepts}/<slug>.md): the
// frontmatter as fields, the body without its first heading (the page sets the title), sorted
// by name. A field the file lacks is "" or [], never missing, so a page reads every file alike.
const researchDir = join(house, "research");
const list = (v) => (Array.isArray(v) ? v.map(String) : []);
const research = ["verdicts", "concepts"]
  .flatMap((folder) =>
    files(join(researchDir, folder), ".md").map((file) => {
      const { fm, body } = split(read(researchDir, folder, file));
      return {
        slug: file.replace(/\.md$/, ""),
        folder,
        name: String(fm.tool ?? fm.concept ?? file),
        kind: String(fm.kind ?? (folder === "concepts" ? "concept" : "")),
        verdict: String(fm.verdict ?? ""),
        tier: String(fm.tier ?? ""),
        use: list(fm.use),
        tags: list(fm.tags),
        recheck: String(fm.recheck ?? ""),
        source: String(fm.source ?? ""),
        via: String(fm.via ?? ""),
        date: String(fm.date ?? ""),
        body: body.replace(/^# [^\n]*\n+/, ""),
      };
    }),
  )
  .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

// Every form of the house (*/forms/<form>.<language>.md), parsed with the grammar in
// 01-prospecting/CONTEXT.md, grouped by form slug, then language. The language files of one form
// are checked against each other. Every break is listed, and then the build stops (why: a form
// that does not parse is a public page that breaks · 2026-10-26).
const formErrors = [];
const parsed = readdirSync(house, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith(".") && d.name !== "node_modules")
  .flatMap((d) => files(join(house, d.name, "forms"), ".md").map((f) => `${d.name}/forms/${f}`))
  .flatMap((file) => {
    try {
      return [{ file, form: parseForm(file, read(house, file)) }];
    } catch (e) {
      formErrors.push(e instanceof Error ? e.message : String(e));
      return [];
    }
  });
const forms = {};
for (const { form } of parsed) (forms[form.slug] ??= {})[form.language] = form;
for (const slug of Object.keys(forms)) {
  const group = parsed.filter((p) => p.form.slug === slug);
  for (const p of group) {
    if (group.find((q) => q !== p && q.form.language === p.form.language))
      formErrors.push(`${p.file}: another file holds the ${slug} form in ${p.form.language}.`);
  }
  try {
    checkLanguages(group);
  } catch (e) {
    formErrors.push(e instanceof Error ? e.message : String(e));
  }
}
if (formErrors.length) throw new Error(`A form does not parse:\n${formErrors.join("\n")}`);

// The business email, from the identity table of core/identity.md. The desk's mail goes to it,
// so a table without the row fails the build (why: a notice with no recipient is a lead lost
// in silence · 2026-10-26).
const businessEmail = read(house, "core", "identity.md").match(/^\|\s*Business email\s*\|\s*([^|\s]+)\s*\|/m)?.[1];
if (!businessEmail) throw new Error("core/identity.md: the identity table has no Business email row.");
// The booking link, from the same table: the first URL of its row, or null when the row is
// missing or holds none ("none yet"). The lesson with `status: meeting` shows it with Copy, and
// the salesman sends it from their own account (why: the desk sends nothing and reads no
// calendar · 2026-10-28).
const bookingRow = read(house, "core", "identity.md").match(/^\|\s*Booking link\s*\|([^|]*)\|/m)?.[1] ?? "";
const booking = bookingRow.match(/https?:\/\/[^\s,)]+/)?.[0]?.replace(/[.;]+$/, "") ?? null;
const identity = { email: businessEmail, booking };

// The desk's writes to main: the table in desk/CONTEXT.md and the typed list WRITES in
// lib/writes.ts hold the same rows. The build fails on any difference, and names each (why: one
// home, two readers · 2026-10-29). Not written to house.json: the app reads WRITES itself.
{
  const HEAD = /^\|\s*Action\s*\|\s*Role\s*\|\s*Globs\s*\|\s*Branch\s*\|\s*Identity\s*\|\s*Why\s*\|\s*$/;
  const lines = read(house, "desk", "CONTEXT.md").split("\n");
  const at = lines.findIndex((l) => HEAD.test(l));
  if (at < 0) throw new Error("desk/CONTEXT.md: no table \"The desk's writes to main\" (| Action | Role | Globs | Branch | Identity | Why |).");
  const unquote = (c) => c.trim().replace(/^`|`$/g, "");
  const table = {};
  for (const line of lines.slice(at + 2)) {
    if (!line.startsWith("|")) break;
    const cells = line.split("|").slice(1, -1);
    if (cells.length !== 6) throw new Error(`desk/CONTEXT.md, The desk's writes to main: a row without six cells: ${line}`);
    const [action, role, globs, branch, identity] = cells;
    table[unquote(action)] = {
      role: role.trim(),
      globs: globs.split(",").map(unquote).filter(Boolean),
      branch: unquote(branch),
      identity: unquote(identity),
    };
  }
  const diff = [];
  for (const key of new Set([...Object.keys(table), ...Object.keys(WRITES)])) {
    const t = table[key];
    const w = WRITES[key];
    if (!t) diff.push(`${key}: in lib/writes.ts WRITES, not in the table`);
    else if (!w) diff.push(`${key}: in the table, not in lib/writes.ts WRITES`);
    else {
      for (const field of ["role", "branch", "identity"]) {
        if (t[field] !== w[field]) diff.push(`${key}: ${field} is "${t[field]}" in the table and "${w[field]}" in WRITES`);
      }
      if (t.globs.join(", ") !== w.globs.join(", ")) {
        diff.push(`${key}: globs are "${t.globs.join(", ")}" in the table and "${w.globs.join(", ")}" in WRITES`);
      }
    }
  }
  if (diff.length) {
    throw new Error(`desk/CONTEXT.md, The desk's writes to main, and lib/writes.ts WRITES differ:\n${diff.join("\n")}`);
  }
}

const built = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(app, "lib", "house.json"),
  JSON.stringify({ built, identity, clients, template, hand, closes, estate, sell, research, forms }, null, 2),
);
console.log(
  `lib/house.json: ${clients.length} clients, ${sell.pitch.length} pitch drafts, ${sell.kit.length} kits, ` +
    `${closes.length} closes, ${research.length} verdicts and concepts, ${parsed.length} form files ` +
    `(${Object.keys(forms).length} forms), ` +
    `drift ${estate?.date ?? "none"}`,
);
