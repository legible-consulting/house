import { Suspense, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tickGate } from "@/lib/gates";
import { clients, type ClientRow } from "@/lib/house";
import { repoWork, type Ci, type Epic, type GateName, type GateState, type Pr, type RepoWork, type Stub } from "@/lib/work";

// The work in a client repo (lib/work.ts): the pull requests with their gates, CI and
// preview, the epics with their stubs, the triage and what shipped. Each repo streams in
// behind a Suspense boundary, so one slow repo never holds the page. Jamie gets the links,
// the gates and the reason when a read fails. A client gets three lists in words: in
// progress with the preview link, shipped, queued. Never the gates, CI, triage or a reason.

const LABEL: Record<GateName, string> = { "spec-approved": "Spec approved", "ready-to-merge": "Ready to merge" };
const withRepo = clients.filter((c): c is ClientRow & { repo: string } => Boolean(c.repo));

const link = (href: string, text: string) => (
  <a href={href} className="underline">
    {text}
  </a>
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
const CiBadge = ({ ci }: { ci: Ci }) => <Badge variant={ciTone[ci]}>{ci === "none" ? "no CI" : ci}</Badge>;

const Muted = ({ children }: { children: ReactNode }) => (
  <span className="text-xs text-muted-foreground">{children}</span>
);

// --- Waiting on you -----------------------------------------------------------------------

async function WaitingRows() {
  const reads = await Promise.all(withRepo.map(async (c) => ({ c, w: await repoWork(c.repo) })));
  const rows = reads.flatMap(({ c, w }) => w.waitingOnJamie.map((p) => ({ c, p })));
  if (rows.length === 0) return <p className="text-sm text-muted-foreground">Nothing waits on you.</p>;
  return (
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
              <CiBadge ci={p.ci} />
            </TableCell>
            <TableCell>{p.preview ? link(p.preview, "Preview") : <Muted>no preview</Muted>}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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

// --- One repo's work ----------------------------------------------------------------------

function PrTable({ prs }: { prs: Pr[] }) {
  if (prs.length === 0) return <p className="text-sm text-muted-foreground">No open pull request.</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pull request</TableHead>
          <TableHead>State</TableHead>
          <TableHead>Gates</TableHead>
          <TableHead>CI</TableHead>
          <TableHead>Preview</TableHead>
          <TableHead>Ticket</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prs.map((p) => (
          <TableRow key={p.number}>
            <TableCell className="whitespace-normal">
              {link(p.url, `#${p.number} ${p.title}`)}
              <br />
              <Muted>
                {p.headBranch} · {p.updatedAt}
              </Muted>
            </TableCell>
            <TableCell>{p.draft ? "draft" : "ready"}</TableCell>
            <TableCell>
              <span className="inline-flex flex-wrap gap-1">
                <GateBadge name="spec-approved" state={p.gates.specApproved} />
                <GateBadge name="ready-to-merge" state={p.gates.readyToMerge} />
              </span>
            </TableCell>
            <TableCell>
              <CiBadge ci={p.ci} />
            </TableCell>
            <TableCell>{p.preview ? link(p.preview, "Preview") : <Muted>none</Muted>}</TableCell>
            <TableCell className="whitespace-normal">
              {p.stub ? (
                <code className="text-xs">{p.stub.replace(/^\.icm\/intake\//, "")}</code>
              ) : p.ticketPath ? (
                <Muted>{p.ticketPath} (no open stub)</Muted>
              ) : (
                <Muted>no ticket</Muted>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function StubMeta({ s }: { s: Stub }) {
  const parts = [s.complexity, s.priority].filter(Boolean);
  return (
    <Muted>
      {s.sequence !== null && `${s.sequence}${s.sequenceOf ? ` of ${s.sequenceOf}` : ""} · `}
      {parts.join(" · ")}
      {s.state === "running" && ` · running in #${s.pr}`}
      {s.state === "blocked" && ` · blocked: ${s.blocked}`}
    </Muted>
  );
}

function EpicBlock({ e }: { e: Epic }) {
  const next = e.open.find((s) => s.state === "next");
  const rest = e.open.filter((s) => s !== next);
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-medium">{e.title}</span>
        <Muted>
          {e.name} · {e.open.length}/{e.total} open
        </Muted>
      </div>
      {e.open.length === 0 ? (
        <p className="text-xs text-muted-foreground">Every stub is done. The epic waits for its move to _done/.</p>
      ) : (
        <ul className="mt-1 space-y-1 text-sm">
          {next && (
            <li>
              <Badge variant="default">next</Badge> <strong>{next.title}</strong> <StubMeta s={next} />
            </li>
          )}
          {rest.map((s) => (
            <li key={s.path}>
              {s.title} <StubMeta s={s} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Sections({ w }: { w: RepoWork }) {
  return (
    <div className="grid gap-5">
      <section>
        <h3 className="mb-2 text-sm font-medium">Pull requests</h3>
        <PrTable prs={w.prs} />
      </section>
      <section>
        <h3 className="mb-2 text-sm font-medium">Epics</h3>
        {w.epics.length === 0 ? (
          <p className="text-sm text-muted-foreground">No epic in .icm/intake/.</p>
        ) : (
          <div className="grid gap-3">
            {w.epics.map((e) => (
              <EpicBlock key={e.name} e={e} />
            ))}
          </div>
        )}
      </section>
      <section>
        <h3 className="mb-2 text-sm font-medium">Triage · {w.triage.length}</h3>
        {w.triage.length === 0 ? (
          <p className="text-sm text-muted-foreground">No open triage stub.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {w.triage.map((s) => (
              <li key={s.path}>
                {s.lane && <Badge variant="outline">{s.lane}</Badge>} {s.title} <StubMeta s={s} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h3 className="mb-2 text-sm font-medium">Shipped in the last 14 days</h3>
        {w.merged.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing merged in the last 14 days.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {w.merged.map((m) => (
              <li key={m.number}>
                <span className="tabular-nums text-muted-foreground">{m.mergedAt}</span> {link(m.url, `#${m.number} ${m.title}`)}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

async function Body({ repo }: { repo: string }) {
  const w = await repoWork(repo);
  if (w.error) return <p className="text-sm text-muted-foreground">{w.error}</p>;
  return <Sections w={w} />;
}

// One repo's work for Jamie, streamed. The client's page puts it in its own card.
export function WorkBody({ repo }: { repo: string }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Reading GitHub…</p>}>
      <Body repo={repo} />
    </Suspense>
  );
}

// The card on /work: the client's name, the repo, then the work.
export function WorkCard({ client }: { client: ClientRow & { repo: string } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-baseline gap-2">
          <a href={`/clients/${client.slug}`} className="hover:underline">
            {client.name ?? client.slug}
          </a>
          <span className="text-xs font-normal text-muted-foreground">{client.repo}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <WorkBody repo={client.repo} />
      </CardContent>
    </Card>
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
