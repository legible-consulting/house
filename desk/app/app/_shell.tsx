import { Suspense, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BUILD, BUILD_IS_COMMIT, deployInFlight, distance } from "@/lib/github";
import { built } from "@/lib/house";
import type { DeskUser } from "@/lib/pool";
import { cn } from "@/lib/utils";
import { Fade } from "./_fade";
import { signOut } from "./sign-in/actions";

// The desk's shell: one header with the links the role has, the user and sign-out, one
// footer that names the build and, for Jamie, its distance from main (lib/github.ts). Plain
// HTML forms post to server actions. A page passes what it shows that may be in flight
// (`live`), and the page re-reads itself every 15 seconds while anything is.
const LINKS: Record<DeskUser["role"], [string, string][]> = {
  jamie: [
    ["/", "Desk"],
    ["/work", "Work"],
    ["/review", "Review"],
    ["/close", "Close"],
    ["/estate", "Estate"],
    ["/pool", "Pool"],
    ["/sell", "Sell"],
  ],
  salesman: [
    ["/pool", "Pool"],
    ["/sell", "Sell"],
  ],
  client: [["/", "Desk"]],
};

const SHOWN_MESSAGES = 5;

// Up to date with main, or how many commits main is ahead and their first lines. Jamie
// only: the messages name the house's files. A failed read says why, on this line only.
async function Distance() {
  const d = await distance();
  if (!d.ok) return <> · main: {d.reason}</>;
  if (d.ahead === 0) return <> · up to date with main</>;
  const shown = d.messages.slice(0, SHOWN_MESSAGES).join("; ");
  const more = d.messages.length > SHOWN_MESSAGES ? "; …" : "";
  return (
    <>
      {" "}
      · main is {d.ahead === 1 ? "1 commit" : `${d.ahead} commits`} ahead: {shown}
      {more}. Vercel deploys each push in about a minute; longer means a failed build.
    </>
  );
}

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
  children,
}: {
  user: DeskUser | null;
  current?: string;
  live?: Promise<boolean>[];
  children: ReactNode;
}) {
  const links = user ? LINKS[user.role] : [];
  const jamie = user?.role === "jamie";
  const checks = jamie && BUILD_IS_COMMIT ? [...live, deployInFlight()] : live;
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
          <div className="ml-auto flex items-center gap-3 text-sm text-muted-foreground">
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
      <footer className="mt-10 text-xs text-muted-foreground">
        built {process.env.BUILD_TIME} from {BUILD.slice(0, 7)} · house read {built}
        {jamie && BUILD_IS_COMMIT && (
          <Suspense fallback={<> · reading main…</>}>
            <Distance />
          </Suspense>
        )}
      </footer>
    </div>
  );
}
