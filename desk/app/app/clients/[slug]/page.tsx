import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clientBySlug, day } from "@/lib/house";
import { repoInFlight } from "@/lib/repos";
import { currentUser } from "@/lib/user";
import { workInFlight } from "@/lib/work";
import { RepoFacts } from "../../_repo";
import { Shell } from "../../_shell";
import { Heading, Prose } from "../../_ui";
import { ClientWork, WorkBody } from "../../_work";

// One client, from clients/<slug>/ at build time: where it stands, the documents the client
// reads (proposal, agreement, handover; the price is the proposal's last section). The repo's latest release and check.yml run
// are read per request (lib/repos.ts); the client sees those two facts and nothing else from
// the repo's status. The work (the tickets and the pull requests, lib/work.ts) is the same
// list as /work for Jamie, and three lists in words for the client: in progress with the
// preview link, shipped, queued. For Jamie the page re-reads itself while a check.yml run, a
// pull request's run or a deploy is in flight (app/_shell.tsx). Jamie reads every folder; a
// client reads the one linked to their account (users.client); a salesman follows a deal
// from the pool row instead and never lands here. Research, negotiation, economics and the
// repo's drift are internal and never on this page for a client.
export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export default async function Client({ params }: { params: Promise<{ slug: string }> }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "salesman") redirect("/pool");
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) notFound();
  if (user.role === "client" && user.client !== slug) notFound();
  const c = clientBySlug(slug);
  if (!c) notFound();
  const jamie = user.role === "jamie";
  const facts: [string, string][] = [
    ["Stage", c.stage ?? ""],
    ["Kind", c.kind ?? ""],
    ["Language", c.language ?? ""],
    ["Opened", day(c.opened)],
    ["Next action", c.next_action ?? ""],
    ["Deadline", day(c.deadline)],
    ["Repo", c.repo ?? ""],
    ["Vercel", (c.vercel_project ?? []).join(", ")],
    ...(jamie
      ? ([
          ["Blueprint", c.blueprint ? `${c.blueprint.drift} (tracks ${c.blueprint.tracks})` : c.repo ? "not in the drift report" : ""],
          ["Salesman", c.salesman ?? ""],
        ] as [string, string][])
      : []),
  ].filter(([, v]) => v) as [string, string][];
  const live = jamie && c.repo ? [repoInFlight(c.repo), workInFlight(c.repo)] : [];

  return (
    <Shell user={user} current="/" live={live}>
      {jamie && (
        <p className="mb-2 text-sm">
          <a href="/" className="text-muted-foreground hover:text-foreground">
            ← Desk
          </a>
        </p>
      )}
      <Heading
        title={c.name ?? c.slug}
        lede={jamie ? `clients/${c.slug}/record.md is the record; this page reads it at build time.` : undefined}
      />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Where it stands</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs text-muted-foreground">{k}</dt>
                  <dd className="tabular-nums">
                    {k === "Repo" ? (
                      <a href={`https://github.com/${v}`} className="underline">
                        {v}
                      </a>
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        {c.repo && (
          <Card>
            <CardHeader>
              <CardTitle>Release and checks</CardTitle>
            </CardHeader>
            <CardContent>
              <RepoFacts repo={c.repo} jamie={jamie} />
            </CardContent>
          </Card>
        )}

        {c.repo && (
          <Card>
            <CardHeader>
              <CardTitle>Work</CardTitle>
            </CardHeader>
            <CardContent>{jamie ? <WorkBody repo={c.repo} /> : <ClientWork repo={c.repo} />}</CardContent>
          </Card>
        )}

        {c.documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">No document yet.</p>
        ) : (
          c.documents.map((d) => (
            <Card key={`${d.stage}/${d.file}`} id={d.stage}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {d.title}
                  <Badge variant="outline">{d.stage}</Badge>
                  {d.date && <span className="text-xs font-normal text-muted-foreground">{d.date}</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Prose markdown={d.body} />
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </Shell>
  );
}
