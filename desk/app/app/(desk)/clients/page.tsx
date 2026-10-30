import { redirect } from "next/navigation";
import { DataTable, type Column } from "@/components/desk/data-table";
import { PageHeader } from "@/components/desk/page-header";
import { StageTrack } from "@/components/desk/stage-track";
import { startOf } from "@/lib/github";
import type { Search } from "@/lib/guard";
import { clients, estate, unbacked, type ClientRow } from "@/lib/house";
import { repoInFlight } from "@/lib/repos";
import { currentUser } from "@/lib/user";
import { CheckCell, ReleaseCell } from "@/app/_repo";

// Jamie's clients view (desk/app/DESIGN.md, rule 1): where does every client stand? One table,
// one row per folder of clients/ at build time, linked to the client's page. Each repo's latest
// release and check.yml run are read per request (lib/repos.ts); the blueprint's drift is from
// the report at build time. The page re-reads itself while a check.yml run or a deploy is in
// flight (components/desk/page-header.tsx). The next action and the deadline are the home's
// cards, not a column here. Any other role goes to the home, which sends them on.
export const dynamic = "force-dynamic";

// Four columns (DESIGN.md, rule 7): the client, the stage, the release with the blueprint's
// drift under it when the repo drifted and the platform's lines beside it when an answer is not
// backed (conformance/CONTEXT.md), and check.yml. On the phone a client is the name and
// the stage.
const columns: Column<ClientRow>[] = [
  { key: "client", label: "Client", phone: "title", className: "md:min-w-48", cell: (c) => c.name ?? c.slug },
  { key: "stage", label: "Stage", phone: "meta", cell: (c) => <StageTrack stage={c.stage} /> },
  {
    key: "release",
    label: "Release",
    phone: "hide",
    cell: (c) => (
      <>
        <ReleaseCell repo={c.repo} jamie />
        {c.blueprint && c.blueprint.drift !== "current" && (
          <span className="line-clamp-2 max-w-56 whitespace-normal text-destructive">{c.blueprint.drift}</span>
        )}
        {unbacked(c.blueprint) && (
          <span className="line-clamp-3 max-w-56 whitespace-normal text-destructive">Platform: {c.blueprint?.platform}</span>
        )}
      </>
    ),
  },
  { key: "check", label: "check.yml", phone: "hide", cell: (c) => <CheckCell repo={c.repo} jamie /> },
];

export default async function Clients({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const start = startOf(await searchParams);
  const repos = clients.flatMap((c) => (c.repo ? [c.repo] : []));
  const meta = `${clients.length} ${clients.length === 1 ? "client" : "clients"}`;
  return (
    <>
      <PageHeader user={user} title="Clients" meta={meta} live={repos.map(repoInFlight)} start={start} />
      <DataTable
        columns={columns}
        rows={clients}
        rowKey={(c) => c.slug}
        href={(c) => `/clients/${c.slug}`}
        empty="No client folder yet. The pool's handoff writes the first one."
      />
      <p className="mt-2 text-ui font-normal text-muted-foreground">
        {estate
          ? `Blueprint and platform from desk/estate/${estate.file}, read against ${estate.blueprint} on ${estate.date}; drift.sh writes a new one.`
          : "No drift report in desk/estate/ yet: drift.sh writes one."}
      </p>
    </>
  );
}
