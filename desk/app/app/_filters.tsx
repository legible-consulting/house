"use client";

import { useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// One filter as a toggle group: one segment per choice, the pressed one is the URL's. A press
// goes to that choice's URL, so the filter stays in the URL and the server renders the list.
// A press on the pressed segment changes nothing: one choice is always pressed. The group
// wraps on the phone and never scrolls the page sideways.
export function FilterGroup({
  label,
  value,
  items,
}: {
  label: string; // what a reader hears for the group
  value: string;
  items: { value: string; label: string; href: string }[];
}) {
  const router = useRouter();
  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      onValueChange={(next) => {
        const to = items.find((i) => i.value === next[0]);
        if (to) router.push(to.href, { scroll: false });
      }}
      className="max-w-full flex-wrap"
    >
      {items.map((i) => (
        <ToggleGroupItem key={i.value} value={i.value}>
          {i.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
