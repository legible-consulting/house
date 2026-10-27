import type { Metadata } from "next";
import { headers } from "next/headers";
import { cache } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { linkById } from "@/lib/db";
import { businessEmail } from "@/lib/house";
import { formLanguageOf } from "@/lib/links";
import { UUID_RE } from "@/lib/pool";
import { COPY, errorsOf } from "./copy";
import { DeadEnd } from "./_dead-end";
import { LinkForm } from "./_form";

// A sent link, public: the questionnaire Jamie sent to one lead or client from the Send a form
// card. The token in the URL is the credential, a v4 uuid (decision 6 of .icm/intake/desk-forms).
// No session (proxy.ts does not match it), no shell and no navigation: the page sits beside
// /start, in the same card. Everything it shows is the row's frozen snapshot, never forms/ or
// house.json (why: a question reworded in the house after the link was sent must not change
// what the person answers · 2026-10-25). The page's own words are ./copy.ts, in the row's
// language. The submit is ./actions.ts.
export const dynamic = "force-dynamic";

// The metadata and the page both read the row: one query per request.
const load = cache(async (token: string) => {
  const id = token.toLowerCase();
  return UUID_RE.test(id) ? linkById(id) : null;
});

type Params = Promise<{ token: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const link = await load((await params).token).catch(() => null);
  // No title when the row is not found: the layout's default, "Desk", stands alone.
  return { title: link?.snapshot.title, robots: { index: false, follow: false } };
}

export default async function SentLinkPage({ params }: { params: Params }) {
  const { token } = await params;
  let link: Awaited<ReturnType<typeof load>>;
  let failed = false;
  try {
    link = await load(token);
  } catch (e) {
    console.error(`[f] link ${token} not read:`, e);
    link = null;
    failed = true;
  }
  // No row means no language: the browser's own, else en-GB.
  const language = link?.language ?? formLanguageOf((await headers()).get("accept-language"));
  const copy = COPY[language];

  return (
    <div lang={language} className="mx-auto max-w-2xl px-gutter py-8">
      <Card>
        {link && !link.answered && (
          <CardHeader>
            <h1 className="text-title">{link.snapshot.title}</h1>
            {link.snapshot.intro && <CardDescription>{link.snapshot.intro}</CardDescription>}
          </CardHeader>
        )}
        <CardContent>
          {failed ? (
            <p className="text-body">{errorsOf(language).failed}</p>
          ) : !link ? (
            <DeadEnd kind="invalid" copy={copy} email={businessEmail} />
          ) : link.answered ? (
            <DeadEnd kind="answered" copy={copy} email={businessEmail} />
          ) : (
            <LinkForm token={link.id} form={link.snapshot} copy={copy} email={businessEmail} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
