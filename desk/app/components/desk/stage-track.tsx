import { STAGES, type Stage } from "@/lib/rhythms";
import { cn } from "@/lib/utils";
import { Track } from "./track";

// A client's stage. In a table cell, the name only, in mono meta. On a page header, the name
// and the track (track.tsx): eight hairline segments, prospect to after, filled up to the
// current stage; a reader hears "Stage 4 of 8, agreement". Lost shows no track and the name
// in the muted colour.
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
  if (!track || lost || i < 0) {
    return (
      <span className={className}>
        <span className={cn("font-mono text-meta", lost && "text-muted-foreground")}>{stage}</span>
      </span>
    );
  }
  return <Track steps={TRACK} at={i} unit="Stage" className={className} />;
}
