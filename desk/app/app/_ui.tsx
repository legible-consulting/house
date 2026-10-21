import type { ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { render } from "@/lib/markdown";
import type { Status } from "@/lib/pool";
import { cn } from "@/lib/utils";

// The pieces every page shares: the flash from ?error= and ?note=, a labelled field, the
// status badge, a page heading, and markdown from the house as prose.

export function Flash({ error, note }: { error?: string; note?: string }) {
  if (!error && !note) return null;
  return (
    <Alert variant={error ? "destructive" : "default"} className="mb-4">
      <AlertDescription>{error || note}</AlertDescription>
    </Alert>
  );
}

export function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Label className={cn("flex flex-col items-stretch gap-1.5 font-normal", className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      {children}
    </Label>
  );
}

const tone: Record<Status, "default" | "secondary" | "destructive" | "outline"> = {
  new: "secondary",
  contacted: "outline",
  replied: "default",
  meeting: "default",
  "ready for Jamie": "default",
  "handed off": "secondary",
  lost: "destructive",
};

export function StatusBadge({ status }: { status: Status }) {
  return <Badge variant={tone[status]}>{status}</Badge>;
}

export function Heading({ title, lede }: { title: string; lede?: ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="text-base font-medium">{title}</h2>
      {lede && <p className="mt-1 text-sm text-muted-foreground">{lede}</p>}
    </div>
  );
}

const prose = cn(
  "text-sm leading-relaxed",
  "[&_h1]:text-lg [&_h1]:font-semibold [&_h1]:tracking-tight",
  "[&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-medium",
  "[&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:font-medium",
  "[&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  "[&_a]:underline [&_strong]:font-medium",
  "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-xs",
  "[&_table]:my-3 [&_table]:w-full [&_th]:border-b [&_th]:py-1.5 [&_th]:pr-3 [&_th]:text-left [&_th]:font-medium",
  "[&_td]:border-b [&_td]:py-1.5 [&_td]:pr-3 [&_td]:align-top",
  "[&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_hr]:my-4",
);

// Markdown from the house (a glance, a report, a document) as HTML. Raw HTML in the source
// is shown as text (lib/markdown.ts). `html` is for words rendered once at module load.
export function Prose({ markdown, html }: { markdown?: string; html?: string }) {
  return <div className={prose} dangerouslySetInnerHTML={{ __html: html ?? render(markdown ?? "") }} />;
}
