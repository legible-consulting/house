import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { countsByStatus } from "@/lib/db";
import { startOf } from "@/lib/github";
import { flash, type Search } from "@/lib/guard";
import { clients, day, decides, estate } from "@/lib/house";
import { STATUSES } from "@/lib/pool";
import { repoInFlight } from "@/lib/repos";
import { glance, today } from "@/lib/rhythms";
import { currentUser } from "@/lib/user";
import { RepoCells } from "./_repo";
import { Shell } from "./_shell";
import { Flash, Heading, Prose } from "./_ui";

// Jamie's page: the glance, computed now from the house as of the last push to main
// (lib/rhythms.ts; rhythms.yml commits the same words to desk/glance/ every morning), the
// pool's count per status (request time) and the clients table (clients/*/record.md and the
// drift report at build time; each repo's latest release and check.yml run per request,
// lib/repos.ts). The page re-reads itself while a house run, a check.yml run or a deploy is
// in flight (app/_shell.tsx). A salesman goes to the pool. A client goes to their client's
// page.
export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "salesman") redirect("/pool");
  if (user.role === "client") {
    if (user.client) redirect(`/clients/${user.client}`);
    return (
      <Shell user={user} current="/">
        <Heading
          title="No client folder is linked to this account yet"
          lede="A new account starts with the client role and no folder. Jamie links it to one (db/schema.sql); until then there is nothing to show."
        />
      </Shell>
    );
  }
  const counts = await countsByStatus();
  const { error, note } = await flash(searchParams);
  const start = startOf(await searchParams);
  const now = today();
  const repos = clients.flatMap((c) => (c.repo ? [c.repo] : []));
  return (
    <Shell user={user} current="/" live={repos.map(repoInFlight)} start={start}>
      <Flash error={error} note={note} />
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Glance · {now}</CardTitle>
          <p className="text-sm text-muted-foreground">
            From the house as of the last push to main, computed now. A bold due date is inside seven days or past.
          </p>
        </CardHeader>
        <CardContent>
          <Prose markdown={glance(clients, decides.body, now, (c) => `/clients/${c.slug}`)} />
        </CardContent>
      </Card>

      <h2 className="mb-3 text-base font-medium">Pool</h2>
      <ul className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
        {STATUSES.map((s) => (
          <li key={s}>
            <Card className="py-3">
              <CardContent className="px-4">
                <div className="text-2xl font-semibold tabular-nums">{counts[s]}</div>
                <div className="text-xs text-muted-foreground">{s}</div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 text-base font-medium">Clients</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Kind</TableHead>
            <TableHead>Next action</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Repo</TableHead>
            <TableHead>Blueprint</TableHead>
            <TableHead>Release</TableHead>
            <TableHead>check.yml</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((c) => (
            <TableRow key={c.slug}>
              <TableCell className="font-medium">
                <a href={`/clients/${c.slug}`} className="hover:underline">
                  {c.name ?? c.slug}
                </a>
              </TableCell>
              <TableCell>{c.stage ?? ""}</TableCell>
              <TableCell>{c.kind ?? ""}</TableCell>
              <TableCell className="whitespace-normal">{c.next_action ?? ""}</TableCell>
              <TableCell className="tabular-nums">{day(c.deadline)}</TableCell>
              <TableCell className="text-muted-foreground">{c.repo ?? ""}</TableCell>
              <TableCell className={c.blueprint && c.blueprint.drift !== "current" ? "text-destructive" : ""}>
                {c.blueprint ? c.blueprint.drift : c.repo ? "not in the report" : ""}
              </TableCell>
              <RepoCells repo={c.repo} jamie />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-2 text-xs text-muted-foreground">
        {clients.length} clients.
        {estate
          ? ` Blueprint from desk/estate/${estate.file}, read against ${estate.blueprint} on ${estate.date}; drift.sh writes a new one.`
          : " No drift report in desk/estate/ yet: drift.sh writes one."}
      </p>
    </Shell>
  );
}
