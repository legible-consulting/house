import { buttonVariants } from "@/components/ui/button";
import { Due } from "@/components/desk/status-tag";
import type { Action, Urgency } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { CopyButton } from "./_copy";

// The action card (desk/app/DESIGN.md, rule 10): one client's next action on the home, with
// its acts on it. A 4 px edge on the leading side says the urgency: red overdue, amber inside
// seven days, ink later, a hairline with no deadline. Then the client and the stage in mono,
// the due date (components/desk/status-tag.tsx, Due), the action in body text, and the acts:
// Copy prompt (lib/actions.ts actionPrompt), the client's page, the repo and the Drive folder.
// The name is the card's link to the client's page, with a ::after that covers the card; each
// act sits above it with `relative z-10`, as on the ticket card. No hover wash: the red due
// words fall below 4.5:1 on the wash in dark (globals.css).

const EDGE: Record<Urgency, string> = {
  overdue: "border-l-destructive",
  soon: "border-l-warning",
  later: "border-l-foreground",
  open: "border-l-border",
};
const ABOVE = "relative z-10";

export function ActionCard({ action, today }: { action: Action; today: string }) {
  const c = action.client;
  const name = c.name ?? c.slug;
  return (
    <article
      className={cn(
        "relative flex flex-col gap-3 rounded-lg border border-l-4 border-border bg-card p-4",
        EDGE[action.urgency],
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <a
            href={`/clients/${c.slug}`}
            className="block truncate text-heading after:absolute after:inset-0 after:rounded-lg after:content-['']"
          >
            {name}
          </a>
          <p className="font-mono text-meta text-muted-foreground">{[c.stage, c.kind].filter(Boolean).join(" · ")}</p>
        </div>
        {action.deadline ? (
          <Due date={action.deadline} today={today} className="pt-1" />
        ) : (
          <span className="pt-1 font-mono text-meta whitespace-nowrap text-muted-foreground">no deadline</span>
        )}
      </header>
      <p className="line-clamp-4 text-body">{c.next_action}</p>
      <footer className={cn(ABOVE, "mt-auto flex flex-wrap items-center gap-2 pt-1")}>
        <CopyButton text={action.prompt} label="Copy prompt" size="default" variant="default" />
        {c.repo && (
          <a href={`https://github.com/${c.repo}`} className={buttonVariants({ size: "sm", variant: "ghost" })}>
            Repo
          </a>
        )}
        {c.drive && (
          <a href={c.drive} className={buttonVariants({ size: "sm", variant: "ghost" })}>
            Drive
          </a>
        )}
      </footer>
    </article>
  );
}

// One urgency's cards, under its name and count (rule 2: status is a position). Nothing is
// rendered for an urgency with no card (rule 8).
export function ActionGroup({
  title,
  actions,
  today,
}: {
  title: string;
  actions: Action[];
  today: string;
}) {
  if (actions.length === 0) return null;
  const id = `actions-${title.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-3 flex items-baseline gap-2 text-heading">
        {title}
        <span className="font-mono text-meta text-muted-foreground tabular-nums">{actions.length}</span>
      </h2>
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((a) => (
          <li key={a.client.slug} className="grid">
            <ActionCard action={a} today={today} />
          </li>
        ))}
      </ul>
    </section>
  );
}
