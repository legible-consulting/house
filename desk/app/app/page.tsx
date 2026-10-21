import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { countsByStatus } from "@/lib/db";
import { flash, type Search } from "@/lib/guard";
import { clients, day, glance } from "@/lib/house";
import { STATUSES } from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { Refresh } from "./_refresh";
import { RepoCells } from "./_repo";
import { Shell } from "./_shell";
import { Flash, Heading, Prose } from "./_ui";

// Jamie's page: the morning glance (desk/glance/<latest>.md, written by sweep-deadlines),
// the refresh (three buttons that start the house's workflows on GitHub, lib/refresh.ts),
// the pool's count per status (request time) and the clients table (clients/*/record.md,
// build time; each repo's latest release and check.yml run per request, lib/repos.ts). A
// salesman goes to the pool. A client goes to their client's page.
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
  const q = await searchParams;
  const started = typeof q.started === "string" ? q.started : "";
  return (
    <Shell user={user} current="/">
      <Flash error={error} note={note} />
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{glance?.title ?? "Morning glance"}</CardTitle>
        </CardHeader>
        <CardContent>
          {glance ? (
            <Prose markdown={glance.body.replace(/^# .*\n+/, "")} />
          ) : (
            <p className="text-sm text-muted-foreground">No glance yet. sweep-deadlines writes one every morning.</p>
          )}
        </CardContent>
      </Card>

      <Refresh started={started} />

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
            <TableHead>Tier</TableHead>
            <TableHead>Next action</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Repo</TableHead>
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
              <TableCell>{c.tier ?? ""}</TableCell>
              <TableCell>{c.next_action ?? ""}</TableCell>
              <TableCell className="tabular-nums">{day(c.deadline)}</TableCell>
              <TableCell className="text-muted-foreground">{c.repo ?? ""}</TableCell>
              <RepoCells repo={c.repo} jamie />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-2 text-xs text-muted-foreground">{clients.length} clients</p>
    </Shell>
  );
}
