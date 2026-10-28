import { Fragment } from "react";

// A sentence of lib/words.ts with its model words: each part in backticks (a pool status, a
// channel, a language code, a key) is drawn in mono, outside the sentence's translation; the
// rest is the sentence as written. A flash carries the same marks through the URL
// (components/desk/flash.tsx).
export function Phrase({ text }: { text: string }) {
  return (
    <>
      {text.split(/`([^`]+)`/).map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="font-mono text-meta">
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
