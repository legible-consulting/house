// Reads the house at build time and writes lib/house.json, which the pages import, so the
// deployed function never touches the repo. Runs first in `npm run build`. What it reads:
//   clients/*/record.md            frontmatter: the clients table, the glance, the close
//   clients/*/quote/economics.yaml  the engagement's economics (the quote): the price, the estimates,
//                                   the actuals per month
//   clients/*/{proposal/proposal.md, quote/quote.md, agreement/*.md, handover/*.md}
//                                   the client-facing documents, for the client's page
//   clients/_template/record.md     the handoff PR
//   .icm/intake/README.md           the Jamie's hand list the glance prints
//   desk/close/*.md                 the monthly close files (rhythms.yml)
//   desk/estate/<latest drift>.md   the drift report: each repo's line goes to its client
//   01-prospecting/            the Sell page (the profile, the cadence, the pitches, the
//                                   seller kit) and the seller's next touch
//   research/{verdicts,concepts}/*.md
//                                   research's verdicts and concepts: the frontmatter as fields, the
//                                   body as prose, for /research
//   */forms/*.md                    every form, parsed by lib/forms.ts and grouped by form and
//                                   language; a form that does not parse fails the build
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { FORM_LANGUAGES, checkLanguages, parseForm } from "../lib/forms.ts";

const app = fileURLToPath(new URL("..", import.meta.url));
const house = join(app, "..", "..");
const clientsDir = join(house, "clients");
const sellDir = join(house, "01-prospecting");

// A markdown file as its frontmatter fields and its body without them.
const split = (raw) => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  return m ? { fm: parse(m[1]) ?? {}, body: m[2].trim() } : { fm: {}, body: raw.trim() };
};
const frontmatter = (raw) => split(raw).fm;
const read = (...path) => readFileSync(join(...path), "utf8");
const files = (dir, ext) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(ext)).sort() : [];

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
    });
  }
}
const estate = drift ? { file: drift.file, date: drift.date, blueprint: String(drift.fm.blueprint ?? "") } : null;

// One client: the record's frontmatter, its economics, its client-facing documents and its
// repo's line in the drift report. The template folder is skipped: its {{PLACEHOLDERS}} are
// not a client. Research/, negotiation.md and economics.yaml are internal: never a document.
const clients = readdirSync(clientsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
  .flatMap((d) => {
    const dir = join(clientsDir, d.name);
    let fm;
    try {
      fm = frontmatter(read(dir, "record.md"));
    } catch {
      return [];
    }
    const slug = String(fm.slug ?? d.name);
    const economics = existsSync(join(dir, "quote", "economics.yaml"))
      ? (parse(read(dir, "quote", "economics.yaml")) ?? null)
      : null;
    const documents = [
      ["proposal", "proposal.md"],
      ["quote", "quote.md"],
      ...files(join(dir, "agreement"), ".md").map((f) => ["agreement", f]),
      ...files(join(dir, "handover"), ".md").map((f) => ["handover", f]),
    ]
      .filter(([stage, f]) => existsSync(join(dir, stage, f)))
      .map(([stage, f]) => ({ stage, ...plain(doc(join(dir, stage), f)) }));
    const blueprint = fm.repo ? (blueprintOf.get(String(fm.repo)) ?? null) : null;
    return [{ ...fm, slug, economics, documents, blueprint }];
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

const template = read(clientsDir, "_template", "record.md");
// Jamie's hand: the bullets under "## Jamie's hand" in .icm/intake/README.md, the steps of the
// house's own build that wait on him. The bullets only: the section's prose stays in the README.
const intakeReadme = read(house, ".icm", "intake", "README.md");
const handSection = (intakeReadme.split(/^## Jamie's hand[^\n]*\n/m)[1] ?? "").split(/^## /m)[0];
const handBody = handSection.split("\n").filter((l) => /^- /.test(l)).join("\n").trim();
const hand = { file: ".icm/intake/README.md", title: "Jamie's hand", body: handBody };
// The close files: the page renders the file for its month when one exists, and computes the
// same words live otherwise.
const closeDir = join(house, "desk", "close");
const closes = files(closeDir, ".md")
  .map((f) => doc(closeDir, f))
  .filter((d) => d.fm.kind === "close")
  .map(plain);

// prospecting's words for a salesman (01-prospecting/prospect.md, "The salesman's deal"): the
// target profile, the cadence, every pitch draft, in file order (touch, then language), and
// the seller kit, one file per language.
const sellDoc = (...path) => doc(join(sellDir, ...path.slice(0, -1)), path.at(-1));
const sell = {
  profile: plain(sellDoc("target-profile.md")),
  cadence: plain(sellDoc("cadence.md")),
  pitch: files(join(sellDir, "pitch"), ".md").map((f) => {
    const d = sellDoc("pitch", f);
    return { ...plain(d), touch: Number(d.fm.touch ?? 0), language: String(d.fm.language ?? "") };
  }),
  kit: files(sellDir, ".md")
    .filter((f) => f.startsWith("kit."))
    .map((f) => {
      const d = sellDoc(f);
      return { ...plain(d), language: String(d.fm.language ?? "") };
    }),
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

// Every form (<module>/forms/<form>.<language>.md), as forms[form][language] = its snapshot.
// Every broken file is listed before the build fails, so one run shows all of them. On a
// GitHub runner each line is an annotation on the file.
const formErrors = [];
const formFiles = new Map();
for (const d of readdirSync(house, { withFileTypes: true })) {
  if (!d.isDirectory() || d.name.startsWith(".") || d.name === "node_modules") continue;
  for (const f of files(join(house, d.name, "forms"), ".md")) {
    const file = `${d.name}/forms/${f}`;
    try {
      const snapshot = parseForm(file, read(house, file));
      const langs = formFiles.get(snapshot.form) ?? new Map();
      const twin = langs.get(snapshot.language);
      if (twin) throw new Error(`${twin.file} and ${file}: one form and language in two files.`);
      formFiles.set(snapshot.form, langs.set(snapshot.language, { file, snapshot }));
    } catch (e) {
      formErrors.push({ file, message: e.message });
    }
  }
}
const forms = {};
for (const [form, langs] of formFiles) {
  const byLanguage = FORM_LANGUAGES.filter((l) => langs.has(l)).map((l) => langs.get(l));
  try {
    checkLanguages(byLanguage);
    forms[form] = Object.fromEntries(byLanguage.map(({ snapshot }) => [snapshot.language, snapshot]));
  } catch (e) {
    formErrors.push({ file: byLanguage[0].file, message: e.message });
  }
}
if (formErrors.length) {
  for (const { file, message } of formErrors) {
    console.error(process.env.GITHUB_ACTIONS ? `::error file=${file}::${message}` : message);
  }
  process.exit(1);
}

const built = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(app, "lib", "house.json"),
  JSON.stringify({ built, clients, template, hand, closes, estate, sell, research, forms }, null, 2),
);
console.log(
  `lib/house.json: ${clients.length} clients, ${sell.pitch.length} pitch drafts, ${sell.kit.length} kits, ` +
    `${closes.length} closes, ${research.length} verdicts and concepts, ${Object.keys(forms).length} forms, ` +
    `drift ${estate?.date ?? "none"}`,
);
