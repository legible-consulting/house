import { Fold } from "@/components/desk/fold";
import type { Step } from "@/lib/hand";
import { inline } from "@/lib/markdown";
import { CopyButton } from "./_copy";

// The hand card (desk/app/DESIGN.md, rule 10): one step of Jamie's hand on the home, with its
// act on it. The action card's shape (app/_action.tsx) with the hairline edge of an action
// that has no deadline: one mono line with the step's place in the list, the step in body
// text, the check in mono under it, then Copy prompt (lib/hand.ts stepPrompt). The step's
// markdown is one line, rendered inline; its `code` keeps the prose rule (globals.css,
// .inline-md). The card has no link: the step's one home is the README on main, and the
// prompt names it.

export function HandCard({ step, total }: { step: Step; total: number }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-l-4 border-border bg-card p-4">
      <p className="font-mono text-meta text-muted-foreground tabular-nums">
        step {step.n} of {total}
      </p>
      <p className="inline-md line-clamp-5 text-body" dangerouslySetInnerHTML={{ __html: inline(step.text) }} />
      {step.check && (
        <p className="inline-md line-clamp-3 font-mono text-meta text-muted-foreground">
          <span className="font-semibold text-foreground-2">Check</span> ·{" "}
          <span dangerouslySetInnerHTML={{ __html: inline(step.check) }} />
        </p>
      )}
      <footer className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <CopyButton text={step.prompt} label="Copy prompt" size="default" variant="default" />
      </footer>
    </article>
  );
}

// The steps under their name and count (rule 2: status is a position). More than twelve fold
// behind the count (rule 6). No step is one quiet line (rule 8).
export function HandGroup({ steps, limit = 12 }: { steps: Step[]; limit?: number }) {
  if (steps.length === 0) return <p className="text-ui text-muted-foreground">Jamie's hand holds no step.</p>;
  const cards = (
    <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {steps.map((s) => (
        <li key={s.n} className="grid">
          <HandCard step={s} total={steps.length} />
        </li>
      ))}
    </ul>
  );
  if (steps.length > limit) {
    return (
      <section aria-label="Jamie's hand">
        <Fold label="Jamie's hand" count={steps.length} limit={limit}>
          {cards}
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
      {cards}
    </section>
  );
}
