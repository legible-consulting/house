import { STATUSES, type Status } from "@/lib/pool";
import { StatusTag } from "./status-tag";
import { Track } from "./track";

// A pool row's status (DESIGN.md, rule 5). In a table cell, the name only, as its tag
// (status-tag.tsx). On the row's header, the name and the track (track.tsx): six hairline
// segments, new to handed off, filled up to the current status; a reader hears "Status 3 of 6,
// replied", with `unit` and `of` in the user's words (lib/words.ts); the status stays the model's
// word. `ready for Jamie` is named in 600: the row waits on Jamie. Lost shows no track: its tag,
// the name in the muted colour.
const TRACK = STATUSES.filter((s): s is Exclude<Status, "lost"> => s !== "lost");

export function PoolTrack({
  status,
  track = false,
  unit = "Status",
  of,
  className,
}: {
  status: Status;
  track?: boolean;
  unit?: string;
  of?: string;
  className?: string;
}) {
  const i = TRACK.indexOf(status as Exclude<Status, "lost">);
  if (!track || i < 0) return <StatusTag status={status} className={className} />;
  return (
    <Track steps={TRACK} at={i} unit={unit} of={of} strong={status === "ready for Jamie"} className={className} />
  );
}
