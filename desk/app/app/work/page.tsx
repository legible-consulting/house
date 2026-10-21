import { redirect } from "next/navigation";
import { flash, type Search } from "@/lib/guard";
import { clients, type ClientRow } from "@/lib/house";
import { currentUser } from "@/lib/user";
import { Shell } from "../_shell";
import { Flash, Heading } from "../_ui";
import { WaitingOnYou, WorkCard } from "../_work";

// Jamie's work view: every client repo's tickets (.icm/intake/ on the default branch) and
// pull requests, read per request (lib/work.ts). First what waits on Jamie across the
// repos, with the gate to tick (lib/gates.ts). Then one card per client repo, in record
// order. Each card streams in on its own.
export const dynamic = "force-dynamic";

export default async function Work({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const { error, note } = await flash(searchParams);
  const repos = clients.filter((c): c is ClientRow & { repo: string } => Boolean(c.repo));
  return (
    <Shell user={user} current="/work">
      <Heading
        title="Work"
        lede="The tickets in each repo's .icm/intake/ on its default branch and the open pull requests, read from GitHub now. A tick writes the pull request's body."
      />
      <Flash error={error} note={note} />
      <h2 className="mb-3 text-base font-medium">Waiting on you</h2>
      <div className="mb-8">
        <WaitingOnYou />
      </div>
      <div className="grid gap-6">
        {repos.map((c) => (
          <WorkCard key={c.slug} client={c} />
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{repos.length} repos</p>
    </Shell>
  );
}
