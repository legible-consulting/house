import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Flash } from "@/components/desk/flash";
import { PageHeader } from "@/components/desk/page-header";
import { flash, type Search } from "@/lib/guard";
import { currentUser } from "@/lib/user";
import { workInFlight } from "@/lib/work";
import { OnYourDesk, Projects, Running, WorkCount, withRepo } from "@/app/_work";

// Jamie's work view (desk/app/DESIGN.md, rule 1): what moves, and what waits on him. Three
// sections, each streamed on its own (app/_work.tsx): On your desk, the ticket cards across
// every repo whose next act is Jamie's, with the act on each; Running, the other cards in
// flight, newest first; Projects, one row per repo with its counts, its next ticket and the
// prompt to copy, linked to its board (/work/<client>). The tickets themselves live on the
// boards. The header's quiet line counts the repos, the cards running, those that wait on
// Jamie and the queued tickets. `?repo=<client>` redirects to that board, any other query to
// /work; `?error=` and `?note=` are the flash after a tick (lib/gates.ts). The page re-reads
// itself while a pull request's run or a deploy is in flight (components/desk/page-header.tsx).
// Jamie's hand, the house's own steps that no session takes, is on the home, not here
// (DESIGN.md, rule 1).
export const dynamic = "force-dynamic";

const FLASH = new Set(["error", "note"]);

export default async function Work({ searchParams }: { searchParams: Search }) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role !== "jamie") redirect("/");
  const q = await searchParams;
  if (Object.keys(q).some((k) => !FLASH.has(k))) {
    const repo = q.repo;
    if (typeof repo === "string" && withRepo.some((c) => c.slug === repo)) redirect(`/work/${repo}`);
    redirect("/work");
  }
  const { error, note } = await flash(searchParams);
  return (
    <>
      <PageHeader
        user={user}
        title="Work"
        meta={
          <Suspense fallback={`${withRepo.length} repos`}>
            <WorkCount />
          </Suspense>
        }
        live={withRepo.map((c) => workInFlight(c.repo))}
      />
      <Flash error={error} note={note} />
      <div className="grid gap-8">
        <OnYourDesk />
        <Running />
        <Projects />
      </div>
    </>
  );
}
