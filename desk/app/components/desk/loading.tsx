import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// The loading state of a page. Each route's loading.tsx (app/(desk)/**/loading.tsx) composes
// these into the shapes that page draws: the header line first, then rows, tiles, lines or a
// pane. The muted fill and no shimmer (the breakdown, Motion rule 6). A reader hears
// "Loading" once; the shapes are decoration.

export function Loading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div aria-busy="true" className={cn("grid gap-6", className)}>
      <p role="status" className="sr-only">
        Loading
      </p>
      {children}
    </div>
  );
}

// The page header's line: a title and its meta line, with the back link's square on a detail.
export function HeaderLine({ back = false }: { back?: boolean }) {
  return (
    <div aria-hidden="true" className="-mx-gutter flex min-h-page-header items-center gap-3 border-b px-gutter">
      {back && <Skeleton className="size-6" />}
      <div className="grid gap-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3 w-52" />
      </div>
    </div>
  );
}

const WIDTHS = ["w-full", "w-11/12", "w-4/5", "w-3/5"];

// Lines of text, as in prose or a list of facts.
export function Lines({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("grid gap-3", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className={cn("h-3", WIDTHS[i % WIDTHS.length])} />
      ))}
    </div>
  );
}

// Table rows: a hairline under each, three cells.
export function Rows({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex h-grid-row items-center gap-6 border-b">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-3 w-1/6" />
          <Skeleton className="h-3 w-1/5" />
        </div>
      ))}
    </div>
  );
}

// Stat tiles: two across on the phone, four from sm.
export function Tiles({ count = 4, className }: { count?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Skeleton key={i} className="h-16 rounded-lg" />
      ))}
    </div>
  );
}

// A card with lines in it.
export function Pane({ lines = 4, className }: { lines?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("rounded-lg border p-4", className)}>
      <Skeleton className="mb-4 h-4 w-32" />
      <Lines count={lines} />
    </div>
  );
}
