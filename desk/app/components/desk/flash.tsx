import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

// The flash from ?error= and ?note= (lib/guard.ts), under the page header, the full width of
// the content column. An error interrupts (`role="alert"`, the destructive hairline on the
// destructive soft fill); a note waits (`role="status"`, ink on the lifted sheet). The role
// comes with the Alert's variant. Nothing renders when there is nothing to say.
export function Flash({ error, note, className }: { error?: string; note?: string; className?: string }) {
  if (!error && !note) return null;
  return (
    <Alert variant={error ? "destructive" : "default"} className={cn("mb-4", className)}>
      <p className="text-pretty">{error || note}</p>
    </Alert>
  );
}
