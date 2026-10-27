import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// A definition list of facts: where a client stands, a verdict's frontmatter. Two columns on
// the phone, three from lg. The label is mono micro uppercase; the value is `text-ui`, and
// `mono` sets a date, a repo or a slug in mono. A `wide` fact (a sentence, such as a next
// action) spans the row. A fact with no value is left out by the caller, never shown empty.
export interface Fact {
  label: string;
  value: ReactNode;
  mono?: boolean;
  wide?: boolean;
  className?: string; // on the value: a state's text colour
}

export function Facts({ facts, className }: { facts: Fact[]; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-3", className)}>
      {facts.map((f) => (
        <div key={f.label} className={cn("min-w-0", f.wide && "col-span-full")}>
          <dt className="font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">{f.label}</dt>
          <dd
            className={cn(
              "text-ui [overflow-wrap:anywhere]",
              f.mono && "font-mono text-meta tabular-nums",
              f.className,
            )}
          >
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
