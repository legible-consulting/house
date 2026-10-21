import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { repoStatus, type RepoStatus } from "@/lib/repos";

// A client repo's status in words (lib/repos.ts): the latest release and the latest
// completed check.yml run on the default branch. Each read streams in behind a Suspense
// boundary, so a slow GitHub never holds the rest of the page. Jamie gets the links and the
// reason when a read fails; a client gets the words only (the repo is private, and the
// reason names the desk's token).

type Ok = Extract<RepoStatus, { ok: true }>;

const RED = new Set(["failure", "timed_out", "startup_failure"]);
const word = (conclusion: string) =>
  conclusion === "success" ? "green" : RED.has(conclusion) ? `red (${conclusion.replace(/_/g, " ")})` : conclusion.replace(/_/g, " ");
const tone = (conclusion: string): "secondary" | "destructive" | "outline" =>
  conclusion === "success" ? "secondary" : RED.has(conclusion) ? "destructive" : "outline";

const link = (href: string, text: string, jamie: boolean) =>
  jamie && href ? (
    <a href={href} className="underline">
      {text}
    </a>
  ) : (
    text
  );

function Release({ s, jamie }: { s: Ok; jamie: boolean }) {
  if (!s.release) return <span className="text-muted-foreground">no release yet</span>;
  return (
    <span className="tabular-nums">
      {link(s.release.url, s.release.tag, jamie)} · {s.release.date}
    </span>
  );
}

function Check({ s, jamie }: { s: Ok; jamie: boolean }) {
  if (!s.checkFile) return <span className="text-muted-foreground">no check.yml</span>;
  if (!s.check) return <span className="text-muted-foreground">no completed run</span>;
  return (
    <span className="inline-flex items-center gap-2 tabular-nums">
      <Badge variant={tone(s.check.conclusion)}>{link(s.check.url, word(s.check.conclusion), jamie)}</Badge>
      {s.check.date}
    </span>
  );
}

const unavailable = (s: Extract<RepoStatus, { ok: false }>, jamie: boolean) =>
  jamie ? s.reason : "The repository status is not available now.";

async function Cells({ repo, jamie }: { repo: string; jamie: boolean }) {
  const s = await repoStatus(repo);
  if (!s.ok) {
    return (
      <TableCell colSpan={2} className="text-xs text-muted-foreground">
        {unavailable(s, jamie)}
      </TableCell>
    );
  }
  return (
    <>
      <TableCell>
        <Release s={s} jamie={jamie} />
      </TableCell>
      <TableCell>
        <Check s={s} jamie={jamie} />
      </TableCell>
    </>
  );
}

// Two table cells: the release, then check.yml. One cell across both when there is no repo
// or the read failed.
export function RepoCells({ repo, jamie }: { repo: string | null | undefined; jamie: boolean }) {
  if (!repo) {
    return (
      <TableCell colSpan={2} className="text-muted-foreground">
        no repo
      </TableCell>
    );
  }
  return (
    <Suspense
      fallback={
        <TableCell colSpan={2} className="text-xs text-muted-foreground">
          reading GitHub…
        </TableCell>
      }
    >
      <Cells repo={repo} jamie={jamie} />
    </Suspense>
  );
}

async function Facts({ repo, jamie }: { repo: string; jamie: boolean }) {
  const s = await repoStatus(repo);
  if (!s.ok) return <p className="text-sm text-muted-foreground">{unavailable(s, jamie)}</p>;
  return (
    <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-xs text-muted-foreground">Latest release</dt>
        <dd>
          <Release s={s} jamie={jamie} />
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted-foreground">check.yml on the default branch</dt>
        <dd>
          <Check s={s} jamie={jamie} />
        </dd>
      </div>
    </dl>
  );
}

// The release and check.yml as two facts, for the client's page.
export function RepoFacts({ repo, jamie }: { repo: string; jamie: boolean }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Reading GitHub…</p>}>
      <Facts repo={repo} jamie={jamie} />
    </Suspense>
  );
}
