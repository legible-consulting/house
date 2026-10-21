import type { ClientRow, Invoice } from "./house";
import type { Status } from "./pool";

// The desk's rhythms as pure functions over the house (desk/CONTEXT.md): the Friday review
// and the monthly close. The glance is a file the sweep writes; the page renders it.

// The order of the stage table in clients/CONTEXT.md.
export const STAGES = [
  "prospect",
  "research",
  "proposal",
  "quote",
  "agreement",
  "kickoff",
  "build",
  "handover",
  "after",
  "lost",
] as const;
export const stageRank = (s: string | undefined): number => {
  const i = STAGES.indexOf((s ?? "") as (typeof STAGES)[number]);
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

export const today = (): string => new Date().toISOString().slice(0, 10);

export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000);
}

// ISO week of a date, as "YYYY-Www".
export function isoWeek(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  const dow = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dow);
  const jan1 = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export interface ReviewRow {
  client: ClientRow;
  days: number | null; // to the deadline; negative when overdue
}

// The Friday review: every client's next action and deadline, the soonest deadline first,
// then by stage; retainer and role with no next action listed apart as ongoing.
export function review(clients: ClientRow[], day: string): { rows: ReviewRow[]; ongoing: ClientRow[] } {
  const ongoing = clients.filter(isOngoing);
  const rows = clients
    .filter((c) => !isOngoing(c))
    .map((c) => ({ client: c, days: c.deadline ? daysBetween(day, String(c.deadline).slice(0, 10)) : null }))
    .sort((a, b) => {
      if (a.days !== null && b.days !== null && a.days !== b.days) return a.days - b.days;
      if ((a.days === null) !== (b.days === null)) return a.days === null ? 1 : -1;
      return stageRank(a.client.stage) - stageRank(b.client.stage) || a.client.slug.localeCompare(b.client.slug);
    });
  return { rows, ongoing };
}

export interface CloseRow {
  client: ClientRow;
  invoiced: number; // issued in the month
  paid: number; // paid in the month
  owed: number; // issued by the end of the month, unpaid by its end
  overdue: number; // owed and past due at the end of the month
  commission: number | null; // due this month: owed × paid this month ÷ all invoiced (S1)
  costMonthly: number | null; // from economics.yaml costs_monthly
  marginMonthly: number | null;
  currency: string;
}

const inMonth = (d: string, month: string) => d.startsWith(month);
const sum = (xs: Invoice[]) => xs.reduce((n, i) => n + i.amount, 0);
const lastDay = (month: string): string => {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y!, m!, 0)).toISOString().slice(0, 10);
};

// The monthly close for one month (YYYY-MM): invoiced, paid and owed per client; cost to run
// each engagement where economics.yaml names it; commission due. Clients with no invoice
// and no economics are left out: nothing to close.
export function close(clients: ClientRow[], month: string): CloseRow[] {
  const end = lastDay(month);
  return clients
    .filter((c) => c.invoices.length > 0 || c.economics)
    .map((c) => {
      const inv = c.invoices;
      const issuedByEnd = inv.filter((i) => i.issued && i.issued <= end);
      const unpaidAtEnd = issuedByEnd.filter((i) => !i.paid || i.paid > end);
      const paidThisMonth = inv.filter((i) => i.paid && inMonth(i.paid, month));
      const all = sum(inv);
      const owedTotal = Number(c.commission?.owed ?? 0);
      const costs = c.economics?.costs_monthly;
      const costMonthly = costs ? Object.values(costs).reduce<number>((n, v) => n + (Number(v) || 0), 0) : null;
      return {
        client: c,
        invoiced: sum(inv.filter((i) => inMonth(i.issued, month))),
        paid: sum(paidThisMonth),
        owed: sum(unpaidAtEnd),
        overdue: sum(unpaidAtEnd.filter((i) => i.due && i.due < end)),
        commission:
          c.salesman && owedTotal > 0 && all > 0 ? Math.round((owedTotal * sum(paidThisMonth)) / all) : null,
        costMonthly,
        marginMonthly: typeof c.economics?.margin_monthly === "number" ? c.economics.margin_monthly : null,
        currency: inv[0]?.currency ?? c.economics?.currency ?? "EUR",
      };
    });
}

// Pipeline and conversion: the pool by status (request time) and the folders by stage.
export function pipeline(counts: Record<Status, number>, clients: ClientRow[]) {
  const handedOff = counts["handed off"];
  const lost = counts.lost;
  const decided = handedOff + lost;
  const byStage = Object.fromEntries(STAGES.map((s) => [s, clients.filter((c) => c.stage === s).length])) as Record<
    (typeof STAGES)[number],
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
