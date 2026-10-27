import type { ReactNode } from "react";
import { Empty as EmptyBox, EmptyDescription } from "@/components/ui/empty";
import { cn } from "@/lib/utils";

// The empty state: one sentence that says what is absent and what writes it, in the house's
// words ("No glance yet. The sweep writes one every morning."). A list with no row renders
// this, never an empty row.
export function Empty({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <EmptyBox className={cn("py-8", className)}>
      <EmptyDescription>{children}</EmptyDescription>
    </EmptyBox>
  );
}
