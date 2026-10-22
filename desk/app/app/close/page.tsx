import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { countsByStatus } from "@/lib/db";
import type { Search } from "@/lib/guard";
import { clients, closeDocs, measured } from "@/lib/house";
import { STATUSES } from "@/lib/pool";
import { STAGES, close, closeTotals, money, pipeline, today, type CloseRow } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { Shell } from "../_shell";
import { Heading, Prose } from "../_ui";

// The monthly close (desk/CONTEXT.md): every engaged client against its quote/economics.yaml
// and the month's measured sessions (desk/sessions/<month>.yaml): the agreed price, the hours
// and the cost the sessions put in this month, and what is left; the price a prospect's
// economics project, apart; the pipeline from the pool and the folders. Invoices and payments
// are handled outside the house. Jamie's page. ?month=YYYY-MM picks the month;
// the default is the current one. When rhythms.yml has committed desk/close/<that month>.md
// (on the 1st, for the month that ended), the page renders that file and reads only the pool
// live; otherwise, or with ?live=1, it computes the same rules live (lib/rhythms.ts).
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

export default async function Close({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const q = await searchParams;
  const month = typeof q.month === "string" && MONTH_RE.test(q.month) ? q.month : today().slice(0, 7);
  const live = q.live === "1";
  const file = live ? undefined : closeDocs.find((d) => d.file === `${month}.md`);
  const counts = await countsByStatus();
  const { rows, projected } = close(clients, month, measured);
  const mm = measured[month];
  const t = closeTotals(rows);
  const pipe = pipeline(counts, clients);
  const cur = rows[0]?.currency ?? "EUR";
  const num = (n: number | null, strong = false, c = cur) => (
    <TableCell className={cn("text-right tabular-nums", strong && "font-medium")}>{n === null ? "—" : money(n, c)}</TableCell>
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
  const pipelineCards = (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
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
            {pipe.pool} prospects, read live. Conversion, handed off against handed off plus lost:{" "}
            {pipe.conversion === null ? "nothing decided yet" : `${Math.round(pipe.conversion * 100)}%`}.
          </p>
        </CardContent>
      </Card>
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
        {pipelineCards}
      </Shell>
    );
  }

  const tiles: [string, string][] = [
    ["Monthly price, agreed", money(t.monthly, cur)],
    ["Cost this month", money(t.cost, cur)],
    ["Margin this month", money(t.margin, cur)],
    ["Hours this month", String(Math.round(t.hours * 10) / 10)],
  ];

  return (
    <Shell user={user} current="/close">
      <Heading
        title={`Monthly close · ${label(month)}`}
        lede={
          <>
            {nav}. Every engaged client against its economics: the agreed price, the hours and the cost the sessions
            put in this month, and what is left. Invoices and payments are handled outside the house.
          </>
        }
      />

      <ul className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {tiles.map(([k, v]) => (
          <li key={k}>
            <Card className="py-3">
              <CardContent className="px-4">
                <div className="text-2xl font-semibold tabular-nums">{v}</div>
                <div className="text-xs text-muted-foreground">{k}</div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <p className="mb-4 text-sm text-muted-foreground">
        {mm
          ? `Sessions measured on ${mm.written} from the transcripts on Jamie's machine: ${Object.values(mm.clients).reduce((n, c) => n + c.sessions, 0)} on client repos, ${mm.other.sessions} elsewhere${mm.plan === null ? ". The plan's price was not given, so the cost is the estimate" : `, against a plan of ${money(mm.plan, cur)}`}. Sessions in the cloud are not counted.`
          : "This month is not measured yet: hours and cost are the quote's estimates. Measure it from the laptop with desk/app/scripts/sessions.mjs."}
      </p>
      <h3 className="mb-2 text-sm font-medium">Engagements</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Kind</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Sessions</TableHead>
            <TableHead className="text-right">Hours</TableHead>
            <TableHead className="text-right">Cost</TableHead>
            <TableHead className="text-right">Margin</TableHead>
            <TableHead className="text-right">Hourly</TableHead>
            <TableHead className="text-right">Commission owed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-muted-foreground">
                Nothing to close: no client is at agreement or later.
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
              <TableCell className={cn("text-right tabular-nums", r.price === null && "text-muted-foreground")}>
                {price(r)}
              </TableCell>
              <TableCell className="text-right tabular-nums">{r.sessions === null ? "—" : r.sessions}</TableCell>
              <TableCell className="text-right tabular-nums">
                {r.hours === null ? "—" : `${r.hours}${r.measured ? "" : " est."}`}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {r.cost === null ? "—" : `${money(r.cost, r.currency)}${r.costMeasured ? "" : " est."}`}
              </TableCell>
              <TableCell className={cn("text-right tabular-nums", r.margin !== null && r.margin < 0 && "text-destructive")}>
                {r.margin === null ? "—" : `${money(r.margin, r.currency)}${r.priceKind === "total" ? " to date" : ""}`}
              </TableCell>
              {num(r.hourly, false, r.currency)}
              {num(r.commission, false, r.currency)}
            </TableRow>
          ))}
          {rows.length > 0 && (
            <TableRow>
              <TableCell className="font-medium">Total</TableCell>
              <TableCell />
              <TableCell className="text-right font-medium tabular-nums">{money(t.monthly, cur)} / month</TableCell>
              <TableCell />
              <TableCell className="text-right font-medium tabular-nums">{Math.round(t.hours * 10) / 10}</TableCell>
              {num(t.cost, true)}
              {num(t.margin, true)}
              <TableCell />
              {num(t.commission, true)}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {projected.length > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          Projected, not agreed:{" "}
          {projected.map((r, i) => (
            <span key={r.client.slug}>
              {i > 0 && ", "}
              <a href={`/clients/${r.client.slug}`} className="underline">
                {r.client.name ?? r.client.slug}
              </a>{" "}
              ({r.client.stage}) {price(r)}
            </span>
          ))}
          .
        </p>
      )}
      <dl className="mt-4 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
        <div>
          <dt className="font-medium text-foreground">Price</dt>
          <dd>price.monthly for a retainer or a role, price.total for a build, in quote/economics.yaml. Agreed from the agreement stage; before it, projected.</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Sessions, hours and cost</dt>
          <dd>The Claude Code sessions on Jamie&apos;s machine, measured by desk/app/scripts/sessions.mjs into desk/sessions/: hours are the active time between turns, cost is the plan&apos;s price shared by tokens. Without a measure, the quote&apos;s estimates, marked est.</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Margin and hourly</dt>
          <dd>Price less cost this month, and price over hours. A build: the total less every measured month&apos;s cost to date, over the hours to date.</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Commission owed</dt>
          <dd>The record&apos;s commission.owed, settled as the client pays, outside the house (sell/01-prospecting/prospect.md).</dd>
        </div>
      </dl>
      {pipelineCards}
    </Shell>
  );
}
