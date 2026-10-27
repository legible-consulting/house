import { redirect } from "next/navigation";
import { FilterGroup } from "@/app/_filters";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Empty } from "@/components/desk/empty";
import { Field, FieldActions, FieldGroup } from "@/components/desk/field-group";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { VerdictTag } from "@/components/desk/status-tag";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { flash, type Search } from "@/lib/guard";
import { research, type Verdict } from "@/lib/house";
import { queue } from "@/lib/research";
import { currentUser } from "@/lib/user";
import { addLink } from "./actions";

// Jamie's research page (research, research/CONTEXT.md). Three parts: the queue, the links
// the daily intake has not judged yet, read per request from main (lib/research.ts), with the
// form to paste a link from the computer under it (the phone shares to /share instead); then
// every verdict and concept from main at build time (lib/house.ts) as a data table, under four
// filters in the query (?use=, ?kind=, ?verdict=, ?tier=), each row opening on
// /research/<slug>. The filters' values come from the files, so a new kind or use appears
// without a change here.
export const dynamic = "force-dynamic";

const FILTERS = ["use", "kind", "verdict", "tier"] as const;
type Filter = (typeof FILTERS)[number];

const valuesOf = (v: Verdict, f: Filter): string[] =>
  f === "use" ? v.use : [v[f]].filter(Boolean);

const choices = (f: Filter): string[] => [...new Set(research.flatMap((v) => valuesOf(v, f)))].sort();

const verdicts = research.filter((v) => v.folder === "verdicts").length;
const concepts = research.length - verdicts;

// A queued file's name is <date>-<host>-<hash>.md (lib/research.ts queueName): the host and
// the day are read from it, so the list costs one read of the folder.
const QUEUED = /^(\d{4}-\d{2}-\d{2})-(.+)-[0-9a-f]{6}\.md$/;
const queued = (name: string) => {
  const m = QUEUED.exec(name);
  return m ? { day: m[1]!, host: m[2]! } : { day: "", host: name };
};

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
    waiting.ok ? `${waiting.files.length} queued` : "queue not read",
  ].join(" · ");
  return (
    <>
      <PageHeader user={user} title="Research" meta={meta} />
      <p className="mb-4 max-w-reading text-body text-muted-foreground">
        A link lands here, the daily intake writes its verdict into the house, and the verdict shows below after the
        next push to main. On the phone: install the desk from Chrome&apos;s menu, then share any link to Desk.
      </p>
      <Flash error={error} note={note} />

      <section aria-labelledby="queue" className="mb-10 grid gap-4">
        <div>
          <h2 id="queue" className="text-heading">
            Waiting for the intake
          </h2>
          <p className="mt-1 text-ui text-muted-foreground">Shared or pasted, not judged yet.</p>
        </div>
        {!waiting.ok ? (
          <p className="text-ui text-muted-foreground">{waiting.reason}</p>
        ) : waiting.files.length === 0 ? (
          <Empty className="py-4">Nothing waits. A link shared to Desk or pasted below lands here.</Empty>
        ) : (
          <ul className="divide-y border-y">
            {waiting.files.map((f) => {
              const { day, host } = queued(f.name);
              return (
                <li key={f.name}>
                  <a
                    href={f.url}
                    className="flex min-h-row flex-wrap items-baseline gap-x-3 py-1.5 text-ui hover:underline"
                  >
                    <span className="font-mono text-meta">{host}</span>
                    {day && <span className="font-mono text-meta tabular-nums text-muted-foreground">{day}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-level={3}>
              Queue a link
            </CardTitle>
            <CardDescription>The file goes to research/queue/ on main. The desk judges nothing.</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={addLink}>
              <FieldGroup className="lg:grid-cols-2">
                <Field label="Link">
                  <Input name="url" type="url" inputMode="url" autoComplete="url" required placeholder="https://…" />
                </Field>
                <Field label="Note" hint="Why it caught your eye. Optional.">
                  <Input name="text" enterKeyHint="send" />
                </Field>
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
      </section>
    </>
  );
}
