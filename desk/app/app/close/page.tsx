import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { countsByStatus } from "@/lib/db";
import type { Search } from "@/lib/guard";
import { clients, closeDocs } from "@/lib/house";
import { STATUSES } from "@/lib/pool";
import { STAGES, close, money, pipeline, today } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { Shell } from "../_shell";
import { Heading, Prose } from "../_ui";

// The monthly close (desk/CONTEXT.md): invoiced, paid and owed per client from
// clients/*/quote/invoices/*.yaml; cost to run each engagement from quote/economics.yaml;
// commission due (S1); pipeline and conversion from the pool and the folders. Jamie's page.
// ?month=YYYY-MM picks the month; the default is the current one. When rhythms.yml has
// committed desk/close/<that month>.md (on the 1st, for the month that ended), the page
// renders that file and reads only the pool live; otherwise, or with ?live=1, it computes the
// same rules live (lib/rhythms.ts).
export const dynamic = "force-dynamic";

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const shift = (month: string, n: number): string => {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y!, m! - 1 + n, 1));
  return d.toISOString().slice(0, 7);
};
const label = (month: string): string =>
  new Date(`${month}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export default async function Close({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const q = await searchParams;
  const month = typeof q.month === "string" && MONTH_RE.test(q.month) ? q.month : today().slice(0, 7);
  const live = q.live === "1";
  const file = live ? undefined : closeDocs.find((d) => d.file === `${month}.md`);
  const counts = await countsByStatus();
  const rows = close(clients, month);
  const pipe = pipeline(counts, clients);
  const total = (k: "invoiced" | "paid" | "owed" | "overdue") => rows.reduce((n, r) => n + r[k], 0);
  const commission = rows.reduce((n, r) => n + (r.commission ?? 0), 0);
  const cur = rows[0]?.currency ?? "EUR";
  const cell = (n: number, strong = false) => (
    <TableCell className={cn("text-right tabular-nums", strong && "font-medium")}>{n ? money(n, cur) : "—"}</TableCell>
  );

  const nav = (
    <>
      <a href={`/close?month=${shift(month, -1)}`} className="underline">
        ← {label(shift(month, -1))}
      </a>
      {" · "}
      <a href={`/close?month=${shift(month, 1)}`} className="underline">
        {label(shift(month, 1))} →
      </a>
    </>
  );
  const pool = (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline · the pool</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATUSES.map((s) => (
            <li key={s}>
              <div className="text-xl font-semibold tabular-nums">{counts[s]}</div>
              <div className="text-xs text-muted-foreground">{s}</div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          {pipe.pool} prospects. Conversion, handed off against handed off plus lost:{" "}
          {pipe.conversion === null ? "nothing decided yet" : `${Math.round(pipe.conversion * 100)}%`}.
        </p>
      </CardContent>
    </Card>
  );

  if (file) {
    return (
      <Shell user={user} current="/close">
        <Heading
          title={`Monthly close · ${label(month)}`}
          lede={
            <>
              {nav}. desk/close/{file.file}, written by rhythms.yml on {file.date}.{" "}
              <a href={`/close?month=${month}&live=1`} className="underline">
                The live view
              </a>{" "}
              reads the house as of the last push.
            </>
          }
        />
        <Card>
          <CardContent>
            <Prose markdown={file.body.replace(/^# .*\n+/, "")} />
          </CardContent>
        </Card>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {pool}
          <p className="text-sm text-muted-foreground">The pool is not in the house: this card reads it live.</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell user={user} current="/close">
      <Heading
        title={`Monthly close · ${label(month)}`}
        lede={
          <>
            {nav}. Amounts exclude VAT. Owed is every invoice issued by the month&apos;s end and unpaid at it.
          </>
        }
      />

      <h3 className="mb-2 text-sm font-medium">Money</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Kind</TableHead>
            <TableHead className="text-right">Invoiced</TableHead>
            <TableHead className="text-right">Paid</TableHead>
            <TableHead className="text-right">Owed</TableHead>
            <TableHead className="text-right">Overdue</TableHead>
            <TableHead className="text-right">Cost / month</TableHead>
            <TableHead className="text-right">Margin / month</TableHead>
            <TableHead className="text-right">Commission due</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-muted-foreground">
                Nothing to close: no client has an invoice in quote/invoices/ or an economics.yaml.
              </TableCell>
            </TableRow>
          )}
          {rows.map((r) => (
            <TableRow key={r.client.slug}>
              <TableCell className="font-medium">
                <a href={`/clients/${r.client.slug}`} className="hover:underline">
                  {r.client.name ?? r.client.slug}
                </a>
              </TableCell>
              <TableCell>{r.client.kind ?? ""}</TableCell>
              {cell(r.invoiced)}
              {cell(r.paid)}
              {cell(r.owed)}
              <TableCell className={cn("text-right tabular-nums", r.overdue && "font-medium text-destructive")}>
                {r.overdue ? money(r.overdue, r.currency) : "—"}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {r.costMonthly === null ? "—" : money(r.costMonthly, r.currency)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {r.marginMonthly === null ? "—" : money(r.marginMonthly, r.currency)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {r.client.salesman
                  ? r.commission === null
                    ? "owed not set"
                    : money(r.commission, r.currency)
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
          {rows.length > 0 && (
            <TableRow>
              <TableCell className="font-medium">Total</TableCell>
              <TableCell />
              {cell(total("invoiced"), true)}
              {cell(total("paid"), true)}
              {cell(total("owed"), true)}
              {cell(total("overdue"), true)}
              <TableCell />
              <TableCell />
              {cell(commission, true)}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="mt-2 text-xs text-muted-foreground">
        Cost and margin per month come from each client&apos;s quote/economics.yaml, where a value marked estimate stays
        an estimate until measured. Commission is the record&apos;s commission.owed, due in proportion to what the
        client paid this month (sell/01-prospecting/prospect.md).
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {pool}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline · the folders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {STAGES.map((s) => (
                <li key={s}>
                  <div className="text-xl font-semibold tabular-nums">{pipe.byStage[s]}</div>
                  <div className="text-xs text-muted-foreground">{s}</div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">{clients.length} client folders by stage.</p>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}
