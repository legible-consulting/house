import { ChevronRight } from "lucide-react";
import { Fold } from "@/components/desk/fold";
import type { Step } from "@/lib/hand";
import { inline } from "@/lib/markdown";
import { CopyButton } from "./_copy";

// The hand row (desk/app/DESIGN.md, rules 6 and 10): one step of Jamie's hand on the home, a
// row that opens. The row reads the step's place in mono and its title, the act in a few words
// (lib/hand.ts), and carries Copy prompt (lib/hand.ts stepPrompt). The step in body text and
// its check in mono are detail: they wait under the row until it opens. A <details>, so no
// script opens it. The copy button sits on the row beside the summary, not in it, so a click
// on it copies and does not open the row. A bullet with no bold title shows its step, cut to
// one line. The step's markdown is one line, rendered inline; its `code` keeps the prose rule
// (globals.css, .inline-md). The row has no link: the step's one home is the README on main,
// and the prompt names it.

export function HandRow({ step }: { step: Step }) {
  return (
    <div className="relative">
      <details className="group">
        <summary className="flex min-h-row cursor-pointer list-none items-center gap-2 py-2 pr-32 pl-3 [&::-webkit-details-marker]:hidden">
          <ChevronRight
            className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
            aria-hidden="true"
          />
          <span className="w-5 shrink-0 font-mono text-meta text-muted-foreground tabular-nums">{step.n}</span>
          {step.title ? (
            <span className="min-w-0 truncate text-body">{step.title}</span>
          ) : (
            <span className="inline-md min-w-0 truncate text-body" dangerouslySetInnerHTML={{ __html: inline(step.text) }} />
          )}
        </summary>
        <div className="flex flex-col gap-2 pr-4 pb-3 pl-12">
          <p className="inline-md text-body" dangerouslySetInnerHTML={{ __html: inline(step.text) }} />
          {step.check && (
            <p className="inline-md font-mono text-meta text-muted-foreground">
              <span className="font-semibold text-foreground-2">Check</span> ·{" "}
              <span dangerouslySetInnerHTML={{ __html: inline(step.check) }} />
            </p>
          )}
        </div>
      </details>
      <div className="absolute top-2 right-2 flex h-row items-center">
        <CopyButton text={step.prompt} label="Copy prompt" size="xs" variant="secondary" />
      </div>
    </div>
  );
}

// The steps under their name and count (rule 2: status is a position), one list of rows.
// More than twelve fold behind the count (rule 6). No step is one quiet line (rule 8).
export function HandGroup({ steps, limit = 12 }: { steps: Step[]; limit?: number }) {
  if (steps.length === 0) return <p className="text-ui text-muted-foreground">Jamie's hand holds no step.</p>;
  const rows = (
    <ul className="divide-y divide-border rounded-lg border border-border bg-card">
      {steps.map((s) => (
        <li key={s.n}>
          <HandRow step={s} />
        </li>
      ))}
    </ul>
  );
  if (steps.length > limit) {
    return (
      <section aria-label="Jamie's hand">
        <Fold label="Jamie's hand" count={steps.length} limit={limit}>
          {rows}
        </Fold>
      </section>
    );
  }
  return (
    <section aria-labelledby="hand">
      <h2 id="hand" className="mb-3 flex items-baseline gap-2 text-heading">
        Jamie's hand
        <span className="font-mono text-meta text-muted-foreground tabular-nums">{steps.length}</span>
      </h2>
      {rows}
    </section>
  );
}
