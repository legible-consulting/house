import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { ReactNode } from "react";
import { Flash } from "@/components/desk/flash";
import { Fold } from "@/components/desk/fold";
import { PageHeader } from "@/components/desk/page-header";
import { Prose } from "@/components/desk/prose";
import { CiWord, metaOf, NextAct, TicketCard } from "@/components/desk/ticket-card";
import { StepTrack } from "@/components/desk/track";
import { Button } from "@/components/ui/button";
import { tickGate } from "@/lib/gates";
import { flash, type Search } from "@/lib/guard";
import { currentUser } from "@/lib/user";
import {
  repoWork,
  startPrompt,
  stubUrl,
  ticketHref,
  workInFlight,
  type GateName,
  type GateState,
  type Pr,
  type RepoWork,
  type Stub,
} from "@/lib/work";
import { CopyButton } from "@/app/_copy";
import { ReadAgo } from "@/app/_repo";
import { withRepo } from "@/app/_work";

// One ticket at its intake path (desk/app/DESIGN.md, rules 1 and 12):
// /work/<client>/<epic>/<slug> and /work/<client>/triage/<slug>, Jamie only. `<client>` is a
// client folder's slug with a repo, or `house`. The stub is `.icm/intake/` plus the path plus
// `.md`, matched against the open stubs of lib/work.ts; anything else is not found. The page
// answers what the ticket is and what its next step is: the state first (the blocked reason,
// the large track with Jamie's act, "Next in <epic>" with the prompt to copy, or what it waits
// on), then the pull request as one card, then the prompt, then the stub as prose, then its
// place in the epic or in triage. A tick returns here (lib/gates.ts). A failed read shows its
// words under the header.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ client: string; path: string[] }>;
  searchParams: Search;
};

const SEGMENT_RE = /^[a-z0-9-]+$/;
const LABEL: Record<GateName, string> = { "spec-approved": "Spec approved", "ready-to-merge": "Ready to merge" };
const WORD: Record<GateState, string> = { ticked: "ticked", open: "open", "not-required": "not required" };
const LINK = "inline-flex min-h-row items-center text-ui underline underline-offset-3";

// A section of the page with its heading, so a reader lists it.
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-3">
      <h2 id={id} className="text-heading">
        {title}
      </h2>
      {children}
    </section>
  );
}

// The open stubs a stub depends on: each depends-on slug that an open stub of the repo carries.
const openDependencies = (w: RepoWork, s: Stub): Stub[] => {
  const stubs = [...w.epics.flatMap((e) => e.open), ...w.triage];
  return s.dependsOn.flatMap((d) => stubs.find((x) => x.slug === d || x.featureSlug === d) ?? []);
};

// The state, first under the header: the one thing that says where the ticket stands.
function State({ client, w, s, pr, here }: { client: string; w: RepoWork; s: Stub; pr: Pr | null; here: string }) {
  const row = "flex flex-wrap items-center gap-x-4 gap-y-2";
  if (pr) {
    return (
      <div className={row}>
        <StepTrack pr={pr} size="lg" />
        <NextAct repo={w.repo} p={pr} back={here} />
      </div>
    );
  }
  if (s.state === "blocked") {
    return <p className="text-body font-semibold text-destructive">Blocked: {s.blocked}</p>;
  }
  if (s.state === "next") {
    return (
      <div className={row}>
        <p className="text-body font-semibold">Next in {s.epic}</p>
        <CopyButton text={startPrompt(w, s)} variant="default" size="default" />
      </div>
    );
  }
  const deps = openDependencies(w, s);
  if (deps.length > 0) {
    return (
      <p className="text-body">
        Waits on{" "}
        {deps.map((d, i) => (
          <span key={d.path}>
            {i > 0 && ", "}
            <Link href={ticketHref(client, d)} className={`${LINK} font-mono`}>
              {d.slug}
            </Link>
          </span>
        ))}
      </p>
    );
  }
  const next = s.epic ? w.epics.find((e) => e.name === s.epic)?.open.find((x) => x.state === "next") : undefined;
  return (
    <p className="text-body">
      Queued in {s.epic ?? "triage"}
      {next && (
        <>
          . Next:{" "}
          <Link href={ticketHref(client, next)} className={LINK}>
            {next.title}
          </Link>
        </>
      )}
    </p>
  );
}

// The pull request as one card: the number and the title, the branch, draft or ready, the two
// gates with the tick when a gate is open and CI is green, the CI word, the preview, the date.
// Ready to merge waits for a ready pull request (DESIGN.md, the five steps).
function PrCard({ repo, pr, here }: { repo: string; pr: Pr; here: string }) {
  const gates: [GateName, GateState][] = [
    ["spec-approved", pr.gates.specApproved],
    ["ready-to-merge", pr.gates.readyToMerge],
  ];
  const tickable = (name: GateName, state: GateState) =>
    state === "open" && pr.ci === "green" && (name === "spec-approved" || !pr.draft);
  return (
    <div className="grid gap-2 rounded-pane border bg-card px-3 py-2">
      <div>
        <a href={pr.url} className="inline-flex min-h-row min-w-0 max-w-full items-baseline gap-1.5 text-ui hover:underline">
          <span className="shrink-0 font-mono text-meta tabular-nums">#{pr.number}</span>
          <span className="min-w-0">{pr.title}</span>
        </a>
        <p className="font-mono text-meta text-muted-foreground [overflow-wrap:anywhere]">
          {pr.headBranch} · {pr.draft ? "draft" : "ready"} · updated {pr.updatedAt}
        </p>
      </div>
      <dl className="grid gap-1 border-t pt-2">
        {gates.map(([name, state]) => (
          <div key={name} className="flex min-h-row flex-wrap items-center gap-x-3 gap-y-1">
            <dt className="text-ui">{LABEL[name]}</dt>
            <dd className={state === "open" ? "font-mono text-meta font-semibold" : "font-mono text-meta text-muted-foreground"}>
              {WORD[state]}
            </dd>
            {tickable(name, state) && (
              <dd>
                <form action={tickGate.bind(null, repo, pr.number, name, here)}>
                  <Button type="submit" size="sm">
                    Tick {LABEL[name]}
                  </Button>
                </form>
              </dd>
            )}
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-1">
        <CiWord pr={pr} />
        {pr.preview && (
          <a href={pr.preview} className={LINK}>
            Preview
          </a>
        )}
      </div>
    </div>
  );
}

// The ticket's place: the epic's open stubs in sequence with this one marked, the done count and
// the breakdown; or the other open stubs of triage.
function Place({ client, w, s, here }: { client: string; w: RepoWork; s: Stub; here: string }) {
  const prOf = (x: Stub) => (x.pr === null ? null : (w.prs.find((p) => p.number === x.pr) ?? null));
  const cards = (list: Stub[]) => (
    <ul className="grid gap-2">
      {list.map((x) => (
        <li key={x.path}>
          <TicketCard
            client={client}
            repo={w.repo}
            stub={x}
            pr={prOf(x)}
            compact
            current={x.path === s.path}
            back={here}
          />
        </li>
      ))}
    </ul>
  );
  if (s.epic === null) {
    const others = w.triage.filter((x) => x.path !== s.path);
    return (
      <section aria-label="In triage">
        {others.length === 0 ? (
          <p className="text-ui text-muted-foreground">No other ticket is open in triage.</p>
        ) : (
          <Fold label="In triage" count={others.length}>
            {cards(others)}
          </Fold>
        )}
      </section>
    );
  }
  const epic = w.epics.find((e) => e.name === s.epic);
  if (!epic) return null;
  const breakdown = `https://github.com/${w.repo}/blob/${w.branch || "main"}/.icm/intake/${epic.name}/breakdown.md`;
  return (
    <section aria-label="In this epic">
      <Fold label="In this epic" count={epic.open.length}>
        <p className="mb-2 flex flex-wrap items-center gap-x-3 font-mono text-meta text-muted-foreground">
          <span>
            {epic.done} of {epic.total} done
          </span>
          <a href={breakdown} className={`${LINK} font-sans`}>
            The breakdown on GitHub
          </a>
        </p>
        {cards(epic.open)}
      </Fold>
    </section>
  );
}

export default async function TicketPage({ params, searchParams }: Props) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const { client, path } = await params;
  const c = withRepo.find((x) => x.slug === client);
  if (!c || path.length === 0 || !path.every((p) => SEGMENT_RE.test(p))) notFound();
  const [w, { error, note }] = await Promise.all([repoWork(c.repo), flash(searchParams)]);
  const name = c.name ?? c.slug;
  const board = { href: `/work/${c.slug}`, label: name };

  if (w.error) {
    return (
      <>
        <PageHeader user={user} title={path.at(-1)} back={board} meta={`${name} · ${path.join("/")}`} />
        <p className="text-ui text-muted-foreground">
          {w.error} · <ReadAgo at={w.readAt} />
        </p>
      </>
    );
  }

  const file = `.icm/intake/${path.join("/")}.md`;
  const s = [...w.epics.flatMap((e) => e.open), ...w.triage].find((x) => x.path === file);
  if (!s) notFound();
  const pr = s.pr === null ? null : (w.prs.find((p) => p.number === s.pr) ?? null);
  const here = ticketHref(c.slug, s);
  const prompt = startPrompt(w, s);

  return (
    <>
      <PageHeader user={user} title={s.title} back={board} meta={metaOf(s)} live={[workInFlight(c.repo)]} />
      <Flash error={error} note={note} />
      <div className="grid max-w-reading gap-10">
        <section aria-labelledby="state" className="grid gap-2">
          <h2 id="state" className="sr-only">
            State
          </h2>
          <State client={c.slug} w={w} s={s} pr={pr} here={here} />
        </section>

        {pr && (
          <Section id="pull-request" title="Pull request">
            <PrCard repo={c.repo} pr={pr} here={here} />
          </Section>
        )}

        <Section id="prompt" title="Prompt">
          <p className="-mt-2 font-mono text-meta text-muted-foreground">
            {s.prompt ? "the stub's own" : "the desk's words: the stub has no Prompt section"}
          </p>
          <pre className="whitespace-pre-wrap rounded-control bg-muted p-3 font-mono text-meta [overflow-wrap:anywhere]">
            {prompt}
          </pre>
          <div>
            <CopyButton text={prompt} />
          </div>
        </Section>

        <section aria-label="The stub">
          {s.body ? (
            <Prose markdown={s.body} />
          ) : (
            <p className="text-ui text-muted-foreground">
              The stub&apos;s text was not read: more than 80 stubs are open in this repo, or the file is empty.
            </p>
          )}
        </section>

        <Place client={c.slug} w={w} s={s} here={here} />

        <p>
          <a href={stubUrl(w, s)} className={LINK}>
            Open the stub on GitHub
          </a>
        </p>
      </div>
    </>
  );
}
