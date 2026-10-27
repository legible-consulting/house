import { render } from "@/lib/markdown";

// Markdown from the house (a glance, a report, a client document, a stub) as HTML under the
// `.prose` rules of globals.css. Raw HTML in the source is shown as text (lib/markdown.ts).
// `html` is for words rendered once at module load.
export function Prose({ markdown, html }: { markdown?: string; html?: string }) {
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html ?? render(markdown ?? "") }} />;
}
