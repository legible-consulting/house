"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

// The sync pill's face and its panel's frame (app/_sync.tsx renders the words). From md the
// panel is a details element under the pill, with no script. Below md the pill is a button
// that opens a bottom drawer. The server renders the desk's frame; a phone swaps it after
// hydration, with both closed, so nothing moves.

const PILL = "inline-flex h-control shrink-0 items-center gap-2 rounded-full border border-input px-3 text-ui whitespace-nowrap";

export function Dot({ className }: { className: string }) {
  return <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", className)} />;
}

// The pill at rest, with no panel: a build without a commit, or the word not read yet.
export function Pill({ word, dot = "bg-muted-foreground", muted = false }: { word: string; dot?: string; muted?: boolean }) {
  return (
    <span className={cn(PILL, muted && "text-muted-foreground")}>
      <Dot className={dot} />
      {word}
    </span>
  );
}

const MD = "(min-width: 48rem)";
const subscribe = (onChange: () => void) => {
  const m = window.matchMedia(MD);
  m.addEventListener("change", onChange);
  return () => m.removeEventListener("change", onChange);
};
const useDesk = () => useSyncExternalStore(subscribe, () => window.matchMedia(MD).matches, () => true);

export function SyncPanel({ word, dot, children }: { word: string; dot: string; children: ReactNode }) {
  const desk = useDesk();
  const face = (
    <>
      <Dot className={dot} />
      {word}
    </>
  );
  if (desk) {
    return (
      <details className="relative">
        <summary className={cn(PILL, "cursor-pointer list-none [&::-webkit-details-marker]:hidden")}>{face}</summary>
        <div className="absolute right-0 z-20 mt-2 grid w-[min(92vw,28rem)] gap-3 rounded-lg border bg-popover p-4 text-body text-popover-foreground shadow-float">
          {children}
        </div>
      </details>
    );
  }
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger className={PILL}>{face}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Sync</DrawerTitle>
        </DrawerHeader>
        <div className="grid gap-3 overflow-y-auto p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-body">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
