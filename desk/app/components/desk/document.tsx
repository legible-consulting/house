import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Prose } from "./prose";

// A masthead: an eyebrow (a date, in mono micro uppercase), the title in the title step, and
// one quiet line under it. It heads a document, and, until the page header of the app shell
// lands, a page.
export function Heading({
  title,
  lede,
  eyebrow,
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-4", className)}>
      {eyebrow && <p className="mb-1 font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">{eyebrow}</p>}
      <h2 className="text-title">{title}</h2>
      {lede && <p className="mt-1 text-body text-muted-foreground">{lede}</p>}
    </header>
  );
}

// The readable form of a glance, a verdict, a drift report, a proposal: the masthead, then
// the body as prose, inside the reading width.
export function Document({
  title,
  date,
  lede,
  markdown,
  html,
  children,
  className,
}: {
  title: ReactNode;
  date?: string;
  lede?: ReactNode;
  markdown?: string;
  html?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("max-w-reading", className)}>
      <Heading eyebrow={date} title={title} lede={lede} />
      {(markdown !== undefined || html !== undefined) && <Prose markdown={markdown} html={html} />}
      {children}
    </article>
  );
}
