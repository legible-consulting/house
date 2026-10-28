import { redirect } from "next/navigation";
import { Empty } from "@/components/desk/empty";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { Stat, StatGrid } from "@/components/desk/stat";
import { actions as nextActions, type Urgency } from "@/lib/actions";
import { countsByStatus, meetingsForJamie } from "@/lib/db";
import { startOf } from "@/lib/github";
import { flash, type Search } from "@/lib/guard";
import { steps } from "@/lib/hand";
import { clients, type ClientRow } from "@/lib/house";
import { today } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { ActionGroup } from "@/app/_action";
import { HandGroup } from "@/app/_hand";
import { MeetingsGroup } from "@/app/_meetings";

// Jamie's page (desk/app/DESIGN.md, rule 1): what do I do today? The tiles count the next
// client actions by urgency and the pool's leads that wait on Jamie. Then one card per next
// client action (app/_action.tsx), grouped by urgency: overdue, this week, later, no deadline.
// Each card carries Copy prompt, the words that start a session on the house to do the action
// (lib/actions.ts). The actions are the glance's rows (lib/rhythms.ts glanceRows), from the
// house as of the last push to main, computed now; rhythms.yml commits the glance file every
// morning. Under the cards, Jamie's hand: one row per step of the house's own build that no
// session takes alone (.icm/intake/README.md, read at build; app/_hand.tsx), its title with
// Copy prompt, and the step under it when the row opens. The prompt is the words that start a
// session to prepare the step (lib/hand.ts). Between the two, the meetings booked for Jamie
// from the pool, when one exists (app/_meetings.tsx). The clients table is /clients. The page re-reads
// itself while a house run or a deploy is in flight (components/desk/page-header.tsx). A salesman
// goes to the pool. A client goes to their client's page.
export const dynamic = "force-dynamic";

const GROUPS: { urgency: Urgency; title: string }[] = [
  { urgency: "overdue", title: "Overdue" },
  { urgency: "soon", title: "This week" },
  { urgency: "later", title: "Later" },
  { urgency: "open", title: "No deadline" },
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
  const [counts, meetings] = await Promise.all([countsByStatus(), meetingsForJamie()]);
  const { error, note } = await flash(searchParams);
  const start = startOf(await searchParams);
  const now = today();
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
      <PageHeader user={user} title="Desk" meta={meta} start={start} />
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

      <MeetingsGroup meetings={meetings} />

      <HandGroup steps={steps} />
    </>
  );
}
