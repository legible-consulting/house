import { redirect } from "next/navigation";
import { FilterGroup } from "@/app/_filters";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Empty } from "@/components/desk/empty";
import { Field, FieldActions, FieldGroup } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { Fold } from "@/components/desk/fold";
import { PageHeader } from "@/components/desk/page-header";
import { VerdictTag } from "@/components/desk/status-tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { research, type Verdict } from "@/lib/house";
import { queue } from "@/lib/research";
import { currentUser } from "@/lib/user";
import { addLink, dropShare, nameShare } from "./actions";

// Jamie's research page (research, research/CONTEXT.md). Three parts: the queue, the links
// the daily intake has not judged yet, read per request from main with each link's title and
// time (lib/research.ts), with the form to paste a link from the computer under it (the
// phone shares to /share instead; a LinkedIn share with no text lands on the form with ?link=,
// and the form asks for the post's text). Above the queue, when any wait, the links no fetch
// route read, under "Needs a name": a name or a drop each; then every verdict and concept from main at build time (lib/house.ts) as a data table, under four
// filters in the query (?use=, ?kind=, ?verdict=, ?tier=), each row opening on
// /research/<slug>. The filters' values come from the files, so a new kind or use appears
// without a change here. Above FOLD rows, the table folds behind its count under the filters
// (desk/app/DESIGN.md, rule 6). No paragraph explains the page (rule 9).
export const dynamic = "force-dynamic";

const FOLD = 25;

const FILTERS = ["use", "kind", "verdict", "tier"] as const;
type Filter = (typeof FILTERS)[number];

const valuesOf = (v: Verdict, f: Filter): string[] =>
  f === "use" ? v.use : [v[f]].filter(Boolean);

const choices = (f: Filter): string[] => [...new Set(research.flatMap((v) => valuesOf(v, f)))].sort();

const verdicts = research.filter((v) => v.folder === "verdicts").length;
const concepts = research.length - verdicts;

// The rows. On the phone a file is one card: the name, then the kind, the verdict and the
// tier, then the use; the recheck and the date are for the desk.
const columns: Column<Verdict>[] = [
  { key: "name", label: "Name", phone: "title", className: "whitespace-normal", cell: (v) => v.name },
  { key: "kind", label: "Kind", phone: "meta", cell: (v) => <span className="font-mono text-meta">{v.kind}</span> },
  { key: "verdict", label: "Verdict", phone: "meta", cell: (v) => <VerdictTag verdict={v.verdict} /> },
  { key: "tier", label: "Tier", phone: "meta", cell: (v) => <span className="font-mono text-meta">{v.tier}</span> },
  { key: "use", label: "Use", cell: (v) => <span className="font-mono text-meta">{v.use.join(" ")}</span> },
  {
    key: "recheck",
    label: "Recheck",
    phone: "hide",
    cell: (v) => <span className="font-mono text-meta tabular-nums text-muted-foreground">{v.recheck}</span>,
  },
  {
    key: "date",
    label: "Date",
    phone: "hide",
    cell: (v) => <span className="font-mono text-meta tabular-nums text-muted-foreground">{v.date}</span>,
  },
];

export default async function Research({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const [q, { error, note }, waiting] = await Promise.all([searchParams, flash(searchParams), queue()]);
  const active = Object.fromEntries(FILTERS.map((f) => [f, typeof q[f] === "string" ? q[f] : ""])) as Record<
    Filter,
    string
  >;
  const asked = typeof q.link === "string" ? q.link : "";
  const unnamed = waiting.ok ? waiting.links.filter((l) => l.unresolved) : [];
  const queued = waiting.ok ? waiting.links.filter((l) => !l.unresolved) : [];
  const shown = research.filter((v) => FILTERS.every((f) => !active[f] || valuesOf(v, f).includes(active[f])));
  const href = (f: Filter, value: string) => {
    const p = new URLSearchParams();
    for (const g of FILTERS) {
      const val = g === f ? value : active[g];
      if (val) p.set(g, val);
    }
    const s = p.toString();
    return `/research${s ? `?${s}` : ""}`;
  };
  const meta = [
    `${verdicts} verdicts`,
    `${concepts} concepts`,
    waiting.ok ? `${queued.length} queued` : "queue not read",
    ...(unnamed.length ? [`${unnamed.length} need a name`] : []),
  ].join(" · ");
  const table = (
    <DataTable
      columns={columns}
      rows={shown}
      rowKey={(v) => `${v.folder}/${v.slug}`}
      href={(v) => `/research/${v.slug}`}
      empty={
        research.length === 0
          ? "No verdict or concept yet. The daily intake writes one for each queued link."
          : "No file matches these filters."
      }
    />
  );
  return (
    <>
      <PageHeader user={user} title="Research" meta={meta} />
      <Flash error={error} note={note} />

      {unnamed.length > 0 && (
        <section aria-labelledby="unnamed" className="mb-10 grid gap-4">
          <div>
            <h2 id="unnamed" className="text-heading">
              Needs a name
            </h2>
            <p className="mt-1 text-ui text-muted-foreground">No route read these. Name the tool, or drop the link.</p>
          </div>
          <ul className="divide-y border-y">
            {unnamed.map((l) => (
              <li key={l.name} className="grid gap-2 py-3 text-ui">
                <a href={l.link || l.url} className="group flex flex-col gap-0.5">
                  <span className="font-semibold group-hover:underline">{l.title || l.link || l.host}</span>
                  <span className="font-mono text-meta tabular-nums text-muted-foreground">
                    {[l.host, l.captured].filter(Boolean).join(" · ")}
                  </span>
                </a>
                <span className="text-meta text-muted-foreground">{l.unresolved}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <form action={nameShare} className="flex min-w-0 flex-1 gap-2">
                    <input type="hidden" name="file" value={l.name} />
                    <Input name="name" aria-label="Name" required enterKeyHint="send" placeholder="The tool's name" className="min-w-0 flex-1" />
                    <Button type="submit">Name</Button>
                  </form>
                  <form action={dropShare}>
                    <input type="hidden" name="file" value={l.name} />
                    <Button type="submit" variant="outline">
                      Drop
                    </Button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="queue" className="mb-10 grid gap-4">
        <div>
          <h2 id="queue" className="text-heading">
            Waiting for the intake
          </h2>
          <p className="mt-1 text-ui text-muted-foreground">Shared or pasted, not judged yet.</p>
        </div>
        {!waiting.ok ? (
          <p className="text-ui text-muted-foreground">{waiting.reason}</p>
        ) : queued.length === 0 ? (
          <Empty className="py-4">Nothing waits. A link shared to Desk or pasted below lands here.</Empty>
        ) : (
          <ul className="divide-y border-y">
            {queued.map((l) => (
              <li key={l.name}>
                <a href={l.url} className="group flex min-h-row flex-col justify-center gap-0.5 py-2 text-ui">
                  <span className="font-semibold group-hover:underline">{l.title || l.host}</span>
                  <span className="font-mono text-meta tabular-nums text-muted-foreground">
                    {[l.host, l.captured].filter(Boolean).join(" · ")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <Card id="queue-a-link">
          <CardHeader>
            <CardTitle>
              <h3>Queue a link</h3>
            </CardTitle>
            <CardDescription>The file goes to research/queue/ on main. The desk judges nothing.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addLink}>
              <FieldGroup className="lg:grid-cols-2">
                <Field label="Link">
                  <Input
                    name="url"
                    type="url"
                    inputMode="url"
                    autoComplete="url"
                    required
                    placeholder="https://…"
                    defaultValue={asked}
                  />
                </Field>
                {asked ? (
                  <Field label="Text" hint="LinkedIn shows the post to a signed-in reader only. Paste the post's text.">
                    <Input name="text" required autoFocus enterKeyHint="send" />
                  </Field>
                ) : (
                  <Field label="Note" hint="Why it caught your eye. Optional.">
                    <Input name="text" enterKeyHint="send" />
                  </Field>
                )}
                <FieldActions>
                  <Button type="submit">Queue</Button>
                </FieldActions>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="verdicts" className="grid gap-4">
        <div>
          <h2 id="verdicts" className="text-heading">
            Verdicts and concepts
          </h2>
          <p className="mt-1 font-mono text-meta text-muted-foreground">
            {shown.length} of {research.length}
          </p>
        </div>
        <div className="grid gap-3">
          {FILTERS.map((f) => (
            <div key={f} className="grid gap-1.5 sm:flex sm:items-center sm:gap-3">
              <span aria-hidden="true" className="w-16 shrink-0 font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">
                {f}
              </span>
              <FilterGroup
                label={f}
                value={active[f] || "all"}
                items={[
                  { value: "all", label: "All", href: href(f, "") },
                  ...choices(f).map((v) => ({ value: v, label: v, href: href(f, v) })),
                ]}
              />
            </div>
          ))}
        </div>
        {shown.length > FOLD ? (
          <Fold label="Matches" count={shown.length} limit={FOLD}>
            {table}
          </Fold>
        ) : (
          table
        )}
      </section>
    </>
  );
}
