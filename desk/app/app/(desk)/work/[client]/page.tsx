import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { NoTicketCard, TicketCard } from "@/components/desk/ticket-card";
import { flash, type Search } from "@/lib/guard";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { repoWork, startPrompt, summaryOf, workInFlight, type Pr, type RepoWork, type Stub } from "@/lib/work";
import { CopyButton } from "@/app/_copy";
import { FilterGroup } from "@/app/_filters";
import { ReadAgo } from "@/app/_repo";
import { withRepo } from "@/app/_work";

// A project's board at /work/<client> (desk/app/DESIGN.md, rules 2 and 11), Jamie only.
// `<client>` is a client folder's slug with a repo, or `house`, as on the ticket page. The
// shell draws no sidebar and no tab bar here (components/desk/shell.tsx). Four columns, the
// pipeline's positions, each a stack of ticket cards: Queued (the blocked stubs as one group,
// then each epic's queued stubs in sequence, then triage), Next (each epic's next stub and the
// first queued triage stub, with the prompt to copy), Running (the stubs with a pull request,
// those that wait on Jamie first, then a pull request matched to no stub), Shipped (merged in 14
// days). A ticket sits in one column only. From md each column scrolls on its own inside the
// viewport's height, under its sticky heading, and the page never scrolls as a whole. Below md
// a segmented control picks one column (?column=). A tick returns here (lib/gates.ts). A failed
// read shows its words in the place of the columns.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ client: string }>;
  searchParams: Search;
};

type Column = "queued" | "next" | "running" | "shipped";
const COLUMNS: [Column, string][] = [
  ["queued", "Queued"],
  ["next", "Next"],
  ["running", "Running"],
  ["shipped", "Shipped"],
];
const isColumn = (v: unknown): v is Column => COLUMNS.some(([k]) => k === v);

// One column: its heading with its count, sticky from md, then its cards, or one quiet line.
function Lane({
  id,
  title,
  count,
  shown,
  empty,
  children,
}: {
  id: Column;
  title: string;
  count: number;
  shown: boolean; // the column the phone shows
  empty: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`column-${id}`}
      className={cn("min-h-0 flex-col md:flex md:overflow-y-auto", shown ? "flex" : "hidden")}
    >
      <h2 id={`column-${id}`} className="z-20 bg-background pb-2 text-heading md:sticky md:top-0 md:pt-4">
        {title} · <span className="font-mono tabular-nums">{count}</span>
      </h2>
      {count === 0 ? (
        <p className="text-ui text-muted-foreground">{empty}</p>
      ) : (
        <div className="grid gap-4 pb-4">{children}</div>
      )}
    </section>
  );
}

// A group inside a column: its label, a mono line, then its cards.
function Group({ label, meta, children }: { label: ReactNode; meta?: string; children: ReactNode }) {
  return (
    <div className="grid gap-2">
      <div>
        <h3 className="text-ui font-semibold">{label}</h3>
        {meta && <p className="font-mono text-meta text-muted-foreground">{meta}</p>}
      </div>
      <ul className="grid gap-2">{children}</ul>
    </div>
  );
}

// The columns' contents. A ticket sits in one column only: the first queued triage stub is
// Next, so it leaves Queued.
function lanesOf(w: RepoWork) {
  const stubs = [...w.epics.flatMap((e) => e.open), ...w.triage];
  const prOf = (s: Stub): Pr | null => (s.pr === null ? null : (w.prs.find((p) => p.number === s.pr) ?? null));
  const triageNext = w.triage.find((s) => s.state === "queued");
  const next = [...w.epics.flatMap((e) => e.open.filter((s) => s.state === "next")), ...(triageNext ? [triageNext] : [])];
  const blocked = stubs.filter((s) => s.state === "blocked");
  const epics = w.epics
    .map((e) => ({ e, queued: e.open.filter((s) => s.state === "queued") }))
    .filter(({ queued }) => queued.length > 0);
  const triage = w.triage.filter((s) => s.state === "queued" && s !== triageNext);
  // The stubs with a pull request: the ones that wait on Jamie first, then the newest.
  const running = stubs
    .flatMap((s) => {
      const pr = s.state === "running" ? prOf(s) : null;
      return pr ? [{ s, pr }] : [];
    })
    .sort((a, b) => Number(!a.pr.waiting) - Number(!b.pr.waiting) || b.pr.updatedAt.localeCompare(a.pr.updatedAt));
  const loose = w.prs.filter((p) => p.stub === null);
  const count: Record<Column, number> = {
    queued: blocked.length + epics.reduce((n, { queued }) => n + queued.length, 0) + triage.length,
    next: next.length,
    running: running.length + loose.length,
    shipped: w.merged.length,
  };
  return { prOf, next, blocked, epics, triage, running, loose, count };
}

function Board({ client, w, column }: { client: string; w: RepoWork; column: Column }) {
  const here = `/work/${client}`;
  const { prOf, next, blocked, epics, triage, running, loose, count } = lanesOf(w);
  const card = (s: Stub, action?: ReactNode) => (
    <li key={s.path}>
      <TicketCard client={client} repo={w.repo} stub={s} pr={prOf(s)} back={here} action={action} />
    </li>
  );
  return (
    <div className="grid gap-4 md:min-h-0 md:flex-1 md:grid-cols-4 md:grid-rows-1">
      <Lane id="queued" title="Queued" count={count.queued} shown={column === "queued"} empty="Nothing is queued.">
        {blocked.length > 0 && (
          <Group label={`Blocked · ${blocked.length}`}>{blocked.map((s) => card(s))}</Group>
        )}
        {epics.map(({ e, queued }) => (
          <Group key={e.name} label={e.title} meta={`${e.done} of ${e.total} done`}>
            {queued.map((s) => card(s))}
          </Group>
        ))}
        {triage.length > 0 && <Group label="Triage">{triage.map((s) => card(s))}</Group>}
      </Lane>
      <Lane id="next" title="Next" count={count.next} shown={column === "next"} empty="No ticket is next.">
        <ul className="grid gap-2">{next.map((s) => card(s, <CopyButton text={startPrompt(w, s)} />))}</ul>
      </Lane>
      <Lane id="running" title="Running" count={count.running} shown={column === "running"} empty="No pull request is open.">
        <ul className="grid gap-2">
          {running.map(({ s }) => card(s))}
          {loose.map((p) => (
            <li key={p.number}>
              <NoTicketCard repo={w.repo} pr={p} back={here} />
            </li>
          ))}
        </ul>
      </Lane>
      <Lane
        id="shipped"
        title="Shipped"
        count={count.shipped}
        shown={column === "shipped"}
        empty="Nothing merged in the last 14 days."
      >
        <ul className="grid gap-1 text-ui">
          {w.merged.map((m) => (
            <li key={m.number} className="flex min-h-row items-baseline gap-2">
              <span className="shrink-0 font-mono text-meta tabular-nums text-muted-foreground">{m.mergedAt}</span>
              <a href={m.url} className="line-clamp-2 underline underline-offset-3">
                {m.title}
              </a>
            </li>
          ))}
        </ul>
      </Lane>
    </div>
  );
}

export default async function BoardPage({ params, searchParams }: Props) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const { client } = await params;
  const c = withRepo.find((x) => x.slug === client);
  if (!c) notFound();
  const q = await searchParams;
  const [w, { error, note }] = await Promise.all([repoWork(c.repo), flash(searchParams)]);
  const column: Column = isColumn(q.column) ? q.column : "queued";
  const name = c.name ?? c.slug;
  const back = { href: "/work", label: "Work" };

  if (w.error) {
    return (
      <>
        <PageHeader
          user={user}
          title={name}
          back={back}
          meta={
            <>
              {c.repo} · <ReadAgo at={w.readAt} />
            </>
          }
        />
        <p className="text-ui text-muted-foreground">{w.error}</p>
      </>
    );
  }

  const sum = summaryOf(w);
  const open = w.epics.reduce((n, e) => n + e.open.length, 0) + w.triage.length;
  const { count } = lanesOf(w);
  return (
    <>
      <PageHeader
        user={user}
        title={name}
        back={back}
        className="mb-0"
        meta={
          <>
            {c.repo} · {open} open · {sum.running} running · {sum.waiting} wait on you · <ReadAgo at={w.readAt} />
          </>
        }
        live={[workInFlight(c.repo)]}
      />
      <div className="md:flex md:h-[calc(100dvh-var(--page-header)-var(--safe-top))] md:flex-col">
        <Flash error={error} note={note} className="mt-4 md:shrink-0" />
        <div className="py-3 md:hidden">
          <FilterGroup
            label="Column"
            value={column}
            items={COLUMNS.map(([k, label]) => ({
              value: k,
              label: `${label} · ${count[k]}`,
              href: `/work/${c.slug}?column=${k}`,
            }))}
          />
        </div>
        <Board client={c.slug} w={w} column={column} />
      </div>
    </>
  );
}
