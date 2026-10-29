import { notFound, redirect } from "next/navigation";
import { Document } from "@/components/desk/document";
import { Empty } from "@/components/desk/empty";
import { type Fact, Facts } from "@/components/desk/facts";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { StageTrack } from "@/components/desk/stage-track";
import { Due } from "@/components/desk/status-tag";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { flash, type Search } from "@/lib/guard";
import { clientBySlug, day, unbacked } from "@/lib/house";
import { today } from "@/lib/pool";
import { repoInFlight } from "@/lib/repos";
import { currentUser } from "@/lib/user";
import { workInFlight } from "@/lib/work";
import { RepoFacts } from "@/app/_repo";
import { readLinks, SendForm } from "@/app/_send";
import { ClientUsers, readUsers } from "@/app/_users";
import { ClientWork, ProjectWork } from "@/app/_work";

// One client, from clients/<slug>/ at build time: where it stands, the documents the client
// reads (proposal, agreement, handover; the price is the proposal's last section). The repo's latest release and check.yml run
// are read per request (lib/repos.ts); the client sees those two facts and nothing else from
// the repo's status. The work (the tickets and the pull requests, lib/work.ts) is the project
// for Jamie: its counts, the next ticket with its prompt, the cards that wait on him and the
// link to its board; and three lists in words for the client: in progress with the preview
// link, shipped, queued. For Jamie the page re-reads itself while a check.yml run, a
// pull request's run or a deploy is in flight (components/desk/page-header.tsx). Jamie reads every folder; a
// client reads the one linked to their account (users.client); a salesman follows a deal
// from the pool row instead and never lands here. Research, negotiation, economics and the
// repo's drift are internal and never on this page for a client. Jamie also sends a form from
// here (app/_send.tsx): the answer saves the person as a user of this folder, and the Users card
// (app/_users.tsx) lists the folder's users with their state, where Jamie activates one and
// Neon Auth mails them a sign-in link. The cards, for Jamie: where it stands, the work, the
// release and checks, the documents, Send a form, the users. For a client: where it stands,
// the release and checks, the work, the documents. No paragraph explains the page
// (desk/app/DESIGN.md, rule 9).
export const dynamic = "force-dynamic";

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export default async function Client({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Search;
}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "salesman") redirect("/pool");
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) notFound();
  if (user.role === "client" && user.client !== slug) notFound();
  const c = clientBySlug(slug);
  if (!c) notFound();
  const jamie = user.role === "jamie";
  // Where it stands: a date, a repo or a slug in mono; the next action is a sentence and
  // spans the row; a drifted repo's blueprint takes the destructive text.
  const drifted = Boolean(c.blueprint && c.blueprint.drift !== "current");
  const facts: Fact[] = (
    [
      { label: "Stage", value: c.stage, mono: true },
      { label: "Kind", value: c.kind },
      { label: "Language", value: c.language, mono: true },
      { label: "Opened", value: day(c.opened), mono: true },
      { label: "Deadline", value: day(c.deadline) && <Due date={day(c.deadline)} today={today()} /> },
      {
        label: "Repo",
        value: c.repo && (
          <a href={`https://github.com/${c.repo}`} className="inline-flex min-h-row items-center underline underline-offset-3">
            {c.repo}
          </a>
        ),
        mono: true,
      },
      { label: "Vercel", value: (c.vercel_project ?? []).join(", "), mono: true },
      ...(jamie
        ? [
            {
              label: "Blueprint",
              value: c.blueprint
                ? `${c.blueprint.drift} (tracks ${c.blueprint.tracks})`
                : c.repo
                  ? "not in the drift report"
                  : "",
              className: drifted ? "text-destructive" : undefined,
            },
            { label: "Platform", value: c.blueprint?.platform, className: unbacked(c.blueprint) ? "text-destructive" : undefined },
            { label: "Salesman", value: c.salesman },
          ]
        : []),
      { label: "Next action", value: c.next_action, wide: true },
    ] as Fact[]
  ).filter((f) => f.value);
  const live = jamie && c.repo ? [repoInFlight(c.repo), workInFlight(c.repo)] : [];
  const [{ error, note }, sent, users] = await Promise.all([
    flash(searchParams),
    jamie ? readLinks(c.slug) : null,
    jamie ? readUsers(c.slug) : null,
  ]);

  const release = c.repo && (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Release and checks</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RepoFacts repo={c.repo} jamie={jamie} />
      </CardContent>
    </Card>
  );
  const work = c.repo && (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Work</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>{jamie ? <ProjectWork repo={c.repo} /> : <ClientWork repo={c.repo} />}</CardContent>
    </Card>
  );
  const documents =
    c.documents.length === 0 ? (
      <Empty>No document yet. The proposal, the agreement and the handover land here as each stage writes them.</Empty>
    ) : (
      c.documents.map((d) => (
        <Document
          key={`${d.stage}/${d.file}`}
          id={d.stage}
          className="border-t pt-6"
          date={d.date}
          tag={<Badge variant="outline">{d.stage}</Badge>}
          title={d.title}
          markdown={d.body}
        />
      ))
    );

  return (
    <>
      <PageHeader
        user={user}
        title={c.name ?? c.slug}
        back={jamie ? { href: "/", label: "Desk" } : undefined}
        meta={<StageTrack stage={c.stage} track />}
        live={live}
      />
      <Flash error={error} note={note} />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              <h2>Where it stands</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Facts facts={facts} />
          </CardContent>
        </Card>

        {jamie ? (
          <>
            {work}
            {release}
            {documents}
            {sent && (
              // record.md carries no contact fields, so the name and the email start empty.
              <SendForm target={{ client: c.slug }} read={sent} language={c.language} name="" email="" />
            )}
            {users && <ClientUsers slug={c.slug} read={users} />}
          </>
        ) : (
          <>
            {release}
            {work}
            {documents}
          </>
        )}
      </div>
    </>
  );
}
