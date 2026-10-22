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
import { refresh } from "@/lib/refresh";
import { inFlight } from "@/lib/repos";
import { cn } from "@/lib/utils";
import { RunState } from "./_repo";

// The sync pill, Jamie only, at the top of every page: one word for whether the desk shows
// main. Up to date: the build is main's head. Running: a house run is queued or running on
// GitHub (the glance or the close; its commit redeploys the desk). Deploying: main is ahead
// and its newest commit is under ten minutes old, so Vercel is on it. Out of sync: main is
// ahead for longer, a failed or missing deploy, which Jamie fixes from the laptop. Unknown:
// the distance could not be read; the panel says why. The pill opens a panel (a details
// element, no script): the build, the distance, the runs with their Run buttons. While
// anything is in flight the page re-reads itself (app/_shell.tsx).

type Word = "Up to date" | "Running" | "Deploying" | "Out of sync" | "Unknown";

const DOT: Record<Word, string> = {
  "Up to date": "bg-emerald-600",
  Running: "bg-amber-500",
  Deploying: "bg-amber-500",
  "Out of sync": "bg-destructive",
  Unknown: "bg-muted-foreground",
};

const SHOWN = 5;

const pill = "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium";

function Pill({ word, muted = false }: { word: string; muted?: boolean }) {
  return (
    <span className={cn(pill, muted && "text-muted-foreground")}>
      <span aria-hidden className={cn("size-2 rounded-full", DOT[word as Word] ?? "bg-muted-foreground")} />
      {word}
    </span>
  );
}

async function Panel({ start }: { start: Start | null }) {
  const own = (file: string) => (start?.file === file ? start : null);
  const [d, runs] = await Promise.all([
    distance(),
    Promise.all(WORKFLOWS.map(async (file) => ({ file, read: await houseRun(file, own(file)) }))),
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
    <details className="relative">
      <summary className={cn(pill, "cursor-pointer list-none [&::-webkit-details-marker]:hidden")}>
        <span aria-hidden className={cn("size-2 rounded-full", DOT[word])} />
        {word}
      </summary>
      <div className="absolute right-0 z-20 mt-2 grid w-[min(92vw,28rem)] gap-3 rounded-lg border bg-popover p-4 text-sm text-popover-foreground shadow-md">
        <p className="text-xs text-muted-foreground">
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
                <a href={runsUrl(file)} className="text-muted-foreground hover:text-foreground">
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
              className="h-7 w-28 text-xs"
            />
          </form>
        </div>
        <p className="text-xs text-muted-foreground">
          A run writes its file and commits to main when the file changed, and Vercel redeploys the desk. The desk
          computes the glance and the close live anyway: the file is the day&apos;s record.
          {followed && <> {followed.label}: the run has started on GitHub, and this page follows it.</>}
        </p>
      </div>
    </details>
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
