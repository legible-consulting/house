import type { ReactNode } from "react";
import { Fade } from "@/app/_fade";
import { Shell } from "@/components/desk/shell";
import { currentUser } from "@/lib/user";

// The shell around every page with a session (components/desk/shell.tsx). The layout reads
// the user and draws the chrome for the role; the page reads the same user (lib/user.ts caches
// the read for the request) and draws its own header and content inside
// (components/desk/page-header.tsx). The content fades in once per path (app/_fade.tsx). A
// visitor with no session never reaches a page here: proxy.ts sends them to /sign-in first.
export default async function DeskLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  return (
    <Shell user={user && { name: user.name, email: user.email, role: user.role }}>
      <Fade>{children}</Fade>
    </Shell>
  );
}
