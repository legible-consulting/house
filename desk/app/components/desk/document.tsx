import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Prose } from "./prose";

// A masthead: an eyebrow (a date, in mono micro uppercase) with an optional tag beside it (a
// stage, a kind), the title in the title step, one quiet line under it, and optional facts
// under that (a definition list). It heads a document, and, until the page header of the app
// shell lands, a page.
export function Heading({
  title,
  lede,
  eyebrow,
  tag,
  facts,
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  eyebrow?: ReactNode;
  tag?: ReactNode;
  facts?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-4", className)}>
      {(eyebrow || tag) && (
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {eyebrow && <p className="font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">{eyebrow}</p>}
          {tag}
        </div>
      )}
      <h2 className="text-title">{title}</h2>
      {lede && <p className="mt-1 text-body text-muted-foreground">{lede}</p>}
      {facts && <div className="mt-4 border-y py-4">{facts}</div>}
    </header>
  );
}

// The readable form of a glance, a verdict, a drift report, a proposal: the masthead, then
// the body as prose, inside the reading width. `id` is an anchor: a client document's stage.
export function Document({
  id,
  title,
  date,
  tag,
  facts,
  lede,
  markdown,
  html,
  children,
  className,
}: {
  id?: string;
  title: ReactNode;
  date?: string;
  tag?: ReactNode;
  facts?: ReactNode;
  lede?: ReactNode;
  markdown?: string;
  html?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <article id={id} className={cn("max-w-reading", className)}>
      <Heading eyebrow={date} tag={tag} facts={facts} title={title} lede={lede} />
      {(markdown !== undefined || html !== undefined) && <Prose markdown={markdown} html={html} />}
      {children}
    </article>
  );
}
