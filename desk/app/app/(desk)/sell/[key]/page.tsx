import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CopyButton } from "@/app/_copy";
import { Draft } from "@/app/_touch";
import { PageHeader } from "@/components/desk/page-header";
import { Prose } from "@/components/desk/prose";
import { Track } from "@/components/desk/track";
import type { Search } from "@/lib/guard";
import { bookingLink, sell } from "@/lib/house";
import { render } from "@/lib/markdown";
import { CADENCE } from "@/lib/pool";
import { currentUser } from "@/lib/user";
import { courseHref, kitIn, marked, PART_TITLES, placeOf, ReadIn, readingLanguage } from "../_course";

// One lesson of the course (salesman-desk, decision 4), in the reader's language, as Sell is. The
// header names the lesson and its place in its part; under it, the part's track (track.tsx,
// DESIGN.md rule 5) filled to this lesson; the words as prose in the reading width; for a lesson
// with `touch:`, the pitch draft of each touch in the reader's language, in the document block
// of the row's Next touch (app/_touch.tsx), with Copy; at the foot, the lessons before and after
// it in the kit's order, across the parts. The lesson for `meeting` shows the booking link of
// core/identity.md with Copy under its words, when it is set: the salesman sends it from their
// own account. A key no kit has is a 404. A page with a URL, as a
// ticket is (rule 12): a salesman shares a lesson by its link.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ key: string }>;
  searchParams: Search;
};

const KEY_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export default async function Lesson({ params, searchParams }: Props) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const [{ key }, q, h] = await Promise.all([params, searchParams, headers()]);
  if (!KEY_RE.test(key)) notFound();
  const { lang, pinned } = readingLanguage(user, q.lang, h.get("accept-language"));
  const kit = kitIn(lang);
  const at = kit.lessons.findIndex((l) => l.key === key);
  const lesson = kit.lessons[at];
  if (!lesson) notFound();
  const { n, of, lessons } = placeOf(kit, lesson);
  const previous = kit.lessons[at - 1];
  const next = kit.lessons[at + 1];
  const drafts = lesson.touches.map((touch) => ({
    touch,
    step: CADENCE.find((c) => c.touch === touch),
    draft: sell.pitch.find((d) => d.touch === touch && d.language === kit.language),
  }));
  return (
    <>
      <PageHeader
        user={user}
        title={lesson.title}
        back={{ href: courseHref("/sell", pinned), label: "Sell" }}
        meta={`${PART_TITLES[lesson.part]} · lesson ${n} of ${of}`}
      />
      <article className="grid max-w-reading gap-8">
        <div className="grid gap-4">
          <Track
            steps={lessons.map((l) => l.key)}
            at={n - 1}
            name={lesson.title}
            unit="Lesson"
            className="max-w-full"
          />
          <ReadIn path={`/sell/${lesson.key}`} lang={kit.language} />
        </div>

        <Prose html={marked(render(lesson.body))} />

        {lesson.status === "meeting" && bookingLink && (
          <section aria-labelledby="booking" className="grid gap-4">
            <h2 id="booking" className="text-heading">
              Booking link
            </h2>
            <a
              href={bookingLink}
              className="inline-flex min-h-row items-center font-mono text-meta break-all underline underline-offset-3"
            >
              {bookingLink.replace(/^https?:\/\//, "")}
            </a>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <CopyButton text={bookingLink} label="Copy the link" size="default" variant="default" />
            </div>
          </section>
        )}

        {drafts.map(({ touch, step, draft }) => (
          <section key={touch} aria-labelledby={`touch-${touch}`} className="grid gap-4">
            <header>
              <p className="mb-1 font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">
                Touch {touch} of 3{step ? ` · the ${step.angle}` : ""}
              </p>
              <h2 id={`touch-${touch}`} className="text-heading">
                {draft ? draft.title.split(" · ")[0] : `Touch ${touch}`}
              </h2>
            </header>
            {draft ? (
              <>
                <Draft text={draft.body} />
                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <CopyButton text={draft.body} label="Copy the draft" size="default" variant="default" />
                </div>
              </>
            ) : (
              <p className="text-body text-muted-foreground">
                No draft for touch {touch} in {kit.language} in 01-prospecting/pitch/.
              </p>
            )}
          </section>
        ))}

        {(previous || next) && (
          <nav aria-label="Lessons" className="grid gap-3 border-t pt-4 sm:grid-cols-2">
            {previous && (
              <Link
                href={courseHref(`/sell/${previous.key}`, pinned)}
                className="group flex min-h-row flex-col justify-center gap-0.5 py-2 text-ui"
              >
                <span className="font-mono text-meta text-muted-foreground">Previous</span>
                <span className="font-semibold group-hover:underline">{previous.title}</span>
              </Link>
            )}
            {next && (
              <Link
                href={courseHref(`/sell/${next.key}`, pinned)}
                className="group flex min-h-row flex-col justify-center gap-0.5 py-2 text-ui sm:col-start-2 sm:items-end sm:text-right"
              >
                <span className="font-mono text-meta text-muted-foreground">Next</span>
                <span className="font-semibold group-hover:underline">{next.title}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
    </>
  );
}
