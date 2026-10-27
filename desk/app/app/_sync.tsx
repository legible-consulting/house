import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BUILD,
  BUILD_IS_COMMIT,
  DEPLOY_MS,
  distance,
  houseRun,
  RUNS,
  runsUrl,
  since,
  WORKFLOWS,
  type Start,
} from "@/lib/github";
import { built } from "@/lib/house";
import { budgets, clock } from "@/lib/limits";
import { refresh } from "@/lib/refresh";
import { inFlight } from "@/lib/repos";
import { RunState } from "./_repo";
import { Pill, SyncPanel } from "./_sync-panel";

// The sync pill, Jamie only, on the trailing edge of every page header: one word for whether
// the desk shows main. Up to date: the build is main's head. Running: a house run is queued
// or running on GitHub (the glance or the close; its commit redeploys the desk). Deploying:
// main is ahead and its newest commit is under ten minutes old, so Vercel is on it. Out of
// sync: main is ahead for longer, a failed or missing deploy, which Jamie fixes from the
// laptop. Unknown: the distance could not be read; the panel says why. The pill opens a panel
// (app/_sync-panel.tsx: a details element from md, a drawer below it): the build's commit,
// the distance, the runs with their Run buttons, and each GitHub token's rate limit with the
// time it resets (lib/limits.ts). While anything is in flight the page
// re-reads itself (components/desk/page-header.tsx).

type Word = "Up to date" | "Running" | "Deploying" | "Out of sync" | "Unknown";

// The dot is a state mark beside its word: green, amber or red, never alone.
const DOT: Record<Word, string> = {
  "Up to date": "bg-success",
  Running: "bg-warning",
  Deploying: "bg-warning",
  "Out of sync": "bg-destructive",
  Unknown: "bg-muted-foreground",
};

const SHOWN = 5;

async function Panel({ start }: { start: Start | null }) {
  const own = (file: string) => (start?.file === file ? start : null);
  const [d, runs, limits] = await Promise.all([
    distance(),
    Promise.all(WORKFLOWS.map(async (file) => ({ file, read: await houseRun(file, own(file)) }))),
    budgets(),
  ]);
  const running = runs.some(({ file, read }) => read.ok && (inFlight(read.run) || !since(read.run, own(file))));
  const ahead = d.ok ? d.ahead : 0;
  const deploying = d.ok && ahead > 0 && Date.now() - Date.parse(d.newest) < DEPLOY_MS;
  const word: Word = running
    ? "Running"
    : !d.ok
      ? "Unknown"
      : ahead === 0
        ? "Up to date"
        : deploying
          ? "Deploying"
          : "Out of sync";
  const followed = start ? RUNS[start.key] : null;
  return (
    <SyncPanel word={word} dot={DOT[word]}>
      <p className="font-mono text-meta text-muted-foreground">
        Build {BUILD.slice(0, 7)} · house read {built}
      </p>
      <p>
        {!d.ok ? (
          <>main: {d.reason}</>
        ) : ahead === 0 ? (
          <>Up to date with main.</>
        ) : (
          <>
            main is {ahead === 1 ? "1 commit" : `${ahead} commits`} ahead: {d.messages.slice(0, SHOWN).join("; ")}
            {d.messages.length > SHOWN ? "; …" : ""}.{" "}
            {deploying
              ? "Vercel deploys each push in about a minute."
              : "No deploy in ten minutes: a failed build, or one that never started. Fix it from the laptop and push."}
          </>
        )}
      </p>
      <dl className="grid gap-1">
        {runs.map(({ file, read }) => (
          <div key={file} className="flex flex-wrap items-center gap-2">
            <dt>
              <a href={runsUrl(file)} className="font-mono text-meta text-muted-foreground underline hover:text-foreground">
                {file}
              </a>
            </dt>
            <dd>
              {!read.ok ? (
                <span className="text-muted-foreground">{read.reason}</span>
              ) : !read.run ? (
                <span className="text-muted-foreground">no run yet</span>
              ) : (
                <>
                  <RunState run={read.run} jamie />
                  {!since(read.run, own(file)) && (
                    <span className="text-muted-foreground"> · the run you started is not listed yet</span>
                  )}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <dl className="grid gap-1">
        {limits.map((b) => (
          <div key={b.name} className="flex flex-wrap items-center gap-2">
            <dt className="font-mono text-meta text-muted-foreground">{b.name}</dt>
            <dd>
              {!b.ok ? (
                <span className="text-muted-foreground">{b.reason}</span>
              ) : (
                <>
                  {b.remaining === 0 ? "rate limit reached" : `${b.remaining} of ${b.limit} requests left`}, resets at{" "}
                  {clock(b.reset)}
                </>
              )}
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center gap-2">
        <form action={refresh}>
          <input type="hidden" name="run" value="glance" />
          <Button type="submit" size="sm" variant="outline">
            Run the glance
          </Button>
        </form>
        <form action={refresh} className="flex items-center gap-2">
          <input type="hidden" name="run" value="close" />
          <Button type="submit" size="sm" variant="outline">
            Run the close
          </Button>
          <Input
            name="month"
            placeholder="YYYY-MM"
            pattern="\d{4}-(0[1-9]|1[0-2])"
            title="The month to close, YYYY-MM. Empty is the month that ended."
            aria-label="Month to close, YYYY-MM"
            className="h-control-sm w-28 font-mono text-meta"
          />
        </form>
      </div>
      <p className="text-ui font-normal text-muted-foreground">
        A run writes its file and commits to main when the file changed, and Vercel redeploys the desk. The desk
        computes the glance and the close live anyway: the file is the day&apos;s record.
        {followed && <> {followed.label}: the run has started on GitHub, and this page follows it.</>}
      </p>
    </SyncPanel>
  );
}

// The pill. A build without a commit (local) has no distance to show.
export function Sync({ start }: { start: Start | null }) {
  if (!BUILD_IS_COMMIT) return <Pill word="Local build" muted />;
  return (
    <Suspense fallback={<Pill word="Checking…" muted />}>
      <Panel start={start} />
    </Suspense>
  );
}
