import { redirect } from "next/navigation";
import { flash, type Search } from "@/lib/guard";
import { currentUser } from "@/lib/user";
import { workInFlight } from "@/lib/work";
import { cn } from "@/lib/utils";
import { Shell } from "../_shell";
import { Flash, Heading } from "../_ui";
import { isStateFilter, NextUp, RepoTickets, STATE_FILTERS, WaitingOnYou, withRepo } from "../_work";

// Jamie's work view: every client repo's tickets (.icm/intake/ on the default branch) and
// pull requests, read per request (lib/work.ts). First what waits on Jamie across the repos,
// with the gate to tick (lib/gates.ts). Then the next ticket per repo with its prompt to
// copy. Then every ticket, one row each, by repo, under a state filter (?state=) and a repo
// filter (?repo=); a row opens on the stub's text and its prompt. Each repo streams in on its
// own. The page re-reads itself while a pull request's run or a deploy is in flight
// (app/_shell.tsx).
export const dynamic = "force-dynamic";

export default async function Work({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const q = await searchParams;
  const { error, note } = await flash(searchParams);
  const filter = isStateFilter(q.state) ? q.state : "all";
  const repo = typeof q.repo === "string" && withRepo.some((c) => c.slug === q.repo) ? q.repo : "";
  const shown = repo ? withRepo.filter((c) => c.slug === repo) : withRepo;
  const href = (state: string, r: string) => {
    const params = new URLSearchParams();
    if (state !== "all") params.set("state", state);
    if (r) params.set("repo", r);
    const s = params.toString();
    return `/work${s ? `?${s}` : ""}`;
  };
  const chip = (active: boolean) =>
    cn(
      "rounded-full border px-3 py-1 text-xs",
      active ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
    );
  return (
    <Shell user={user} current="/work" live={withRepo.map((c) => workInFlight(c.repo))}>
      <Heading
        title="Work"
        lede="The tickets in each repo's .icm/intake/ on its default branch and the open pull requests, read from GitHub now. A ticket starts in a session with its prompt; a tick writes the pull request's body."
      />
      <Flash error={error} note={note} />
      <h2 className="mb-3 text-base font-medium">Waiting on you</h2>
      <div className="mb-8">
        <WaitingOnYou />
      </div>
      <h2 className="mb-3 text-base font-medium">Next up</h2>
      <div className="mb-8">
        <NextUp />
      </div>
      <h2 className="mb-3 text-base font-medium">Tickets</h2>
      <nav className="mb-4 flex flex-wrap gap-2" aria-label="Ticket filters">
        {STATE_FILTERS.map(([k, label]) => (
          <a key={k} href={href(k, repo)} aria-current={filter === k ? "true" : undefined} className={chip(filter === k)}>
            {label}
          </a>
        ))}
        <span className="mx-1 text-muted-foreground">·</span>
        <a href={href(filter, "")} aria-current={repo === "" ? "true" : undefined} className={chip(repo === "")}>
          Every repo
        </a>
        {withRepo.map((c) => (
          <a
            key={c.slug}
            href={href(filter, c.slug)}
            aria-current={repo === c.slug ? "true" : undefined}
            className={chip(repo === c.slug)}
          >
            {c.name ?? c.slug}
          </a>
        ))}
      </nav>
      <div className="grid gap-8">
        {shown.map((c) => (
          <RepoTickets key={c.slug} client={c} filter={filter} />
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{withRepo.length} repos.</p>
    </Shell>
  );
}
