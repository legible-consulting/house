import type { ReactNode } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Status } from "@/lib/pool";

// The pieces every page shares: the flash from ?error= and ?note=, a labelled field, and
// the status badge.

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
