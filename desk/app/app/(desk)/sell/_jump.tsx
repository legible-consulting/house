"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// The jump links of a long page as a toggle group: a press scrolls to the section, moves the
// focus to it and puts its anchor in the URL. The pressed segment is the last one pressed; a
// second press on it jumps again. The jump is instant, so reduced motion needs no case.
export function JumpGroup({ label, items }: { label: string; items: { id: string; label: string }[] }) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <ToggleGroup
      aria-label={label}
      value={value}
      onValueChange={(next) => {
        const id = next[0] ?? value[0];
        const section = id ? document.getElementById(id) : null;
        if (!id || !section) return;
        setValue([id]);
        section.scrollIntoView({ block: "start" });
        section.focus({ preventScroll: true });
        history.replaceState(null, "", `#${id}`);
      }}
      className="max-w-full flex-wrap"
    >
      {items.map((i) => (
        <ToggleGroupItem key={i.id} value={i.id}>
          {i.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
