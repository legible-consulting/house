import { Suspense, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BUILD_IS_COMMIT, deployInFlight, houseInFlight, WORKFLOWS, type Start } from "@/lib/github";
import type { DeskUser } from "@/lib/pool";
import { cn } from "@/lib/utils";
import { Fade } from "./_fade";
import { Sync } from "./_sync";
import { signOut } from "./sign-in/actions";

// The desk's shell: one header with the links the role has, the sync pill for Jamie
// (app/_sync.tsx), the user and sign-out. Plain HTML forms post to server actions. A page
// passes what it shows that may be in flight (`live`), and the page re-reads itself every
// 15 seconds while anything is: a house run, a deploy, or what the page passed.
const LINKS: Record<DeskUser["role"], [string, string][]> = {
  jamie: [
    ["/", "Desk"],
    ["/work", "Work"],
    ["/close", "Close"],
    ["/pool", "Pool"],
    ["/sell", "Sell"],
  ],
  salesman: [
    ["/pool", "Pool"],
    ["/sell", "Sell"],
  ],
  client: [["/", "Desk"]],
};

// The page re-reads itself every 15 seconds while anything it shows is in flight: a run
// queued or running, a pull request with a run on its head, a push to main not deployed
// yet. Nothing is rendered when nothing is. React hoists the tag into <head>, and a browser
// acts on it wherever it lands, so a slow read streams it in later. No script: it works on
// the phone and in a tab left open.
async function Reload({ checks }: { checks: Promise<boolean>[] }) {
  const flags = await Promise.all(checks.map((c) => c.catch(() => false)));
  if (!flags.some(Boolean)) return null;
  return <meta httpEquiv="refresh" content="15" />;
}

export function Shell({
  user,
  current,
  live = [],
  start = null,
  children,
}: {
  user: DeskUser | null;
  current?: string;
  live?: Promise<boolean>[];
  start?: Start | null; // a run Jamie started from the pill, followed on this page
  children: ReactNode;
}) {
  const links = user ? LINKS[user.role] : [];
  const jamie = user?.role === "jamie";
  const checks =
    jamie && BUILD_IS_COMMIT ? [...live, deployInFlight(), ...WORKFLOWS.map((f) => houseInFlight(f, start))] : live;
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {checks.length > 0 && (
        <Suspense fallback={null}>
          <Reload checks={checks} />
        </Suspense>
      )}
      <header className="mb-6 flex flex-wrap items-center gap-4">
        <h1 className="text-lg font-semibold tracking-tight">Desk</h1>
        <nav className="flex flex-wrap gap-3 text-sm">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              aria-current={current === href ? "page" : undefined}
              className={cn(
                "text-muted-foreground hover:text-foreground",
                current === href && "font-medium text-foreground",
              )}
            >
              {label}
            </a>
          ))}
        </nav>
        {user && (
          <div className="ml-auto flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {jamie && <Sync start={start} />}
            <span>{user.name || user.email}</span>
            <Badge variant="outline">{user.role}</Badge>
            <form action={signOut}>
              <Button type="submit" variant="ghost" size="sm">
                Sign out
              </Button>
            </form>
          </div>
        )}
      </header>
      <main>
        <Fade>{children}</Fade>
      </main>
    </div>
  );
}
