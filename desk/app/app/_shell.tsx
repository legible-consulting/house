import type { ReactNode } from "react";
import type { DeskUser } from "@/lib/pool";
import { signOut } from "./sign-in/actions";

// The desk's shell: one header with the links the role has, the user and sign-out, one
// footer that names the build. Plain HTML forms; no client script.
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
    <>
      <header>
        <h1>Desk</h1>
        <nav>
          {links.map(([href, label]) => (
            <a key={href} href={href} aria-current={current === href ? "page" : undefined}>
              {label}
            </a>
          ))}
        </nav>
        {user && (
          <div className="who">
            <span>
              {user.name || user.email} · {user.role}
            </span>
            <form action={signOut} className="inline">
              <button>Sign out</button>
            </form>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer>
        built {process.env.BUILD_TIME} from {process.env.BUILD_COMMIT}
      </footer>
    </>
  );
}
