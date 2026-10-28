import { FilterGroup } from "@/app/_filters";
import { sell } from "@/lib/house";
import type { Kit, KitLesson } from "@/lib/kit";
import { isLanguage, LANGUAGE_NAMES, languageOf, type Language } from "@/lib/language";
import { LANGUAGES, type DeskUser } from "@/lib/pool";
import { wordsLanguage } from "@/lib/user";
import { words, type Words } from "@/lib/words";

// The course that /sell and /sell/<key> share (salesman-desk, decision 4): the kit's lessons in
// the kit's order, under its three parts, in one language at a time. The desk stores no
// progress: the URL is the lesson. The parts' names and the pages' own words are lib/words.ts
// sell.

// The language of this read: ?lang= when it names one of the three, for this read only, else the
// user's (lib/language.ts). `pinned` is the URL's language, which the course's links keep. `w` is
// the page's own words: the pinned language's, so a read in another language is one language
// from the header to the foot; else the user's words (lib/user.ts wordsLanguage).
export async function readingLanguage(
  user: DeskUser,
  lang: string | string[] | undefined,
  acceptLanguage: string | null,
): Promise<{ lang: Language; pinned: Language | null; w: Words }> {
  if (isLanguage(lang)) return { lang, pinned: lang, w: words(lang) };
  return { lang: languageOf(user, acceptLanguage), pinned: null, w: words(await wordsLanguage(user)) };
}

// The kit in one language. read-house.mjs fails the build when one of the three is missing, so
// the fallback is for a kit that a later language adds before its file.
export function kitIn(lang: Language): Kit {
  return sell.kit.find((k) => k.language === lang) ?? sell.kit.find((k) => k.language === "en-GB") ?? sell.kit[0]!;
}

// A lesson's number in its part, from 1, and the part's length.
export function placeOf(kit: Kit, l: KitLesson): { n: number; of: number; lessons: KitLesson[] } {
  const lessons = kit.lessons.filter((x) => x.part === l.part);
  return { n: lessons.indexOf(l) + 1, of: lessons.length, lessons };
}

// A course link keeps the URL's language, so a read in another language stays in it.
export const courseHref = (path: string, pinned: Language | null) => (pinned ? `${path}?lang=${pinned}` : path);

// A placeholder the sender fills (<first name>, <one thing seen>) is marked in rendered words.
// lib/markdown.ts shows raw HTML as text, so it is escaped here.
export const marked = (html: string): string =>
  html.replace(/&lt;([^&<>]+)&gt;/g, '<mark class="rounded-key bg-warning-soft px-1 text-foreground">&lt;$1&gt;</mark>');

// "Read in": the three languages in their own names. A press goes to the same page in that
// language, and the preference does not change.
export function ReadIn({ path, lang, label }: { path: string; lang: Language; label: string }) {
  return (
    <FilterGroup
      label={label}
      value={lang}
      items={LANGUAGES.map((l) => ({ value: l, label: LANGUAGE_NAMES[l], href: `${path}?lang=${l}` }))}
    />
  );
}
