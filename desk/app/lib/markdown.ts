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
