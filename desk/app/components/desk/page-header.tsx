import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { signOut } from "@/app/(auth)/sign-in/actions";
import { Sync } from "@/app/_sync";
import { Button } from "@/components/ui/button";
import { BUILD_IS_COMMIT, deployInFlight, houseInFlight, WORKFLOWS, type Start } from "@/lib/github";
import type { DeskUser } from "@/lib/pool";
import { cn } from "@/lib/utils";
import { Refresher } from "./refresher";

// The page header: the first child of every page in the shell, sticky at the top of the
// content. A back link on the leading edge when the page is a detail, the title on one line
// (the page's one h1, truncated when long), one quiet line in mono under it, the page's
// actions on the trailing edge, then the sync pill for Jamie (app/_sync.tsx) and, below md,
// sign out for a client, whose shell has no tab bar. The page renders it, so the promises the
// page makes stay with the page: `live` says what it shows that may be in flight, `start` a
// run Jamie started from the pill, and the header renders the re-read from them.

// The page re-reads itself every 15 seconds while anything it shows is in flight: a run
// queued or running, a pull request with a run on its head, a push to main not deployed
// yet. Nothing is rendered when nothing is, and the re-read stops. The re-read is in place
// (refresher.tsx), and only while the tab is shown (why: a full reload put Jamie back at the
// top of the page and closed the open ticket, and a tab left open spent the GitHub rate
// limit · 2026-10-27).
async function Reload({ checks }: { checks: Promise<boolean>[] }) {
  const flags = await Promise.all(checks.map((c) => c.catch(() => false)));
  if (!flags.some(Boolean)) return null;
  return <Refresher seconds={15} />;
}

export function PageHeader({
  user = null,
  title,
  meta,
  back,
  actions,
  live = [],
  start = null,
  className,
}: {
  user?: DeskUser | null;
  title: ReactNode;
  meta?: ReactNode; // one line in mono: a date, a slug, a count, a stage
  back?: { href: string; label: string }; // a detail page's way back
  actions?: ReactNode; // on the trailing edge, before the pill
  live?: Promise<boolean>[]; // what the page shows that may be in flight
  start?: Start | null; // a run Jamie started from the pill, followed on this page
  className?: string;
}) {
  const jamie = user?.role === "jamie";
  const checks =
    jamie && BUILD_IS_COMMIT ? [...live, deployInFlight(), ...WORKFLOWS.map((f) => houseInFlight(f, start))] : live;
  return (
    <>
      {checks.length > 0 && (
        <Suspense fallback={null}>
          <Reload checks={checks} />
        </Suspense>
      )}
      <header
        className={cn(
          "sticky top-0 z-20 -mx-gutter mb-6 flex min-h-page-header items-center gap-2 border-b bg-background px-gutter pt-safe-top",
          className,
        )}
      >
        {back && (
          <Link
            href={back.href}
            className="-ml-2 flex size-row shrink-0 items-center justify-center rounded-md text-foreground-2 transition-colors duration-100 hover:bg-accent hover:text-foreground"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
            <span className="sr-only">Back to {back.label}</span>
          </Link>
        )}
        <div className="min-w-0 flex-1 py-1.5">
          <h1 className="truncate text-title">{title}</h1>
          {meta && <p className="truncate font-mono text-meta text-muted-foreground">{meta}</p>}
        </div>
        {(actions || jamie || user?.role === "client") && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
            {jamie && <Sync start={start} />}
            {user?.role === "client" && (
              <form action={signOut} className="md:hidden">
                <Button type="submit" variant="ghost" size="sm">
                  Sign out
                </Button>
              </form>
            )}
          </div>
        )}
      </header>
    </>
  );
}
