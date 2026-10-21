import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { houseRun, RUNS, runsUrl, since, WORKFLOWS, type Start, type WorkflowFile } from "@/lib/github";
import { refresh } from "@/lib/refresh";
import { RunState } from "./_repo";

// Jamie's refresh: three buttons that start the house's workflows on GitHub by hand
// (lib/refresh.ts), and the latest run of each workflow with its state: queued, running
// since hh:mm, or done with its conclusion and time (lib/github.ts). After a start, the
// note names the run and the page follows it: the card re-reads every 15 seconds while the
// run is in flight, then the footer says main is ahead until Vercel has deployed the commit
// the run made. A failed start shows in the page's flash (?error=).

async function Latest({ file, start }: { file: WorkflowFile; start: Start | null }) {
  const own = start?.file === file ? start : null;
  const r = await houseRun(file, own);
  if (!r.ok) return <span className="text-muted-foreground">{r.reason}</span>;
  if (!r.run) return <span className="text-muted-foreground">no run yet</span>;
  return (
    <>
      <RunState run={r.run} jamie />
      {!since(r.run, own) && <span className="text-muted-foreground"> · the run you started is not listed yet</span>}
    </>
  );
}

export function Refresh({ start }: { start: Start | null }) {
  const run = start ? RUNS[start.key] : null;
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Refresh</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <p className="text-sm text-muted-foreground">
          Starts a house workflow on GitHub now, instead of at its scheduled time. A run that changes a file
          commits to <code>main</code>, and Vercel redeploys the desk from that push in about a minute; the footer
          says when main is ahead of this build. A run that changes nothing makes no commit and no deploy. Times are
          Lisbon.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <form action={refresh}>
            <input type="hidden" name="run" value="glance" />
            <Button type="submit" size="sm" variant="outline">
              {RUNS.glance.label}
            </Button>
          </form>
          <form action={refresh}>
            <input type="hidden" name="run" value="review" />
            <Button type="submit" size="sm" variant="outline">
              {RUNS.review.label}
            </Button>
          </form>
          <form action={refresh} className="flex items-center gap-2">
            <input type="hidden" name="run" value="close" />
            <Button type="submit" size="sm" variant="outline">
              {RUNS.close.label}
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
        <dl className="grid gap-1 text-sm">
          {WORKFLOWS.map((file) => (
            <div key={file} className="flex flex-wrap items-center gap-2">
              <dt>
                <a href={runsUrl(file)} className="text-muted-foreground hover:text-foreground">
                  {file}
                </a>
              </dt>
              <dd>
                <Suspense fallback={<span className="text-muted-foreground">reading GitHub…</span>}>
                  <Latest file={file} start={start} />
                </Suspense>
              </dd>
            </div>
          ))}
        </dl>
        {run && (
          <p className="text-sm">
            {run.label}: the run has started on GitHub ({run.file} on main). Its line above goes queued, running, then
            done, and this page re-reads itself every 15 seconds until the run is done and its commit, when it made
            one, is deployed.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
