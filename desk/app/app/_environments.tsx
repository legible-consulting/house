import { type ReactNode, Suspense } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { COLUMNS, ENVIRONMENTS_FILE, repoEnvironments } from "@/lib/environments";

// Where a build runs, Jamie only, on /clients/<slug>: each row of the repo's own
// `.icm/environments.md` (lib/environments.ts), with each address as a link. A repo with no
// file, a file with no table, and a failed read are one line each. The read streams in behind a
// Suspense boundary, so a slow GitHub never holds the rest of the page. A client does not see
// it: a cell may name a triage stub or a setup gap, and triage never reaches a client
// (desk/CONTEXT.md, A client's page).

// A cell as React nodes, with no HTML from the file: a span in backticks in mono, and each
// bare http(s) URL as a link. A `<…>` cell is a placeholder and shows as text. The file is
// written in a client repo, so no markdown link and no raw HTML is rendered (why: a client
// repo has writers that the house does not have, and a `javascript:` link is not an address
// · 2026-10-29).
const URL_RE = /https?:\/\/[^\s<>`,]+[^\s<>`,.;:)]/g;

function linked(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(URL_RE)) {
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      <a key={`${key}-${at}`} href={m[0]} className="underline underline-offset-3">
        {m[0]}
      </a>,
    );
    last = at + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const Cell = ({ text, clamp }: { text: string; clamp?: boolean }) => (
  <span className={`inline-md ${clamp ? "line-clamp-2 whitespace-normal" : ""}`} title={clamp ? text : undefined}>
    {text.split("`").map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : linked(part, String(i))))}
  </span>
);

async function EnvironmentRows({ repo }: { repo: string }) {
  const r = await repoEnvironments(repo);
  if (!r.ok) return <p className="text-ui text-muted-foreground">{r.reason}</p>;
  if (r.state === "no-file") {
    return <p className="text-ui text-muted-foreground">{repo} has no {ENVIRONMENTS_FILE} on its default branch.</p>;
  }
  if (r.state === "no-table") {
    return (
      <p className="text-ui text-destructive">
        The table in {ENVIRONMENTS_FILE} has no column {r.missing.join(", ")}.
      </p>
    );
  }
  if (r.rows.length === 0) {
    return <p className="text-ui text-muted-foreground">The table in {ENVIRONMENTS_FILE} has no row.</p>;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((c) => (
            <TableHead key={c}>{c}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {r.rows.map((row, i) => (
          <TableRow key={`${row.environment}-${row.vercelProject}-${i}`}>
            <TableCell>
              <Cell text={row.environment} />
            </TableCell>
            <TableCell className="min-w-48 whitespace-normal">
              <Cell text={row.address} clamp />
            </TableCell>
            <TableCell>
              <Cell text={row.vercelProject} />
            </TableCell>
            <TableCell className="min-w-56 whitespace-normal">
              <Cell text={row.database} clamp />
            </TableCell>
            <TableCell className="min-w-48 whitespace-normal">
              <Cell text={row.movesOn} clamp />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function Environments({ repo }: { repo: string }) {
  return (
    <Suspense fallback={<p className="text-ui text-muted-foreground">Reading GitHub…</p>}>
      <EnvironmentRows repo={repo} />
    </Suspense>
  );
}
