import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { DataTable, type Column } from "@/components/desk/data-table";
import { Empty } from "@/components/desk/empty";
import { Prose } from "@/components/desk/prose";
import { TicketTag } from "@/components/desk/status-tag";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { tickGate } from "@/lib/gates";
import { HOUSE_REPO } from "@/lib/github";
import { clients, type ClientRow } from "@/lib/house";
import { inFlight, type Run } from "@/lib/repos";
import {
  repoWork,
  startPrompt,
  stubUrl,
  type Ci,
  type GateName,
  type GateState,
  type Merged,
  type Pr,
  type RepoWork,
  type Stub,
  type StubState,
} from "@/lib/work";
import { CopyButton } from "./_copy";
import { ReadAgo, stateWord } from "./_repo";

// The work in the client repos (lib/work.ts) as tickets. Every open stub in .icm/intake/ is
// one row: a details element whose summary is the state, the title and the meta; opened, the
// stub as prose, the prompt that starts it in a session in a mono block, and the Copy button
// first in the action row. Then the repo's pull requests as one compact list with their
// gates, CI and preview, and what shipped, folded. Each repo streams in behind a Suspense
// boundary, so one slow repo never holds the page. Jamie gets the links, the gates and the
// reason when a read fails. A client gets three lists in words: in progress with the preview
// link, shipped, queued. Never the gates, CI, triage or a reason.

const LABEL: Record<GateName, string> = { "spec-approved": "Spec approved", "ready-to-merge": "Ready to merge" };
// The house's own tickets (.icm/intake/ of this repo) are one more row, last. It is not a
// client: its home is its rows on /work, and lib/work.ts reads it with DESK_PAT.
const house: ClientRow & { repo: string } = {
  slug: "house",
  name: "House",
  repo: HOUSE_REPO,
  economics: null,
  documents: [],
  blueprint: null,
};
export const withRepo = [...clients.filter((c): c is ClientRow & { repo: string } => Boolean(c.repo)), house];
const homeOf = (c: ClientRow) => (c.repo === HOUSE_REPO ? "/work?repo=house" : `/clients/${c.slug}`);

// The ticket filters of /work: a state, or the triage folder.
export type StateFilter = "all" | StubState | "triage";
export const STATE_FILTERS: [StateFilter, string][] = [
  ["all", "All"],
  ["next", "Next"],
  ["running", "Running"],
  ["blocked", "Blocked"],
  ["queued", "Queued"],
  ["triage", "Triage"],
];
export const isStateFilter = (v: unknown): v is StateFilter => STATE_FILTERS.some(([k]) => k === v);
const passes = (s: Stub, filter: StateFilter): boolean =>
  filter === "all" || (filter === "triage" ? s.epic === null : s.state === filter);

// The open tickets of every repo that was read, for the page header's quiet line.
export async function TicketCount() {
  const reads = await Promise.all(withRepo.map((c) => repoWork(c.repo)));
  const read = reads.filter((w) => !w.error);
  const tickets = read.reduce((n, w) => n + w.epics.reduce((m, e) => m + e.open.length, 0) + w.triage.length, 0);
  return (
    <>
      {read.length} of {withRepo.length} repos read · {tickets} {tickets === 1 ? "ticket" : "tickets"}
    </>
  );
}

const link = (href: string, text: string) => (
  <a href={href} className="underline underline-offset-3">
    {text}
  </a>
);

const Muted = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-meta text-muted-foreground">{children}</span>
);

function GateBadge({ name, state }: { name: GateName; state: GateState }) {
  const variant = state === "ticked" ? "secondary" : state === "open" ? "default" : "outline";
  return (
    <Badge variant={variant}>
      {LABEL[name]}: {state === "not-required" ? "not required" : state}
    </Badge>
  );
}

const ciTone: Record<Ci, "secondary" | "destructive" | "outline"> = {
  green: "secondary",
  red: "destructive",
  pending: "outline",
  none: "outline",
};
const CiBadge = ({ ci, run }: { ci: Ci; run: Run | null }) => {
  const text = ci === "none" ? "no CI" : run && inFlight(run) ? stateWord(run) : ci;
  return <Badge variant={ciTone[ci]}>{run?.url ? link(run.url, text) : text}</Badge>;
};

// One line of meta: the epic and the sequence, or the triage lane; then complexity and priority.
const metaOf = (s: Stub): string =>
  [
    s.epic
      ? `${s.epic}${s.sequence !== null ? ` · ${s.sequence}${s.sequenceOf ? ` of ${s.sequenceOf}` : ""}` : ""}`
      : `triage${s.lane ? ` · ${s.lane}` : ""}`,
    s.complexity,
    s.priority,
  ]
    .filter(Boolean)
    .join(" · ");

// The pull request's next act, when it is Jamie's: the gate to tick, or the merge on GitHub.
function NextAct({ repo, p }: { repo: string; p: Pr }) {
  if (p.waiting === "merge") {
    return (
      <a href={p.url} className={buttonVariants({ size: "sm", variant: "outline" })}>
        Merge on GitHub
      </a>
    );
  }
  if (!p.waiting) return null;
  return (
    <form action={tickGate.bind(null, repo, p.number, p.waiting)}>
      <Button type="submit" size="sm">
        Tick {LABEL[p.waiting]}
      </Button>
    </form>
  );
}

const reading = (who: string) => <p className="text-ui text-muted-foreground">Reading {who}…</p>;

// --- Waiting on you -----------------------------------------------------------------------

type WaitingRow = { c: ClientRow & { repo: string }; p: Pr };

const waitingColumns: Column<WaitingRow>[] = [
  {
    key: "client",
    label: "Client",
    phone: "title",
    cell: ({ c }) => (
      <Link href={homeOf(c)} className="hover:underline">
        {c.name ?? c.slug}
      </Link>
    ),
  },
  { key: "ci", label: "CI", phone: "meta", cell: ({ p }) => <CiBadge ci={p.ci} run={p.run} /> },
  {
    key: "pr",
    label: "Pull request",
    className: "whitespace-normal",
    cell: ({ p }) => (
      <>
        {link(p.url, `#${p.number} ${p.title}`)}
        {p.draft && <Muted> · draft</Muted>}
      </>
    ),
  },
  {
    key: "preview",
    label: "Preview",
    cell: ({ p }) => (p.preview ? link(p.preview, "Preview") : <Muted>no preview</Muted>),
  },
  { key: "act", label: "Next act", phone: "action", cell: ({ c, p }) => <NextAct repo={c.repo} p={p} /> },
];

async function WaitingRows() {
  const reads = await Promise.all(withRepo.map(async (c) => ({ c, w: await repoWork(c.repo) })));
  const rows = reads.flatMap(({ c, w }) => w.waitingOnJamie.map((p) => ({ c, p })));
  const oldest = Math.min(...reads.map(({ w }) => w.readAt));
  return (
    <>
      <DataTable
        columns={waitingColumns}
        rows={rows}
        rowKey={({ c, p }) => `${c.slug}#${p.number}`}
        empty="Nothing waits on you. A pull request with a gate open or ready to merge shows here."
      />
      {reads.length > 0 && (
        <p className="mt-1">
          <ReadAgo at={oldest} />
        </p>
      )}
    </>
  );
}

// Every pull request across the repos whose next act is Jamie's, with the gate to tick.
export function WaitingOnYou() {
  return (
    <Suspense fallback={reading("GitHub")}>
      <WaitingRows />
    </Suspense>
  );
}

// --- Next up ------------------------------------------------------------------------------

// The next stub per repo: an epic's next, else the first queued triage stub.
const nextOf = (w: RepoWork): Stub | undefined =>
  w.epics.flatMap((e) => e.open).find((s) => s.state === "next") ?? w.triage.find((s) => s.state === "queued");

type Next = { c: ClientRow & { repo: string }; w: RepoWork; s: Stub };

const nextColumns: Column<Next>[] = [
  {
    key: "client",
    label: "Client",
    phone: "title",
    cell: ({ c }) => (
      <Link href={`/work?repo=${c.slug}`} className="hover:underline">
        {c.name ?? c.slug}
      </Link>
    ),
  },
  { key: "title", label: "Next ticket", className: "whitespace-normal", cell: ({ s }) => s.title },
  {
    key: "meta",
    label: "Ticket",
    phone: "meta",
    className: "font-mono text-meta text-muted-foreground",
    cell: ({ s }) => metaOf(s),
  },
  { key: "copy", label: "Prompt", phone: "action", cell: ({ w, s }) => <CopyButton text={startPrompt(w, s)} /> },
];

async function NextRows() {
  const reads = await Promise.all(withRepo.map(async (c) => ({ c, w: await repoWork(c.repo) })));
  const rows = reads.flatMap(({ c, w }) => {
    const s = nextOf(w);
    return s ? [{ c, w, s }] : [];
  });
  return (
    <DataTable
      columns={nextColumns}
      rows={rows}
      rowKey={({ c }) => c.slug}
      empty="No ticket is queued in any repo. A session that cuts an epic writes the next one."
    />
  );
}

// One row per repo: the ticket to start next, with its prompt to copy.
export function NextUp() {
  return (
    <Suspense fallback={reading("GitHub")}>
      <NextRows />
    </Suspense>
  );
}

// --- The tickets of one repo --------------------------------------------------------------

function TicketRow({ w, s }: { w: RepoWork; s: Stub }) {
  const prompt = startPrompt(w, s);
  const pr = s.pr === null ? undefined : w.prs.find((p) => p.number === s.pr);
  return (
    <li>
      <details className="group">
        <summary className="flex min-h-row cursor-pointer list-none items-center gap-x-3 px-3 py-1.5 transition-colors duration-100 hover:bg-accent max-md:flex-wrap [&::-webkit-details-marker]:hidden">
          <ChevronRight className="size-4 shrink-0 text-muted-foreground group-open:rotate-90" aria-hidden="true" />
          <TicketTag state={s.state} className="shrink-0">
            {s.state === "running" && s.pr ? `running in #${s.pr}` : undefined}
          </TicketTag>
          <span className="min-w-0 flex-1 text-ui md:truncate">{s.title}</span>
          <span className="truncate font-mono text-meta text-muted-foreground max-md:basis-full max-md:pl-7">
            {metaOf(s)}
          </span>
        </summary>
        <div className="grid gap-3 border-t px-3 py-3">
          {s.blocked && <p className="text-ui text-destructive">Blocked: {s.blocked}</p>}
          {s.body ? (
            <Prose markdown={s.body} />
          ) : (
            <p className="text-ui text-muted-foreground">
              The stub&apos;s text was not read: more than 80 stubs are open in this repo, or the file is empty.
            </p>
          )}
          <div>
            <p className="mb-1 font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">
              Prompt{s.prompt ? " · the stub's own" : ""}
            </p>
            <pre className="whitespace-pre-wrap rounded-control bg-muted p-3 font-mono text-meta [overflow-wrap:anywhere]">
              {prompt}
            </pre>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <CopyButton text={prompt} />
            <a href={stubUrl(w, s)} className="text-ui underline underline-offset-3">
              Open the stub on GitHub
            </a>
            {pr && (
              <span className="inline-flex flex-wrap items-center gap-2 text-ui">
                {link(pr.url, `#${pr.number} ${pr.title}`)}
                <CiBadge ci={pr.ci} run={pr.run} />
                {pr.preview && link(pr.preview, "Preview")}
              </span>
            )}
          </div>
        </div>
      </details>
    </li>
  );
}

function PrList({ repo, prs }: { repo: string; prs: Pr[] }) {
  if (prs.length === 0) return null;
  return (
    <div>
      <h4 className="mb-1 font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">Pull requests</h4>
      <ul className="divide-y rounded-pane border">
        {prs.map((p) => (
          <li key={p.number} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-ui">
            <span className="min-w-0 basis-full md:flex-1 md:basis-auto">
              {link(p.url, `#${p.number} ${p.title}`)}{" "}
              <Muted>
                {p.draft ? "draft" : "ready"} · {p.headBranch} · {p.updatedAt}
                {!p.stub && !p.ticketPath && " · no ticket"}
              </Muted>
            </span>
            <GateBadge name="spec-approved" state={p.gates.specApproved} />
            <GateBadge name="ready-to-merge" state={p.gates.readyToMerge} />
            <CiBadge ci={p.ci} run={p.run} />
            {p.preview && link(p.preview, "Preview")}
            <NextAct repo={repo} p={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Shipped({ merged }: { merged: Merged[] }) {
  return (
    <details className="group">
      <summary className="flex min-h-row cursor-pointer list-none items-center gap-2 text-ui text-foreground-2 [&::-webkit-details-marker]:hidden">
        <ChevronRight className="size-4 shrink-0 text-muted-foreground group-open:rotate-90" aria-hidden="true" />
        Shipped in the last 14 days <Muted>{merged.length}</Muted>
      </summary>
      {merged.length === 0 ? (
        <p className="pl-6 text-ui text-muted-foreground">Nothing merged in the last 14 days.</p>
      ) : (
        <ul className="grid gap-1 pl-6 text-ui">
          {merged.map((m) => (
            <li key={m.number}>
              <Muted>{m.mergedAt}</Muted> {link(m.url, `#${m.number} ${m.title}`)}
            </li>
          ))}
        </ul>
      )}
    </details>
  );
}

async function RepoRows({
  client: c,
  filter,
  heading,
}: {
  client: ClientRow & { repo: string };
  filter: StateFilter;
  heading: boolean;
}) {
  const w = await repoWork(c.repo);
  const name = c.name ?? c.slug;
  if (w.error) {
    const words = (
      <p className="text-ui text-muted-foreground">
        {w.error} · <ReadAgo at={w.readAt} />
      </p>
    );
    return heading ? (
      <section>
        <h3 className="mb-2 text-heading">{name}</h3>
        {words}
      </section>
    ) : (
      words
    );
  }
  const all = [...w.epics.flatMap((e) => e.open), ...w.triage];
  const shown = all.filter((s) => passes(s, filter));
  if (heading && filter !== "all" && shown.length === 0) return null;
  const finished = w.epics.filter((e) => e.open.length === 0);
  return (
    <section className="grid gap-3">
      {heading && (
        <div>
          <h3 className="text-heading">
            <Link href={homeOf(c)} className="hover:underline">
              {name}
            </Link>
          </h3>
          <p className="font-mono text-meta text-muted-foreground">
            {c.repo} · {all.length} open · {w.prs.length} pull {w.prs.length === 1 ? "request" : "requests"} ·{" "}
            <ReadAgo at={w.readAt} />
          </p>
        </div>
      )}
      {shown.length === 0 ? (
        <Empty className="py-4">No open ticket in .icm/intake/. A session that cuts an epic writes the stubs.</Empty>
      ) : (
        <ul className="divide-y rounded-pane border">
          {shown.map((s) => (
            <TicketRow key={s.path} w={w} s={s} />
          ))}
        </ul>
      )}
      {finished.length > 0 && (
        <p className="text-ui text-muted-foreground">
          Every stub is done in {finished.map((e) => e.title).join(", ")}: the epic waits for its move to _done/.
        </p>
      )}
      <PrList repo={c.repo} prs={w.prs} />
      <Shipped merged={w.merged} />
    </section>
  );
}

// One repo's tickets, pull requests and shipped list on /work, streamed; null under a filter
// that matches none of its tickets.
export function RepoTickets({ client, filter }: { client: ClientRow & { repo: string }; filter: StateFilter }) {
  return (
    <Suspense fallback={reading(client.name ?? client.slug)}>
      <RepoRows client={client} filter={filter} heading />
    </Suspense>
  );
}

// One repo's work for Jamie on the client's page: the same rows, no heading, no filter.
export function WorkBody({ repo }: { repo: string }) {
  const c = withRepo.find((x) => x.repo === repo);
  if (!c) return <p className="text-ui text-muted-foreground">No client folder names {repo}.</p>;
  return (
    <Suspense fallback={reading("GitHub")}>
      <RepoRows client={c} filter="all" heading={false} />
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
