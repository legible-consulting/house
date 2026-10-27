import { STAGES, type Stage } from "@/lib/rhythms";
import { cn } from "@/lib/utils";

// A client's stage. In a table cell, the name only, in mono meta. On a page header, the name
// and the track: eight hairline segments, prospect to after, filled up to the current stage;
// a reader hears "Stage 4 of 8, agreement". Lost shows no track and the name in the muted
// colour.
const TRACK = STAGES.filter((s): s is Exclude<Stage, "lost"> => s !== "lost");

export function StageTrack({
  stage,
  track = false,
  className,
}: {
  stage: string | null | undefined;
  track?: boolean;
  className?: string;
}) {
  if (!stage) return null;
  const lost = stage === "lost";
  const i = TRACK.indexOf(stage as Exclude<Stage, "lost">);
  const name = <span className={cn("font-mono text-meta", lost && "text-muted-foreground")}>{stage}</span>;
  if (!track || lost || i < 0) return <span className={className}>{name}</span>;
  return (
    <span
      role="img"
      aria-label={`Stage ${i + 1} of ${TRACK.length}, ${stage}`}
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span aria-hidden="true" className="flex items-center gap-0.5">
        {TRACK.map((s, j) => (
          <span key={s} className={cn("h-px w-3", j <= i ? "bg-foreground" : "bg-border")} />
        ))}
      </span>
      <span aria-hidden="true">{name}</span>
    </span>
  );
}
