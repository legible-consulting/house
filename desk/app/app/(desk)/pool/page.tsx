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
import { currentUser, wordsLanguage } from "@/lib/user";
import { words, type Words } from "@/lib/words";
import { AddProspect, AddProspectButton, AddProspectPanel } from "./_add";
import { AddProspectForm } from "./_form";

// The pool: every row, for Jamie and every salesman (prospecting: one owner per row, all read it, so
// two salesmen never approach one company). Search it before you add a row (cadence.md, Channels);
// add a row here; the rest is on the row's page.
// A handed-off row names its deal's stage from the client folder: a salesman follows a deal
// they sourced up to agreement and nothing after it; Jamie sees the stage itself. Every word of
// the page is the user's (lib/words.ts); a status, a stage and a date stay the model's.
export const dynamic = "force-dynamic";

const open = (s: string) => s !== "handed off" && s !== "lost";

// The filter, kept in the URL as ?status= and applied on the server. Mine is the rows the
// user sourced, the rows they write. A salesman opens on Mine, Jamie on All: the URL names the
// filter only when it is not the user's own default. The labels are the user's words.
const FILTERS = ["all", "open", "mine", "handed-off", "lost"] as const;
type Filter = (typeof FILTERS)[number];
const isFilter = (v: unknown): v is Filter => FILTERS.includes(v as Filter);
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
function SearchPool({
  q,
  filter,
  user,
  label,
  className,
}: {
  q: string;
  filter: Filter;
  user: DeskUser;
  label: string;
  className?: string;
}) {
  return (
    <form role="search" action="/pool" className={className}>
      {filter !== defaultFilter(user) && <input type="hidden" name="status" value={filter} />}
      <Input
        type="search"
        name="q"
        defaultValue={q}
        aria-label={label}
        placeholder={label}
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
const columns = (user: DeskUser, now: string, w: Words): Column<Prospect>[] => [
  { key: "company", label: w.pool.columns.company, phone: "title", cell: (p) => p.company },
  { key: "status", label: w.status, phone: "meta", cell: (p) => <PoolTrack status={p.status} /> },
  {
    key: "deal",
    label: w.pool.columns.deal,
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
    label: w.pool.columns.sourced,
    phone: "meta",
    cell: (p) => (
      <>
        <span className="md:hidden">{w.pool.by} </span>
        {p.sourced_by}
      </>
    ),
  },
  {
    key: "next",
    label: w.fields.nextAction,
    cell: (p) => <Due date={p.next_action} today={now} flag={open(p.status)} words={w.due} />,
  },
  { key: "touches", label: w.pool.columns.touches, align: "end", cell: (p) => p.touches },
  {
    key: "contact",
    label: w.pool.columns.contact,
    phone: "hide",
    cell: (p) =>
      [p.contact_name, p.email || p.phone || p.whatsapp || (p.instagram && `@${p.instagram}`)]
        .filter(Boolean)
        .join(" · "),
  },
  {
    key: "updated",
    label: w.pool.columns.updated,
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
  const w = words(await wordsLanguage(user));
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
        title={w.pool.title}
        meta={
          filter === "all" && !q
            ? w.pool.count(rows.length)
            : `${w.pool.countOf(shown.length, rows.length)}${q ? ` · ${q}` : ""}`
        }
        actions={
          <>
            <SearchPool
              q={q}
              filter={filter}
              user={user}
              label={w.pool.search}
              className="w-56 max-md:hidden lg:w-64"
            />
            <AddProspectButton title={w.add.title} short={w.add.short} />
          </>
        }
      />
      <SearchPool q={q} filter={filter} user={user} label={w.pool.search} className="mb-4 md:hidden" />
      <Flash error={error} note={note} />
      <div className="mb-4">
        <FilterGroup
          label={w.status}
          value={filter}
          items={FILTERS.map((k) => ({ value: k, label: w.pool.filters[k], href: poolHref(k, q, user) }))}
        />
      </div>
      {due.length > 0 && (
        <p className="mb-4 flex flex-wrap items-center gap-x-3 text-ui text-warning-text">
          <span className="font-semibold">{w.pool.dueNow}</span>
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
        columns={columns(user, now, w)}
        rows={shown}
        rowKey={(p) => p.id}
        href={(p) => `/pool/${p.id}`}
        empty={
          rows.length === 0 ? (
            w.pool.empty
          ) : q ? (
            <>
              {w.pool.noMatch(w.pool.filters[filter])}
              {filter !== "all" && (
                <>
                  {" "}
                  <Link
                    href={poolHref("all", q, user)}
                    className="inline-flex min-h-row items-center underline underline-offset-3"
                  >
                    {w.pool.searchAll}
                  </Link>{" "}
                  {w.pool.beforeAdd}
                </>
              )}
            </>
          ) : (
            w.pool.noFilterMatch
          )
        }
      />
      <p className="mt-2 text-ui font-normal text-muted-foreground">{w.pool.foot}</p>
      <AddProspectPanel
        title={w.add.title}
        what={w.add.what}
        lesson={add && { href: `/sell/${add.key}`, title: add.title }}
      >
        <AddProspectForm w={w} />
      </AddProspectPanel>
    </AddProspect>
  );
}
