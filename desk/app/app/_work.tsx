import { Suspense, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tickGate } from "@/lib/gates";
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
import { Prose } from "./_ui";

// The work in the client repos (lib/work.ts) as tickets. Every open stub in .icm/intake/ is
// one row: its state, its title and its meta on one line; opened, the stub's text and the
// prompt that starts it in a session, with a Copy button. Then the repo's pull requests with
// their gates, CI and preview, and what shipped, folded. Each repo streams in behind a
// Suspense boundary, so one slow repo never holds the page. Jamie gets the links, the gates
// and the reason when a read fails. A client gets three lists in words: in progress with the
// preview link, shipped, queued. Never the gates, CI, triage or a reason.

const LABEL: Record<GateName, string> = { "spec-approved": "Spec approved", "ready-to-merge": "Ready to merge" };
export const withRepo = clients.filter((c): c is ClientRow & { repo: string } => Boolean(c.repo));

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

const link = (href: string, text: string) => (
  <a href={href} className="underline">
    {text}
  </a>
);

const Muted = ({ children }: { children: ReactNode }) => (
  <span className="text-xs text-muted-foreground">{children}</span>
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

const stateTone: Record<StubState, "default" | "secondary" | "destructive" | "outline"> = {
  next: "default",
  running: "secondary",
  blocked: "destructive",
  queued: "outline",
};
const StateBadge = ({ s }: { s: Stub }) => (
  <Badge variant={stateTone[s.state]}>{s.state === "running" && s.pr ? `running in #${s.pr}` : s.state}</Badge>
);

// One line of meta: the epic and the sequence, or the triage lane; then priority and complexity.
const metaOf = (s: Stub): string =>
  [
    s.epic
      ? `${s.epic}${s.sequence !== null ? ` · ${s.sequence}${s.sequenceOf ? ` of ${s.sequenceOf}` : ""}` : ""}`
      : `triage${s.lane ? ` · ${s.lane}` : ""}`,
    s.priority,
    s.complexity,
  ]
    .filter(Boolean)
    .join(" · ");

// --- Waiting on you -----------------------------------------------------------------------

async function WaitingRows() {
  const reads = await Promise.all(withRepo.map(async (c) => ({ c, w: await repoWork(c.repo) })));
  const rows = reads.flatMap(({ c, w }) => w.waitingOnJamie.map((p) => ({ c, p })));
  const oldest = Math.min(...reads.map(({ w }) => w.readAt));
  const ago = reads.length > 0 && (
    <p className="mt-1">
      <ReadAgo at={oldest} />
    </p>
  );
  if (rows.length === 0) {
    return (
      <>
        <p className="text-sm text-muted-foreground">Nothing waits on you.</p>
        {ago}
      </>
    );
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Pull request</TableHead>
            <TableHead>Next act</TableHead>
            <TableHead>CI</TableHead>
            <TableHead>Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ c, p }) => (
            <TableRow key={`${c.slug}#${p.number}`}>
              <TableCell className="font-medium">
                <a href={`/clients/${c.slug}`} className="hover:underline">
                  {c.name ?? c.slug}
                </a>
              </TableCell>
              <TableCell className="whitespace-normal">
                {link(p.url, `#${p.number} ${p.title}`)}
                {p.draft && <Muted> · draft</Muted>}
              </TableCell>
              <TableCell>
                {p.waiting === "merge" ? (
                  link(p.url, "Merge on GitHub")
                ) : p.waiting ? (
                  <form action={tickGate.bind(null, c.repo, p.number, p.waiting)}>
                    <Button type="submit" size="sm">
                      Tick {LABEL[p.waiting]}
                    </Button>
                  </form>
                ) : null}
              </TableCell>
              <TableCell>
                <CiBadge ci={p.ci} run={p.run} />
              </TableCell>
              <TableCell>{p.preview ? link(p.preview, "Preview") : <Muted>no preview</Muted>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {ago}
    </>
  );
}

// Every pull request across the repos whose next act is Jamie's, with the gate to tick.
export function WaitingOnYou() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Reading GitHub…</p>}>
      <WaitingRows />
    </Suspense>
  );
}

// --- Next up ------------------------------------------------------------------------------

// The next stub per repo: an epic's next, else the first queued triage stub.
const nextOf = (w: RepoWork): Stub | undefined =>
  w.epics.flatMap((e) => e.open).find((s) => s.state === "next") ?? w.triage.find((s) => s.state === "queued");

async function NextRows() {
  const reads = await Promise.all(withRepo.map(async (c) => ({ c, w: await repoWork(c.repo) })));
  const rows = reads.flatMap(({ c, w }) => {
    const s = nextOf(w);
    return s ? [{ c, w, s }] : [];
  });
  if (rows.length === 0) return <p className="text-sm text-muted-foreground">No ticket is queued in any repo.</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Next ticket</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ c, w, s }) => (
          <TableRow key={c.slug}>
            <TableCell className="font-medium">
              <a href={`/work?repo=${c.slug}`} className="hover:underline">
                {c.name ?? c.slug}
              </a>
            </TableCell>
            <TableCell className="whitespace-normal">
              {s.title} <Muted>{metaOf(s)}</Muted>
            </TableCell>
            <TableCell>
              <CopyButton text={startPrompt(w, s)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// One row per repo: the ticket to start next, with its prompt to copy.
export function NextUp() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Reading GitHub…</p>}>
      <NextRows />
    </Suspense>
  );
}

// --- The tickets of one repo --------------------------------------------------------------

function TicketRow({ w, s }: { w: RepoWork; s: Stub }) {
  const prompt = startPrompt(w, s);
  const pr = s.pr === null ? undefined : w.prs.find((p) => p.number === s.pr);
  return (
    <details className="rounded-lg border">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-sm [&::-webkit-details-marker]:hidden">
        <StateBadge s={s} />
        <span className="font-medium">{s.title}</span>
        <Muted>{metaOf(s)}</Muted>
        {s.blocked && <Muted>blocked: {s.blocked}</Muted>}
        {pr && (
          <span className="inline-flex items-center gap-2 sm:ml-auto">
            <CiBadge ci={pr.ci} run={pr.run} />
            {pr.preview && link(pr.preview, "Preview")}
          </span>
        )}
      </summary>
      <div className="grid gap-3 border-t px-3 py-3">
        {s.body ? (
          <Prose markdown={s.body} />
        ) : (
          <p className="text-sm text-muted-foreground">
            The stub&apos;s text was not read: more than 80 stubs are open in this repo, or the file is empty.
          </p>
        )}
        <div>
          <p className="mb-1 text-xs text-muted-foreground">
            The prompt that starts it in a session{s.prompt ? ", from the stub's own Prompt section" : ""}:
          </p>
          <pre className="whitespace-pre-wrap rounded bg-muted p-3 font-mono text-xs">{prompt}</pre>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <CopyButton text={prompt} />
          <a href={stubUrl(w, s)} className="text-sm underline">
            Open the stub on GitHub
          </a>
          {pr && <span className="text-sm">{link(pr.url, `#${pr.number} ${pr.title}`)}</span>}
        </div>
      </div>
    </details>
  );
}

function PrList({ repo, prs }: { repo: string; prs: Pr[] }) {
  if (prs.length === 0) return null;
  return (
    <div>
      <h4 className="mb-1 text-xs font-medium text-muted-foreground">Pull requests</h4>
      <ul className="grid gap-1 text-sm">
        {prs.map((p) => (
          <li key={p.number} className="flex flex-wrap items-center gap-2">
            {link(p.url, `#${p.number} ${p.title}`)}
            <Muted>
              {p.draft ? "draft" : "ready"} · {p.headBranch} · {p.updatedAt}
            </Muted>
            <GateBadge name="spec-approved" state={p.gates.specApproved} />
            <GateBadge name="ready-to-merge" state={p.gates.readyToMerge} />
            <CiBadge ci={p.ci} run={p.run} />
            {p.preview && link(p.preview, "Preview")}
            {p.waiting === "merge" && link(p.url, "Merge on GitHub")}
            {p.waiting && p.waiting !== "merge" && (
              <form action={tickGate.bind(null, repo, p.number, p.waiting)}>
                <Button type="submit" size="xs">
                  Tick {LABEL[p.waiting]}
                </Button>
              </form>
            )}
            {!p.stub && !p.ticketPath && <Muted>no ticket</Muted>}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Shipped({ merged }: { merged: Merged[] }) {
  return (
    <details>
      <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
        Shipped in the last 14 days · {merged.length}
      </summary>
      {merged.length === 0 ? (
        <p className="mt-1 text-sm text-muted-foreground">Nothing merged in the last 14 days.</p>
      ) : (
        <ul className="mt-1 space-y-1 text-sm">
          {merged.map((m) => (
            <li key={m.number}>
              <span className="tabular-nums text-muted-foreground">{m.mergedAt}</span>{" "}
              {link(m.url, `#${m.number} ${m.title}`)}
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
      <p className="text-sm text-muted-foreground">
        {w.error} · <ReadAgo at={w.readAt} />
      </p>
    );
    return heading ? (
      <section>
        <h3 className="mb-2 text-sm font-medium">{name}</h3>
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
        <h3 className="flex flex-wrap items-baseline gap-2 text-sm font-medium">
          <a href={`/clients/${c.slug}`} className="hover:underline">
            {name}
          </a>
          <Muted>
            {c.repo} · {all.length} open · {w.prs.length} pull {w.prs.length === 1 ? "request" : "requests"}
          </Muted>
          <ReadAgo at={w.readAt} />
        </h3>
      )}
      {shown.length === 0 ? (
        <p className="text-sm text-muted-foreground">No open ticket in .icm/intake/.</p>
      ) : (
        <div className="grid gap-2">
          {shown.map((s) => (
            <TicketRow key={s.path} w={w} s={s} />
          ))}
        </div>
      )}
      {finished.length > 0 && (
        <p className="text-xs text-muted-foreground">
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
    <Suspense fallback={<p className="text-sm text-muted-foreground">Reading {client.name ?? client.slug}…</p>}>
      <RepoRows client={client} filter={filter} heading />
    </Suspense>
  );
}

// One repo's work for Jamie on the client's page: the same rows, no heading, no filter.
export function WorkBody({ repo }: { repo: string }) {
  const c = withRepo.find((x) => x.repo === repo);
  if (!c) return <p className="text-sm text-muted-foreground">No client folder names {repo}.</p>;
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Reading GitHub…</p>}>
      <RepoRows client={c} filter="all" heading={false} />
    </Suspense>
  );
}

// --- The client's view --------------------------------------------------------------------

function List({ title, children, empty }: { title: string; children: ReactNode[]; empty: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{title}</dt>
      <dd>
        {children.length === 0 ? (
          <span className="text-sm text-muted-foreground">{empty}</span>
        ) : (
          <ul className="list-disc space-y-1 pl-5 text-sm">{children}</ul>
        )}
      </dd>
    </div>
  );
}

async function ClientLists({ repo }: { repo: string }) {
  const w = await repoWork(repo);
  if (w.error) return <p className="text-sm text-muted-foreground">The work list is not available now.</p>;
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
            <span className="tabular-nums text-muted-foreground">{m.mergedAt}</span> {m.title}
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
    <Suspense fallback={<p className="text-sm text-muted-foreground">Reading GitHub…</p>}>
      <ClientLists repo={repo} />
    </Suspense>
  );
}
