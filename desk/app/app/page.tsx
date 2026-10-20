import { redirect } from "next/navigation";
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
        <p>Nothing here yet for clients. Your project&apos;s page comes in a later wave.</p>
      </Shell>
    );
  }
  const counts = await countsByStatus();
  return (
    <Shell user={user} current="/">
      <h2>Pool</h2>
      <ul className="counts">
        {STATUSES.map((s) => (
          <li key={s}>
            <b>{counts[s]}</b>
            {s}
          </li>
        ))}
      </ul>
      <h2>Clients</h2>
      <div className="wrap">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Stage</th>
              <th>Kind</th>
              <th>Tier</th>
              <th>Next action</th>
              <th>Deadline</th>
              <th>Repo</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.slug}>
                <td>{c.name ?? c.slug}</td>
                <td>{c.stage ?? ""}</td>
                <td>{c.kind ?? ""}</td>
                <td>{c.tier ?? ""}</td>
                <td>{c.next_action ?? ""}</td>
                <td>{day(c.deadline)}</td>
                <td>{c.repo ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted">{clients.length} clients</p>
    </Shell>
  );
}
