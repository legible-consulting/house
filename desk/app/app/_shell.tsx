import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DeskUser } from "@/lib/pool";
import { cn } from "@/lib/utils";
import { Fade } from "./_fade";
import { signOut } from "./sign-in/actions";

// The desk's shell: one header with the links the role has, the user and sign-out, one
// footer that names the build. Plain HTML forms post to server actions.
export function Shell({
  user,
  current,
  children,
}: {
  user: DeskUser | null;
  current?: string;
  children: ReactNode;
}) {
  const links: [string, string][] =
    user?.role === "jamie"
      ? [
          ["/", "Clients"],
          ["/pool", "Pool"],
        ]
      : user?.role === "salesman"
        ? [["/pool", "Pool"]]
        : [];
  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <header className="mb-6 flex flex-wrap items-center gap-4">
        <h1 className="text-lg font-semibold tracking-tight">Desk</h1>
        <nav className="flex gap-3 text-sm">
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
        built {process.env.BUILD_TIME} from {process.env.BUILD_COMMIT}
      </footer>
    </div>
  );
}
