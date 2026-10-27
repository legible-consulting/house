import { ChevronLeft, ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Document } from "@/components/desk/document";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { Stat, StatGrid } from "@/components/desk/stat";
import { buttonVariants } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { countsByStatus } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import { clients, closeDocs } from "@/lib/house";
import { STATUSES } from "@/lib/pool";
import { STAGES, close, closeTotals, money, pipeline, today, type CloseRow } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";

// The monthly close (desk/CONTEXT.md): every engaged client against its quote/economics.yaml,
// the agreed price, the quote's estimate of the hours and the cost per month, and what is
// left; the price a prospect's economics project, apart; the pipeline from the pool and the
// folders. The house measures neither hours nor cost. Invoices and payments are handled
// outside the house. Jamie's page. ?month=YYYY-MM picks the month;
// the default is the current one. When rhythms.yml has committed desk/close/<that month>.md
// (on the 1st, for the month that ended), the page renders that file and reads only the pool
// live; otherwise, or with ?live=1, it computes the same rules live (lib/rhythms.ts).
// The header names the month and steps to the one before and after it. The four totals lead
// as tiles; the engagements are a table at the desk and one card per client on the phone; the
// pipeline is two groups of tiles.
export const dynamic = "force-dynamic";

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const shift = (month: string, n: number): string => {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y!, m! - 1 + n, 1));
  return d.toISOString().slice(0, 7);
};
const label = (month: string): string =>
  new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

const price = (r: CloseRow): string =>
  r.price === null ? "not set" : `${money(r.price, r.currency)} ${r.priceKind === "total" ? "total" : "/ month"}`;
const amount = (n: number | null, currency: string): string => (n === null ? "—" : money(n, currency));
const negative = (n: number | null) => (n !== null && n < 0 ? "text-destructive" : undefined);

// The engagements. On the phone a client is one card: the name, then the kind and the price,
// then the hours, the cost, the margin and the hourly rate, each under its label; the
// commission is one more line only when the record owes one.
const columns: Column<CloseRow>[] = [
  { key: "client", label: "Client", phone: "title", cell: (r) => r.client.name ?? r.client.slug },
  { key: "kind", label: "Kind", phone: "meta", cell: (r) => r.client.kind ?? "" },
  {
    key: "price",
    label: "Price",
    align: "end",
    phone: "meta",
    cell: (r) => <span className={r.price === null ? "text-muted-foreground" : undefined}>{price(r)}</span>,
  },
  { key: "hours", label: "Hours / month", align: "end", cell: (r) => (r.hours === null ? "—" : r.hours) },
  { key: "cost", label: "Cost / month", align: "end", cell: (r) => amount(r.cost, r.currency) },
  {
    key: "margin",
    label: "Margin / month",
    align: "end",
    cell: (r) => <span className={negative(r.margin)}>{amount(r.margin, r.currency)}</span>,
  },
  { key: "hourly", label: "Hourly", align: "end", cell: (r) => amount(r.hourly, r.currency) },
  {
    key: "commission",
    label: "Commission owed",
    align: "end",
    className: "max-md:has-[[data-none]]:hidden",
    cell: (r) => (r.commission === null ? <span data-none="">—</span> : money(r.commission, r.currency)),
  },
];

export default async function Close({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const q = await searchParams;
  const { error, note } = await flash(searchParams);
  const month = typeof q.month === "string" && MONTH_RE.test(q.month) ? q.month : today().slice(0, 7);
  const live = q.live === "1";
  const file = live ? undefined : closeDocs.find((d) => d.file === `${month}.md`);
  const counts = await countsByStatus();
  const { rows, projected } = close(clients);
  const t = closeTotals(rows);
  const pipe = pipeline(counts, clients);
  const cur = rows[0]?.currency ?? "EUR";

  const step = (n: -1 | 1) => (
    <a
      href={`/close?month=${shift(month, n)}`}
      aria-label={`${n < 0 ? "Previous" : "Next"} month, ${label(shift(month, n))}`}
      className={buttonVariants({ variant: "ghost", size: "icon-lg" })}
    >
      {n < 0 ? <ChevronLeft className="size-5" aria-hidden="true" /> : <ChevronRight className="size-5" aria-hidden="true" />}
    </a>
  );
  const header = (
    <PageHeader
      user={user}
      title="Monthly close"
      meta={label(month)}
      actions={
        <>
          {step(-1)}
          {step(1)}
        </>
      }
    />
  );

  const pipelineGroups = (
    <div className="mt-8 grid gap-8 lg:grid-cols-2">
      <section aria-labelledby="pipeline-pool">
        <h2 id="pipeline-pool" className="mb-3 text-heading">
          Pipeline · the pool
        </h2>
        <StatGrid className="lg:grid-cols-4">
          {STATUSES.map((s) => (
            <Stat key={s} value={counts[s]} label={s} />
          ))}
        </StatGrid>
        <p className="mt-2 text-ui font-normal text-muted-foreground">
          <span className="font-mono tabular-nums">{pipe.pool}</span> prospects, read live. Conversion, handed off
          against handed off plus lost:{" "}
          {pipe.conversion === null ? (
            "nothing decided yet"
          ) : (
            <span className="font-mono tabular-nums">{Math.round(pipe.conversion * 100)}%</span>
          )}
          .
        </p>
      </section>
      <section aria-labelledby="pipeline-folders">
        <h2 id="pipeline-folders" className="mb-3 text-heading">
          Pipeline · the folders
        </h2>
        <StatGrid>
          {STAGES.map((s) => (
            <Stat key={s} value={pipe.byStage[s]} label={s} />
          ))}
        </StatGrid>
        <p className="mt-2 text-ui font-normal text-muted-foreground">
          <span className="font-mono tabular-nums">{clients.length}</span> client folders by stage.
        </p>
      </section>
    </div>
  );

  if (file) {
    return (
      <>
        {header}
        <Flash error={error} note={note} />
        <Document
          date={file.date}
          title={label(month)}
          lede={
            <>
              desk/close/{file.file}, written by rhythms.yml.{" "}
              <a href={`/close?month=${month}&live=1`} className="underline">
                The live view
              </a>{" "}
              reads the house as of the last push.
            </>
          }
          markdown={file.body.replace(/^# .*\n+/, "")}
        />
        {pipelineGroups}
      </>
    );
  }

  const foot = (
    <>
      <TableCell className="md:sticky md:left-0 md:bg-inherit">Total</TableCell>
      <TableCell />
      <TableCell data-numeric="">{money(t.monthly, cur)} / month</TableCell>
      <TableCell data-numeric="">{t.hours}</TableCell>
      <TableCell data-numeric="">{money(t.cost, cur)}</TableCell>
      <TableCell data-numeric="" className={negative(t.margin)}>
        {money(t.margin, cur)}
      </TableCell>
      <TableCell />
      <TableCell data-numeric="">{money(t.commission, cur)}</TableCell>
    </>
  );

  return (
    <>
      {header}
      <Flash error={error} note={note} />
      <p className="mb-4 max-w-reading text-body text-muted-foreground">
        Every engaged client against its economics: the agreed price, the quote&apos;s estimate of the hours and the
        cost per month, and what is left. Computed live from the house as of the last push. Invoices and payments are
        handled outside the house.
      </p>

      <StatGrid className="mb-8">
        <Stat value={money(t.monthly, cur)} label="Monthly price, agreed" />
        <Stat value={money(t.cost, cur)} label="Cost per month, estimated" />
        <Stat value={<span className={negative(t.margin)}>{money(t.margin, cur)}</span>} label="Margin per month" />
        <Stat value={t.hours} label="Hours per month, estimated" />
      </StatGrid>

      <h2 className="mb-3 text-heading">Engagements</h2>
      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(r) => r.client.slug}
        href={(r) => `/clients/${r.client.slug}`}
        empty="Nothing to close: no client is at agreement or later."
        foot={foot}
      />
      {projected.length > 0 && (
        <p className="mt-2 text-ui font-normal text-muted-foreground">
          Projected, not agreed:{" "}
          {projected.map((r, i) => (
            <span key={r.client.slug}>
              {i > 0 && ", "}
              <a href={`/clients/${r.client.slug}`} className="underline">
                {r.client.name ?? r.client.slug}
              </a>{" "}
              ({r.client.stage}) <span className="font-mono tabular-nums">{price(r)}</span>
            </span>
          ))}
          .
        </p>
      )}
      <dl className="mt-4 grid max-w-reading grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-meta text-muted-foreground">
        <dt className="font-medium text-foreground">Price</dt>
        <dd>
          price.monthly for a retainer or a role, price.total for a build, in quote/economics.yaml. Agreed from the
          agreement stage; before it, projected.
        </dd>
        <dt className="font-medium text-foreground">Hours and cost</dt>
        <dd>The quote&apos;s estimates, hours.per_month and costs_monthly in that file. The house measures neither.</dd>
        <dt className="font-medium text-foreground">Margin and hourly</dt>
        <dd>
          The monthly price less the monthly cost, and the monthly price over the hours. A build shows neither: its
          price is a total.
        </dd>
        <dt className="font-medium text-foreground">Commission owed</dt>
        <dd>The record&apos;s commission.owed, settled as the client pays, outside the house (01-prospecting/prospect.md).</dd>
      </dl>
      {pipelineGroups}
    </>
  );
}
