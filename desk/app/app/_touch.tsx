import Link from "next/link";
import { Phrase } from "@/components/desk/phrase";
import { buttonVariants } from "@/components/ui/button";
import { sell } from "@/lib/house";
import type { Kit } from "@/lib/kit";
import { CADENCE, whatsappUrl, type Prospect } from "@/lib/pool";
import type { Words } from "@/lib/words";
import { CopyButton } from "./_copy";

// A pitch draft as a document block: the words as written, the lines kept, and each placeholder
// the sender fills (<first name>, <one thing seen>) marked. The row's Next touch and a lesson of
// the course (/sell/<key>) show a draft in it.
export function Draft({ text }: { text: string }) {
  return (
    <pre className="rounded-lg border bg-card p-4 font-sans text-body whitespace-pre-wrap text-card-foreground">
      {text.split(/(<[^<>\n]+>)/).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded-key bg-warning-soft px-1 text-foreground">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </pre>
  );
}

// The seller's next touch, filled from the pool row: the pitch draft for the row's language
// and the touch the cadence is at (one more than the touches logged), with the first name
// in. The seller copies it, or opens it in their own mail or WhatsApp (the row's WhatsApp
// number, or its phone when it has none), adapts it and sends it from their own account, then
// logs the touch. The desk sends nothing (cadence.md). Shown while the cadence runs: at new or
// contacted, under three touches. The draft reads as a document in the reading width; Copy comes first, the two ways out after it.
// The eyebrow links to the kit's lesson that shows this touch, in `kit`, the user's language. The
// section's own words are the user's (`w`, lib/words.ts); the draft is in the row's language.
export function NextTouch({ p, kit, w }: { p: Prospect; kit: Kit; w: Words }) {
  if (!(p.status === "new" || p.status === "contacted") || p.touches >= 3) return null;
  const touch = p.touches + 1;
  const step = CADENCE.find((c) => c.touch === touch);
  const draft = sell.pitch.find((d) => d.touch === touch && d.language === p.language);
  const firstName = p.contact_name.trim().split(/\s+/)[0] ?? "";
  const text = draft ? (firstName ? draft.body.replaceAll("<first name>", firstName) : draft.body) : "";
  const wa = whatsappUrl(p.whatsapp || p.phone);
  const lesson = kit.lessons.find((l) => l.touches.includes(touch));
  const eyebrow = `${w.touch.eyebrow(touch)}${step ? ` · ${w.touch.angles[step.angle]}` : ""}`;
  return (
    <section aria-labelledby="next-touch" className="grid max-w-reading gap-4">
      <header>
        <p className="mb-1 font-mono text-micro uppercase tracking-eyebrow text-muted-foreground">
          {lesson ? (
            <Link
              href={`/sell/${lesson.key}`}
              className="inline-flex min-h-row items-center underline underline-offset-3 hover:text-foreground"
            >
              {eyebrow}
              <span className="sr-only">{w.touch.lesson(lesson.title)}</span>
            </Link>
          ) : (
            eyebrow
          )}
        </p>
        <h2 id="next-touch" className="text-heading">
          {w.touch.title}
        </h2>
        <p className="mt-1 text-ui font-normal text-muted-foreground">{w.touch.what}</p>
      </header>
      {!p.language ? (
        <p className="text-body text-muted-foreground">{w.touch.setLanguage}</p>
      ) : !draft ? (
        <p className="text-body text-muted-foreground">
          <Phrase text={w.touch.noDraft(touch, p.language)} />
        </p>
      ) : (
        <>
          <Draft text={text} />
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <CopyButton text={text} label={w.touch.copyDraft} size="default" variant="default" words={w.copy} />
            {p.email && (
              <a
                href={`mailto:${p.email}?body=${encodeURIComponent(text)}`}
                className={buttonVariants({ variant: "outline" })}
              >
                {w.touch.openMail}
              </a>
            )}
            {wa && (
              <a
                href={`${wa}?text=${encodeURIComponent(text)}`}
                className={buttonVariants({ variant: "outline" })}
              >
                {w.touch.openWhatsApp}
              </a>
            )}
          </div>
        </>
      )}
    </section>
  );
}
