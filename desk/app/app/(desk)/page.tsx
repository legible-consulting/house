import { redirect } from "next/navigation";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Document } from "@/components/desk/document";
import { Empty } from "@/components/desk/empty";
import { Flash } from "@/components/desk/flash";
import { Fold } from "@/components/desk/fold";
import { PageHeader } from "@/components/desk/page-header";
import { Prose } from "@/components/desk/prose";
import { StageTrack } from "@/components/desk/stage-track";
import { Stat, StatGrid } from "@/components/desk/stat";
import { Due, Ongoing } from "@/components/desk/status-tag";
import { countsByStatus } from "@/lib/db";
import { startOf } from "@/lib/github";
import { flash, type Search } from "@/lib/guard";
import { clients, day, estate, hand, type ClientRow } from "@/lib/house";
import { render } from "@/lib/markdown";
import { STATUSES } from "@/lib/pool";
import { repoInFlight } from "@/lib/repos";
import { glance, isOngoing, today } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { CheckCell, ReleaseCell } from "@/app/_repo";

// Jamie's page: the glance, computed now from the house as of the last push to main
// (lib/rhythms.ts; rhythms.yml commits the same words to desk/glance/ every morning), the
// pool's count per status (request time) and the clients table (clients/*/record.md and the
// drift report at build time; each repo's latest release and check.yml run per request,
// lib/repos.ts). The page re-reads itself while a house run, a check.yml run or a deploy is
// in flight (components/desk/page-header.tsx). At the desk the glance is the reading column
// and the pool's tiles stand beside it; on the phone the glance comes first, then the tiles,
// then the clients. A pool with no row at all is one line in the tiles' place (DESIGN.md,
// rule 8). A salesman goes to the pool. A client goes to their client's page.
export const dynamic = "force-dynamic";

// The glance as HTML, with each due date in mono and its bold due words in the state's
// colour: amber inside seven days, red past (components/desk/status-tag.tsx, Due). Only the
// words lib/rhythms.ts dueWords writes after a due date are matched.
const glanceHtml = (markdown: string): string =>
  render(markdown).replace(
    /due (\d{4}-\d{2}-\d{2}), <strong>([^<]+)<\/strong>/g,
    (_, date: string, words: string) =>
      `due <span class="font-mono tabular-nums">${date}</span>, <strong class="${words.endsWith("overdue") ? "text-destructive" : "text-warning-text"}">${words}</strong>`,
  );

// The glance in two parts: the sections before "Jamie's hand", and the hand's bullets, which
// fold behind their count (DESIGN.md, rule 6). The glance file keeps every section whole
// (lib/rhythms.ts); only the page folds.
const HAND = "\n## Jamie's hand\n";
const splitHand = (markdown: string): { head: string; hand: string; count: number } => {
  const at = markdown.indexOf(HAND);
  if (at < 0) return { head: markdown, hand: "", count: 0 };
  const hand = markdown.slice(at + HAND.length);
  const count = (hand.match(/^- /gm) ?? []).length;
  return count === 0 ? { head: markdown, hand: "", count } : { head: markdown.slice(0, at), hand, count };
};

// The clients table, five columns (DESIGN.md, rule 7): the client with the next action as its
// second line, the stage, the deadline, the release with the blueprint's drift under it when
// the repo drifted, and check.yml. On the phone a client is one card: the name and the next
// action, then the stage, then the deadline; the repo's facts are for the desk.
const columns = (now: string): Column<ClientRow>[] => [
  {
    key: "client",
    label: "Client",
    phone: "title",
    className: "md:min-w-64",
    cell: (c) => c.name ?? c.slug,
    line: (c) => c.next_action,
  },
  { key: "stage", label: "Stage", phone: "meta", cell: (c) => <StageTrack stage={c.stage} /> },
  {
    key: "deadline",
    label: "Deadline",
    align: "end",
    cell: (c) => (isOngoing(c) ? <Ongoing /> : <Due date={day(c.deadline)} today={now} />),
  },
  {
    key: "release",
    label: "Release",
    phone: "hide",
    cell: (c) => (
      <>
        <ReleaseCell repo={c.repo} jamie />
        {c.blueprint && c.blueprint.drift !== "current" && (
          <span className="line-clamp-2 max-w-56 whitespace-normal text-destructive">{c.blueprint.drift}</span>
        )}
      </>
    ),
  },
  { key: "check", label: "check.yml", phone: "hide", cell: (c) => <CheckCell repo={c.repo} jamie /> },
];

export default async function Home({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "salesman") redirect("/pool");
  if (user.role === "client") {
    if (user.client) redirect(`/clients/${user.client}`);
    return (
      <>
        <PageHeader user={user} title="Desk" />
        <Empty>
          No client folder is linked to this account yet. A new account starts with the client role and no folder;
          Jamie links it to one.
        </Empty>
      </>
    );
  }
  const counts = await countsByStatus();
  const { error, note } = await flash(searchParams);
  const start = startOf(await searchParams);
  const now = today();
  const repos = clients.flatMap((c) => (c.repo ? [c.repo] : []));
  const leads = STATUSES.some((s) => counts[s] > 0);
  const { head, hand: handMarkdown, count } = splitHand(glance(clients, hand.body, now, (c) => `/clients/${c.slug}`));
  return (
    <>
      <PageHeader user={user} title="Desk" meta={now} live={repos.map(repoInFlight)} start={start} />
      <Flash error={error} note={note} />
      <div className="mb-8 grid gap-8 xl:grid-cols-3">
        <Document
          className="min-w-0 xl:col-span-2"
          date={now}
          title="Glance"
          lede="From the house as of the last push to main, computed now. A bold due date is inside seven days or past."
          html={glanceHtml(head)}
        >
          {count > 0 && (
            <section aria-label="Jamie's hand" className="mt-6">
              <Fold label="Jamie's hand" count={count} limit={6}>
                <Prose markdown={handMarkdown} />
              </Fold>
            </section>
          )}
        </Document>
        {leads ? (
          <section aria-labelledby="pool">
            <h2 id="pool" className="mb-3 text-heading">
              Pool
            </h2>
            <StatGrid className="xl:grid-cols-2">
              {STATUSES.map((s) => (
                <Stat key={s} value={counts[s]} label={s} href="/pool" />
              ))}
            </StatGrid>
          </section>
        ) : (
          <p className="text-ui text-muted-foreground">
            <a href="/pool" className="underline underline-offset-3">
              Pool: no open lead.
            </a>
          </p>
        )}
      </div>

      <h2 className="mb-3 text-heading">Clients</h2>
      <DataTable
        columns={columns(now)}
        rows={clients}
        rowKey={(c) => c.slug}
        href={(c) => `/clients/${c.slug}`}
        empty="No client folder yet. The pool's handoff writes the first one."
      />
      <p className="mt-2 text-ui font-normal text-muted-foreground">
        {estate
          ? `Blueprint from desk/estate/${estate.file}, read against ${estate.blueprint} on ${estate.date}; drift.sh writes a new one.`
          : "No drift report in desk/estate/ yet: drift.sh writes one."}
      </p>
    </>
  );
}
