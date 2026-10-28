"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

// Copy a text to the clipboard: a ticket's start prompt, a pitch draft. The label says Copied
// for a moment. When the clipboard is out of reach (an insecure context, some webviews) the
// label says so, and the text stays on the page to select by hand. A salesman's page passes the
// two states in the salesman's words (lib/words.ts copy).
export function CopyButton({
  text,
  label = "Copy prompt",
  size = "sm",
  variant = "secondary",
  words = { copied: "Copied", byHand: "Copy by hand" },
}: {
  text: string;
  label?: string;
  size?: "xs" | "sm" | "default";
  variant?: "default" | "secondary" | "outline";
  words?: { copied: string; byHand: string };
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 1500);
  }
  return (
    <Button type="button" size={size} variant={variant} onClick={copy}>
      {state === "copied" ? words.copied : state === "failed" ? words.byHand : label}
    </Button>
  );
}
