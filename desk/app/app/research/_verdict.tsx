import { Badge } from "@/components/ui/badge";

// The verdict as a badge: adopt stands out, watch is outlined, decline is muted.
const tone: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  adopt: "default",
  watch: "outline",
  decline: "secondary",
};

export function VerdictBadge({ verdict }: { verdict: string }) {
  return <Badge variant={tone[verdict] ?? "outline"}>{verdict || "—"}</Badge>;
}
