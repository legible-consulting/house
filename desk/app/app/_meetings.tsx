import type { BookedMeeting } from "@/lib/db";
import { linkOf, meetingTime } from "@/lib/pool";

// The meetings booked for Jamie (meeting-on-the-row of .icm/intake/salesman-desk), on the home
// under the client actions: one row per open pool row with `meeting_with: jamie` from today on,
// soonest first, read per request (lib/db.ts meetingsForJamie). The row reads the date and the
// time in mono, in Jamie's time zone, the company as its link to the pool row, the sourcer, and
// where, as a link when it is one. No meeting is no section (rule 8). A meeting is not a client
// action until the handoff, so lib/actions.ts does not read it.

export function MeetingsGroup({ meetings }: { meetings: BookedMeeting[] }) {
  if (meetings.length === 0) return null;
  return (
    <section aria-labelledby="meetings" className="mb-10">
      <h2 id="meetings" className="mb-3 flex items-baseline gap-2 text-heading">
        Meetings booked for you
        <span className="font-mono text-meta text-muted-foreground tabular-nums">{meetings.length}</span>
      </h2>
      <ul className="divide-y divide-border rounded-lg border border-border bg-card">
        {meetings.map((m) => {
          const { date, time } = meetingTime(m.meeting_at);
          const link = linkOf(m.meeting_where);
          return (
            <li key={m.id} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 px-3 py-2">
              <span className="font-mono text-meta whitespace-nowrap tabular-nums">
                {date} {time}
              </span>
              <a href={`/pool/${m.id}`} className="inline-flex min-h-row items-center text-body underline underline-offset-3">
                {m.company}
              </a>
              <span className="font-mono text-meta text-muted-foreground">sourced by {m.sourced_by}</span>
              {link ? (
                <a
                  href={link}
                  className="inline-flex min-h-row min-w-0 items-center font-mono text-meta break-all text-foreground-2 underline underline-offset-3"
                >
                  {link.replace(/^https?:\/\//, "")}
                </a>
              ) : (
                m.meeting_where && <span className="min-w-0 text-ui text-foreground-2">{m.meeting_where}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
