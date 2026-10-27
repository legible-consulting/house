import { redirect } from "next/navigation";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Empty } from "@/components/desk/empty";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { StageTrack } from "@/components/desk/stage-track";
import { Stat, StatGrid } from "@/components/desk/stat";
import { actions as nextActions, type Urgency } from "@/lib/actions";
import { countsByStatus } from "@/lib/db";
import { startOf } from "@/lib/github";
import { flash, type Search } from "@/lib/guard";
import { clients, estate, type ClientRow } from "@/lib/house";
import { repoInFlight } from "@/lib/repos";
import { today } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { ActionGroup } from "@/app/_action";
import { CheckCell, ReleaseCell } from "@/app/_repo";

// Jamie's page (desk/app/DESIGN.md, rule 1): what do I do today? The tiles count the next
// client actions by urgency and the pool's leads that wait on Jamie. Then one card per next
// client action (app/_action.tsx), grouped by urgency: overdue, this week, later, no deadline.
// Each card carries Copy prompt, the words that start a session on the house to do the action
// (lib/actions.ts). The actions are the glance's rows (lib/rhythms.ts glanceRows), from the
// house as of the last push to main, computed now; rhythms.yml commits the glance file every
// morning. The house's own steps (Jamie's hand) are on /work, not here. Last, the clients
// table: each repo's latest release and check.yml run per request (lib/repos.ts), and the
// blueprint's drift from the report at build time. The page re-reads itself while a run or a
// deploy is in flight (components/desk/page-header.tsx). A salesman goes to the pool. A client
// goes to their client's page.
export const dynamic = "force-dynamic";

const GROUPS: { urgency: Urgency; title: string }[] = [
  { urgency: "overdue", title: "Overdue" },
  { urgency: "soon", title: "This week" },
  { urgency: "later", title: "Later" },
  { urgency: "open", title: "No deadline" },
];

// The clients table, four columns (DESIGN.md, rule 7): the client, the stage, the release
// with the blueprint's drift under it when the repo drifted, and check.yml. The next action
// and the deadline are on the cards above. On the phone a client is the name and the stage.
const columns: Column<ClientRow>[] = [
  { key: "client", label: "Client", phone: "title", className: "md:min-w-48", cell: (c) => c.name ?? c.slug },
  { key: "stage", label: "Stage", phone: "meta", cell: (c) => <StageTrack stage={c.stage} /> },
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

// A list of client names, each linked to its page, for a quiet line.
function Names({ list }: { list: ClientRow[] }) {
  return list.map((c, i) => (
    <span key={c.slug}>
      {i > 0 && ", "}
      <a href={`/clients/${c.slug}`} className="underline underline-offset-3">
        {c.name ?? c.slug}
      </a>
    </span>
  ));
}

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
  const { actions, silent, ongoing } = nextActions(clients, now);
  const by = (u: Urgency) => actions.filter((a) => a.urgency === u);
  const open = counts.new + counts.contacted + counts.replied + counts.meeting + counts["ready for Jamie"];
  // Rule 8: a tile that would read 0 is not drawn.
  const tiles = [
    { label: "overdue", value: by("overdue").length, href: "#actions-overdue" },
    { label: "due this week", value: by("soon").length, href: "#actions-this-week" },
    { label: "leads ready for you", value: counts["ready for Jamie"], href: "/pool" },
    { label: "open leads", value: open, href: "/pool" },
  ].filter((t) => t.value > 0);
  const meta = `${now} · ${actions.length} ${actions.length === 1 ? "action" : "actions"}`;
  return (
    <>
      <PageHeader user={user} title="Desk" meta={meta} live={repos.map(repoInFlight)} start={start} />
      <Flash error={error} note={note} />
      {tiles.length > 0 && (
        <StatGrid className="mb-8">
          {tiles.map((t) => (
            <Stat key={t.label} value={t.value} label={t.label} href={t.href} />
          ))}
        </StatGrid>
      )}

      <div className="mb-10 grid gap-8">
        {actions.length === 0 ? (
          <p className="text-ui text-muted-foreground">No client has a next action.</p>
        ) : (
          GROUPS.map((g) => <ActionGroup key={g.urgency} title={g.title} actions={by(g.urgency)} today={now} />)
        )}
        {(silent.length > 0 || ongoing.length > 0) && (
          <div className="grid gap-1 text-ui text-muted-foreground">
            {silent.length > 0 && (
              <p>
                No next action: <Names list={silent} />.
              </p>
            )}
            {ongoing.length > 0 && (
              <p>
                Ongoing, none needed: <Names list={ongoing} />.
              </p>
            )}
          </div>
        )}
      </div>

      <h2 className="mb-3 text-heading">Clients</h2>
      <DataTable
        columns={columns}
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
