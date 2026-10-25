import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sell } from "@/lib/house";
import { CADENCE, type Prospect } from "@/lib/pool";
import { CopyButton } from "./_copy";

// The seller's next touch, filled from the pool row: the pitch draft for the row's language
// and the touch the cadence is at (one more than the touches logged), with the first name
// in. The seller copies it, or opens it in their own mail or WhatsApp, adapts it and sends
// it from their own account, then logs the touch. The desk sends nothing (cadence.md). Shown
// while the cadence runs: at new or contacted, under three touches.
export function NextTouch({ p }: { p: Prospect }) {
  if (!(p.status === "new" || p.status === "contacted") || p.touches >= 3) return null;
  const touch = p.touches + 1;
  const step = CADENCE.find((c) => c.touch === touch);
  const draft = sell.pitch.find((d) => d.touch === touch && d.language === p.language);
  const firstName = p.contact_name.trim().split(/\s+/)[0] ?? "";
  const text = draft ? (firstName ? draft.body.replaceAll("<first name>", firstName) : draft.body) : "";
  const digits = p.phone.replace(/\D/g, "");
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Next touch · {touch} of 3{step ? `, the ${step.angle}` : ""}
        </CardTitle>
        <CardDescription>
          The draft for this touch in the prospect&apos;s language, from 01-prospecting/pitch/. Adapt it in your
          own words, send it from your own account, then log the touch above.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {!p.language ? (
          <p className="text-sm text-muted-foreground">Set the language in Facts to get the draft.</p>
        ) : !draft ? (
          <p className="text-sm text-muted-foreground">
            No draft for touch {touch} in {p.language} in 01-prospecting/pitch/.
          </p>
        ) : (
          <>
            <pre className="whitespace-pre-wrap rounded bg-muted p-3 font-sans text-sm">{text}</pre>
            <div className="flex flex-wrap items-center gap-3">
              <CopyButton text={text} label="Copy the draft" />
              {p.email && (
                <a href={`mailto:${p.email}?body=${encodeURIComponent(text)}`} className="text-sm underline">
                  Open in mail
                </a>
              )}
              {digits && (
                <a href={`https://wa.me/${digits}?text=${encodeURIComponent(text)}`} className="text-sm underline">
                  Open in WhatsApp
                </a>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
