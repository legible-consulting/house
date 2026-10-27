import { hand } from "./house";

// Jamie's hand (desk/app/DESIGN.md, rule 1): the steps of the house's own build that no
// session takes alone, the bullets of .icm/intake/README.md under "## Jamie's hand", read at
// build (scripts/read-house.mjs), one bullet per line. Each step is a card on the home
// (app/_hand.tsx) with the prompt Jamie copies into a session on the house to prepare the
// step. In a bullet, "Check:" starts the words that say when the step is done.

export interface Step {
  n: number; // the step's place in the list, from 1
  text: string; // the step, one line of markdown, without the check
  check: string | null; // when the step is done; null when the bullet names no check
  prompt: string;
}

const CHECK = /\s*\bCheck:\s*/;

// The words Jamie pastes into a new session on legible-consulting/house. Technical text in
// Simplified Technical English (CLAUDE.md, Writing). The Boundaries of CLAUDE.md stay the
// session's rules: a step of the hand reaches an account, the estate or money, so the
// session prepares and Jamie acts.
export function stepPrompt({ n, text, check }: Pick<Step, "n" | "text" | "check">, total: number): string {
  const lines = [
    `Repo legible-consulting/house. A step of Jamie's hand: step ${n} of ${total} under "## Jamie's hand" in .icm/intake/README.md.`,
    "",
    "## The step",
    "",
    text,
    "",
    "## Done when",
    "",
    check ??
      "The step names no check. Propose one in your first message. Write it into the step's line when Jamie agrees.",
    "",
    "## What to read",
    "",
    "1. CLAUDE.md: the Boundaries and the house rules.",
    '2. .icm/intake/README.md, section "## Jamie\'s hand": the step\'s own line. Then the files and the contracts that the step names, and nothing else.',
    "",
    "## The rules",
    "",
    "- A step of Jamie's hand reaches an account, the estate or money. That part is Jamie's. You prepare it: find the facts, write each command Jamie runs, draft the words, and say what each one does.",
    "- Do not run a command that reaches an account, the estate or money. Do not spend, sign or send. Do not merge. Do not tick a gate.",
    "- Stop before each act that is Jamie's, and wait for his word in this session.",
    "- When the check holds, remove the step's line from .icm/intake/README.md on a branch and open a pull request.",
    "- Your last message says what you did, what Jamie must do next, and the files you changed.",
  ];
  return `${lines.join("\n").trim()}\n`;
}

// The steps of a hand body, in the README's order, each with its prompt.
export function stepsOf(body: string): Step[] {
  const bullets = body
    .split("\n")
    .filter((l) => /^- /.test(l))
    .map((l) => l.slice(2).trim());
  const total = bullets.length;
  return bullets.map((bullet, i) => {
    const [head, ...rest] = bullet.split(CHECK);
    const text = head.trim();
    const check = rest.length > 0 ? rest.join(" Check: ").trim() || null : null;
    const n = i + 1;
    return { n, text, check, prompt: stepPrompt({ n, text, check }, total) };
  });
}

// The hand as of the build: the house changes it by a push to main.
export const steps: Step[] = stepsOf(hand.body);
