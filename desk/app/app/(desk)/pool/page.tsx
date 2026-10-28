import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { kitIn } from "@/app/(desk)/sell/_course";
import { FilterGroup } from "@/app/_filters";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { PoolTrack } from "@/components/desk/pool-track";
import { Due } from "@/components/desk/status-tag";
import { Input } from "@/components/ui/input";
import { allProspects } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import { clientBySlug } from "@/lib/house";
import { languageOf } from "@/lib/language";
import { today, type DeskUser, type Prospect } from "@/lib/pool";
import { stageForSalesman } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { AddProspect, AddProspectButton, AddProspectPanel } from "./_add";
import { AddProspectForm } from "./_form";

// The pool: every row, for Jamie and every salesman (prospecting: one owner per row, all read it, so
// two salesmen never approach one company). Search it before you add a row (cadence.md, Channels);
// add a row here; the rest is on the row's page.
// A handed-off row names its deal's stage from the client folder: a salesman follows a deal
// they sourced up to agreement and nothing after it; Jamie sees the stage itself.
export const dynamic = "force-dynamic";

const open = (s: string) => s !== "handed off" && s !== "lost";

// The filter, kept in the URL as ?status= and applied on the server. Mine is the rows the
// user sourced, the rows they write. A salesman opens on Mine, Jamie on All: the URL names the
// filter only when it is not the user's own default.
const FILTERS = [
  ["all", "All"],
  ["open", "Open"],
  ["mine", "Mine"],
  ["handed-off", "Handed off"],
  ["lost", "Lost"],
] as const;
type Filter = (typeof FILTERS)[number][0];
const isFilter = (v: unknown): v is Filter => FILTERS.some(([k]) => k === v);
const defaultFilter = (user: DeskUser): Filter => (user.role === "jamie" ? "all" : "mine");

// The pool's URL for a filter and a search: each named only when it is not the default.
function poolHref(filter: Filter, q: string, user: DeskUser): string {
  const params = new URLSearchParams();
  if (filter !== defaultFilter(user)) params.set("status", filter);
  if (q) params.set("q", q);
  const query = params.toString();
  return query ? `/pool?${query}` : "/pool";
}

// The search, kept in the URL as ?q= and run in SQL inside the filter (lib/db.ts allProspects).
// A plain GET form: Enter, or the phone keyboard's search key, sends it; an empty field clears
// it. The filter rides along when it is not the default.
function SearchPool({ q, filter, user, className }: { q: string; filter: Filter; user: DeskUser; className?: string }) {
  return (
    <form role="search" action="/pool" className={className}>
      {filter !== defaultFilter(user) && <input type="hidden" name="status" value={filter} />}
      <Input
        type="search"
        name="q"
        defaultValue={q}
        aria-label="Search the pool"
        placeholder="Search the pool"
        maxLength={100}
        enterKeyHint="search"
        autoCapitalize="none"
        spellCheck={false}
      />
    </form>
  );
}

function shows(filter: Filter, p: Prospect, user: DeskUser): boolean {
  switch (filter) {
    case "open":
      return open(p.status);
    case "mine":
      return p.salesman === user.id;
    case "handed-off":
      return p.status === "handed off";
    case "lost":
      return p.status === "lost";
    default:
      return true;
  }
}

// The rows. On the phone a prospect is one card: the company, then the status, the deal and
// who sourced it, then the next action and the touches; the contact and the date are for the
// desk.
const columns = (user: DeskUser, now: string): Column<Prospect>[] => [
  { key: "company", label: "Company", phone: "title", cell: (p) => p.company },
  { key: "status", label: "Status", phone: "meta", cell: (p) => <PoolTrack status={p.status} /> },
  {
    key: "deal",
    label: "Deal",
    phone: "meta",
    cell: (p) => {
      const stage = p.record && p.slug ? clientBySlug(p.slug)?.stage : undefined;
      const deal = user.role === "jamie" ? (stage ?? "") : stageForSalesman(stage);
      if (!deal) return null;
      return deal && user.role === "jamie" && p.slug ? (
        <a
          href={`/clients/${p.slug}`}
          className="relative font-mono text-meta hover:underline max-md:inline-flex max-md:min-h-row max-md:items-center"
        >
          {deal}
        </a>
      ) : (
        <span className="font-mono text-meta">{deal}</span>
      );
    },
  },
  {
    key: "sourced",
    label: "Sourced by",
    phone: "meta",
    cell: (p) => (
      <>
        <span className="md:hidden">by </span>
        {p.sourced_by}
      </>
    ),
  },
  { key: "next", label: "Next action", cell: (p) => <Due date={p.next_action} today={now} flag={open(p.status)} /> },
  { key: "touches", label: "Touches", align: "end", cell: (p) => p.touches },
  {
    key: "contact",
    label: "Contact",
    phone: "hide",
    cell: (p) =>
      [p.contact_name, p.email || p.phone || p.whatsapp || (p.instagram && `@${p.instagram}`)]
        .filter(Boolean)
        .join(" · "),
  },
  {
    key: "updated",
    label: "Updated",
    phone: "hide",
    cell: (p) => <span className="font-mono text-meta text-muted-foreground">{p.updated}</span>,
  },
];

export default async function Pool({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const [params, h, { error, note }] = await Promise.all([searchParams, headers(), flash(searchParams)]);
  const filter = isFilter(params.status) ? params.status : defaultFilter(user);
  const q = typeof params.q === "string" ? params.q.trim().slice(0, 100) : "";
  // Every row for the count and Due now; the rows that match the search only when there is one.
  const [rows, found] = await Promise.all([allProspects(), q ? allProspects(q) : null]);
  const shown = (found ?? rows).filter((p) => shows(filter, p, user));
  const filterLabel = FILTERS.find(([k]) => k === filter)![1];
  const now = today();
  // The lesson of a new row (lib/kit.ts), for the add card's line, in the user's language.
  const add = kitIn(languageOf(user, h.get("accept-language"))).lessons.find((l) => l.status === "new");
  // The rows due now: a next action today or past, on an open row the user works (Jamie: all),
  // whatever the filter.
  const mine = (p: Prospect) => user.role === "jamie" || p.salesman === user.id;
  const due = rows.filter((p) => p.next_action && p.next_action <= now && open(p.status) && mine(p));
  return (
    <AddProspect>
      <PageHeader
        user={user}
        title="Pool"
        meta={
          filter === "all" && !q
            ? `${rows.length} prospects`
            : `${shown.length} of ${rows.length} prospects${q ? ` · ${q}` : ""}`
        }
        actions={
          <>
            <SearchPool q={q} filter={filter} user={user} className="w-56 max-md:hidden lg:w-64" />
            <AddProspectButton />
          </>
        }
      />
      <SearchPool q={q} filter={filter} user={user} className="mb-4 md:hidden" />
      <Flash error={error} note={note} />
      <div className="mb-4">
        <FilterGroup
          label="Status"
          value={filter}
          items={FILTERS.map(([k, label]) => ({ value: k, label, href: poolHref(k, q, user) }))}
        />
      </div>
      {due.length > 0 && (
        <p className="mb-4 flex flex-wrap items-center gap-x-3 text-ui text-warning-text">
          <span className="font-semibold">Due now</span>
          {due.map((p) => (
            <a
              key={p.id}
              href={`/pool/${p.id}`}
              className="inline-flex min-h-row items-center gap-1.5 underline underline-offset-3"
            >
              {p.company}
              <span className="font-mono text-meta font-semibold tabular-nums">{p.next_action}</span>
            </a>
          ))}
        </p>
      )}
      <DataTable
        columns={columns(user, now)}
        rows={shown}
        rowKey={(p) => p.id}
        href={(p) => `/pool/${p.id}`}
        empty={
          rows.length === 0 ? (
            "No prospect in the pool yet. Add one with Add a prospect; the site's contact form and the free look add theirs."
          ) : q ? (
            <>
              No row matches in {filterLabel}.
              {filter !== "all" && (
                <>
                  {" "}
                  <Link
                    href={poolHref("all", q, user)}
                    className="inline-flex min-h-row items-center underline underline-offset-3"
                  >
                    Search All
                  </Link>{" "}
                  before you add a row.
                </>
              )}
            </>
          ) : (
            "No prospect matches this filter."
          )
        }
      />
      <p className="mt-2 text-ui font-normal text-muted-foreground">
        An amber next action is due inside seven days; a red one is overdue. You write the rows you sourced; the others
        are read-only.
      </p>
      <AddProspectPanel lesson={add && { href: `/sell/${add.key}`, title: add.title }}>
        <AddProspectForm />
      </AddProspectPanel>
    </AddProspect>
  );
}
