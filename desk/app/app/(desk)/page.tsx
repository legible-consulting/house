import { redirect } from "next/navigation";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Empty } from "@/components/desk/empty";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { Prose } from "@/components/desk/prose";
import { StageTrack } from "@/components/desk/stage-track";
import { Stat, StatGrid } from "@/components/desk/stat";
import { Due, Ongoing } from "@/components/desk/status-tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { countsByStatus } from "@/lib/db";
import { startOf } from "@/lib/github";
import { flash, type Search } from "@/lib/guard";
import { clients, day, estate, hand, type ClientRow } from "@/lib/house";
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
// in flight (components/desk/page-header.tsx). A salesman goes to the pool. A client goes to their client's
// page.
export const dynamic = "force-dynamic";

// The clients table. On the phone a client is one card: the name, then the stage and the
// kind, then the next action and the deadline; the repo's facts are for the desk.
const columns = (now: string): Column<ClientRow>[] => [
  { key: "client", label: "Client", phone: "title", cell: (c) => c.name ?? c.slug },
  { key: "stage", label: "Stage", phone: "meta", cell: (c) => <StageTrack stage={c.stage} /> },
  { key: "kind", label: "Kind", phone: "meta", cell: (c) => c.kind ?? "" },
  { key: "next", label: "Next action", className: "whitespace-normal", cell: (c) => c.next_action ?? "" },
  {
    key: "deadline",
    label: "Deadline",
    align: "end",
    cell: (c) => (isOngoing(c) ? <Ongoing /> : <Due date={day(c.deadline)} today={now} />),
  },
  {
    key: "repo",
    label: "Repo",
    phone: "hide",
    cell: (c) => <span className="font-mono text-meta text-muted-foreground">{c.repo ?? ""}</span>,
  },
  {
    key: "blueprint",
    label: "Blueprint",
    phone: "hide",
    cell: (c) => (
      <span className={c.blueprint && c.blueprint.drift !== "current" ? "text-destructive" : undefined}>
        {c.blueprint ? c.blueprint.drift : c.repo ? "not in the report" : ""}
      </span>
    ),
  },
  { key: "release", label: "Release", phone: "hide", cell: (c) => <ReleaseCell repo={c.repo} jamie /> },
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
  return (
    <>
      <PageHeader user={user} title="Desk" meta={now} live={repos.map(repoInFlight)} start={start} />
      <Flash error={error} note={note} />
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Glance · {now}</CardTitle>
          <p className="text-ui font-normal text-muted-foreground">
            From the house as of the last push to main, computed now. A bold due date is inside seven days or past.
          </p>
        </CardHeader>
        <CardContent>
          <Prose markdown={glance(clients, hand.body, now, (c) => `/clients/${c.slug}`)} />
        </CardContent>
      </Card>

      <h2 className="mb-3 text-heading">Pool</h2>
      <StatGrid className="mb-8">
        {STATUSES.map((s) => (
          <Stat key={s} value={counts[s]} label={s} />
        ))}
      </StatGrid>

      <h2 className="mb-3 text-heading">Clients</h2>
      <DataTable
        columns={columns(now)}
        rows={clients}
        rowKey={(c) => c.slug}
        href={(c) => `/clients/${c.slug}`}
        empty="No client folder yet. The pool's handoff writes the first one."
      />
      <p className="mt-2 text-ui font-normal text-muted-foreground">
        {clients.length} clients. An amber deadline is inside seven days; a red one is past.
        {estate
          ? ` Blueprint from desk/estate/${estate.file}, read against ${estate.blueprint} on ${estate.date}; drift.sh writes a new one.`
          : " No drift report in desk/estate/ yet: drift.sh writes one."}
      </p>
    </>
  );
}
