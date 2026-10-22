import type { ClientRow, MeasuredClient, MeasuredMonth } from "./house";
import type { Status } from "./pool";

// The desk's rhythms as pure functions over the house (desk/CONTEXT.md): the morning glance
// and the monthly close. The pages compute them live from the house as of the last push to
// main, and scripts/rhythms.mjs writes desk/glance/ and desk/close/ with the same functions
// (rhythms.yml), so one set of rules makes the page and the file. That script loads this
// file through Node's type stripping: keep the syntax erasable (type-only imports, no enum,
// no namespace).

// The order of the stage table in clients/CONTEXT.md.
export const STAGES = [
  "prospect",
  "research",
  "proposal",
  "agreement",
  "kickoff",
  "build",
  "handover",
  "after",
  "lost",
] as const;
export type Stage = (typeof STAGES)[number];
export const stageRank = (s: string | undefined): number => {
  const i = STAGES.indexOf((s ?? "") as Stage);
  return i < 0 ? 99 : i;
};

// A salesman sees a sourced deal's stage up to agreement and nothing after it (S1, "The
// salesman's deal"). Past agreement the stage reads `signed`; lost stays lost.
export function stageForSalesman(stage: string | undefined): string {
  if (!stage) return "";
  if (stage === "lost") return "lost";
  return stageRank(stage) <= stageRank("agreement") ? stage : "signed";
}

// Retainer and role stay at build and have no end: with no next action they are ongoing,
// never stalled (desk/CONTEXT.md, 2026-10-16).
export const isOngoing = (c: ClientRow): boolean =>
  !c.next_action && (c.kind === "retainer" || c.kind === "role");

// The price is agreed from agreement on. Before it, economics.yaml is a projection.
const ENGAGED = new Set<string>(["agreement", "kickoff", "build", "handover", "after"]);
export const isEngaged = (c: ClientRow): boolean => ENGAGED.has(c.stage ?? "");

// Today in Lisbon, the house's clock, as YYYY-MM-DD.
export const today = (): string => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Lisbon" }).format(new Date());

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const dayOf = (v: unknown): string => String(v ?? "").slice(0, 10);
const oneLine = (v: unknown): string => String(v ?? "").replace(/\s*\n\s*/g, " ").trim();
const nameOf = (c: ClientRow): string => c.name ?? c.slug;

export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);
}

// --- The glance ---------------------------------------------------------------------------

export interface GlanceRow {
  client: ClientRow;
  deadline: string; // YYYY-MM-DD, or "" when the record has none
  days: number | null; // to the deadline; negative when overdue; null without a valid date
}

// Every client with a next action or a deadline, the soonest deadline first (an overdue one
// first of all), then the rest by stage and slug. Retainer and role with no next action are
// ongoing and listed apart. A lost client is not listed.
export function glanceRows(clients: ClientRow[], day: string): { rows: GlanceRow[]; ongoing: ClientRow[] } {
  const live = clients.filter((c) => c.stage !== "lost");
  const ongoing = live.filter(isOngoing);
  const rows = live
    .filter((c) => !isOngoing(c) && (c.next_action || c.deadline))
    .map((c) => {
      const deadline = dayOf(c.deadline);
      return { client: c, deadline, days: DATE.test(deadline) ? daysBetween(day, deadline) : null };
    })
    .sort((a, b) => {
      if (a.days !== null && b.days !== null && a.days !== b.days) return a.days - b.days;
      if ((a.days === null) !== (b.days === null)) return a.days === null ? 1 : -1;
      return stageRank(a.client.stage) - stageRank(b.client.stage) || a.client.slug.localeCompare(b.client.slug);
    });
  return { rows, ongoing };
}

// The due words after a deadline: today, in N days, or N days overdue. Inside seven days,
// and past, the words are bold: that is what must reach Jamie unprompted (desk/CONTEXT.md).
export function dueWords(days: number): string {
  if (days < 0) return `**${-days} ${-days === 1 ? "day" : "days"} overdue**`;
  if (days === 0) return "**today**";
  const words = `in ${days} ${days === 1 ? "day" : "days"}`;
  return days <= 7 ? `**${words}**` : words;
}

// The glance as markdown without its H1: the next actions, then the clients with none,
// the ongoing ones, and what Jamie decides (core/wave.md). `link` gives each client's link:
// the record's path in the committed file, the client's page on the desk.
export function glance(clients: ClientRow[], decides: string, day: string, link: (c: ClientRow) => string): string {
  const { rows, ongoing } = glanceRows(clients, day);
  const silent = clients.filter((c) => c.stage !== "lost" && !isOngoing(c) && !c.next_action && !c.deadline);
  const lines: string[] = ["## Next actions", ""];
  if (rows.length === 0) lines.push("None.");
  for (const { client: c, deadline, days } of rows) {
    const action = oneLine(c.next_action) || "no next action";
    const due = !deadline ? "" : days === null ? ` · due ${deadline}` : ` · due ${deadline}, ${dueWords(days)}`;
    lines.push(`- [${nameOf(c)}](${link(c)}) (${c.stage ?? ""}): ${action}${due}`);
  }
  if (silent.length > 0) lines.push("", `No next action: ${silent.map(nameOf).join(", ")}.`);
  if (ongoing.length > 0) {
    lines.push("", "## Ongoing", "", `No next action, and none needed: ${ongoing.map((c) => `${nameOf(c)} (${c.kind})`).join(", ")}.`);
  }
  lines.push("", "## Jamie decides", "", decides.trim() || "None.");
  return `${lines.join("\n")}\n`;
}

// --- The close ----------------------------------------------------------------------------

export interface CloseRow {
  client: ClientRow;
  price: number | null; // agreed: per month for a retainer or a role, in total for a build
  priceKind: "monthly" | "total" | null;
  sessions: number | null; // the Claude Code sessions measured this month
  hours: number | null; // this month: measured from the sessions, else the estimate
  cost: number | null; // this month: the plan's share measured from the sessions, else the estimate
  measured: boolean; // the month's sessions were measured (desk/sessions/<month>.yaml)
  costMeasured: boolean; // and the plan's price was given, so the cost is measured too
  costToDate: number | null; // a build: every measured month's cost up to this month
  hoursToDate: number | null; // a build: every measured month's hours up to this month
  margin: number | null; // price − cost this month; a build: total − cost to date
  hourly: number | null; // what an hour earned: price ÷ hours; a build: total ÷ hours to date
  commission: number | null; // the record's commission.owed, settled as the client pays, outside the house
  currency: string;
}

const num = (v: unknown): number | null => {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
const sumOf = (o: Record<string, number | string> | undefined): number | null =>
  o ? Object.values(o).reduce<number>((n, v) => n + (Number(v) || 0), 0) : null;

export function closeRow(c: ClientRow, month: string, measured: Record<string, MeasuredMonth>): CloseRow {
  const e = c.economics;
  const build = c.kind === "build";
  const price = build ? num(e?.price?.total) : num(e?.price?.monthly);
  const m = measured[month]?.clients[c.slug];
  const costMeasured = m !== undefined && m.cost !== undefined && m.cost !== null;
  const hours = m ? m.hours : num(e?.hours?.per_month);
  const cost = costMeasured ? (m.cost ?? 0) : sumOf(e?.costs_monthly);
  const upTo = Object.values(measured)
    .filter((x) => x.month <= month)
    .map((x) => x.clients[c.slug])
    .filter((x): x is MeasuredClient => x !== undefined);
  const costToDate = upTo.length ? upTo.reduce((n, x) => n + (x.cost ?? 0), 0) : null;
  const hoursToDate = upTo.length ? upTo.reduce((n, x) => n + x.hours, 0) : null;
  let margin: number | null = null;
  if (price !== null) {
    if (build) margin = costToDate === null ? null : price - costToDate;
    else margin = cost === null ? null : price - cost;
  }
  const h = build ? hoursToDate : hours;
  const hourly = price !== null && h ? Math.round(price / h) : null;
  return {
    client: c,
    price,
    priceKind: price === null ? null : build ? "total" : "monthly",
    sessions: m ? m.sessions : null,
    hours,
    cost,
    measured: m !== undefined,
    costMeasured,
    costToDate,
    hoursToDate,
    margin,
    hourly,
    commission: num(c.commission?.owed),
    currency: String(e?.currency ?? "EUR"),
  };
}

// The monthly close for one month (YYYY-MM): every engaged client against its economics
// and the month's measured sessions, and, apart, the price a prospect's economics project. A
// lost client is not listed.
export function close(
  clients: ClientRow[],
  month: string,
  measured: Record<string, MeasuredMonth>,
): { rows: CloseRow[]; projected: CloseRow[] } {
  const live = clients.filter((c) => c.stage !== "lost");
  const order = (a: CloseRow, b: CloseRow) =>
    stageRank(a.client.stage) - stageRank(b.client.stage) || a.client.slug.localeCompare(b.client.slug);
  return {
    rows: live
      .filter(isEngaged)
      .map((c) => closeRow(c, month, measured))
      .sort(order),
    projected: live
      .filter((c) => !isEngaged(c) && c.economics)
      .map((c) => closeRow(c, month, measured))
      .sort(order),
  };
}

// The month's totals: the monthly prices and their margin (a build's total is not a monthly
// figure), the cost and the hours of every row, and the commission owed.
export function closeTotals(rows: CloseRow[]) {
  const monthly = rows.filter((r) => r.priceKind === "monthly");
  const sum = (xs: CloseRow[], k: "price" | "cost" | "hours" | "margin" | "commission") =>
    xs.reduce((n, r) => n + (r[k] ?? 0), 0);
  return {
    monthly: sum(monthly, "price"),
    margin: sum(monthly, "margin"),
    cost: sum(rows, "cost"),
    hours: sum(rows, "hours"),
    commission: sum(rows, "commission"),
  };
}

// Pipeline and conversion: the pool by status (request time) and the folders by stage.
export function pipeline(counts: Record<Status, number>, clients: ClientRow[]) {
  const handedOff = counts["handed off"];
  const lost = counts.lost;
  const decided = handedOff + lost;
  const byStage = Object.fromEntries(STAGES.map((s) => [s, clients.filter((c) => c.stage === s).length])) as Record<
    Stage,
    number
  >;
  return {
    pool: Object.values(counts).reduce((n, v) => n + v, 0),
    handedOff,
    lost,
    conversion: decided > 0 ? handedOff / decided : null,
    byStage,
  };
}

export const money = (n: number, currency = "EUR"): string =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency, maximumFractionDigits: 0 }).format(n);
