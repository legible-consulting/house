import { Check } from "lucide-react";
import type { ReactNode } from "react";
import type { Status } from "@/lib/pool";
import { daysBetween } from "@/lib/rhythms";
import type { StubState } from "@/lib/work";
import { cn } from "@/lib/utils";

// A state is a mark plus its name: an 8 px dot, a hollow ring or a 12 px check, and the
// state's name in mono meta, sentence case. The mark is hidden from a reader; the name is the
// text. Colour draws the mark and, where the table says so, the name. The same tag carries
// the pool's statuses (lib/pool.ts), the research verdicts (research/CONTEXT.md) and a
// ticket's state on /work (lib/work.ts).

interface Look {
  mark: "dot" | "ring" | "check";
  colour: string; // the mark's colour: a fill for a dot, an edge for a ring, the stroke for a check
  text?: string; // the name's colour and weight, when not the default
}

const POOL: Record<Status, Look> = {
  new: { mark: "ring", colour: "border-muted-foreground" },
  contacted: { mark: "dot", colour: "bg-muted-foreground" },
  replied: { mark: "dot", colour: "bg-foreground" },
  meeting: { mark: "dot", colour: "bg-foreground", text: "font-semibold" },
  "ready for Jamie": { mark: "dot", colour: "bg-warning", text: "font-semibold text-warning-text" },
  "handed off": { mark: "check", colour: "text-success" },
  lost: { mark: "dot", colour: "bg-border", text: "text-muted-foreground" },
};

const VERDICT: Record<string, Look> = {
  adopt: { mark: "check", colour: "text-success" },
  watch: { mark: "dot", colour: "bg-warning", text: "text-warning-text" },
  decline: { mark: "dot", colour: "bg-border", text: "text-muted-foreground" },
};
// A ticket row takes the hover wash, where red words fall below 4.5:1 in dark: a blocked
// ticket's name stays ink, in 600, and the red draws the mark only.
const TICKET: Record<StubState, Look> = {
  next: { mark: "dot", colour: "bg-foreground", text: "font-semibold" },
  running: { mark: "ring", colour: "border-foreground" },
  blocked: { mark: "dot", colour: "bg-destructive", text: "font-semibold" },
  queued: { mark: "ring", colour: "border-muted-foreground", text: "text-muted-foreground" },
};
const UNKNOWN: Look = { mark: "ring", colour: "border-muted-foreground", text: "text-muted-foreground" };

function Mark({ mark, colour }: Look) {
  if (mark === "check") return <Check className={cn("size-3 shrink-0", colour)} strokeWidth={3} aria-hidden="true" />;
  return (
    <span
      aria-hidden="true"
      className={cn("size-2 shrink-0 rounded-full", mark === "ring" && "border-[1.5px] bg-transparent", colour)}
    />
  );
}

function Tag({ look, className, children }: { look: Look; className?: string; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 font-mono text-meta whitespace-nowrap", look.text, className)}>
      <Mark {...look} />
      {children}
    </span>
  );
}

export function StatusTag({ status, className }: { status: Status; className?: string }) {
  return (
    <Tag look={POOL[status]} className={className}>
      {status}
    </Tag>
  );
}

export function VerdictTag({ verdict, className }: { verdict: string; className?: string }) {
  return (
    <Tag look={VERDICT[verdict] ?? UNKNOWN} className={className}>
      {verdict || "none"}
    </Tag>
  );
}

// A ticket's state. `children` replaces the name when the state has more to say ("running
// in #12").
export function TicketTag({ state, className, children }: { state: StubState; className?: string; children?: ReactNode }) {
  return (
    <Tag look={TICKET[state]} className={className}>
      {children ?? state}
    </Tag>
  );
}

// A date is a state too. A deadline or a next action inside seven days shows the date and
// the day count in amber, 600; one past shows the date in red, 600, and the word "overdue";
// any other date is plain mono. `flag` false keeps a date plain: a closed row is never due.
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function Due({
  date,
  today,
  flag = true,
  className,
}: {
  date: string | null | undefined;
  today: string;
  flag?: boolean;
  className?: string;
}) {
  if (!date) return null;
  const days = flag && DATE.test(date) ? daysBetween(today, date) : null;
  const base = "font-mono text-meta tabular-nums whitespace-nowrap";
  if (days === null || days > 7) return <span className={cn(base, className)}>{date}</span>;
  if (days < 0) return <span className={cn(base, "font-semibold text-destructive", className)}>{date} · overdue</span>;
  const words = days === 0 ? "today" : `in ${days} ${days === 1 ? "day" : "days"}`;
  return (
    <span className={cn(base, "font-semibold text-warning-text", className)}>
      {date} · {words}
    </span>
  );
}

// A retainer or a role with no next action: ongoing, never flagged.
export function Ongoing({ className }: { className?: string }) {
  return <span className={cn("text-muted-foreground", className)}>ongoing</span>;
}
