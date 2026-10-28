import type { ReactNode } from "react";
import { Fade } from "@/app/_fade";
import { Shell } from "@/components/desk/shell";
import { currentUser, wordsLanguage } from "@/lib/user";
import { words } from "@/lib/words";

// The shell around every page with a session (components/desk/shell.tsx). The layout reads
// the user and draws the chrome for the role, in the user's words (lib/words.ts); the page reads
// the same user (lib/user.ts caches the read for the request) and draws its own header and
// content inside (components/desk/page-header.tsx). The content fades in once per path (app/_fade.tsx). A
// visitor with no session never reaches a page here: proxy.ts sends them to /sign-in first.
export default async function DeskLayout({ children }: { children: ReactNode }) {
  const user = await currentUser();
  const w = words(await wordsLanguage(user));
  return (
    <Shell user={user && { name: user.name, email: user.email, role: user.role }} words={w.shell}>
      <Fade>{children}</Fade>
    </Shell>
  );
}
