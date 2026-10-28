"use client";

import {
  Briefcase,
  Ellipsis,
  FlaskConical,
  Handshake,
  House,
  ListChecks,
  LogOut,
  Receipt,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { signOut } from "@/app/(auth)/sign-in/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import type { Role } from "@/lib/pool";
import type { Words } from "@/lib/words";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

// The app shell: the chrome around every page with a session. From md, a fixed sidebar on the
// lifted sheet with the JN mark, one row per destination the role has, and the user at the
// foot, whose name links to /preferences. Below md, a fixed tab bar of at most five tabs; the fifth, More, opens a drawer with
// the rest of the links, the user and sign out. A client has no tab bar: the page header
// carries sign out (page-header.tsx). The current destination carries aria-current="page", a
// tap on the tab of the page already shown re-reads it, and every in-app link is next/link.
// app/(desk)/layout.tsx renders the shell with the session's user; each page renders its own
// header and content inside it. A project's board (`/work/<client>`, one segment after
// `work`) is full screen (desk/app/DESIGN.md, rule 11): no sidebar, no tab bar, and `main` takes
// the full width. The skip link stays, and the page header holds the way back. The words are the
// user's (lib/words.ts shell): a salesman reads Pool, Sell, More, sign out and the skip link in
// their language; Jamie's own destinations have no entry there and stay English.

export interface ShellUser {
  name: string;
  email: string;
  role: Role;
}

export type ShellWords = Words["shell"];

interface Destination {
  href: string;
  label: string;
  icon: LucideIcon;
}

const DESK: Destination = { href: "/", label: "Desk", icon: House };
const WORK: Destination = { href: "/work", label: "Work", icon: ListChecks };
const CLIENTS: Destination = { href: "/clients", label: "Clients", icon: Briefcase };
const POOL: Destination = { href: "/pool", label: "Pool", icon: Users };
const CLOSE: Destination = { href: "/close", label: "Close", icon: Receipt };
const SELL: Destination = { href: "/sell", label: "Sell", icon: Handshake };
const RESEARCH: Destination = { href: "/research", label: "Research", icon: FlaskConical };

// One order for the sidebar and the tabs. The tab bar shows the first four and puts the rest
// behind More, which also holds sign out, so it is there for a role with fewer links too.
const DESTINATIONS: Record<Role, Destination[]> = {
  jamie: [DESK, WORK, CLIENTS, POOL, CLOSE, SELL, RESEARCH],
  salesman: [POOL, SELL],
  client: [DESK],
};
const TABS = 4;

// A project's board: /work/<client>, one segment after `work`.
const isBoard = (pathname: string) => /^\/work\/[^/]+\/?$/.test(pathname);

// The destination a path belongs to: a client's page is Clients' for Jamie and the desk's for
// a client, whose links have no Clients; a pool row is the pool's; a verdict is research's.
function currentOf(pathname: string, links: Destination[]): string | undefined {
  if (pathname === "/") return links.find((l) => l.href === "/")?.href;
  const hit = links.find((l) => l.href !== "/" && (pathname === l.href || pathname.startsWith(`${l.href}/`)))?.href;
  if (hit) return hit;
  if (pathname.startsWith("/clients/")) return links.find((l) => l.href === "/")?.href;
  return undefined;
}

const ROW =
  "flex h-row items-center gap-2.5 rounded-md px-2 text-ui text-foreground-2 transition-colors duration-100 hover:bg-sidebar-accent hover:text-sidebar-foreground aria-[current=page]:bg-sidebar-accent aria-[current=page]:font-semibold aria-[current=page]:text-sidebar-accent-foreground";
const TAB =
  "flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-0.5 font-sans text-micro text-muted-foreground transition-colors duration-100 aria-[current=page]:font-semibold aria-[current=page]:text-foreground aria-expanded:text-foreground";

// A link to a destination. The one for the page already shown re-reads the page in place of
// a navigation to itself.
function NavLink({
  d,
  current,
  className,
  icon = "size-4",
  onNavigate,
}: {
  d: Destination;
  current: string | undefined;
  className: string;
  icon?: string; // the icon's size class
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname !== d.href) return;
    e.preventDefault();
    router.refresh();
  };
  return (
    <Link href={d.href} aria-current={current === d.href ? "page" : undefined} className={className} onClick={onClick}>
      <d.icon className={cn("shrink-0", icon)} aria-hidden="true" />
      <span className="truncate">{d.label}</span>
    </Link>
  );
}

function Mark() {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-primary text-primary-foreground">
      <Logo className="size-6" />
    </span>
  );
}

// The user at the sidebar's foot and in the More drawer. For Jamie and a salesman the name is
// the way to /preferences; a client has no preferences page.
function Who({ user, words, className }: { user: ShellUser; words: ShellWords; className?: string }) {
  const pathname = usePathname();
  const name = user.name || user.email;
  return (
    <div className={cn("grid gap-2", className)}>
      <div className="flex min-w-0 items-center gap-2">
        {user.role === "client" ? (
          <span className="min-w-0 flex-1 truncate text-ui">{name}</span>
        ) : (
          <Link
            href="/preferences"
            aria-current={pathname === "/preferences" ? "page" : undefined}
            className="flex min-h-row min-w-0 flex-1 items-center rounded-md text-ui underline-offset-3 hover:underline aria-[current=page]:font-semibold"
          >
            <span className="truncate">{name}</span>
          </Link>
        )}
        <Badge variant="outline">{user.role}</Badge>
      </div>
      <form action={signOut}>
        <Button type="submit" variant="ghost" size="sm" className="w-full justify-start">
          <LogOut aria-hidden="true" />
          {words.signOut}
        </Button>
      </form>
    </div>
  );
}

function Sidebar({ links, user, words }: { links: Destination[]; user: ShellUser | null; words: ShellWords }) {
  const pathname = usePathname();
  const current = currentOf(pathname, links);
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[calc(var(--sidebar-width)+var(--safe-left))] flex-col border-r bg-sidebar pl-safe-left text-sidebar-foreground md:flex">
      <div className="flex h-page-header shrink-0 items-center gap-2.5 border-b px-4">
        <Mark />
        <span className="text-heading">Desk</span>
      </div>
      <nav aria-label="Desk" className="min-h-0 flex-1 overflow-y-auto p-2">
        <ul className="grid gap-0.5">
          {links.map((d) => (
            <li key={d.href}>
              <NavLink d={d} current={current} className={ROW} />
            </li>
          ))}
        </ul>
      </nav>
      {user && <Who user={user} words={words} className="border-t p-3" />}
    </aside>
  );
}

// The fifth tab: a drawer with the links the bar has no room for, the user and sign out. It
// closes on a navigation.
function More({ links, user, words }: { links: Destination[]; user: ShellUser; words: ShellWords }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = currentOf(pathname, links);
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Drawer open={open} onOpenChange={setOpen} showSwipeHandle>
      <DrawerTrigger className={TAB}>
        <Ellipsis className="size-5 shrink-0" aria-hidden="true" />
        <span>{words.more}</span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{words.more}</DrawerTitle>
        </DrawerHeader>
        {links.length > 0 && (
          <nav aria-label={words.more} className="p-2">
            <ul className="grid gap-0.5">
              {links.map((d) => (
                <li key={d.href}>
                  <NavLink d={d} current={current} className={cn(ROW, "px-3")} onNavigate={() => setOpen(false)} />
                </li>
              ))}
            </ul>
          </nav>
        )}
        <Who user={user} words={words} className="border-t p-4 pb-[calc(1rem+var(--safe-bottom))]" />
      </DrawerContent>
    </Drawer>
  );
}

function TabBar({ links, user, words }: { links: Destination[]; user: ShellUser; words: ShellWords }) {
  const pathname = usePathname();
  const current = currentOf(pathname, links);
  return (
    <nav
      aria-label="Desk"
      className="fixed inset-x-0 bottom-0 z-30 flex h-[calc(var(--tab-bar)+var(--safe-bottom))] border-t bg-sidebar pr-safe-right pb-safe-bottom pl-safe-left md:hidden"
    >
      {links.slice(0, TABS).map((d) => (
        <NavLink key={d.href} d={d} current={current} className={TAB} icon="size-5" />
      ))}
      <More links={links.slice(TABS)} user={user} words={words} />
    </nav>
  );
}

// The pool's and Sell's labels in the user's words; every other destination is Jamie's.
const labelled = (links: Destination[], words: ShellWords): Destination[] =>
  links.map((d) => (d === POOL ? { ...d, label: words.pool } : d === SELL ? { ...d, label: words.sell } : d));

export function Shell({ user, words, children }: { user: ShellUser | null; words: ShellWords; children: ReactNode }) {
  const board = isBoard(usePathname());
  const links = user ? labelled(DESTINATIONS[user.role], words) : [];
  const tabs = !board && user !== null && user.role !== "client";
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-ui"
      >
        {words.skip}
      </a>
      {!board && <Sidebar links={links} user={user} words={words} />}
      <div
        className={cn(
          "pr-safe-right pl-safe-left",
          !board && "md:pl-[calc(var(--sidebar-width)+var(--safe-left))]",
          tabs && "pb-[calc(var(--tab-bar)+var(--safe-bottom))] md:pb-0",
        )}
      >
        <main
          id="content"
          className={cn("mx-auto w-full px-gutter", board ? "pb-safe-bottom" : "max-w-content pb-8")}
        >
          {children}
        </main>
      </div>
      {tabs && user && <TabBar links={links} user={user} words={words} />}
    </>
  );
}
