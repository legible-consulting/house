"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

// The one error view for the pages in the shell. The chrome stays up: the boundary wraps the
// page, not the layout. The view names the page and offers to render it again. The error's
// words go to the console and to Vercel's function log, never to the page: they may name a
// token or a host.
export default function DeskError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname();
  useEffect(() => {
    console.error(`[desk] ${pathname} did not render:`, error);
  }, [error, pathname]);
  return (
    <>
      <header className="sticky top-0 z-20 -mx-gutter mb-6 flex min-h-page-header items-center border-b bg-background px-gutter pt-[env(safe-area-inset-top)]">
        <div className="min-w-0 py-1.5">
          <h1 className="truncate text-title">The page did not render</h1>
          <p className="truncate font-mono text-meta text-muted-foreground">
            {pathname}
            {error.digest ? ` · ${error.digest}` : ""}
          </p>
        </div>
      </header>
      <p className="mb-4 text-body text-muted-foreground">
        Something failed while this page was read. The rest of the desk works; the reason is in the Vercel log.
      </p>
      <Button type="button" onClick={reset}>
        Try again
      </Button>
    </>
  );
}
