import { redirect } from "next/navigation";
import { FilterGroup } from "@/app/_filters";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { Due, StatusTag } from "@/components/desk/status-tag";
import { allProspects } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import { clientBySlug } from "@/lib/house";
import { today, type DeskUser, type Prospect } from "@/lib/pool";
import { stageForSalesman } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { AddProspect, AddProspectButton, AddProspectPanel } from "./_add";
import { AddProspectForm } from "./_form";

// The pool: every row, for Jamie and every salesman (prospecting: one owner per row, all read it, so
// two salesmen never approach one company). Add a row here; the rest is on the row's page.
// A handed-off row names its deal's stage from the client folder: a salesman follows a deal
// they sourced up to agreement and nothing after it; Jamie sees the stage itself.
export const dynamic = "force-dynamic";

const open = (s: string) => s !== "handed off" && s !== "lost";

// The filter, kept in the URL as ?status= and applied on the server. Mine is the rows the
// user sourced, the rows they write.
const FILTERS = [
  ["all", "All"],
  ["open", "Open"],
  ["mine", "Mine"],
  ["handed-off", "Handed off"],
  ["lost", "Lost"],
] as const;
type Filter = (typeof FILTERS)[number][0];
const isFilter = (v: unknown): v is Filter => FILTERS.some(([k]) => k === v);

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
  { key: "status", label: "Status", phone: "meta", cell: (p) => <StatusTag status={p.status} /> },
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
  const [rows, q, { error, note }] = await Promise.all([allProspects(), searchParams, flash(searchParams)]);
  const filter = isFilter(q.status) ? q.status : "all";
  const shown = rows.filter((p) => shows(filter, p, user));
  const now = today();
  // The rows due now: a next action today or past, on an open row the user works (Jamie: all),
  // whatever the filter.
  const mine = (p: Prospect) => user.role === "jamie" || p.salesman === user.id;
  const due = rows.filter((p) => p.next_action && p.next_action <= now && open(p.status) && mine(p));
  return (
    <AddProspect>
      <PageHeader
        user={user}
        title="Pool"
        meta={filter === "all" ? `${rows.length} prospects` : `${shown.length} of ${rows.length} prospects`}
        actions={<AddProspectButton />}
      />
      <Flash error={error} note={note} />
      <div className="mb-4">
        <FilterGroup
          label="Status"
          value={filter}
          items={FILTERS.map(([k, label]) => ({ value: k, label, href: k === "all" ? "/pool" : `/pool?status=${k}` }))}
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
          rows.length === 0
            ? "No prospect in the pool yet. Add one with Add a prospect; the site's contact form and the free look add theirs."
            : "No prospect matches this filter."
        }
      />
      <p className="mt-2 text-ui font-normal text-muted-foreground">
        An amber next action is due inside seven days; a red one is overdue. You write the rows you sourced; the others
        are read-only.
      </p>
      <AddProspectPanel>
        <AddProspectForm />
      </AddProspectPanel>
    </AddProspect>
  );
}
