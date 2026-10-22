// Reads the house at build time and writes lib/house.json, which the pages import, so the
// deployed function never touches the repo. Runs first in `npm run build`. What it reads:
//   clients/*/record.md            frontmatter: the clients table, the review, the close
//   clients/*/quote/invoices/*.yaml the invoices (fields: clients/CONTEXT.md)
//   clients/*/quote/economics.yaml  the engagement's own economics (S4)
//   clients/*/{proposal/proposal.md, quote/quote.md, agreement/*.md, handover/*.md}
//                                   the client-facing documents, for the client's page
//   clients/_template/record.md     the handoff PR
//   core/wave.md                    the Jamie decides list the Friday review prints
//   desk/glance/<latest>.md         the morning glance
//   desk/review/<latest>.md         the Friday review file (rhythms.yml)
//   desk/close/*.md                 the monthly close files (rhythms.yml)
//   desk/estate/<latest drift>.md   the estate drift report
//   sell/01-prospecting/            the Sell page
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
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
const read = (...path) => readFileSync(join(...path), "utf8");
const files = (dir, ext) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(ext)).sort() : [];

// A markdown file as { file, title, body }: the body without the frontmatter, the title
// from it. Links to a client record (../../clients/<slug>/record.md, as the glance writes
// them) point at the client's page in the desk.
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
const latest = (dir, ext, keep = () => true) => {
  const f = files(dir, ext).map((file) => doc(dir, file)).filter(keep).at(-1);
  return f ? { file: f.file, title: f.title, date: f.date, body: f.body } : null;
};

// One client: the record's frontmatter, its invoices, its economics and its client-facing
// documents. The template folder is skipped: its {{PLACEHOLDERS}} are not a client.
// research/, negotiation.md and economics.yaml are internal: never a document.
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
    const invoices = files(join(dir, "quote", "invoices"), ".yaml").map((f) => {
      const v = parse(read(dir, "quote", "invoices", f)) ?? {};
      return {
        file: f,
        number: String(v.number ?? f.replace(/\.yaml$/, "")),
        issued: String(v.issued ?? ""),
        due: String(v.due ?? ""),
        paid: v.paid ? String(v.paid) : "",
        amount: Number(v.amount ?? 0),
        currency: String(v.currency ?? "EUR"),
        vat: Number(v.vat ?? 0.23),
        for: String(v.for ?? ""),
      };
    });
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
      .map(([stage, f]) => ({ stage, ...doc(join(dir, stage), f), fm: undefined }));
    return [{ ...fm, slug, invoices, economics, documents }];
  })
  .sort((a, b) => a.slug.localeCompare(b.slug));

const template = read(clientsDir, "_template", "record.md");
// What Jamie decides: the bullet lines under "## Jamie decides" in core/wave.md.
const wave = read(house, "core", "wave.md");
const decides = (wave.split(/^## Jamie decides[^\n]*\n/m)[1] ?? "").split(/^## /m)[0].trim();
const openItems = { file: "wave.md", title: "Jamie decides", body: decides };
const glance = latest(join(house, "desk", "glance"), ".md");
const estate = latest(join(house, "desk", "estate"), ".md", (d) => d.fm.kind === "estate");
// The review and the close files: the page renders the file for its week or month when one
// exists, and computes the same words live otherwise.
const review = latest(join(house, "desk", "review"), ".md", (d) => d.fm.kind === "review");
const closeDir = join(house, "desk", "close");
const closes = files(closeDir, ".md")
  .map((f) => doc(closeDir, f))
  .filter((d) => d.fm.kind === "close")
  .map(({ file, title, date, body }) => ({ file, title, date, body }));

// S1's words for a salesman (sell/01-prospecting/prospect.md, "The salesman's deal"): the
// target profile, the cadence and every pitch draft, in file order (touch, then language).
const sellDoc = (...path) => {
  const d = doc(join(sellDir, ...path.slice(0, -1)), path.at(-1));
  return { fm: d.fm, doc: { file: d.file, title: d.title, body: d.body } };
};
const sell = {
  profile: sellDoc("target-profile.md").doc,
  cadence: sellDoc("cadence.md").doc,
  pitch: files(join(sellDir, "pitch"), ".md").map((f) => {
    const { fm, doc: d } = sellDoc("pitch", f);
    return { ...d, touch: Number(fm.touch ?? 0), language: String(fm.language ?? "") };
  }),
};

const built = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(app, "lib", "house.json"),
  JSON.stringify(
    {
      built,
      clients,
      template,
      openItems: { file: openItems.file, title: openItems.title, body: openItems.body },
      glance,
      review,
      closes,
      estate,
      sell,
    },
    null,
    2,
  ),
);
const invoices = clients.reduce((n, c) => n + c.invoices.length, 0);
console.log(
  `lib/house.json: ${clients.length} clients, ${invoices} invoices, ${sell.pitch.length} pitch drafts, ` +
    `glance ${glance?.date ?? "none"}, review ${review?.file ?? "none"}, ${closes.length} closes, ` +
    `estate ${estate?.date ?? "none"}`,
);
