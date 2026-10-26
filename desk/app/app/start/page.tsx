import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Search } from "@/lib/guard";
import { forms } from "@/lib/house";
import { COPY, languageOf } from "./copy";
import { StartForm } from "./_form";

// The free look, public: the portfolio's "Get a free look" links open /start?lang=<en|fr|pt>.
// No session (proxy.ts does not match it), no shell and no navigation: the page sits beside the
// auth pages, in their card. The questions are 01-prospecting/forms/free-look.<language>.md as
// the build read them; the page's own words are ./copy.ts. The submit is ./actions.ts.
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Free look", robots: { index: false, follow: false } };

export default async function Start({ searchParams }: { searchParams: Search }) {
  const language = languageOf((await searchParams).lang);
  const form = forms["free-look"]?.[language];
  const { errors, ...copy } = COPY[language]; // the errors come back from the action
  return (
    <div lang={language} className="mx-auto max-w-2xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{form?.title}</CardTitle>
          <CardDescription>{form?.intro}</CardDescription>
        </CardHeader>
        <CardContent>
          {form ? <StartForm form={form} copy={copy} /> : <p className="text-sm">{errors.failed}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
