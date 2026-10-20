import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { countsByStatus } from "@/lib/db";
import { clients, day } from "@/lib/house";
import { STATUSES } from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { Shell } from "./_shell";

// Jamie's page: the clients table from clients/*/record.md (build time) and the pool's
// count per status (request time). A salesman goes to the pool. A client sees nothing yet.
export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "salesman") redirect("/pool");
  if (user.role === "client") {
    return (
      <Shell user={user}>
        <p className="text-muted-foreground">
          Nothing here yet for clients. Your project&apos;s page comes in a later wave.
        </p>
      </Shell>
    );
  }
  const counts = await countsByStatus();
  return (
    <Shell user={user} current="/">
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((c) => (
            <TableRow key={c.slug}>
              <TableCell className="font-medium">{c.name ?? c.slug}</TableCell>
              <TableCell>{c.stage ?? ""}</TableCell>
              <TableCell>{c.kind ?? ""}</TableCell>
              <TableCell>{c.tier ?? ""}</TableCell>
              <TableCell>{c.next_action ?? ""}</TableCell>
              <TableCell className="tabular-nums">{day(c.deadline)}</TableCell>
              <TableCell className="text-muted-foreground">{c.repo ?? ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-2 text-xs text-muted-foreground">{clients.length} clients</p>
    </Shell>
  );
}
