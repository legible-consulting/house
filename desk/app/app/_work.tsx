import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Fold } from "@/components/desk/fold";
import { TicketTag } from "@/components/desk/status-tag";
import { NoTicketCard, TicketCard } from "@/components/desk/ticket-card";
import { HOUSE_REPO } from "@/lib/github";
import { clients, type ClientRow } from "@/lib/house";
import { repoWork, startPrompt, summaryOf, type Pr, type RepoWork, type Stub, type StubState, type Summary } from "@/lib/work";
import { CopyButton } from "./_copy";
import { ReadAgo } from "./_repo";

// The work in the client repos and the house (lib/work.ts), for /work and the Work card on a
// client's page (desk/app/DESIGN.md). /work answers what moves and what waits on Jamie in
// three sections: On your desk (the ticket cards whose next act is Jamie's, across every
// repo), Running (the other cards in flight, newest first, a pull request with no ticket at
// the foot) and Projects (one row per repo: the state as counts, the next ticket with its
// prompt to copy, the board as the row's link). Each section streams behind a Suspense
// boundary; the repos share one read each (lib/work.ts). Jamie's Work card on a client's page
// is the same project in one card. A client gets three lists in words: in progress with the
// preview link, shipped, queued. Never the gates, CI, triage or a reason.

// The house's own tickets (.icm/intake/ of this repo) are one more project, last. It is not a
// client: its home is its board, /work/house, and lib/work.ts reads it with DESK_PAT.
type Project = ClientRow & { repo: string };
const house: Project = {
  slug: "house",
  name: "House",
  repo: HOUSE_REPO,
  economics: null,
  documents: [],
  blueprint: null,
};
export const withRepo: Project[] = [...clients.filter((c): c is Project => Boolean(c.repo)), house];

const nameOf = (c: Project) => c.name ?? c.slug;
const boardOf = (c: Project) => `/work/${c.slug}`;
const stubsOf = (w: RepoWork): Stub[] => [...w.epics.flatMap((e) => e.open), ...w.triage];
const readAll = () => Promise.all(withRepo.map(async (c) => ({ c, w: await repoWork(c.repo) })));

const link = (href: string, text: string) => (
  <a href={href} className="underline underline-offset-3">
    {text}
  </a>
);

const reading = (who: string) => <p className="text-ui text-muted-foreground">Reading {who}…</p>;

// --- The counts ---------------------------------------------------------------------------

const COUNTED: StubState[] = ["next", "running", "blocked", "queued"];

// A project's state as counts with their marks, in mono: `● 3 next · ◐ 2 running`. A zero
// count is left out.
export function Counts({ sum }: { sum: Summary }) {
  const shown = COUNTED.filter((state) => sum[state] > 0);
  if (shown.length === 0) return <span className="font-mono text-meta text-muted-foreground">nothing open</span>;
  return (
    <span className="inline-flex flex-wrap items-center gap-x-1.5 font-mono text-meta tabular-nums">
      {shown.map((state, i) => (
        <span key={state} className="inline-flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden="true" className="text-muted-foreground">
              ·
            </span>
          )}
          <TicketTag state={state}>
            {sum[state]} {state}
          </TicketTag>
        </span>
      ))}
    </span>
  );
}

// The header's quiet line on /work: the repos, the cards in flight, those that wait on Jamie,
// and the queued tickets.
export async function WorkCount() {
  const reads = await readAll();
  const all = flights(reads);
  const waiting = all.filter((f) => f.pr.waiting).length;
  const queued = reads.reduce((n, { w }) => n + summaryOf(w).queued, 0);
  return (
    <>
      {withRepo.length} repos · {all.length - waiting} running · {waiting} wait on you · {queued} queued
    </>
  );
}

// --- The cards in flight ------------------------------------------------------------------

// An open pull request with its project and the stub it ships, when it ships one.
type Flight = { c: Project; pr: Pr; stub: Stub | undefined };

const byUpdated = (a: Flight, b: Flight) => b.pr.updatedAt.localeCompare(a.pr.updatedAt);

const flightsOf = (c: Project, w: RepoWork): Flight[] => {
  const stubs = stubsOf(w);
  return w.prs.map((pr) => ({ c, pr, stub: stubs.find((s) => s.path === pr.stub) }));
};

// Every open pull request of every repo read, newest first.
const flights = (reads: { c: Project; w: RepoWork }[]): Flight[] =>
  reads.flatMap(({ c, w }) => flightsOf(c, w)).sort(byUpdated);

// A card in flight: the ticket's card with its strip, or the no-ticket card. `project` names
// the project in the meta line.
function FlightCard({
  f,
  compact = false,
  project = true,
  back,
}: {
  f: Flight;
  compact?: boolean;
  project?: boolean;
  back: string;
}) {
  const name = project ? nameOf(f.c) : undefined;
  return f.stub ? (
    <TicketCard client={f.c.slug} repo={f.c.repo} stub={f.stub} pr={f.pr} project={name} compact={compact} back={back} />
  ) : (
    <NoTicketCard repo={f.c.repo} pr={f.pr} project={name} back={back} />
  );
}

const cardList = (list: Flight[], props: { compact?: boolean; project?: boolean; back: string }) => (
  <ul className="grid gap-2">
    {list.map((f) => (
      <li key={`${f.c.slug}#${f.pr.number}`}>
        <FlightCard f={f} {...props} />
      </li>
    ))}
  </ul>
);

// A section of /work: its count and its list, folded above twelve; or its heading and one
// quiet line when it holds nothing.
function Section({ label, count, empty, children }: { label: string; count: number; empty: string; children?: ReactNode }) {
  if (count === 0) {
    return (
      <section aria-label={label}>
        <h2 className="mb-1 text-heading">{label}</h2>
        <p className="text-ui text-muted-foreground">{empty}</p>
      </section>
    );
  }
  return (
    <section aria-label={label}>
      <Fold label={label} count={count}>
        {children}
      </Fold>
    </section>
  );
}

function Pending({ label }: { label: string }) {
  return (
    <section aria-label={label}>
      <h2 className="mb-1 text-heading">{label}</h2>
      {reading("GitHub")}
    </section>
  );
}

async function DeskCards() {
  const mine = flights(await readAll()).filter((f) => f.pr.waiting);
  return (
    <Section label="On your desk" count={mine.length} empty="Nothing waits on you.">
      {cardList(mine, { compact: true, back: "/work" })}
    </Section>
  );
}

// Every card across the repos whose next act is Jamie's, with the act on the card.
export function OnYourDesk() {
  return (
    <Suspense fallback={<Pending label="On your desk" />}>
      <DeskCards />
    </Suspense>
  );
}

async function RunningCards() {
  const moving = flights(await readAll()).filter((f) => !f.pr.waiting);
  const shown = [...moving.filter((f) => f.stub), ...moving.filter((f) => !f.stub)];
  return (
    <Section label="Running" count={shown.length} empty="No pull request runs.">
      {cardList(shown, { back: "/work" })}
    </Section>
  );
}

// Every other card in flight across the repos, newest first; a pull request with no ticket at
// the foot (DESIGN.md, rule 4).
export function Running() {
  return (
    <Suspense fallback={<Pending label="Running" />}>
      <RunningCards />
    </Suspense>
  );
}

// --- The projects -------------------------------------------------------------------------

type ProjectRow = { c: Project; w: RepoWork; sum: Summary };

const projectColumns: Column<ProjectRow>[] = [
  { key: "project", label: "Project", phone: "title", cell: ({ c }) => nameOf(c) },
  {
    key: "state",
    label: "State",
    phone: "meta",
    cell: ({ w, sum }) =>
      w.error ? (
        <span className="line-clamp-2 whitespace-normal font-mono text-meta text-muted-foreground">{w.error}</span>
      ) : (
        <Counts sum={sum} />
      ),
  },
  {
    key: "next",
    label: "Next ticket",
    className: "md:w-full md:max-w-0",
    cell: ({ sum }) =>
      sum.nextStub ? (
        <span className="block truncate">{sum.nextStub.title}</span>
      ) : (
        <span className="text-muted-foreground">none</span>
      ),
  },
  {
    key: "copy",
    label: "Prompt",
    phone: "action",
    cell: ({ w, sum }) => (sum.nextStub ? <CopyButton text={startPrompt(w, sum.nextStub)} /> : null),
  },
];

async function ProjectRows() {
  const reads = await readAll();
  const rows = reads.map(({ c, w }) => ({ c, w, sum: summaryOf(w) }));
  const oldest = Math.min(...reads.map(({ w }) => w.readAt));
  return (
    <>
      <DataTable
        columns={projectColumns}
        rows={rows}
        rowKey={({ c }) => c.slug}
        href={({ c }) => boardOf(c)}
        empty="No client folder names a repo."
      />
      <p className="mt-1">
        <ReadAgo at={oldest} />
      </p>
    </>
  );
}

// One row per repo, the house last: the project links to its board.
export function Projects() {
  return (
    <section aria-labelledby="projects">
      <h2 id="projects" className="mb-2 text-heading">
        Projects · <span className="font-mono tabular-nums">{withRepo.length}</span>
      </h2>
      <Suspense fallback={reading("GitHub")}>
        <ProjectRows />
      </Suspense>
    </section>
  );
}

// --- Jamie's Work card on a client's page -------------------------------------------------

async function ProjectBody({ c }: { c: Project }) {
  const w = await repoWork(c.repo);
  if (w.error) {
    return (
      <p className="text-ui text-muted-foreground">
        {w.error} · <ReadAgo at={w.readAt} />
      </p>
    );
  }
  const back = `/clients/${c.slug}`;
  const sum = summaryOf(w);
  const mine = flightsOf(c, w).filter((f) => f.pr.waiting).sort(byUpdated);
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <Counts sum={sum} />
        <Link href={boardOf(c)} className="inline-flex min-h-row items-center text-ui underline underline-offset-3">
          Board
        </Link>
      </div>
      {sum.nextStub ? (
        <TicketCard
          client={c.slug}
          repo={c.repo}
          stub={sum.nextStub}
          back={back}
          action={<CopyButton text={startPrompt(w, sum.nextStub)} />}
        />
      ) : (
        <p className="text-ui text-muted-foreground">No ticket is next.</p>
      )}
      {mine.length > 0 && (
        <section aria-labelledby="waits-on-you">
          <h3 id="waits-on-you" className="mb-2 font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">
            Waits on you · {mine.length}
          </h3>
          {cardList(mine, { compact: true, project: false, back })}
        </section>
      )}
    </div>
  );
}

// One project for Jamie on the client's page: the counts, the next ticket with its prompt, the
// cards that wait on Jamie, and the board.
export function ProjectWork({ repo }: { repo: string }) {
  const c = withRepo.find((x) => x.repo === repo);
  if (!c) return <p className="text-ui text-muted-foreground">No client folder names {repo}.</p>;
  return (
    <Suspense fallback={reading("GitHub")}>
      <ProjectBody c={c} />
    </Suspense>
  );
}

// --- The client's view --------------------------------------------------------------------

function List({ title, children, empty }: { title: string; children: ReactNode[]; empty: string }) {
  return (
    <div>
      <dt className="mb-1 font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">{title}</dt>
      <dd>
        {children.length === 0 ? (
          <span className="text-ui text-muted-foreground">{empty}</span>
        ) : (
          <ul className="list-disc space-y-1 pl-5 text-ui">{children}</ul>
        )}
      </dd>
    </div>
  );
}

async function ClientLists({ repo }: { repo: string }) {
  const w = await repoWork(repo);
  if (w.error) return <p className="text-ui text-muted-foreground">The work list is not available now.</p>;
  const inProgress = w.prs.filter((p) => !p.draft);
  const queued = w.epics.filter((e) => e.open.length > 0);
  return (
    <dl className="grid gap-4">
      <List title="In progress" empty="Nothing is in progress.">
        {inProgress.map((p) => (
          <li key={p.number}>
            {p.title}
            {p.preview && <> · {link(p.preview, "Preview")}</>}
          </li>
        ))}
      </List>
      <List title="Shipped in the last 14 days" empty="Nothing shipped in the last 14 days.">
        {w.merged.map((m) => (
          <li key={m.number}>
            <span className="font-mono text-meta tabular-nums text-muted-foreground">{m.mergedAt}</span> {m.title}
          </li>
        ))}
      </List>
      <List title="Queued" empty="Nothing is queued.">
        {queued.map((e) => (
          <li key={e.name}>
            {e.title}
            <ul className="list-[circle] pl-5">
              {e.open.map((s) => (
                <li key={s.path}>{s.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </dl>
  );
}

// Three lists in words for a client: no link but the preview, no gate, no CI, no reason.
export function ClientWork({ repo }: { repo: string }) {
  return (
    <Suspense fallback={<p className="text-ui text-muted-foreground">Reading GitHub…</p>}>
      <ClientLists repo={repo} />
    </Suspense>
  );
}
