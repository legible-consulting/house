import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { isRunKey, RUNS, runsUrl } from "@/lib/github";
import { refresh } from "@/lib/refresh";

// Jamie's refresh: three buttons that start the house's workflows on GitHub by hand
// (lib/refresh.ts). After a start, the note links the workflow's runs on GitHub and says
// when the desk shows the result: after the next deploy, not now. A failed start shows in
// the page's flash (?error=).
export function Refresh({ started }: { started: string }) {
  const run = isRunKey(started) ? RUNS[started] : null;
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Refresh</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <p className="text-sm text-muted-foreground">
          Starts a house workflow on GitHub now, instead of at its scheduled time. A run that changes a file
          commits to <code>main</code>, and Vercel redeploys the desk from that push a few minutes later. The desk
          shows the result after that deploy.
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
        {run && (
          <p className="text-sm">
            {run.label}: the run has started on GitHub ({run.file} on main).{" "}
            <a href={runsUrl(run.file)} className="underline" target="_blank" rel="noreferrer">
              Follow it on the workflow&apos;s runs page
            </a>
            . The desk shows the result after the next deploy: a run that changes a file commits to main, and Vercel
            redeploys the desk from that push, a few minutes later. A run that changes nothing makes no commit and no
            deploy.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
