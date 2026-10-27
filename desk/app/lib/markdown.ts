import { Marked } from "marked";

// Markdown from the house, as HTML for a page. Raw HTML in the source is shown as text, not
// run: a pitch's <first name> and <one thing seen> are placeholders the reader must see.
const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const md = new Marked({
  renderer: {
    html({ text }) {
      return escape(text);
    },
  },
});

export const render = (markdown: string): string => md.parse(markdown, { async: false });
// One line of markdown as inline HTML, no <p>: a step of Jamie's hand on its card. The
// `.inline-md` class of globals.css gives its `code` the prose rule.
export const inline = (markdown: string): string => md.parseInline(markdown, { async: false });
