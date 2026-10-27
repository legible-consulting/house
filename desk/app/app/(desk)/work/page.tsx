import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { flash, type Search } from "@/lib/guard";
import { currentUser } from "@/lib/user";
import { workInFlight } from "@/lib/work";
import { FilterGroup } from "@/app/_filters";
import {
  isStateFilter,
  NextUp,
  RepoTickets,
  STATE_FILTERS,
  TicketCount,
  WaitingOnYou,
  withRepo,
} from "@/app/_work";

// Jamie's work view: every client repo's tickets (.icm/intake/ on the default branch) and
// pull requests, read per request (lib/work.ts). First what waits on Jamie across the repos,
// with the gate to tick (lib/gates.ts). Then the next ticket per repo with its prompt to
// copy. Then every ticket, one row each, by repo, under a state filter (?state=) and a repo
// filter (?repo=), each a toggle group; a row opens on the stub's text and its prompt. Each
// repo streams in on its own. The header's quiet line counts the repos read and their open
// tickets. The page re-reads itself while a pull request's run or a deploy is in flight
// (components/desk/page-header.tsx).
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
  return (
    <>
      <PageHeader
        user={user}
        title="Work"
        meta={
          <Suspense fallback={`${withRepo.length} repos`}>
            <TicketCount />
          </Suspense>
        }
        live={withRepo.map((c) => workInFlight(c.repo))}
      />
      <Flash error={error} note={note} />
      <p className="mb-6 max-w-reading text-body text-muted-foreground">
        The tickets in each repo&apos;s .icm/intake/ on its default branch and the open pull requests, read from GitHub
        now. A ticket starts in a session with its prompt; a tick writes the pull request&apos;s body.
      </p>
      <h2 className="mb-3 text-heading">Waiting on you</h2>
      <div className="mb-8">
        <WaitingOnYou />
      </div>
      <h2 className="mb-3 text-heading">Next up</h2>
      <div className="mb-8">
        <NextUp />
      </div>
      <h2 className="mb-3 text-heading">Tickets</h2>
      <div className="mb-6 grid gap-2">
        <FilterGroup
          label="Ticket state"
          value={filter}
          items={STATE_FILTERS.map(([k, label]) => ({ value: k, label, href: href(k, repo) }))}
        />
        <FilterGroup
          label="Repo"
          value={repo || "every"}
          items={[
            { value: "every", label: "Every repo", href: href(filter, "") },
            ...withRepo.map((c) => ({ value: c.slug, label: c.name ?? c.slug, href: href(filter, c.slug) })),
          ]}
        />
      </div>
      <div className="grid gap-8">
        {shown.map((c) => (
          <RepoTickets key={c.slug} client={c} filter={filter} />
        ))}
      </div>
    </>
  );
}
