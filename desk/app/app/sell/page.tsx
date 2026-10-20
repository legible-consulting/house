import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Pitch, sell } from "@/lib/house";
import { render } from "@/lib/markdown";
import { currentUser } from "@/lib/user";
import { cn } from "@/lib/utils";
import { Shell } from "../_shell";

// Sell: what S1 gives a salesman before the first touch, read-only (prospect.md, "The
// salesman's deal"): the target profile, the cadence and every pitch draft, from
// sell/01-prospecting/ at build time. A change there ships with the next push to main.
export const dynamic = "force-dynamic";

// Rendered once per server, not per request: the words are fixed at build time.
const profile = render(sell.profile.body);
const cadence = render(sell.cadence.body);
const pitches = sell.pitch.map((p) => ({ ...p, html: render(p.body) }));
const touches = [...new Set(pitches.map((p) => p.touch))].sort((a, b) => a - b);

// "Opener · en-GB" → "Opener"
const angle = (p: Pitch) => p.title.split(" · ")[0];

const prose = cn(
  "text-sm leading-relaxed",
  "[&_h1]:text-lg [&_h1]:font-semibold [&_h1]:tracking-tight",
  "[&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-medium",
  "[&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:font-medium",
  "[&_p]:my-2 [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5",
  "[&_a]:underline [&_strong]:font-medium",
  "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-xs",
  "[&_table]:my-3 [&_table]:w-full [&_th]:border-b [&_th]:py-1.5 [&_th]:pr-3 [&_th]:text-left [&_th]:font-medium",
  "[&_td]:border-b [&_td]:py-1.5 [&_td]:pr-3 [&_td]:align-top",
  "[&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_hr]:my-4",
);

function Prose({ html }: { html: string }) {
  return <div className={prose} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default async function Sell() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (user.role === "client") redirect("/");
  const jump: [string, string][] = [
    ["#profile", sell.profile.title],
    ["#cadence", sell.cadence.title],
    ["#pitch", "Pitch"],
  ];
  return (
    <Shell user={user} current="/sell">
      <h2 className="mb-1 text-base font-medium">Sell</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Who the pool chases, how a prospect is approached, and the draft for each touch. Read-only: the words live in{" "}
        <code className="font-mono text-xs">sell/01-prospecting/</code> and change there.
      </p>
      <nav className="mb-6 flex gap-3 text-sm">
        {jump.map(([href, label]) => (
          <a key={href} href={href} className="text-muted-foreground hover:text-foreground">
            {label}
          </a>
        ))}
      </nav>
      <div className="grid gap-6">
        <Card id="profile">
          <CardContent>
            <Prose html={profile} />
          </CardContent>
        </Card>
        <Card id="cadence">
          <CardContent>
            <Prose html={cadence} />
          </CardContent>
        </Card>
        <section id="pitch" className="grid gap-6">
          <div>
            <h3 className="text-base font-medium">Pitch</h3>
            <p className="text-sm text-muted-foreground">
              One draft per touch and language. Adapt it in your own mailbox, in the prospect&apos;s language; the desk
              sends nothing.
            </p>
          </div>
          {touches.map((t) => {
            const drafts = pitches.filter((p) => p.touch === t);
            return (
              <Card key={t}>
                <CardHeader>
                  <CardTitle>
                    {t} · {angle(drafts[0])}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 lg:grid-cols-3">
                  {drafts.map((p) => (
                    <div key={p.file}>
                      <Badge variant="outline" className="mb-2">
                        {p.language}
                      </Badge>
                      <Prose html={p.html} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </Shell>
  );
}
