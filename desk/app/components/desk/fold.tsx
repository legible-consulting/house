import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// A section that opens with its count (desk/app/DESIGN.md, rule 6): a <details> whose summary
// reads "<label> · N" in heading style. At `limit` rows or fewer it is open; above it, it is
// folded and the summary adds "Show all N". No script: the browser opens and closes it.

export function Fold({
  label,
  count,
  limit = 12,
  children,
  className,
}: {
  label: string;
  count: number;
  limit?: number;
  children: ReactNode;
  className?: string;
}) {
  const folded = count > limit;
  return (
    <details open={!folded} className={cn("group", className)}>
      <summary className="flex min-h-row cursor-pointer list-none items-center gap-2 text-heading [&::-webkit-details-marker]:hidden">
        <ChevronRight className="size-4 shrink-0 text-muted-foreground group-open:rotate-90" aria-hidden="true" />
        <span>
          {label} · <span className="font-mono tabular-nums">{count}</span>
        </span>
        {folded && <span className="text-ui text-muted-foreground group-open:hidden">Show all {count}</span>}
      </summary>
      <div className="pt-2">{children}</div>
    </details>
  );
}
