import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { tickGate } from "@/lib/gates";
import { ticketHref, type Ci, type GateName, type Pr, type Stub } from "@/lib/work";
import { cn } from "@/lib/utils";
import { TicketMark } from "./status-tag";
import { StepTrack } from "./track";

// The ticket card (desk/app/DESIGN.md, rule 3): the one shape of a ticket on every page. The
// state mark and the title, then one mono meta line (the epic and `n of m`, or the triage
// lane, then complexity and priority), then the blocked reason in red words. With a pull
// request, the strip under a hairline (rule 4): the number and the title, the track with the
// step's name, the CI word, the preview and the act when it is Jamie's.
//
// An <a> with links inside it is not valid HTML. So the card is an <article>, the title is
// its link with a ::after that covers the card, and each control of the strip sits above it
// with `relative z-10`, as the data table's action cell does. The card takes no hover wash:
// red words fall below 4.5:1 on the wash in dark (globals.css). `compact` hides the meta line.

const LABEL: Record<GateName, string> = { "spec-approved": "Spec approved", "ready-to-merge": "Ready to merge" };
const ABOVE = "relative z-10";

// One line of meta: the epic and the sequence, or the triage lane; then complexity and priority.
export const metaOf = (s: Stub): string =>
  [
    s.epic
      ? `${s.epic}${s.sequence !== null ? ` · ${s.sequence}${s.sequenceOf ? ` of ${s.sequenceOf}` : ""}` : ""}`
      : `triage${s.lane ? ` · ${s.lane}` : ""}`,
    s.complexity,
    s.priority,
  ]
    .filter(Boolean)
    .join(" · ");

const CI_WORD: Record<Ci, string> = { green: "CI green", red: "CI red", pending: "CI pending", none: "no CI" };

// The CI word in mono meta, linked to the run it comes from. Red is red words in 600.
function CiWord({ pr }: { pr: Pr }) {
  const cls = cn("font-mono text-meta whitespace-nowrap", pr.ci === "red" && "font-semibold text-destructive");
  if (!pr.run?.url) return <span className={cls}>{CI_WORD[pr.ci]}</span>;
  return (
    <a href={pr.run.url} className={cn(ABOVE, "inline-flex min-h-row items-center underline underline-offset-3", cls)}>
      {CI_WORD[pr.ci]}
    </a>
  );
}

// The pull request's next act, when it is Jamie's: the gate to tick, or the merge on GitHub.
export function NextAct({ repo, p, className }: { repo: string; p: Pr; className?: string }) {
  if (p.waiting === "merge") {
    return (
      <a href={p.url} className={cn(buttonVariants({ size: "sm", variant: "outline" }), className)}>
        Merge on GitHub
      </a>
    );
  }
  if (!p.waiting) return null;
  return (
    <form action={tickGate.bind(null, repo, p.number, p.waiting)} className={className}>
      <Button type="submit" size="sm">
        Tick {LABEL[p.waiting]}
      </Button>
    </form>
  );
}

export function TicketCard({
  client,
  repo,
  stub,
  pr,
  compact = false,
  className,
}: {
  client: string; // the client folder's slug, or `house`
  repo: string;
  stub: Stub;
  pr?: Pr | null; // the open pull request matched to the stub
  compact?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("relative grid gap-0.5 rounded-pane border bg-card px-3 py-1.5", className)}>
      <div className="flex min-h-row items-start gap-2 py-1 text-ui">
        <span className="flex h-lh shrink-0 items-center">
          <TicketMark state={stub.state} />
        </span>
        <Link
          href={ticketHref(client, stub)}
          className={cn(
            "min-w-0 flex-1 after:absolute after:inset-0 after:rounded-pane hover:underline",
            stub.state === "next" && "font-semibold",
          )}
        >
          <span className="line-clamp-2">{stub.title}</span>
        </Link>
      </div>
      {!compact && <p className="truncate pl-4 font-mono text-meta text-muted-foreground">{metaOf(stub)}</p>}
      {stub.state === "blocked" && stub.blocked && (
        <p className="pl-4 text-ui text-destructive">Blocked: {stub.blocked}</p>
      )}
      {pr && (
        <div className="mt-1 grid gap-0.5 border-t pt-1 pl-4">
          <a
            href={pr.url}
            className={cn(ABOVE, "flex min-h-row min-w-0 max-w-full items-center gap-1.5 justify-self-start text-ui hover:underline")}
          >
            <span className="shrink-0 font-mono text-meta tabular-nums">#{pr.number}</span>
            <span className="truncate">{pr.title}</span>
          </a>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <StepTrack pr={pr} />
            <CiWord pr={pr} />
            {pr.preview && (
              <a href={pr.preview} className={cn(ABOVE, "inline-flex min-h-row items-center text-ui underline underline-offset-3")}>
                Preview
              </a>
            )}
            <NextAct repo={repo} p={pr} className={ABOVE} />
          </div>
        </div>
      )}
    </article>
  );
}
