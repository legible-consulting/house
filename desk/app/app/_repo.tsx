import { Suspense, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { inFlight, repoStatus, type RepoStatus, type Run } from "@/lib/repos";

// A client repo's status in words (lib/repos.ts): the latest release and the latest
// check.yml run on the default branch, any status. Each read streams in behind a Suspense
// boundary, so a slow GitHub never holds the rest of the page. Jamie gets the links and the
// reason when a read fails; a client gets the words only (the repo is private, and the
// reason names the desk's token). RunState is the one way a run is shown on the desk: the
// sync pill and the Work rows use it too.

type Ok = Extract<RepoStatus, { ok: true }>;

const RED = new Set(["failure", "timed_out", "startup_failure"]);
const word = (conclusion: string) =>
  conclusion === "success" ? "green" : RED.has(conclusion) ? `red (${conclusion.replace(/_/g, " ")})` : conclusion.replace(/_/g, " ");
const tone = (conclusion: string): "secondary" | "destructive" | "outline" =>
  conclusion === "success" ? "secondary" : RED.has(conclusion) ? "destructive" : "outline";

// Times are Lisbon's, the house's clock: the glance is dated there (lib/rhythms.ts).
const LISBON = "Europe/Lisbon";
const clockFormat = new Intl.DateTimeFormat("en-GB", { timeZone: LISBON, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
const dayFormat = new Intl.DateTimeFormat("en-CA", { timeZone: LISBON });

// hh:mm, or "" when the time is not one.
export function clock(iso: string): string {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? "" : clockFormat.format(t);
}

// YYYY-MM-DD hh:mm, or "" when the time is not one.
export function stamp(iso: string): string {
  const t = Date.parse(iso);
  return Number.isNaN(t) ? "" : `${dayFormat.format(t)} ${clockFormat.format(t)}`;
}

// The run's state in words: queued (or waiting), running since hh:mm, or its conclusion.
export const stateWord = (run: Run): string =>
  !inFlight(run)
    ? word(run.conclusion ?? "unknown")
    : run.status === "in_progress"
      ? `running since ${clock(run.started)}`
      : run.status.replace(/_/g, " ");

const link = (href: string, text: string, jamie: boolean) =>
  jamie && href ? (
    <a href={href} className="underline">
      {text}
    </a>
  ) : (
    text
  );

// A run as a badge with its state word, linked to the run for Jamie, then the time it ended
// when it is done.
export function RunState({ run, jamie }: { run: Run; jamie: boolean }) {
  const flight = inFlight(run);
  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      <Badge variant={flight ? "outline" : tone(run.conclusion ?? "")}>{link(run.url, stateWord(run), jamie)}</Badge>
      {!flight && stamp(run.updated)}
    </span>
  );
}

function Release({ s, jamie }: { s: Ok; jamie: boolean }) {
  if (!s.release) return <span className="text-muted-foreground">no release yet</span>;
  return (
    <span className="tabular-nums">
      {link(s.release.url, s.release.tag, jamie)} · {s.release.date}
    </span>
  );
}

// The latest run, any status. While it is queued or running, the last completed run follows
// it, so the last verdict stays in view.
function Check({ s, jamie }: { s: Ok; jamie: boolean }) {
  if (!s.checkFile) return <span className="text-muted-foreground">no check.yml</span>;
  if (!s.latest) return <span className="text-muted-foreground">no run yet</span>;
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <RunState run={s.latest} jamie={jamie} />
      {inFlight(s.latest) && s.check && (
        <span className="text-xs text-muted-foreground">
          last <RunState run={s.check} jamie={jamie} />
        </span>
      )}
    </span>
  );
}

const unavailable = (s: Extract<RepoStatus, { ok: false }>, jamie: boolean) =>
  jamie ? s.reason : "The repository status is not available now.";

async function Cells({ repo, jamie }: { repo: string; jamie: boolean }) {
  const s = await repoStatus(repo);
  if (!s.ok) {
    return (
      <TableCell colSpan={2} className="text-xs text-muted-foreground">
        {unavailable(s, jamie)}
      </TableCell>
    );
  }
  return (
    <>
      <TableCell>
        <Release s={s} jamie={jamie} />
      </TableCell>
      <TableCell>
        <Check s={s} jamie={jamie} />
      </TableCell>
    </>
  );
}

// Two table cells: the release, then check.yml. One cell across both when there is no repo
// or the read failed.
export function RepoCells({ repo, jamie }: { repo: string | null | undefined; jamie: boolean }) {
  if (!repo) {
    return (
      <TableCell colSpan={2} className="text-muted-foreground">
        no repo
      </TableCell>
    );
  }
  return (
    <Suspense
      fallback={
        <TableCell colSpan={2} className="text-xs text-muted-foreground">
          reading GitHub…
        </TableCell>
      }
    >
      <Cells repo={repo} jamie={jamie} />
    </Suspense>
  );
}

async function Facts({ repo, jamie }: { repo: string; jamie: boolean }) {
  const s = await repoStatus(repo);
  if (!s.ok) return <p className="text-sm text-muted-foreground">{unavailable(s, jamie)}</p>;
  return (
    <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-xs text-muted-foreground">Latest release</dt>
        <dd>
          <Release s={s} jamie={jamie} />
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">check.yml on the default branch</dt>
        <dd>
          <Check s={s} jamie={jamie} />
        </dd>
      </div>
    </dl>
  );
}

// The release and check.yml as two facts, for the client's page.
export function RepoFacts({ repo, jamie }: { repo: string; jamie: boolean }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Reading GitHub…</p>}>
      <Facts repo={repo} jamie={jamie} />
    </Suspense>
  );
}

// "read N seconds ago" for a list read at `at` (epoch ms).
export function ReadAgo({ at }: { at: number }): ReactNode {
  const seconds = Math.max(0, Math.round((Date.now() - at) / 1000));
  return <span className="text-xs text-muted-foreground">read {seconds} seconds ago</span>;
}
